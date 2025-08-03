import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getRequest, postRequest, putRequest } from "../../../../consts/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumb from "../../../../components/Breadcrumb";
import SubTabNavigator from "../../../../components/subTabNavigator";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import useToast from "../../../../components/toast/useToast";
import InfoIcon from "@mui/icons-material/Info";

const CreateUser = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      contactLanguage: "en",
      subscribeToTechnicalNotification: "",
      role: "ADMIN",
      archive: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      password: Yup.string()
        .required("Password is required")
        .min(12, "Password must be at least 12 characters.")
        .matches(/\d/, "Password must have at least one digit ('0'-'9').")
        .matches(/[^a-zA-Z0-9]/, "Password must have at least one non-alphanumeric character.")
        .matches(/[a-z]/, "Password must have at least one lowercase letter."),
      role: Yup.string().required("Role is required"),
    }),

    onSubmit: async (values) => {
      try {
        if (id) {
          const response = await putRequest(`/users/${id}`, values);
          showSuccess("User Updated");
          navigate("/settings/system/users");
        } else {
          const response = await postRequest("/users", values);
          showSuccess("User Added");
          navigate("/settings/system/users");
        }
      } catch (error) {
        console.log(error);
        showError(error.message);
      }
    },
  });

  const { id } = useParams();

  const getUser = async () => {
    try {
      const response = await getRequest(`/users/${id}`);
      formik.setValues(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  const pageBreadcrums = [
    {
      id: 1,
      label: "Users",
      href: "/settings/system/users",
    },
    {
      id: 2,
      label: id ? "Edit User" : "New User",
      href: "",
    },
  ];

  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Users", url: "/settings/system/users", isFilled: true },
          { lable: "Address", url: "/settings/system/address" },
          // { lable: "Report", url: "/settings/system/report" },
          // { lable: "Anonymize", url: "/settings/system/Anonymize" },
          // { lable: "Audit", url: "/settings/system/audit" },
        ]}
      />
      <Breadcrumb items={pageBreadcrums} />
      <div className="max-w-[600px] p-4 border border-gray shadow-md mt-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3" gutterBottom>
            {id ? "Edit" : "New"} User
          </Typography>
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
          <div>
            <label htmlFor="firstName" className="block text-sm text-gray-700 mb-1 font-semibold">
              First Name
            </label>
            <TextField
              id="firstName"
              name="firstName"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm text-gray-700 mb-1 font-semibold">
              Last Name
            </label>
            <TextField
              id="lastName"
              name="lastName"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1 font-semibold">
              Email
            </label>
            <TextField
              id="email"
              name="email"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm text-gray-700 mb-1 font-semibold">
              Phone
            </label>
            <TextField
              id="phone"
              name="phone"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm text-gray-700 mb-1 font-semibold">
              Password
              <Tooltip
                arrow
                title={
                  <Box sx={{ maxWidth: 250, p: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Password rules
                    </Typography>
                    <Typography variant="body2">
                      Passwords must have at least one digit ('0'-'9').
                      <br />
                      Passwords must have at least one non-alphanumeric character.
                      <br />
                      Passwords must be at least 12 characters.
                      <br />
                      Passwords require at least one lowercase letter.
                    </Typography>
                  </Box>
                }
              >
                <IconButton size="small">
                  <InfoIcon fontSize="small" className="text-[#3e4396]" />
                </IconButton>
              </Tooltip>
            </label>
            <TextField
              id="password"
              name="password"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            />
          </div>
          <div>
            <label
              htmlFor="contactLanguage"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              Contact Language
            </label>
            <TextField
              select
              id="contactLanguage"
              name="contactLanguage"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.contactLanguage}
              onChange={formik.handleChange}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">French</MenuItem>
            </TextField>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm text-gray-700 mb-1 font-semibold">
              Role
            </label>
            <TextField
              select
              id="role"
              name="role"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
            </TextField>
          </div>
          <div>
            <label
              htmlFor="subscribeToTechnicalNotification"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              Communication Preferences
            </label>
            <FormControlLabel
              control={
                <Checkbox
                  id="subscribeToTechnicalNotification"
                  name="subscribeToTechnicalNotification"
                  checked={formik.values.subscribeToTechnicalNotification}
                  onChange={(event) =>
                    formik.setFieldValue("subscribeToTechnicalNotification", event.target.checked)
                  }
                />
              }
              label={
                <span className="text-xs font-normal">
                  Subscribe user to received Dispatch Science emails and notification of a technical
                  nature (best for Administrators and power users)
                </span>
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
