// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';

// /**
//  * Generated class for the AttendeesPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @Component({
//   selector: 'page-attendees',
//   templateUrl: 'attendees.html',
// })
// export class AttendeesPage {

//   constructor(public navCtrl: NavController) {
//   }


//   ionViewDidLoad() {
//     console.log('ionViewDidLoad AttendeesPage');
//   }
//   //to get the link to work it has to be inside the scope of the class but in its own function otherwise it loops like crazy
//   DeepLinkFunction() {
//     this.navCtrl.push('AttendeesPage');
// }
// }
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AttendeeDataProvider } from '../../providers/attendee-data/attendee-data';
@Component({
  selector: 'page-attendees',
    templateUrl: 'attendees.html',
    providers: [AttendeeDataProvider]
})
export class AttendeesPage {
  public people: any;
  constructor(public navCtrl: NavController,public peopleSearch: AttendeeDataProvider) {
         this.loadPeople();
  
  }
  //to get the link to work it has to be inside the scope of the class but in its own function otherwise it loops like crazy
  DeepLinkFunction() {
    this.navCtrl.push('AttendeesPage');
}
// function call for when the view is loaded put your stuff or other function calls in here.
ionViewDidLoad(){

 // this.SponsorsData.getRemoteData();
}

loadPeople() {
  this.peopleSearch.load()
    .then(data1 => { 
      this.people = data1;
    });
}

}
