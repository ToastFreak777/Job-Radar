import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/page";
import { useRouter } from "next/navigation";

//Modules
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Page: (Unit Tests)", () => {
  it("renders a SearchForm Component", () => {
    render(<Home />);

    const searchForm = screen.getByRole("search");

    expect(searchForm).toBeInTheDocument();
  });
});

describe("Home Page: (Integration Tests)", () => {
  it("navigates to the jobs page with correct query params on form submission", async () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<Home />);

    const whatInput = screen.getByPlaceholderText("title, keywords or company");
    const whereInput = screen.getByPlaceholderText("city, state, postal codes");
    const submitButton = screen.getByRole("button", { name: "Search" });

    const job = "developer";
    const location = "london";

    fireEvent.change(whatInput, { target: { value: job } });
    fireEvent.change(whereInput, { target: { value: location } });
    fireEvent.click(submitButton);

    expect(mockRouter.push).toHaveBeenCalledWith(
      `/jobs?permanent=1&full_time=1&what=${job}&where=${location}&page=1&results_per_page=10&distance=5&max_days_old=7&salary_min=0&salary_max=1000000`,
    );
  });
});
