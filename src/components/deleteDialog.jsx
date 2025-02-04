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

export const DeleteDialog = ({ handleDelete }) => {
  const [showDeleteDailog, setShowDelete] = useState(false);
  return (
    <div>
      <DeleteIcon
        onClick={() => setShowDelete(true)}
        style={{ color: "#1976d2" }}
      />
      <Dialog open={showDeleteDailog} onClose={() => setShowDelete(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDelete(false)} className="!bg-primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await handleDelete();
              setShowDelete(false);
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
