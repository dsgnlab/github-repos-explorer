import { useState } from "react";

import { Search } from "../Search";
import { UserList } from "../UserList";

export const Explorer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto max-w-xs px-2">
      <Search onSearch={handleSearch} />

      {searchQuery && (
        <>
          <p className="text-sm text-gray-900 mt-4">
            Showing users for "{searchQuery}":
          </p>

          <UserList searchQuery={searchQuery} />
        </>
      )}
    </div>
  );
};
