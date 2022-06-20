import "./styles/MidSection.css";
import React, { useContext, useEffect, useState } from "react";
import Experience from "./Experience";
import { AppContext } from "../states/AppContext";
import axios from "axios";
import { LinearProgress } from "@mui/material";

const MidSection = () => {
  const [state, dispatch] = useContext(AppContext);
  const { experience } = state;

  const [loading, setLoading] = useState(false);
  const url = "/api/experience/list";
  useEffect(() => {
    

    axios
      .get(url)
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({
            type: "LOAD_EXPERIENCES",
            payload: resp.data,
          });

          setLoading(false)

          console.log(resp.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <div className="midSection">
      <div className="midSection__filter">
        <h1>Latest Shared experience</h1>
      </div>
      <div className="mid_ection__experienceList">
        {loading? (
          <LinearProgress />
        ) : (
          experience.map((ex) => (
            <Experience key={ex.id} experience={ex} />
          ))
        )}
      </div>
    </div>
  );
};

export default MidSection;
