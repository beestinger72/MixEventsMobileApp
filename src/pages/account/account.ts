import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserData } from '../../providers/user-data';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})

export class AccountPage {
  title: string;
  body: string;
  newName: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public afs: AngularFirestore,
    public afDb : AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public userData: UserData,
  ) {



  }
  sendMessage(title: string, body: string) {
    this.afDb.list(`messages`).push({ title, body });
    this.title = "";
    this.body = "";
  }

 
  openEditPage() {
    this.navCtrl.push('ProfileEditPage')
  }

  openPostFeed(user) {
    this.navCtrl.push('UserPostsPage', {
      userId: user.uid,
      url: user.photoUrl
    })
  }
  getCurrentUser() {
    this.afAuth.authState.subscribe(data => {
      console.log('user Data ' , data.uid);
      return data.uid;
    });
  }
   
  logout(){

     this.auth.logout();
     this.userData.logout();

  }

}
