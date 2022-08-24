import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { FirestoreActionsService } from '../firestore-actions.service';
import { CalendarItem } from '../../models/calendar';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  RequestFolder = 'requests';

  constructor(
    private firestore: FirestoreActionsService,
    private error: ErrorHandlerService,
  ) {
    this.RequestFolder = 'requests';
  }

  createRequest(data: CalendarItem){
    return new Promise((resolve,reject) => {
      this.firestore.createDocument(this.RequestFolder, data)
      .then(doc => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  UpdateRequest(data: CalendarItem){
    return new Promise<CalendarItem>((resolve,reject) => {
      this.firestore.setNamedDocument(this.RequestFolder, data.uid, data)
      .then((doc:CalendarItem) => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readRequestList(){
    return new Promise<CalendarItem[]>((resolve,reject) => {
      this.firestore.readCollection(this.RequestFolder)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readRequestListOrder(){
    return new Promise<CalendarItem[]>((resolve,reject) => {
      this.firestore.readCollectionOrderBy(this.RequestFolder, 'unitNumber')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readRequestListOrderRent(filterName: string, filterValue: any,filterOp?){
    return new Promise<CalendarItem[]>((resolve,reject) => {
      this.firestore.readCollectionOrderFilter(this.RequestFolder, filterName, filterValue, 'startDate', filterOp)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }
}
