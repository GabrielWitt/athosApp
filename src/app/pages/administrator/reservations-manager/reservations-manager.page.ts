import { Component, OnInit } from '@angular/core';
import { UserController } from 'src/app/core/controller/user.controller';

@Component({
  selector: 'app-reservations-manager',
  templateUrl: './reservations-manager.page.html',
  styleUrls: ['./reservations-manager.page.scss'],
})
export class ReservationsManagerPage implements OnInit {
  selectedTab = 'reservations';

  constructor(public userCtrl: UserController) { }

  ngOnInit() {}

  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
  }

}