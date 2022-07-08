import "./styles/searchHit.css";
import React from "react";
import isOwnerOrAdmin from "../utilities/OwnerOrAdmin";
import moment from "moment";
import { Avatar, IconButton } from "@mui/material";
import { ExpandMore, More } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchHit = ({exp }) => {
    const navigate = useNavigate()

    const goToDetails = ()=>{
        
        navigate(`/details/${exp.id}`)
    }
  return (
    <div className="searchHit" onClick={goToDetails}>
      <div className="searchHitHeader">
      <Avatar
          alt={exp.author.firstName}
          src={exp?.author?.imageUrl?.attachmentUrl}
          
        />
        <div className="experience__header-info">
          <div className="exp__authorInfo">
            <h4>{exp.author.username}</h4>
            <p>{moment(exp.creationDate).fromNow()}</p>
          </div>
        </div>
      </div>
      <div className="searchHit__content">
        <div className="searchHit__content-action">
        <h4>{exp.title}</h4>
        <p>{exp.details}</p>
        </div>
        <IconButton>
            <ExpandMore />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchHit;
