import "./styles/MainApp.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../../states/AppContext";
import MainAppBar from "../../components/MainAppBar";
import AddExperience from "../../components/AddExperience";
import MidSection from "../../components/MidSection";
import { Button } from "@mui/material";
import ProfileSection from "../../components/ProfileSection";

const MainApp = () => {
  // const [{currentUser}] = useContext(AppContext)
  // console.log(currentUser)
  const [mobile, setMobile] = useState(true);
  // openShare

  return (
    <div className="mainApp">
      <MainAppBar />
      <section className="mainApp__midSection">
        <div className="mainApp__midSection-wrapper">
          <div className="mainApp_shareAddBtn">
            <Button
              style={{
                backgroundColor: mobile ? "#6F7193" : "#8A8E9D"

              }} 
              onClick={() => setMobile(!mobile)} variant="contained">
              {mobile ? "Add Experience" : "Cancel"}
            </Button>
          </div>
          <div
            className={
              mobile
                ? "mainApp_midSection_addContainer display"
                : "mainApp_midSection_addContainer display openShare"
            }
          >
            <AddExperience open={mobile} setOpen={setMobile} />
          </div>
        </div>

        <MidSection />

        <ProfileSection />
      </section>
      <footer>
        <h4>Footer</h4>
      </footer>
    </div>
  );
};

export default MainApp;
