import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerPage } from './manager.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ManagerPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home-manager/home-manager.module').then( m => m.HomeManagerPageModule),
        data: {
          viewName: 'Home'
        }
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile-manager/profile-manager.module').then( m => m.ProfileManagerPageModule),
        data: {
          viewName: 'Home'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerPageRoutingModule {}
