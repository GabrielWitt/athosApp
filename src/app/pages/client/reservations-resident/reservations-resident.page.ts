import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations-resident',
  templateUrl: './reservations-resident.page.html',
  styleUrls: ['./reservations-resident.page.scss'],
})
export class ReservationsResidentPage implements OnInit {
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
