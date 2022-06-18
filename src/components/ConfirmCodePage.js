import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const ConfirmCodePage = ({ codeMessage, confirmMessage }) => {
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

    axios
      .get(url)
      .then((resp) => {
        if (resp.status === 200) {
          setConfirmed(true);
          setLoading(false);
        } else {
          console.log(resp.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };
  const navigteToLogin = () => {
    navigate("/authenticate");
  };

  return (
    <div className="confirmEmail">
      {confirmed ? (
        <div className="confirmEmail__form">
          <Typography variant="h4">{confirmMessage}</Typography>
          <br /> <br />
          <Button variant="outlined" onClick={navigteToLogin}>
            Continue to Login
          </Button>
        </div>
      ) : (
        <div className="confirmEmail__form">
          <Typography variant="h4">{codeMessage}</Typography>
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

export default ConfirmCodePage;
