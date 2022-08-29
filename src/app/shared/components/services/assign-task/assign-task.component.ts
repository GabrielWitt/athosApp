import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserController } from 'src/app/core/controller/user.controller';
import { CalendarItem, serviceSlot } from 'src/app/core/models/calendar';
import { UserFormData } from 'src/app/core/models/user';
import { CalendarService } from 'src/app/core/services/modules/calendar.service';
import { RequestsService } from 'src/app/core/services/modules/requests.service';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss'],
})
export class AssignTaskComponent implements OnInit {
  @Input() currentUser: UserFormData;
  @Input() request: CalendarItem;
  busySlots: CalendarItem[];
  staffList: UserFormData[];

  
  scheduleTimes;
  selectedUserUID;
  selectedStaff:UserFormData;
  showCalendar = false;
  loading = false;
  myTask: CalendarItem;
  allDays = [true,true,true,true,true,true,true];
  minDate = this.time.getStartDate()
  availableDays = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return this.allDays[utcDay];
  };
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

  constructor(
    private requests: RequestsService,
    private calendar: CalendarService,
    private alerts: AlertsService,
    private time: TimeHandlerModule,
    private usersServ: UsersService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.selectedUserUID = this.currentUser.uid;
    this.selectedStaff = this.currentUser;
    this.loadData();
  }

  async loadData(){
    try {
      this.myTask = this.request;
      this.staffList = await this.usersServ.readOnlyStaff();
      if(this.staffList.length === 0){this.staffList.push(this.currentUser)}
      console.log(this.busySlots)
      if(this.currentUser.type !== 'administrador'){
        this.allDays = this.request.service.preferredDays;
      }
    } catch (error) {
      console.log(error);
    }
  }

  userChange(e){
    this.selectedUserUID = e.detail.value;
    this.staffList.forEach((user:UserFormData) => {
      if(user.uid == this.selectedUserUID){this.selectedStaff = user;}
    })
  }

  async loadBusySlots(){
    this.busySlots = await this.calendar.readFutureServicesByUser(this.selectedStaff.uid, new Date().toISOString(),'>=');
    this.busySlots.sort((a,b)=>{
      if(a.startDate > b.startDate){return 1}
      if(a.startDate < b.startDate){return -1}
      return 0
    })
  }

  showCalendar1(){ this.showCalendar = !this.showCalendar; }
  
  changeScheduleTime(event){
    this.showCalendar = false;
    if(event){
      this.myTask.scheduleDate = new Date(event).toISOString();
      this.createScheduleList();
    } else {
      this.myTask.scheduleDate = this.time.getStartDate();
    }
  }

  async createScheduleList(){
    this.scheduleTimes = await this.time.getScheduleList(
      this.myTask.scheduleDate, 
      '2022-08-07T12:00:00.000Z', 
      '2022-08-07T22:00:00.000Z', 
      this.request.service.estimatedTime);
    return 'done';
  }

  async timeSlotClicked(index, timeSlot){
    if (this.scheduleTimes[index].disabled) {
      this.alerts.showAlert('Book Reservation','La hora de reservacion no está disponible. ');
    }else {
      const answer:any = await this.time.clickDaySlot(this.scheduleTimes, this.timeSlotStart, this.timeSlotEnd,
        timeSlot, index, this.request.service.estimatedTime, this.request.service.estimatedTime
      )
      if(answer){
        this.scheduleTimes = answer.scheduleTimes;
        this.timeSlotStart = answer.timeSlotStart;
        this.timeSlotEnd = answer.timeSlotEnd;
        timeSlot = answer.timeSlot;
      }
    }
  }

  async confirmService(){
    const text = this.time.geDateFullUTC(this.timeSlotStart.date) + 'de ' + this.timeSlotStart.hour;
    this.alerts.AlertConfirm('','¿Seguro desea agendar el servicio para '+ text +'?')
    .then(async answer => {
      if(answer){
        try {
          this.loading = true;
          this.myTask.status = 'Agendado';
          this.myTask.startDate = this.timeSlotStart.date;
          this.myTask.endDate = this.timeSlotEnd.date;
          this.myTask.employeeUID = this.selectedStaff.uid;
          this.myTask.employeePhoto = this.selectedStaff.photo;
          this.myTask.employeeFullName = this.selectedStaff.name + '' + this.selectedStaff.lastName;
          console.log(this.myTask)
          await this.requests.UpdateRequest(this.myTask, this.currentUser)
          await this.calendar.confirmService(this.myTask, this.selectedStaff);
          this.alerts.showAlert('SERVICIOS','Su servico ha sido actualizado', 'OK');
          this.loading = false;
          this.modal.dismiss(true);
        } catch (error) {
          console.log(error)
          this.loading = false;
        }
      }
    })
  }

}