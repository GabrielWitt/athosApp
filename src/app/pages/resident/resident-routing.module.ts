import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidentPage } from './resident.page';

const routes: Routes = [
  {
    path: '',
    component: ResidentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidentPageRoutingModule {}
