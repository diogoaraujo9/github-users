import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
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
  public faLocationDot = faLocationDot;
  public faArrowLeft = faArrowLeft;
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

  public changeUser(username: string): void {
    this.router.navigate(['user', username]);
  }

  public async loadUserDetails(username: string): Promise<void> {
    let user: User | null = this.userService.getUser(username);

    if (!user) {
      user = await this.userHttpService.loadUser(username);

      if (!user) {
        return;
      }
    }

    this.user = user;
  }

  public navigateToSearchPage(): void {
    this.router.navigate(['search']);
  }
}
