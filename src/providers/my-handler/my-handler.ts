import { Injectable } from '@angular/core';

/*
  Generated class for the MyHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyHandlerProvider {

  sampleValue : string;

  constructor() {
    console.log('Hello MyHandlerProvider Provider');
  }


  setSampleValue(data){
    this.sampleValue = data;

  }

  getSampleValue(){

    return this.sampleValue;
  }
}
