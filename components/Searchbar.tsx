"use client";
import React from "react";
import Form from "next/form";

import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import handleSearchAction from "@/actions/searchAction";

const Searchbar = () => {
  return (
    <Form
      id="search-main"
      role="search"
      action={handleSearchAction}
      autoComplete="off"
    >
      <div className="row">
        <div className="col">
          <label htmlFor="search-what">
            <WorkIcon /> {" What "}
          </label>
          <div className="border-r-2 border-gray-300 mr-3">
            <input
              id="search-what"
              name="search-what"
              placeholder="Job title, Keywords or company"
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="search-where">
            <LocationOnIcon /> {" Where "}
          </label>
          <div className="">
            <input
              id="search-where"
              name="search-where"
              placeholder="City or State"
            />
            <button></button>
          </div>
        </div>

        <p className="col grow-0">
          <button className="btn btn-primary">Search</button>
        </p>
      </div>
    </Form>
  );
};

export default Searchbar;
