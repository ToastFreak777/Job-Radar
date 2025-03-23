import { AdzuanaResponse, AdzunaAPIRequest } from "@/@types/adzuna";
import { fetchAPI } from "./fetchAPI";

const BASE_URL = "https://api.adzuna.com/v1/api/jobs/";

export const adzuna = {
  getJobs: async ({
    app_id,
    app_key,
    country,
    page,
    ...query
  }: AdzunaAPIRequest): Promise<AdzuanaResponse> => {
    const url = new URL(`${country}/search/${page}`, BASE_URL);
    url.searchParams.append("app_id", app_id);
    url.searchParams.append("app_key", app_key);

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== "")
        url.searchParams.append(key, String(value));
    });

    return await fetchAPI(url.href, {});
  },
};
