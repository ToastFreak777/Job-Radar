"use client";

import React, { useState } from "react";

import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/navigation";

type SearchFormProps = {
  variant: string;
};

const initialState: {
  job: string;
  location: string;
  contract_type: string;
  working_hours: string;
  recent_searches: string[];
} = {
  job: "",
  location: "",
  contract_type: "permanent",
  working_hours: "full_time",
  recent_searches: [],
};

const SearchForm = ({ variant }: SearchFormProps) => {
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();

  // TODO complete filters
  // - Add page / pagination
  // - Add results_per_page
  // - Add distance  (default 5km)
  // - Add max_days_old (default 7 days)
  // - Add min and max salary

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { job, location, contract_type, working_hours } = formData;

    if (job || location) {
      const searchHistory = `${job || ""}${location ? " in " + location : ""}`;

      setFormData({
        ...formData,
        recent_searches: [...formData.recent_searches, searchHistory],
      });
    }

    const searchParams = new URLSearchParams({
      job,
      location,
      [contract_type]: "1",
      [working_hours]: "1",
    }).toString();
    router.push(`/jobs?${searchParams}`);
  };

  if (variant === "jobs") {
    return (
      <form
        id="search-jobs"
        role="search"
        action={"/jobs"}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="row flex-col gap-2">
          <div>
            <label htmlFor="job">
              <WorkIcon /> What
            </label>
            <div className="flex my-2 p-2 rounded-sm outline-2 outline-primary">
              <input
                id="job"
                name="job"
                value={formData.job}
                onChange={handleChange}
                placeholder="job title, keywords or company"
              />
              <button type="submit" hidden>
                Submit
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="location">
              <LocationOnIcon /> Where
            </label>
            <div className="my-2 p-2 rounded-sm outline-2 outline-primary">
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="city, state, postal codes"
              />
              <button type="submit" hidden>
                Submit
              </button>
            </div>
          </div>
          <div>
            <label className="block">Contract Type</label>
            <select
              id="contract_type"
              name="contract_type"
              className="dropdown"
              onChange={handleChange}
              value={formData.contract_type}
            >
              <option value={"permanent"}>Permanent</option>
              <option value={"contract"}>Contract</option>
            </select>
          </div>
          {/*
          *
          <div>
            <input type="range" min="1" max="100" name="distance" id="slider" />
          </div>
          */}
          <div>
            <label className="block" htmlFor="working_hours">
              Working Hours
            </label>
            <select
              id="working_hours"
              name="working_hours"
              className="dropdown"
              onChange={handleChange}
              value={formData.working_hours}
            >
              <option value={"full_time"}>Full-time</option>
              <option value={"part_time"}>Part-time</option>
            </select>
          </div>
          <div>
            <details className="dropdown">
              <summary>Recent Searches</summary>
              {formData.recent_searches.map((search, index) => (
                <option
                  key={index}
                  onClick={() => {
                    const [job, location] = search.split(" in ");

                    const searchParams = new URLSearchParams({
                      job,
                      location,
                    }).toString();
                    setFormData({
                      ...formData,
                      job,
                      location,
                    });
                    router.push(`/jobs?${searchParams}`);
                  }}
                >
                  {search}
                </option>
              ))}
            </details>
            <button
              type="button"
              className="w-full m-auto mt-2 cursor-pointer"
              onClick={() => setFormData({ ...formData, recent_searches: [] })}
            >
              Clear Searches
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form id="search-main" role="search" action={"/jobs"} autoComplete="off">
      <div className="row">
        <div className="col">
          <label htmlFor="job">
            <WorkIcon /> What
          </label>
          <div className="border-r-2 border-gray-300 mr-3">
            <input
              id="job"
              name="job"
              placeholder="job title, keywords or company"
              value={formData.job}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="location">
            <LocationOnIcon /> Where
          </label>
          <div className="">
            <input
              id="location"
              name="location"
              placeholder="city, state, postal codes"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        <p className="col grow-0">
          <button className="btn btn-primary">Search</button>
        </p>
      </div>
    </form>
  );
};

export default SearchForm;
