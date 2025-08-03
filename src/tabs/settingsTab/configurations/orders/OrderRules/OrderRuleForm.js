import React, { useState, useEffect } from "react";
import { Plus, X, ChevronDown, Info, ArrowLeft } from "lucide-react";
import { getRequest, postRequest, putRequest, deleteRequest } from "../../../../../consts/apiCalls";
import useToast from "../../../../../components/toast/useToast";
import Breadcrumb from "../../../../../components/Breadcrumb";

import { Button, TextField, Box, Typography } from "@mui/material";
import { DeleteDialog } from "../../../../../components/deleteDialog";
const OrderRuleForm = ({ editingId, isEditMode, onBack, onSuccess }) => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "Script",
    script: "",
  });

  const [filterFields, setFilterFields] = useState([]); // [{ field, displayName, supportedOperators }]
  const [operatorOptions, setOperatorOptions] = useState([]); // flat list of all operator strings
  const [loading, setLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const [filters, setFilters] = useState({
    id: "root",
    type: "group",
    operator: "And",
    conditions: [],
  });

  useEffect(() => {
    fetchFilterFields();
    fetchOperators();

    // If editing, fetch the order rule data
    if (isEditMode && editingId) {
      fetchOrderRuleById();
    }
  }, [editingId, isEditMode]);

  const fetchOrderRuleById = async () => {
    setIsFormLoading(true);
    try {
      const response = await getRequest(`/order-rules/${editingId}`);
      console.log("Order rule data:", response);

      setFormData({
        name: response.name || "",
        description: response.description || "",
        type: response.type === "VALUE_BASED" ? "Value Based" : "Script",
        script: response.script || "",
      });

      // Convert the rule groups back to the filter structure if it's value based
      if (response.type === "VALUE_BASED" && response.ruleGroups) {
        const convertedFilters = convertRuleGroupsToFilters(response);
        console.log("Converted filters:", convertedFilters);
        setFilters(convertedFilters);
      } else {
        // Reset filters for Script type or when no rule groups
        setFilters({
          id: "root",
          type: "group",
          operator: "And",
          conditions: [],
        });
      }
    } catch (error) {
      showError("Failed to load Order Rule");
      console.error("Fetch error:", error);
    } finally {
      setIsFormLoading(false);
    }
  };

  // Helper function to convert backend rule groups to frontend filter structure
  const convertRuleGroupsToFilters = (orderRule) => {
    if (!orderRule.ruleGroups || orderRule.ruleGroups.length === 0) {
      return {
        id: "root",
        type: "group",
        operator: orderRule.rootOperator?.toLowerCase() === "AND" ? "And" : "Or",
        conditions: [],
      };
    }

    // Sort rule groups by groupOrder and nestingLevel
    const sortedGroups = [...orderRule.ruleGroups].sort((a, b) => {
      if (a.nestingLevel !== b.nestingLevel) {
        return a.nestingLevel - b.nestingLevel;
      }
      return a.groupOrder - b.groupOrder;
    });

    // Create a map to store groups by their IDs
    const groupMap = new Map();

    // Create the root group
    const rootGroup = {
      id: "root",
      type: "group",
      operator: orderRule.rootOperator?.toLowerCase() === "AND" ? "And" : "Or",
      conditions: [],
    };

    groupMap.set(null, rootGroup); // Root group has no parent

    // Process each rule group
    sortedGroups.forEach((ruleGroup) => {
      const group = {
        id: `group_${ruleGroup.id}`,
        type: "group",
        operator: ruleGroup.operator?.toLowerCase() === "AND" ? "And" : "Or",
        conditions: [],
      };

      // Add filters to this group
      if (ruleGroup.filters && ruleGroup.filters.length > 0) {
        const sortedFilters = [...ruleGroup.filters].sort((a, b) => a.filterOrder - b.filterOrder);

        sortedFilters.forEach((filter) => {
          group.conditions.push({
            id: `condition_${filter.id}`,
            type: "condition",
            field: filter.field,
            operator: filter.operator,
            value: filter.value,
          });
        });
      }

      // Add this group to its parent
      const parentGroup = groupMap.get(ruleGroup.parentGroupId);
      if (parentGroup) {
        parentGroup.conditions.push(group);
      }

      // Store this group in the map for potential child groups
      groupMap.set(ruleGroup.id, group);
    });

    return rootGroup;
  };

  const fetchFilterFields = async () => {
    try {
      const data = await getRequest("/order-rules/metadata/filter-fields");
      setFilterFields(data);
    } catch (err) {
      console.error("Error fetching filter fields:", err);
    }
  };

  const fetchOperators = async () => {
    try {
      const data = await getRequest("/order-rules/metadata/operators");
      setOperatorOptions(data || []);
    } catch (err) {
      console.error("Error fetching operators:", err);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateGroupOperator = (path, newOperator) => {
    if (path.length === 0) {
      setFilters({ ...filters, operator: newOperator });
    } else {
      const updateNested = (obj, pathArray, index = 0) => {
        if (index === pathArray.length - 1) {
          const newConditions = [...obj.conditions];
          newConditions[pathArray[index]] = {
            ...newConditions[pathArray[index]],
            operator: newOperator,
          };
          return { ...obj, conditions: newConditions };
        }

        const newConditions = [...obj.conditions];
        newConditions[pathArray[index]] = updateNested(
          newConditions[pathArray[index]],
          pathArray,
          index + 1
        );
        return { ...obj, conditions: newConditions };
      };

      setFilters(updateNested(filters, path));
    }
  };

  const updateCondition = (path, field, value) => {
    const updateNested = (obj, pathArray, index = 0) => {
      if (pathArray.length === 0) {
        return { ...obj, [field]: value };
      }

      if (index === pathArray.length) {
        return { ...obj, [field]: value };
      }

      const newConditions = [...obj.conditions];
      if (index === pathArray.length - 1) {
        newConditions[pathArray[index]] = {
          ...newConditions[pathArray[index]],
          [field]: value,
        };
      } else {
        newConditions[pathArray[index]] = updateNested(
          newConditions[pathArray[index]],
          pathArray,
          index + 1
        );
      }
      return { ...obj, conditions: newConditions };
    };

    setFilters(updateNested(filters, path));
  };

  const addCondition = (path) => {
    const defaultField = filterFields[0]?.field || "ACCOUNT";
    const defaultOperator = filterFields[0]?.supportedOperators?.[0] || "EQUALS";

    const newCondition = {
      id: Date.now().toString(),
      type: "condition",
      field: defaultField,
      operator: defaultOperator,
      value: "",
    };

    const addToNested = (obj, pathArray, index = 0) => {
      if (index === pathArray.length) {
        return { ...obj, conditions: [...obj.conditions, newCondition] };
      }

      const newConditions = [...obj.conditions];
      newConditions[pathArray[index]] = addToNested(
        newConditions[pathArray[index]],
        pathArray,
        index + 1
      );
      return { ...obj, conditions: newConditions };
    };

    setFilters(addToNested(filters, path));
  };

  const addGroup = (path) => {
    const newGroup = {
      id: Date.now().toString(),
      type: "group",
      operator: "And",
      conditions: [],
    };

    const addToNested = (obj, pathArray, index = 0) => {
      if (index === pathArray.length) {
        return { ...obj, conditions: [...obj.conditions, newGroup] };
      }

      const newConditions = [...obj.conditions];
      newConditions[pathArray[index]] = addToNested(
        newConditions[pathArray[index]],
        pathArray,
        index + 1
      );
      return { ...obj, conditions: newConditions };
    };

    setFilters(addToNested(filters, path));
  };

  const removeItem = (path) => {
    const removeFromNested = (obj, pathArray, index = 0) => {
      if (index === pathArray.length - 1) {
        const newConditions = [...obj.conditions];
        newConditions.splice(pathArray[index], 1);
        return { ...obj, conditions: newConditions };
      }

      const newConditions = [...obj.conditions];
      newConditions[pathArray[index]] = removeFromNested(
        newConditions[pathArray[index]],
        pathArray,
        index + 1
      );
      return { ...obj, conditions: newConditions };
    };

    setFilters(removeFromNested(filters, path));
  };

  const renderCondition = (condition, path) => {
    const currentFieldMeta = filterFields.find((f) => f.field === condition.field);
    const availableOperators = currentFieldMeta?.supportedOperators || operatorOptions;

    return (
      <div key={condition.id} className="flex items-center gap-2 mb-2">
        <select
          value={condition.field}
          onChange={(e) => updateCondition(path, "field", e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 bg-white min-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {filterFields.map((option) => (
            <option key={option.field} value={option.field}>
              {option.displayName || option.field}
            </option>
          ))}
        </select>

        <select
          value={condition.operator}
          onChange={(e) => updateCondition(path, "operator", e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 bg-white min-w-[140px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {availableOperators.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>

        <select
          value={condition.value}
          onChange={(e) => updateCondition(path, "value", e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 bg-white min-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Search...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>

        <button onClick={() => removeItem(path)} className="text-red-500 hover:text-red-700 p-1">
          <X size={16} />
        </button>
      </div>
    );
  };

  const renderGroup = (group, path = []) => (
    <div key={group.id} className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => updateGroupOperator(path, "And")}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            group.operator === "And"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          And
        </button>
        <button
          onClick={() => updateGroupOperator(path, "Or")}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            group.operator === "Or"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Or
        </button>

        <button
          onClick={() => addCondition(path)}
          className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        >
          <Plus size={16} />
          Add Filter
        </button>

        <button
          onClick={() => addGroup(path)}
          className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        >
          <Plus size={16} />
          Add Group
        </button>

        {path.length > 0 && (
          <button
            onClick={() => removeItem(path)}
            className="text-red-500 hover:text-red-700 p-1 ml-auto"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="space-y-2">
        {group.conditions.map((item, index) => {
          const currentPath = [...path, index];
          if (item.type === "condition") {
            return renderCondition(item, currentPath);
          } else {
            return renderGroup(item, currentPath);
          }
        })}
      </div>
    </div>
  );

  const handleSave = async () => {
    setLoading(true);

    const dto = {
      name: formData.name,
      description: formData.description,
      type: formData.type === "Value Based" ? "VALUE_BASED" : "SCRIPT",
      rootOperator: filters.operator.toUpperCase(),
      active: true,
      ruleGroups: [],
    };

    let groupIdCounter = 1;
    const groupMap = new Map();

    const traverse = (group, nestingLevel = 0, parentGroupId = 0) => {
      const groupId = groupIdCounter++;
      groupMap.set(group, groupId);

      const currentGroup = {
        parentGroupId,
        operator: group.operator.toUpperCase(),
        groupOrder: dto.ruleGroups.length,
        nestingLevel,
        filters: [],
      };

      group.conditions.forEach((item, index) => {
        if (item.type === "condition") {
          currentGroup.filters.push({
            field: item.field,
            operator: item.operator.toUpperCase(),
            value: item.value,
            filterOrder: index,
          });
        } else if (item.type === "group") {
          traverse(item, nestingLevel + 1, groupId);
        }
      });

      dto.ruleGroups.push(currentGroup);
    };

    traverse(filters);

    try {
      if (isEditMode && editingId) {
        const response = await putRequest(`/order-rules/${editingId}`, dto);
        console.log("Response:", response);
        showSuccess("Order rule updated successfully!");
      } else {
        const response = await postRequest("/order-rules", dto);
        console.log("Response:", response);
        showSuccess("Order rule created successfully!");
      }

      onSuccess();
    } catch (error) {
      showError(`Failed to ${isEditMode ? "update" : "create"} order rule.`);
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditMode || !editingId) return;

    try {
      await deleteRequest(`/order-rules/${editingId}`);
      showSuccess("Order rule deleted successfully!");
      onSuccess();
    } catch (error) {
      showError("Failed to delete order rule.");
      console.error("Delete error:", error);
    }
  };

  return (
    <Box className="w-[90%] mb-10">
      {/* Header */}
      <Breadcrumb
        items={[
          { label: " Order Rules", onClick: onBack },
          {
            label: isEditMode ? `Edit Order Rule (${editingId})` : "Create Order Rule",
          },
        ]}
      />
      <Box
        sx={{
          marginTop: "8px",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: 1,
          padding: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            Order Rule
          </Typography>
          <Box display="flex" gap={1}>
            <Button
              onClick={handleSave}
              disabled={loading || isFormLoading}
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#1569CB",
                textTransform: "none",
              }}
            >
              Save
            </Button>
            {isEditMode && (
              <DeleteDialog
                handleDelete={handleDelete}
                trigger={
                  <Button
                    disabled={loading || isFormLoading}
                    variant="contained"
                    sx={{
                      backgroundColor: "#d32f2f !important",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#9a0007",
                      },
                    }}
                  >
                    Delete
                  </Button>
                }
              />
            )}
          </Box>
        </Box>

        {/* Main Content */}
        {isFormLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          /* Form Fields */
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter rule name"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">DESCRIPTION</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleFormChange("description", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Enter rule description"
              />
            </div>

            {/* Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">TYPE</label>
              <div className="relative">
                <select
                  value={formData.type}
                  onChange={(e) => handleFormChange("type", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="Script">Script</option>
                  <option value="Value Based">Value Based</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Script Field - Only show when type is Script */}
            {formData.type === "Script" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SCRIPT</label>
                <div className="relative">
                  <select
                    value={formData.script}
                    onChange={(e) => handleFormChange("script", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select script...</option>
                    {/* Add script options here */}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
            )}

            {/* Values Section - Only show when type is Value Based */}
            {formData.type === "Value Based" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">VALUES</label>
                  <div className="relative group">
                    <Info size={16} className="text-blue-500 cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      <div className="max-w-xs">
                        <div>
                          Selecting AND means that all operations must be true at the same time to
                          return true.
                        </div>
                        <div>
                          Selecting OR means that at least one operation must be true to return
                          true.
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                </div>

                {/* Query Builder */}
                <div className="bg-gray-50 p-4 rounded-lg">{renderGroup(filters)}</div>
              </div>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default OrderRuleForm;
