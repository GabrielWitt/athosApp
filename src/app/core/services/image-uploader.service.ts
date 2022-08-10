import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserPhoto } from '../models/images';
import { Filesystem } from '@capacitor/filesystem';
import { DOC_ORIENTATION, NgxImageCompressService} from 'ngx-image-compress';
import { ErrorHandlerService } from 'src/app/shared/utilities/error-handler.service';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable, uploadString } from "firebase/storage";
import { MyStoreService } from './my-store.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {
  photo: UserPhoto[] = [];
  data: any;
  
  imgResultBeforeCompress: string;
  imgResultAfterCompress:string;
  kbytes: number;

  private PHOTO_STORAGE: string = 'userPhotos';

  constructor(
    private router: Router,
    private store: MyStoreService,
    private error: ErrorHandlerService,
    private imageCompress: NgxImageCompressService,
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
          // console.log('Upload is ' + progress + '% done');
          progressState(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              // console.log('Upload is running');
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

  savePictures(photos: UserPhoto[], data, route, type, pdfName?:string){
    photos[0].route = route; 
    photos[0].type = type;
    photos[0].data = data;
    if(pdfName)(photos[0].pdf);
    this.store.setData(this.PHOTO_STORAGE,photos);
  }

  // Delete picture by removing it from reference data and the filesystem
  public async deletePicture() {
    this.photo = [];
    this.data = undefined;
    this.store.removeFile(this.PHOTO_STORAGE);
  }

  public loadSaved() {
    return new Promise(async resolve => {
      try {
        // Retrieve cached photo array data
        const photoList = await this.store.readFile(this.PHOTO_STORAGE);
        this.photo = photoList ? photoList : [];
        if(this.photo.length > 0){
          if(this.photo[0].route !== this.router.url){
            if(this.photo[0].route  === ''){  this.deletePicture(); resolve([]); 
            } else { this.photo[0].deploy = false; resolve(this.photo); }
          }else{
            this.photo[0].deploy = true;
            for(let i = 0; i < this.photo.length; i++) {
              if (this.photo[0].type == 'Filesystem'){
                let contents = await Filesystem.readFile({path: this.photo[i].webPath});
                this.photo[i].webPath = 'data:image/jpeg;base64,' + contents.data;
              }
              this.photo[i].file =  await this.generateBlob(this.photo[i].webPath);
            }
            resolve(this.photo);
            setTimeout(() => { this.deletePicture(); }, 2000);
          }
        } else { resolve([]); }
      } catch (error) { console.log(error);resolve([]);}
    });
  }

  async dataURLtoFile(base64, filename) {
    // tslint:disable-next-line: one-variable-per-declaration
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  getBase64Size(base64){
    return new Promise((resolve) => {
      this.calculateImageSize(base64).then(size => { resolve(size); })
      .catch((e) => { 
        console.error(e); 
        this.error.handle(e);
        resolve(0);
      });
    });
  }

  async calculateImageSize(base64String) {
    let padding;
    let inBytes;
    let base64StringLength;
    if (base64String.endsWith('==')) { padding = 2; }
    else if (base64String.endsWith('=')) { padding = 1; }
    else { padding = 0; }
    base64StringLength = base64String.length;
    inBytes = (base64StringLength / 4) * 3 - padding;
    this.kbytes = inBytes / 1000;
    return this.kbytes;
  }

  reduceImageSize(file){
    return new Promise((resolve,error) => {
      let oriented: DOC_ORIENTATION = -2
      this.imgResultBeforeCompress = file;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(file));
      try {
        this.imageCompress.compressFile(file, oriented, 50, 50)
        .then(result => {
          this.imgResultAfterCompress = result;
          resolve(result)
        });
      } catch (e){
        console.error(e)
        error(e)
      }
    })
  }

  generateBlob(base64Data): Promise<File> {
    return new Promise((resolve, error) => {
      this.dataURLtoFile(base64Data, new Date().toString() + '_mobileImg').then(savedImageFile => {
        const size = savedImageFile.size;
        if (size > 1048576) {
          this.reduceImageSize(base64Data).then(newSize => {
            this.dataURLtoFile(newSize, new Date().toString() + '_mobileImg').then(compressImageFile => {
              resolve(compressImageFile);
            }).catch(e => {console.log(e); error(e)});
          }).catch(e => {console.log(e); error(e)});
        }else{
          resolve(savedImageFile);
        }
      }).catch(e => {console.log(e); error(e)});
    })
  }
}
