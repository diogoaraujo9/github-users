import { Injectable } from '@angular/core';
import { Repository } from '../models/repository';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  public repositoriesByUsername: { [username: string]: Repository[] } = {};

  constructor() {}

  public getRepositoriesByUsername(username: string): Repository[] {
    return this.repositoriesByUsername[username];
  }

  public storeRepositories(repositories: Repository[]): void {
    if (!repositories?.length) {
      return;
    }

    const username = repositories[0].owner?.login;
    this.repositoriesByUsername[username] = repositories;
  }
}
