import "./styles.css";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    if (code === "") {
      setError(true);
      setLoading(false);
      return;
    }

    const url = `/api/auth/verify?code=${code}`;

    axios.get(url).then((resp) => {
      if(resp.status===200){
        setConfirmed(true)
        setLoading(false);
      } else{
        console.log(resp.data)
      }
    }).catch(err=>{
      console.log(err)
    });

    setLoading(false);
  };
  const navigteToLogin=()=>{
    navigate("/authenticate")
  }
  return (
    <div className="confirmEmail">
      {confirmed ? (
        <div>
          <Typography variant="h4">
            Your Email has successfully been verified. 
          </Typography>
          <br /> <br />
          <Button variant="outlined" onClick={navigteToLogin}>
            Continue to Login
          </Button>
        </div>
      ) : (
        <div className="confirmEmail__form">
          <Typography variant="h4">
            An Email verification Code has been sent to your inbox: Please provide it below to proceed.
          </Typography>
          <br />
          <br />
          <TextField
            name="code"
            fullWidth
            onChange={(e) => {
              setError(false);
              setCode(e.target.value);
            }}
            value={code}
            label="Email Confirmation Code"
            helperText="Please Enter Your email Confirmation Code"
            style={{ margin: ".1rem" }}
            error={error}
          />
          <br />
          <br />
          <Button
            variant="contained"
            disabled={loading}
            fullWidth
            onClick={handleSubmit}
          >
            Submit Confirmation
            {loading && <CircularProgress />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConfirmEmail;
