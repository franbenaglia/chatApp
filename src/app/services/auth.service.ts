import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  private urlresourceserver: string = environment.resourceserver;

  private logged: boolean = false;
  private user: User;

  setUser(userName: string, token: string) {
    let user: User = new User();
    user.name = userName;
    user.token = token;
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  setLogin(logged: boolean) {
    this.logged = logged;
  }

  logout() {
    this.setLogin(false);
    window.location.assign("/");
  }

  isLoggedIn(): Boolean {
    return this.logged;
  }

  googleOauth2Login(): void {
    window.open(this.urlresourceserver + "/googleoauth2/google", "_self");
  }

  githubOauth2Login(): void {
    window.open(this.urlresourceserver + "/googleoauth2/github", "_self");
  }

}
