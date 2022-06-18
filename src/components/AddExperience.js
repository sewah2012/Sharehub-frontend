import "./styles/AddExperience.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Add, PhotoCamera, Upload } from "@mui/icons-material";
import axios from "axios";

const experienceTypes = ["LOCATION", "SERVICE"];

const AddExperience = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [attachements, setAttachements] = useState([]);
  const [experience, setExperience] = useState({
    title: "",
    details: "",
    experienceType: "SERVICE",
  });

  const handleChange = (event) => {
    // alert("Experience sent")

    setExperience({
      ...experience,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // alert("new exp submited")

    // const multipartsfiles = [];

    const bodyFormData = new FormData();

    attachements.forEach((a) => {
      bodyFormData.append("attachements", a.file);
    });

    console.log("bodyFormData: " + bodyFormData);
    bodyFormData.append("experience", JSON.stringify(experience));
    console.log("bodyFormData: " + bodyFormData);

    const response = await axios({
      method: "post",
      url: "/api/experience/add",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(res=>{
        if(res.status===200){
            setAttachements([]);
            setExperience({
                title: "",
                details: "",
                experienceType: "SERVICE",
              }
            )
        
            setIsLoading(false);
        }

        setIsLoading(false);
        alert("Problem occured when submiting ")

    })

    
  };
  return (
    <div className="addExp">
      {isLoading ? (
        <h1>submiting ...</h1>
      ) : (
        <Typography variant="h4">Share some experience </Typography>
      )}
      <div className="addExp__form">
        <Paper sx={{ padding: "1rem 1rem" }}>
          <form onSubmit={handleSubmit} encType="multipart/form">
            <TextField
              name="experienceType"
              select
              label="Experience Type"
              value={experience.experienceType}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              // helperText="Please select your currency"
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
              value={experience.title}
              onChange={handleChange}
              //   helperText="please provide your sharehub password"
              //   type="password"
              //   style={{ width: "100%" }}
              //   error={loginError.passwordError}
            />

            <br />
            <br />
            <TextField
              required
              name="details"
              label="Details "
              fullWidth
              multiline
              rows={5}
              value={experience.details}
              onChange={handleChange}
              //   helperText="please provide your sharehub password"
              //   type="password"
              //   style={{ width: "100%" }}
              //   error={loginError.passwordError}
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
                {/* <Input
                accept="image/*"
                name="fileToUpload"
                value={selectedFile}
                type="file"
                onChange={handleChange}
              />
              <Add sx={{ margin: "auto" }} fontSize="large" /> */}
              </div>
            </div>

            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#3b3b3d " }}
            >
              Share
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default AddExperience;
