import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { RepositoryFilter } from '../models/repository-filter';
import { RepositorySearchResult } from '../models/repository-search-result';
import { AsyncHttpClient } from './async-http-client.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryHttpService {
  private headers: HttpHeaders;

  constructor(
    private http: AsyncHttpClient,
    private repositoryService: RepositoryService,
    private toastrService: ToastrService
  ) {
    this.headers = new HttpHeaders({
      Accept: 'application/vnd.github+json'
    });

    if (environment.token) {
      this.headers = this.headers.append('Authorization', `token ${environment.token}`);
    }
  }

  public async loadRepositories(filter: RepositoryFilter): Promise<RepositorySearchResult | null> {
    try {
      const res = await this.http.get<RepositorySearchResult>(
        `${environment.gitHubBaseUrl}/search/repositories?${this.buildUrlQueryParameter(filter)}`,
        {
          headers: this.headers
        }
      );

      const searchResult = res.body as RepositorySearchResult;
      const repositories = searchResult.items;

      if (repositories?.length) {
        this.repositoryService.storeRepositories(repositories);
      }

      return searchResult;
    } catch (error: any) {
      if (error?.status === 0) {
        this.toastrService.error('Conexão perdida', 'Erro');
      } else if (error?.error?.message) {
        this.toastrService.error(error.error.message, 'Erro');
      }

      return null;
    }
  }

  private buildUrlQueryParameter(filter: RepositoryFilter): string {
    let queryParam = '';

    if (filter.name) {
      queryParam += ` ${filter.name} in:name`;
    }

    if (filter.login) {
      queryParam += ` user:${filter.login}`;
    }

    if (filter.minStarsQuantity > 0) {
      queryParam += ` stars:>=${filter.minStarsQuantity}`;
    }

    const sort = `sort=${filter.sort}&order=${filter.sortDirection}`;
    const page = `page=${filter.page}&per_page=${filter.perPage}`;

    return `q=${queryParam.trim()}&${sort}&${page}`;
  }
}
