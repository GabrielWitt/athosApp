import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import SignaturePad from 'signature_pad';
import { Receipt } from 'src/app/core/models/billis';
import { UserFormData } from 'src/app/core/models/user';
import { ImageUploaderService } from 'src/app/core/services/image-uploader.service';
import { BillingService } from 'src/app/core/services/modules/billing.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';

@Component({
  selector: 'app-sign-modal',
  templateUrl: './sign-modal.component.html',
  styleUrls: ['./sign-modal.component.scss'],
})
export class SignModalComponent implements OnInit {
  @ViewChild('sPad', { static: true }) signaturePadElement;
  @Input() receipt: Receipt; 
  @Input() currentUser: UserFormData;
  signaturePad: any;
  singColor = '#000';

  myReceipt: Receipt;
  progress = 0;
  loading = false;

  constructor(
    private modalController: ModalController,
    private elementRef: ElementRef,
    private upload: ImageUploaderService,
    private billings: BillingService,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement, {
      backgroundColor: '#FFFFFF'
    });
    this.initCanvasValues();
  }

  initCanvasValues() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.height = 91.69;
    canvas.width = 434.27;
    this.signaturePad.clear();
    this.myReceipt = {...this.receipt, payerName: ''};
  }

  nameListener(e){this.myReceipt.payerName = e.detail.value}


  dismiss(sign) {
    this.modalController.dismiss(sign);
  }

  cancel() {
    this.signaturePad.clear();
    this.singColor = '#000';
    this.dismiss(false)
  }

  async saveData() {
    try {
      this.loading = true;
      const sigImg = this.signaturePad.toDataURL('image/png');
      if(this.signaturePad.isEmpty()){
        this.loading = false;
        this.modalController.dismiss();
      }else{
        const imageName = Date().toString()+'_'+this.receipt.receiptNumber;
        const file = await this.upload.generateBlob(sigImg);
        this.upload.uploadFile('billsSign',imageName, file,
        (progress)=>{ this.progress = progress })
        .then(async (data:any) => {
          this.upload.deletePicture();
          this.myReceipt.userSignature = data.url;
          this.myReceipt.status = 'Pagado';
          await this.billings.changeReceiptStatus(this.myReceipt,'Pagado',this.currentUser)
          this.loading = false;
          this.alerts.showAlert( 'RECIBO PAGADO', 'Se ha actulizado su recibo', 'OK');
          this.modalController.dismiss({receipt:this.myReceipt});
        })
      }
    } catch (error) {
      
    }
  }

}
