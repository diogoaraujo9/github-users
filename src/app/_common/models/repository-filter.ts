export class RepositoryFilter {
  login: string = '';
  page: number = 1;
  perPage: number = 10;
  name: string = '';
  minStarsQuantity: number = 0;
  sort: 'name' | 'stars' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
}
