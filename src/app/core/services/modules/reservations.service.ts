import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { FirestoreActionsService } from '../firestore-actions.service';
import { CalendarItem, HistoryRecord, reservationSlot } from '../../models/calendar';
import { serverTimestamp } from "firebase/firestore";
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { UserFormData } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  ReservationsFolder = 'reservations';

  constructor(
    private firestore: FirestoreActionsService,
    private time: TimeHandlerModule,
    private error: ErrorHandlerService,
  ) {
    this.ReservationsFolder = 'reservations';
  }

  createReservations(data: CalendarItem){
    return new Promise((resolve,reject) => {
      this.firestore.createDocument(this.ReservationsFolder, data)
      .then(doc => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  UpdateReservations(data: CalendarItem, user: UserFormData){
    return new Promise<CalendarItem>((resolve,reject) => {
      if(!data.history){ data.history = []; }
      const newItem: HistoryRecord = {
        updateAt: this.time.dateTransform(serverTimestamp()),
        updateByUID: user.uid,
        updateByName: user.name + ' ' + user.lastName,
        status: data.status
      }
      data.history.push(newItem);
      this.firestore.setNamedDocument(this.ReservationsFolder, data.uid, data)
      .then((doc:CalendarItem) => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readReservationsList(){
    return new Promise<CalendarItem[]>((resolve,reject) => {
      this.firestore.readCollection(this.ReservationsFolder)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readReservationsListOrder(){
    return new Promise<CalendarItem[]>((resolve,reject) => {
      this.firestore.readCollectionOrderBy(this.ReservationsFolder, 'unitNumber')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readReservationsListOrderRent(filterName: string, filterValue: any,filterOp?){
    return new Promise<CalendarItem[]>((resolve,reject) => {
      this.firestore.readCollectionOrderFilter(this.ReservationsFolder, filterName, filterValue, 'startDate', filterOp)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readUserReservationsListOrderRent(filterName: string, filterValue: any, userUID:string, filterOp?){
    return new Promise<CalendarItem[]>((resolve,reject) => {
      this.firestore.readUserCollectionOrderFilter(this.ReservationsFolder, filterName, filterValue, 'startDate', userUID, filterOp)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }
}
