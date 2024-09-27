import { Octokit } from "octokit";

import { apiUrls } from "../constants/apiUrls";
import { PaginatedRepositories, Repositories } from "../types/api";

const octokit = new Octokit({
  auth: import.meta.env.OCTOKIT_TOKEN,
});

export const fetchRepositoryList = async (
  userLogin: string,
  size: number
): Promise<Repositories | undefined> => {
  try {
    const { data } = await octokit.request(apiUrls.repositories(userLogin), {
      per_page: size,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      sort: "updated",
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjects = async (
  { pageParam }: { pageParam: number },
  userLogin: string
): Promise<PaginatedRepositories | undefined> => {
  try {
    const { headers, data } = await octokit.request(
      apiUrls.repositories(userLogin),
      {
        per_page: 10,
        page: pageParam,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        sort: "updated",
      }
    );

    const linkHeader = headers.link;
    const pagesRemaining = !!(linkHeader && linkHeader.includes('rel="next"'));

    return { data, pagesRemaining };
  } catch (error) {
    console.error(error);
  }
};
