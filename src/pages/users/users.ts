import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

 
  searchTerm: string = '';
  searchControl: FormControl;
  users: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public db: DatabaseProvider,
  ) {
    this.searchControl = new FormControl();

  }

  ionViewDidLoad() {
    this.users = this.db.getUsers();

    this.setFilteredItems(this.searchTerm);
 
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

        });

  }
  setFilteredItems(searchTerm) {
 
    this.users = this.db.getUsers();
    //this.items = this.dataService.filterItems(this.searchTerm);
    
}

  trackByFn(index, user) {
    return user.uid; // or item.id
  }


  filterItems(searchTerm){

    //return this.db.getUsers().filter((item) => {
       // return item.users.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
   // });

}
}
