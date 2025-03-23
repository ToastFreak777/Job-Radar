import { AdzuanaResponse } from "@/@types/adzuna";
import { fetchAPI } from "./fetchAPI";

const BASE_URL = "https://api.adzuna.com/v1/api/jobs/";
const API_ID = process.env.NEXT_ADZUNA_API_ID;
const API_KEY = process.env.NEXT_ADZUNA_API_KEY;

export const adzuna = {
  getJobs: async (query: {
    what: string;
    where: string;
    [key: string]: string;
  }): Promise<AdzuanaResponse> => {
    const country = "us";
    const page = 1;
    const max_days_old = "30";

    const url = new URL(`${country}/search/${page}`, BASE_URL);

    try {
      if (API_ID === undefined || API_KEY === undefined)
        throw new Error("Missing Adzuna API Credentials");

      url.searchParams.append("app_id", API_ID);
      url.searchParams.append("app_key", API_KEY);
      url.searchParams.append("max_days_old", max_days_old);

      Object.keys(query).forEach((key) => {
        if (query[key] !== "") url.searchParams.append(key, query[key]);
      });

      // console.log(url.href);
      return await fetchAPI(url.href, {});
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
