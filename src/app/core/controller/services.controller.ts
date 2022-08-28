import { Injectable } from '@angular/core';
import { Service } from '../models/services';
import { MaintenanceService } from '../services/modules/maintenance.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesController {
    selectedTab = 'services'
    serviceList: Service[] = [];
    maintenanceList: Service[] = [];
  
    edit = false;
    platform;
  
    constructor(
      private services: MaintenanceService,
    ) {  }

    loadServices(userType){
        return new Promise(async (resolve,reject) => {
            try {
                this.serviceList = []; this.maintenanceList = [];
                const seeAll = userType === 'administrador' ? true : false ;
                const list = await this.services.readResidentServicesList('MD61xvWSecqNMYYjvEoM');
                list.forEach(service => {
                    if(service.available || seeAll){
                        if(service.maintenance){
                            this.maintenanceList.push(service);
                        } else {
                            this.serviceList.push(service);
                        }
                    }
                })
                resolve({services: this.serviceList, maintenances: this.maintenanceList})
            } catch (error) {
                console.log(error)
                reject('error')
            }
        })
    }

    async getServiceData(maintenance:boolean, serviceUID: string){
        let serviceData: Service
        if(maintenance){
          this.maintenanceList.forEach(service => {
            if(service.uid === serviceUID){ serviceData = service;  }
          })
        }else{
          this.serviceList.forEach((service: Service) => {
            if(service.uid === serviceUID){ serviceData = service;  }
          })
        }
        return serviceData;
    }

    changeTab(newTab){
        this.selectedTab = newTab;
    }

}