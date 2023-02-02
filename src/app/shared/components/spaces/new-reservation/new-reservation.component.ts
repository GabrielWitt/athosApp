import { Component, Input, OnInit } from '@angular/core';
import { Space } from 'src/app/core/models/spaces';
import { UserFormData } from 'src/app/core/models/user';
import { CalendarItem } from 'src/app/core/models/calendar';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';
import { ModalController } from '@ionic/angular';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { HapticsService } from 'src/app/shared/utilities/haptics.service';
import { ReservationsService } from 'src/app/core/services/modules/reservations.service';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';
import { CalendarService } from 'src/app/core/services/modules/calendar.service';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss'],
})
export class NewReservationComponent implements OnInit {
  defaultUser = 'assets/profile/ProfileBlank.png';
  defaultSpace = '../../../../../assets/blueprint.png';
  @Input() currentUser: UserFormData;
  @Input() users: UserFormData[];
  @Input() reservation: CalendarItem;
  @Input() space: Space;
  rentSpacesList: Space[] = [];

  min = new Date().toISOString();

  selectedUserUID;
  selectedUser: UserFormData;
  standAlone ={standalone: true}
  loading = false;
  editReservationForm = false;
  showReservationForm = false;
  showCalendar = false;
  guestCounter = 1;
  availableDays = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return this.space.rentData.weekdays[utcDay];
  };
  scheduleTimes;
  timeSlotStart = {
    hour: null,
    date: null,
    index: null
  };
  timeSlotEnd = {
    hour: null,
    date: null,
    index: null
  };
  addTime = 30;
  myReservation: CalendarItem = {
    scheduleDate: '',
    startDate: '',
    endDate: '',
    status: 'Solicitado',
    reservation: null,
    requestBy: null,
    userUID: null
  }


  constructor(
    private vibe: HapticsService,
    private request: ReservationsService,
    private calendar: CalendarService,
    private spaces: SpacesService,
    private alerts: AlertsService,
    public modal: ModalController,
    public time: TimeHandlerModule,
    private extra: VerificationFuncService,
  ) { }

  ngOnInit() {
    this.vibe.startAction();
    if(this.users?.length > 1){ 
      this.selectedUser = this.currentUser; 
      this.selectedUserUID = this.currentUser.uid;
    } else{ 
      this.selectedUser = this.currentUser;
      this.selectedUserUID = this.currentUser.uid;
    }
  }

  async enableForm(){ 
    this.showReservationForm = true;
    if(this.reservation){
      this.myReservation = this.reservation;
      this.guestCounter = this.myReservation.reservation.guests;
      this.space = await this.spaces.readSpace(this.reservation.reservation.spaceUID)
      this.addTime = this.space.rentData.minTime < 60 ? 30 : 60;
      await this.createScheduleList(); let count = 0;
      this.scheduleTimes.forEach(slot => {
        if(slot.date === this.myReservation.startDate){this.timeSlotClicked(count,slot)}
        else if(slot.date === this.myReservation.endDate){this.timeSlotClicked(count,slot)}
        count++;
      })
    } else{
      this.myReservation.requestBy = await this.extra.createShortUser(this.currentUser);
      this.addTime = this.space.rentData.minTime <60 ? 30 : 60;
      this.myReservation.reservation = {
        spaceUID: this.space.uid,
        unitNumber: this.space.type + ' ' + this.space.unitNumber,
        floor: this.space.floor,
        guests: 1,
        price: this.space.rentData.cost
      }
      if(this.space.photo){this.myReservation.reservation.photo = this.space.photo;}
      console.log(this.users)
    }
   }

  showCalendar1(){ this.showCalendar = !this.showCalendar; }
  
  changeScheduleTime(event){
    this.showCalendar = false;
    if(event){
      this.myReservation.scheduleDate = new Date(event).toISOString();
      this.createScheduleList();
    } else {
      this.myReservation.scheduleDate = this.time.getStartDate();
    }
  }

  async createScheduleList(){
    this.scheduleTimes = await this.time.getScheduleList(
      this.myReservation.scheduleDate, 
      this.space.rentData.starTime, 
      this.space.rentData.endTime, 
      this.addTime);
    return 'done';
  }

  async timeSlotClicked(index, timeSlot){
    if (this.scheduleTimes[index].disabled) {
      this.alerts.showAlert('Book Reservation','La hora de reservacion no está disponible. ');
    }else {
      const answer:any = await this.time.clickDaySlot(this.scheduleTimes, this.timeSlotStart, this.timeSlotEnd,
        timeSlot, index, (this.space.rentData.minTime<60?30:60), this.space.rentData.maxTime
      )
      if(answer){
        this.scheduleTimes = answer.scheduleTimes;
        this.timeSlotStart = answer.timeSlotStart;
        this.timeSlotEnd = answer.timeSlotEnd;
        timeSlot = answer.timeSlot;
      }
    }
  }

  guestCounterButton(type) {
    const check = this.guestCounter+1;
    if (type === 'plus' && check < this.space.rentData.capacity+1) {
      this.guestCounter++;
    } else if (type === 'minus' && this.guestCounter > 1) {
      this.guestCounter--;
    }
  }

  clearSlots(){
    this.timeSlotStart = {
      hour: null,
      date: null,
      index: null
    };
    this.timeSlotEnd = {
      hour: null,
      date: null,
      index: null
    };
  }

  async createReservation(){
    if(this.loading || !this.myReservation.scheduleDate || !this.timeSlotStart.date){
      return null;
    } else {
      try {
        this.loading = true;
        this.myReservation.startDate = this.timeSlotStart.date;
        this.myReservation.endDate = this.timeSlotEnd.date;
        this.myReservation.reservation.guests = this.guestCounter;
        this.myReservation.userUID = this.currentUser.uid;
        this.users.forEach((user:UserFormData) => {
          if(user.uid == this.selectedUserUID){this.selectedUser = user;}
        })
        if(this.reservation){
          await this.request.UpdateReservations(this.myReservation, this.currentUser);
        } else {
          await this.request.createReservations(this.myReservation);
        }
        this.vibe.endAction();
        this.alerts.showAlert( 'RESERVAS', 
        this.reservation ? 'Datos de reserva actualizados' : 'Nueva reserva solicitada', 'OK');
        this.loading = false;
        this.modal.dismiss(true);
        return 'done';
      } catch (error) {
        console.log(error);
        this.loading = false;
        return 'error';
      }
    }
  }

  async changeStateReserve(status){
    this.alerts.AlertConfirm((status === 'Aprobado'?'APROBAR':'CANCELAR'),'¿Seguro desea '+(status === 'Aprobado'?'aprobar':'cancelar')+ ' la reserva?')
    .then(answer => {
      if(answer){this.changeRequestStatus(status);}
    })
  }

  userChange(e){ this.selectedUserUID = e.detail.value; }

  cancelReservation(){
    this.myReservation = {
      scheduleDate: '',
      startDate: '',
      endDate: '',
      status: 'Solicitado',
      reservation: null,
      requestBy: null,
      userUID: null,
    }
    this.modal.dismiss(false)
  }

  async changeRequestStatus(status){
    try {
      this.loading = true;
      this.myReservation = this.reservation;
      this.myReservation.status = status;
      await this.request.UpdateReservations(this.reservation, this.currentUser);
      if(status === 'Aprobado'){
        await this.calendar.confirmReservation(this.myReservation);
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
