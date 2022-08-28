import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { PushNotificationService } from 'src/app/shared/utilities/push-notification.service';
import { User, UserFormData } from '../../models/user';
import { FirestoreActionsService } from '../firestore-actions.service';
import { MyStoreService } from '../../../shared/utilities/my-store.service';
import { BiometricService } from 'src/app/shared/utilities/biometric.service';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  user;
  session;
  userInfo;
  credentials;

  constructor(
    private router: Router,
    private store: MyStoreService,
    public auth: AngularFireAuth,
    public FS: FirestoreActionsService,
    private error: ErrorHandlerService,
    private faio: BiometricService,
    private push: PushNotificationService
  ) { 
    this.session = 'session'; 
    this.userInfo = 'userInfo';
    this.credentials = 'credentials';
    this.auth.authState.subscribe(async (user) => {
      if (user) {
        await this.store.setData(this.session, user);
        this.readUserForm(user.uid).then(async (data:UserFormData) => {
          if(!this.user){
            this.push.registerPushService().then(async token => {
              let userData: UserFormData = {
                ...data,
                uid: user.uid, 
                email: user.email, 
                photo: user.photoURL,
                type: data.type
              }
              if(token){userData.token = token;}
              await this.uploadUserForm(userData.uid, userData);
              this.checkUser();
            })
          }
          this.user = this.setUser(user);
        });
      } else {
        this.store.removeFile('session');
        this.user = null;
      }
    });
  }

  setUser(userFB) {
    const user: User = {
      displayName: userFB.displayName,
      email: userFB.email,
      emailVerified: userFB.emailVerified,
      photoURL: userFB.photoURL,
      uid: userFB.uid,
    } 
    return user;
  }

  async getUser(){
    return new Promise((resolve, reject) => {
      try {
        this.store.readFile(this.session).then(session => {
          if (session) { 
            this.store.readFile(this.userInfo)
            .then(data => { resolve({user: session, data}); });
          } else { 
            this.router.navigateByUrl('general'); 
            resolve(null);
          }
        }).catch(error => { reject(error)})
      } catch (error) {
        console.log('error');
        reject(error)
      }
    })
  }

  async checkUser() {
    const currentModule = window.location.pathname.split('/')[1];
    this.getUser().then((data: any) =>{
      if(data.user && data.user.email){
        if(data.user.emailVerified){ 
          switch(data.user.displayName){
            case 'administrador':
              const route1 = 'administrator';
              if(currentModule !== route1){this.router.navigateByUrl(route1);}
              break;
            case 'residente':
              const route2 = 'client';
              if(currentModule !== route2){this.router.navigateByUrl(route2);}
              break;
            case 'empleado':
              const route3 = 'employee';
              if(currentModule !== route3){this.router.navigateByUrl(route3);}
              break;
            default:
              this.router.navigateByUrl('client');
              break;
          } 
        } else { 
          this.router.navigateByUrl('general/verify-email/'+data.user.email);
        }
      }else{
        console.log('no user');
      }
    }).catch(error => {
      console.log(error);
    });
  }

  login(email: string, password: string){
    return new Promise((resolve,reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        this.store.setData(this.credentials = 'credentials', {email, password});
        console.log('information sent')
        resolve('done');
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  registerUser(email: string, password: string){
    return new Promise((resolve,reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userDataForm: UserFormData = await this.FS.checkEmail(email)
        const updateUser = {...userDataForm,uid:user.uid}
        await this.updateUser(userDataForm.type, userDataForm.photo);
        this.uploadUserForm( user.uid, updateUser).then(async done => {
          await this.FS.deleteDocument('users',userDataForm.uid)
          resolve(user);
        }).catch((error) => { reject(this.error.handle(error)); });
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  verifyEmail(){
    return new Promise(async (resolve,reject) => {
      (await this.auth.currentUser).sendEmailVerification()
      .then(() => {
        // Email verification sent!
        resolve('Se ha enviado un email de verificación');
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  biometricsVerification() {
    return new Promise(async (resolve,reject) => {
      if(Capacitor.getPlatform() !== 'web'){
        this.faio.isAvailable().then(result => {
          if (!!result){
            this.faio.show(`Confirmar para continuar.`)
            .then((response: any) => {
              resolve(response);
            })
            .catch((error: any) => {
              console.error(`Unable to recognize fingerprint or faceID: ${error.error}`);
              reject(this.error.handle(error));
            });
          }
        }).catch(error => {
          console.warn('error: No fingerprint or faceId available', error );
          reject(this.error.handle(error));
        });
      }else{
        console.warn('No mobile device, Biometric Auth not required.');
        resolve(true);
      }
    });
  }

  async refreshUser(){
    return new Promise(async (resolve) => {
      try {
        this.store.readFile(this.credentials).then(async data => {
          if(data?.email && data?.password){
            this.biometricsVerification().then(async answer => {
              if(answer){
                this.login(data.email, data.password);
                resolve(true);
              } else { 
                await this.cleanSession();
                this.signOut();
                this.router.navigateByUrl('general'); 
                resolve(false);
              }
            })
            
          } else {
            await this.cleanSession();
            this.router.navigateByUrl('general'); 
            resolve(false);
          }
        });
      } catch (error) {
        console.log(error);
        await this.cleanSession();
        this.router.navigateByUrl('general'); 
        resolve(false);
      }
    });
  }

  async reCheckUser(){
    try {
      this.signOut().then(() => {
        this.store.readFile(this.credentials).then(async data => {
          if(data.email && data.password){
            this.login(data.email, data.password);
          } else {
            await this.cleanSession();
            this.router.navigateByUrl('general'); 
          }
        });
      })
    } catch (error) {
      console.log(error);
      await this.cleanSession();
      this.router.navigateByUrl('general'); 
    }
  }

  forgotPassword(email: string) {
    return new Promise((resolve,reject) => {
      this.auth.sendPasswordResetEmail(email)
        .then(() => {
          // Password reset email sent!
          resolve('Se ha enviado un email a su correo: ');
        })
        .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  updateUser(displayName: string, photoURL: string){
    return new Promise(async (resolve,reject) => {
      (await this.auth.currentUser).updateProfile({
        displayName,
        photoURL
      }).then(() => {
        // Profile updated!
        resolve('Tus datos se han actualizado');
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  upgradeUser(type: 'residente' | 'empleado' | 'administrador'){
    return new Promise(async (resolve,reject) => {
      (await this.auth.currentUser).updateProfile({ displayName: type })
      .then(() => {
        // Profile updated!
        resolve('Tu tipo de usuario se ha actualizado');
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  signOut(){
    return new Promise((resolve,reject) => {
      this.auth.signOut().then(async () => {
        await this.cleanSession();
        this.router.navigateByUrl('general'); 
        // Sign-out successful.
        resolve('Se ha cerrado sesión');
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  async cleanSession(){
    await this.store.removeFile(this.session);
    await this.store.removeFile(this.userInfo);
    await this.store.removeFile(this.credentials);
    this.user = null;
    return null;
  }

  //DATA_ON_FIRESTORE

  readUserForm(uid: string){
    return new Promise((resolve,reject) => {
      this.FS.readDocument('users',uid)
      .then((doc: UserFormData) => { resolve(doc); })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  uploadUserForm(uid: string, data: UserFormData){
    return new Promise((resolve,reject) => {
      this.FS.setNamedDocument('users',uid, data)
      .then(async (response: any) => { 
        if(this.user.uid === data.uid){ await this.store.setData(this.userInfo, data);}
        resolve('done');
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }
}
