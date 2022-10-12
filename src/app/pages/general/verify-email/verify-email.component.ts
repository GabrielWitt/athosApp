import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase/auth';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
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
    private auth: FireAuthService,
    private alerts: AlertsService 
  ) { }

  ngOnInit() {
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
    this.loading = true;
    this.auth.reCheckUser().then((done: any) => {
      if(done){
        if(!done.user.emailVerified){
          this.alerts.showAlert('','El email: ' + this.email + ' aun no ha sido verificado', 'OK')
        }
        setTimeout(() => { this.loading = false; }, 5000);
      }
      else{this.loading = false;}
      this.loading = false;
    }).catch(e => { this.loading = false; });
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
