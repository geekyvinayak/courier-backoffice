import React, { useState } from "react";
// import { Upload, Download } from 'lucide-react';
import { Button, Typography } from "@mui/material";
import { postRequest } from "../../../../consts/apiCalls";
import axios from "axios";
import useToast from "../../../../components/toast/useToast";

const Uploadpricezone = ({ fetchData }) => {
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
      // Create FormData object
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Use your postRequest function
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

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/priceZone/download`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your auth method
          Accept: "*/*",
        },
      });

      // Get filename from content-disposition header if available
      const contentDisposition = response.headers["content-disposition"];
      let filename = "Zones.kml";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Create download link
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Cleanup
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

  // Rest of the component remains the same
  return (
    <>
      <div className="flex flex-col p-4 space-y-4 ">
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Select a Zone Definition File
        </Typography>
        <div className="ml-5 flex items-center">
          <div className="flex items-center space-x-4">
            <input
              type="file"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
          </div>

          <div className="flex space-x-4 h-full justify-center items-center ">
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className="flex items-center space-x-2"
              variant="contained"
              color="primary"
              sx={{
                // Red border (you can change the color)
                backgroundColor: "#1569CB",
              }}
            >
              {/* <Upload className="w-4 h-4" /> */}
              <span>Import Kml File</span>
            </Button>

            <Button
              onClick={handleDownload}
              disabled={isLoading}
              variant="outline"
              className="flex items-center space-x-2"
            >
              {/* <Download className="w-4 h-4" /> */}
              <span>Download File</span>
            </Button>
          </div>
        </div>
        <div className="flex gap-4 bg-[#d9edf7] p-4 rounded-md items-start max-w-[600px]">
          <p className="text-gray-700 text-sm ">
            Zones can be defined by importing a KML file. To create your KML
            file, use{" "}
            <a
              href="https://www.google.com/mymaps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Google MyMaps
            </a>
            , or a KML-generating mapping tool of your choice. A single KML file
            is required for each Zone.
          </p>
        </div>
      </div>
    </>
  );
};

export default Uploadpricezone;
