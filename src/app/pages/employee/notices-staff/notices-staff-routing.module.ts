import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticesStaffPage } from './notices-staff.page';

const routes: Routes = [
  {
    path: '',
    component: NoticesStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticesStaffPageRoutingModule {}
