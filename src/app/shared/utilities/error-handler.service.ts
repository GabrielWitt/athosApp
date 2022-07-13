import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handle(error){
    console.log(error);
    const errorCode = error.code;
    const message = errorCode.split('/')[1].replaceAll("-", " ");
    switch(message){
      case 'user not found':
        return 'Usuario no encontrado';
      case 'wrong-password':
        return 'Usuario o contraseña erroneo';
      case 'email already in use':
        return 'Usuario ya posee una cuenta';
      default: 
      return message;
    }
  }
}
