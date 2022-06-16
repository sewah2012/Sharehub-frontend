import React from "react";
import { Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from "@mui/material";
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
  const handleClose = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h2" component="h2">
          Setup an Account
        </Typography>
        <Box>
          <TextField
            name="firstName"
            label="First Name"
            defaultValue=""
            helperText="please provide your first name"
            style={{ margin: ".1rem" }}
          />
          <TextField
            name="lastName"
            label="Last Name"
            defaultValue=""
            helperText="please provide your last name"
            style={{ margin: ".1rem" }}
          />
          <br />
          <br />
          <TextField
            name="email"
            label="Email Address"
            type="email"
            helperText="please provide your first name"
            style={{ margin: ".1rem" }}
          />

          <TextField
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
            name="password"
            label="Password"
            helperText="Please provide a strong password"
            type="password"
            style={{ margin: ".1rem" }}
          />

          <TextField
            name="passwordConfirmation"
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
            <Button variant="contained" fullWidth >
              Sign up
            </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignupModal;
