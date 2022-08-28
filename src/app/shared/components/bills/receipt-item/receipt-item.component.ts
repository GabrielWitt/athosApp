import { Component, Input, OnInit } from '@angular/core';
import { Receipt } from 'src/app/core/models/billis';

@Component({
  selector: 'app-receipt-item',
  templateUrl: './receipt-item.component.html',
  styleUrls: ['./receipt-item.component.scss'],
})
export class ReceiptItemComponent implements OnInit {
  @Input() receipt: Receipt;

  constructor() { }

  ngOnInit() {}

}
