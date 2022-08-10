import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileClientPageRoutingModule } from './profile-client-routing.module';

import { ProfileClientPage } from './profile-client.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileClientPageRoutingModule
  ],
  declarations: [ProfileClientPage]
})
export class ProfileClientPageModule {}
