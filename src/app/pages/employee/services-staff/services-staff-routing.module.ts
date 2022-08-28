import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesStaffPage } from './services-staff.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesStaffPageRoutingModule {}
