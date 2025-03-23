import { AdzunaAPIQuery } from "@/@types/adzuna";
import SearchForm from "@/components/SearchForm/SearchForm";
import { loadAdzunaJobs } from "@/utils/helpers";
import React from "react";

const Jobs = async ({
  searchParams,
}: {
  searchParams: Promise<AdzunaAPIQuery>;
}) => {
  const query = await searchParams;
  const { what, where } = query;

  const data = await loadAdzunaJobs(query);
  console.log(data);

  return (
    <div className="wrapper row gap-12">
      <div className="grow-1">
        <SearchForm variant={"jobs"} />
      </div>
      <div className="grow-2 max-w-[80%]">
        <div className="flex justify-between">
          <h3>
            <span className="font-semibold">{what}</span> jobs in the USA,{" "}
            {where}
          </h3>
          <p>{data?.count} jobs</p>
        </div>
        <div className="h-full my-2 overflow-auto">
          {data?.results?.map((item) => (
            <div className="border-y border-gray-300" key={item.id}>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-500">
                {item.company.display_name} | {item.location.display_name}
              </p>
              {item.salary_max === item.salary_min ? (
                <p className="text-green-600 font-semibold">
                  {item.salary_max.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              ) : (
                <p className="text-green-600 font-semibold">
                  {item.salary_min.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}{" "}
                  -{" "}
                  {item.salary_max.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              )}
              <p className="text-sm">{item.description}</p>
              <a
                href={item.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Job
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
