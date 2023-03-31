import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SponsorsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SponsorsDataProvider {
  data1: any;
  constructor(public http: Http) {
   
  }
  //get data from the observerable in console.
  // getRemoteData(){
  //   console.log(this.http.get('http://localhost:8080/mix_cms_newdemo/advanced/api/web/sponsors'));
  // }

    // getRemoteData(){
  //   console.log(this.http.get('http://localhost:8080/mix_cms_newdemo/advanced/api/web/sponsors'));
  // }
  load() {
    if (this.data1) {
      return Promise.resolve(this.data1);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get('http://localhost:8080/btauction_uk_live2018/wp-json/jrouter/cats')
        .map(res => res.json())
        .subscribe(data => {
          this.data1 = data.results;
          resolve(this.data1);
        });
    });
  }  



}
