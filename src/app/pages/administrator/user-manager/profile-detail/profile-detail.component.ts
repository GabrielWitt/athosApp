import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { attachmentOptions } from 'src/app/core/models/images';
import { UserFormData } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { HapticsService } from 'src/app/shared/utilities/haptics.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent implements OnInit {
  loading = false;
  upgrading = false;
  @Input() admin: boolean;
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
  typeList = ['residente','empleado','administrador','inactivo'];
  alertEmail = '';
  missingData = '';

  constructor(
    public modal: ModalController,
    public alerts: AlertsService,
    private images: AttachmentsService,
    private vibe: HapticsService,
    private users: UsersService,
  ) { }

  ngOnInit() { 
    if(this.user){ this.myCurrentUser = this.user; }
   }

  editUser(){
    if(this.editUserForm){
      this.myCurrentUser = this.user;
      this.editUserForm = false;
    } else {
      this.editUserForm= true;
    }
  }

  CIListener(e){ 
    this.myCurrentUser.CI = e.detail.value;
  }

  emailListener(e){ 
    this.myCurrentUser.email = e.detail.value
    if(!this.ValidateEmail(this.myCurrentUser.email)){ this.alertEmail = 'Email inválido'; }
    else{ this.alertEmail = ''; }
  }

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

  typeHandler(e){ this.myCurrentUser.type = e.detail.value}

  addPhoto() {
    if(this.user){
      const options: attachmentOptions = {
        currentRoute: 'administrator/users',
        height:null, width:null, pdf: false
      }
      this.images.presentImageOptions(options).then(async imageObj => {
        if (imageObj[0] !== undefined){ this.newImage = imageObj[0];
        }
      });
    }
  }

  sendData(){
    if(!this.myCurrentUser.name){this.missingData = 'Primer nombre'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}
    if(this.myCurrentUser.name.length > 1){this.missingData = 'Primer nombre completo'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}

    if(!this.myCurrentUser.secondName){this.missingData = 'Segundo nombre'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}
    if(this.myCurrentUser.secondName.length > 2){this.missingData = 'Número de identificación completo'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}

    if(!this.myCurrentUser.lastName){this.missingData = 'Primer apellido'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}
    if(this.myCurrentUser.lastName.length > 2){this.missingData = 'Apellido completo'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}

    if(!this.myCurrentUser.CI){this.missingData = 'Número de identificación'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}
    if(this.myCurrentUser.CI.length > 4){this.missingData = 'Número de identificación completo'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}

    if(!this.myCurrentUser.email){this.missingData = 'Email'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}
    if(!this.ValidateEmail(this.myCurrentUser.email)){this.missingData = 'Email correcto'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}

    if(!this.myCurrentUser.phonePersonal){this.missingData = 'Telefono Principal'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}
    const phonePersonal = ''+this.myCurrentUser.phonePersonal;
    if(phonePersonal.length > 4){this.missingData = 'Telefono Principal completo'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}

    if(!this.myCurrentUser.birthDate){this.missingData = 'Fecha de Nacimiento'; this.show('Información Incompleta','Falta dato: '+ this.missingData);  return}

    else{ this.missingData = '' }
    if(this.user){
      this.users.createUser(this.myCurrentUser)
    }else {
      this.users.updateUser(this.myCurrentUser);
    }
    this.show( 'USUARIO', 
    this.user? 'Datos de '+ this.user.name + ' '+ this.user.lastName + ' han sido actualizados' : 'Nuevo usuario agregado', 'OK');
    this.loading = false;
    this.modal.dismiss({action:'reload'});
    return 'done';
  }

  show(title,text,button?){
    this.alerts.showAlert(title,text,button);
  }

  newReceipts(){
    this.modal.dismiss({action:'receipt',user: this.user})
  }

  editSpaces(){
    this.modal.dismiss({action:'spaces',user: this.currentUser})
  }

  ValidateEmail(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

}
