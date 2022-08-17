import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-admin',
  templateUrl: './request-admin.component.html',
  styleUrls: ['./request-admin.component.scss'],
})
export class RequestAdminComponent implements OnInit {
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

  createRequest(){
    
  }

}
