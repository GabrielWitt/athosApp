import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { Notice } from '../../models/notice';
import { UserFormData } from '../../models/user';
import { FirestoreActionsService } from '../firestore-actions.service';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  noticeFolder = 'notices';

  constructor(
    private firestore: FirestoreActionsService,
    private error: ErrorHandlerService,
  ) { }

  getNoticeType(){
    return [
      {icon: 'information-circle-outline', name: 'INFORMACIÓN' },
      {icon: 'hammer-outline', name: 'REPARACIONES' },
      {icon: 'calendar-outline', name: 'EVENTOS' },
    ];
  }

  createNotice(data: Notice){
    return new Promise((resolve,reject) => {
      this.firestore.createDocument(this.noticeFolder,data)
      .then(doc => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  UpdateNotice(data: Notice){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument(this.noticeFolder, data.uid, data)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readNoticeList(){
    return new Promise<Notice[]>((resolve,reject) => {
      this.firestore.readCollectionOrderBy(this.noticeFolder,'createdAt')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  addComment(NoticeUID:string, comments: Comment[]){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument(this.noticeFolder, NoticeUID, {comments})
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  addLike(NoticeUID:string, likes: string[]){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument(this.noticeFolder, NoticeUID, {likes})
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }
}
