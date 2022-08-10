import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { resolve } from 'dns';
import { ProfileDetailComponent } from 'src/app/pages/administrator/user-manager/profile-detail/profile-detail.component';
import { userFormData } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.page.html',
  styleUrls: ['./user-manager.page.scss'],
})
export class UserManagerPage implements OnInit {
  loading = true;
  userList: userFormData[] = [];

  constructor(
    private users: UsersService,
    private modal: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() {
    this.loadUsers()
    .then(() => {this.loading = false;})
    .catch(() => {this.loading = false;})
  }

  loadUsers(){
    return new Promise((resolve,reject) => {
      this.users.readAllUsers()
      .then(list => {
        console.log(list);
        this.userList = list;
        resolve('ok')
      }).catch(error => {
        console.log(error);
        reject('error');
      })
    })
  }

  async userDetail(user){
    const modal = await this.modal.create({
      component: ProfileDetailComponent,
      componentProps: {user},
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

}
