import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { postRequest } from "../consts/apiCalls";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

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
      const response = await postRequest("/api/v1/auth/authenticate", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (you can use your showWarning here)
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
          alignItems: "center",
        }}
      >
        <img
          src="/loginLogo.png"
          alt="Personal Touch Courier"
          height={"250px"}
          width={"250px"}
          style={{ marginBottom: 3 }}
        />
        <Typography component="h1" variant="h3" fontWeight={500}>
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box>
            <Typography
              variant="subtitle1"
              gutterBottom
              fontWeight={600}
              marginBottom={"-8px"}
              marginLeft={"8px"}
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
          <Typography
            variant="subtitle1"
            gutterBottom
            fontWeight={600}
            marginBottom={"-8px"}
            marginLeft={"8px"}
          >
            Password
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            size="small"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
