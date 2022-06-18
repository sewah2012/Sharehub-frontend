import "./styles.css";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmCodePage from "../../components/ConfirmCodePage";

const ConfirmEmail = () => {

    // const url = `/api/auth/verify?code=${code}`;
    const codeMessage = "Please provide the Email Verification code you received in your inbox: "
    const confirmMessage = "You email is successfully verified"
    
  return (
   <ConfirmCodePage codeMessage={codeMessage} confirmMessage={confirmMessage}/>
  );
};

export default ConfirmEmail;
