import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';


export interface Post { 
  userId: string;
  createdAt: Date;
  image: string;
  content: string;
  likeCount: number;
  [key: string]: any;
}


export interface Users {
  uid: string;
  displayName: string;
}

export class Item {
  userId: string;
}

@Injectable()
export class DatabaseProvider {

  userId: string;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  private postsRef: AngularFirestoreCollection<Post>;
  private racesCollection: AngularFirestoreCollection<Users>;
  

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private afAuth: AngularFireAuth ) {
    this.postsRef = this.afs.collection('posts');
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })

  }


  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList() {
    // this.itemsRef = this.db.list('messages');
    // // Use snapshotChanges().map() to store the key
    // this.items = this.itemsRef.snapshotChanges().pipe(
    //   map(changes => 
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );

    this.racesCollection = this.afs.collection('users');
    return this.racesCollection.snapshotChanges().map(actions => {       
      return actions.map(a => {
        const data = a.payload.doc.data() as Users;
        data.uid = a.payload.doc.id;
        return data;
      });
    });

  }


  getRecentPosts() {
    return this.afs.collection<Post>('posts', ref =>
      ref.orderBy('createdAt', 'desc').limit(10)
    );
  }

  getUserPosts(userId: string) {
    return this.afs.collection<Post>('posts', ref =>
      ref
        .orderBy('createdAt', 'desc')
        .where('userId', '==', userId)
        .limit(10)
    );
  }

  createPost(userId: string, displayName: string,  data: Post) {
    
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const doc = { userId, createdAt, displayName , ...data  };
    return this.postsRef.add(doc);
  }

  deletePost(id: string) {
    return this.postsRef.doc(id).delete();
  }

  //// HEARTS ////

  createHeart(userId: string, post: Post) {
    const hearts = post.hearts || {};
    hearts[userId] = true;

    return this.afs.doc(`posts/${post.id}`).update({ hearts });
  }

  removeHeart(userId: string, post: Post) {
    const hearts = post.hearts;
    delete post.hearts[userId];

    return this.afs.doc(`posts/${post.id}`).update({ hearts });
  }


 getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
       const unsubscribe = auth.onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
       }, reject);
    });
  }
  //// RELATIONSHIPS ////

  getUsers() {
    return this.afs.collection('users', ref => ref.limit(10)).valueChanges();
  }
  getUsersids() {
  
    //this.db.list('users').valueChanges();
    //seach the database for a single entitie
    //return this.afs.collection('users', ref => ref.where("email", "==", 'user2@test.com')).valueChanges();
  }

 //// OWNER OF POSTS ////
 getOwner (userId: string, uid: string){

  // this.clients$ = this.getCollection('posts');
  //   this.jobs$ = this.getCollection('users');
  //   this.joined = Observable.combineLatest(this.clients$, this.jobs$);
  //   this.joined.subscribe(([clients, jobs]) => {
  //     this.clients = clients;
  //     this.jobs = jobs;
  //   });
  
    const docId = this.concatIds(userId,  uid);
    return this.afs.collection('posts').doc(docId).valueChanges();
  
 // return this.afs.collection('users').valueChanges();

}

// getCollection(collectionName) {
//   return this.afs.collection(`${collectionName}`).valueChanges();
// }

  follow(followerId: string, followedId: string) {
    const docId = this.concatIds(followerId, followedId);
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();

    const data = {
      followerId,
      followedId,
      createdAt
    };

    return this.afs
      .collection('relationships')
      .doc(docId)
      .set(data);
  }

  unfollow(followerId: string, followedId: string) {
    const docId = this.concatIds(followerId, followedId);

    return this.afs
      .collection('relationships')
      .doc(docId)
      .delete();
  }

  isFollowing(followerId: string, followedId: string) {
    const docId = this.concatIds(followerId, followedId);

    return this.afs
      .collection('relationships')
      .doc(docId)
      .valueChanges();
  }

  // Helper to format the docId for relationships
  private concatIds(a: string, b: string) {
    return `${a}_${b}`;
  }



  
}
