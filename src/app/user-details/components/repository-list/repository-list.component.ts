import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faArrowDown, faArrowLeft, faArrowUp, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, Subject } from 'rxjs';
import { RepositoryFilter } from 'src/app/_common/models/repository-filter';

import { Repository } from '../../../_common/models/repository';
import { User } from '../../../_common/models/user';
import { RepositoryHttpService } from '../../../_common/services/repository.http.service';

@Component({
  selector: 'repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnChanges, OnInit {
  @Input() user: User | null = null;
  public repositories: Repository[] = [];
  public selectedRepository: Repository | null = null;
  public repositoryTotalPages: number = 1;
  public loadingRepositories: boolean = false;
  public filter = new RepositoryFilter();
  public faArrowLeft = faArrowLeft;
  public faStar = faStar;
  public faArrowUp = faArrowUp;
  public faArrowDown = faArrowDown;
  public faSpinner = faSpinner;
  private onSearchChanged = new Subject<void>();

  constructor(private repositoryHttpService: RepositoryHttpService) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.loadRepositories();
    }
  }

  public ngOnInit(): void {
    this.onSearchChanged.pipe(debounceTime(500)).subscribe(() => {
      this.loadRepositories();
    });
  }

  public filterRepositories(): void {
    this.onSearchChanged.next();
  }

  public async loadRepositories(page: number = 1): Promise<void> {
    if (!this.user) {
      return;
    }

    this.loadingRepositories = true;

    this.filter.login = this.user.login;

    this.repositoryTotalPages = Math.ceil(this.user.public_repos / this.filter.perPage);
    this.filter.page = page;

    const searchResult = await this.repositoryHttpService.loadRepositories(this.filter);

    this.repositories = searchResult?.items || [];
    this.repositoryTotalPages = Math.ceil((searchResult?.total_count || 0) / this.filter.perPage);

    this.loadingRepositories = false;
  }

  public showRepositoryDetails(repository: Repository): void {
    this.selectedRepository = repository;
  }

  public showRepositoryList(): void {
    this.selectedRepository = null;
  }

  public changeSortDirection(field: 'name' | 'stars'): void {
    if (this.filter.sort === field) {
      this.filter.sortDirection = this.filter.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.filter.sort = field;
      this.filter.sortDirection = 'asc';
    }

    this.loadRepositories();
  }
}
