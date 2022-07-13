import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { FirebaseAuthService } from 'src/app/core/services/firebase.service';
import { AlertsService } from '../../utilities/alerts';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() user: User;
  loading = false;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';

  constructor(
    private router: Router,
    private auth: FirebaseAuthService,
    private alerts: AlertsService
  ) { }

  ngOnInit() {}

  cerrarSesion(){
    this.loading = true;
    this.alerts.AlertConfirm('','¿Seguro que desea salir de su sesión?').then(answer => {
      if(answer){
        this.auth.signOut().then(done => {
          this.loading = false;
          this.router.navigateByUrl('general/login');
        });
      }else{
        this.loading = false;
      }
    })
  }

}
