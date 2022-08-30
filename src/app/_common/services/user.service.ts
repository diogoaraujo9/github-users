import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: { [username: string]: User } = {};

  constructor() {}

  public getUser(username: string): User {
    return this.users[username];
  }

  public storeUser(user: User): void {
    this.users[user.login] = user;
  }

  public validateFormUsername(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.
      const valid = /^[a-z\d]+([a-z\d]|-(?=[a-z\d]))*$/.test(control.value);
      return valid ? null : { invalidUsername: { value: control.value } };
    };
  }
}
