import { Component, OnInit } from '@angular/core';
import { UserFormData } from 'src/app/core/models/user';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ServicesController } from 'src/app/core/controller/services.controller';
import { NewRequestComponent } from 'src/app/shared/components/services/new-request/new-request.component';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  user: UserFormData
  loading = false;
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor(
    public services: ServicesController,
    public auth: FireAuthService,
    private routerOutlet: IonRouterOutlet,
    public modal: ModalController
  ) { }

  ngOnInit() { 
    this.auth.getUser().then((user: any) =>{
      this.user = user.data;
    });
  }

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

  async pickService(request, service){
    const modalCreate = await this.modal.create({
      component: NewRequestComponent,
      componentProps: {service, request, currentUser: this.user },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalCreate.present();
    const modalResult2 = await modalCreate.onWillDismiss();
    console.log(modalResult2);
    if(modalResult2.data){  this.services.changeTab('maintenance') }
  }

}
