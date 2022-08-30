import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Lease } from 'src/app/core/models/spaces';
import { Service } from 'src/app/core/models/services';
import { UserFormData } from 'src/app/core/models/user';
import { CalendarItem } from 'src/app/core/models/calendar';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { HapticsService } from 'src/app/shared/utilities/haptics.service';
import { RequestsService } from 'src/app/core/services/modules/requests.service';
import { CalendarService } from 'src/app/core/services/modules/calendar.service';
import { ServicesController } from 'src/app/core/controller/services.controller';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss'],
})
export class NewRequestComponent implements OnInit {
  defaultUser = 'assets/profile/ProfileBlank.png';
  defaultSpace = '../../../../../assets/blueprint.png';
  @Input() currentUser: UserFormData;
  @Input() users: UserFormData[];
  @Input() service: Service;
  @Input() request: CalendarItem;
  units: Lease[];

  selectedUser:UserFormData;
  selectedUnit: Lease;
  selectedUserUID;
  selectedUnitUID;

  loading = false;
  notes = '';
  showRequestForm = false;
  dom = false;
  lun = true;
  mar = true;
  mie = true;
  jue = true;
  vie = true;
  sab = false;

  myRequest: CalendarItem = {
    scheduleDate: null,
    startDate: null,
    endDate: null,
    status: 'Solicitado',
    notes: null,
    service: null,
    requestBy: null,
    userUID: null
  }

  constructor(
    private vibe: HapticsService,
    private requestService: ServicesController,
    private requests: RequestsService,
    private alerts: AlertsService,
    public modal: ModalController,
    private extra: VerificationFuncService,
  ) { }

  ngOnInit(){
    if(this.service){ 
      this.showRequestForm = true; 
      this.dom = this.service.weekdays[0];
      this.lun = this.service.weekdays[1];
      this.mar = this.service.weekdays[2];
      this.mie = this.service.weekdays[3];
      this.jue = this.service.weekdays[4];
      this.vie = this.service.weekdays[5];
      this.sab = this.service.weekdays[6];
    }
    if(this.request){
      this.myRequest = this.request;
      console.log(this.request)
      console.log(this.currentUser)
    }
    if(this.users?.length > 1){ 
      this.selectedUser = this.currentUser; 
      this.selectedUserUID=this.currentUser.uid;
      this.units = this.selectedUser.leases;
    } else{ 
      this.selectedUser = this.currentUser;
      this.selectedUserUID = this.currentUser.uid;
      this.units = this.selectedUser.leases?this.selectedUser.leases:[];
    }
    this.users.push(this.currentUser);
  }

  async enableForm(){
    if(this.showRequestForm){
      this.service = null;
      this.showRequestForm = false; 
    }else{
      this.service = await this.requestService.getServiceData(this.request.service.maintenance, this.request.service.serviceUID);
      this.dom = this.service.weekdays[0];
      this.lun = this.service.weekdays[1];
      this.mar = this.service.weekdays[2];
      this.mie = this.service.weekdays[3];
      this.jue = this.service.weekdays[4];
      this.vie = this.service.weekdays[5];
      this.sab = this.service.weekdays[6];
      this.showRequestForm = true; 
    }
  }

  userChange(e){
    this.selectedUserUID = e.detail.value;
    this.users.forEach((user:UserFormData) => {
      if(user.uid == this.selectedUserUID){this.selectedUser = user;}
    })
    this.units = this.selectedUser.leases;
  }

  spaceChange(e){
    this.selectedUnitUID = e.detail.value;
    this.units.forEach((space:Lease) => {
      if(space.spaceLease.uid == this.selectedUnitUID){this.selectedUnit = space;}
    })
  }

  Listener0(e){ this.dom = e.detail.checked }

  Listener1(e){ this.lun = e.detail.checked }

  Listener2(e){ this.mar = e.detail.checked }

  Listener3(e){ this.mie = e.detail.checked }

  Listener4(e){ this.jue = e.detail.checked }

  Listener5(e){ this.vie = e.detail.checked }

  Listener6(e){ this.sab = e.detail.checked }

  notesListener(e){ this.notes = e.detail.value }

  cancelRequest(){
    this.myRequest = {
      scheduleDate: null,
      startDate: null,
      endDate: null,
      status: 'Solicitado',
      notes: null,
      service: null,
      requestBy: null,
      userUID: null
    }
    this.modal.dismiss(false)
  }

  async createRequest(){
    try {
      if(this.selectedUser?.leases?.length>0 && !this.selectedUnitUID){console.log('falta Unit'); return 'error';}
      this.loading = true;
      this.myRequest.requestBy = await this.extra.createShortUser(this.selectedUser);
      this.myRequest.userUID = this.selectedUser.uid
      this.myRequest.service = {
        serviceUID: this.service.uid,
        name: this.service.name,
        maintenance: this.service.maintenance,
        photo: this.service.photo,
        estimatedTime: this.service.estimatedTime,
        cost: this.service.cost>0?this.service.cost:'Gratis',
        spaceUID: this.selectedUnit ? this.selectedUnit.spaceLease.uid : '-',
        unitNumber: this.selectedUnit? this.selectedUnit.spaceLease.type + ' ' + this.selectedUnit.spaceLease.unitNumber :'-',
        floor: this.selectedUnit ? this.selectedUnit.spaceLease.floor : '-',
        notes: this.notes,
        comments: [],
        preferredDays: [this.dom,this.lun,this.mar,this.mie,this.jue,this.vie,this.sab]
      }
      console.log(this.myRequest)
      if(this.request){
        await this.requests.UpdateRequest(this.myRequest, this.currentUser);
      } else {
        await this.requests.createRequest(this.myRequest);
      }
      this.vibe.endAction();
      this.alerts.showAlert( 'SERVICIOS', 
      this.request ? 'Datos de servicio  actualizados' : 'Nuevo servicio solicitado', 'OK');
      this.loading = false;
      this.modal.dismiss(true);
      return 'done';
    } catch (error) {
      console.log(error);
      this.loading = false;
      return 'error';
    }
  }

  async changeStateReserve(status){
    this.alerts.AlertConfirm(status,'¿Seguro desea'+(status === ''?'aprobar':'cancelar')+ ' la reserva?')
    .then(async answer => {
      if(answer){
        try {
          this.loading = true;
          this.myRequest = this.request;
          this.myRequest.status = status;
          await this.requests.UpdateRequest(this.myRequest, this.currentUser)
          this.vibe.endAction();
          this.alerts.showAlert('RESERVAS','Su reserva ha sido actualizada', 'OK');
          this.loading = false;
          this.modal.dismiss(true);
        } catch (error) {
          console.log(error)
          this.loading = false;
          this.modal.dismiss(true);
        }
      }
    })
  }

}
