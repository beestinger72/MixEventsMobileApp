import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider, Post } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@IonicPage()
@Component({
  selector: 'page-posts-create',
  templateUrl: 'posts-create.html',
})
export class PostsCreatePage {

  post: Partial<Post> = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: DatabaseProvider,
    public auth: AuthProvider,
    public analytics: AnalyticsProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsCreatePage');
  }

  async create(user) {
    await this.db.createPost(user.uid, user.displayName, this.post as Post)
    await this.analytics.logEvent('create_post', {})
    this.post = {}
    await this.navCtrl.setRoot('ActivityPage')
  }

  updateURL(e) {
    this.post.img = e;
  }

}
