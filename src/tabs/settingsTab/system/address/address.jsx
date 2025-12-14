import React, { useState } from "react";
import { 
  Button, 
  Menu, 
  MenuItem, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  IconButton,
  Box,
  Typography
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import SubTabNavigator from "../../../../components/subTabNavigator";
import AddresGrid from "./addresGrid";
import { Link } from "react-router-dom";
import { postRequest } from "../../../../consts/apiCalls";
import axios from "axios";
import useToast from "../../../../components/toast/useToast";

export const Address = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [importAnchorEl, setImportAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImportType, setSelectedImportType] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError, showWarning } = useToast();
  
  const open = Boolean(anchorEl);
  const importOpen = Boolean(importAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    console.log("Selected:", option);
    setAnchorEl(null);
  };

  const handleImportClick = (event) => {
    setImportAnchorEl(event.currentTarget);
  };

  const handleImportClose = () => {
    setImportAnchorEl(null);
  };

  const handleImportOption = (option) => {
    setSelectedImportType(option);
    setModalOpen(true);
    setImportAnchorEl(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedFile(null);
    setDragActive(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
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

      const endpoint = selectedImportType.toLowerCase() === "contacts" 
        ? "/address/upload-contact" 
        : "/address/upload-global";

      await postRequest(endpoint, formData, {
        "Content-Type": "multipart/form-data",
      });

      showSuccess(`${selectedImportType} imported successfully!`);
      handleModalClose();
    } catch (error) {
      showError(`Error importing ${selectedImportType.toLowerCase()}`);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    setIsLoading(true);
    try {
      const endpoint = selectedImportType.toLowerCase() === "contacts"
        ? "/address/download-contact-template"
        : "/address/download-global-template";

      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "*/*",
        },
      });

      const contentDisposition = response.headers["content-disposition"];
      let filename = `${selectedImportType}_Template.xlsx`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename\*?=(?:UTF-8'')?["']?([^;"'\n]*)["']?/
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
      
      showSuccess("Template downloaded successfully!");
    } catch (error) {
      showError("Error downloading template");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Users", url: "/settings/system/users" },
          { lable: "Address", url: "/settings/system/address" },
        ]}
      />
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Button 
          variant="contained" 
          onClick={handleClick} 
          endIcon={<ArrowDropDownIcon />}
        >
          New Address
        </Button>
        
        <Button 
          variant="contained" 
          onClick={handleImportClick} 
          endIcon={<ArrowDropDownIcon />}
        >
          Import
        </Button>
        
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(null)}
          PaperProps={{
            style: {
              width: 150,
            },
          }}
        >
          <Link to={"create/NewContact"}>
            <MenuItem onClick={() => handleClose("Contact")}>Contact</MenuItem>
          </Link>
          <Link to={"create/NewHub"}>
            <MenuItem onClick={() => handleClose("Hub")}>Hub</MenuItem>
          </Link>
          <Link to={"create/NewGlobalAddress"}>
            <MenuItem onClick={() => handleClose("Global")}>Global</MenuItem>
          </Link>
        </Menu>

        <Menu
          anchorEl={importAnchorEl}
          open={importOpen}
          onClose={handleImportClose}
          PaperProps={{
            style: {
              width: 150,
            },
          }}
        >
          <MenuItem onClick={() => handleImportOption("Contacts")}>
            Contacts
          </MenuItem>
          <MenuItem onClick={() => handleImportOption("Global")}>
            Global
          </MenuItem>
        </Menu>
      </div>
      
      <AddresGrid />
      
      <Dialog 
        open={modalOpen} 
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
          pb: 2
        }}>
          <Typography variant="h6">
            Import {selectedImportType}
          </Typography>
          <IconButton onClick={handleModalClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ mt: 2 }}>
          <Box
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload").click()}
            sx={{
              border: dragActive ? "2px dashed #1976d2" : "2px dashed #ccc",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              backgroundColor: dragActive ? "#f0f7ff" : "#fafafa",
              cursor: "pointer",
              transition: "all 0.3s ease",
              mb: 2
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Drag & Drop file here
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              DROP FILE HERE TO UPLOAD
            </Typography>
            
            <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              onChange={handleFileSelect}
              accept=".csv,.xlsx,.xls"
            />
            
            {selectedFile ? (
              <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
                Selected: {selectedFile.name}
              </Typography>
            ) : (
              <Box sx={{ 
                mt: 2, 
                display: "inline-block",
                padding: "8px 16px",
                backgroundColor: "#e0e0e0",
                borderRadius: 1,
                cursor: "pointer"
              }}>
                <Typography variant="body2">
                  Select a File...
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<CloudUploadIcon />}
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<DownloadIcon />}
              onClick={handleDownloadTemplate}
              disabled={isLoading}
            >
              {isLoading ? "Downloading..." : "Download Template"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};