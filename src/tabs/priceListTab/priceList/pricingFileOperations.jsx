import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { postRequest } from "../../../consts/apiCalls";
import axios from "axios";
import useToast from "../../../components/toast/useToast";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
const PricingFileOperations = ({ fetchData, id }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError, showWarning } = useToast();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadStatus("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showWarning("Please select a file first");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await postRequest("/priceZone/upload", formData, {
        "Content-Type": "multipart/form-data",
      });
      console.log("response file", response);
      showSuccess("File uploaded successfully!");
      fetchData();
      setSelectedFile(null);
    } catch (error) {
      showError("Error uploading file");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/pricingList/download/template`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "*/*",
        },
      });

      const contentDisposition = response.headers["content-disposition"];
      let filename = "";

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename\*?=(?:UTF-8'')?["']?([^;"'\n]*)["']?/,
        );
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1]);
        }
      }

      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showSuccess("File downloaded successfully!");
    } catch (error) {
      showError("Error downloading file ");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/pricingList/download/${id}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "*/*",
        },
      });

      const contentDisposition = response.headers["content-disposition"];
      let filename = "";

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename\*?=(?:UTF-8'')?["']?([^;"'\n]*)["']?/,
        );
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1]);
        }
      }

      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showSuccess("File downloaded successfully!");
    } catch (error) {
      showError("Error downloading file ");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[400px] w-full p-4 border border-gray shadow-md ml-4 mt-4 mb-4 items-center flex flex-col">
      <Typography variant="h3" className="mb-4 self-start">
        Prices
      </Typography>

      {/* Upload Area */}
      <div
        className="mt-4 border-2 w-full border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center cursor-pointer hover:bg-gray-50"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <div className="text-gray-600 items-center flex-col flex">
          <Typography variant="h5" className="!font-bold mb-2">
            Drag & Drop file here
          </Typography>
          <Typography variant="body2" className="mb-4">
            {selectedFile
              ? `Selected: ${selectedFile.name}`
              : <div className=" mt-4 max-w-[100px] p-2 bg-gray-300 cursor-pointer">Select a File...</div>}
          </Typography>
        </div>

        <input
          id="fileInput"
          type="file"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Upload Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpload}
        disabled={!selectedFile || isLoading}
        className="mb-4 max-w-[125px] gap-1"
        sx={{
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
      <FileUploadOutlinedIcon/> Upload
      </Button>

      {/* Warning Message */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 mt-4">
        <Typography variant="body2" className="text-yellow-800">
          The last uploaded file will not reflect changes made on vehicles,
          service levels and/or zones. To make changes to the price list, either
          add the missing vehicles, service levels and/or zones manually in the
          existing price list or download the Template File to generate a valid
          empty price list.
        </Typography>
      </div>

      {/* Download Section */}
      <div className="text-center">
        <Typography variant="subtitle2" className="mb-4">
          DOWNLOAD LAST UPLOADED PRICE LIST
        </Typography>
        <div className="space-y-2 flex flex-col justify-center items-center">
          <Button
            variant="outlined"
            fullWidth
            onClick={handleDownload}
            disabled={isLoading}
            className="mb-2 max-w-[150px] gap-2"
          >
           <FileDownloadOutlinedIcon/>   Price file
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleDownloadTemplate}
            disabled={isLoading}
            className="mb-2 max-w-[150px] gap-1 !capitalize"
          >
           <FileDownloadOutlinedIcon/> Template file
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingFileOperations;
