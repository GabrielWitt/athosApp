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
  @Input() currentReceipt: Receipt;
  valueList: ItemDetail[] = [];
  total = 0;
  totalDescription = '';
  loading = false;
  generate = true;

  myReceipt: Receipt = {
    receiptDate: '2022-01-04T12:00:00.000Z',
    ruc: '1791430751001',
    receiptNumber: 1,
    userUID: '',
    userName: 'Roberto Bueno',
    userCI: '1767039819',
    address: 'Av. Rep. del Salvador 734 y Av. Portugal'+' Oficina 1102',
    itemDetail: [],
    total: 0,
    userSignature: '',
    createdBy: null,
    payerName: null,
    status: 'Pendiente'
  }

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
