import "./styles.css";
import React, { useState } from "react";
import { Button, Chip, CircularProgress, Divider, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmCodePage from "../../components/ConfirmCodePage";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const navigteToLogin = () => {
    navigate("/authenticate");
  };
  
  const handleSubmit = () => {
    setLoading(true);
    if (email === "") {
      setError(true);
      setLoading(false);
      return;
    }

    const url = `/api/auth/forgetPassword?email=${email}`;
    axios
      .get(url)
      .then((resp) => {
        if (resp.status === 200) {
          setValid(true);
          setLoading(false);
        } else {
          console.log(resp.data);
        }
      })
      .catch((err) => {
        const error = err.response.data;

        if (error.status === "NOT_FOUND") {
          setError(true);
          setLoading(false);
        }
      });

    console.log(email);
  };

  const codeMessage =
    "Please enter the Verification code you received in your inbox: ";
  const confirmMessage =
    "You password has successfully been reset. A temp login details has been sent to your inbox.";
  const type = "verifyResetPasswordCode";
  return (
    <div className="">
      {valid && (
        <ConfirmCodePage
          codeMessage={codeMessage}
          confirmMessage={confirmMessage}
          type={type}
        />
      )}

      {!valid && (
        <div className="forgetPassword">
          <div className="confirmEmail__form">
            <Typography variant="h4">
              Please provide your email address associated with your account:
            </Typography>
            <br />
            <br />
            <TextField
              type="email"
              name="email"
              fullWidth
              onChange={(e) => {
                setError(false);
                setEmail(e.target.value);
              }}
              value={email}
              label="Email Address"
              helperText="Please provide your email address"
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

            <br />
            <br />
            <Divider>
              <Chip label="or" />
            </Divider>
            <br />
            <Button variant="outlined" fullWidth onClick={navigteToLogin}>
              Ignore
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
