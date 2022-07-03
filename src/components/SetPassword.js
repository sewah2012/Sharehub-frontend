import "./styles/setpassword.css";
import React, { useContext, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { AppContext } from "../states/AppContext";

const SetPassword = ({ setSetPassword }) => {
  const [{ currentUserDetails }, dispatch] = useContext(AppContext);
  const [isLoading, setisLoading] = useState(false);
  const [newPasswordDetails, setNewPasswordDetails] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const onChangeHandler = (event) => {
    //clearerrors
    setErrors({
      ...errors,
      [event.target.name]: false,
    });

    setNewPasswordDetails({
      ...newPasswordDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setisLoading(true);

    const { password, confirmPassword } = newPasswordDetails;

    if (password === "") {
      setErrors({
        ...errors,
        password: true,
      });
      setisLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: true,
      });
      setisLoading(false);
      return;
    }

    //make call to backend

    const url = "/api/auth/newPassword";
    const data = {
      password: newPasswordDetails.password,
      username: currentUserDetails.username,
    };

    axios
      .post(url, data)
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data);
          setSetPassword(false);
          setisLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <div className="resetPassword">
      <div className="resetPassword__form">
        <h4>Please Set your new password and keep it safe.</h4>

        <TextField
          onChange={onChangeHandler}
          value={newPasswordDetails.password}
          className="setPasswordTextField"
          name="password"
          label="Password"
          helperText="Please provide a strong password"
          type="password"
          style={{ margin: ".1rem" }}
          error={errors?.password ? errors?.password : false}
        />

        <TextField
          onChange={onChangeHandler}
          value={newPasswordDetails.confirmPassword}
          className="setPasswordTextField"
          name="confirmPassword"
          label="Confirm Password"
          helperText="Confirm Password must match your password"
          type="password"
          style={{ margin: ".1rem" }}
          error={errors?.confirmPassword ? errors?.confirmPassword : false}
        />
        <br />
        <br />
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
          fullWidth
          type="submit"
        >
          Save Changes
          {isLoading && <CircularProgress />}
        </Button>
      </div>
    </div>
  );
};

export default SetPassword;
