import "./styles.css";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Label, } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SignupModal from "./SignupModal";

const Authenticate = () => {
  const [openModal, setopenModal] = useState(false);

  const modalHandler=()=>{
    setopenModal(!openModal);
  }
  return (
    <div className="auth">
      <div className="auth__main">
        <div className="auth__main-left">
          <img src="/assets/imgs/logo.svg" alt="sharehub-logo" />
          <p>
            whether it is a business experience for example : plumbing,
            mechanics, DIY, etc.) or an experience at a your famous restaurant
            or theatre, Share Hub allows you to share your experiences with the
            world and help people make informed choices.{" "}
          </p>
        </div>

        <div className="auth__main-right">
          <Paper style={{ padding: "1.5rem", width: "100%" }}>
            <TextField
              name="username"
              label="Username"
              defaultValue=""
              helperText="please provide your sharehub username"
              style={{ width: "100%" }}
            />
            <br />
            <br />
            <TextField
              name="password"
              label="Password"
              defaultValue=""
              helperText="please provide your sharehub password"
              style={{ width: "100%" }}
            />
            <br />
            <br />
            
            <Link to="/forgot-password" variant="body2">
              {'Forgot password?'}
            </Link>
            <br />
            <br />
            <Button variant="contained" fullWidth>
              Log in
            </Button>
            <br />
            <br />
            <Divider>
              <Chip label="or" />
            </Divider>
            <br />
            <Button variant="contained" fullWidth onClick={modalHandler}>
              Create a new account
            </Button>
          </Paper>
        </div>
      </div>
      {/* <div className="auth__footer">
        <Typography variant="h4">
          Designed and Developed by: Emmanuel Sahr Sewah
        </Typography>

        <Typography variant="h4">
          Supervised by: Prof. Yassine
        </Typography>
      </div> */}

      <SignupModal modalOpen={openModal} setModalOpen={setopenModal} />
    </div>
  );
};

export default Authenticate;
