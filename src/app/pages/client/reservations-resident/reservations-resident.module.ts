import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsResidentPageRoutingModule } from './reservations-resident-routing.module';

import { ReservationsResidentPage } from './reservations-resident.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationsResidentPageRoutingModule,
    SharedModule
  ],
  declarations: [ReservationsResidentPage]
})
export class ReservationsResidentPageModule {}
