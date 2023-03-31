import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { PostsCreatePage } from '../posts-create/posts-create';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
   // public adMob: AdMobFree, 
    public platform: Platform
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');


  }
  goToSomethingElse() {

    this.navCtrl.push(PostsCreatePage);
}
}
