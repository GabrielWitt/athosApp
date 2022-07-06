import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { FirebaseAuthService } from 'src/app/core/services/firebase.service';
import { RouteHistoryService } from 'src/app/shared/utilities/route-history';
import { compareValidator, min1digit, min1lowercase, min1specialCharacter, min1uppercase } from 'src/app/shared/utilities/validators';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  block = false;
  loading = false;
  validateCode = false;
  messageError: string;

  loginForm: FormGroup;
  validationMessages

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: FirebaseAuthService,
    private verification: VerificationFuncService,
    public history: RouteHistoryService
    ) { }

  ngOnInit() {
    this.validationMessages = {
      email: [
        {type: 'required', message: 'Email requerido'},
        {type: 'email', message: 'Email con formato incorrecto'}
      ],
      password: [
        { type: 'required', message: 'Contraseña requerida'},
      ]
    };
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    this.checkUser();
  }

  checkUser() {
    this.loading = true;
    this.auth.getUser().then((user: User) =>{
      console.log(user);
      if(user){
        if(user.emailVerified){ this.router.navigateByUrl('manager'); }
        else{ this.router.navigateByUrl('general/verify-email/'+user.email); }
        this.loading = false;
      }
    });
  }

  EnterSubmit(evt, form){
    this.verification.EnterSubmit(evt,form,this.loading).then(answer => {
      if(answer){ this.loginProcess(this.loginForm.value); }
    })
  }

  loginProcess(form) {
    this.loading = true;
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value.email,this.loginForm.value.password)
    .then((user:User) => { console.log(user); this.checkUser();  })
  }

  forgotPassword(){
    this.router.navigateByUrl('general/forgot-password')
  }

  registrase(){
    this.router.navigateByUrl('general/signup')
  }

}
