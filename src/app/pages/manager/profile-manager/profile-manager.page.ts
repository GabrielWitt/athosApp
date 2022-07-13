import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { FirebaseAuthService } from 'src/app/core/services/firebase.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.page.html',
  styleUrls: ['./profile-manager.page.scss'],
})
export class ProfileManagerPage implements OnInit {
  loading = false;
  user: User;

  constructor(
    private auth: FirebaseAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    this.loading = true;
    this.auth.getUser().then((user: User) =>{
      if(user){
        this.user = user
        console.log(user);
        this.loading = false;
      }else{
        this.router.navigateByUrl('general');
        this.loading = false;
      }
    });
  }

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
