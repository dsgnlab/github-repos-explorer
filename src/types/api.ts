import { Endpoints } from "@octokit/types";

export type Users = Endpoints["GET /search/users"]["response"]["data"]["items"];

export type Repositories =
  Endpoints["GET /users/{username}/repos"]["response"]["data"];

export type PaginatedRepositories = {
  data: Repositories;
  pagesRemaining: boolean;
};
