import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { attachmentOptions } from 'src/app/core/models/images';
import { Comments, Notice } from 'src/app/core/models/notice';
import { ShortUser, UserFormData } from 'src/app/core/models/user';
import { ImageUploaderService } from 'src/app/core/services/image-uploader.service';
import { NoticeService } from 'src/app/core/services/modules/notice.service';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { AlertsService } from '../../utilities/alerts';
import { VerificationFuncService } from '../../utilities/verificationFunc';

@Component({
  selector: 'app-new-notice',
  templateUrl: './new-notice.component.html',
  styleUrls: ['./new-notice.component.scss'],
})
export class NewNoticeComponent implements OnInit {
  @ViewChild( IonContent, { static: false }) content: IonContent;
  public scroll = false;
  private fullHeight = 0;
  public showScroll = 0;
  defaultUser = 'assets/profile/ProfileBlank.png';
  @Input() user: UserFormData;
  @Input() notice: Notice;
  writer: ShortUser;
  typeList = []
  myNotice: Notice = {
    title: '',
    type: null,
    description: '',
    photo: '',
    writer: null,
    comments: [],
    likes: [],
  }

  loading = true;
  editNoticeForm = false;
  myLike = false;
  progress = 0;
  newImage;
  noticeType;

  // Comments
  sending = false;
  newCommentImage;
  newComment: Comments = {
    text: '',
    user: null
  }

  constructor(
    private notices: NoticeService,
    public modal: ModalController,
    private extra: VerificationFuncService,
    private alerts: AlertsService,
    private images: AttachmentsService,
    private upload: ImageUploaderService,
  ) { }

  ngOnInit() {
    this.loadTypes().then(() => {
      this.loading = false;
      if(this.notice){
        this.myNotice = this.notice;
        this.noticeType = this.notice.type.name;
        this.notice.likes.forEach(like => { if(like === this.user.uid){ this.myLike = true; }})
      }else{
        this.extra.createShortUser(this.user)
        .then(writer => {this.myNotice.writer = writer});
      }
    })
  }
  
  async loadTypes(){
    try {
      this.typeList = await this.notices.getNoticeType();
      return 'done';
    } catch (error) {
      console.log(error);
      return 'error'
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
      const imageName = Date().toString()+'_Notice_'+this.myNotice.title;
      this.upload.uploadFile('NoticeList',imageName, this.newImage.file,
      (progress)=>{ this.progress = progress })
      .then((data:any) => {
        this.upload.deletePicture();
        resolve(data.url);
      }).catch(error => { console.log(error); reject(error) })
    })
  }

  // LISTENRES
  handleType(e) {
    this.typeList.forEach(type => {
      if(type.name === e.detail.value){
        this.myNotice.type = type;
      }
    })
  }

  titleListener(e){
    this.myNotice.title = e.detail.value;
  }
  
  descriptionListener(e){
    this.myNotice.description = e.detail.value;
  }

  editNotice(){
    if(this.editNoticeForm){
      this.myNotice = this.notice;
      this.editNoticeForm = false;
    } else {
      this.editNoticeForm= true;
    }
  }

  async createNotice(){
    try {
      this.loading = true;
      if(this.newImage){this.myNotice.photo =  await this.uploadPhoto();}
      console.log(this.myNotice);
      if(this.notice){
        await this.notices.UpdateNotice(this.myNotice);
      }else{
        await this.notices.createNotice(this.myNotice);
      }
      this.alerts.showAlert( 'ANUNCIOS', 
      this.notice? 'Datos de '+ this.myNotice.title + ' actualizados' : 'Nuevo anuncio agregado', 'OK');
      this.loading = false;
      this.modal.dismiss(true);
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  commentListener(e){
    this.newComment.text = e.detail.value;
  }

  async pressSend(){
    this.sending = true;
    this.myNotice = this.notice;
    try {
      this.newComment.user  = {
        uid: this.user.uid,
        photo: this.user.photo,
        email: this.user.email,
        name: this.user.name + ' ' + this.user.lastName
      }
      this.myNotice.comments.push(this.newComment);
      await this.notices.UpdateNotice(this.myNotice);
      setTimeout(() => {
        this.sending = false;
      }, 5000);
      this.notice.comments = this.myNotice.comments;
      this.newComment = {
        text: '',
        user: null
      }
    } catch (error) {
      console.log(error);
      this.sending = false;
    }
  }

  checkScroll(scroll, content) {
    this.content = content;
    if (this.fullHeight < scroll.detail.currentY){ this.fullHeight = scroll.detail.currentY; }
    this.showScroll = (this.fullHeight - scroll.detail.scrollTop);
  }

  scrollDown() {
    if (this.content.scrollToBottom){ setTimeout(() => { this.content.scrollToBottom(400); setTimeout(() => { this.showScroll = 1; }, 1000); } , 500); }
  }

}
