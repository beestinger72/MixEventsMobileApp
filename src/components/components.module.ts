import { NgModule } from '@angular/core';

import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

//import { FacebookLoginComponent } from './facebook-login/facebook-login';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login';
import { UserLogoutComponent } from './user-logout/user-logout';
import { PostFeedComponent } from './post-feed/post-feed';
import { HeartButtonComponent } from './heart-button/heart-button';
import { UserRelationshipComponent } from './user-relationship/user-relationship';
import { ImageUploadComponent, UploadModal } from './image-upload/image-upload';
import { FcmHandlerComponent } from './fcm-handler/fcm-handler';
import { FcmTopicComponent } from './fcm-topic/fcm-topic';
//import { UserLoginComponent } from './user-login/user-login';


@NgModule({
    declarations: [
      //  FacebookLoginComponent,
      //  FacebookLoginComponent,
        AnonymousLoginComponent,
        UserLogoutComponent,
        PostFeedComponent,
        HeartButtonComponent,
        UserRelationshipComponent,
        ImageUploadComponent,
        UploadModal,
    FcmHandlerComponent,
    FcmTopicComponent,
   // UserLoginComponent,
        
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        //FacebookLoginComponent,
       // FacebookLoginComponent,
        AnonymousLoginComponent,
        UserLogoutComponent,
        PostFeedComponent,
        HeartButtonComponent,
        UserRelationshipComponent,
        ImageUploadComponent,
        UploadModal,
    FcmHandlerComponent,
    FcmTopicComponent,
    //UserLoginComponent,
        
    ],
    entryComponents: [
        UploadModal
    ]
})
export class ComponentsModule { }
