import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticesStaffPageRoutingModule } from './notices-staff-routing.module';

import { NoticesStaffPage } from './notices-staff.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NoticesStaffPageRoutingModule
  ],
  declarations: [NoticesStaffPage]
})
export class NoticesStaffPageModule {}
