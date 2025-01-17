import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CreateExtraFeesSchedule = () => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <div className="bg-gray-100 p-6 rounded-md max-w-xl mx-auto shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">New Extra Fee Schedules</h1>
        <Button
          variant="contained"
          onClick={formik.handleSubmit}
          className="bg-blue-500"
        >
          Save
        </Button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            NAME
          </label>
          <TextField
            id="name"
            name="name"
            variant="outlined"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExtraFeesSchedule;
