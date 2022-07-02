import "./editProfile.css";
import React, { useContext, useState } from "react";
import MainAppBar from "../../components/MainAppBar";
import {
  Button,
  CircularProgress,
  Input,
  Modal,
  TextField,
} from "@mui/material";
import { AppContext } from "../../states/AppContext";
import { Add } from "@mui/icons-material";
import axios from "axios";

const EditProfile = ({
  openEditProfileModal,
  setOpenEditProfileModal,
  currentUserDetails,
}) => {
  const [state, dispatch] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(
    currentUserDetails?.imageUrl?.attachmentUrl
  );
  const [completeRegistrationDetails, setCompleteRegistrationDetails] =
    useState({
      website: currentUserDetails.website,
      nickname: currentUserDetails.nickname,
      dateOfBirth: currentUserDetails.dateOfBirth,
      address: currentUserDetails.address,
    });

  const [errors, setErrors] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState(
    currentUserDetails?.imageUrl?.attachmentUrl
  );

  //Image upload
  const handleNewProfilePicUpload = (event) => {
    setErrors({
      ...errors,
      profilePicture: false,
    });

    var file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    setSelectedFile(file);
    setProfilePicPreview(url);
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

    //check if profile picture is changed
    let profileP = {
      attachmentName: currentUserDetails?.imageUrl?.attachmentName,
      attachmentUrl: currentUserDetails?.imageUrl?.attachmentUrl,
      type: currentUserDetails?.imageUrl?.type,
    };

    if (selectedFile !== currentUserDetails?.imageUrl?.attachmentUrl) {
      const editProfilePicUrl = "/api/storage/changeProfilePic";
      const data = new FormData();
      data.append("newProfilePic", selectedFile);
      data.append(
        "attachmentName",
        currentUserDetails?.imageUrl?.attachmentName
      );

      axios
        .put(editProfilePicUrl, data)
        .then((resp) => {
          if (resp.status === 200) {
            profileP.attachmentUrl = resp.data.response.url;
            profileP.attachmentName = resp.data.response.filename;
            profileP.type = resp.data.response.type;

            const updateUrl = "/api/auth/updateUser";
            const updateData = {
              address: completeRegistrationDetails.address,
              website: completeRegistrationDetails.website,
              nickname: completeRegistrationDetails.nickname,
              dateOfBirth: completeRegistrationDetails.dateOfBirth,
              imageUrl: profileP,
            };
            axios
              .put(updateUrl, updateData)
              .then((resp) => {
                if (resp.status === 200) {
                  dispatch({
                    type: "UPDATE_CURRENT_USER_DETAILS",
                    payload: updateData,
                  });
                }
                handleClose();
                setIsLoading(false);
                return;
              })
              .catch((err) => {
                console.log(err.response.data);
                handleClose();
                setIsLoading(false);
              });

          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setIsLoading(false);
        });

      
    } else{
      const updateUrl = "/api/auth/updateUser";
      const updateData = {
        address: completeRegistrationDetails.address,
        website: completeRegistrationDetails.website,
        nickname: completeRegistrationDetails.nickname,
        dateOfBirth: completeRegistrationDetails.dateOfBirth,
        imageUrl: profileP,
      };
      axios
        .put(updateUrl, updateData)
        .then((resp) => {
          if (resp.status === 200) {
            dispatch({
              type: "UPDATE_CURRENT_USER_DETAILS",
              payload: updateData,
            });
          }
          handleClose();
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          handleClose();
          setIsLoading(false);
        });
    }

   

    // handleClose();
  };

  const handleClose = () => {
    setOpenEditProfileModal(!openEditProfileModal);
  };

  return (
    <Modal
      open={openEditProfileModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="editProfile__form"
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
          <label htmlFor="uploadProfilePicture">
            <Input
              accept="image/png, image/jpeg"
              id="uploadProfilePicture"
              name="imageUrl"
              //   value={selectedFile}
              type="file"
              onChange={handleNewProfilePicUpload}
              sx={{ display: "none" }}
            />

            <Add sx={{ margin: "auto" }} fontSize="large" />
            <h4>Change Profile Picture</h4>
          </label>
          <br />
          <br />
          {selectedFile !== "" && (
            <div className="profile_pic_preview">
              <img src={profilePicPreview} alt="selected Profile picture" />
            </div>
          )}
        </div>
        {errors.profilePicture && (
          <p style={{ color: "red" }}>Please upload a profile picture</p>
        )}
        <br />
        <br />

        <Button
          variant="contained"
          disabled={isLoading}
          fullWidth
          type="submit"
        >
          Save Changes
          {isLoading && <CircularProgress />}
        </Button>
      </form>
    </Modal>
  );
};

export default EditProfile;
