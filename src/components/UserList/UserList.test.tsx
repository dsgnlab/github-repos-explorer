import { MockedFunction, vi } from "vitest";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";

import { UserList } from "./UserList";
import { userListMock } from "../../mocks/user";

import type { ReactQuery } from "../../types/test";

const queryClient = new QueryClient();

describe("UserList component", () => {
  test("Should render the loading state", () => {
    (useQuery as MockedFunction<ReactQuery["useQuery"]>).mockImplementation(
      vi.fn().mockReturnValue({
        data: [],
        isLoading: true,
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <UserList searchQuery="dsgn" />
      </QueryClientProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Should render the user list", () => {
    (useQuery as MockedFunction<ReactQuery["useQuery"]>).mockImplementation(
      vi.fn().mockReturnValue({
        data: userListMock,
        isLoading: false,
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <UserList searchQuery="dsgn" />
      </QueryClientProvider>
    );

    expect(screen.getByText("facebook")).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("dsgnlab")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
  });
});
