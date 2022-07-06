import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralPageRoutingModule } from './general-routing.module';

import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    GeneralPageRoutingModule
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    VerifyEmailComponent
  ]
})
export class GeneralPageModule {}
