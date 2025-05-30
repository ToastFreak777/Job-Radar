import { AdzunaAPIQuery, AdzunaResponse } from "@/@types/adzuna";
import Paginate from "@/components/Paginate";

type JobResultsProps = {
  data: AdzunaResponse;
  query: AdzunaAPIQuery;
};

const JobResults = ({ data, query }: JobResultsProps) => {
  const page = query.page || 1;
  const results_per_page = query.results_per_page || 10;
  const pages = Math.ceil(data?.count / results_per_page);

  if (data.count === 0) {
    return (
      <div className="grow-2 w-full">
        <h3>Looks like no jobs...</h3>
      </div>
    );
  }

  return (
    <div className="grow-2 max-w-[80%]">
      <div className="flex justify-between">
        <h3>
          <span className="font-semibold">{query.what}</span> jobs
          {query.where && ", in " + query.where}
        </h3>
        <p>{data.count} jobs</p>
      </div>
      <div className="h-full my-2 overflow-auto">
        {data.results.map((item) => (
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
      <Paginate totalPages={pages} currentPage={page} />
    </div>
  );
};

export default JobResults;
