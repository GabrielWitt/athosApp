import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable, uploadString } from "firebase/storage";
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {

  constructor(
    private error: ErrorHandlerService,
  ) { }

  uploadFile(folder: string, filename: string, file, progressState){
    return new Promise((resolve,reject) => {
      const storage = getStorage();
      // Create a reference to 'folder/image.format'
      const storageRef = ref(storage, folder + '/' + filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          progressState(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              reject({ message:this.error.handle(error), snapshot: null });
              break;
            case 'storage/canceled':
              // User canceled the upload
              reject({ message:this.error.handle(error), snapshot: null });
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              reject({ message:this.error.handle(error), snapshot: null });
              break;
            default:
              reject({ message:this.error.handle(error), snapshot: null });
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve({ message:'Archivo transferido', url: downloadURL })
          });
        }
      );
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log(snapshot);
      });
    });
  }

  uploadBase64(folder: string, filename: string, base64: string){
    return new Promise((resolve,reject) => {
      const storage = getStorage();
      // Create a reference to 'folder/image.format'
      const storageRef = ref(storage, folder + '/' + filename);
      uploadString(storageRef, base64, 'data_url').then((snapshot) => {
        console.log(snapshot);
        resolve({ message:'Archivo transferido', snapshot })
      })
      .catch((error) => { reject({ message:this.error.handle(error), snapshot: null }); });
    })
  }


}
