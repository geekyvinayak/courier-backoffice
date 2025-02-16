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
  otp: Yup.string().required("OTP is required."),
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

export const ResetPassword = () => {
  const { showSuccess, showError, showWarning } = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { otp: "", newPassword: "", confirmPassword: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await postRequest("/api/v1/reset-password", {
          password: formik.values.newPassword,
          otp: formik.values.otp,
        });
        showSuccess("Password reset successfully");
        navigate("/login");
      } catch (error) {
        showError(error.message);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-[100%] login">
      <Box
        sx={{
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <img
          src="/loginLogo.png"
          alt="Personal Touch Courier"
          height={"350px"}
          width={"350px"}
          style={{ marginBottom: 10 }}
        />
        <Typography
          component="h1"
          variant="h3"
          fontWeight={500}
          fontSize={"30px"}
        >
          Request New Password
        </Typography>
        <form onSubmit={formik.handleSubmit} className="mt-5">
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
            sx={{ marginBottom: 2 }}
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

          <Typography variant="body2" fontWeight="bold" gutterBottom>
            OTP
          </Typography>
          <TextField
            fullWidth
            type="number"
            name="otp"
            variant="outlined"
            size="small"
            sx={{ marginBottom: 3 }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.otp}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
          />

          <Button
            sx={{
              backgroundColor: "#065607 !important",
              textTransform: "unset",
              fontSize: "14px !important",
            }}
            type="submit"
            fullWidth
            variant="contained"
          >
            Reset Password
          </Button>
        </form>
      </Box>
    </div>
  );
};
