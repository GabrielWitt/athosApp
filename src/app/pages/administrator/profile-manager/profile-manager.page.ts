import { Component, OnInit } from '@angular/core';
import { UserController } from 'src/app/core/controller/user.controller';
import { User, UserFormData } from 'src/app/core/models/user';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.page.html',
  styleUrls: ['./profile-manager.page.scss'],
})
export class ProfileManagerPage implements OnInit {
  user: User;
  currentUser: UserFormData;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';

  constructor( public userCtrl: UserController) { }

  ngOnInit(){
    this.userCtrl.currentUserData()
    .then((data:any) => {
      console.log(data)
      this.user = data.user;
      this.currentUser = data.data;
    });
  }

  ionViewWillEnter(){
    this.userCtrl.currentUserData()
    .then((data:any) => {
      console.log(data)
      this.user = data.user;
      this.currentUser = data.data;
    });
  }

}