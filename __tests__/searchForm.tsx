import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "@/components/SearchForm";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SearchForm Component", () => {
  const mockRouterPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockRouterPush,
  });

  it("Should render with empty inputs when variant is 'home'", () => {
    render(<SearchForm variant={"home"} />);

    const whatInput = screen.getByRole("textbox", { name: /what/i });
    const whereInput = screen.getByRole("textbox", { name: /where/i });

    expect(whatInput).toHaveValue("");
    expect(whereInput).toHaveValue("");
  });

  it("Should render with pre-filled inputs when initialQuery is provided and variant is 'jobs'", () => {
    const mockInitialQuery = { what: "java developer", where: "london" };
    render(<SearchForm variant={"jobs"} query={mockInitialQuery} />);

    const whatInput = screen.getByRole("textbox", { name: /what/i });
    const whereInput = screen.getByRole("textbox", { name: /where/i });

    expect(whatInput).toHaveValue(mockInitialQuery.what);
    expect(whereInput).toHaveValue(mockInitialQuery.where);
  });

  it("Should update when user types", () => {
    render(<SearchForm variant={"home"} />);

    const whatInput = screen.getByRole("textbox", { name: /what/i });
    const whereInput = screen.getByRole("textbox", { name: /where/i });

    const newWhatValue = "software engineer";
    const newWhereValue = "new york";

    fireEvent.change(whatInput, { target: { value: newWhatValue } });
    fireEvent.change(whereInput, { target: { value: newWhereValue } });

    expect(whatInput).toHaveValue(newWhatValue);
    expect(whereInput).toHaveValue(newWhereValue);
  });

  it("Should submit form and navigate with correct parameters when variant is 'home'", () => {
    render(<SearchForm variant={"home"} />);

    const whatInput = screen.getByRole("textbox", { name: /what/i });
    const whereInput = screen.getByRole("textbox", { name: /where/i });
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(whatInput, { target: { value: "developer" } });
    fireEvent.change(whereInput, { target: { value: "london" } });
    fireEvent.click(searchButton);

    expect(mockRouterPush).toHaveBeenCalledWith(
      "/jobs?permanent=1&full_time=1&what=developer&where=london&page=1&results_per_page=10&distance=5&max_days_old=7&salary_min=0&salary_max=1000000",
    );
  });

  it("Should submit form and navigate with correct parameters when variant is 'jobs'", () => {
    render(<SearchForm variant={"jobs"} />);

    const distanceInput = screen.getByRole("textbox", { name: /distance/i });
    const salaryMinInput = screen.getByRole("textbox", { name: /min/i });
    const salaryMaxInput = screen.getByRole("textbox", { name: /max/i });
    const daysSelect = screen.getByRole("combobox", { name: /date posted/i });
    const workSelect = screen.getByRole("combobox", { name: /working hours/i });
    const contractSelect = screen.getByRole("combobox", {
      name: /contract type/i,
    });
    const form = screen.getByRole("search");

    fireEvent.change(distanceInput, { target: { value: "10" } });
    fireEvent.change(salaryMinInput, { target: { value: "50000" } });
    fireEvent.change(salaryMaxInput, { target: { value: "100000" } });

    fireEvent.change(daysSelect, { target: { value: "30" } });
    fireEvent.change(workSelect, { target: { value: "part_time" } });
    fireEvent.change(contractSelect, { target: { value: "contract" } });
    fireEvent.submit(form);

    expect(mockRouterPush).toHaveBeenCalledWith(
      "/jobs?contract=1&part_time=1&what=&where=&page=1&results_per_page=10&distance=10&max_days_old=30&salary_min=50000&salary_max=100000",
    );
  });

  it("Should add search to recent searches on submit", () => {
    render(<SearchForm variant={"jobs"} />);
    const whatInput = screen.getByRole("textbox", { name: /what/i });
    const whereInput = screen.getByRole("textbox", { name: /where/i });
    const form = screen.getByRole("search");

    fireEvent.change(whatInput, { target: { value: "developer" } });
    fireEvent.change(whereInput, { target: { value: "london" } });
    fireEvent.submit(form);

    expect(screen.getByText("developer in london")).toBeInTheDocument();
  });

  it("Should add search to recent searches on submit what only", () => {
    render(<SearchForm variant={"jobs"} />);
    const whatInput = screen.getByRole("textbox", { name: /what/i });
    const form = screen.getByRole("search");

    fireEvent.change(whatInput, { target: { value: "developer" } });
    fireEvent.submit(form);

    expect(screen.getByText("developer")).toBeInTheDocument();
  });

  it("Should add search to recent searches on submit where only", () => {
    render(<SearchForm variant={"jobs"} />);
    const whereInput = screen.getByRole("textbox", { name: /where/i });
    const form = screen.getByRole("search");

    fireEvent.change(whereInput, { target: { value: "london" } });
    fireEvent.submit(form);

    expect(screen.getByText("Jobs in london")).toBeInTheDocument();
  });

  it("Should clear recent searches when clear button is clicked", () => {
    render(<SearchForm variant={"jobs"} />);
    const whatInput = screen.getByRole("textbox", { name: /what/i });

    const whereInput = screen.getByRole("textbox", { name: /where/i });
    const form = screen.getByRole("search");
    fireEvent.change(whatInput, { target: { value: "developer" } });
    fireEvent.change(whereInput, { target: { value: "london" } });
    fireEvent.submit(form);

    const clearButton = screen.getByRole("button", { name: /clear searches/i });
    fireEvent.click(clearButton);

    expect(screen.queryByText("developer in london")).toBeNull();
  });

  it("Should set form data when recent search is clicked", () => {
    render(<SearchForm variant={"jobs"} />);
    const whatInput = screen.getByRole("textbox", { name: /what/i });
    const whereInput = screen.getByRole("textbox", { name: /where/i });
    const form = screen.getByRole("search");
    fireEvent.change(whatInput, { target: { value: "developer" } });
    fireEvent.change(whereInput, { target: { value: "london" } });
    fireEvent.submit(form);

    const recentSearch = screen.getByText("developer in london");
    fireEvent.click(recentSearch);

    expect(screen.getByRole("textbox", { name: /what/i })).toHaveValue(
      "developer",
    );
    expect(screen.getByRole("textbox", { name: /where/i })).toHaveValue(
      "london",
    );
    expect(mockRouterPush).toHaveBeenCalledWith(
      "/jobs?permanent=1&full_time=1&what=developer&where=london&page=1&results_per_page=10&distance=5&max_days_old=7&salary_min=0&salary_max=1000000",
    );
  });
});
