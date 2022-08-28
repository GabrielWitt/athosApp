import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { RouteHistoryService } from 'src/app/shared/utilities/route-history';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  block = false;
  loading = true;
  validateCode = false;
  messageError: string;

  loginForm: FormGroup;
  validationMessages

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: FireAuthService,
    private verification: VerificationFuncService,
    public history: RouteHistoryService
    ) { }

  ngOnInit() {
    this.validationMessages = {
      email: [
        {type: 'required', message: 'Email requerido'},
        {type: 'email', message: 'Formato incorrecto'}
      ],
      password: [
        { type: 'required', message: 'Contraseña requerida'},
      ]
    };
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    this.loading = true;
    this.auth.refreshUser()
    .then((login: boolean) => {
      if(login){setTimeout(() => { this.loading = false; }, 5000);}
      else{this.loading = false;}
    });
  }

  EnterSubmit(evt, form){
    this.verification.EnterSubmit(evt,form,this.loading).then(answer => {
      if(answer){ this.loginProcess(this.loginForm.value); }
    }).catch(error => {
      this.messageError = error;
      this.loading = false;
    })
  }

  loginProcess(form) {
    this.messageError = '';
    this.loading = true;
    this.auth.login(this.loginForm.value.email,this.loginForm.value.password)
    .then(() => { setTimeout(() => { this.loading = false; }, 3000); })
    .catch(error => {
      this.messageError = error;
      this.loading = false;
    })
  }

  forgotPassword(){
    this.router.navigateByUrl('general/forgot-password')
  }

  registrase(){
    this.router.navigateByUrl('general/signup')
  }

}
