import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticeManagerPageRoutingModule } from './notice-manager-routing.module';

import { NoticeManagerPage } from './notice-manager.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NoticeManagerPageRoutingModule
  ],
  declarations: [NoticeManagerPage]
})
export class NoticeManagerPageModule {}
