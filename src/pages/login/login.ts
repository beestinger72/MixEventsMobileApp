import { Component } from '@angular/core';
import { NavController , ToastController} from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { ActivityPage } from '../activity/activity';
import { AuthService } from '../core/auth.service';
import { AuthProvider } from '../../providers/auth/auth';
import { AuthProvider2 } from '../../providers/authentication/authentication';
//import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserData } from '../../providers/user-data';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginData = {
    email: '',
    password: ''
  }
  //login: UserOptions = { email: '', fullname: ''};
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public auth: AuthProvider, 
    public auths : AuthProvider2,
    private afAuth: AngularFireAuth, private toastCtrl: ToastController,
    public userData: UserData,

    //public userData: UserData
  ) {}

  ionViewWillLoad(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
    .then(auth => {
      // Do custom things with auth
      let data = this.userData.login(this.loginData.email, this.loginData.password);
      this.navCtrl.push(ActivityPage, data);

      
    })
    .catch(err => {
      // Handle error
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000
      });
      toast.present();
    });
  }
  signup() {
    this.navCtrl.push(RegisterPage, { email: this.loginData.email });
  }

}
