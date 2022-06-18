import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SignupModal = ({ modalOpen, setModalOpen }) => {
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  })

  const handleClose = () => {
    setModalOpen(!modalOpen);
  };

  const onChangeHandler = (event) => {
    setSignupDetails({
      ...signupDetails,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = (event)=>{
    event.preventDefault()
      alert(signupDetails.firstName)
  }
  return (
    <div className="modalWrapper">
      <Modal
        // sx={{height: "100%"}}
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="signupModalForm">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Setup an Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
            onChange={onChangeHandler}
            value = {signupDetails.firstName}
            className="signupTextfield"
              name="firstName"
              label="First Name"
              defaultValue=""
              helperText="please provide your first name"
              style={{ margin: ".1rem" }}
            />
            <TextField
            onChange={onChangeHandler}
            value = {signupDetails.lastName}
            className="signupTextfield"
              name="lastName"
              label="Last Name"
              defaultValue=""
              helperText="please provide your last name"
              style={{ margin: ".1rem" }}
            />
            <br />
            <br />
            <TextField
            onChange={onChangeHandler}
            value = {signupDetails.email} 
            className="signupTextfield"
              name="email"
              label="Email Address"
              type="email"
              helperText="please provide your first name"
              style={{ margin: ".1rem" }}
            />

            <TextField
            onChange={onChangeHandler}
            value = {signupDetails.username}
            className="signupTextfield"
              name="username"
              label="Username"
              type="text"
              helperText="please provide your username"
              style={{ margin: ".1rem" }}
            />

            {/* <TextField
            name="dateOfBirth"
            label="Birthday"
            type="date"
            defaultValue="1998-08-22"
            helperText="please select your birthdate"
            style={{ margin: ".1rem" }}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
            <br />
            <br />
            <TextField
            onChange={onChangeHandler}
            value = {signupDetails.password}
            className="signupTextfield"
              name="password"
              label="Password"
              helperText="Please provide a strong password"
              type="password"
              style={{ margin: ".1rem" }}
            />

            <TextField
            onChange={onChangeHandler}
            value = {signupDetails.confirmPassword}
            className="signupTextfield"
              name="confirmPassword"
              label="Confirm Password"
              helperText="Please enter again your password"
              type="password"
              style={{ margin: ".1rem" }}
            />
            <br />
            <br />
            <FormControlLabel
              // value={}
              control={<Checkbox defaultChecked={false} />}
              label="Accept Terms and Agreement of sharehub"
              
            />
            <br />
            <br />
            <Button variant="contained" fullWidth>
              Sign up
            </Button>
            <br />
            <br />
            <Divider>
              <Chip label="or" />
            </Divider>
            <br />
            <Typography variant="body">
              Have an account ?
              <Button onClick={handleClose} variant="text">
                {" "}
                Sign in{" "}
              </Button>
            </Typography>
          </form>
        </div>
      </Modal>
    </div>
      
   
  );
};

export default SignupModal;
