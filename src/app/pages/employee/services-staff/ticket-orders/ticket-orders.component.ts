import { Component, OnInit } from '@angular/core';
import { UserFormData } from 'src/app/core/models/user';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { UserController } from 'src/app/core/controller/user.controller';
import { NewRequestComponent } from 'src/app/shared/components/services/new-request/new-request.component';
import { PickServiceComponent } from 'src/app/shared/components/services/pick-service/pick-service.component';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { RequestsService } from 'src/app/core/services/modules/requests.service';

@Component({
  selector: 'app-ticket-orders',
  templateUrl: './ticket-orders.component.html',
  styleUrls: ['./ticket-orders.component.scss'],
})
export class TicketOrdersComponent implements OnInit {
  loading = true;
  user: UserFormData;
  itemList = []
  users: UserFormData[];

  constructor(
    private modal: ModalController,
    private requests: RequestsService,
    private userService: UsersService,
    private userCtrl: UserController,
    private routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const userData:any = await this.userCtrl.loadUser();
    this.user = userData.data;
    this.users = await this.userService.readAllUsers();
    this.itemList = await this.requests.readRequestListOrder();
    this.loading = false;
    return this.user
  }

  async doRefresh(refresh?){
    await this.loadData();
    if (refresh){ refresh.target.complete(); }
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

