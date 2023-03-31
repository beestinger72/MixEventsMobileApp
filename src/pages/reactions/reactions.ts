import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
 
@IonicPage()
@Component({
  selector: 'page-reactions',
  templateUrl: 'reactions.html',
})
export class ReactionsPage {
 
    constructor( private viewCtrl: ViewController) {
 
    }
 
    ionViewDidLoad() {
        console.log('ionViewDidLoad ReactionsPage');
    }
 
    share(){
        this.viewCtrl.dismiss();
    }
 
}