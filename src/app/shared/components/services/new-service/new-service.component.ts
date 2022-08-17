import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { attachmentOptions } from 'src/app/core/models/images';
import { Service, ServiceTypeList } from 'src/app/core/models/services';
import { userFormData } from 'src/app/core/models/user';
import { ImageUploaderService } from 'src/app/core/services/image-uploader.service';
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
  @Input() user: userFormData;
  @Input() service: Service;

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

  typeList = [ 'Electrico', 'Plomeria', 'Construccion', 'Muebles', 'Jardineria', 'Limpieza' ]

  constructor(
    public modal: ModalController,
    private alerts: AlertsService,
    private images: AttachmentsService,
    private upload: ImageUploaderService,
    private vibe: HapticsService,
    private spaces: SpacesService,
  ) { }

  ngOnInit() {
    this.spaces.readCommunityList()
    .then(communities => { this.communitiesList = communities; })
  }

  createService(){}

  editService(){}

  // LISTENRES
  nameListener(e){ this.myService.name = e.detail.value; }

  serviceType(e) { 
    this.myService.serviceType = e.detail.value;
    this.vibe.changeAction();
  }
  
  descriptionListener(e){ this.myService.description = e.detail.value; }

  maintenanceListener(e){ 
    this.myService.maintenance = e.detail.checked;
    if(this.myService.maintenance){ this.myService.cost = 0; }
  }

  availableListener(e) { this.myService.available = e.detail.value; }

  priceListener(e) { this.myService.cost = e.detail.value; }

  estimatedTimeListener(e) { this.myService.estimatedTime = e.detail.value; }
  
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

  addAttachment() {
    const options: attachmentOptions = {
      currentRoute: '/services',
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

}
