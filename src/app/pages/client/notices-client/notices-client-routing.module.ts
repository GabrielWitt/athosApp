import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticesClientPage } from './notices-client.page';

const routes: Routes = [
  {
    path: '',
    component: NoticesClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticesClientPageRoutingModule {}
