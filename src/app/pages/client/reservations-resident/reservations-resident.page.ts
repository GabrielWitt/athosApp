import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { UserController } from 'src/app/core/controller/user.controller';
import { Space } from 'src/app/core/models/spaces';
import { UserFormData } from 'src/app/core/models/user';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { ReservationsService } from 'src/app/core/services/modules/reservations.service';
import { NewReservationComponent } from 'src/app/shared/components/spaces/new-reservation/new-reservation.component';
import { PickRentSpaceComponent } from 'src/app/shared/components/spaces/pick-rent-space/pick-rent-space.component';

@Component({
  selector: 'app-reservations-resident',
  templateUrl: './reservations-resident.page.html',
  styleUrls: ['./reservations-resident.page.scss'],
})
export class ReservationsResidentPage implements OnInit {
  loading = true;
  itemList = [];
  rentSpacesList: Space[]=[]
  user: UserFormData;
  filterSelected: '>'|'<' = '>'

  filterItems = [
    {name: 'Próximas',filter: '>'},
    {name: 'Pasadas',filter: '<'}
  ]

  constructor(
    private modal: ModalController,
    private auth: FireAuthService,
    public userCtrl: UserController,
    private request: ReservationsService,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.loading = true;
    console.log( this.userCtrl.user)
    this.loadData().then(user => {
      this.loading = false;
    })
  }

  async loadData() {
    const userData:any = await this.auth.getUser();
    this.user = userData.data;
    this.itemList = await this.request.
    readUserReservationsListOrderRent("startDate",new Date().toISOString(),this.userCtrl.currentUser.uid,this.filterSelected);
    console.log(this.itemList)
    return this.user
  }

  filterChange(e){
    this.filterSelected = e.detail.value;
    this.loadData();
  }

  async doRefresh(refresh?){
    // load 
    await this.loadData();
    if (refresh){ refresh.target.complete(); }
  }

  async createReservation(){
    const modalPick = await this.modal.create({
      component: PickRentSpaceComponent,
      componentProps: {reservation: null, user: this.userCtrl.user},
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
      componentProps: {reservation, space, currentUser: this.user, users: [this.user] },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalCreate.present();
    const modalResult2 = await modalCreate.onWillDismiss();
    console.log(modalResult2);
    if(modalResult2.data){ this.loadData()}
  }

}
