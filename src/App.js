import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Authenticate from "./pages/authenticate/Authenticate";
import ForgetPassword from "./pages/ForgetPassword";
import MainApp from "./pages/MainApp";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/" element={<MainApp />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
