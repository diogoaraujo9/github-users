import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faArrowDown, faArrowLeft, faArrowUp, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';

import { Repository } from '../../../_common/models/repository';
import { User } from '../../../_common/models/user';
import { RepositoryHttpService } from '../../../_common/services/repository.http.service';

@Component({
  selector: 'repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnChanges {
  @Input() user: User | null = null;
  public repositories: Repository[] = [];
  public selectedRepository: Repository | null = null;
  public repositoryCurrentPage: number = 1;
  public repositoryTotalPages: number = 1;
  public sortDirection: 'asc' | 'desc' = 'asc';
  public loadingRepositories: boolean = false;
  public faArrowLeft = faArrowLeft;
  public faStar = faStar;
  public faArrowUp = faArrowUp;
  public faArrowDown = faArrowDown;
  public faSpinner = faSpinner;
  private readonly repositoryPerPage: number = 10;

  constructor(private repositoryHttpService: RepositoryHttpService) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.loadRepositories();
    }
  }

  public async loadRepositories(page: number = 1): Promise<void> {
    if (!this.user) {
      return;
    }

    this.loadingRepositories = true;

    this.repositoryTotalPages = Math.ceil(this.user.public_repos / this.repositoryPerPage);
    this.repositoryCurrentPage = page;
    this.repositories =
      (await this.repositoryHttpService.loadRepositories(
        this.user.login,
        page,
        this.repositoryPerPage,
        this.sortDirection
      )) || [];

    this.loadingRepositories = false;
  }

  public showRepositoryDetails(repository: Repository): void {
    this.selectedRepository = repository;
  }

  public showRepositoryList(): void {
    this.selectedRepository = null;
  }

  public changeSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.loadRepositories();
  }
}
