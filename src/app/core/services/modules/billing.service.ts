import { Injectable } from '@angular/core';
import { ItemDetail, Receipt } from '../../models/billis';
import { FirestoreActionsService } from '../firestore-actions.service';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { UserFormData } from '../../models/user';
import { CalendarItem, HistoryRecord } from '../../models/calendar';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { CalendarService } from './calendar.service';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';
import { last } from 'rxjs/operators';
import { Lease } from '../../models/spaces';
import { serverTimestamp } from 'firebase/firestore';

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
        user.leases.forEach(lease => {
          const subtotal = parseFloat(lease.monthlyCost.toFixed(2));
          const leaseItem:ItemDetail = {
            itemDescription: lease.spaceLease.description,
            numberItems: '1',
            unitValue: ''+lease.monthlyCost.toFixed(2),
            totalValue: ''+lease.monthlyCost.toFixed(2)
          }
          myReceipt.itemDetail.push(leaseItem);
          myReceipt.total = myReceipt.total + subtotal
        })
        await this.createReceipt(myReceipt);
        resolve(myReceipt)
      } catch (error) {
        console.log(error);
        reject('Error')
      }
    });
  }
  

}
