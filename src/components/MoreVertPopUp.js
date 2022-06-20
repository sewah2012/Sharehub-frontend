import "./styles/morevertpopup.css";
import React from "react";
import { Button } from "@mui/material";


const MoreVertPopUp = ({ options, }) => {

  return (
    <div className="morevertpopup">
      {options.map((opt, index) => (
        <Button key = {index} onClick={opt.action}>{opt.title}</Button>
      ))}
    </div>
  );
};

export default MoreVertPopUp;
