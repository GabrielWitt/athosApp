import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Service } from 'src/app/core/models/services';
import { MaintenanceService } from 'src/app/core/services/modules/maintenance.service';

@Component({
  selector: 'app-pick-service',
  templateUrl: './pick-service.component.html',
  styleUrls: ['./pick-service.component.scss'],
})
export class PickServiceComponent implements OnInit {
  serviceList: Service[] = [];
  maintenanceList: Service[] = [];
  loading = true;
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor(
    private services: MaintenanceService,
    public modal: ModalController
  ) { }

  ngOnInit() {
    this.loadData()
  }

  async loadData(){
    try {
      const list = await this.services.readResidentServicesList('MD61xvWSecqNMYYjvEoM');
      console.log(list)
      list.forEach(service => {
        if(service.maintenance){
          this.maintenanceList.push(service);
        } else {
          this.serviceList.push(service);
        }
      })
      this.loading = false;
    } catch (error) {
      console.log(error)
      this.loading = false;
    }
  }

  showCost(space){
    if(space.rent){return space.rentData.cost + "$"; }
    else{ return 'Gratis'; }
  }

  pickService(service){
    this.modal.dismiss(service);
  }

}
