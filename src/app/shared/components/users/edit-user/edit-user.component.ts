import { Component, Input, OnInit } from '@angular/core';
import { User, UserFormData } from 'src/app/core/models/user';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { attachmentOptions } from 'src/app/core/models/images';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { UserController } from 'src/app/core/controller/user.controller';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @Input() user: User;
  @Input() userData: UserFormData;
  loading = false;
  edit = false;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';
  newImage;
  progress=0;
  showCalendar = false;
  myCurrentUser: UserFormData ={
    CI: '',
    photo: null,
    email: null,
    phonePersonal: null,
    phoneHome: null,
    phoneWork: null,
    name: null,
    secondName: null,
    lastName: null,
    secondLastName: null,
    birthDate: null,
    type: null,
  }

  constructor(
    private alerts: AlertsService,
    private images: AttachmentsService,
    public userCtrl: UserController,
  ) { }

  ngOnInit() {  
    this.myCurrentUser = this.userData;
   }

  CIListener(e){ this.myCurrentUser.CI = e.detail.value}

  emailListener(e){ this.myCurrentUser.email = e.detail.value}

  phonePersonalListener(e){ this.myCurrentUser.phonePersonal = e.detail.value}

  phoneHomeListener(e){ this.myCurrentUser.phoneHome = e.detail.value}

  phoneWorkListener(e){ this.myCurrentUser.phoneWork = e.detail.value}

  nameListener(e){ this.myCurrentUser.name = e.detail.value}

  secondNameListener(e){ this.myCurrentUser.secondName = e.detail.value}

  lastNameListener(e){ this.myCurrentUser.lastName = e.detail.value}

  secondLastNameListener(e){ this.myCurrentUser.secondLastName = e.detail.value}

  showCalendar1(){ this.showCalendar = !this.showCalendar; }
  
  changeScheduleTime(event){
    this.showCalendar = false;
    this.myCurrentUser.birthDate = new Date(event).toISOString();
  }

  editForm(){
    this.loading = true;
    this.userCtrl.updateUser(this.myCurrentUser)
    .then(ok => { 
      this.alerts.showAlert('PERFIL','Tus datos han sido actualizados','OK');
      this.userCtrl.editUser();
      this.loading = false;
    })
  }

  addPhoto() {
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