import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileStaffPage } from './profile-staff.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileStaffPageRoutingModule {}
