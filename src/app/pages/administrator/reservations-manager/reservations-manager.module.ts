import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsManagerPageRoutingModule } from './reservations-manager-routing.module';

import { ReservationsManagerPage } from './reservations-manager.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpacesAdminComponent } from './spaces-admin/spaces-admin.component';
import { ReservationAdminComponent } from './reservation-admin/reservation-admin.component';
import { CommunityAdminComponent } from './community-admin/community-admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReservationsManagerPageRoutingModule
  ],
  declarations: [
    ReservationsManagerPage,
    SpacesAdminComponent,
    ReservationAdminComponent,
    CommunityAdminComponent
  ]
})
export class ReservationsManagerPageModule {}
