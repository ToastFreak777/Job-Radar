"use client";

import React, { useState } from "react";

import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter, useSearchParams } from "next/navigation";

type SearchFormProps = {
  variant: string;
};

const initialState: {
  what: string;
  where: string;
  contract_type: string;
  working_hours: string;
  recent_searches: string[];
  page: number;
  results_per_page: number;
  distance: number;
  max_days_old: number;
  salary_min: number;
  salary_max: number;
} = {
  what: "",
  where: "",
  contract_type: "permanent",
  working_hours: "full_time",
  recent_searches: [],
  page: 1,
  results_per_page: 10,
  distance: 5,
  max_days_old: 7,
  salary_min: 0,
  salary_max: 1_000_000,
};

const SearchForm = ({ variant }: SearchFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    ...initialState,
    what: searchParams.get("what") || "",
    where: searchParams.get("where") || "",
  });

  // TODO
  // - Add pagination
  // - Add conditional Rendering for recent searches
  // - Style it up baby
  // - Add the second external api (stretch)
  // - Fix some of the TS type errors

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const {
      what,
      where,
      contract_type,
      working_hours,
      recent_searches,
      ...data
    } = formData;

    if (what || where) {
      const searchHistory = `${what || ""}${where ? " in " + where : ""}`;

      setFormData({
        ...formData,
        recent_searches: [...formData.recent_searches, searchHistory],
      });
    }

    const searchParams = new URLSearchParams({
      what,
      where,
      ...data,
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
            <label htmlFor="what">
              <WorkIcon /> What
            </label>
            <div className="flex my-2 p-2 rounded-sm outline-2 outline-primary">
              <input
                className="outline-none"
                id="what"
                name="what"
                value={formData.what}
                onChange={handleChange}
                placeholder="what title, keywords or company"
              />
              <button type="submit" hidden>
                Submit
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="where">
              <LocationOnIcon /> Where
            </label>
            <div className="my-2 p-2 rounded-sm outline-2 outline-primary">
              <input
                className="outline-none"
                id="where"
                name="where"
                value={formData.where}
                onChange={handleChange}
                placeholder="city, state, postal codes"
              />
              <button type="submit" hidden>
                Submit
              </button>
            </div>
          </div>
          <div>
            <label>Distance</label>
            <input
              className="w-[25%] outline-2 outline-primary rounded-sm ml-2 pl-2"
              type="text"
              name="distance"
              inputMode="numeric"
              pattern="[0-9]+"
              value={formData.distance}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="block text-sm">Min</label>
            <input
              className="outline-2 outline-primary rounded-sm pl-2"
              type="text"
              name="salary_min"
              inputMode="numeric"
              pattern="[0-9]+"
              value={formData.salary_min}
              onChange={handleChange}
            />
            <label className="block text-sm">Max</label>
            <input
              className="outline-2 outline-primary rounded-sm pl-2"
              type="text"
              name="salary_max"
              inputMode="numeric"
              pattern="[0-9]+"
              value={formData.salary_max}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block" htmlFor="age">
              Date Posted
            </label>
            <select
              id="age"
              name="max_days_old"
              className="dropdown"
              onChange={handleChange}
              value={formData.max_days_old}
            >
              <option value={1}>Today</option>
              <option value={7}>This Week</option>
              <option value={30}>This Month</option>
            </select>
          </div>
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
        </div>
        <div>
          <div>
            <details className="dropdown">
              <summary>Recent Searches</summary>
              {formData.recent_searches.map((search, index) => (
                <option
                  key={index}
                  onClick={() => {
                    const [what, where] = search.split(" in ");

                    const searchParams = new URLSearchParams({
                      what,
                      where,
                    }).toString();
                    setFormData({
                      ...formData,
                      what,
                      where,
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
          <label htmlFor="what">
            <WorkIcon /> What
          </label>
          <div className="border-r-2 border-gray-300 mr-3">
            <input
              id="what"
              name="what"
              placeholder="what title, keywords or company"
              value={formData.what}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="where">
            <LocationOnIcon /> Where
          </label>
          <div className="">
            <input
              id="where"
              name="where"
              placeholder="city, state, postal codes"
              value={formData.where}
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
