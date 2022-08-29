import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserHttpService } from 'src/app/_common/services/user.http.service';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
  public searchText = '';

  constructor(private router: Router, private userHttpService: UserHttpService) {}

  public async searchUser() {
    const user = await this.userHttpService.loadUser(this.searchText);

    if (user) {
      this.router.navigate(['user', user.login]);
    }
  }
}
