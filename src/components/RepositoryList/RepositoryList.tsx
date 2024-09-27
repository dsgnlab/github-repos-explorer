import { memo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { StarIcon } from "@heroicons/react/20/solid";

import { fetchProjects } from "../../api/repository";
import { LoadingIndicator } from "../../ui/LoadingIndicator";

import type {
  RepositoryListProps,
  RepositoryItemProps,
} from "./Repositorylist.types";

const RepositoryItem = memo(({ repository }: RepositoryItemProps) => {
  return (
    <li
      key={repository.id}
      className="flex min-w-0 bg-white rounded-md shadow-sm p-3 my-2"
    >
      <div className="min-w-0 flex-auto">
        <p className="truncate leading-5 text-sm text-gray-900">
          {repository.name}
        </p>
        <p className="truncate text-xs text-gray-500 mt-1">
          {repository.description}
        </p>
      </div>
      <div>
        <p
          className="flex items-center text-xs text-gray-400 leading-5"
          data-testid={`stars-${repository.name}`}
        >
          {repository.stargazers_count} <StarIcon className="size-3 ml-1" />
        </p>
      </div>
    </li>
  );
});

export const RepositoryList = ({ userLogin }: RepositoryListProps) => {
  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ["repositories", userLogin],
    queryFn: (d) => fetchProjects(d, userLogin),
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam) => {
      return lastPageParam + 1;
    },
  });

  const handleLoadMore = () => {
    fetchNextPage();
  };

  if (isLoading) return <LoadingIndicator />;

  if (!data) return;

  return (
    <ul role="list" className="block ml-4">
      {data.pages.map((page, index) => (
        <>
          {page && page.data.length > 0 ? (
            page.data.map((repository) => (
              <RepositoryItem repository={repository} />
            ))
          ) : (
            <p className="text-xs text-gray-900 ml-4 bg-white rounded-md shadow-sm p-3 my-2">
              User doesn’t have any public repositories
            </p>
          )}
          {page &&
            page.pagesRemaining &&
            data.pages.length - 1 === index &&
            !isFetching && (
              <button
                type="button"
                onClick={handleLoadMore}
                className="text-sm text-gray-900 hover:text-gray-500"
              >
                Load more...
              </button>
            )}
        </>
      ))}

      {isFetching && <LoadingIndicator />}
    </ul>
  );
};
