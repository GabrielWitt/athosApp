import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Space } from 'src/app/core/models/spaces';
import { User, UserFormData } from 'src/app/core/models/user';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { UserController } from 'src/app/core/controller/user.controller';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { ProfileDetailComponent } from 'src/app/pages/administrator/user-manager/profile-detail/profile-detail.component';
import { NewReceiptComponent } from 'src/app/shared/components/bills/new-receipt/new-receipt.component';
import { BillingService } from 'src/app/core/services/modules/billing.service';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  user: User;
  currentUser: UserFormData;
  loading = true;
  userList: UserFormData[] = [];
  units: Space[];

  constructor(
    private users: UsersService,
    private router: Router,
    private modal: ModalController,
    private routerOutlet: IonRouterOutlet,
    public userCtrl: UserController,
    private receipt: BillingService,
    private time: TimeHandlerModule
  ) { }

  ngOnInit() {
    this.loadUsers()
    .then(() => {this.loading = false;})
    .catch(() => {this.loading = false;})
  }

  loadUsers(){
    return new Promise(async (resolve,reject) => {
      this.userList = [];
      this.users.readAllUsers()
      .then(list => {
        this.userList = list.sort(this.sortByName);
        this.userCtrl.loadUser().then((data:any) => {
          this.user = data.user;
          this.currentUser = data.data;
          resolve('ok')
        })
      }).catch(error => {
        console.log(error);
        reject('error');
      })
    })
  }

  sortByName( a, b ) {
    if ( a.type < b.type ){ return -1; }
    if ( a.type > b.type ){ return 1; }
    if ( a.name < b.name ){ return -1; }
    if ( a.name > b.name ){ return 1; }
    return 0;
  }

  async userDetail(user){
    if(user.uid === this.currentUser.uid){
      this.router.navigateByUrl('administrator/profile');
    } else {
      const modal = await this.modal.create({
        component: ProfileDetailComponent,
        componentProps: {user, currentUser:this.currentUser},
        mode: 'ios',
        presentingElement: this.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = await modal.onWillDismiss();
      console.log(modalResult.data)
      if(modalResult.data){ 
        if(modalResult.data.action === 'reload'){this.loadUsers();}
       }
    }
  }

  doRefresh(refresh?){
    this.loadUsers().then(done => {
      if (refresh){ refresh.target.complete(); }
    }).catch(error => {
      console.log(error);
      if (refresh){ refresh.target.complete(); }
    })
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

  async newUserModal(){
    const modal = await this.modal.create({
      component: ProfileDetailComponent,
      componentProps: { user: null, currentUser:this.currentUser },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
    const modalResult = await modal.onWillDismiss();
    if(modalResult.data){ this.loadUsers(); }
  }

}
