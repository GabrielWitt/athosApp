import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationStaffPageRoutingModule } from './reservation-staff-routing.module';

import { ReservationStaffPage } from './reservation-staff.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReservationStaffPageRoutingModule
  ],
  declarations: [ReservationStaffPage]
})
export class ReservationStaffPageModule {}
