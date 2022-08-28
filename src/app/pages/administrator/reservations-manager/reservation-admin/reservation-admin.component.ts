import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Space } from 'src/app/core/models/spaces';
import { UserFormData } from 'src/app/core/models/user';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { ReservationsService } from 'src/app/core/services/modules/reservations.service';
import { UsersService } from 'src/app/core/services/modules/users.service';
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
  users: UserFormData[];
  user: UserFormData;
  filterSelected: '>'|'<' = '>'

  filterItems = [
    {name: 'Próximas',filter: '>'},
    {name: 'Pasadas',filter: '<'}
  ]

  constructor(
    private modal: ModalController,
    private auth: FireAuthService,
    private userServ: UsersService,
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
    this.user = userData.data;
    this.itemList = await this.request.readReservationsListOrderRent("startDate",new Date().toISOString(),this.filterSelected);
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
    this.users = await this.userServ.readOnlyResidents();
    const modalCreate = await this.modal.create({
      component: NewReservationComponent,
      componentProps: {reservation, space, currentUser: this.user, users: this.users },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalCreate.present();
    const modalResult2 = await modalCreate.onWillDismiss();
    if(modalResult2.data){ this.loadData()}
  }

}
