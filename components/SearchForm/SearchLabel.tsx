"use client";
import React from "react";

import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type SearchLabelProps = {
  htmlFor: string;
  type: "what" | "where";
};

const SearchLabel = ({ htmlFor, type }: SearchLabelProps) => {
  return (
    <label htmlFor={htmlFor}>
      {type === "what" ? <WorkIcon /> : <LocationOnIcon />} {type}
    </label>
  );
};

export default SearchLabel;
