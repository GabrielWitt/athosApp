import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { UserFormData } from '../../models/user';
import { FirestoreActionsService } from '../firestore-actions.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  UsersFolder = 'users';

  constructor(
    private firestore: FirestoreActionsService,
    private error: ErrorHandlerService,
  ) {this.UsersFolder = 'users' }

  createUser(data: UserFormData){
    return new Promise((resolve,reject) => {
      this.firestore.createDocument(this.UsersFolder,data)
      .then(doc => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  updateUser(data: UserFormData){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument(this.UsersFolder, data.uid, data)
      .then(async (response: any) => {  resolve('done'); })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readAllUsers(){
    return new Promise<UserFormData[]>((resolve,reject) => {
      this.firestore.readCollectionOrderBy(this.UsersFolder, 'lastName')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readOnlyResidents(){
    return new Promise<UserFormData[]>((resolve,reject) => {
      this.firestore.readCollectionOrderFilter(this.UsersFolder,'type','residente','name')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readOnlyStaff(){
    return new Promise<UserFormData[]>((resolve,reject) => {
      this.firestore.readCollectionOrderFilter(this.UsersFolder,'type','empleado','name')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readUser(uid: string){
    return new Promise<UserFormData>((resolve,reject) => {
      this.firestore.readDocument(this.UsersFolder,uid)
      .then((doc: UserFormData) => { resolve(doc); })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }
}
