import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarItem, NoteService } from 'src/app/core/models/calendar';
import { attachmentOptions } from 'src/app/core/models/images';
import { UserFormData } from 'src/app/core/models/user';
import { ImageUploaderService } from 'src/app/core/services/image-uploader.service';
import { RequestsService } from 'src/app/core/services/modules/requests.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';

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

  statusList=['Regular','Sucio','Muy Sucio']

  initialStatus = 'Regular';
  noteService: NoteService = {
    text:''
  }
  newImage;
  progress = 0;

  constructor(
    private requests: RequestsService,
    private alerts: AlertsService,
    private modal: ModalController,
    private time: TimeHandlerModule,
    private images: AttachmentsService,
    private upload: ImageUploaderService,
  ) { }

  ngOnInit() {
    this.myTask = this.request;
    console.log(this.request)
    const spent = this.time.timeSpent(this.request.updatedAt)
    console.log(spent/60)
  }

  statusListener(e){this.initialStatus = e.detail.value; }

  noteListener(e){this.noteService.text = e.detail.value; }

  // IMAGE SYSTEM
  addPhoto() {
    const options: attachmentOptions = {
      currentRoute: '/news',
      height:null, width:null, pdf: false
    }
    this.images.presentImageOptions(options).then(imageObj => {
      if (imageObj[0] !== undefined){
        this.newImage  = imageObj[0];
      }
    });
  }

  uploadPhoto(){
    return new Promise<string>((resolve, reject) => {
      const imageName = Date().toString()+'_Service_'+this.request.service.name;
      this.upload.uploadFile('ServicesNotes',imageName, this.newImage.file,
      (progress)=>{ this.progress = progress })
      .then((data:any) => {
        this.upload.deletePicture();
        resolve(data.url);
      }).catch(error => { console.log(error); reject(error) })
    })
  }

  async changeStatus(status){
    try {
      this.loading = true;
      this.myTask.status = status;
      if(this.newImage){
        this.noteService.photo = await this.uploadPhoto();
      }
      if(this.noteService.text || this.noteService.photo){
        if(!this.myTask.notes){this.myTask.notes = []}
        this.myTask.notes.push(this.noteService);
      }
      console.log(this.myTask)
      if(this.request.status === 'Agendado'){this.myTask.service.comments.push['Se inicio con el area en estado: '+this.initialStatus]}
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
