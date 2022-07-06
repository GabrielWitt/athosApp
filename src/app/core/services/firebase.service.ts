import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, updateProfile, onAuthStateChanged, User, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { environment } from 'src/environments/environment';

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
    private router: Router
  ) { 
    this.auth.languageCode = 'es';
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) { this.user = user; } 
      else { this.router.navigateByUrl('general'); }
    })
  }

  currentUser() {
  }

  registerUser(email: string, password: string){
    return new Promise((resolve,reject) => {
      const auth = getAuth();
      console.log(email, password)
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        resolve(user);
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
          resolve('Se ha enviado un email de reseteo');
        })
        .catch((error) => { reject(this.error.handle(error)); });
    });
  }

  async getUser(){
    return new Promise((resolve, reject) => {
      console.log('start')
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) { 
            this.user = user;
            resolve(user);
          } else { 
            this.router.navigateByUrl('general'); 
            resolve(null);
          }
        })
      } catch (error) {
        reject(error)
      }
    })
    // The user object has basic properties such as display name, email, etc.
    /*
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid; 
    */
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
  
}
