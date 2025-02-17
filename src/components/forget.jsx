import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { getRequest } from "../consts/apiCalls";
import useToast from "./toast/useToast";

const Forget = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const { showSuccess, showError, showWarning } = useToast();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getRequest(
        `/api/v1//forgot-password?email=${formData.email}`,
      );
      showSuccess("Check your mail for OTP");
      navigate("/reset-password");
    } catch (error) {
      console.error("Login failed:", error);
      showError(error.message);
    }
  };

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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box>
            <Typography
             variant="subtitle1"
             gutterBottom
             fontWeight={600}
             marginBottom={"-8px"}
             marginLeft={"4px"}
             fontSize={"16px"}
            >
              Email Address
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#065607 !important",
              textTransform: "unset",
              fontSize: "14px !important",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Forget;
