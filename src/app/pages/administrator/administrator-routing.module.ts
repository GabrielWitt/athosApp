import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorPage } from './administrator.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdministratorPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../administrator/profile-manager/profile-manager.module').then( m => m.ProfileManagerPageModule),
        data: { viewName: 'Profile' }
      },
      {
        path: 'users',
        loadChildren: () => import('./user-manager/user-manager.module').then( m => m.UserManagerPageModule),
        data: { viewName: 'Users' }
      },
      {
        path: 'news',
        loadChildren: () => import('./notice-manager/notice-manager.module').then( m => m.NoticeManagerPageModule),
        data: { viewName: 'News' }
      },
      {
        path: 'reservations',
        loadChildren: () => import('./reservations-manager/reservations-manager.module').then( m => m.ReservationsManagerPageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./services-manager/services-manager.module').then( m => m.ServicesManagerPageModule)
      }
    ]
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorPageRoutingModule {}
