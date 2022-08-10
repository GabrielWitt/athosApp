import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations-manager',
  templateUrl: './reservations-manager.page.html',
  styleUrls: ['./reservations-manager.page.scss'],
})
export class ReservationsManagerPage implements OnInit {
  selectedTab = 'reservations';

  constructor() { }

  ngOnInit() {}

  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
  }

}