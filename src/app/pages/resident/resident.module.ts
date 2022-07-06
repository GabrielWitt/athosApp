import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResidentPageRoutingModule } from './resident-routing.module';

import { ResidentPage } from './resident.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResidentPageRoutingModule
  ],
  declarations: [ResidentPage]
})
export class ResidentPageModule {}
