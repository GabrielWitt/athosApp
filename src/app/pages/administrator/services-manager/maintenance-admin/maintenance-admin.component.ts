import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance-admin',
  templateUrl: './maintenance-admin.component.html',
  styleUrls: ['./maintenance-admin.component.scss'],
})
export class MaintenanceAdminComponent implements OnInit  {
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
