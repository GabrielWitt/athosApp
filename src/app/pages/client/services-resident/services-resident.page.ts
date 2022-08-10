import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-resident',
  templateUrl: './services-resident.page.html',
  styleUrls: ['./services-resident.page.scss'],
})
export class ServicesResidentPage implements OnInit {
  selectedTab = 'services'

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
  }

}
