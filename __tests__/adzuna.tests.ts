import { adzuna } from "@/utils/adzunaAPI";
import { fetchAPI } from "@/utils/fetchAPI";

jest.mock("@/utils/fetchAPI");

describe("adzuna.getJobs", () => {
  const mockFetchAPI = jest.mocked(fetchAPI);
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv }; // Clone the environment
    mockFetchAPI.mockReset();
  });

  afterEach(() => {
    process.env = originalEnv; // Restore original environment
  });

  it("should build the correct URL and call fetchAPI with correct parameters", async () => {
    process.env.NEXT_ADZUNA_API_ID = "test_id";
    process.env.NEXT_ADZUNA_API_KEY = "test_key";

    const mockResponse = { results: [{ id: "1" }] };
    mockFetchAPI.mockResolvedValue(mockResponse);

    await adzuna.getJobs({
      country: "us",
      page: 1,
      what: "developer",
      app_id: process.env.NEXT_ADZUNA_API_ID,
      app_key: process.env.NEXT_ADZUNA_API_KEY,
    });

    expect(mockFetchAPI).toHaveBeenCalledWith(
      "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=test_id&app_key=test_key&what=developer",
      {},
    );
  });

  it("should return the data from fetchAPI", async () => {
    process.env.NEXT_ADZUNA_API_ID = "test_id";
    process.env.NEXT_ADZUNA_API_KEY = "test_key";

    const mockResponse = { results: [{ id: "1" }] };
    mockFetchAPI.mockResolvedValue(mockResponse);

    const result = await adzuna.getJobs({
      country: "us",
      page: 1,
      what: "developer",
      app_id: process.env.NEXT_ADZUNA_API_ID,
      app_key: process.env.NEXT_ADZUNA_API_KEY,
    });

    expect(result).toEqual(mockResponse);
  });
});
