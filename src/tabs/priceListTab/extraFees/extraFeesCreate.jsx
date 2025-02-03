import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getRequest, postRequest, putRequest } from "../../../consts/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import SubTabNavigator from "../../../components/subTabNavigator";
import LinkBtn from "../../../components/linkBtn";

const ExtraFeesCreate = () => {
  const navigate = useNavigate();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: 0,
      displayId: "",
      name: "",
      description: "",
      unitsOfMeasure: "",
      reference: "",
      // systemExtra:false
    },
    validationSchema: Yup.object({
      displayId: Yup.string().required("ID is required"),
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      unitsOfMeasure: Yup.string().required("Unit of Measure is required"),
      // reference: Yup.string().required("Reference is required"),
      // systemExtra: Yup.boolean().required("False")
    }),

    onSubmit: async (values) => {
      try {
        if (id) {
          const response = await putRequest(`/extraFee/${id}`, {
            ...values,
            systemExtra: false,
          });
          navigate("/pricelist/extrafees");
        } else {
          const response = await postRequest("/extraFees", {
            ...values,
            systemExtra: false,
          });
          navigate("/pricelist/extrafees");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { id } = useParams();

  const fetchExtraFees = async () => {
    try {
      const response = await getRequest(`/extraFee/${id}`);
      formik.setValues(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExtraFees();
    }
  }, [id]);

  const pageBreadcrums = [
    {
      id: 1,
      label: "Extra Fee Types",
      href: "/pricelist/extrafees",
    },
    {
      id: 2,
      label: "New Extra Fee Type",
      href: "",
    },
  ];

  return (
    <div>
      <SubTabNavigator
        data={[
          { lable: "Extra Fee Schedules", url: "/pricelist/extrafeesschedule" },
          { lable: "Extra Fee", url: "/pricelist/extrafees" },
        ]}
      />
      <Breadcrumb items={pageBreadcrums} />
      <div className="bg-gray-100 p-6 rounded-md max-w-3xl mx-auto shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-bold">New Extra Fee Type</h1>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            className="bg-blue-500"
          >
            Save
          </Button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {[
            { id: "displayId", label: "ID", disabled: id ? true : false },
            { id: "name", label: "NAME", disabled: id ? true : false },
            { id: "description", label: "DESCRIPTION" },
            {
              id: "unitsOfMeasure",
              label: "UNIT OF MEASURE",
              disabled: id ? true : false,
            },
            { id: "reference", label: "REFERENCE #" },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <TextField
                id={field.id}
                name={field.id}
                variant="outlined"
                fullWidth
                disabled={field.disabled ?? false}
                size="small"
                value={formik.values[field.id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[field.id] && Boolean(formik.errors[field.id])
                }
                helperText={formik.touched[field.id] && formik.errors[field.id]}
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default ExtraFeesCreate;
