import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../core/auth.service';
import { AuthProvider } from '../../providers/auth/auth';
import { UserPage } from '../user/user';
import { NgForm } from '@angular/forms';
import { TabsPage } from '../tabs-page/tabs-page';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { AccountPage } from '../account/account';
//import { AuthProvider2 } from '../../providers/authentication/authentication';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };
 login: UserOptions = { email: '', password: ''};
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    public auths : AuthProvider,
    private formBuilder: FormBuilder,
    public afireauth: AngularFireAuth
  ) {}

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryRegister(login){
    this.auths.register(login)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in.";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
  
  user = firebase.auth().currentUser;

  adduser(login) {
    return new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(login.email, login.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: login.displayName,
          photoURL: ''
        }).then(() => {
      
          this.user.updateProfile({
            displayName: "Jane Q. User",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });

        })
      }).catch((err) => {
        reject(err);
      })
    });
  }

  
  goLoginPage(){
    this.navCtrl.pop();
  }

}