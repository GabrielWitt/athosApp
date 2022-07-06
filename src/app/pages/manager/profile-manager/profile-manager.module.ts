import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileManagerPageRoutingModule } from './profile-manager-routing.module';

import { ProfileManagerPage } from './profile-manager.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileManagerPageRoutingModule,
    SharedModule
  ],
  declarations: [ProfileManagerPage]
})
export class ProfileManagerPageModule {}
