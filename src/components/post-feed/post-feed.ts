import { Component, OnInit, Input } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'post-feed',
  templateUrl: 'post-feed.html'
})
export class PostFeedComponent implements OnInit {


  @Input() 
  
  userId: string;  
  uid: string;
  posts: Observable<any[]>;
  profiles: Observable<any[]>;

  constructor(private db: DatabaseProvider, public auth: AuthProvider,  public afDb : AngularFireDatabase,) { }

  ngOnInit() {

    this.posts = this.db.getRecentPosts().snapshotChanges().pipe(
      map(arr => arr.map(doc => {
        return { id: doc.payload.doc.id, ...doc.payload.doc.data() }
      }))
    )
    this.profiles = this.db.getItemsList();
  }

  
  trackByFn(index, post) {
    return post.id;
  }

}
