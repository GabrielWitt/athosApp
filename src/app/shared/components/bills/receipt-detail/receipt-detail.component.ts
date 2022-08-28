import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Receipt } from 'src/app/core/models/billis';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail.component.html',
  styleUrls: ['./receipt-detail.component.scss'],
})
export class ReceiptDetailComponent implements OnInit {
  @Input() currentReceipt: Receipt;
  total = 0;
  totalDescription = '';
  loading = false;
  displayDate = '';

  constructor(
    private utility: VerificationFuncService,
    public modal: ModalController,
    private alerts: AlertsService,
    private time: TimeHandlerModule
  ) { }

  ngOnInit() {
    console.log(this.currentReceipt)
    this.displayDate = this.time.geDateFullUTC(this.currentReceipt.receiptDate);
    this.totalDescription = this.utility.numeroALetras(parseFloat(''+this.currentReceipt.total));
  }

  fixNumber(currentNumber){
    let stringNumber = ''+currentNumber;
    do {
      stringNumber = '0'+ stringNumber;
    } while (stringNumber.length< 9);
    return stringNumber;
  }

}
