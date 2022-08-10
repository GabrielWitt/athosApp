import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesResidentPageRoutingModule } from './services-resident-routing.module';

import { ServicesResidentPage } from './services-resident.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ServicesComponent } from './services/services.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServicesResidentPageRoutingModule
  ],
  declarations: [
    ServicesResidentPage,
    MaintenanceComponent,
    ServicesComponent
  ]
})
export class ServicesResidentPageModule {}
