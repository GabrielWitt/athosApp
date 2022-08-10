import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationsManagerPage } from './reservations-manager.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationsManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsManagerPageRoutingModule {}
