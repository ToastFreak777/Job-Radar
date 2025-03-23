import { AdzuanaResponse, AdzunaAPIQuery } from "@/@types/adzuna";
import { fetchAPI } from "./fetchAPI";

const BASE_URL = "https://api.adzuna.com/v1/api/jobs/";
const API_ID = process.env.NEXT_ADZUNA_API_ID;
const API_KEY = process.env.NEXT_ADZUNA_API_KEY;

export const adzuna = {
  getJobs: async (query: AdzunaAPIQuery): Promise<AdzuanaResponse> => {
    const url = new URL(`${query.country}/search/${query.page}`, BASE_URL);

    try {
      if (API_ID === undefined || API_KEY === undefined)
        throw new Error("Missing Adzuna API Credentials");

      url.searchParams.append("app_id", API_ID);
      url.searchParams.append("app_key", API_KEY);

      Object.keys(query).forEach((key) => {
        console.log("Looping: ", key, query[key]);
        if (query[key] !== "" && key !== "page" && key !== "country")
          url.searchParams.append(key, query[key]);
      });

      // console.log(url.href);
      return await fetchAPI(url.href, {});
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
