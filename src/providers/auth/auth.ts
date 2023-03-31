import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
//import { NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import * as firebase from "firebase/app";

import { Observable } from "rxjs/Observable";
import { switchMap, first } from "rxjs/operators";

//import { Facebook } from "@ionic-native/facebook";

import * as Chance from 'chance';

@Injectable()
export class AuthProvider {
  user: Observable<any>;
  firedata = firebase.database().ref('/profile');
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    //private facebook: Facebook,
    private platform: Platform
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      })
    );
  }

  // adduser(newuser) {
  //   return new Promise((resolve, reject) => {
  //     this.afAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
  //       this.afAuth.auth.currentUser.updateProfile({
  //         displayName: newuser.displayName,
  //         photoURL: ''
  //       }).then(() => {
  //         this.firedata.child(this.afAuth.auth.currentUser.uid).set({
  //           uid: this.afAuth.auth.currentUser.uid,
  //           displayName: newuser.displayName,
  //           photoURL: 'https://www.bzl.co/avatar/T-pikachu-1481600098.03.jpg'
  //         }).then(() => {
  //           resolve({ success: true });
  //         }).catch((err) => {
  //           reject(err);
  //         })
  //       }).catch((err) => {
  //         reject(err);
  //       })
  //     }).catch((err) => {
  //       reject(err);
  //     })
  //   });
  // }

  // Save custom user data in Firestore
  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || new Chance().name({ prefix: true }),
      photoURL: user.photoURL || "https://goo.gl/7kz9qG"
    };
    return userRef.set(data, { merge: true });
  }

  //// ANONYMOUS ////

async anonymousLogin(): Promise<void> {
  const user = await this.afAuth.auth.signInAnonymously();
  await this.updateUserData(user);
}

  //// LOGIN MAIN ////

  // async userLogin(user: any): Promise<void> {
  //   const login = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  //   await this.updateUserData(user);
  // }

  async userLogin(user): Promise<any>  {
    try {
     const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
     if (result) {
       //await this.updateUserData(result);
      this.updateUserData(result);
     }
   } catch (e) {
     console.error(e);
   }
}


doRegister(user){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then( res => {
      firebase.database()
     .ref(`/userProfile`)
      .child(res.uid)
    .set({ email: user.email });
     resolve(res);
   }, err => reject(err))
 })
}


  async doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      //this.updateUserData(user)
      .then(res => {
        //this.updateUserData(user);
        resolve(res);
      }, err => reject(err))
    })
   }
 
  
  async userRegister(user) {
    try {
      const result =  this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if (result) {
        //await this.updateUserData(result);
      }
    } catch (e) {
      console.error(e);
    }
  }
  // userLogin(user){
  //   return new Promise<any>((resolve, reject) => {
  //     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  //     .then(res => {
  //       resolve(res);
  //     }, err => reject(err))
  //   })
  //  }
 
  // userRegister(value){
  //   return new Promise<any>((resolve, reject) => {
  //     const user =  this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
  //     this.updateUserData(user);
  //     .then( res => {
  //      // firebase
  //      // .database()
  //      // .ref('/userProfile')
  //      // .child(res.uid)
  //      // .set({ email: value.email });
  //      this.updateUserData(value.email);
  //      resolve(res);
  //    }, err => reject(err))
  //  })
  // }
  
  async register(user) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        this.updateUserData(result)
      }
    } catch (e) {
      console.error(e);
    }
  }

  //// HELPERS ////

  async logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  // Current user as a Promise. Useful for one-off operations.
  async getCurrentUser(): Promise<any> {
    return this.user.pipe(first()).toPromise();
  }

  // Current user as boolean Promise. Used in router guards
  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}
