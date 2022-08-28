import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationStaffPage } from './reservation-staff.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationStaffPageRoutingModule {}
