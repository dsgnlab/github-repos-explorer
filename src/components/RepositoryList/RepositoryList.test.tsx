import { MockedFunction, vi } from "vitest";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";

import { repositoryListMock } from "../../mocks/repository";

import { RepositoryList } from "./RepositoryList";

import type { ReactQuery } from "../../types/test";

const queryClient = new QueryClient();

describe("RepositoryList component", () => {
  test("Should render the loading state", () => {
    (
      useInfiniteQuery as MockedFunction<ReactQuery["useInfiniteQuery"]>
    ).mockImplementation(
      vi.fn().mockReturnValue({
        data: [],
        isLoading: true,
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <RepositoryList userLogin="meta" />
      </QueryClientProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Should render the repository list", () => {
    (
      useInfiniteQuery as MockedFunction<ReactQuery["useInfiniteQuery"]>
    ).mockImplementation(
      vi.fn().mockReturnValue({
        data: repositoryListMock,
        isLoading: false,
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <RepositoryList userLogin="meta" />
      </QueryClientProvider>
    );

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("jsx")).toBeInTheDocument();
    expect(screen.getByTestId("stars-react")).toHaveTextContent("227795");
    expect(screen.getByTestId("stars-jsx")).toHaveTextContent("1959");
  });
});
