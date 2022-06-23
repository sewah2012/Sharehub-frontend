import "./styles/experience.css";
import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
  AddComment,
  Favorite,
  FavoriteBorder,
  FavoriteBorderOutlined,
  MoreVert,
} from "@mui/icons-material";

import ReactTimeago from "react-timeago";

import Comment from "./Comment";
import { AppContext } from "../states/AppContext";
import axios from "axios";
import MoreVertPopUp from "./MoreVertPopUp";

import { useDetectClickOutside } from "react-detect-click-outside";
import isOwnerOrAdmin from "../utilities/OwnerOrAdmin";
import SimpleImageSlider from "react-simple-image-slider";


const Experience = ({ experience }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentError, setcommentError] = useState(false);
  const [{ currentUser }, dispatch] = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(
    experience.likes.includes(currentUser.sub)
  );

  const [likeCount, setLikeCount] = useState(experience.likes.length);
  const [commentCount, setCommentCount] = useState(experience.comments.length);

  const [commentsList, setcommentsList] = useState(experience.comments);
  const [loading, setLoading] = useState(false);
  const [openExpMoreVert, setOpenExpMoreVert] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => setOpenExpMoreVert(false),
  });

  const handleOpenExpMoreVert = () => {
    setOpenExpMoreVert(!openExpMoreVert);
  };
  const handleLike = () => {
    const url = `/api/reaction/likeUnlike/${experience.id}`;
    axios.get(url).then((resp) => {
      if (resp.status === 200) {
        if (isLiked) {
          setLikeCount(likeCount - 1);
        } else {
          setLikeCount(likeCount + 1);
        }
      }
    });
    setIsLiked(!isLiked);
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleSubmitComment = () => {
    setLoading(true);
    if (comment === "") {
      setcommentError(true);
      setLoading(false);
      return;
    }

    const url = "/api/reaction/comment";
    const data = {
      description: comment,
      experience: {
        id: experience.id,
      },
    };
    axios
      .post(url, data)
      .then((resp) => {
        if (resp.status === 200) {
          setcommentsList([resp.data, ...commentsList]);
          setCommentCount(commentCount + 1);
        }
        setLoading(false);
        setComment("");
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
        setComment("");
      });
  };

  const likes = experience.likes;
  const comments = experience.comments;

  const deleteExperience = () => {
    setOpenExpMoreVert(!openExpMoreVert);

    alert("delete experience");
  };

  const editExperience = () => {
    setOpenExpMoreVert(!openExpMoreVert);
    alert("edit Experience");
  };

  const expActionsOptions = [
    {
      title: "Delete",
      action: deleteExperience,
    },

    {
      title: "Edit",
      action: editExperience,
    },
  ];

  const images = []
  
 experience.attachments.forEach(att =>{
        images.push({
          url: att.attachmentUrl
        })

    })
  return (
    <div className="experience">
      <div className="experience__header">
        <Avatar
          alt={experience.author.firstName}
          src={experience.author.imageUrl}
        />
        <div className="experience__header-info">
          <div className="experience__authorInfo">
            <h4>{experience.author.username}</h4>
            <p>
              <ReactTimeago date={experience.creationDate} />
            </p>
          </div>
          {isOwnerOrAdmin(currentUser, experience.author.username) && (
            <div className="experience__action" ref={ref}>
              <IconButton onClick={handleOpenExpMoreVert}>
                <MoreVert />{" "}
              </IconButton>
              {openExpMoreVert && (
                <div className="experience__action-morevertpopup">
                  <MoreVertPopUp options={expActionsOptions} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Divider />
      <div className="experience__content">
        <h2>{experience.title}</h2>
        <p>{experience.details}</p>
        <div className="experience__content-images">
          <SimpleImageSlider
            width={350}
            height={300}
            images={images}
            showBullets={true}
            showNavs={true}
          />
          {/* <img src="https://picsum.photos/500/300" alt="imgs" /> */}
        </div>

        <div className="">
          <div className="experience__content-reactions">
            <div className="likes">
              <p>{likeCount}</p>{" "}
              <IconButton onClick={handleLike}>
                {isLiked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </div>
            <div className="comments">
              <p>{commentCount} comments</p>
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
              {loading && <LinearProgress />}
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
                  autoFocus={false}
                  autoComplete={false}
                />
                <Button onClick={handleSubmitComment} sx={{ color: "#2A2A48" }}>
                  Publish
                </Button>
              </div>
              <div className="commentsList">
                {commentsList.map((c) => (
                  <Comment
                    key={c?.id}
                    username={c.author?.username}
                    imgUrl={c.author?.imageUrl}
                    comment={c?.description}
                    dateCreated={c?.creationDate}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;
