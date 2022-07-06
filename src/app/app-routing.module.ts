import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full'
  },
  {
    path: 'general',
    loadChildren: () => import('./pages/general/general.module').then( m => m.GeneralPageModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./pages/manager/manager.module').then( m => m.ManagerPageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule)
  },
  {
    path: 'resident',
    loadChildren: () => import('./pages/resident/resident.module').then( m => m.ResidentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
