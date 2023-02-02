import { Injectable } from '@angular/core';
import { ItemDetail, Receipt } from '../../models/billis';
import { FirestoreActionsService } from '../firestore-actions.service';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { UserFormData } from '../../models/user';
import { CalendarItem, HistoryRecord } from '../../models/calendar';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { CalendarService } from './calendar.service';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';
import { serverTimestamp } from 'firebase/firestore';
import { ReservationsService } from './reservations.service';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  ReceiptFolder = 'billing';

  constructor(
    private firestore: FirestoreActionsService,
    private error: ErrorHandlerService,
    private time: TimeHandlerModule,
    private calendar: CalendarService,
    private reservation: ReservationsService,
    private services: RequestsService,
    private utility: VerificationFuncService
  ) { this.ReceiptFolder = 'billing'; }

  createReceipt(data: Receipt){
    return new Promise((resolve,reject) => {
      this.firestore.createDocument(this.ReceiptFolder,data)
      .then(doc => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  UpdateReceipt(data: Receipt){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument(this.ReceiptFolder, data.uid, data)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readAllReceiptList(){
    return new Promise<Receipt[]>((resolve,reject) => {
      this.firestore.readCollectionOrderBy(this.ReceiptFolder,'receiptDate')
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readMonthReceiptList(startMonth:string, endMonth:string){
    return new Promise<Receipt[]>((resolve,reject) => {
      this.firestore.readReceiptsByMonth(this.ReceiptFolder,startMonth,endMonth)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  changeReceiptStatus(data: Receipt, status: string, currentUser:UserFormData){
    return new Promise<Receipt>(async (resolve,reject) => {
      try {  
        if(!data.history){ data.history = []; }
        const newItem: HistoryRecord = {
          updateAt: this.time.dateTransform(serverTimestamp()),
          updateByUID: currentUser.uid,
          updateByName: currentUser.name + ' ' + currentUser.lastName,
          status: status
        }
        data.history.push(newItem);
        await this.UpdateReceipt(data);
        resolve(data)
      } catch (error) {
        console.log(error);
        reject('error')
      }
    })
  }

  generateReceipt(receiptNumber:number,receiptDate:string, user:UserFormData,currentUser:UserFormData,request: CalendarItem[], reservation: CalendarItem[]){
    return new Promise<Receipt>(async (resolve,reject) => {
      try {
        let myReceipt: Receipt = {
          receiptDate: receiptDate,
          ruc: '1791430751001',
          receiptNumber: receiptNumber,
          userUID: user.uid,
          userName: user.name + ' ' + user.lastName,
          userCI: user.CI,
          address: 'Av. Rep. del Salvador 734 y Av. Portugal'+' '+user.leases[0].spaceLease.description,
          itemDetail: [],
          total: 0,
          status:'Pendiente',
          userSignature: '',
          createdBy: await this.utility.createShortUser(currentUser)
        }

        const dates = this.time.getMonthDates(receiptDate);
        const reservations = await this.reservation.readUserReservationsByMonth(dates.start,dates.end,'startDate',user.uid);
        const services = await this.services.readUserServicesByMonth(dates.start,dates.end,'scheduleDate',user.uid);
        
        // Leases
        user.leases.forEach(lease => {
          const subtotal = parseFloat(lease.monthlyCost.toFixed(2));
          const leaseItem:ItemDetail = {
            itemDescription: lease.spaceLease.description,
            numberItems: '1',
            unitValue: ''+lease.monthlyCost.toFixed(2),
            totalValue: ''+lease.monthlyCost.toFixed(2)
          }
          myReceipt.itemDetail.push(leaseItem);
          myReceipt.total = myReceipt.total + subtotal;
        })

        // Reservation
        reservations.forEach(reserve => {
          if(reserve.status === 'Aprobado'){
            const subtotal = parseFloat(''+reserve.reservation.price).toFixed(2);
            const leaseItem:ItemDetail = {
              itemDescription: reserve.reservation.unitNumber + ' ' + this.time.timeSchedule(reserve.startDate),
              numberItems: '1',
              unitValue: subtotal,
              totalValue: subtotal
            }
            myReceipt.itemDetail.push(leaseItem);
            myReceipt.total = myReceipt.total + parseFloat(subtotal);
          }
        })

        // Services
        services.forEach(service => {
          if(service.status === 'Terminado'){
            const subtotal = service.service.maintenance ? '0' : parseFloat(''+service.service.cost).toFixed(2);
            const leaseItem: ItemDetail = {
              itemDescription: service.service.name + ' ' + this.time.timeSchedule(service.updatedAt),
              numberItems: '1',
              unitValue: subtotal,
              totalValue: subtotal
            }
            myReceipt.itemDetail.push(leaseItem);
            myReceipt.total = myReceipt.total + parseFloat(subtotal);
          }
        })
        myReceipt.total = parseFloat(myReceipt.total.toFixed(2));
        await this.createReceipt(myReceipt);
        resolve(myReceipt)
      } catch (error) {
        console.log(error);
        reject('Error')
      }
    });
  }

  eraseBill(bill){
    this.firestore.deleteDocument(this.ReceiptFolder,bill.uid)
    .then(() => {console.log('erased receipt: ' + bill.receiptNumber + ' - uid: ' + bill.uid)} )
  }
  

}
