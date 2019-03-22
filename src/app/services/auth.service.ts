import { Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      if (this.hasExpired(new Date(this.currentUser.expires))) {
        this.currentUser = null;
      }
    }
  }

  isLoggedIn() {
    if (this.currentUser) return true;
    return false;
  }

  hasExpired(expiration: Date): Boolean {
    var currentDate = new Date();
    var difference = expiration.getDate() - currentDate.getDate();
    return difference !== 1;
  }

  authenticateUser(name: string) {
    var user: User = {
      id: this.generateId(),
      name: name,
      expires: this.getExpiration()
    };

    this.authorizeUser(user);
  }

  authorizeUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  generateId() {
    var max = 100,
      min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getExpiration(): Date {
    var currentDate: Date = new Date();
    //return new Date(currentDate.setDate(currentDate.getTime() + (1000 * 10)));

    return new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  logoutUser() {
    localStorage.removeItem('currentUser');
  }
}
