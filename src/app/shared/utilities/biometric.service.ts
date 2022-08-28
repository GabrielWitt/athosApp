import { Injectable } from '@angular/core';

declare var Fingerprint: any;

@Injectable({
  providedIn: 'root'
})
export class BiometricService {

  constructor() { }

  isAvailable(){
    return new Promise((response,reject) => {
      Fingerprint.isAvailable(isAvailableSuccess, isAvailableError, true);

      function isAvailableSuccess(result) {
        console.log(result);
        response(result);
      }
  
      function isAvailableError(error) {
        // 'error' will be an object with an error code and message
        reject(error.message);
      }
    });
  }

  show(description){
    return new Promise((response,reject) => {
      Fingerprint.show({ description }, successCallback, errorCallback);
  
      function successCallback(){
        response(true);
      }
  
      function errorCallback(error){
        console.log(error.message);
        response(false)
      }
    });
  }
}
