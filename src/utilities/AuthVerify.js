import React, { useContext } from "react";
// import { withRouter } from "react-router-dom";
import CustomWithRouter from "./CustomWithRouter";
import { decodeToken } from "./Utilities";
import { AppContext } from "../states/AppContext";
const AuthVerify = (props) => {
    const [dispatch] = useContext(AppContext)
  props.history.listen(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedJwt = decodeToken(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch({
            type: "SIGNOUT",
            payload:false 
        })
      }
    }
  });
  return <div></div>;
};
export default CustomWithRouter(AuthVerify);