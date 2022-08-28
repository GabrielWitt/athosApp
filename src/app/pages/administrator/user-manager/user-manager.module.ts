import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserManagerPageRoutingModule } from './user-manager-routing.module';

import { UserManagerPage } from './user-manager.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { BillingViewComponent } from './billing-view/billing-view.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UserManagerPageRoutingModule
  ],
  declarations: [
    UserManagerPage,
    ProfileDetailComponent,
    BillingViewComponent,
    UserListComponent
  ]
})
export class UserManagerPageModule {}
