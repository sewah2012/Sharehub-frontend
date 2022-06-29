// import "./styles.css";

import React from "react";
import ConfirmCodePage from "../../components/ConfirmCodePage";

const ConfirmEmail = () => {
  const type = "verify";
  const codeMessage =
    "Please provide the Email Verification code you received in your inbox: ";
  const confirmMessage = "You email is successfully verified";

  return (
    <ConfirmCodePage
      codeMessage={codeMessage}
      confirmMessage={confirmMessage}
      type={type}
    />
  );
};

export default ConfirmEmail;
