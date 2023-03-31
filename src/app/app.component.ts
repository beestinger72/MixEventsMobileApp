
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Events, MenuController, Nav } from 'ionic-angular';
//jlk declare the pages 
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { ActivityPage } from '../pages/activity/activity';
import { AttendeesPage } from '../pages/attendees/attendees';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { RegisterPage } from '../pages/register/register';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { SponsorsPage } from '../pages/sponsors/sponsors';
import { SupportPage } from '../pages/support/support';
import { TabsPage2 } from '../pages/tabs/tabs';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import {  UserPostsPage } from '../pages/user-posts/user-posts';
import { UsersPage } from '../pages/users/users';
import { HomePage } from '../pages/home/home';
import { PostsCreatePage} from '../pages/posts-create/posts-create';
import { TasksPage } from '../pages/tasks/tasks';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ConferenceData } from '../providers/conference-data';
import { AuthProvider } from '../providers/auth/auth';
import { UserData } from '../providers/user-data';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';
import { RemoteConfigProvider } from '../providers/remote-config/remote-config';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}
export interface User {
  username: string;
  avatar_url:string;
  logsOut?: boolean;
 
} 

@Component({
  templateUrl: 'app.template.html'
})

export class ConferenceApp {

  
  //Jlk Mapping pages
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

 
  public myDate;
  newName: string;
 
  username: string;

  company: string;
  // function you call when u select date
  setDate(){
     this.myDate="2017-12-22";
  }
  Users =[
    {
        avatar_url :'https://www.firstsite.uk/wp-content/uploads/2017/07/The-Boss-Baby-One-Sheet.jpg',
        name :'the name'
    }];
    myUsers = this.Users[0];

    UserProfile = this.auth.getCurrentUser();


  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Schedule', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 0, icon: 'calendar' },
    { title: 'Speakers', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'contacts' },
    { title: 'Map', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
    { title: 'About', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }

  ];
  loggedInPagesInterface: PageInterface[] = [

    { title: 'Activity Stream', name: 'ActivityPage', component: ActivityPage , icon: 'list' },
    { title: 'Messages', name: 'TasksPage', component: TasksPage, icon: 'chatboxes' },
    { title: 'People', name: 'UsersPage', component: UsersPage, icon: 'person' },
    // { title: 'Feed', name: 'UserPostsPage', component: UserPostsPage, icon: 'person-add' },
    // { title: 'Home', name: 'HomePage', component: HomePage, icon: 'home' },
    { title: 'Notes', name: 'TasksPage', component: TasksPage, icon: 'document' },
    { title: 'Sponsors', name: 'SponsorsPage', component: SponsorsPage, icon: 'bowtie' },
  ]
  loggedInPages: PageInterface[] = [

    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ]
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Register', name: 'RegisterPage', component: RegisterPage, icon: 'person-add' },

  ];

  albums: AngularFireObject<any>;
  userdetails: any;
  link: Observable<any>;
  rootPage: any;
  posts: any;
  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public statusBar: StatusBar, 
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public auth: AuthProvider,
    public afs: AngularFirestore,
    public remoteConfig: RemoteConfigProvider,
    private afAuth: AngularFireAuth,
    public afDb : AngularFireDatabase
  ) {

    this.userdetails = afDb.list('/users');

    platform.ready().then(() => {

      auth.getCurrentUser()
        .then(user => { 

          if (user) {
            this.rootPage = TabsPage 
            this.enableMenu(true);
            name
           

          } else {
            this.rootPage = LoginPage
            this.enableMenu(false);
          }

          statusBar.styleDefault();
          splashScreen.hide();

          remoteConfig.initialize()

      })

    });
    this.afAuth.authState.subscribe(auth => {
      if(!auth)
        this.rootPage = LoginPage;
      else
        this.rootPage = AccountPage;
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  
    events.subscribe('user:created', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', user, 'at', time);
    });
    
    // Check if the user has already seen the Event Splash
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = SchedulePage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
      });

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);



    });
    this.enableMenu(true);
 

    this.listenToLoginEvents();
  }
  
 
  ngAfterViewInit() {
  
  }
  updateProfile(user) {
    console.log(this.newName, user)
    const ref = this.afs.collection('users').doc(user.uid)

    return ref.update({ displayName: this.newName })
  }
  openPage(page: PageInterface) {





    
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }


  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }



  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

  
}
