import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesStaffPageRoutingModule } from './services-staff-routing.module';

import { ServicesStaffPage } from './services-staff.page';
import { CalendarOrdersComponent } from './calendar-orders/calendar-orders.component';
import { ServicesOrdersComponent } from './services-orders/services-orders.component';
import { TicketOrdersComponent } from './ticket-orders/ticket-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServicesStaffPageRoutingModule
  ],
  declarations: [
    ServicesStaffPage,
    CalendarOrdersComponent,
    ServicesOrdersComponent,
    TicketOrdersComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServicesStaffPageModule {}
