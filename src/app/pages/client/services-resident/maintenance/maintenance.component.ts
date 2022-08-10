import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  loading = true;
  itemList = []

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

  async doRefresh(refresh?){
    // load 
    if (refresh){ refresh.target.complete(); }
  }

}
