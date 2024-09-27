import { Octokit } from "octokit";

import { apiUrls } from "../constants/apiUrls";
import { Users } from "../types/api";

const octokit = new Octokit({
  auth: import.meta.env.OCTOKIT_TOKEN,
});

export const fetchUserList = async (
  size: number,
  query: string
): Promise<Users> => {
  const {
    data: { items },
  } = await octokit.request(apiUrls.users(), {
    q: query,
    per_page: size,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return items;
};
