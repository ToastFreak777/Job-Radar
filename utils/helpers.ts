import { adzuna } from "@/utils/adzunaAPI";
import { AdzuanaResponse, AdzunaAPIQuery } from "@/@types/adzuna";

export const loadAdzunaJobs = async (
  query: AdzunaAPIQuery,
): Promise<AdzuanaResponse> => {
  const API_ID = process.env.NEXT_ADZUNA_API_ID;
  const API_KEY = process.env.NEXT_ADZUNA_API_KEY;

  if (API_ID === undefined || API_KEY === undefined)
    throw new Error("Missing Adzuna API Credentials in env variables");

  const data = await adzuna.getJobs({
    country: "us",
    page: 1,
    app_id: API_ID,
    app_key: API_KEY,
    ...query,
  });
  return data;
};
