import { Component, OnInit } from '@angular/core';
import { UserController } from 'src/app/core/controller/user.controller';
import { User, UserFormData } from 'src/app/core/models/user';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.page.html',
  styleUrls: ['./profile-manager.page.scss'],
})
export class ProfileManagerPage implements OnInit {
  user: User;
  currentUser: UserFormData;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';
  edit = false;
  loading = true;

  constructor( 
    public userCtrl: UserController, 
    public auth: FireAuthService
  ) { }

  ngOnInit(){
  }

  ionViewWillEnter(){
    this.loading = true;
    this.auth.getUser().then((user: any) =>{
      this.user = user.user;
      this.currentUser = user.data;
      console.log(this.currentUser);
      this.loading = false;
    });
  }

}