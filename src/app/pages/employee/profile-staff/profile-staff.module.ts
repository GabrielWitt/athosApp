import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileStaffPageRoutingModule } from './profile-staff-routing.module';

import { ProfileStaffPage } from './profile-staff.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ProfileStaffPageRoutingModule
  ],
  declarations: [ProfileStaffPage]
})
export class ProfileStaffPageModule {}
