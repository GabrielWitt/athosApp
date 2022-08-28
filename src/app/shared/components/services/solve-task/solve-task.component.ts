import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarItem } from 'src/app/core/models/calendar';
import { UserFormData } from 'src/app/core/models/user';
import { RequestsService } from 'src/app/core/services/modules/requests.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';

@Component({
  selector: 'app-solve-task',
  templateUrl: './solve-task.component.html',
  styleUrls: ['./solve-task.component.scss'],
})
export class SolveTaskComponent implements OnInit {
  @Input() currentUser: UserFormData;
  @Input() request: CalendarItem;
  loading = false;

  myTask: CalendarItem;

  constructor(
    private requests: RequestsService,
    private alerts: AlertsService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.myTask = this.request;
  }

  async confirmService(){
    try {
      this.loading = true;
      this.myTask.status = 'En Progreso';
      console.log(this.myTask)
      await this.requests.UpdateRequest(this.myTask, this.currentUser)
      this.alerts.showAlert('SERVICIOS','Su servico ha sido actualizado', 'OK');
      this.loading = false;
      this.modal.dismiss(true);
    } catch (error) {
      console.log(error)
      this.loading = false;
    }
  }

}
