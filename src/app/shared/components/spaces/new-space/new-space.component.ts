import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { attachmentOptions } from 'src/app/core/models/images';
import { Space } from 'src/app/core/models/spaces';
import { UserFormData } from 'src/app/core/models/user';
import { ImageUploaderService } from 'src/app/core/services/image-uploader.service';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { HapticsService } from 'src/app/shared/utilities/haptics.service';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';

@Component({
  selector: 'app-new-space',
  templateUrl: './new-space.component.html',
  styleUrls: ['./new-space.component.scss'],
})
export class NewSpaceComponent implements OnInit {
  defaultUser = 'assets/profile/ProfileBlank.png';
  defaultSpace = '../../../../../assets/blueprint.png';
  @Input() user: UserFormData;
  @Input() space: Space;

  mySpace: Space = {
    unitNumber: '',
    communityUID: '',
    description: '',
    bathrooms: 0,
    rooms: 0,
    squareMeters: 0,
    spaceType: null,
    type: null
  }

  newImage;
  progress = 0;
  communitiesList = [];
  spaceTypeList = ['privado', 'comunal']
  typeList = ['oficina','vivienda' , 'parqueo' , 'recepción' , 'bodega' , 'salón' , 'tienda' , 'terraza']

  loading = false;
  editSpaceForm = false;

  // RENT INFO
  dom = false;
  lun = true;
  mar = true;
  mie = true;
  jue = true;
  vie = true;
  sab = false;
  startTimeSelector1 = false;
  startTimeSelector2 = false;
  minTimeList = [
    {text: '30 mins.', unit:30},
    {text: '1 hora', unit:60},
    {text: '2:00 hrs.', unit:120},
  ]
  maxTimeList = [
    {text: '30 mins.', unit:30},
    {text: '1 hora', unit:60},
    {text: '1:30 hrs.', unit:90},
    {text: '2:00 hrs.', unit:120},
    {text: '4:00 hrs.', unit:240},
    {text: '6:00 hrs.', unit:360},
    {text: '8:00 hrs.', unit:480},
  ]

  constructor(
    private spaces: SpacesService,
    public modal: ModalController,
    private alerts: AlertsService,
    private images: AttachmentsService,
    private upload: ImageUploaderService,
    private vibe: HapticsService,
    private time: TimeHandlerModule
  ) { }

  ngOnInit() {
    this.vibe.startAction();
    if(this.space && this.user.type === 'administrador'){
      console.log(this.space)
      this.mySpace = this.space;
      if(this.space.rent){
        this.dom = this.mySpace.rentData.weekdays[0];
        this.lun = this.mySpace.rentData.weekdays[1];
        this.mar = this.mySpace.rentData.weekdays[2];
        this.mie = this.mySpace.rentData.weekdays[3];
        this.jue = this.mySpace.rentData.weekdays[4];
        this.vie = this.mySpace.rentData.weekdays[5];
        this.sab = this.mySpace.rentData.weekdays[6];
        this.setMaxTime(this.mySpace.rentData.minTime);
      }
    } else {
      this.spaces.readCommunityList()
      .then(communities => { this.communitiesList = communities; })
    }
  }

  editspace(){
    if(this.editSpaceForm){
      this.mySpace = this.space;
      this.editSpaceForm = false;
    } else {
      this.editSpaceForm= true;
    }
  }

  // LISTENRES
  unitListener(e){ this.mySpace.unitNumber = e.detail.value; }

  spaceType(e) { 
    this.mySpace.spaceType = e.detail.value;
    this.vibe.changeAction();
  }

  handleType(e) { 
    this.mySpace.type = e.detail.value; 
    this.vibe.changeAction();
  }

  handleArea(e) { 
    this.mySpace.floor = e.detail.value; 
    this.vibe.changeAction();
  }
  
  descriptionListener(e){ this.mySpace.description = e.detail.value; }

  metersListener(e) { this.mySpace.squareMeters = e.detail.value; }

  bathroomsListener(e) { this.mySpace.bathrooms = e.detail.value; }

  roomsListener(e) { this.mySpace.rooms = e.detail.value; }

