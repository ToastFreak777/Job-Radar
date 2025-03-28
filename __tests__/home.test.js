import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

//Modules
jest.mock("next/navigation");

describe("Home Page", () => {
  it("renders a SearchForm Component", () => {
    render(<Home />);

    const searchForm = screen.getByRole("textbox", { name: /what/i });

    expect(searchForm).toBeInTheDocument();
  });
});
