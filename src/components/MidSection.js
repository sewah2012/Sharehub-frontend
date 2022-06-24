import "./styles/MidSection.css";
import React, { useContext, useEffect, useState } from "react";
import Experience from "./Experience";
import { AppContext } from "../states/AppContext";
import axios from "axios";
import { AppBar, LinearProgress, Toolbar } from "@mui/material";
import AllExperiences from "./AllExperiences";
import PopularExperiences from "./PopularExperiences";
import LatestExperiences from "./LatestExperiences";

const MidSection = () => {
 
  const [latest, setLatest] = useState(false);
  const [popular, setPopular] = useState(false);
  const [all, setAll] = useState(true);

 

  return (
    <div className="midSection">
      <div className="midSection__filter">
        <div className="switches">
          <div
            onClick={() => {
              setPopular(false);
              setLatest(false);
              setAll(true);
            }}
            className={all ? "switch active" : "switch"}
          >
            <h4>All</h4>
          </div>
          <div
            onClick={() => {
              setPopular(false);
              setAll(false);
              setLatest(true);
            }}
            className={latest ? "switch active" : "switch"}
          >
            <h4>Latest</h4>
          </div>

          <div
            onClick={() => {
              setAll(false);
              setLatest(false);
              setPopular(true);
            }}
            className={popular ? "switch active" : "switch"}
          >
            <h4>Popular</h4>
          </div>
        </div>
      </div>
      <div className="mid_ection__experienceList">
        {all && <AllExperiences />}
        {latest && <PopularExperiences />}
        {popular && <LatestExperiences />}
      </div>
    </div>
  );
};

export default MidSection;
