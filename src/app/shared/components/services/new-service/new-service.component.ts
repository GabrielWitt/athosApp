import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { attachmentOptions } from 'src/app/core/models/images';
import { Service, ServiceTypeList } from 'src/app/core/models/services';
import { UserFormData } from 'src/app/core/models/user';
import { ImageUploaderService } from 'src/app/core/services/image-uploader.service';
import { MaintenanceService } from 'src/app/core/services/modules/maintenance.service';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { HapticsService } from 'src/app/shared/utilities/haptics.service';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss'],
})
export class NewServiceComponent implements OnInit {
  defaultUser = 'assets/profile/ProfileBlank.png';
  defaultSpace = '../../../../../assets/blueprint.png';
  @Input() user: UserFormData;
  @Input() service: Service;
  title = 'Nuevo Servicio';

  myService: Service = {
    communityUID: '',
    name: '',
    maintenance: null,
    serviceType: null,
    description: '',
    photo: null,
    terms: '',
    estimatedTime: 0,
    cost: 0,
    available: false,
    weekdays: []
  }

  // Avalibility INFO
  communitiesList = [];
  dom = false;
  lun = true;
  mar = true;
  mie = true;
  jue = true;
  vie = true;
  sab = false;
  newImage;
  progress = 0;
  loading = false;
  editServiceForm = false;
  serviceCheck = false;
  maintenanceCheck = false;

  typeList = this.services.typeList;
  timeEstimationList = [
    {text: '30 mins.', unit:30},
    {text: '1 hora', unit:60},
    {text: '1:30 hrs.', unit:90},
    {text: '2:00 hrs.', unit:120},
    {text: '4:00 hrs.', unit:240},
    {text: '6:00 hrs.', unit:360},
    {text: '8:00 hrs.', unit:480},
  ]

  constructor(
    public modal: ModalController,
    private alerts: AlertsService,
    private images: AttachmentsService,
    private upload: ImageUploaderService,
    private vibe: HapticsService,
    private spaces: SpacesService,
    private services: MaintenanceService
  ) { }

  ngOnInit() {
    console.log(this.typeList)
    this.spaces.readCommunityList()
    .then(communities => { this.communitiesList = communities; })
    if(this.service){
      this.myService = this.service;
      this.dom = this.service.weekdays[0];
      this.lun = this.service.weekdays[1];
      this.mar = this.service.weekdays[2];
      this.mie = this.service.weekdays[3];
      this.jue = this.service.weekdays[4];
      this.vie = this.service.weekdays[5];
      this.sab = this.service.weekdays[6];
    }
  }

  // LISTENRES
  nameListener(e){ this.myService.name = e.detail.value; }

  serviceType(e) { 
    this.myService.serviceType = e.detail.value;
    this.vibe.changeAction();
    this.typeList.forEach(item => {
      if(item.name === this.myService.serviceType){ this.myService.photo = item.image;}
    });
  }
  
  descriptionListener(e){ this.myService.description = e.detail.value; }

  termsListener(e){ this.myService.terms = e.detail.value; }

  maintenanceListener(e){ 
    this.myService.maintenance = e.detail.checked;
    if(this.myService.maintenance){ this.myService.cost = 0; this.title = 'Nuevo Mantenimiento' }
    else{this.title = 'Nuevo Servicio'}
  }

  availableListener(e) { this.myService.available = e.detail.value; }

  priceListener(e) { this.myService.cost = e.detail.value; }

  estimatedTimeListener(e) { this.myService.estimatedTime = e.detail.value;console.log(e.detail.value) }
  
  Listener0(e){ this.dom = e.detail.checked }

  Listener1(e){ this.lun = e.detail.checked }

  Listener2(e){ this.mar = e.detail.checked }

  Listener3(e){ this.mie = e.detail.checked }

  Listener4(e){ this.jue = e.detail.checked }

  Listener5(e){ this.vie = e.detail.checked }

  Listener6(e){ this.sab = e.detail.checked }

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
      const imageName = Date().toString()+'_Space_'+this.myService.name;
      this.upload.uploadFile('NoticeList',imageName, this.newImage.file,
      (progress)=>{ this.progress = progress })
      .then((data:any) => {
        this.upload.deletePicture();
        resolve(data.url);
      }).catch(error => { console.log(error); reject(error) })
    })
  }

  createService(){
    try {
      this.loading = true;
      this.myService.weekdays = [this.dom,this.lun,this.mar,this.mie,this.jue,this.vie,this.sab];
      this.myService.communityUID = this.communitiesList[0].uid;
      if(this.service){
        this.services.UpdateService(this.myService);
      } else {
        this.services.createService(this.myService);
      }
      this.alerts.showAlert( 'ESPACIOS', 
      this.service? 'Datos de '+ this.service.name + ' actualizado' : 'Nuevo '+this.myService.maintenance?'mantenimiento':'servicio'+' agregado', 'OK');
      this.loading = false;
      this.modal.dismiss(true);
      return 'done';
    } catch (error) {
      console.log(error);
      this.loading = false;
      return 'error';
    }
  }

  editService(){
    if(this.editServiceForm){
      this.editServiceForm = false; 
    }else{
      this.myService = this.service;
      this.dom = this.service.weekdays[0];
      this.lun = this.service.weekdays[1];
      this.mar = this.service.weekdays[2];
      this.mie = this.service.weekdays[3];
      this.jue = this.service.weekdays[4];
      this.vie = this.service.weekdays[5];
      this.sab = this.service.weekdays[6];
      this.editServiceForm = true; 
    }
  }

}
