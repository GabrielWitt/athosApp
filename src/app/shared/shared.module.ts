import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Pipes
import { FirstKeyPipe } from './pipes/first-key.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';

// General view
import { BigButtonComponent } from './components/view/big-button/big-button.component';
import { MainHeaderComponent } from './components/view/main-header/main-header.component';
import { DetailHeaderComponent } from './components/view/detail-header/detail-header.component';
import { NotDataYetMessageComponent } from './components/view/not-data-yet-message/not-data-yet-message.component';
import { LoadingViewComponent } from './components/view/loading-view/loading-view.component';
import { StatusRequestComponent } from './components/view/status-request/status-request.component';

// Components
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { NoticeBottomBarComponent } from './components/view/notice-bottom-bar/notice-bottom-bar.component';
import { NewNoticeComponent } from './components/new-notice/new-notice.component';
import { NewServiceComponent } from './components/services/new-service/new-service.component';
import { ServiceItemComponent } from './components/services/service-item/service-item.component';
import { ItemSpaceComponent } from './components/spaces/item-space/item-space.component';
import { NewSpaceComponent } from './components/spaces/new-space/new-space.component';
import { NewReservationComponent } from './components/spaces/new-reservation/new-reservation.component';
import { DetailSpaceComponent } from './components/spaces/detail-space/detail-space.component';
import { PickRentSpaceComponent } from './components/spaces/pick-rent-space/pick-rent-space.component';
import { ImagePreviewComponent } from './components/view/image-preview/image-preview.component';
import { ItemReservationComponent } from './components/spaces/item-reservation/item-reservation.component';
import { DetailReservationComponent } from './components/spaces/detail-reservation/detail-reservation.component';
import { DetailServiceComponent } from './components/services/detail-service/detail-service.component';
import { ItemUserComponent } from './components/users/item-user/item-user.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { PickServiceComponent } from './components/services/pick-service/pick-service.component';
import { NewRequestComponent } from './components/services/new-request/new-request.component';
import { DetailRequestComponent } from './components/services/detail-request/detail-request.component';

const components = [
  BigButtonComponent,
  MainHeaderComponent,
  NoticeBottomBarComponent,
  DetailHeaderComponent,
  NotDataYetMessageComponent,
  LoadingViewComponent,
  ImagePreviewComponent,
  StatusRequestComponent,
  // User
  UserProfileComponent,
  ItemUserComponent,
  UserDetailComponent, 
  EditUserComponent,
  //Notice
  NewNoticeComponent,
  //Services
  NewServiceComponent,
  ServiceItemComponent,
  DetailServiceComponent,
  PickServiceComponent,
  NewRequestComponent,
  DetailRequestComponent,
  DetailServiceComponent,
  //Spaces
  ItemSpaceComponent,
  ItemReservationComponent,
  DetailSpaceComponent,
  DetailReservationComponent,
  NewSpaceComponent,
  PickRentSpaceComponent,
  NewReservationComponent
]
const pipes = [
  FirstKeyPipe,
  TimeFormatPipe
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...pipes,
    ... components
  ],
  exports: [
    ...pipes,
    ... components
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SharedModule { }