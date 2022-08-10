import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { userFormData } from '../../models/user';
import { FirestoreActionsService } from '../firestore-actions.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore: FirestoreActionsService,
    private error: ErrorHandlerService,
  ) { }

  readAllUsers(){
    return new Promise<userFormData[]>((resolve,reject) => {
      this.firestore.readCollection('users')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readUser(UserUID:string){
    return new Promise<userFormData>((resolve,reject) => {
      this.firestore.readDocument('users',UserUID)
      .then((docs: any) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  upgradeUser(uid: string){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument('users', uid, {manager: true})
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }
}
