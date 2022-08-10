import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticesClientPageRoutingModule } from './notices-client-routing.module';

import { NoticesClientPage } from './notices-client.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NoticesClientPageRoutingModule
  ],
  declarations: [NoticesClientPage]
})
export class NoticesClientPageModule {}
