import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesController } from 'src/app/core/controller/services.controller';
import { IonAccordionGroup } from '@ionic/angular';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;
  loading = false;
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor(
    public services: ServicesController,
    public modal: ModalController
  ) { }

  ngOnInit() { }

  defaultTab(){
    const nativeEl = this.accordionGroup;
    console.log(nativeEl)
    if (this.services.serviceList.length> 0) {
      nativeEl.value = 'second';
    } else if (this.services.maintenanceList.length> 0) {
      nativeEl.value = 'first';
    } else {
      nativeEl.value = undefined;
    }
  }

  async doRefresh(refresh?){
    this.loading = true;
    this.services.loadServices()
    .then(() => { 
      this.defaultTab();
      this.loading = false;
      if (refresh){ refresh.target.complete(); }
    });
  }

  showCost(space){
    if(space.rent){return space.rentData.cost + "$"; }
    else{ return 'Gratis'; }
  }

  pickService(service){
    this.modal.dismiss(service);
  }

}
