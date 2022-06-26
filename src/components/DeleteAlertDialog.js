import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import React from 'react'

const DeleteAlertDialog = ({confirmDelete, open, handleClose}) => {
  
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this experience?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action is permanent and you cannot recover this exprience once deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='secondary' onClick={handleClose}>No, Cancel</Button>
            <Button onClick={confirmDelete} autoFocus>
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default DeleteAlertDialog