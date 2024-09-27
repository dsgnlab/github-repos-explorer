import { Repositories } from "../../types/api";

export type RepositoryListProps = {
  userLogin: string;
};

export type RepositoryItemProps = {
  repository: Repositories[number];
};
