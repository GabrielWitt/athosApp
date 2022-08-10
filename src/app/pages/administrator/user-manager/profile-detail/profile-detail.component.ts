import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { userFormData } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent implements OnInit {
  loading = false;
  upgrading = false;
  @Input() user: userFormData;
  petList = []
  defaultUser = '../../../../assets/profile/ProfileBlank.png';

  constructor(
    public modal: ModalController,
    public alert: AlertsService,
    private users: UsersService
  ) { }

  ngOnInit() { }

  upgradeUser(){
    this.alert.AlertConfirm('CAMBIO A ADMINISTRADOR', '¿Está seguro que desea cambiar a este usuario a Administrador?')
    .then(answer => {
      if(answer){ 
        console.log('Administrador Nuevo')
        this.upgrading = true;
        this.users.upgradeUser(this.user.uid).then(done => {
          this.alert.showAlert(
            'USUARIO MEJORADO',
            'Solicite que el usuario ingrese a su perfil para continuar con el proceso',
            'OK');
          this.user.type = 'administrador';
          this.upgrading = false;
        }).catch(e => {
          console.log(e);
          this.upgrading = false;
        })
      }
    })
  }

}
