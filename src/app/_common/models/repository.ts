import { User } from './user';

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  owner: User;
  description: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
}
