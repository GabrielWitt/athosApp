import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Receipt } from 'src/app/core/models/billis';
import { Community } from 'src/app/core/models/spaces';
import { UserFormData } from 'src/app/core/models/user';
import { BillingService } from 'src/app/core/services/modules/billing.service';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { NewReceiptComponent } from 'src/app/shared/components/bills/new-receipt/new-receipt.component';
import { SignModalComponent } from 'src/app/shared/components/view/sign-modal/sign-modal.component';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';

@Component({
  selector: 'app-billing-view',
  templateUrl: './billing-view.component.html',
  styleUrls: ['./billing-view.component.scss'],
})
export class BillingViewComponent implements OnInit {
  community: Community;
  currentUser: UserFormData;
  selectedMonth;
  endMonth;
  billsList: Receipt[] = [];
  loading = false;
  receiptDate = new Date().toISOString();
  receiptProgress = 0;

  constructor(
    private users: UsersService,
    private alerts: AlertsService,
    private auth: FireAuthService,
    private spaces: SpacesService,
    private modal: ModalController,
    private billing: BillingService,
    private time: TimeHandlerModule,
    private routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.receiptDate = this.time.getCurrentMonthStart(new Date());
    this.selectedMonth = this.time.getCurrentMonthStart(new Date());
    this.endMonth = this.time.getEndMonth(this.selectedMonth);
    this.loadData().then(() => { this.loading = false; })
  }

  nextMonth(){
    this.selectedMonth = this.time.getNextMonStart(this.selectedMonth);
    this.endMonth = this.time.getEndMonth(this.selectedMonth);
    this.loading = true;
    this.loadData().then(() => {this.loading = false;})
  }

  prevMonth(){
    this.selectedMonth = this.time.getPrevMonStart(this.selectedMonth);
    this.endMonth = this.time.getEndMonth(this.selectedMonth);
    this.loading = true;
    this.loadData().then(() => {this.loading = false;})
  }

  async loadData(){
    try {
      this.billsList = await this.billing.readMonthReceiptList(this.selectedMonth,this.endMonth);
      this.auth.getUser().then((user: any) =>{
        this.currentUser = user.data;
      });
      return 'done';
    } catch (error) {
      console.log(error);
    }
  }

  async newReceiptModal(receipt){
    const modal = await this.modal.create({
      component: NewReceiptComponent,
      componentProps: { user: null, currentUser:this.currentUser, receipt },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
    const modalResult = await modal.onWillDismiss();
    if(modalResult.data){  
      if(modalResult.data.action === 'payReceipt'){this.SignModal(receipt)}
      else{this.loadData();}
    }
  }

  async SignModal(receipt){
    const modal = await this.modal.create({
      component: SignModalComponent,
      componentProps: {receipt, currentUser:this.currentUser},
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
    const modalResult = await modal.onWillDismiss();
    if (modalResult.data){
      console.log(modalResult.data)
      if(modalResult.data.receipt){
        const update = modalResult.data.receipt;
        let list = []
        this.billsList.forEach(receipt => {
          if(update.uid === receipt.uid){list.push(update)}
          else{list.push(receipt)}
        })
        this.billsList = list;
      }
    }
  }
  
  changeReceiptDate(event){
    this.receiptDate = new Date(event).toISOString();
  }

  async createListReceipt(){
    this.loading = true;
    const selectedMonth = this.time.getCurrentMonthStart(this.receiptDate);
    const endMonth = this.time.getEndMonth(selectedMonth);
    let billsList = await this.billing.readMonthReceiptList(selectedMonth,endMonth);
    if(billsList.length>0){
      this.selectedMonth = selectedMonth;
      this.endMonth = endMonth;
      this.billsList = billsList;
      this.loading = false;
      this.alerts.showAlert( 'RECIBOS MENSUALES', 'Se encontraron recibos de '+this.time.getMonthName(this.receiptDate)+', ya se encuentran generados.', 'OK');
      this.modal.dismiss();
    }else{
      const communities = await this.spaces.readCommunityList();
      const list = await this.users.readOnlyResidents();
      let lastNumber = communities[0].lastReceiptNumber;
      for(let i=0; i<list.length;i++){
        lastNumber = i + 1 + communities[0].lastReceiptNumber
        this.billing.generateReceipt(lastNumber,this.receiptDate, list[i],this.currentUser,[],[]);
        this.receiptProgress =  i/list.length;
      }
      await this.spaces.UpdateCommunity({...communities[0],lastReceiptNumber:lastNumber})
      this.alerts.showAlert( 'RECIBOS MENSUALES '+this.time.getMonthName(this.receiptDate).toUpperCase(), list.length+' nuevos recibos han sido generados', 'OK');
      this.selectedMonth = selectedMonth;
      this.endMonth = endMonth;
      this.modal.dismiss();
      this.loadData().then(() => {this.loading = false;})
    }
  }

  async checkList(){
    let List = await this.billing.readAllReceiptList();
    List.sort((a,b)=>{return a.receiptNumber-b.receiptNumber})
    console.log(List);
    let lastNumber = 0;
    for(let i=0; i < List.length ; i++){
      /*
      lastNumber = (i+1)
      let update: Receipt = {...List[i], status:'Pendiente', receiptNumber: (i+1)}
      await this.billing.UpdateReceipt(update);
      console.log(update);
      */
      console.log(List[i].receiptNumber);
    }
    // await this.spaces.UpdateCommunity({...communities[0],lastReceiptNumber:lastNumber})
  }

}