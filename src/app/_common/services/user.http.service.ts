import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AsyncHttpClient } from './async-http-client.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private headers: HttpHeaders;

  constructor(private http: AsyncHttpClient, private userService: UserService, private toastrService: ToastrService) {
    this.headers = new HttpHeaders({
      Accept: 'application/vnd.github.v3+json'
    });

    if (environment.token) {
      this.headers = this.headers.append('Authorization', `token ${environment.token}`);
    }
  }

  public async loadUser(username: string): Promise<User | null> {
    try {
      const res = await this.http.get<User>(`${environment.gitHubBaseUrl}/users/${username}`, {
        headers: this.headers
      });

      this.userService.storeUser(res.body as User);
      return res.body;
    } catch (error: any) {
      if (error?.status === 404) {
        this.toastrService.error('Usuário não encontado', 'Erro');
      } else if (error?.status === 0) {
        this.toastrService.error('Conexão perdida', 'Erro');
        return this.userService.getUser(username);
      } else if (error?.error?.message) {
        this.toastrService.error(error.error.message, 'Erro');
      }
      return null;
    }
  }
}
