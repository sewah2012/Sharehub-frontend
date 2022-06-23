import "./styles/AddExperience.css";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Add, PhotoCamera, Upload } from "@mui/icons-material";
import axios from "axios";
import { AppContext } from "../states/AppContext";

const experienceTypes = ["LOCATION", "SERVICE"];

const AddExperience = ({ open, setOpen }) => {
const [{experience},dispatch] = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [attachements, setAttachements] = useState([]);
  const [experienceDetails, setExperienceDetails] = useState({
    title: "",
    details: "",
    experienceType: "SERVICE",
  });

  const handleChange = (event) => {
    // alert("Experience sent")

    setExperienceDetails({
      ...experienceDetails,
      [event.target.name]: event.target.value,
    });
  };
  const handleImageUpload = (event) => {
    var file = event.target.files[0];

    console.log(file);

    const url = URL.createObjectURL(file);
    console.log(url);
    // setSelectedFile(event.target.files[0])

    setAttachements([
      ...attachements,
      {
        file,
        url,
      },
    ]);
  };

  const removeAttachement = (url) => {
    var newAtt = attachements.filter((a) => a.url !== url);
    // console.log(newAtt);
    setAttachements(newAtt);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // alert("new exp submited")

    // const multipartsfiles = [];

    const bodyFormData = new FormData();

    attachements.forEach((a) => {
      bodyFormData.append("attachements", a.file);
    });

    console.log("bodyFormData: " + bodyFormData);
    bodyFormData.append("experience", JSON.stringify(experienceDetails));
    console.log("bodyFormData: " + bodyFormData);

    axios({
      method: "post",
      url: "/api/experience/add",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        if (res.status === 200) {
            dispatch({
                type: "LOAD_EXPERIENCES",
                payload: [
                    res.data,
                    ...experience
                ]

            })

          setAttachements([]);
          setExperienceDetails({
            title: "",
            details: "",
            experienceType: "SERVICE",
          });

          setIsLoading(false);
          setOpen(!open);
        }

      })
      .catch((err) => {
        console.log(err.response.data);
        alert(json.stringify(err.response.data))
        setIsLoading(false);
      });

   
  };
  return (
    <div className="addExp">
      <div className="addExp__form">
        <div className="addExp__form-heading">
          <h3>Share some experience </h3>
          <form onSubmit={handleSubmit} encType="multipart/form">
            <TextField
              name="experienceType"
              select
              label="Experience Type"
              value={experienceDetails.experienceType}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              fullWidth
            >
              {experienceTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </TextField>
            <br />
            <br />
            <TextField
              required
              name="title"
              label="Title"
              fullWidth
              value={experienceDetails.title}
              onChange={handleChange}
            />

            <br />
            <br />
            <TextField
              required
              name="details"
              label="Details "
              fullWidth
              multiline
              minRows={5}
              value={experienceDetails.details}
              onChange={handleChange}
            />

            <br />
            <br />

            <div className="attachements">
              {attachements.map((a, index) => {
                return (
                  <div>
                    <div key={index} className="attachementHolder">
                      <img src={a.url} alt={a.file.name} />
                    </div>
                    <Button
                      key={a.url}
                      onClick={() => removeAttachement(a.url)}
                    >
                      {" "}
                      Remove
                    </Button>
                  </div>
                );
              })}
              <div className="attachementHolder upload">
                <label htmlFor="uploadAttachement">
                  <Input
                    accept="image/png, image/jpeg"
                    id="uploadAttachement"
                    name="fileToUpload"
                    value={selectedFile}
                    type="file"
                    onChange={handleImageUpload}
                    sx={{ display: "none" }}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <Add sx={{ margin: "auto" }} fontSize="large" />
                  </IconButton>
                </label>
              </div>
            </div>

            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#3b3b3d " }}
              disabled={isLoading}
            >
              Share {isLoading && <CircularProgress />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExperience;
