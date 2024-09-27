export const apiUrls = {
  users: () => "GET /search/users",
  repositories: (userLogin: string) => `GET /users/${userLogin}/repos`,
};
