import { Component, OnInit } from '@angular/core';
import { UserFormData } from 'src/app/core/models/user';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { RequestsService } from 'src/app/core/services/modules/requests.service';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { NewRequestComponent } from 'src/app/shared/components/services/new-request/new-request.component';
import { PickServiceComponent } from 'src/app/shared/components/services/pick-service/pick-service.component';

@Component({
  selector: 'app-request-admin',
  templateUrl: './request-admin.component.html',
  styleUrls: ['./request-admin.component.scss'],
})
export class RequestAdminComponent implements OnInit {
  loading = true;
  user: UserFormData;
  itemList = []
  users: UserFormData[];
  filterSelected: '>'|'<' = '>'

  filterItems = [
    {name: 'Sin Asignar',filter: 'unassigned'},
    {name: 'Próximas',filter: '>'},
    {name: 'Pasadas',filter: '<'}
  ]

  constructor(
    private modal: ModalController,
    private requests: RequestsService,
    private auth: FireAuthService,
    private userServ: UsersService,
    private routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const userData:any = await this.auth.getUser()
    this.user = userData.data;
    this.itemList = await this.requests //.readRequestListOrder();
    .readRequestListOrderRent("startDate",new Date().toISOString(),this.filterSelected);
    this.loading = false;
    console.log(this.itemList)
    return this.user
  }

  async doRefresh(refresh?){
    await this.loadData();
    if (refresh){ refresh.target.complete(); }
  }

  filterChange(e){
    this.filterSelected = e.detail.value;
    this.loadData();
  }

  async createRequest(){
    const modalService = await this.modal.create({
      component: PickServiceComponent,
      componentProps:{user:this.user},
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalService.present();
    const modalResult1 = await modalService.onWillDismiss();
    if(modalResult1.data){ this.openRequest(null,modalResult1.data)
    }
  }

  async openRequest(request, service){
    this.users = await this.userServ.readOnlyResidents();
    const modalCreate = await this.modal.create({
      component: NewRequestComponent,
      componentProps: {service, request, currentUser: this.user, users: this.users },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalCreate.present();
    const modalResult2 = await modalCreate.onWillDismiss();
    console.log(modalResult2);
    if(modalResult2.data){ this.loadData()}
  }

}
