import "./styles/completeRegistration.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../states/AppContext";
import { Button, CircularProgress, Input, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";

const CompleteRegistration = () => {
  const [{ currentUserDetails }, dispatch] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [completeRegistrationDetails, setCompleteRegistrationDetails] =
    useState({
      website: "",
      nickname: "",
      dateOfBirth: "",
      address: "",
    });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");

  const handleImageUpload = (event) => {
    var file = event.target.files[0];

    console.log(file);

    const url = URL.createObjectURL(file);
    console.log(url);
    setSelectedFile(file);
    setPreview(url);
  };

  const onChangeHandler = (event) => {
    //clearerrors
    setErrors({
      ...errors,
      [event.target.name]: false,
    });

    setCompleteRegistrationDetails({
        ...completeRegistrationDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (completeRegistrationDetails.address === "") {
      setErrors({
        ...errors,
        address: true,
      });
      setIsLoading(false);
      return;
    }
    if (completeRegistrationDetails.dateOfBirth === "") {
      setErrors({
        ...errors,
        dateOfBirth: true,
      });
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    const profile_upload_url = "/api/storage/upload/image";



    axios({
      method: "post",
      url: profile_upload_url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((resp) => {
        if (resp.status === 200) {
          const { filename, type, url } = resp.data.response;

         const att = {
            attachmentName: filename,
            type: type,
            attachmentUrl: url,
          };

          console.log(att);

          const data = {
            address: completeRegistrationDetails.address,
            website: completeRegistrationDetails.website,
            nickname: completeRegistrationDetails.nickname,
            dateOfBirth: completeRegistrationDetails.dateOfBirth,
            imageUrl: att,
          };

          console.log(data);

          axios
            .post("/api/auth/completeSignup", data)
            .then((response) => {
              if (response.status === 200) {
                // console.log(response.data);
                setIsLoading(false);
                dispatch({
                  type: "REGISTRATION_COMPLETE",
                  payload: true
                })
              }

              return;
            })
            .catch((error) => {
              console.log(error.response.data);
              setIsLoading(false);
            });

          return;
        }
        
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsLoading(false);
        // setRegComplete(true)
      });

    //save stuff ...

   
  };
  return (
    <div className="completeRegistration">
      <h4>
        Welcome <span>{currentUserDetails.firstName}</span>. Please complete
        your registration below{" "}
      </h4>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="completeRegistration__form"
      >
        <TextField
          fullWidth
          onChange={onChangeHandler}
          value={completeRegistrationDetails.website}
          name="website"
          label="Website"
          helperText="please provide your Website"

        />
        <br />
        <br />
        <TextField
          fullWidth
          onChange={onChangeHandler}
          value={completeRegistrationDetails.nickname}
          name="nickname"
          label="Nickname"
          helperText="please provide your last name"
          //   style={{ margin: ".1rem" }}
          //   error={errors?.lastName ? errors?.lastName : false}
        />
        <br />
        <br />
        <TextField
          fullWidth
          onChange={onChangeHandler}
          value={completeRegistrationDetails.address}
          name="address"
          label="Addres"
          type="text"
          helperText="please provide your first name"
          style={{ margin: ".1rem" }}
          error={errors?.address}
        />
        <br />
        <br />
        <TextField
          fullWidth
          name="dateOfBirth"
          label="Birthday"
          type="date"
          onChange={onChangeHandler}
          value={completeRegistrationDetails.dateOfBirth}
          helperText="Please select your birthdate"
          error={errors?.dateOfBirth}
          style={{ margin: ".1rem" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />

        <div className="profile_pic">
          <label htmlFor="uploadAttachement">
            <Input
              accept="image/png, image/jpeg"
              id="uploadAttachement"
              name="imageUrl"
              //   value={selectedFile}
              type="file"
              onChange={handleImageUpload}
              sx={{ display: "none" }}
            />

            <Add sx={{ margin: "auto" }} fontSize="large" />
            <h4>Upload Profile Picture</h4>
          </label>
          <br />
          <br />
          <div className="profile_pic_preview">
            <img src={preview} alt="selected Profile picture" />
          </div>
        </div>

        <br />
        <br />

        <Button
          variant="contained"
          disabled={isLoading}
          fullWidth
          type="submit"
        >
          Finish
          {isLoading && <CircularProgress />}
        </Button>
      </form>
    </div>
  );
};

export default CompleteRegistration;
