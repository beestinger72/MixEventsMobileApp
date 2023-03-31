import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(email: string, fullname: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(email);
    this.setFullname(fullname);
    this.events.publish('user:login');
  };

  signup(username: string, fullname: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.setFullname(fullname);

    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('fullname');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  setFullname(fullname: string): void {
    this.storage.set('fullname', fullname);
  };
  setJobtitle(jobtitle: string): void {
    this.storage.set('jobtitle', jobtitle);
  };
  setCompany(company: string): void {
    this.storage.set('company', company);
  };
  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  getFullname(): Promise<string> {
    return this.storage.get('fullname').then((value) => {
      return value;
    });
  };
  getJobtitle(): Promise<string> {
    return this.storage.get('jobtitle').then((value) => {
      return value;
    });
  };

  getCompany(): Promise<string> {
    return this.storage.get('company').then((value) => {
      return value;
    });
  };


  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
