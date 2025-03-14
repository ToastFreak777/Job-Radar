import SearchForm from "@/components/SearchForm/SearchForm";
import { adzuna } from "@/utils/adzunaAPI";
import React from "react";

type SearchParamsProps = {
  searchParams: {
    job?: string;
    location?: string;
  };
};

const Jobs = async ({ searchParams }: SearchParamsProps) => {
  const { job = "", location = "" } = await searchParams;
  const data = await adzuna.getJobs({
    what: job,
    where: location,
  });
  console.log(data);

  return (
    // <div className="flex max-w-[1200px] m-auto border-4">
    <div className="flex border-4">
      <div className="">
        <SearchForm variant={"jobs"} />
      </div>
      <div className="grow-6">
        {data?.results?.map((item) => (
          <div key={item.id}>
            <p>{item.company.display_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
