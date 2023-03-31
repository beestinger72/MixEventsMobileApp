import { Component } from '@angular/core';
import { ModalController, NavController,ToastController, NavParams } from 'ionic-angular';
import { ReactionsPage } from '../../pages/reactions/reactions';
import { PopoverController } from 'ionic-angular';
//import { CreatepostPage } from '../createpost/createpost';
//import {Storage} from '@ionic/storage';
import { PostsCreatePage } from '../posts-create/posts-create';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import { AuthProvider } from '../../providers/auth/auth';

//import { AuthProvider } from '../../providers/auth/auth';
import 'firebase/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {


  // cards = [
  //   {
  //     avatarImageUrl: 'assets/img/avatar/marty-avatar.png',
  //     postImageUrl: 'assets/img/card/advance-card-bttf.png',
  //     name: 'Marty Mcfly',
  //     postText: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
  //     date: 'November 5, 1955',
  //     likes: 12,
  //     comments: 4,
  //     timestamp: '11h ago'
  //   },
  //   {
  //     avatarImageUrl: 'assets/img/avatar/sarah-avatar.jpg',
  //     postImageUrl: 'assets/img/card/advance-card-tmntr.jpg',
  //     name: 'Sarah Connor',
  //     postText: 'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.',
  //     date: 'May 12, 1984',
  //     likes: 30,
  //     comments: 64,
  //     timestamp: '30yr ago'
  //   },
  //   {
  //     avatarImageUrl: 'assets/img/avatar/ian-avatar.png',
  //     postImageUrl: 'assets/img/card/advance-card-jp.jpg',
  //     name: 'Dr. Ian Malcolm',
  //     postText: 'Your scientists were so preoccupied with whether or not they could, that they didn\'t stop to think if they should.',
  //     date: 'June 28, 1990',
  //     likes: 46,
  //     comments: 66,
  //     timestamp: '2d ago'
  //   },
  // ];
  posts: any;
  private db: any;
  model: any = {};
  isEditing: boolean = false;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams, 
     private popoverCtrl: PopoverController,
     public modalCtrl: ModalController,
     public toastCtrl: ToastController,
     public auth: AuthProvider
    // private storage: Storage
    
    ) {
 
 
    this.db = firebase.firestore();
    this.loadData();
    //this.cards = new Array(10);
  
  }
  loadData(){
    this.getAllDocuments("posts").then((e)=>{
      this.posts = e;
  });
  }


  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }
  doRefresh(refresher) {
  
      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Posts have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
   
  }


  goToSomethingElse() {

    this.navCtrl.push(PostsCreatePage);
}

addMessage(){
    if(!this.isEditing){
    this.addDocument("posts", this.model).then(()=>{
      this.loadData();//refresh view
    });
  }else{
    this.updateDocument("posts", this.model.$key, this.model).then(()=>{
      this.loadData();//refresh view
    });
  }
  this.isEditing = false;
  //clear form
  this.model.title = '';
  this.model.text = '';
}

updateMessage(obj){
  this.model = obj;
  this.isEditing = true;
}

deleteMessage(key){
  this.deleteDocument("posts", key).then(()=>{
    this.loadData();//refresh view
    this.isEditing = false;
  });
}



  // imageTapped(card) {
  //   alert(card.name + ' image was tapped.');
  // }

  like(posts) {
    alert(posts.name + ' was liked.');
  }

  comment(posts) {
    alert('Commenting to ' + posts.name);
  }

  avatarTapped(posts) {
    alert(posts.name + ' avatar was tapped.');
  }

  //to get the link to work it has to be inside the scope of the class but in its own function otherwise it loops like crazy
  DeepLinkFunction() {
    this.navCtrl.push('AttendeesPage');
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }


  showReactions(ev){
 
    let reactions = this.popoverCtrl.create(ReactionsPage);

    reactions.present({
        ev: ev
    });

}

//CRUD operation methods------------------------------------------------------------------------------------------

getAllDocuments(collection: string): Promise<any> {
  return new Promise((resolve, reject) => {
      this.db.collection(collection)
          .get()
          .then((querySnapshot) => {
              let arr = [];
              querySnapshot.forEach(function (doc) {
                  var obj = JSON.parse(JSON.stringify(doc.data()));
                  obj.$key = doc.id
                  console.log(obj)
                  arr.push(obj);
              });

              if (arr.length > 0) {
                  console.log("Document data:", arr);
                  resolve(arr);
              } else {
                  console.log("No such document!");
                  resolve(null);
              }


          })
          .catch((error: any) => {
              reject(error);
          });
  });
}

deleteDocument(collectionName: string, docID: string): Promise<any> {
return new Promise((resolve, reject) => {
    this.db
        .collection(collectionName)
        .doc(docID)
        .delete()
        .then((obj: any) => {
            resolve(obj);
        })
        .catch((error: any) => {
            reject(error);
        });
});
}

addDocument(collectionName: string, dataObj: any): Promise<any> {
return new Promise((resolve, reject) => {
    this.db.collection(collectionName).add(dataObj)
        .then((obj: any) => {
            resolve(obj);
        })
        .catch((error: any) => {
            reject(error);
        });
});
}

updateDocument(collectionName: string, docID: string, dataObj: any): Promise<any> {
return new Promise((resolve, reject) => {
    this.db
        .collection(collectionName)
        .doc(docID)
        .update(dataObj)
        .then((obj: any) => {
            resolve(obj);
        })
        .catch((error: any) => {
            reject(error);
        });
});
}
// to go account page
goToAccount() {
  this.navCtrl.push(SettingsPage);
}

presentNotifications(myEvent) {
  console.log(myEvent);
  let popover = this.popoverCtrl.create(NotificationsPage);
  popover.present({
    ev: myEvent
  });
}


}

