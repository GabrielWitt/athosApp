import { Component, OnInit } from '@angular/core';
import { UserFormData } from 'src/app/core/models/user';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { UserController } from 'src/app/core/controller/user.controller';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';
import { NewRequestComponent } from 'src/app/shared/components/services/new-request/new-request.component';
import { PickServiceComponent } from 'src/app/shared/components/services/pick-service/pick-service.component';
import { Space } from 'src/app/core/models/spaces';
import { UsersService } from 'src/app/core/services/modules/users.service';

@Component({
  selector: 'app-request-admin',
  templateUrl: './request-admin.component.html',
  styleUrls: ['./request-admin.component.scss'],
})
export class RequestAdminComponent implements OnInit {
  loading = true;
  user: UserFormData;
  itemList = []
  units: Space[];
  users: UserFormData[];

  constructor(
    private modal: ModalController,
    private spaces: SpacesService,
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
    console.log(this.user)
    this.units = await this.spaces.readSpacesListOrder();
    console.log(this.units)
    this.loading = false;
    return this.user
  }

  async doRefresh(refresh?){
    // load 
    if (refresh){ refresh.target.complete(); }
  }

  async createRequest(){
    const modalService = await this.modal.create({
      component: PickServiceComponent,
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
      componentProps: {service, request, user: this.user },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalCreate.present();
    const modalResult2 = await modalCreate.onWillDismiss();
    console.log(modalResult2);
    if(modalResult2.data){ this.loadData()}
  }

}
