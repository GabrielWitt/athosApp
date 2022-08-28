import { Component, OnInit } from '@angular/core';
import { User, UserFormData } from 'src/app/core/models/user';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.page.html',
  styleUrls: ['./profile-client.page.scss'],
})
export class ProfileClientPage implements OnInit {
  user: User;
  currentUser: UserFormData;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';

  constructor( public auth: FireAuthService) { }

  ngOnInit(){
    this.auth.getUser().then((user: any) =>{
      this.user = user.user;
      this.currentUser = user.data;
    });
  }

  ionViewWillEnter(){
    this.auth.getUser().then((user: any) =>{
      this.user = user.data;
      this.currentUser = user.user;
    });
  }

}
