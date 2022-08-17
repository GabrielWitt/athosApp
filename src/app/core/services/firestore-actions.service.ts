import { Injectable } from '@angular/core';
import { serverTimestamp, WhereFilterOp } from "firebase/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { take } from 'rxjs/operators';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { CalendarItem } from '../models/calendar';

@Injectable({
  providedIn: 'root'
})
export class FirestoreActionsService {

  constructor(
    private error: ErrorHandlerService,
    private time: TimeHandlerModule,
    private afs: AngularFirestore
  ) { }

  readCollection(folderName:string){
    return new Promise((resolve, reject) => {
      try {
        const callDoc =  this.afs.collection(folderName).valueChanges();
        callDoc.pipe(take(1)).subscribe((querySnapshot: any)=>{
          resolve(querySnapshot); 
        })
      } catch (error) {
        reject(this.error.handle(error));
      }
    });
  }

  readCollectionOrderBy(folderName:string, field: string){
    return new Promise((resolve, reject) => {
      try {
        const callDoc = this.afs.collection(folderName, ref => ref.orderBy(field)).valueChanges();
        callDoc.pipe(take(1)).subscribe((querySnapshot: any)=>{
          resolve(querySnapshot); 
        })
      } catch (error) {
        reject(this.error.handle(error));
      }
    });
  }

  readCollectionFilter(folderName:string, filterName: string, filterValue: any){
    return new Promise((resolve, reject) => {
      try {
        const callDoc = this.afs.collection(folderName, ref => ref.where(filterName, "==", filterValue)).valueChanges();
        callDoc.pipe(take(1)).subscribe((querySnapshot: any)=>{
          resolve(querySnapshot); 
        })
      } catch (error) {
        reject(this.error.handle(error));
      }
    });
  }

  readCollectionOrderFilter(folderName:string, filterName: string, filterValue: any, orderField: string, filterOperator?:WhereFilterOp){
    return new Promise((resolve, reject) => {
      try {
        const filterOp: WhereFilterOp = filterOperator ? filterOperator : '=='
        const callDoc = this.afs.collection(
          folderName,(ref => ref.where(filterName, filterOp, filterValue).orderBy(orderField))
        ).valueChanges();

        callDoc.pipe(take(1)).subscribe((querySnapshot: any) => {
          resolve(querySnapshot); 
        })
      } catch (error) {
        reject(this.error.handle(error));
      }
    });
  }

  createDocument(folder: string, data){
    return new Promise((resolve, reject) => {
      data['uid'] = this.afs.createId();
      data['createdAt'] = this.time.dateTransform(serverTimestamp());
      try {
        this.afs.collection(folder).doc(data.uid).set(data).then((data:any) => {
          resolve(data);
        });
      } catch (error) {
        reject(this.error.handle(error));
      }
    })
  }

  setNamedDocument(folder: string, filename: string, data){
    return new Promise((resolve, reject) => {
      data['updatedAt'] = 
      this.afs.collection(folder).doc(filename) 
      .set(JSON.parse(JSON.stringify(data)), { merge: true })
      .then((done: any) => { resolve(done); })
      .catch((error) => { reject(this.error.handle(error)); });
    })
  }

  readDocument(folder: string, filename: string){
    return new Promise((resolve, reject) => {
      try {
        const callDoc = this.afs.collection(folder).doc(filename).valueChanges();
          callDoc.pipe(take(1)).subscribe((data)=>{
          resolve(data);
        })
      } catch (error) {
        reject(this.error.handle(error));
      }
    })
  }

  deleteDocument(folder: string, filename: string){
    return new Promise((resolve, reject) => {
      try {
        this.afs.collection(folder).doc(filename).delete().then(done => {
          resolve(done);
        })
      } catch (error) {
        reject(this.error.handle(error));
      }
    })
  }

  returnNowStamp(){
    return this.time.dateTransform(serverTimestamp());
  }

}
