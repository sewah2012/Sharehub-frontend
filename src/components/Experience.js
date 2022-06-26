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
  MoreVert,
} from "@mui/icons-material";
import Comment from "./Comment";
import { AppContext } from "../states/AppContext";
import axios from "axios";
import MoreVertPopUp from "./MoreVertPopUp";

import { useDetectClickOutside } from "react-detect-click-outside";
import isOwnerOrAdmin from "../utilities/OwnerOrAdmin";
import moment from "moment";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import DeleteAlertDialog from "./DeleteAlertDialog";

const Experience = ({ exp }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentError, setcommentError] = useState(false);
  const [state, dispatch] = useContext(AppContext);
  const { currentUser,experience} = state;
  const [isLiked, setIsLiked] = useState(
    exp.likes.includes(currentUser.sub)
  );

  const [likeCount, setLikeCount] = useState(exp.likes.length);
  const [commentCount, setCommentCount] = useState(exp.comments.length);

  const [commentsList, setcommentsList] = useState(exp.comments);
  const [loading, setLoading] = useState(false);
  const [openExpMoreVert, setOpenExpMoreVert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)

  const ref = useDetectClickOutside({
    onTriggered: () => setOpenExpMoreVert(false),
  });

  const handleOpenExpMoreVert = () => {
    setOpenExpMoreVert(!openExpMoreVert);
  };
  const handleLike = () => {
    const url = `/api/reaction/likeUnlike/${exp.id}`;
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
        id: exp.id,
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

  const likes = exp.likes;
  const comments = exp.comments;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const closeDeleteDialog = ()=>{
    setOpenDeleteDialog(!openDeleteDialog)
  }



  const confirmDelete = ()=>{
    setOpenDeleteDialog(!openDeleteDialog)
    setIsDeleting(true)
    const url = `/api/experience/delete/${exp.id}`;
    axios
      .delete(url)
      .then((resp) => {
        if (resp.status == 200) {
          // alert("Experience Successfully Deleted");

          const newList = experience.filter(e=>e.id!==action.payload)
          console.log(newList)
          dispatch({
            type: "LOAD_EXPERIENCES",
            Payload: newList
          })

          setIsDeleting(false)
        }
                
      })
      .catch(err=> {
        console.log(err.response);
        setIsDeleting(false)
      });
  }

  const deleteExperience = () => {
       setOpenExpMoreVert(!openExpMoreVert);
       setOpenDeleteDialog(!openDeleteDialog)
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

  const images = [];

  exp.attachments.forEach((att) => {
    images.push({
      url: att.attachmentUrl,
    });
  });

 

  return (
    <div className="experience">
      {isDeleting && <LinearProgress />}
      <DeleteAlertDialog confirmDelete = {confirmDelete} open={openDeleteDialog} handleClose={closeDeleteDialog}/>
      <div className="experience__header">
        <Avatar
          alt={exp.author.firstName}
          src={exp.author.imageUrl}
        />
        <div className="experience__header-info">
          <div className="exp__authorInfo">
            <h4>{exp.author.username}</h4>
            <p>{moment(exp.creationDate).fromNow()}</p>
          </div>
          {isOwnerOrAdmin(currentUser, exp.author.username) && (
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
        <h2>{exp.title}</h2>
        <p>{exp.details}</p>
        <div className="experience__content-images">
          <Carousel showThumbs={false}>
            {exp.attachments.map((att, index) => (
              <div key={index}>
                <img src={att.attachmentUrl} />
              </div>
            ))}
          </Carousel>
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
