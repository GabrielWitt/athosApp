import { Injectable } from '@angular/core';
import { CalendarItem, reservationSlot } from '../../models/calendar';
import { FirestoreActionsService } from '../firestore-actions.service';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendarFolder = 'calendar/reservations/';

  constructor(
    private firestore: FirestoreActionsService,
    private error: ErrorHandlerService,
    private time: TimeHandlerModule,
  ) { this.calendarFolder = 'calendar/reservations/'; }

  confirmReservation(data: CalendarItem){
    return new Promise<reservationSlot>((resolve,reject) => {
      const timeSlot: reservationSlot = {
        reservationUID: data.uid,
        scheduleDate: data.scheduleDate,
        startDate: data.startDate,
        endDate: data.endDate,
        unitNumber: data.reservation.unitNumber,
        spaceUID: data.uid,
        floor: data.reservation.floor,
      }
      this.firestore.createDocument(this.calendarFolder+this.time.getShortDateUTC(data.startDate),timeSlot)
      .then((doc:reservationSlot) => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    })
  }

  createCalendar(data: reservationSlot){
    return new Promise((resolve,reject) => {
      this.firestore.createDocument(this.calendarFolder,data)
      .then(doc => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  UpdateCalendar(data: reservationSlot){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument(this.calendarFolder, data.uid, data)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readCalendarList(){
    return new Promise<reservationSlot[]>((resolve,reject) => {
      this.firestore.readCollection(this.calendarFolder)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  

}
