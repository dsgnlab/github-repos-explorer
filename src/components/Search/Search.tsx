import { ChangeEvent, FormEvent, memo, useCallback, useState } from "react";

import { SearchProps } from "./Search.types";

export const Search = memo(({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSearch(query.trim());
    },
    [onSearch, query]
  );

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="bg-white rounded-md shadow-sm p-3 mt-4"
    >
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-900"
      >
        Search
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          id="search"
          name="search"
          type="text"
          onChange={(event) => handleQuery(event)}
          value={query}
          placeholder="Search for a user, e.g. simonsmith"
          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
          autoComplete="off"
          data-testid="search-input"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-sky-500 hover:bg-sky-400 w-full py-1.5 text-sm text-white mt-3"
      >
        Search
      </button>
    </form>
  );
});
