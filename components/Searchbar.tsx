"use client";
import React from "react";

import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Searchbar = () => {
  return (
    <div className="justify-self-center">
      <div className="flex">
        <div className="">
          <WorkIcon />
          <label>What</label>
        </div>
        <div className="">
          <LocationOnIcon />
          <label>Where</label>
        </div>
      </div>
      <div className="border">
        <input
          id="what search bar"
          placeholder="Job title, Keywords or company"
        />
        <input id="where search bar" placeholder="City or State" />
        <button>Seach</button>
      </div>
    </div>
  );
};

export default Searchbar;
