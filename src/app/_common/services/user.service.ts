import { Injectable } from '@angular/core';
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
}
