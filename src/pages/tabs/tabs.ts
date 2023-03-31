import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage2 {

  tab1Root = 'ActivityPage';
  tab2Root = 'PostsCreatePage';
  tab3Root = 'UsersPage';
  tab4Root = 'ProfilePage';

  constructor(public auth: AuthProvider) {

  }

  ionViewCanEnter() {
    return this.auth.isLoggedIn();
  }
}
