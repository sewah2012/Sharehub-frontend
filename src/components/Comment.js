import "./styles/comment.css";
import React from "react";
import { Avatar } from "@mui/material";
import ReactTimeago from "react-timeago";

const Comment = ({ comment, imgUrl, username, dateCreated }) => {
  return (
    <div className="comment">
      <div className="comment_details">
        <div className="author_info">
          <Avatar alt={username} src={imgUrl} />
        </div>

        <div className="description">
          <h6>{username}</h6>
          <p>{comment}</p>
        </div>
      </div>

      <div className="action">
        <ReactTimeago date = {dateCreated} />
      </div>
    </div>
  );
};

export default Comment;