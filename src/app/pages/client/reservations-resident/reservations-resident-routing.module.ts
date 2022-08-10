import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationsResidentPage } from './reservations-resident.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationsResidentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsResidentPageRoutingModule {}
