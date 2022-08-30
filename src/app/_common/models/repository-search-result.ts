import { Repository } from './repository';

export interface RepositorySearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}
