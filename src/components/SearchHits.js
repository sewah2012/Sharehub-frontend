import "./styles/searchHits.css";
import React from "react";
import SearchHit from "./SearchHit";
import { Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const SearchHits = ({ list, setList, closeSearch }) => {
  return (
    <div className="searchHits">
      {/* <Button onClick={closeSearch} variant="outlined" color="error">X</Button> */}
      <IconButton onClick={closeSearch} color="error" aria-label="upload picture" component="span">
        <Close />
      </IconButton>
      <div className="searchHits_list">
        {list.map((exp, index) => (
          <SearchHit key={index} exp={exp} />
        ))}
      </div>
    </div>
  );
};

export default SearchHits;
