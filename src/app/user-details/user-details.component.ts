import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Repository } from '../_common/models/repository';
import { User } from '../_common/models/user';
import { RepositoryHttpService } from '../_common/services/repository.http.service';
import { UserHttpService } from '../_common/services/user.http.service';
import { UserService } from '../_common/services/user.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  public repositories: Repository[] = [];
  public selectedRepository: Repository | null = null;
  public repositoryCurrentPage: number = 1;
  public repositoryTotalPages: number = 1;
  private readonly repositoryPerPage: number = 10;
  private subscriptions = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private userHttpService: UserHttpService,
    private userService: UserService,
    private repositoryHttpService: RepositoryHttpService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.subscriptions.add(
      this._route.params.subscribe((params) => {
        this.loadUserDetails(params['username']);
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public async loadUserDetails(username: string): Promise<void> {
    this.user = this.userService.getUser(username);

    if (!this.user) {
      this.user = await this.userHttpService.loadUser(username);

      if (!this.user) {
        this.navigateToSearchPage();
        return;
      }
    }

    this.repositoryTotalPages = Math.ceil(this.user.public_repos / this.repositoryPerPage);
    await this.loadRepositories();
  }

  public async loadRepositories(page: number = 1): Promise<void> {
    if (!this.user) {
      return;
    }

    this.repositoryCurrentPage = page;
    this.repositories =
      (await this.repositoryHttpService.loadRepositories(this.user.login, page, this.repositoryPerPage)) || [];
  }

  public showRepositoryDetails(repository: Repository): void {
    this.selectedRepository = repository;
  }

  public showRepositoryList(): void {
    this.selectedRepository = null;
  }

  public navigateToSearchPage(): void {
    this.router.navigate(['search']);
  }
}
