import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormHelperText,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    userAgreement: false,
  });

  const [errors, setErrors] = useState({});
  const [userAgreementError, setUserAgreementError] = useState(false);

  const handleClose = () => {
    setModalOpen(!modalOpen);
  };

  const onChangeHandler = (event) => {
    //clearerrors
    setErrors({
      ...errors,
      [event.target.name]: false,
    });

    setSignupDetails({
      ...signupDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setisLoading(true);

    const {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
      userAgreement,
    } = signupDetails;

    if (firstName === "") {
      setErrors({
        ...errors,
        firstName: true,
      });
      setisLoading(false)
      return;
    }
    if (lastName === "") {
      setErrors({
        ...errors,
        lastName: true,
      });
      setisLoading(false)
      return;
    }
    if (email === "") {
      setErrors({
        ...errors,
        email: true,
      });
      setisLoading(false)
      return;
    }
    if (username === "") {
      setErrors({
        ...errors,
        username: true,
      });
      setisLoading(false)
      return;
    }

    if (password === "") {
      setErrors({
        ...errors,
        password: true,
      });
      setisLoading(false)
      return;
    }

    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: true,
      });
      setisLoading(false)
      return;
    }

    if (!userAgreement) {
      setUserAgreementError(true);
      setisLoading(false)
      return;
      // alert("Please accept terms and condition");
    }

    //make call to backend

    const url = "/api/auth/signup";
    const data = {
      firstName: signupDetails.firstName,
      lastName: signupDetails.lastName,
      email: signupDetails.email,
      username: signupDetails.username,
      password: signupDetails.password,
    };

   
    axios.post(url, data).then((resp) => {
      if (resp.status === 200) {

        console.log(resp.data);

        navigate("/confirm-email")
        setisLoading(false);
      }else{
        console.log(resp.data);
        // setisLoading(false);
      }
      
      
    })
    .catch(err=>{
      console.log(err.response.data)
    })
  };
  return (
    <div className="modalWrapper">
      <Modal
        // sx={{height: "100vh"}}
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
              value={signupDetails.firstName}
              className="signupTextfield"
              name="firstName"
              label="First Name"
              defaultValue=""
              helperText="please provide your first name"
              error={errors?.firstName ? errors?.firstName : false}
              style={{ margin: ".1rem" }}
            />
            <TextField
              onChange={onChangeHandler}
              value={signupDetails.lastName}
              className="signupTextfield"
              name="lastName"
              label="Last Name"
              defaultValue=""
              helperText="please provide your last name"
              style={{ margin: ".1rem" }}
              error={errors?.lastName ? errors?.lastName : false}
            />
            <br />
            <br />
            <TextField
              onChange={onChangeHandler}
              value={signupDetails.email}
              className="signupTextfield"
              name="email"
              label="Email Address"
              type="email"
              helperText="please provide your first name"
              style={{ margin: ".1rem" }}
              error={errors?.email ? errors?.email : false}
            />

            <TextField
              onChange={onChangeHandler}
              value={signupDetails.username}
              className="signupTextfield"
              name="username"
              label="Username"
              type="text"
              helperText="please provide your username"
              style={{ margin: ".1rem" }}
              error={errors?.username ? errors?.username : false}
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
              value={signupDetails.password}
              className="signupTextfield"
              name="password"
              label="Password"
              helperText="Please provide a strong password"
              type="password"
              style={{ margin: ".1rem" }}
              error={errors?.password ? errors?.password : false}
            />

            <TextField
              onChange={onChangeHandler}
              value={signupDetails.confirmPassword}
              className="signupTextfield"
              name="confirmPassword"
              label="Confirm Password"
              helperText="Confirm Password must match your password"
              type="password"
              style={{ margin: ".1rem" }}
              error={errors?.confirmPassword ? errors?.confirmPassword : false}
            />
            <br />
            <br />
            <FormControlLabel
              // value={}

              // error = {errors?.userAgreement ? errors?.userAgreement : false}
              control={
                <Checkbox
                  name="userAgreement"
                  value={signupDetails?.userAgreement}
                  onChange={
                  (e)=>{
                    setSignupDetails({
                      ...signupDetails,
                      userAgreement: e.target.value
                    })
                  }  
                  }
                />
              }
              label="Accept Terms and Agreement of sharehub"
            />

            {userAgreementError && (
              <FormHelperText sx={{ color: "red" }}>
                Please accept Terms and agreement
              </FormHelperText>
            )}
            <br />
            <br />
            <Button variant="contained"  disabled={isLoading} fullWidth type="submit" onClick={handleSubmit}>
              Sign up  
              {isLoading && <CircularProgress />}
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
