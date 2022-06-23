import "./styles/MainApp.css";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../states/AppContext";
import MainAppBar from "../../components/MainAppBar";
import AddExperience from "../../components/AddExperience";
import MidSection from "../../components/MidSection";
import { Button, LinearProgress } from "@mui/material";
import ProfileSection from "../../components/ProfileSection";
import { Details } from "@mui/icons-material";
import axios from "axios";
import CompleteRegistration from "../../components/CompleteRegistration";

const MainApp = () => {
  const [{ currentUserDetails }, dispatch] = useContext(AppContext);
  // console.log(currentUser)
  const [mobile, setMobile] = useState(true);
  const [loading, setLoading] = useState(false);  
  // const [regComplete, setRegComplete] = useState(false)

  // openShare

  useEffect(() => {
    setLoading(true);
    // get user Details....
    axios
      .get("/api/auth/myDetails")
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({
            type: "LOAD_CURRENT_USER_DETAILS",
            payload: resp.data,
          });
        }
        return;
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    setLoading(false);
    return () => {};
  }, []);

  return (
    <div className="mainApp">
      <MainAppBar />
      
      {currentUserDetails?.registrationCompleted ? (
        <section className="mainApp__midSection">
          <div className="mainApp__midSection-wrapper">
            <div className="mainApp_shareAddBtn">
              <Button
                style={{
                  backgroundColor: mobile ? "#6F7193" : "#8A8E9D",
                }}
                onClick={() => setMobile(!mobile)}
                variant="contained"
              >
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

          <div className="ProfileSection">
          <ProfileSection />
          </div>
        </section>
      ) : (
        <CompleteRegistration />
      )}
      <footer >
        <h4>Footer</h4>
      </footer>
    </div>
  );
};

export default MainApp;
