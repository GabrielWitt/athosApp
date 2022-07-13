import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { FirebaseAuthService } from 'src/app/core/services/firebase.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { RouteHistoryService } from 'src/app/shared/utilities/route-history';
import { compareValidator, min1digit, min1lowercase, min1specialCharacter, min1uppercase } from 'src/app/shared/utilities/validators';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  block = false;
  loading = false;
  validateCode = false;
  messageError: string;

  signUpForm: FormGroup;
  validationMessages

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private verification: VerificationFuncService,
    public history: RouteHistoryService,
    private auth: FirebaseAuthService,
    private alert: AlertsService
    ) { }

  ngOnInit() {
    this.validationMessages = {
      email: [
        {type: 'required', message: 'El email es requerido'},
        {type: 'email', message: 'El email tiene formato incorrecto'}
      ],
      name:[ {type: 'required', message: ' Escribe tu nombre'},],
      lastName:[ {type: 'required', message: ' Escribe tu apellido'},],
      birthday:[ {type: 'required', message: ' Ingresa tu fecha de nacimiento'},],
      code:[ {type: 'required', message: ' Requiere un código'},],
    };
    this.signUpForm = this.formBuilder.group({
      email:[null, { validators: [Validators.required, Validators.email] }],
      name:[null, { validators: [Validators.required, Validators.minLength(2)] }],
      lastName:[null, { validators: [Validators.required, Validators.minLength(3)] }],
      birthday:[null, { validators: [Validators.required] }],
      password1: [null, { validators: [
        Validators.required,
        Validators.minLength(8),
        min1digit,
        min1lowercase,
        min1uppercase,
        min1specialCharacter,
      ]}],
      password2: [null, { validators: [Validators.required] }]
    }, {validators: [compareValidator('password1', 'password2')] });
  }

  EnterSubmit(evt, form){
    this.verification.EnterSubmit(evt,form,this.loading).then(answer => {
      if(answer){ this.signProcess(this.signUpForm.value); }
    })
  }

  signProcess(form) {
    this.messageError = '';
    this.loading = true;
    this.auth.registerUser(form.email,form.password1,
      form.name,form.lastName,form.birthday).then((user: User) => {
      this.auth.verifyEmail().then((verify: string) => {
        this.loading = false;
        this.alert.showAlert('',verify,'OK').then(() => {
          this.router.navigateByUrl('general/verify-email/'+user.email);
        });
      })
    }).catch(error => { this.messageError = error; this.loading = false; })
  }

  cancel(){
    this.messageError = '';
    this.router.navigateByUrl('general/login')
  }

}
