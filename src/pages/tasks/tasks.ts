import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Brightness } from '@ionic-native/brightness';
import { DashboardPage } from '../dashboard/dashboard';
import { MyHandlerProvider } from '../../providers/my-handler/my-handler';

@Component({
  selector: 'page-user',
  templateUrl: 'tasks.html'
})
export class TasksPage {


returnMessage;
isReturn = false;


// brightness controller
 bright = 0;
  //modal: any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public brightness : Brightness, public alerCtrl: AlertController, public myHandler:MyHandlerProvider) {
    this.bright = 0;
    this.returnMessage = "";
   }

   setBrightScreen(param){

 this.bright = param;
 console.log("the brightness Value is = " + this.bright);
 console.log(this.bright);
 this.brightness.setBrightness;
   }

   // popup control
 
   doConfirm() {
     let confirm = this.alerCtrl.create({
       title: 'Test Confirmation box',
       message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
       buttons: [
         {
           text: 'Disagree',
           handler: () => {
             console.log('Disagree clicked');
           }
         },
         {
           text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
           }
         }
       ]
     });
   
    confirm.present();
  }

  //function call for message button
  showSimpleload(message){

    let data = 
    { 
      TextMessage: message
    };
 
     this.navCtrl.push(DashboardPage, data);
    
  }
  showModalload(message){


    let data = 
    { 
      TextMessage: message
    };
 
   let modalCtl =  this.modalCtrl.create(DashboardPage, data);

//receiver from the dashboard page with returned data like a two ways switch
     modalCtl.onDidDismiss(data =>{
       //setting the conditaional ngIf to true so if its anything thats not false the data will display on the page.
       this.isReturn = true;
    this.returnMessage = data.returnMessage;
    console.log("received" + data.returnMessage)

  });



   modalCtl.present();
    
  }
  goToSomethingElse() {

    let payload = {
    
    horizon:'hello',
    wake:'josh'
    }
    this.navCtrl.push(DashboardPage, payload);
}


showPage(msg){

  this.myHandler.setSampleValue(msg);
  this.navCtrl.push(DashboardPage);
}


}

  

