import "./App.css";
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import Authenticate from "./pages/authenticate/Authenticate";
import ForgetPassword from "./pages/forgotPassword/ForgetPassword";
import MainApp from "./pages/MainApp/MainApp";
import ProtectedRoute from "./utilities/ProtectedRoute";
import axios from "axios";
import { AppContext } from "./states/AppContext";
import AuthVerify from "./utilities/AuthVerify";
import ConfirmEmail from "./pages/confirmEmail/ConfirmEmail";
import { decodeToken } from "./utilities/Utilities";
import jwtDecode from "jwt-decode";
import EditProfile from "./pages/EditProfile/EditProfile";
import Details from "./pages/details/Details";

const AUTH_TOKEN = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.common["TIMEZONE_HEADER_NAME"] =
  new Date().getTimezoneOffset();

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT ||
  "https://api-dev-sharehub.herokuapp.com";
axios.defaults.baseURL = API_ENDPOINT;

// if (jwtDecode(AUTH_TOKEN).exp < Date.now() / 1000) {
//   localStorage.clear();
// }

const RedirectToHome = () => {
  return <Navigate to="/" replace />;
};

const token = localStorage.getItem("token");

// console.log((new Date()).getTimezoneOffset())
const App = () => {
  const [state, dispatch] = useContext(AppContext);
  const { isAuthenticated,  } = state;

  useEffect(() => {
    if (!!token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      const currentUser = decodeToken(token);

      dispatch({
        type: "CURRENT_USER",
        payload: currentUser,
      });

      dispatch({
        type: "LOGIN",
        payload: true,
      });
    }

    return () => {};
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/authenticate"
            element={isAuthenticated ? <RedirectToHome /> : <Authenticate />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MainApp />
              </ProtectedRoute>
            }
          />

          
<Route
            path="/details/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
               <Details />
              </ProtectedRoute>
            }
          />
     
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Routes>
        {/* <AuthVerify /> */}
      </Router>
    </div>
  );
};

export default App;
