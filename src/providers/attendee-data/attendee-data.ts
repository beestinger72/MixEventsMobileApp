import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the AttendeeDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AttendeeDataProvider {

  data1: any;
  constructor(public http: Http) {
    console.log('Hello PeopleSearch Provider');

//   getRemoteData(){
//     this.http.get('http://localhost:8080/mix_cms_newdemo/advanced/api/web/sponsors').subscribe(data => {
//       //handler
//       console.log(data);
// 


}
load() {
  if (this.data1) {
    return Promise.resolve(this.data1);
  }
  // Dont have the data yet
  return new Promise(resolve => {
    this.http.get('https://randomuser.me/api/?results=10')
      .map(res => res.json())
      .subscribe(data => {
        this.data1 = data.results;
        resolve(this.data1);
      });
  });
}  

}
