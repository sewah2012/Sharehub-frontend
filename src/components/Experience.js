import "./styles/experience.css";
import React, { useState } from "react";
import { Avatar, Button, Divider, IconButton } from "@mui/material";
import {
  AddComment,
  Favorite,
  FavoriteBorder,
  FavoriteBorderOutlined,
} from "@mui/icons-material";

import Comment from "./Comment";

const Experience = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [comment, setComment] = useState("");
  const [commentError, setcommentError] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleSubmitComment = () => {
    if (comment === "") {
      setcommentError(true);
      return;
    }

    alert(comment);
    setComment("");
  };

  return (
    <div className="experience">
      <div className="experience__header">
        <Avatar alt="Experience_owner" src="https://picsum.photos/200" />
        <div className="experience__header-info">
          <div className="experience__authorInfo">
            <h4>Queen Sheeba</h4>
            <p>sewah2012@gmail.com</p>
          </div>
          <div className="experience__action">
            <p>1 hr ago</p>
            <p>|</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="experience__content">
        <h2>An Experience with Tour Maroc</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam,
          enim! Tempore non a doloribus voluptate, vero culpa maiores ad
          reiciendis deleniti veniam hic officia quisquam laborum fugit iusto.
          Dolor, sit! Autem quod accusantium eius quae consequuntur, nam in
          laborum explicabo nemo veritatis suscipit nostrum quia maxime? Quas
          voluptatum non sed? Blanditiis cumque recusandae architecto reiciendis
          ipsam reprehenderit dignissimos necessitatibus distinctio. Repudiandae
          deleniti omnis officia. Optio unde qui iure libero suscipit, facilis
          omnis magnam sequi ipsum! Nihil eveniet quos dicta excepturi, iure
          eius. Dignissimos officiis nemo, possimus rem nulla libero hic!
          Exercitationem saepe aperiam eos, quasi accusantium distinctio,
          consequuntur itaque quaerat nostrum voluptatum quibusdam. Veniam minus
          sed, perferendis provident magni libero rerum, enim labore vero quidem
          eos possimus ipsum explicabo dolore? Nesciunt rem porro dolorum est
          doloremque, sint, ea exercitationem, quasi autem rerum esse! Iusto ab
          alias, illo sequi eius exercitationem provident placeat voluptatum
          quis ipsam nobis labore necessitatibus autem sint.
        </p>
        <div className="experience__content-images">
          <img src="https://picsum.photos/500/300" alt="imgs" />
        </div>

        <div className="">
          <div className="experience__content-reactions">
            <div className="likes">
              <p>50</p>{" "}
              <IconButton onClick={handleLike}>
                {isLiked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </div>
            <div className="comments">
              <p>10 comments</p>
              <IconButton onClick={handleShowComments}>
                {" "}
                <AddComment />
              </IconButton>
            </div>
          </div>
          {showComments && (
            <div className="commentsList">
              {commentError && (
                <p
                  style={{
                    color: "red",
                  }}
                >
                  You have not written any comment yet.
                </p>
              )}
              <div className="add_comment">
                <input
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={(e) => {
                    setcommentError(false);
                    setComment(e.target.value);
                  }}
                  placeholder="write your comment here ..."
                />
                <Button onClick={handleSubmitComment} sx={{ color: "#2A2A48" }}>
                  Publish
                </Button>
              </div>
              <div className="commentsList">
                <Comment username = "John" imgUrl = "" comment="description" dateCreated="10 mins"/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;
