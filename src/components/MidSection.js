import "./styles/MidSection.css";
import React, {useState } from "react";
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
              setAll(false);
              setLatest(false);
              setPopular(true);
            }}
            className={popular ? "switch active" : "switch"}
          >
            <h4>Popular</h4>
          </div>

          <div
            onClick={() => {
              setPopular(false);
              setAll(false);
              setLatest(true);
            }}
            className={latest ? "switch active" : "switch"}
          >
            <h4>Shared</h4>
          </div>
        </div>
      </div>
      <div className="mid_section__experienceList">
        {all && <AllExperiences />}
        {latest && <LatestExperiences />}
        {popular && <PopularExperiences />}
      </div>
    </div>
  );
};

export default MidSection;
