import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeePage } from './employee.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'services',
    pathMatch: 'full'
  },
  {
    path: '',
    component: EmployeePage,
    children: [
      {
        path: 'news',
        loadChildren: () => import('./notices-staff/notices-staff.module').then( m => m.NoticesStaffPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile-staff/profile-staff.module').then( m => m.ProfileStaffPageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./services-staff/services-staff.module').then( m => m.ServicesStaffPageModule)
      },
      {
        path: 'reservations',
        loadChildren: () => import('./reservation-staff/reservation-staff.module').then( m => m.ReservationStaffPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePageRoutingModule {}
