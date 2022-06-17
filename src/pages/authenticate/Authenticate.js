import "./styles.css";
import React, { useContext, useState } from "react";
import { Button, Chip, Divider, Paper, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import SignupModal from "./SignupModal";
import axios from "axios";
import { AppContext } from "../../states/AppContext";
import { decodeToken } from "../../utilities/Utilities";

const Authenticate = () => {
  const [openModal, setopenModal] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    usernameError: false,
    passwordError: false,
  });

  const [state, dispatch] = useContext(AppContext);

  const onChangeHandler = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  const isFormInvalid = (loginDetails) => {
    let err;
    let { username, password } = loginDetails;
    if (username === "") {
      setLoginError({
        ...loginError,
        usernameError: true,
      });

      return true;
    }
    if (password === "") {
      setLoginError({
        ...loginError,
        passwordError: true,
      });
      return true;
    }

    return false;
  };

  const onSubmit = async () => {
    if (isFormInvalid(loginDetails)) return;

    const response = await axios.post("/api/auth/login", loginDetails);
    // console.log(response.status);

    if (response.status === 201) {
      const { message, token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      const currentUser = decodeToken(token)

      dispatch({
        type:"CURRENT_USER",
        payload: currentUser
      })

      dispatch({
        type: "LOGIN",
        payload: true,
      });
    }

    setLoginError({
      usernameError: false,
      passwordError: false,
    });

    setLoginDetails({
      username: "",
      password: "",
    });
  };

  const modalHandler = () => {
    setopenModal(!openModal);
  };
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
          <Paper style={{ width: "100%", padding: ".5rem" }}>
            <TextField
              name="username"
              label="Username"
              value={loginDetails.username}
              onChange={onChangeHandler}
              helperText="please provide your sharehub username"
              style={{ width: "100%" }}
              error={loginError.usernameError}
            />
            <br />
            <br />
            <TextField
              name="password"
              label="Password"
              value={loginDetails.password}
              onChange={onChangeHandler}
              helperText="please provide your sharehub password"
              type="password"
              style={{ width: "100%" }}
              error={loginError.passwordError}
            />
            <br />
            <br />

            <Link to="/forgot-password" variant="body2">
              {"Forgot password?"}
            </Link>
            <br />
            <br />
            <Button onClick={onSubmit} variant="contained" fullWidth>
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
