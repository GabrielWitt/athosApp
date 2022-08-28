import { Injectable } from '@angular/core';
import { CalendarItem, reservationSlot, serviceSlot } from '../../models/calendar';
import { FirestoreActionsService } from '../firestore-actions.service';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { UserFormData } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  reservationsFolder = 'reservationsCalendar';
  serviceRequestFolder = 'servicesCalendar';

  constructor(
    private firestore: FirestoreActionsService,
    private error: ErrorHandlerService,
    private time: TimeHandlerModule,
  ) { 
    this.reservationsFolder = 'reservationsCalendar';
    this.serviceRequestFolder = 'servicesCalendar';
  }

  confirmReservation(data: CalendarItem){
    return new Promise<reservationSlot>((resolve,reject) => {
      const timeSlot: reservationSlot = {
        uid: data.uid,
        scheduleDate: data.scheduleDate,
        startDate: data.startDate,
        endDate: data.endDate,
        unitNumber: data.reservation.unitNumber,
        spaceUID: data.uid,
        floor: data.reservation.floor,
      }
      this.firestore.setNamedDocument(this.reservationsFolder,data.uid,timeSlot)
      .then((doc:reservationSlot) => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    })
  }

  cancelReservation(data: CalendarItem){
    return new Promise<reservationSlot>((resolve,reject) => {
      this.firestore.deleteDocument(this.reservationsFolder+this.time.getShortDateUTC(data.startDate),data.uid)
      .then((doc:reservationSlot) => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    })
  }

  confirmService(data: CalendarItem, staff: UserFormData){
    return new Promise<reservationSlot>((resolve,reject) => {
      const timeSlot: serviceSlot = {
        uid: data.uid,
        scheduleDate: data.scheduleDate,
        startDate: data.startDate,
        endDate: data.endDate,
        unitNumber: data.service.unitNumber,
        employeeUID: staff.uid,
        employeePhoto: staff.photo,
        employeeFullName: staff.name + ' ' + staff.lastName
      }
      this.firestore.setNamedDocument(this.serviceRequestFolder,data.uid,timeSlot)
      .then((doc:reservationSlot) => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    })
  }

  createCalendar(data: reservationSlot){
    return new Promise((resolve,reject) => {
      this.firestore.createDocument(this.reservationsFolder,data)
      .then(doc => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  UpdateCalendar(data: reservationSlot){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument(this.reservationsFolder, data.uid, data)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readReservationCalendar(){
    return new Promise<reservationSlot[]>((resolve,reject) => {
      this.firestore.readCollection(this.reservationsFolder)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readServicesCalendar(){
    return new Promise<reservationSlot[]>((resolve,reject) => {
      this.firestore.readCollection(this.serviceRequestFolder)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  

}
