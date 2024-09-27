import { memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

import { fetchUserList } from "../../api/user";
import { RepositoryList } from "../../components/RepositoryList";
import { LoadingIndicator } from "../../ui/LoadingIndicator";

import type { UserListProps, UserItemProps } from "./UserList.types";

const UserItem = memo(({ user }: UserItemProps) => {
  const [repositoriesOpened, setRepositoriesOpened] = useState(false);

  const handleShowRepos = () => {
    setRepositoriesOpened(!repositoriesOpened);
  };

  return (
    <li key={user.email} className="w-full my-4">
      <div className="flex justify-between gap-x-6 p-3 relative bg-white rounded-md shadow-sm hover:shadow-md">
        <div className="flex min-w-0 gap-x-4">
          <img
            alt={user.login}
            src={user.avatar_url}
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm truncate font-semibold leading-6 text-gray-900">
              {user.login}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {user.type}
            </p>
          </div>
        </div>
        <div className="shrink-0 sm:flex sm:flex-col sm:items-end justify-center">
          <span
            className="absolute inset-0 pointer"
            aria-hidden="true"
            role="button"
            onClick={handleShowRepos}
          ></span>
          {repositoriesOpened ? (
            <ChevronUpIcon
              aria-hidden="true"
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            />
          ) : (
            <ChevronDownIcon
              aria-hidden="true"
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            />
          )}
        </div>
      </div>
      {repositoriesOpened && <RepositoryList userLogin={user.login} />}
    </li>
  );
});

export const UserList = ({ searchQuery }: UserListProps) => {
  const { isLoading, data: userList } = useQuery({
    queryKey: ["users", searchQuery],
    queryFn: () => fetchUserList(5, searchQuery),
    enabled: !!searchQuery,
  });

  if (isLoading) return <LoadingIndicator />;

  if (!userList || userList?.length === 0) {
    return (
      <p className="text-sm text-gray-900 bg-white rounded-md shadow-sm p-3 mt-4">
        We couldn't find a match
      </p>
    );
  }

  return (
    <ul role="list">
      {userList.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </ul>
  );
};
