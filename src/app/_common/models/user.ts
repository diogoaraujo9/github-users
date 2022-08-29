export interface User {
  id: number;
  type: string;
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  followers: number;
  following: number;
  url: string;
  public_repos: number;
}
