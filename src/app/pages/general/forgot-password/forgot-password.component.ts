import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/core/services/firebase.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { RouteHistoryService } from 'src/app/shared/utilities/route-history';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  block = false;
  loading = false;
  validateCode = false;
  messageError: string;

  emailForm: FormGroup;
  validationMessages

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: FirebaseAuthService,
    private verification: VerificationFuncService,
    public history: RouteHistoryService,
    private alert: AlertsService
    ) {
      this.validationMessages = {
        email: [
          {type: 'required', message: 'Email requerido'},
          {type: 'email', message: 'Formato incorrecto'}
        ]
      };
      this.emailForm = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required, Validators.email
        ]))
      });
    }

  ngOnInit() {

  }

  EnterSubmit(evt, form){
    this.verification.EnterSubmit(evt,form,this.loading).then(answer => {
      if(answer){ this.enviarEmail(this.emailForm.value); }
    })
  }

  enviarEmail(form){
    this.auth.forgotPassword(this.emailForm.value.email).then((done: string) => {
      console.log(done)
      this.alert.showAlert('',done + this.emailForm.value.email,'OK').then(() => {
        this.router.navigateByUrl('general/login');
      });
    }).catch(error => { this.messageError = error; });
  }

  cancel(){
    this.messageError = '';
    this.router.navigateByUrl('general/login');
  }

}
