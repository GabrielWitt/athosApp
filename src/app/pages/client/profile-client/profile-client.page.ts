import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { attachmentOptions } from 'src/app/core/models/images';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { UserController } from 'src/app/core/controller/user.controller';
import { User, UserFormData } from 'src/app/core/models/user';
import { NewSpaceComponent } from 'src/app/shared/components/spaces/new-space/new-space.component';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.page.html',
  styleUrls: ['./profile-client.page.scss'],
})
export class ProfileClientPage implements OnInit {
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
