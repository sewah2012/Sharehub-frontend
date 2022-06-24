import "./styles.css";
import React, { useContext, useState } from "react";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import SignupModal from "./SignupModal";
import axios from "axios";
import { AppContext } from "../../states/AppContext";
import { decodeToken } from "../../utilities/Utilities";

const Authenticate = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    username: false,
    password: false,
  });

  const [state, dispatch] = useContext(AppContext);

  const onChangeHandler = (event) => {
    // alert("key pressed")
    setLoginError({
      ...loginError,
      [event.target.name]: false,
    });

    

    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  

  const onSubmit = (event) => {
    event.preventDefault()
    localStorage.removeItem("token");
    setLoading(true);
    let { username, password } = loginDetails;
    if (username === "") {
      setLoginError({
        ...loginError,
        username: true,
      });
      setLoading(false)
      return
    }
    if (password === "") {
      setLoginError({
        ...loginError,
        password: true,
      });
      setLoading(false)
      return
    }
   
    axios
      .post("/api/auth/login", loginDetails)
      .then((resp) => {
        if (resp.status === 201) {
          const { message, token } = resp.data;
          console.log(message);

          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;

          const currentUser = decodeToken(token);

          dispatch({
            type: "CURRENT_USER",
            payload: currentUser,
          });

          dispatch({
            type: "LOGIN",
            payload: true,
          });

            
          setLoginDetails({
            username: "",
            password: "",
          });

          setLoading(false);

          return 
        }

        
      })
      .catch((err) => {
      //  console.log(err.response.data);

       const error = err.response.data;

          
        if(error?.message==="Bad credentials"){
          setLoginError({
            ...loginError,
            password: true,
          });
          setLoading(false)

          return
        }

        if(error?.message==="An error occured while processing request"){
          setLoginError({
            ...loginError,
            username: true,
          });
          setLoading(false)

          return
        }

        setLoading(false)
      
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
          <Paper style={{ padding: "1rem"}}>
            <TextField
              name="username"
              label="Username"
              value={loginDetails.username}
              onChange={onChangeHandler}
              helperText="please provide your sharehub username"
              fullWidth
              error={loginError.username}
              autoFocus={false}
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
              fullWidth
              error={loginError.password}
              autoFocus={false}
            />
            <br />
            <br />

            <Link to="/forgot-password" variant="body2">
              {"Forgot password?"}
            </Link>
            <br />
            <br />
            <Button
              onClick={onSubmit}
              variant="contained"
              fullWidth
              disabled={loading}
            >
              Log in
              {loading && <CircularProgress />}
            </Button>
            <br />
            <br />
            <Divider>
              <Chip label="or" />
            </Divider>
            <br />
            <Button variant="outlined" fullWidth onClick={modalHandler}>
              Create a new account
            </Button>
          </Paper>
        </div>
        <SignupModal modalOpen={openModal} setModalOpen={setopenModal} />
      </div>
      {/* <div className="auth__footer">
        <Typography variant="h4">
          Designed and Developed by: Emmanuel Sahr Sewah
        </Typography>

        <Typography variant="h4">
          Supervised by: Prof. Yassine
        </Typography>
      </div> */}
    </div>
  );
};

export default Authenticate;
