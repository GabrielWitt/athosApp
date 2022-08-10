import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { Community } from '../../models/spaces';
import { FirestoreActionsService } from '../firestore-actions.service';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
  CommunityFolder = 'communities';

  constructor(
    private firestore: FirestoreActionsService,
    private error: ErrorHandlerService,
  ) { this.CommunityFolder = 'communities'; }

  createCommunity(data: Community){
    return new Promise((resolve,reject) => {
      this.firestore.createDocument(this.CommunityFolder,data)
      .then(doc => { resolve(doc) })
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

  readCommunityList(){
    return new Promise<Community[]>((resolve,reject) => {
      this.firestore.readCollection(this.CommunityFolder)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

}
