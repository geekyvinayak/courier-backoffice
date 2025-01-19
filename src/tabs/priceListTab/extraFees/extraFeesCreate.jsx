import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ExtraFeesCreate = () => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: "",
      nameEn: "",
      nameFr: "",
      descriptionEn: "",
      descriptionFr: "",
      unitOfMeasureEn: "",
      unitOfMeasureFr: "",
      reference: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("ID is required"),
      nameEn: Yup.string().required("Name (EN) is required"),
      nameFr: Yup.string().required("Name (FR) is required"),
      descriptionEn: Yup.string().required("Description (EN) is required"),
      descriptionFr: Yup.string().required("Description (FR) is required"),
      unitOfMeasureEn: Yup.string().required("Unit of Measure (EN) is required"),
      unitOfMeasureFr: Yup.string().required("Unit of Measure (FR) is required"),
      reference: Yup.string().required("Reference is required"),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
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
          { id: "id", label: "ID" },
          { id: "nameEn", label: "NAME (EN)" },
          { id: "nameFr", label: "NAME (FR)" },
          { id: "descriptionEn", label: "DESCRIPTION (EN)" },
          { id: "descriptionFr", label: "DESCRIPTION (FR)" },
          { id: "unitOfMeasureEn", label: "UNIT OF MEASURE (EN)" },
          { id: "unitOfMeasureFr", label: "UNIT OF MEASURE (FR)" },
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
              size="small"
              value={formik.values[field.id]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[field.id] && Boolean(formik.errors[field.id])}
              helperText={formik.touched[field.id] && formik.errors[field.id]}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default ExtraFeesCreate;
