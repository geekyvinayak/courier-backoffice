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
import { Typography } from "@mui/material";

const ExtraFeesCreate = () => {
  const navigate = useNavigate();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      // id: 0,
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
            id
          });
          navigate("/pricelist/extrafees");
        } else {
          const response = await postRequest("/extraFee", {
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
          { lable: "Extra Fee", url: "/pricelist/extrafees" ,isFilled: true},
        ]}
      />
      <Breadcrumb items={pageBreadcrums} />
      <div className="max-w-[600px] p-4 border border-gray shadow-md ml-4 mt-4 mb-4">
        <div className="flex justify-between items-center mb-6">
        <Typography variant="h3" gutterBottom>New Extra Fee Type</Typography>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            className="bg-blue-500"
            type="submit"
                
                  color="primary"
                  sx={{
                    // Red border (you can change the color)
                    backgroundColor: "#1569CB",
                  }}
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
