// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { SponsorsDataProvider } from '../../providers/sponsors-data/sponsors-data';
// import { MyHandlerProvider } from '../../providers/my-handler/my-handler';

// /**
//  * Generated class for the SponsorsPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */


// @Component({
//   selector: 'page-users',
//   templateUrl: 'sponsors.html',
// })
// export class SponsorsPage {

//   constructor(public navCtrl: NavController, public SponsorData: SponsorsDataProvider, public myHandler:MyHandlerProvider ) {
    
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad SponsorsPage');
//     this.SponsorData.getRemoteData();
//     this.navCtrl.push('SponsorsPage');
//   }

// }
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { SponsorsDataProvider } from '../../providers/sponsors-data/sponsors-data';

@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class SponsorsPage {
  posts: any;
  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public http: Http) {
    this.http.get('http://localhost:8080/btauction_uk_live2018/wp-json/jrouter/cats').map(res => res.json()).subscribe(data => {
      this.posts = data;
  });
  }
  
  //to get the link to work it has to be inside the scope of the class but in its own function otherwise it loops like crazy
  DeepLinkFunction() {
    this.navCtrl.push('SponsorsPage');
}
// function call for when the view is loaded put your stuff or other function calls in here.
ionViewDidLoad(){

 // this.SponsorsData.getRemoteData();
}

}