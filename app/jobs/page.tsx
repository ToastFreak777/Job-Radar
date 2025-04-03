import { AdzunaAPIQuery } from "@/@types/adzuna";
import JobResults from "@/components/JobResults";
import SearchForm from "@/components/SearchForm";
import { loadAdzunaJobs } from "@/utils/helpers";

type JobsProps = {
  searchParams: Promise<AdzunaAPIQuery>;
};

const Jobs = async ({ searchParams }: JobsProps) => {
  const query = await searchParams;

  const data = await loadAdzunaJobs(query);
  // console.log(data);

  return (
    <div className="wrapper row gap-12">
      <div className="grow-1">
        <SearchForm variant={"jobs"} query={query} />
      </div>
      <JobResults data={data} query={query} />
    </div>
  );
};

export default Jobs;
