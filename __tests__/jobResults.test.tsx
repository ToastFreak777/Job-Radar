import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import JobResults from "@/components/JobResults";
import { AdzunaResponse, AdzunaAPIQuery } from "@/@types/adzuna";

// Mock data
const mockInitialData: AdzunaResponse = {
  results: [
    {
      id: "123",
      title: "Software Engineer",
      company: { display_name: "Tech Inc.", __CLASS__: "company1" },
      location: {
        area: ["area1"],
        display_name: "New York, NY",
        __CLASS__: "location1",
      },
      salary_min: 80000,
      salary_max: 120000,
      description: "Develop software applications.",
      redirect_url: "https://example.com",
      adref: "string1",
      category: {
        label: "IT",
        tag: "tag1",
        __CLASS__: "category1",
      },
      created: new Date(),
      latitude: 40.7128,
      salary_is_predicted: "false",
      __CLASS__: "adzuna_jobs",
    },
    {
      id: "456",
      title: "Data Analyst",
      company: { display_name: "Data Corp.", __CLASS__: "company2" },
      location: {
        area: ["area2"],
        display_name: "San Francisco, CA",
        __CLASS__: "location2",
      },
      salary_min: 70000,
      salary_max: 90000,
      description: "Analyze data and create reports.",
      redirect_url: "https://example2.com",
      adref: "string2",
      category: {
        label: "IT",
        tag: "string2",
        __CLASS__: "category2",
      },
      created: new Date(),
      latitude: 37.7749,
      salary_is_predicted: "false",
      __CLASS__: "adzuna_jobs",
    },
  ],
  count: 2,
  mean: 0,
  __CLASS__: "adzuna_response",
};

const mockInitialQuery: AdzunaAPIQuery = {
  what: "engineer",
  where: "usa",
  results_per_page: 10,
  page: 1,
};

jest.mock("next/navigation");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockInitialData),
  }),
) as jest.Mock;

describe("Jobs Results Component", () => {
  it("Renders job results correctly", async () => {
    render(<JobResults data={mockInitialData} query={mockInitialQuery} />);

    await waitFor(async () => {
      expect(screen.getByText("Software Engineer")).toBeInTheDocument();
      expect(screen.getByText("Data Analyst")).toBeInTheDocument();
      expect(screen.getByText("Tech Inc. | New York, NY")).toBeInTheDocument();
      expect(
        screen.getByText("Data Corp. | San Francisco, CA"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Develop software applications."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Analyze data and create reports."),
      ).toBeInTheDocument();

      const viewJobLinks = screen.getAllByRole("link", { name: /View Job/i });

      expect(viewJobLinks).toHaveLength(2);
      expect(viewJobLinks[0]).toHaveAttribute("href", "https://example.com");
      expect(viewJobLinks[1]).toHaveAttribute("href", "https://example2.com");

      expect(screen.getByText(/2 jobs/i)).toBeInTheDocument();
    });
  });
});
