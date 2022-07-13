import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, userFormData } from '../models/user';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { environment } from 'src/environments/environment';
import { InitUser, login } from 'src/app/shared/session/main.actions';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  sendPasswordResetEmail, sendEmailVerification, updateProfile, 
  onAuthStateChanged, signOut } from "firebase/auth";
import { FirestoreActionsService } from './firestore-actions.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  app = initializeApp(environment.firebaseConfig);
  auth = getAuth();
  db = getFirestore(this.app);
  user: User;

  constructor(
    private error: ErrorHandlerService,
    private store: Store,
    private router: Router,
    private FS: FirestoreActionsService
  ) { 
    this.auth.languageCode = 'es';
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) { this.user = this.setUser(user); } 
      else { this.router.navigateByUrl('general'); }
    })
  }

  setUser(userFB) {
    const user: User = {
      accessToken: userFB.accessToken,
      displayName: userFB.displayName,
      email: userFB.email,
      emailVerified: userFB.emailVerified,
      isAnonymous: userFB.isAnonymous,
      phoneNumber: userFB.phoneNumber,
      photoURL: userFB.photoURL,
      uid: userFB.uid,
    } 
    return user;
  }

  registerUser(email: string, password: string, name: string, lastName: string, birthDate: Date){
    return new Promise((resolve,reject) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.createUserForm(user.uid, name, lastName, birthDate).then(done => {resolve(user);})
        .catch((error) => { reject(this.error.handle(error)); });
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  verifyEmail(){
    return new Promise((resolve,reject) => {
      const auth = getAuth();
      sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        resolve('Se ha enviado un email de verificación');
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  login(email: string, password: string){
    return new Promise((resolve,reject) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  forgotPassword(email: string) {
    return new Promise((resolve,reject) => {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          resolve('Se ha enviado un email a su correo: ');
        })
        .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  async getUser(){
    return new Promise((resolve, reject) => {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, (userData) => {
          if (userData) { 
            this.user = this.setUser(userData);
            resolve(this.user);
          } else { 
            this.router.navigateByUrl('general'); 
            resolve(null);
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  updateUser(displayName: string, photoURL: string){
    return new Promise((resolve,reject) => {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName,
        photoURL
      }).then(() => {
        // Profile updated!
        resolve('Tus datos se han actualizado');
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  signOut(){
    return new Promise((resolve,reject) => {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        resolve('Se ha cerrado sesión');
      })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  //DATA_ON_FIRESTORE

  readUserForm(uid: string){
    return new Promise((resolve,reject) => {
      this.FS.readDocument('users',uid)
      .then(doc => { resolve(doc) })
      .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  createUserForm(uid: string, name: string, lastName: string, birthDate: Date){
    return new Promise((resolve,reject) => {
      this.updateUser('employee', null).then(ok => {
        const userForm: userFormData = { name, lastName, birthDate }
        this.FS.setNamedDocument('users',uid, userForm)
        .then(data => { resolve('done'); })
        .catch((error) => { reject(this.error.handle(error)); });
      }).catch((error) => { reject(this.error.handle(error)); });
    });
  }

  updateUserForm(uid: string){

  }
  
}
