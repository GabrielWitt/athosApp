import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { UserPhoto } from '../models/images';
import { User, UserFormData } from '../models/user';
import { ImageUploaderService } from '../services/image-uploader.service';
import { FireAuthService } from '../services/modules/fire-auth.service';
import { ServicesController } from './services.controller';

@Injectable({
  providedIn: 'root'
})
export class UserController {
  user: User;
  currentUser: UserFormData

  edit = false;
  platform;

  constructor(
    private auth: FireAuthService,
    private upload: ImageUploaderService,
    private services: ServicesController,
  ) {  }


  loadUser(){
    return new Promise((resolve, reject) => {
      try {
        this.platform =  Capacitor.getPlatform();
        this.auth.getUser().then((user: any) =>{
          this.user = user.data;
          this.currentUser = user.user;
          this.services.loadServices();
          resolve(user);
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  currentUserData(){
    return new Promise((resolve, reject) => {
      try {
        this.platform =  Capacitor.getPlatform();
        this.auth.getUser().then((user: any) =>{
          this.user = user.data;
          this.currentUser = user.user;
          resolve(user);
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  changeProfileImage(image: UserPhoto, uploading){
    return new Promise((resolve, reject) => {
      try {
        const imageName = Date().toString()+'_'+this.user.uid;
        this.upload.uploadFile('profile',imageName, image.file,
        (progress)=>{ uploading = progress })
        .then((data:any) => {
          this.upload.deletePicture();
          this.auth.updateUser(this.currentUser.type, data.url).then(async done => {
            const newUpdate = {...this.user, photo: data.url}
            await this.auth.uploadUserForm(this.user.uid, newUpdate)
            this.currentUser = newUpdate;
            resolve('Image updated')
          })
        })
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }

  updateUser(updatedData: UserFormData){
    return new Promise((resolve, reject) => {
      try {
        this.auth.uploadUserForm(updatedData.uid, updatedData).then(async done => {
          this.loadUser();
          resolve('Data updated')
        })
      } catch (error) {
        console.log(error);
        reject(error)
      }
    });
  }

  editUser(){
    if(this.edit){
      this.edit = false;
    }else {
      this.edit = true;
    }
  }
}
