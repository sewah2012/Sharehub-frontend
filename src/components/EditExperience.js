import "./styles/editExperience.css";
import React, { useContext, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { AppContext } from "../states/AppContext";

const EditExperience = ({ setOpenEditModal, open, experience }) => {
  const [state, dispatch] = useContext(AppContext)
  const [loading, setLoading] = useState(false);

  const [experienceDetails, setExperienceDetails] = useState({
    id: experience.id,
    title: experience.title,
    details: experience.details,
    experienceType: experience.experienceType,
  });

  const experienceTypes = ["LOCATION", "SERVICE"];

  const handleChange = (event) => {
    // alert("Experience sent")

    setExperienceDetails({
      ...experienceDetails,
      [event.target.name]: event.target.value,
    });
  };

  const url = "/api/experience/editExperience";
  
  const handleUpdate = () => {
    setLoading(true);
    
    axios.post(url,experienceDetails)
    .then(resp=>{
        if(resp.status===200){
            
            dispatch({
              type: "EDIT_EXPERIENCE",
              payload: resp.data
            })
            handleClose(!open);
            setLoading(false);
        }
    })
    .catch(err=>{
        console.log(err.response.data)    
        handleClose(!open);
        setLoading(false);
    })
   
  };

  const handleClose = () => {
    setOpenEditModal(!open);
  };

  

  return (
    <div className="editExperience">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit your Experience</DialogTitle>

        <div className="dialogContent">
          <DialogContent >
            <br />
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdate}>
              Modify
              {loading && <CircularProgress />}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default EditExperience;
