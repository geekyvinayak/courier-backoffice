import axios from "axios";

// Backend base URL from environment variable
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Function to handle errors
function handleError(error) {
  console.error("API call error:", error);
  if (error.response) {
    // Server responded with a status other than 2xx
    if(error.response.data.message ==="You must be authenticated to access this resource." && error.response.data.error == "Unauthorized" && error.response.data.status ==401){
      localStorage.removeItem("token");
      alert("token has expired please generate new one and refresh the page")
    }

    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
  } else if (error.request) {
    // Request was made but no response received
    console.error("Request data:", error.request);
  } else {
    // Something else happened while setting up the request
    console.error("Error message:", error.message);
  }
  throw error; // Rethrow to handle further up if needed
}

// Function to add bearer token to headers
function getAuthHeaders() {
  const token = localStorage.getItem("token"); // Replace with your token storage logic
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Function to make GET request
export async function getRequest(url, params = {}) {
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      params,
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to make POST request
export async function postRequest(url, body = {}, customHeaders = {}) {
  try {
    console.log("customHeaders", customHeaders);
    const response = await axios.post(`${BASE_URL}${url}`, body, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...customHeaders,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to make PUT request
export async function putRequest(url, body = {}) {
  try {
    const response = await axios.put(`${BASE_URL}${url}`, body, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to make DELETE request
export async function deleteRequest(url) {
  try {
    const response = await axios.delete(`${BASE_URL}${url}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
