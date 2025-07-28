import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteDialog = ({ handleDelete, trigger }) => {
  const [showDeleteDailog, setShowDelete] = useState(false);

  const handleOpen = () => setShowDelete(true);
  const handleClose = () => setShowDelete(false);

  return (
    <div>
      {trigger ? (
        // If custom trigger is passed, render it
        <span onClick={handleOpen} style={{ cursor: "pointer" }}>
          {trigger}
        </span>
      ) : (
        // Default trigger: delete icon
        <DeleteIcon
          onClick={handleOpen}
          style={{
            color: "#1976d2",
            fontSize: 25,
            textAlign: "center",
            margin: "0 auto",
            cursor: "pointer",
          }}
        />
      )}

      <Dialog open={showDeleteDailog} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="!bg-primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await handleDelete();
              handleClose();
            }}
            sx={{
              backgroundColor: "#d32f2f !important", // red shade
              color: "#fff",
              "&:hover": {
                backgroundColor: "#9a0007",
              },
            }}
            className="!bg-red-800 !text-white"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
