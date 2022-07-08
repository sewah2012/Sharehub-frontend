import "./details.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MainAppBar from "../../components/MainAppBar";
import SearchHits from "../../components/SearchHits";
import { AppContext } from "../../states/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import ExperienceDetails from "../../components/ExperienceDetails";
import { Button, LinearProgress } from "@mui/material";
import Footer from "../../components/Footer";

const Details = () => {
  let { id } = useParams();
  const [{ currentUserDetails }, dispatch] = useContext(AppContext);
  // console.log(currentUser)
  const [mobile, setMobile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [resetPopup, setResetPopup] = useState(false);
  const [setPassword, setSetPassword] = useState(
    currentUserDetails.resetPassword
  );
  const [searchData, setSearchData] = useState([]);
    const navigate = useNavigate();
    const [exp, setExp] = useState();

  useEffect(() => {
    console.log(id);
    if (id !== null) {
      const url = `/api/experience/getOne/${id}`;
      axios
        .get(url)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data);
            setExp(resp.data);
            
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setLoading(false);
        });
    }
  }, []);

  console.log(id);
  return (
    <div>
      <MainAppBar
        openEditProfileModal={setOpenEditProfileModal}
        setResetPopup={setResetPopup}
        setSearchData={setSearchData}
      />

      <div className="details">
        <Button variant="contained" onClick={()=>navigate("/")}>Back</Button>
        <br /> <br />
        {loading && <LinearProgress />}
        {/* {!loading && <h2>hoooo</h2>} */}
        {exp != null && <ExperienceDetails exp={exp} />}
      </div>
      <Footer />
    </div>
  );
};

export default Details;
