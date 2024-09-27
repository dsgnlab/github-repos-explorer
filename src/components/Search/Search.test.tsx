import { vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Search } from "./Search";

describe("Search component", () => {
  test("Should render the search input", () => {
    render(<Search onSearch={vi.fn()} />);

    expect(screen.getByTestId("search-input")).toHaveValue("");
  });

  test("Should render the label", () => {
    render(<Search onSearch={vi.fn()} />);

    expect(screen.getByLabelText("Search")).toHaveValue("");
  });

  test("Should allow user to type the query", () => {
    render(<Search onSearch={vi.fn()} />);

    const input = screen.getByLabelText("Search");

    fireEvent.change(input, { target: { value: "meta" } });

    expect(input).toHaveValue("meta");
  });
});