  Listener0(e){ this.dom = e.detail.checked }

  Listener1(e){ this.lun = e.detail.checked }

  Listener2(e){ this.mar = e.detail.checked }

  Listener3(e){ this.mie = e.detail.checked }

  Listener4(e){ this.jue = e.detail.checked }

  Listener5(e){ this.vie = e.detail.checked }

  Listener6(e){ this.sab = e.detail.checked }

  rentListener(e) { this.mySpace.rentData.cost = e.detail.value; }

  capacityListener(e) { this.mySpace.rentData.capacity = e.detail.value; }
  
  checkBoxListener(e){
    if(e.detail.checked){
      this.mySpace.rent = true;
      this.mySpace.rentData = {
        weekdays:[false,true,true,true,true,true,false],
        starTime: this.time.getStartDate(),
        endTime: this.time.getEndDate(),
        cost: 0,
        capacity: 0,
        minTime: 30,
        maxTime: 120
      }
    } else { this.notRent() }
  }

  notRent(){
    this.mySpace.rent = false;
    delete this.mySpace.rentData;
    this.dom = false;
    this.lun = true;
    this.mar = true;
    this.mie = true;
    this.jue = true;
    this.vie = true;
    this.sab = false;
  }

  selectTime1(){
    this.startTimeSelector1 = !this.startTimeSelector1;
  }
  
  changeStartTime(event){
    this.startTimeSelector1 = false;
    if(event){
      this.mySpace.rentData.starTime = new Date(event).toISOString();
    } else {
      this.mySpace.rentData.starTime = this.time.getStartDate();
    }
  }

  selectTime2(){
    this.startTimeSelector2 = !this.startTimeSelector2;
  }
  
  changeEndTime(event){
    this.startTimeSelector2 = false;
    if(event){
      this.mySpace.rentData.endTime = new Date(event).toISOString();
    } else {
      this.mySpace.rentData.endTime = this.time.getEndDate();
    }
  }

  handleMinTime(e){
    this.mySpace.rentData.minTime = e.detail.value; 
    this.setMaxTime(e.detail.value);
  }
  
  handleMaxTime(e){
    this.mySpace.rentData.maxTime = e.detail.value; 
    console.log(this.mySpace.rentData)
  }

  setMaxTime(time){
    this.maxTimeList = [];
    const min = time === 30 ? 30 : 60;
    let maxTimes = 0;
    //max 8 hours -> 480 min
    for(let i = 1; maxTimes<480;i++){
      maxTimes = i * min;
      let label = '';
      if(maxTimes === 30){
        label = '30 mins.';
      }else if(maxTimes === 60){
        label = '1 hora';
      }else{
        let hours = parseInt(''+maxTimes/60)
        label = (maxTimes%60 === 0) ? hours+':00 hrs.' : hours+':30 hrs.'
      }
      this.maxTimeList.push({text: label, unit:maxTimes})
    }
  }

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
      currentRoute: '/spaces',
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
      const imageName = Date().toString()+'_Space_'+this.mySpace.unitNumber;
      this.upload.uploadFile('Spaces',imageName, this.newImage.file,
      (progress)=>{ this.progress = progress })
      .then((data:any) => {
        this.upload.deletePicture();
        resolve(data.url);
      }).catch(error => { console.log(error); reject(error) })
    })
  }

  async createSpace(){
    try {
      this.loading = true;
      this.mySpace.communityUID = this.communitiesList[0].uid;
      if(this.newImage){this.mySpace.photo =  await this.uploadPhoto();}
      if(this.mySpace.rent){
        this.mySpace.rentData.weekdays = [this.dom,this.lun,this.mar,this.mie,this.jue,this.vie,this.sab]
      }
      this.vibe.endAction();
      if(this.space){
        await this.spaces.UpdateSpaces(this.mySpace)
      } else {
        await this.spaces.createSpaces(this.mySpace)
      }
      this.alerts.showAlert( 'ESPACIOS', 
      this.space? 'Datos de '+ this.space.unitNumber + ' actualizados' : 'Nuevo espacio agregado', 'OK');
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