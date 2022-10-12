import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { CalendarItem } from 'src/app/core/models/calendar';
import { UserFormData } from 'src/app/core/models/user';
import { CalendarService } from 'src/app/core/services/modules/calendar.service';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { RequestsService } from 'src/app/core/services/modules/requests.service';
import { NewRequestComponent } from 'src/app/shared/components/services/new-request/new-request.component';
import { NewServiceComponent } from 'src/app/shared/components/services/new-service/new-service.component';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  itemList: CalendarItem[] = [];
  currentUser: UserFormData;
  loading = false;
  filterSelected: '>'|'<' = '>'

  filterItems = [
    {name: 'Próximas',filter: '>'},
    {name: 'Pasadas',filter: '<'}
  ]
  constructor(
    private calendar: CalendarService, 
    private modal: ModalController,
    private routerOutlet: IonRouterOutlet,
    private requests: RequestsService,
    public auth: FireAuthService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.loadData().then(user => {
      this.loading = false;
    })
  }

  async loadData() {
    const userData:any = await this.auth.getUser();
    this.currentUser = userData.data;
    this.itemList = await this.requests.readResidentRequestListOrderRent('userUID',this.currentUser.uid, '==');
    console.log(this.itemList)
    return this.currentUser
  }

  async doRefresh(refresh?){
    // load 
    await this.loadData();
    if (refresh){ refresh.target.complete(); }
  }

  async editService(request){
    const modalService = await this.modal.create({
      component: NewRequestComponent,
      componentProps: {service: null, request, currentUser: this.currentUser },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalService.present();
    const modalResult1 = await modalService.onWillDismiss();
    if(modalResult1.data){}
  }

}
