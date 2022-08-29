import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Repository } from '../models/repository';
import { AsyncHttpClient } from './async-http-client.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryHttpService {
  private headers: HttpHeaders;

  constructor(private http: AsyncHttpClient, private repositoryService: RepositoryService) {
    this.headers = new HttpHeaders({
      Accept: 'application/vnd.github+json'
    });
  }

  public async loadRepositories(
    username: string,
    page: number = 1,
    perPage: number = 10,
    sortDirection: string = 'asc'
  ): Promise<Repository[] | null> {
    try {
      const res = await this.http.get<Repository[]>(
        `${environment.gitHubBaseUrl}/users/${username}/repos?page=${page}&per_page=${perPage}&direction=${sortDirection}`,
        {
          headers: this.headers
        }
      );

      this.repositoryService.storeRepositories(res.body as Repository[]);
      return res.body;
    } catch (error) {
      return null;
    }
  }
}
