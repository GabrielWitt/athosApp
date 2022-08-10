import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPage } from './client.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ClientPage,
    children: [
      {
        path: 'news',
        loadChildren: () => import('./notices-client/notices-client.module').then( m => m.NoticesClientPageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./services-resident/services-resident.module').then( m => m.ServicesResidentPageModule)
      },
      {
        path: 'reservations',
        loadChildren: () => import('./reservations-resident/reservations-resident.module').then( m => m.ReservationsResidentPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile-client/profile-client.module').then( m => m.ProfileClientPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule {}
