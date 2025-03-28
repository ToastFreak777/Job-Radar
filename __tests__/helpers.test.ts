import "@testing-library/jest-dom";
import { adzuna } from "@/utils/adzunaAPI";

import { AdzunaResponse, AdzunaAPIQuery } from "@/@types/adzuna";
import { loadAdzunaJobs } from "@/utils/helpers";

jest.mock("@/utils/adzunaAPI");

describe("loadAdzunaJobs", () => {
  const mockAdzunaGetJobs = jest.mocked(adzuna.getJobs);
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv }; // Clone the environment
    mockAdzunaGetJobs.mockReset();
  });

  afterEach(() => {
    process.env = originalEnv; // Restore original environment
  });

  it("should return data from Adzuna API with correct parameters", async () => {
    process.env.NEXT_ADZUNA_API_ID = "test_id";
    process.env.NEXT_ADZUNA_API_KEY = "test_key";

    const mockResponse: AdzunaResponse = {
      results: [{ id: "1", title: "Developer" }],
      count: 1,
      results_per_page: 1,
      page: 1,
      location: { display_name: "test" },
    };

    mockAdzunaGetJobs.mockResolvedValue(mockResponse);

    const query: AdzunaAPIQuery = { what: "developer" };
    const result = await loadAdzunaJobs(query);

    expect(result).toEqual(mockResponse);
    expect(mockAdzunaGetJobs).toHaveBeenCalledWith({
      country: "us",
      page: 1,
      results_per_page: 10,
      app_id: "test_id",
      app_key: "test_key",
      what: "developer",
    });
  });

  it("should throw an error if API credentials are missing", async () => {
    delete process.env.NEXT_ADZUNA_API_ID;
    delete process.env.NEXT_ADZUNA_API_KEY;

    await expect(loadAdzunaJobs({ what: "developer" })).rejects.toThrow(
      "Missing Adzuna API Credentials in env variables",
    );
  });

  it("should handle API errors by throwing an error", async () => {
    process.env.NEXT_ADZUNA_API_ID = "test_id";
    process.env.NEXT_ADZUNA_API_KEY = "test_key";

    mockAdzunaGetJobs.mockRejectedValue(new Error("API error"));

    await expect(loadAdzunaJobs({})).rejects.toThrow("API error");
  });
});
