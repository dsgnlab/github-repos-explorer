import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/jest-dom";

import type { ReactQuery } from "../types/test";

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const originalModule = await importOriginal<ReactQuery>();
  return {
    ...originalModule,
    useQuery: vi.fn(),
    useInfiniteQuery: vi.fn(),
  };
});
