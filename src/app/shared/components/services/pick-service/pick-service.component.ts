import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesController } from 'src/app/core/controller/services.controller';
import { IonAccordionGroup } from '@ionic/angular';
import { UserFormData } from 'src/app/core/models/user';

@Component({
  selector: 'app-pick-service',
  templateUrl: './pick-service.component.html',
  styleUrls: ['./pick-service.component.scss'],
})
export class PickServiceComponent implements OnInit {
  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;
  @Input() user: UserFormData
  loading = false;
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor(
    public services: ServicesController,
    public modal: ModalController
  ) { }

  ngOnInit() { }

  async doRefresh(refresh?){
    this.loading = true;
    this.services.loadServices(this.user.type)
    .then(() => { 
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