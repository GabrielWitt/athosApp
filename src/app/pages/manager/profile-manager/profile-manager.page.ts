import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, userFormData } from 'src/app/core/models/user';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/core/services/firebase.service';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';
import { attachmentOptions, UserPhoto } from 'src/app/core/models/images';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';
import { ImageUploaderService } from 'src/app/core/services/image-uploader.service';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.page.html',
  styleUrls: ['./profile-manager.page.scss'],
})
export class ProfileManagerPage implements OnInit {
  loading = false;
  edit = false;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';
  newImage;
  progress=0;

  user: User;
  userData: userFormData;

  registerForm: FormGroup;
  validationMessages

  constructor(
    private router: Router,
    private alerts: AlertsService,
    private upload: ImageUploaderService,
    private images: AttachmentsService,
    private formBuilder: FormBuilder,
    private auth: FirebaseAuthService,
    private verification: VerificationFuncService,
  ) { }

  ngOnInit() {
    this.validationMessages = {
      name:[ {type: 'required', message: ' Escribe tu nombre'},],
      lastName:[ {type: 'required', message: ' Escribe tu apellido'},],
      birthday:[ {type: 'required', message: ' Ingresa tu fecha de nacimiento'},]
    };
    this.registerForm = this.formBuilder.group({
      name:[null, { validators: [Validators.required, Validators.minLength(2)] }],
      lastName:[null, { validators: [Validators.required, Validators.minLength(3)] }],
      birthday:[null, { validators: [Validators.required] }]
    });
    this.checkUser().then(ok => {
      this.images.loadSaved().then((attachment: any) => {
        if (attachment.length && attachment[0].deploy){
          this.changeProfileImage(attachment[0]);
        }
      });
    });
  }

  EnterSubmit(evt, form){
    this.verification.EnterSubmit(evt,form,this.loading).then(answer => {
      if(answer){ console.log('Enter') }
    })
  }

  checkUser() {
    return new Promise((resolve, reject) => {
      this.loading = true;
      this.auth.getUser().then((user: User) =>{
        if(user){
          this.user = user;
          this.auth.readUserForm(user.uid).then((data:userFormData) => {
            this.userData = data;
            this.loading = false;
            resolve('user loaded');
          });
        }else{
          this.router.navigateByUrl('general');
          this.loading = false;
          reject('user not loaded');
        }
      });
    })
  }

  editForm(){
    if(!this.edit){
      this.edit = !this.edit;
      this.registerForm = this.formBuilder.group({
        name:[this.userData.name, { validators: [Validators.required, Validators.minLength(2)] }],
        lastName:[this.userData.lastName, { validators: [Validators.required, Validators.minLength(3)] }],
        birthday:[this.userData.birthDate, { validators: [Validators.required] }]
      });
    } else {
      const newValues = this.registerForm.value;
      const nameCheck = this.userData.name !== newValues.name;
      const lastNameCheck = this.userData.lastName !== newValues.lastName;
      const birthDateCheck = this.userData.birthDate !== newValues.birthday;
      if(nameCheck || lastNameCheck || birthDateCheck) {
        this.loading = true;
        this.auth.uploadUserForm(this.user.uid,newValues.name,newValues.lastName,newValues.birthday)
        .then(ok => { 
          this.edit = !this.edit;
          this.alerts.showAlert('PERFIL','Tus datos han sido actualizados','OK');
          this.checkUser();
          this.loading = false;
        })
      } else{
        this.edit = !this.edit;
      }
      
    }
  }

  // IMAGE SYSTEM
  addPhoto() {
    const options: attachmentOptions = {
      currentRoute: 'manager/profile',
      height:null, width:null, pdf: false
    }
    this.images.presentImageOptions(options).then(imageObj => {
      if (imageObj[0] !== undefined){
        this.changeProfileImage(imageObj[0]);
      }
    });
  }

  changeProfileImage(image: UserPhoto){
    this.loading = true;
    this.newImage = image;
    console.log(this.newImage);
    const imageName = Date().toString()+'_'+this.user.uid;
    this.upload.uploadFile('profile',imageName, image.file,
    (progress)=>{ this.progress = progress })
    .then((data:any) => {
      this.auth.updateUser(this.user.displayName,data.url).then(done => {
        this.alerts.showAlert('PERFIL','Tus imagen de perfil ha sido actualizada','OK');
        this.upload.deletePicture();
        this.newImage = null;
        this.checkUser();
        this.loading = false;
      })
    })
  }

  cerrarSesion(){
    this.loading = true;
    this.alerts.AlertConfirm('','¿Seguro que desea salir de su sesión?').then(answer => {
      if(answer){
        this.auth.signOut().then(done => {
          this.loading = false;
          this.router.navigateByUrl('general/login');
        });
      }else{
        this.loading = false;
      }
    })
  }

}
