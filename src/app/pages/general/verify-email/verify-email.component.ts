import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase/auth';
import { FirebaseAuthService } from 'src/app/core/services/firebase.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  email: string;
  loading = false;
  errorMessage = ''

  constructor(
    private routerParams: ActivatedRoute,
    private router: Router,
    private auth: FirebaseAuthService,
    private alerts: AlertsService 
  ) { }

  ngOnInit() {
    console.log(this.routerParams.snapshot.params.email)
    if(this.routerParams.snapshot.params.email){
      this.email = this.routerParams.snapshot.params.email;
    }
  }

  resendEmail(){
    this.loading = true;
    this.errorMessage = '';
    this.auth.verifyEmail().then((done: string) => {
      this.loading = false;
      this.alerts.showAlert('', done + ' a ' + this.email, 'OK')
    }).catch(error => { this.errorMessage = error; })
  }

  checkUser() {
    this.loading = true;
    this.errorMessage = '';
    this.auth.getUser().then((user: User) =>{
      this.loading = false;
      if(user){
        if(user.emailVerified){ this.router.navigateByUrl('manager'); }
        else{ this.errorMessage = 'Email no ha sido verificado'; }
      }else{ 
        this.alerts.showAlert('', 'La sessión ha expirado, intente ingresar nuevamente' + this.email, 'OK')
        this.router.navigateByUrl('general');
      }
    });
  }

  cancel(){
    this.loading = true;
    this.errorMessage = '';
    this.auth.signOut().then(done => {
      this.loading = false;
      this.router.navigateByUrl('general/login');
    });
  }

}
