import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { resolve } from 'dns';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { UserPhoto } from '../models/images';
import { Service } from '../models/services';
import { User, UserFormData } from '../models/user';
import { ImageUploaderService } from '../services/image-uploader.service';
import { FireAuthService } from '../services/modules/fire-auth.service';
import { MaintenanceService } from '../services/modules/maintenance.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesController {
    serviceList: Service[] = [];
    maintenanceList: Service[] = [];
  
    edit = false;
    platform;
  
    constructor(
      private auth: FireAuthService,
      private services: MaintenanceService,
    ) {  }

    loadServices(){
        return new Promise(async (resolve,reject) => {
            try {
                const list = await this.services.readResidentServicesList('MD61xvWSecqNMYYjvEoM');
                list.forEach(service => {
                    if(service.available){
                        if(service.maintenance){
                            this.maintenanceList.push(service);
                        } else {
                            this.serviceList.push(service);
                        }
                    }
                })
                resolve({services: this.serviceList,maintenances: this.maintenanceList})
            } catch (error) {
                console.log(error)
                reject('error')
            }
        })
    }

}