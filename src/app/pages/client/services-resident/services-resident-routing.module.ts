import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesResidentPage } from './services-resident.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesResidentPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesResidentPageRoutingModule {}
