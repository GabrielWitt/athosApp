import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesManagerPageRoutingModule } from './services-manager-routing.module';

import { ServicesManagerPage } from './services-manager.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaintenanceAdminComponent } from './maintenance-admin/maintenance-admin.component';
import { ServicesAdminComponent } from './services-admin/services-admin.component';
import { RequestAdminComponent } from './request-admin/request-admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServicesManagerPageRoutingModule
  ],
  declarations: [
    ServicesManagerPage,
    MaintenanceAdminComponent,
    ServicesAdminComponent,
    RequestAdminComponent
  ]
})
export class ServicesManagerPageModule {}
