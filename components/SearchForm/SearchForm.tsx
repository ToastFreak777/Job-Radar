import React from "react";
import Form from "next/form";

import SearchLabel from "./SearchLabel";
import { usStates } from "@/utils/helpers";

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
            <div className="my-2 p-2 rounded-sm outline-2 outline-primary">
              <input
                id="job"
                name="job"
                placeholder="job title, keywords or company"
              />
            </div>
          </div>
          <div className="">
            <SearchLabel htmlFor="location" type="where" />
            <div className="my-2 p-2 rounded-sm outline-2 outline-primary">
              <input
                id="location"
                name="location"
                placeholder="city, state, postal codes"
              />
            </div>
          </div>
          <div>
            <details className="dropdown">
              <summary>Location</summary>
              {usStates.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </details>
          </div>
          <div>
            <details className="dropdown">
              <summary>Contract Type</summary>
              <option>Permanent</option>
              <option>Contract</option>
            </details>
          </div>
          <div>
            <details className="dropdown">
              <summary>Working Hours</summary>
              <option>Full-time</option>
              <option>Part-time</option>
            </details>
          </div>
          <div>
            <details className="dropdown">
              <summary>Recent Searches</summary>
            </details>
            <button className="w-full m-auto mt-2 cursor-pointer">
              Clear Searches
            </button>
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
              placeholder="job title, keywords or company"
            />
          </div>
        </div>
        <div className="col">
          <SearchLabel htmlFor="location" type="where" />
          <div className="">
            <input
              id="location"
              name="location"
              placeholder="city, state, postal codes"
            />
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
