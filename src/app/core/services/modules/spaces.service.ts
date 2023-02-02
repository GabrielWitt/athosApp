import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { Community, Space } from '../../models/spaces';
import { FirestoreActionsService } from '../firestore-actions.service';

@Injectable({
  providedIn: 'root'
})
export class SpacesService {
  SpacesFolder = 'spaces';
  CommunityFolder = 'communities';

  constructor(
    private firestore: FirestoreActionsService,
    private error: ErrorHandlerService,
  ) {
    this.SpacesFolder = 'spaces';
    this.CommunityFolder = 'communities';
  }

  readCommunityList(){
    return new Promise<Community[]>((resolve,reject) => {
      this.firestore.readCollection(this.CommunityFolder)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  UpdateCommunity(data: Community){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument(this.CommunityFolder, data.uid, data)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  createSpaces(data: Space){
    return new Promise((resolve,reject) => {
      this.firestore.createDocument(this.SpacesFolder,data)
      .then(doc => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  UpdateSpaces(data: Space){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument(this.SpacesFolder, data.uid, data)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readSpacesList(){
    return new Promise<Space[]>((resolve,reject) => {
      this.firestore.readCollection(this.SpacesFolder)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readSpace(uid){
    return new Promise<Space>((resolve,reject) => {
      this.firestore.readDocument(this.SpacesFolder,uid)
      .then((docs: Space) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readSpacesListOrder(){
    return new Promise<Space[]>((resolve,reject) => {
      this.firestore.readCollectionOrderBy(this.SpacesFolder, 'type')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readSpacesListOrderType(type){
    return new Promise<Space[]>((resolve,reject) => {
      this.firestore.readCollectionOrderFilter(this.SpacesFolder, 'type', type, 'unitNumber')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readSpacesListOrderRent(filterName: string, filterValue: any){
    return new Promise<Space[]>((resolve,reject) => {
      this.firestore.readCollectionOrderFilter(this.SpacesFolder, filterName, filterValue, 'unitNumber')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }
}