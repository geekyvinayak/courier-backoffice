import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { postRequest } from "../consts/apiCalls";
import useToast from "./toast/useToast";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("OTP is required."),
  newPassword: Yup.string()
    .min(12, "At least 12 characters required.")
    .matches(/[0-9]/, "Must contain at least one digit (0-9).")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character.",
    )
    .matches(/[a-z]/, "Must contain at least one lowercase letter.")
    .required("New password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords do not match.")
    .required("Confirm password is required."),
});

export const ChangePassword = () => {
  const { showSuccess, showError, showWarning } = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // const response = await postRequest("/api/v1/reset-password", {
        //   password: formik.values.newPassword,
        //   otp: formik.values.otp,
        // });
        showSuccess("Password changed successfully");
        navigate("/login");
      } catch (error) {
        showError(error.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="wraper-container">
      <Box sx={{ padding: "20px", maxWidth: "650px" }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          currentPassword
        </Typography>
        <TextField
          fullWidth
          type="number"
          name="otp"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.currentPassword}
          error={
            formik.touched.currentPassword &&
            Boolean(formik.errors.currentPassword)
          }
          helperText={
            formik.touched.currentPassword && formik.errors.currentPassword
          }
        />

        <Typography variant="body2" fontWeight="bold" gutterBottom>
          NEW PASSWORD
          <Tooltip
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
        </Typography>
        <TextField
          fullWidth
          type="password"
          name="newPassword"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />

        <Typography variant="body2" fontWeight="bold" gutterBottom>
          CONFIRM NEW PASSWORD
        </Typography>
        <TextField
          fullWidth
          type="password"
          name="confirmPassword"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 3 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <Button type="submit" variant="contained" color="primary">
          Reset Password
        </Button>
      </Box>
    </form>
  );
};
