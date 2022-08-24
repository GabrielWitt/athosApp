import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { Service } from '../../models/services';
import { FirestoreActionsService } from '../firestore-actions.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  ServicesFolder = 'services';

  typeList = [ 
  {name: 'Eléctrico', image: 'assets/electric.png'},
  {name: 'Plomería', image: 'assets/plumbing.png'},
  {name: 'Muebles / Construcción', image: 'assets/woodwork.png'},
  {name: 'Limpieza / Jardineria', image: 'assets/cleaning.png'},
  ]

  constructor(
    private firestore: FirestoreActionsService,
    private error: ErrorHandlerService,
  ) { }

  createService(data: Service){
    return new Promise((resolve,reject) => {
      this.firestore.createDocument(this.ServicesFolder,data)
      .then(doc => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  UpdateService(data: Service){
    return new Promise((resolve,reject) => {
      this.firestore.setNamedDocument(this.ServicesFolder, data.uid, data)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readServices(uid){
    return new Promise<Service>((resolve,reject) => {
      this.firestore.readDocument(this.ServicesFolder,uid)
      .then((docs: Service) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readServicesListOrder(communityUID:string, maintenance: boolean){
    return new Promise<Service[]>((resolve,reject) => {
      this.firestore.readServicesOrderFilter(this.ServicesFolder, communityUID, maintenance)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readServicesListOrderType(communityUID:string, maintenance: boolean, serviceType:string, orderField:string){
    return new Promise<Service[]>((resolve,reject) => {
      this.firestore.readServicesOrderFilterByType(this.ServicesFolder, communityUID, maintenance, serviceType, orderField)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  readResidentServicesList(communityUID:string){
    return new Promise<Service[]>((resolve,reject) => {
      this.firestore.readServicesOrderAll(this.ServicesFolder, communityUID)
      .then((docs: any[]) => { resolve(docs) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }
}
