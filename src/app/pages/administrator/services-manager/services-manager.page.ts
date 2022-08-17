import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-manager',
  templateUrl: './services-manager.page.html',
  styleUrls: ['./services-manager.page.scss'],
})
export class ServicesManagerPage implements OnInit {
  selectedTab = 'request'

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
  }

}
