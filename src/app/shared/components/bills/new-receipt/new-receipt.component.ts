import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemDetail, Receipt } from 'src/app/core/models/billis';
import { UserFormData } from 'src/app/core/models/user';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';

@Component({
  selector: 'app-new-receipt',
  templateUrl: './new-receipt.component.html',
  styleUrls: ['./new-receipt.component.scss'],
})
export class NewReceiptComponent implements OnInit {
  @Input() user: UserFormData;
  @Input() currentUser: UserFormData;
  @Input() receipt: Receipt;
  valueList: ItemDetail[] = [];
  total = 0;
  totalDescription = '';
  loading = false;

  constructor(
    private utility: VerificationFuncService,
    public modal: ModalController,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
  }

  payReceipt(){
    this.modal.dismiss({action: 'payReceipt'})
  }

  createReceipt(){

  }

}
