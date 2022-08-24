import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserFormData } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { HapticsService } from 'src/app/shared/utilities/haptics.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent implements OnInit {
  loading = false;
  upgrading = false;
  @Input() user: UserFormData;
  @Input() currentUser: UserFormData;
  petList = []
  defaultUser = '../../../../assets/profile/ProfileBlank.png';

  editUserForm = false;

  myCurrentUser: UserFormData ={
    CI: null,
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

  newImage;
  progress = 0;
  showCalendar = false;
  typeList = ['residente','empleado','administrador']

  constructor(
    public modal: ModalController,
    public alerts: AlertsService,
    private vibe: HapticsService,
    private users: UsersService,
  ) { }

  ngOnInit() { 
    console.log(this.user);
    this.myCurrentUser = this.user;
   }

  editUser(){
    if(this.editUserForm){
      this.myCurrentUser = this.user;
      this.editUserForm = false;
    } else {
      this.editUserForm= true;
    }
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

  sendData(){

    if(this.user){
      this.users.createUser(this.myCurrentUser)
    }else {
      this.users.updateUser(this.myCurrentUser);
    }
    this.alerts.showAlert( 'USUARIO', 
    this.user? 'Datos de '+ this.user.name + ' '+ this.user.lastName + ' han sido actualizados' : 'Nuevo usuario agregado', 'OK');
    this.loading = false;
    this.modal.dismiss(true);
    return 'done';
  }

}
