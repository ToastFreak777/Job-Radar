import { AdzunaAPIQuery } from "@/@types/adzuna";
import JobResults from "@/components/JobResults";
import SearchForm from "@/components/SearchForm";
import { loadAdzunaJobs } from "@/utils/helpers";

type JobsProps = {
  searchParams: Promise<AdzunaAPIQuery>;
};

const Jobs = async ({ searchParams }: JobsProps) => {
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
