import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faLocationDot, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { User } from '../_common/models/user';
import { UserHttpService } from '../_common/services/user.http.service';
import { UserService } from '../_common/services/user.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  public loadingUser: boolean = false;
  public faLocationDot = faLocationDot;
  public faArrowLeft = faArrowLeft;
  public faSpinner = faSpinner;
  private subscriptions = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private userHttpService: UserHttpService,
    private userService: UserService,
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

  public async changeUser(username: string): Promise<void> {
    await this.loadUserDetails(username);

    if (this.isUserLoaded(username)) {
      this.router.navigate(['user', username]);
    }
  }

  public async loadUserDetails(username: string): Promise<void> {
    if (this.isUserLoaded(username)) {
      return;
    }

    this.loadingUser = true;
    let user: User | null = await this.userHttpService.loadUser(username);

    if (!user && !this.user) {
      this.navigateToSearchPage();
      return;
    }

    if (user) {
      this.user = user;
    }

    this.loadingUser = false;
  }

  public navigateToSearchPage(): void {
    this.router.navigate(['search']);
  }

  private isUserLoaded(username: string) {
    return this.user?.login?.toLocaleLowerCase() === username.toLocaleLowerCase();
  }
}
