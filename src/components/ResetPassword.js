import "./styles/resetpassword.css";
import React, { useContext, useState } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { AppContext } from "../states/AppContext";
import axios from "axios";

const ResetPassword = ({openResetPopup, handleClose}) => {
    const [{currentUserDetails}, dispatch] = useContext(AppContext)
    const [loading, setLoading] = useState(false)

    const resetPassword = ()=>{
        setLoading(true)
        const url = `/api/auth/resetPassword/${currentUserDetails?.username}`

        axios.get(url)
        .then(resp=>{
            if(resp.status ===200){
                localStorage.removeItem("token");
                dispatch({
                    type: "SIGNOUT",
                    payload: false
                })
                setLoading(false)
                handleClose()
            }
        })
        .catch(err=>{
            console.log(err.response.data)
            setLoading(false)

        })

        
    }
  return (
    <div>
      <Dialog
        open={openResetPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to reset your password?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Once you reset your password you will be logged out and receive an email that contains your temp password information. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, Cancel</Button>
          <Button disabled={loading} onClick={resetPassword} autoFocus>
            Yes, Confirm 
            {loading && <CircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResetPassword;
