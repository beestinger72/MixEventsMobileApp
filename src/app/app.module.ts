
//Core Providers
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Brightness } from '@ionic-native/brightness';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { PopoverPage } from '../pages/about-popover/about-popover';
//Jlk Mapping pages
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { ActivityPage } from '../pages/activity/activity';
import { AttendeesPage } from '../pages/attendees/attendees';
import { CreatepostPage } from '../pages/createpost/createpost';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MapPage } from '../pages/map/map';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SchedulePage } from '../pages/schedule/schedule';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
//import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { SponsorsPage } from '../pages/sponsors/sponsors';
import { SupportPage } from '../pages/support/support';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TabsPage2 } from '../pages/tabs/tabs';
import { UsersPage } from '../pages/users/users';
import { TasksPage } from '../pages/tasks/tasks';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ApiProvider } from '../providers/api/api';
import { AttendeeDataProvider } from '../providers/attendee-data/attendee-data';
import { NotificationsPage } from './../pages/notifications/notifications';
import { SettingsPage } from './../pages/settings/settings';
import {  UserPostsPage } from '../pages/user-posts/user-posts';
import {  HomePage } from '../pages/home/home';
import { PostsCreatePage} from '../pages/posts-create/posts-create';

//Jlk Data json and external url Providers
import { ConferenceData } from '../providers/conference-data';
import { MyHandlerProvider } from '../providers/my-handler/my-handler';
import { SponsorsDataProvider } from '../providers/sponsors-data/sponsors-data';
import { UserData } from '../providers/user-data';
import { ConferenceApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';

//import { Facebook } from '@ionic-native/facebook';
//import { GooglePlus } from '@ionic-native/google-plus';
//import { TwitterConnect } from '@ionic-native/twitter-connect';


import 'firebase/auth';
import 'firebase/firestore';

import * as firebase from 'firebase';


// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
//import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';


//you are using both firebase core and angularFire may need to look into as your intializing data twice need to see what method works best
import { AuthService } from '../pages/core/auth.service';
import { UserService } from '../pages/core/user.service';
//import { environment } from '../environment/environment';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyCFwbrrphgxNkwn_oCUlvXY_1eidwI1w64",
    authDomain: "crud-31416.firebaseapp.com",
    databaseURL: "https://crud-31416.firebaseio.com",
    projectId: "crud-31416",
    storageBucket: "crud-31416.appspot.com",
    messagingSenderId: "656112155737"
  
 };
 import { AuthProvider2 } from '../providers/authentication/authentication';
 import { AuthProvider } from '../providers/auth/auth';
 

 import { Firebase } from '@ionic-native/firebase';
 //import { Facebook } from '@ionic-native/facebook';
 import { Camera } from '@ionic-native/camera';
 import { AdMobFree } from '@ionic-native/admob-free';
 
 
 //import { ComponentsModule } from '../components/components.module'
 //import { DatabaseProvider } from '../providers/database/database';
 //import { FcmProvider } from '../providers/fcm/fcm';
 //import { AnalyticsProvider } from '../providers/analytics/analytics';
 //import { RemoteConfigProvider } from '../providers/remote-config/remote-config';


 import { ComponentsModule } from '../components/components.module'
 import { DatabaseProvider } from '../providers/database/database';
 import { FcmProvider } from '../providers/fcm/fcm';
 import { AnalyticsProvider } from '../providers/analytics/analytics';
 import { RemoteConfigProvider } from '../providers/remote-config/remote-config';
//import { ChatProvider } from '../providers/chat/chat';


firebase.initializeApp(firebaseConfig);


    // firebase.auth().onAuthStateChanged((user) => {
  
    //     if (!user) {
    //         console.log("not login");
    //         this.rootPage = Login;
  
  
    //     } else {
    //         console.log("login");
    //         this.rootPage = HomePage;
  
    //     }
  
    // });
  

//firebase.initializeApp(config);
//Jlk Data json Database Providers


//import { credentials } from '../environment/environment';

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SponsorsPage,
    RegisterPage,
    SpeakerDetailPage,
    SpeakerListPage,
    CreatepostPage,
    TabsPage,
    TutorialPage,
    TasksPage,
    DashboardPage,
    SupportPage,
    AttendeesPage,
    ActivityPage,
    NotificationsPage,
    SettingsPage,
    UsersPage,
    HomePage,
    UserPostsPage,
    TabsPage2,
    PostsCreatePage,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
   AngularFireStorageModule,
   ComponentsModule,
   // ComponentsModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: CreatepostPage, name: 'CreatepostPage', segment: 'createpost' },
        { component: PostsCreatePage, name: 'PostsCreatePage', segment: 'postscreate' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: SponsorsPage, name: 'SponsorsPage', segment: 'sponsors' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: NotificationsPage, name: 'Notifications', segment: 'notifications' },
        { component: SettingsPage, name: 'Settings', segment: 'settings' },
        { component: AttendeesPage, name: 'AttendeesPage', segment: 'attendees' },
        { component: ActivityPage, name: 'ActivityPage', segment: 'activity' },
        { component: TasksPage, name: 'TasksPage', segment: 'tasks' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: DashboardPage, name: 'Dashboard', segment: 'dashboard' },
       { component: RegisterPage, name: 'RegisterPage', segment: 'register' },
       { component: UsersPage, name: 'UsersPage', segment: 'users' },
       { component: UserPostsPage, name: 'UserPostsPage', segment: 'posts' },
       { component: HomePage, name: 'HomePage', segment: 'home' },
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SponsorsPage,
    AttendeesPage,
    RegisterPage,
    SpeakerDetailPage,
    SpeakerListPage,
    CreatepostPage,
    TabsPage,
    TutorialPage,
    TasksPage,
    DashboardPage,
    SupportPage,
    ActivityPage,
    NotificationsPage,
    SettingsPage,
    UsersPage,
    UserPostsPage,
    TabsPage2,
    HomePage,
    PostsCreatePage
    ],
  providers: [
    ConferenceData,
    StatusBar,
    UserData,
    Brightness,
    InAppBrowser,
    SplashScreen,
    MyHandlerProvider,
    SponsorsDataProvider,
    AttendeeDataProvider,
    ApiProvider,
   // GooglePlus,
    AuthService,
    //TwitterConnect,
    UserService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    AuthProvider2,
    AngularFireAuth,
    AngularFireAuthModule,
    Firebase,
    //Facebook,
    Camera,
    AdMobFree,
    FcmProvider ,
    DatabaseProvider,
    AnalyticsProvider,
    RemoteConfigProvider,

  ]
})
export class AppModule {
  
  
}
