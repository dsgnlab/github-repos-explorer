import { Users } from "../../types/api";

export type UserListProps = {
  searchQuery: string;
};

export type UserItemProps = {
  user: Users[number];
};
