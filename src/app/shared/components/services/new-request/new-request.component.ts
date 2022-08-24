import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/core/models/services';
import { UserFormData } from 'src/app/core/models/user';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';
import { ModalController } from '@ionic/angular';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { HapticsService } from 'src/app/shared/utilities/haptics.service';
import { CalendarService } from 'src/app/core/services/modules/calendar.service';
import { RequestsService } from 'src/app/core/services/modules/requests.service';
import { CalendarItem } from 'src/app/core/models/calendar';
import { Space } from 'src/app/core/models/spaces';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss'],
})
export class NewRequestComponent implements OnInit {
  defaultUser = 'assets/profile/ProfileBlank.png';
  defaultSpace = '../../../../../assets/blueprint.png';
  @Input() user: UserFormData;
  @Input() service: Service;
  @Input() request: CalendarItem;
  @Input() units: Space[];

  selectedUnit: Space;
  unitName;

  loading = false;
  editRequestForm = false;
  showRequestForm = false;

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
    private requests: RequestsService,
    private calendar: CalendarService,
    private alerts: AlertsService,
    public modal: ModalController,
    private time: TimeHandlerModule,
    private extra: VerificationFuncService,
  ) { }

  ngOnInit(){
    if(this.service){this.showRequestForm = true;}
  }

  enableForm(){

  }

  spaceChange(e){
    this.unitName = e.detail.value;
    this.units.forEach((space:Space) => {
      if(space.unitNumber == this.unitName){this.selectedUnit = space;}
    })
  }

  async createRequest(){
    try {
      this.loading = true;
      this.myRequest.requestBy = await this.extra.createShortUser(this.user);
      this.myRequest.userUID = this.user.uid
      this.myRequest.service = {
        serviceUID: this.service.uid,
        name: this.service.name,
        maintenance: this.service.maintenance,
        photo: this.service.photo,
        estimatedTime: this.service.estimatedTime,
        cost: this.service.cost>0?this.service.cost:'Gratis',
        spaceUID: this.selectedUnit.uid,
        unitNumber: this.selectedUnit.unitNumber,
        floor: this.selectedUnit.floor
      }
      console.log(this.myRequest)
      if(this.request){
        await this.requests.UpdateRequest(this.myRequest);
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
    .then(answer => {
      if(answer){this.changeRequestStatus(status);}
    })
  }

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

  async changeRequestStatus(status){
    try {
      this.loading = true;
      this.myRequest = this.request;
      this.myRequest.status = status;
      // await this.requests.UpdateReservations(this.reservation);
      console.log(status === 'Aprovado')
      if(status === 'Aprovado'){
        await this.calendar.confirmReservation(this.myRequest);
      }
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

}
