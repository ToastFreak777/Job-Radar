import React from "react";
import Form from "next/form";

import SearchLabel from "./SearchLabel";

type SearchFormProps = {
  variant: string;
};

const SearchForm = ({ variant }: SearchFormProps) => {
  if (variant === "jobs") {
    return (
      <Form id="search-jobs" role="search" action={"/jobs"} autoComplete="off">
        <div className="row flex-col gap-2">
          <div className="">
            <SearchLabel htmlFor="job" type="what" />
            <div className="border-2">
              <input
                id="job"
                name="job"
                placeholder="Job title, Keywords or company"
              />
            </div>
          </div>
          <div className="">
            <SearchLabel htmlFor="location" type="where" />
            <div className="">
              <input
                id="location"
                name="location"
                placeholder="City or State"
              />
              <button></button>
            </div>
          </div>
          <div>
            <h2>Title</h2>
          </div>
          <div>
            <h2>Location</h2>
          </div>
          <div>
            <h2>Contract Type</h2>
          </div>
          <div>
            <h2>Working Hours</h2>
          </div>
          <div>
            <h2>Company</h2>
          </div>
          <div>
            <h2>Recent Searches</h2>
          </div>
        </div>
      </Form>
    );
  }

  return (
    <Form id="search-main" role="search" action={"/jobs"} autoComplete="off">
      <div className="row">
        <div className="col">
          <SearchLabel htmlFor="job" type="what" />
          <div className="border-r-2 border-gray-300 mr-3">
            <input
              id="job"
              name="job"
              placeholder="Job title, Keywords or company"
            />
          </div>
        </div>
        <div className="col">
          <SearchLabel htmlFor="location" type="where" />
          <div className="">
            <input id="location" name="location" placeholder="City or State" />
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

export default SearchForm;
