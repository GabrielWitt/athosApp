import { Component, OnInit } from '@angular/core';
import { attachmentOptions } from 'src/app/core/models/images';
import { Community } from 'src/app/core/models/spaces';
import { ImageUploaderService } from 'src/app/core/services/image-uploader.service';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';

@Component({
  selector: 'app-community-admin',
  templateUrl: './community-admin.component.html',
  styleUrls: ['./community-admin.component.scss'],
})
export class CommunityAdminComponent implements OnInit {
  defaultUser = '../../../../../assets/Athos.png';
  communitiesList;
  myCommunity: Community;
  loading = true;
  edit = false;

  newImage
  uploading = 0;

  constructor(
    private spaces: SpacesService,
    private alerts: AlertsService,
    private images: AttachmentsService,
    private upload: ImageUploaderService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(){
    this.loading = true;
    await this.spaces.readCommunityList()
    .then((communities: any) => { 
      this.communitiesList = communities;
      this.myCommunity = this.communitiesList[0];
      console.log(this.myCommunity);
      this.loading = false;
     })
  }

  async doRefresh(refresh?){
    await this.loadData()
    if (refresh){ refresh.target.complete(); }
  }

  editCommunity(){
    this.edit = true;
  }

  cancelEditCommunity(){
    this.edit = false;
    this.myCommunity = this.communitiesList[0];
  }

  nameListener(e){ this.myCommunity.name = e.detail.value }

  addressListener(e){ this.myCommunity.address = e.detail.value }
  
  zipCodeListener(e){ this.myCommunity.zipCode = e.detail.value }

  cityListener(e){ this.myCommunity.city = e.detail.value }

  stateListener(e){ this.myCommunity.state = e.detail.value }

  countryListener(e){ this.myCommunity.country = e.detail.value }

  handleChange(e){this.myCommunity.propertyType = e.detail.value}

  updateCommunity(){
    this.loading = true;
    this.spaces.UpdateCommunity(this.myCommunity).then((data:Community)=> {
      this.myCommunity = data;
      this.loading = false;
    })
  }

  addPhoto() {
    const options: attachmentOptions = {
      currentRoute: 'manager/profile',
      height:null, width:null, pdf: false
    }
    this.images.presentImageOptions(options).then(async imageObj => {
      if (imageObj[0] !== undefined){
        this.loading = true;
        try {
          this.newImage = imageObj[0];
          const imageName = Date().toString()+'_'+this.myCommunity.uid;
          this.upload.uploadFile('profile',imageName, this.newImage.file,
          (progress)=>{ this.uploading = progress })
          .then((data:any) => {
            this.upload.deletePicture();
            this.myCommunity.photo = data.url;
            this.spaces.UpdateCommunity(this.myCommunity).then((data:Community)=> {
              this.myCommunity = data;
              this.alerts.showAlert('PERFIL','Tus imagen de perfil ha sido actualizada','OK');
              this.newImage = null;
              this.loading = false;
            })
          })
        } catch (error) {
          console.log(error);
          console.log('Error: uploading image');
          this.loading = false;
        }
      }
    });
  }

}
