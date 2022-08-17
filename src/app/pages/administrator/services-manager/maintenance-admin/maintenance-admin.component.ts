import { Component, OnInit } from '@angular/core';
import { userFormData } from 'src/app/core/models/user';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { ReservationsService } from 'src/app/core/services/modules/reservations.service';
import { NewServiceComponent } from 'src/app/shared/components/services/new-service/new-service.component';

@Component({
  selector: 'app-maintenance-admin',
  templateUrl: './maintenance-admin.component.html',
  styleUrls: ['./maintenance-admin.component.scss'],
})
export class MaintenanceAdminComponent implements OnInit  {
  loading = true;
  itemList = []
  user: userFormData;
  filterSelected: '>'|'<' = '>'

  filterItems = [
    {name: 'Mantenimientos',filter: '>'},
    {name: 'Servicios',filter: '<'}
  ]

  constructor(
    private modal: ModalController,
    private auth: FireAuthService,
    private request: ReservationsService,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.loading = true;
    this.loadData().then(user => {
      this.loading = false;
    })
  }

  async loadData() {
    const userData:any = await this.auth.getUser();
    // this.itemList = await //this.request.readReservationsListOrderRent("startDate",new Date().toISOString(),this.filterSelected);
    console.log(this.itemList)
    this.user = userData.data;
    return this.user
  }

  async doRefresh(refresh?){
    // load 
    if (refresh){ refresh.target.complete(); }
  }

  async createService(service){
    const modalService = await this.modal.create({
      component: NewServiceComponent,
      componentProps: {service, user: this.user },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalService.present();
    const modalResult1 = await modalService.onWillDismiss();
    if(modalResult1.data){}
  }

}
