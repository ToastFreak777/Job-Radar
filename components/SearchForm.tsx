"use client";

import React, { useState } from "react";

import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/navigation";
import { AdzunaAPIQuery } from "@/@types/adzuna";

type SearchFormProps = {
  variant: string;
  initialQuery?: AdzunaAPIQuery;
};

type InitialState = {
  what: string;
  where: string;
  contract_type: "permanent" | "contract";
  working_hours: "full_time" | "part_time";
  recent_searches: string[];
  page: number;
  results_per_page: number;
  distance: number;
  max_days_old: 1 | 7 | 30;
  salary_min: number;
  salary_max: number;
};

const initialState: InitialState = {
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

const SearchForm = ({ variant, initialQuery }: SearchFormProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    ...initialState,
    ...initialQuery,
  });

  // TODO
  // - Add the second external api (stretch)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { contract_type, working_hours, recent_searches, ...rest } = formData;

    if (rest.what || rest.where) {
      const searchHistory = `${rest.what || ""}${rest.where ? " in " + rest.where : ""}`;

      setFormData({
        ...formData,
        recent_searches: [...formData.recent_searches, searchHistory],
      });
    }

    const params = {
      [contract_type]: "1",
      [working_hours]: "1",
    };

    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = String(value);
      }
    });

    const searchParams = new URLSearchParams(params).toString();
    router.push(`/jobs?${searchParams}`);
  };

  if (variant === "jobs") {
    return (
      <form
        id="search-jobs"
        role="search"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="row flex-col gap-4">
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
                placeholder="title, keywords or company"
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
            <label htmlFor="distance">Distance</label>
            <input
              className="w-[25%] outline-2 outline-primary rounded-sm ml-4 pl-2"
              type="text"
              id="distance"
              name="distance"
              inputMode="numeric"
              pattern="[0-9]+"
              value={formData.distance}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <div className="flex items-center gap-6">
              <label htmlFor="salary_min" className="text-sm w-full">
                Min
              </label>
              <label htmlFor="salary_max" className="text-sm w-full">
                Max
              </label>
            </div>
            <div className="flex gap-2">
              <input
                id="salary_min"
                className="outline-2 outline-primary rounded-sm pl-2"
                type="text"
                name="salary_min"
                inputMode="numeric"
                pattern="[0-9]+"
                value={formData.salary_min}
                onChange={handleChange}
              />
              {` - `}
              <input
                id="salary_max"
                className="outline-2 outline-primary rounded-sm pl-2"
                type="text"
                name="salary_max"
                inputMode="numeric"
                pattern="[0-9]+"
                value={formData.salary_max}
                onChange={handleChange}
              />
            </div>
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
            <label htmlFor="contract_type" className="block">
              Contract Type
            </label>
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
        {formData.recent_searches.length > 0 && (
          <div className="my-2">
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
                onClick={() =>
                  setFormData({ ...formData, recent_searches: [] })
                }
              >
                Clear Searches
              </button>
            </div>
          </div>
        )}
      </form>
    );
  }

  return (
    <form
      id="search-main"
      role="search"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="row">
        <div className="col">
          <label htmlFor="what">
            <WorkIcon /> What
          </label>
          <div className="border-r-2 border-gray-300 mr-3">
            <input
              id="what"
              name="what"
              placeholder="title, keywords or company"
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
