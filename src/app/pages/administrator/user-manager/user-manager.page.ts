import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ProfileDetailComponent } from 'src/app/pages/administrator/user-manager/profile-detail/profile-detail.component';
import { User, UserFormData } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';
import { UserController } from 'src/app/core/controller/user.controller';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';
import { Lease, Space } from 'src/app/core/models/spaces';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.page.html',
  styleUrls: ['./user-manager.page.scss'],
})
export class UserManagerPage implements OnInit {
  user: User;
  currentUser: UserFormData;
  loading = true;
  userList: UserFormData[] = [];
  units: Space[];
  fakeList = [
    "Rafael Bonilla", "Jorge Vela (Revival)", "Alba Vasques (2 reps.)", "Mario Duran", "Ana María Pachano", "Regina Tyson (KPMG del Ecuador)",
    "Francisca Cisneros", "Roger Valle (Plublistrategy S.A.)", "Yolanda Freile", "Francisca Cisneros (Bureau Group)", "Ronald Adamson (2 reps.)", "Soren Fredrick (INMORIDOVAL S.A.)",
    "Elsa Cordova", "Celia Varea (IES)", "Sylvia Busse (ABPRO)", "Jorge Mera (2 reps.)", "Lilia Cotter (QUITOIL)", "Liliana Roldan (Publiclaw)",
    "Elizabeth Borja (Intersalud)", "Diego Camacho (Trust Fiduciaria)", "Roberto Bueno"
  ]

  unitListData = [
    [],
    ['OFICINA 0001'],
    ['OFICINA 0101',
      'BODEGA #29',
      'PARQUEO #27',
      'PARQUEO #46',
      'PARQUEO #47'],
    ['OFICINA 0102',
      'BODEGA #25',
      'PARQUEO #39',
      'PARQUEO #40',],
    [ 'OFICINA 0201',
      'BODEGA #26',
      'PARQUEO #37',
      'PARQUEO #38'],
    [ 'OFICINA 0202',
      'BODEGA #24',
      'PARQUEO #35',
      'PARQUEO #36' ],
    [ 'OFICINA 0301',
      'OFICINA 0302',
      'BODEGA #27',
      'BODEGA #28',
      'BODEGA #30',
      'PARQUEO #42',
      'PARQUEO #43',
      'PARQUEO #44',
      'PARQUEO #45'],
    [ 'OFICINA 0401',
      'BODEGA #26',
      'PARQUEO #33',
      'PARQUEO #34'],
    [ 'OFICINA 0402',
      'BODEGA #31',
      'PARQUEO 28',
      'PARQUEO #53'],
    [ 'OFICINA 501',
      'BODEGA #18',
      'PARQUEO #29',
      'PARQUEO #30'],
    [ 'OFICINA 0502',
      'BODEGA #22',
      'PARQUEO #31',
      'PARQUEO #32',
      'PARQUEO #51'],
    [ 'OFICINA 0601',
      'BODEGA #13',
      'BODEGA #14',
      'PARQUEO #26',
      'PARQUEO #50'],
    [ 'OFICINA 0602',
      'BODEGA #02',
      'PARQUEO #01',
      'PARQUEO #02',
      'PARQUEO #25'],
    [ 'OFICINA 0701',
      'BODEGA #01',
      'PARQUEO #04',
      'PARQUEO #05'],
    [ 'OFICINA 0702',
      'BODEGA #17',
      'PARQUEO #03',
      'PARQUEO #06'],
    [ 'OFICINA 0801',
      'BODEGA #04',
      'BODEGA #10',
      'PARQUEO #09',
      'PARQUEO #10'],
    [ 'OFICINA 0802',
      'BODEGA #05',
      'PARQUEO #11',
      'PARQUEO #15',
      'PARQUEO #41'],
    [ 'OFICINA 0901',
      'BODEGA #11',
      'BODEGA #12',
      'PARQUEO #16',
      'PARQUEO #17'],
    [ 'OFICINA 0902',
      'BODEGA #03',
      'PARQUEO #07',
      'PARQUEO #08',
      'PARQUEO #48',
      'PARQUEO #49'],
    [ 'OFICINA 1001',
      'BODEGA #15',
      'PARQUEO #21',
      'PARQUEO #22',
      'PARQUEO #52'],
    [ 'OFICINA 1002',
      'BODEGA #16',
      'PARQUEO #23',
      'PARQUEO #24'],
    [ 'OFICINA 1101',
      'BODEGA #09',
      'BODEGA #19',
      'BODEGA #20',
      'BODEGA #23',
      'PARQUEO #18',
      'PARQUEO #19',
      'PARQUEO #20',
      'OFICINA 1102',
      'BODEGA #06',
      'BODEGA #07',
      'BODEGA #08',
      'PARQUEO #12',
      'PARQUEO #13',
      'PARQUEO #14']
  ]

  constructor(
    private users: UsersService,
    private spaces: SpacesService,
    private modal: ModalController,
    private utility: VerificationFuncService,
    private routerOutlet: IonRouterOutlet,
    public userCtrl: UserController
  ) { }

  loadUsers(){
    return new Promise(async (resolve,reject) => {
      this.users.readAllUsers()
      .then(list => {
        console.log(list);
        this.userList = list;
        this.userCtrl.loadUser().then((data:any) => {
          this.user = data.user;
          this.currentUser = data.data;
        })
        resolve('ok')
      }).catch(error => {
        console.log(error);
        reject('error');
      })
    })
  }

  ngOnInit() {
    this.loadUsers()
    .then(() => {this.loading = false;})
    .catch(() => {this.loading = false;})
  }

  async userDetail(user){
    const modal = await this.modal.create({
      component: ProfileDetailComponent,
      componentProps: {user, currentUser:this.currentUser},
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
    const modalResult = await modal.onWillDismiss();
    if(modalResult.data){ this.loadUsers(); }
  }

  async newUser(user){
    const modal = await this.modal.create({
      component: ProfileDetailComponent,
      componentProps: {user, currentUser:this.currentUser},
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
    const modalResult = await modal.onWillDismiss();
    if(modalResult.data){ this.loadUsers(); }
  }

  doRefresh(refresh?){
    this.loadUsers().then(done => {
      console.log('done');
      if (refresh){ refresh.target.complete(); }
    }).catch(error => {
      console.log(error);
      if (refresh){ refresh.target.complete(); }
    })
  }

  async newUserModal(){
    const modal = await this.modal.create({
      component: ProfileDetailComponent,
      componentProps: { user: null },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
    const modalResult = await modal.onWillDismiss();
    if(modalResult.data){ this.loadUsers(); }
  }

}