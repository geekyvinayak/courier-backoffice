import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

export const DeleteDialog = ({handleDelete,handleClose,open}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
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
          <Button onClick={handleDelete} className="!bg-red-800 !text-white">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
