import { AdzunaAPIQuery } from "@/@types/adzuna";
import JobResults from "@/components/JobResults";
import SearchForm from "@/components/SearchForm";
import { loadAdzunaJobs } from "@/utils/helpers";
import React from "react";

const Jobs = async ({
  searchParams,
}: {
  searchParams: Promise<AdzunaAPIQuery>;
}) => {
  const query = await searchParams;
  // console.log(query);

  const initialData = await loadAdzunaJobs(query);
  // console.log(initialData);

  return (
    <div className="wrapper row gap-12">
      <div className="grow-1">
        <SearchForm variant={"jobs"} initialQuery={query} />
      </div>
      <JobResults initialData={initialData} initialQuery={query} />
    </div>
  );
};

export default Jobs;
