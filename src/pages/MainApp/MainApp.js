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
import Footer from "../../components/Footer";
import SetPassword from "../../components/SetPassword";

const MainApp = () => {
  const [{ currentUserDetails }, dispatch] = useContext(AppContext);
  // console.log(currentUser)
  const [mobile, setMobile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false)
  const [resetPopup, setResetPopup] = useState(false)
  const [setPassword, setSetPassword] = useState(currentUserDetails.resetPassword)

  const openResetPopup = ()=>{
    setResetPopup(!resetPopup);
  }

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
          setLoading(false);
        }
    
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });

    
    return () => {};
  }, []);

  const handleSetPassword=()=>{

  }

  return (
    <div className="mainApp">
      <MainAppBar openEditProfileModal={setOpenEditProfileModal} setResetPopup={setResetPopup}/>

      {/* {loading && <LinearProgress />} */}
  
       {setPassword ? <SetPassword setSetPassword={setSetPassword}/> :  <div>
          {
          currentUserDetails?.registrationCompleted && (
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
                  <div className="add_exp_form">
                     <AddExperience open={mobile} setOpen={setMobile} />
                  </div>
                 
                </div>
              </div>

              <MidSection />

              <div className="ProfileSection">
                <ProfileSection openEditProfileModal={openEditProfileModal} setOpenEditProfileModal={setOpenEditProfileModal} currentUserDetails={currentUserDetails} openResetPopup={openResetPopup} resetPopup={resetPopup}/>
              </div>
            </section>
          )}

          {!currentUserDetails?.registrationCompleted && <CompleteRegistration />}
        
        </div>}
   
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainApp;
