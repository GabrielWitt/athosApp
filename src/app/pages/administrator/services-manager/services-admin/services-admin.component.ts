import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-admin',
  templateUrl: './services-admin.component.html',
  styleUrls: ['./services-admin.component.scss'],
})
export class ServicesAdminComponent implements OnInit  {
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
