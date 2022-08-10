import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeManagerPage } from './notice-manager.page';

const routes: Routes = [
  {
    path: '',
    component: NoticeManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeManagerPageRoutingModule {}
