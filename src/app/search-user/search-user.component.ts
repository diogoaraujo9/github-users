import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { UserHttpService } from 'src/app/_common/services/user.http.service';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
  public usernameControl = new FormControl('', [Validators.required, this.validateUsername()]);
  public form: FormGroup = new FormGroup({
    username: this.usernameControl
  });
  public searchText = '';
  public faMagnifyingGlass = faMagnifyingGlass;

  constructor(private router: Router, private userHttpService: UserHttpService) {}

  public async searchUser() {
    if (this.form.invalid) {
      return;
    }

    const user = await this.userHttpService.loadUser(this.usernameControl.value as string);

    if (user) {
      this.router.navigate(['user', user.login]);
    }
  }

  private validateUsername(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.
      const valid = /^[a-z\d]+([a-z\d]|-(?=[a-z\d]))*$/.test(control.value);
      return valid ? null : { invalidUsername: { value: control.value } };
    };
  }
}
