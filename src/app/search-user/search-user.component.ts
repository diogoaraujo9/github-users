import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserHttpService } from 'src/app/_common/services/user.http.service';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
  public loadingUser: boolean = false;

  constructor(private router: Router, private userHttpService: UserHttpService) {}

  public async searchUser(username: string) {
    this.loadingUser = true;

    const user = await this.userHttpService.loadUser(username);
    this.loadingUser = false;

    if (user) {
      this.router.navigate(['user', user.login]);
    }
  }
}
