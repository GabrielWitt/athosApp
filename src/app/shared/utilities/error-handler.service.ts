import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handle(error){
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
    return errorCode;
  }
}
