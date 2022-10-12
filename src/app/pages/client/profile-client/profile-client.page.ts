import { Component, OnInit } from '@angular/core';
import { UserController } from 'src/app/core/controller/user.controller';
import { User, UserFormData } from 'src/app/core/models/user';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.page.html',
  styleUrls: ['./profile-client.page.scss'],
})
export class ProfileClientPage implements OnInit {
  loading = false;
  user: User;
  currentUser: UserFormData;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';

  constructor( 
    public auth: FireAuthService, 
    public userCtrl: UserController) { }

  ngOnInit(){
    this.loadUser();
  }

  ionViewWillEnter(){
    this.loadUser();
  }

  async doRefresh(refresh?){
    this.auth.getUser().then((user: any) =>{
      this.user = user.user;
      this.currentUser = user.data;
      if (refresh){ refresh.target.complete(); }
    });
  }

  loadUser(){
    this.loading = true;
    this.auth.getUser().then((user: any) =>{
      this.user = user.user;
      this.currentUser = user.data;
      this.loading = false;
    });
  }

}
