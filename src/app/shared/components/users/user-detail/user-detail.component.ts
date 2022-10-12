import { Component, Input, OnInit } from '@angular/core';
import { User, UserFormData } from 'src/app/core/models/user';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { attachmentOptions, UserPhoto } from 'src/app/core/models/images';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { UserController } from 'src/app/core/controller/user.controller';
import { ModalController } from '@ionic/angular';
import { NewSpaceComponent } from 'src/app/shared/components/spaces/new-space/new-space.component';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Input() userData: UserFormData;
  @Input() editDataForm: boolean;
  loading = false;
  edit = false;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';
  newImage;
  progress=0;

  constructor(
    private alerts: AlertsService,
    private images: AttachmentsService,
    public userCtrl: UserController,
    private modal: ModalController,
    private auth: FireAuthService,
    private utility: VerificationFuncService,
    private spaces: SpacesService
  ) { }

  ngOnInit() {
    console.log(this.user)
    console.log(this.userData)
    if(this.userData.leases){this.userData.leases.sort(this.utility.sortByType);}
  }

  editForm(){
    this.loading = true;
    const data = { ...this.userData,}
    this.auth.uploadUserForm(this.user.uid, data)
    .then(ok => { 
      this.edit = !this.edit;
      this.alerts.showAlert('PERFIL','Tus datos han sido actualizados','OK');
      this.loading = false;
    })
  }

  addPhoto() {
    if(this.user){
      const options: attachmentOptions = {
        currentRoute: 'manager/profile',
        height:null, width:null, pdf: false
      }
      this.images.presentImageOptions(options).then(async imageObj => {
        if (imageObj[0] !== undefined){
          this.loading = true;
          this.newImage = imageObj[0];
          this.userCtrl.changeProfileImage(imageObj[0], (upload) => this.progress = upload)
          .then(()=> {
            this.alerts.showAlert('PERFIL','Tus imagen de perfil ha sido actualizada','OK');
            this.newImage = null;
            this.userData.photo = imageObj[0].webPath;
            this.loading = false;
          })
          .catch(()=> {
            console.log('Error: uploading image');
            this.loading = false;
          })
        }
      });
    }
  }

  async detailSpace(space){
    const spaceData = await this.spaces.readSpace(space.spaceLease.uid);
    const modal = await this.modal.create({
      component: NewSpaceComponent,
      componentProps: {space: spaceData, user: this.userData },
      mode: 'ios'
    });
    modal.present();
  }

}
