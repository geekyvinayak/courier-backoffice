import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SubTabNavigator from '../../../../components/subTabNavigator';
import Breadcrumb from '../../../../components/Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import useToast from '../../../../components/toast/useToast';
import { postRequest } from '../../../../consts/apiCalls';

const CreateAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { form } = useParams();
  const { showSuccess, showError } = useToast();
  // Determine form type based on URL path
  const [formType, setFormType] = useState("");
  
  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith("/NewContact")) setFormType("contact");
    else if (path.endsWith("/NewHub")) setFormType("hub");
    else if (path.endsWith("/NewGlobalAddress")) setFormType("global");
  }, [location]);

  const getFormTitle = () => {
    switch (formType) {
      case "contact": return "New Contact";
      case "hub": return "New Hub Address";
      case "global": return "New Global Address";
      default: return "New Address";
    }
  };

  const pageBreadcrums = [
    {
      id: 1,
      label: "Addresses	",
      href: "/settings/system/address",
    },
    {
      id: 2,
      label: getFormTitle(),
      href: "",
    }
  ];

  const getValidationSchema = () => {
    const baseSchema = {
      companyName: Yup.string(),
      addressLine1: Yup.string().required("Address is required"),
      suiteApartment: Yup.string(),
      loadUnloadMinutes: Yup.number().min(0, "Time cannot be negative"),
      note: Yup.string(),
    };
    
    if (formType === "contact" || formType === "hub") {
      return Yup.object({
        ...baseSchema,
        contactName: Yup.string().required("Contact name is required"),
        phoneNo: Yup.string().required("Phone number is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        contactLanguage: Yup.string().required("Contact language is required"),
      });
    }
    
    // For global address
    return Yup.object(baseSchema);
  };
  
  // Initial values based on form type - updated to match schema
  const getInitialValues = () => {
    const baseValues = {
      companyName: "",
      addressLine1: "",
      city: "",
      state: "",
      postalCode: "",
      suiteApartment: "",
      loadUnloadMinutes: 0,
      latitude: 0,
      longitude: 0,
      note: "",
    };
    
    if (formType === "contact") {
      return {
        ...baseValues,
        accountId: 0,
        accountantUserId: 0,
        contactName: "",
        phoneNo: "",
        email: "",
        contactLanguage: "ENGLISH",
        defaultContact: false,
      };
    } else if (formType === "hub") {
      return {
        ...baseValues,
        contactName: "",
        phoneNo: "",
        email: "",
        contactLanguage: "ENGLISH",
      };
    }
    
    return baseValues;
  };
  
  const handleSubmit = async (values) => {
    try {
     const response = await postRequest("/address", values);
     console.log("resp",response)
     showSuccess("User Added")
       navigate("/settings/system/address");
    } catch (error) {
      console.error(error);
      showError(error.message);
    }
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(),
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });


  // Contact form fields render function
  const renderContactForm = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="accountId" className="block text-sm text-gray-700 mb-1 font-semibold">
              ACCOUNT
            </label>
            <TextField
              id="accountId"
              name="accountId"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.accountId}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="accountantUserId" className="block text-sm text-gray-700 mb-1 font-semibold">
              USER NAME
            </label>
            <TextField
              id="accountantUserId"
              name="accountantUserId"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.accountantUserId}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-sm text-gray-700 mb-1 font-semibold">
              COMPANY
            </label>
            <TextField
              id="companyName"
              name="companyName"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.companyName}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="contactName" className="block text-sm text-gray-700 mb-1 font-semibold">
              CONTACT NAME
            </label>
            <TextField
              id="contactName"
              name="contactName"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.contactName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contactName && Boolean(formik.errors.contactName)}
              helperText={formik.touched.contactName && formik.errors.contactName}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phoneNo" className="block text-sm text-gray-700 mb-1 font-semibold">
              PHONE
            </label>
            <TextField
              id="phoneNo"
              name="phoneNo"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.phoneNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
              helperText={formik.touched.phoneNo && formik.errors.phoneNo}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1 font-semibold">
              EMAIL
            </label>
            <TextField
              id="email"
              name="email"
              type="email"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-semibold">
              CONTACT LANGUAGE
            </label>
            <RadioGroup
              row
              name="contactLanguage"
              value={formik.values.contactLanguage}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="ENGLISH" control={<Radio />} label="ENGLISH" />
              <FormControlLabel value="FRENCH" control={<Radio />} label="FRENCH" />
            </RadioGroup>
          </div>
          
          <div className="flex items-center mt-4">
            <FormControlLabel
              control={
                <Checkbox
                  id="defaultContact"
                  name="defaultContact"
                  checked={formik.values.defaultContact}
                  onChange={formik.handleChange}
                />
              }
              label="DEFAULT CONTACT"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="addressLine1" className="block text-sm text-gray-700 mb-1 font-semibold">
            ADDRESS
          </label>
          <div className="relative">
            <TextField
              id="addressLine1"
              name="addressLine1"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
              helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
            />
            <div className="absolute right-0 top-1 text-blue-500">
              <a href="#" className="text-xs ml-2">+ Enter address from Zip/Postal Code</a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm text-gray-700 mb-1 font-semibold">
              CITY
            </label>
            <TextField
              id="city"
              name="city"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm text-gray-700 mb-1 font-semibold">
              STATE
            </label>
            <TextField
              id="state"
              name="state"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.state}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm text-gray-700 mb-1 font-semibold">
              POSTAL CODE
            </label>
            <TextField
              id="postalCode"
              name="postalCode"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.postalCode}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="suiteApartment" className="block text-sm text-gray-700 mb-1 font-semibold">
              SUITE/APT
            </label>
            <TextField
              id="suiteApartment"
              name="suiteApartment"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.suiteApartment}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="loadUnloadMinutes" className="block text-sm text-gray-700 mb-1 font-semibold">
              LOAD/UNLOAD TIME (MINUTES)
            </label>
            <TextField
              id="loadUnloadMinutes"
              name="loadUnloadMinutes"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              value={formik.values.loadUnloadMinutes}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="zoneDefinition" className="block text-sm text-gray-700 mb-1 font-semibold">
            ZONE DEFINITION
          </label>
          <div className="flex items-center">
            <Button
              variant="outlined"
              component="label"
              size="small"
            >
              Choose File
              <input
                type="file"
                hidden
                onChange={(event) => {
                  formik.setFieldValue("zoneDefinition", event.currentTarget.files[0]);
                }}
              />
            </Button>
            <span className="ml-2 text-sm">
              {formik.values.zoneDefinition ? formik.values.zoneDefinition.name : "No file chosen"}
            </span>
            <Box component="span" sx={{ marginLeft: 1 }}>
              <i className="fas fa-info-circle text-blue-500" />
            </Box>
          </div>
        </div>
        
        <div>
          <label htmlFor="note" className="block text-sm text-gray-700 mb-1 font-semibold">
            NOTES
          </label>
          <TextField
            id="note"
            name="note"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={formik.values.note}
            onChange={formik.handleChange}
          />
        </div>
      </div>
    );
  };

  // Hub address form fields render function
  const renderHubForm = () => {
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm text-gray-700 mb-1 font-semibold">
            COMPANY (HUB NAME)
          </label>
          <TextField
            id="companyName"
            name="companyName"
            variant="outlined"
            size="small"
            fullWidth
            value={formik.values.companyName}
            onChange={formik.handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="contactName" className="block text-sm text-gray-700 mb-1 font-semibold">
            CONTACT NAME
          </label>
          <TextField
            id="contactName"
            name="contactName"
            variant="outlined"
            size="small"
            fullWidth
            value={formik.values.contactName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contactName && Boolean(formik.errors.contactName)}
            helperText={formik.touched.contactName && formik.errors.contactName}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phoneNo" className="block text-sm text-gray-700 mb-1 font-semibold">
              PHONE
            </label>
            <TextField
              id="phoneNo"
              name="phoneNo"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.phoneNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
              helperText={formik.touched.phoneNo && formik.errors.phoneNo}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1 font-semibold">
              EMAIL
            </label>
            <TextField
              id="email"
              name="email"
              type="email"
              variant="outlined" 
              size="small"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-700 mb-1 font-semibold">
            CONTACT LANGUAGE
          </label>
          <RadioGroup
            row
            name="contactLanguage"
            value={formik.values.contactLanguage}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="ENGLISH" control={<Radio />} label="ENGLISH" />
            <FormControlLabel value="FRENCH" control={<Radio />} label="FRENCH" />
          </RadioGroup>
        </div>
        
        <div>
          <label htmlFor="addressLine1" className="block text-sm text-gray-700 mb-1 font-semibold">
            ADDRESS
          </label>
          <div className="relative">
            <TextField
              id="addressLine1"
              name="addressLine1"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
              helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
            />
            <div className="absolute right-0 top-1 text-blue-500">
              <a href="#" className="text-xs ml-2">+ Enter address from Zip/Postal Code</a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm text-gray-700 mb-1 font-semibold">
              CITY
            </label>
            <TextField
              id="city"
              name="city"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm text-gray-700 mb-1 font-semibold">
              STATE
            </label>
            <TextField
              id="state"
              name="state"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.state}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm text-gray-700 mb-1 font-semibold">
              POSTAL CODE
            </label>
            <TextField
              id="postalCode"
              name="postalCode"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.postalCode}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="suiteApartment" className="block text-sm text-gray-700 mb-1 font-semibold">
              SUITE/APT
            </label>
            <TextField
              id="suiteApartment"
              name="suiteApartment"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.suiteApartment}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="loadUnloadMinutes" className="block text-sm text-gray-700 mb-1 font-semibold">
              LOAD/UNLOAD TIME (MINUTES)
            </label>
            <TextField
              id="loadUnloadMinutes"
              name="loadUnloadMinutes"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              value={formik.values.loadUnloadMinutes}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="zoneDefinition" className="block text-sm text-gray-700 mb-1 font-semibold">
            ZONE DEFINITION
          </label>
          <div className="flex items-center">
            <Button
              variant="outlined"
              component="label"
              size="small"
            >
              Choose File
              <input
                type="file"
                hidden
                onChange={(event) => {
                  formik.setFieldValue("zoneDefinition", event.currentTarget.files[0]);
                }}
              />
            </Button>
            <span className="ml-2 text-sm">
              {formik.values.zoneDefinition ? formik.values.zoneDefinition.name : "No file chosen"}
            </span>
            <Box component="span" sx={{ marginLeft: 1 }}>
              <i className="fas fa-info-circle text-blue-500" />
            </Box>
          </div>
        </div>
        
        <div>
          <label htmlFor="note" className="block text-sm text-gray-700 mb-1 font-semibold">
            NOTES
          </label>
          <TextField
            id="note"
            name="note"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={formik.values.note}
            onChange={formik.handleChange}
          />
        </div>
      </div>
    );
  };

  // Global address form fields render function
  const renderGlobalForm = () => {
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm text-gray-700 mb-1 font-semibold">
            COMPANY
          </label>
          <TextField
            id="companyName"
            name="companyName"
            variant="outlined"
            size="small"
            fullWidth
            value={formik.values.companyName}
            onChange={formik.handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="addressLine1" className="block text-sm text-gray-700 mb-1 font-semibold">
            ADDRESS
          </label>
          <div className="relative">
            <TextField
              id="addressLine1"
              name="addressLine1"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
              helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
            />
            <div className="absolute right-0 top-1 text-blue-500">
              <a href="#" className="text-xs ml-2">+ Enter address from Zip/Postal Code</a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm text-gray-700 mb-1 font-semibold">
              CITY
            </label>
            <TextField
              id="city"
              name="city"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm text-gray-700 mb-1 font-semibold">
              STATE
            </label>
            <TextField
              id="state"
              name="state"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.state}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm text-gray-700 mb-1 font-semibold">
              POSTAL CODE
            </label>
            <TextField
              id="postalCode"
              name="postalCode"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.postalCode}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="suiteApartment" className="block text-sm text-gray-700 mb-1 font-semibold">
              SUITE/APT
            </label>
            <TextField
              id="suiteApartment"
              name="suiteApartment"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.suiteApartment}
              onChange={formik.handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="loadUnloadMinutes" className="block text-sm text-gray-700 mb-1 font-semibold">
              LOAD/UNLOAD TIME (MINUTES)
            </label>
            <TextField
              id="loadUnloadMinutes"
              name="loadUnloadMinutes"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              value={formik.values.loadUnloadMinutes}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="zoneDefinition" className="block text-sm text-gray-700 mb-1 font-semibold">
            ZONE DEFINITION
          </label>
          <div className="flex items-center">
            <Button
              variant="outlined"
              component="label"
              size="small"
            >
              Choose File
              <input
                type="file"
                hidden
                onChange={(event) => {
                  formik.setFieldValue("zoneDefinition", event.currentTarget.files[0]);
                }}
              />
            </Button>
            <span className="ml-2 text-sm">
              {formik.values.zoneDefinition ? formik.values.zoneDefinition.name : "No file chosen"}
            </span>
            <Box component="span" sx={{ marginLeft: 1 }}>
              <i className="fas fa-info-circle text-blue-500" />
            </Box>
          </div>
        </div>
        
        <div>
          <label htmlFor="note" className="block text-sm text-gray-700 mb-1 font-semibold">
            NOTES
          </label>
          <TextField
            id="note"
            name="note"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={formik.values.note}
            onChange={formik.handleChange}
          />
        </div>
      </div>
    );
  };

  const renderFormByType = () => {
    switch (formType) {
      case "contact":
        return renderContactForm();
      case "hub":
        return renderHubForm();
      case "global":
        return renderGlobalForm();
      default:
        return <div>Please select a form type</div>;
    }
  };
  
  return (
    <div className="wraper-container">
          <SubTabNavigator
        data={[
          { lable: "Users", url: "/settings/system/users" },
          { lable: "Address", url: "/settings/system/address" , isFilled: true},
          { lable: "Report", url: "/settings/system/report" },
          { lable: "Anonymize", url: "/settings/system/Anonymize" },
          { lable: "Audit", url: "/settings/system/audit" },
        ]}
      />
       <Breadcrumb items={pageBreadcrums} />
       <div className="max-w-[1000px] p-4 border border-gray shadow-md mt-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h6" gutterBottom>
            {getFormTitle()}
          </Typography>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            type="submit"
            color="primary"
            sx={{ backgroundColor: "#1976d2" }}
          >
            Save
          </Button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <Typography variant="body2" className="text-gray-500 mb-2">
                Enter an address to see the map
              </Typography>
              {/* Map preview would go here */}
            </div>
            <div className="md:col-span-1">
              {renderFormByType()}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAddress