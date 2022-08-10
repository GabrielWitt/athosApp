import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Space } from 'src/app/core/models/spaces';
import { userFormData } from 'src/app/core/models/user';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { ReservationsService } from 'src/app/core/services/modules/reservations.service';
import { NewReservationComponent } from 'src/app/shared/components/spaces/new-reservation/new-reservation.component';
import { PickRentSpaceComponent } from 'src/app/shared/components/spaces/pick-rent-space/pick-rent-space.component';

@Component({
  selector: 'app-reservation-admin',
  templateUrl: './reservation-admin.component.html',
  styleUrls: ['./reservation-admin.component.scss'],
})
export class ReservationAdminComponent implements OnInit {
  loading = true;
  itemList = [];
  rentSpacesList: Space[]=[]
  user: userFormData;

  constructor(
    private modal: ModalController,
    private auth: FireAuthService,
    private request: ReservationsService,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.checkUser().then(user => {
    })
  }

  async checkUser() {
    this.loading = true;
    const userData:any = await this.auth.getUser();
    this.itemList = await this.request.readReservationsListOrderRent("startDate","2022-08-10T00:00:000Z",">");
    console.log(this.itemList)
    this.user = userData.data;
    this.loading = false;
    return this.user
  }

  async doRefresh(refresh?){
    // load 
    if (refresh){ refresh.target.complete(); }
  }

  async createReservation(){
    const modalPick = await this.modal.create({
      component: PickRentSpaceComponent,
      componentProps: {reservation: null, user: this.user },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalPick.present();
    const modalResult1 = await modalPick.onWillDismiss();
    if(modalResult1.data){ this.openReservation(null,modalResult1.data)
    }
  }

  async openReservation(reservation,space){
    const modalCreate = await this.modal.create({
      component: NewReservationComponent,
      componentProps: {reservation, space, user: this.user },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalCreate.present();
    const modalResult2 = await modalCreate.onWillDismiss();
    console.log(modalResult2);
    if(modalResult2.data){ console.log('reload spaces')}
  }

}
