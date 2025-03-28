/**
 * @jest-environment node
 */

import { fetchAPI } from "@/utils/fetchAPI";

describe("FetchAPI", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("should return JSON data on successful response", async () => {
    const mockResponse = { data: "test" };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await fetchAPI("http://example.com", {});
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error on non-ok response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false } as Response);

    await expect(fetchAPI("http://example.com", {})).rejects.toThrow(
      "FetchAPI: Unable to fetch",
    );
  });

  it("should throw an error on fetch failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
    await expect(fetchAPI("http://example.com", {})).rejects.toThrow(
      "Network error",
    );
  });
});
