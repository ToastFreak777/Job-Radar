import { adzuna } from "@/utils/adzunaAPI";
import { AdzunaResponse, AdzunaAPIQuery } from "@/@types/adzuna";

export const loadAdzunaJobs = async (
  query: AdzunaAPIQuery,
): Promise<AdzunaResponse> => {
  const API_ID = process.env.NEXT_ADZUNA_API_ID;
  const API_KEY = process.env.NEXT_ADZUNA_API_KEY;

  if (API_ID === undefined || API_KEY === undefined)
    throw new Error("Missing Adzuna API Credentials in env variables");

  const defaultQuery = {
    country: "us",
    page: 1,
    results_per_page: 10,
    app_id: API_ID,
    app_key: API_KEY,
  };

  const data = await adzuna.getJobs({
    ...defaultQuery,
    ...query,
  });
  return data;
};
