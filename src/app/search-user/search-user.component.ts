import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserHttpService } from 'src/app/_common/services/user.http.service';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
  constructor(private router: Router, private userHttpService: UserHttpService) {}

  public async searchUser(username: string) {
    const user = await this.userHttpService.loadUser(username);

    if (user) {
      this.router.navigate(['user', user.login]);
    }
  }
}
