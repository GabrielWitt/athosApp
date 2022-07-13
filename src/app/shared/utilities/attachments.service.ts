import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { Filesystem, ReadFileResult } from '@capacitor/filesystem';
import { Camera, CameraDirection, ImageOptions, CameraResultType, CameraSource, GalleryImageOptions, GalleryPhotos } from '@capacitor/camera';
import { attachmentOptions, UserPhoto } from 'src/app/core/models/images';
import { AlertsService } from './alerts';
import { ImageUploaderService } from 'src/app/core/services/image-uploader.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {
  imgHeight = undefined;
  imgWidth = undefined;
  currentRoute: string = '';
  image: string;
  base64Str: any;
  photo: UserPhoto[] = [];
  data: any;
  limit = 1;
  DemoPDF = 'data:application/pdf;base64,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686t5r5I8UmpS5lPDUo9lLqYFpXWno5Lj08/wZPhpfL6MlQzVmcMZRpmFmaOrrJftWfVLN+f35QFZS3P6hZQRT9TA0I94RbhWLZTdk32m5zInOOrpVfzVg/kGuRuz51c47Xm67Wotay1vXnqeZvyxta5rqtfD61PWN+7QXNDwYaJjd4bD28ibErd9EO+WX5Z/qvNUZt7ClQKNhaMb/He0looUcgvvL3VYWvdNtQ27rbB7Zbbq7Z/LGIXXSk2K64ofl/CKrnylflXlV8t7kjcMVhqU7p/J2Ynb+fILuddh8uky9aUje8O3N1ZTi8vKn+1Z+WeyxVWFXV7CXuFe0crAyq7q7Sqdla9r06uHq5xq2mvVa7dXju/j73vxn6X/W11KnXFde8OcA/cqfeu72zQaag4iDmYffBJY2Rj/9eMr5ubFJuKmz4c4h0aPRx6uK/Ztrm5RbmltBVuFbZOH4k7cv0bj2+624zb6ttp7cVHwVHh0affxn87csz/WO9xxvG277S/q+2gdBR1Qp25nbNdyV2j3THdQyf8TvT2OPR0fG/y/aGT6idrTsmeKj1NOF1wevHMmjNzZzPPzpxLOjfeu7L3/vno87f6QvoGL/hfuHTR6+L5ftf+M5ccL528bH/5xBXGla6rNlc7B6wHOn6w/qFj0Gaw85rtte7rdtd7hpYMnb7hfOPcTY+bF2/53ro6vHR4aCRi5M7tuNujd9h3pu6m3X1xL/vewv2ND9APih5KPax4pPyo4Uf9H9tHbUZPjXmMDTwOe3x/nDX+7Kesn95PFDwhP6mYVJtsnrKYOjntNX396bKnE88yny3MFP4s/XPtc73n3/3i8svAbPTsxAv+i8VfS14qvDz0yupV71zw3KPX6a8X5oveKLw5/Jbxtv9d1LvJhZz32PeVH/Q/9Hz0//hgMX1x8V/3hPP7y2IJQQplbmRzdHJlYW0KZW5kb2JqCjMgMCBvYmoKPDwKPj4gZW5kb2JqCjkgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EgCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIAovU3VidHlwZSAvVHlwZTEgCi9UeXBlIC9Gb250IAovTmFtZSAvSGVsdiAKPj4gZW5kb2JqCjEwIDAgb2JqCjw8Ci9DcmVhdGlvbkRhdGUgKEQ6MjAwODA2MTExNjU2MDMpIAovTW9kRGF0ZSAoRDoyMDA4MDYxMTE2NTYwMykgCi9Qcm9kdWNlciAoSWJleCBQREYgQ3JlYXRvciA0LjMuNi40LzUwMjUgWy5ORVQgMi4wXSkgCj4+IGVuZG9iagp4cmVmCjAgMTEKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwNjE2IDAwMDAwIG4gCjAwMDAwMDA1NTYgMDAwMDAgbiAKMDAwMDAwMzQyNCAwMDAwMCBuIAowMDAwMDAwNzA2IDAwMDAwIG4gCjAwMDAwMDA3NDEgMDAwMDAgbiAKMDAwMDAwMDIxNSAwMDAwMCBuIAowMDAwMDAwNDgwIDAwMDAwIG4gCjAwMDAwMDAwMjAgMDAwMDAgbiAKMDAwMDAwMzQ0NSAwMDAwMCBuIAowMDAwMDAzNTU5IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTEgCi9JbmZvIDEwIDAgUiAgCi9Sb290IDEgMCBSIAo+PgpzdGFydHhyZWYKMzY5OAolJUVPRgo='

  // Buttons Available
  CameraButton = {
    text: 'Camera',
    icon: 'camera-outline',
    handler: () => {
      return new Promise((resolve,error) => {
        this.getCameraImage().then((image: UserPhoto) => {
          this.photo.push(image);
          resolve(true);
        }).catch(e => { error(e);});
      });
    }
  }

  GalleryButton = {
    text: 'Gallery',
    icon: 'image-outline',
    handler: () => {
      return new Promise((resolve,error) => {
        this.getGalleryImage().then((image: UserPhoto[]) => {
          this.photo = image;
          resolve(true);
        }).catch(e => { error(e);});
      });
    }
  }

  PDFButton = {
    text: 'PDF',
    icon: 'document-attach-outline',
    handler: () => {
      return new Promise((resolve,error) => {
        this.pickPdf().then(async (PDF: UserPhoto) => {
          if (PDF.webPath === 'false'){
            error('false');
          }else{
            this.photo.push(PDF);
            resolve(true);
          }
        }).catch(e => { error(e);});
      });
    }
  }

  CancelButton = {
    text: 'Cancel',
    icon: 'close',
    role: 'cancel',
    handler: () => {
      this.actionSheetController.dismiss();
      return false;
    }
  }

  cameraButtons = [ this.CameraButton, this.GalleryButton, this.CancelButton ]
  pdfButtons = [ this.CameraButton, this.GalleryButton, this.PDFButton, this.CancelButton ]

  constructor(
    private router: Router,
    private documents: Chooser,
    private alerts: AlertsService,
    private processor: ImageUploaderService,
    public actionSheetController: ActionSheetController,
  ){}

  public async loadSaved(){ return await this.processor.loadSaved()}
  public async deletePicture(){ return await this.processor.deletePicture()}

  async presentImageOptions(options: attachmentOptions): Promise<any> {
    this.processor.deletePicture();
    this.imgHeight = options.height ? options.height : undefined;
    this.imgWidth = options.width ? options.width : undefined;
    this.limit = options.limit ? options.limit : 1;
    this.data = options.data ? options.data : null;
    this.currentRoute = this.router.url;
    this.photo = []; let buttons = [];

    if (options.pdf){ buttons = this.pdfButtons;} 
    else{ buttons = this.cameraButtons; }

    const actionSheet = await this.actionSheetController
    .create({ header: 'Take image from:', buttons:  buttons });
    await actionSheet.present();
    return actionSheet.onDidDismiss().then( data => {
      this.imgHeight = undefined;
      this.imgWidth = undefined;
      this.currentRoute = '';
      return this.photo;
    });
  }

  public async getCameraImage() {
    return new Promise(async (resolve,error) => {
      const OPTIONS: ImageOptions = {
        source: CameraSource.Camera, direction: CameraDirection.Rear,
        resultType : CameraResultType.Base64, quality: 100,
        saveToGallery: true, allowEditing: true,  promptLabelCancel: 'Cancel'
      };
      Camera.getPhoto(OPTIONS).then(capturedPhoto => {
        const img = 'data:image/jpeg;base64,' + capturedPhoto.base64String;
        this.processor.savePictures([{file: null, webPath: img}], this.data, this.currentRoute, 'Base64');
        this.processor.generateBlob(img).then(savedImageFile => {
          resolve({file: savedImageFile, webPath: img});
        });
      }).catch(e => error(e));
    });
  }

  public async getGalleryImage() {
    return new Promise(async (resolve,error) => {
      const OPTIONS: GalleryImageOptions = { limit: this.limit };
      Camera.pickImages(OPTIONS).then(async (capturedPhotos: GalleryPhotos) => {
        let photos = [];
        this.saveGallery(capturedPhotos.photos);
        for(let image of capturedPhotos.photos){
          let contents: ReadFileResult = await Filesystem.readFile({path: image.path});
          const img = 'data:image/jpeg;base64,' + contents.data;
          await this.processor.generateBlob(img).then(savedImageFile => {
            photos.push({file: savedImageFile, webPath: img});
          });
        }
        resolve(photos);
      }).catch(e => { console.log(e); error(e) });
    });
  }

  pickPdf(){
    return new Promise(async (resolve) => {
      if(Capacitor.getPlatform() === 'web'){

      this.alerts.AlertConfirm('PDF', 'Upload pdf?').then(answer => {
        if (answer){
          this.processor.savePictures([{file: null, webPath: this.DemoPDF, pdf: 'TestPDF.pdf'}], this.data, this.currentRoute, 'PDF');
          this.processor.generateBlob(this.DemoPDF).then(savedImageFile => {
            resolve({file: savedImageFile, webPath: this.DemoPDF, type: 'PDF', pdf: 'TestPDF.pdf'});
          }).catch((e) => { console.log('generateBlob'); console.error(e); resolve({webPath:false});  });
        } else {
          console.log('cancelPDF'); resolve({webPath:false});
        }

      })
      } else {
        this.documents.getFile('application/pdf').then(file => {
          const base64String = file.dataURI;
          this.processor.savePictures([{file: null, webPath: file.dataURI, pdf: file.name}], this.data, this.currentRoute, 'PDF');
          this.processor.generateBlob(base64String).then(savedImageFile => {
            resolve({file: savedImageFile, webPath: base64String, type: 'PDF', pdf: file.name});
          }).catch((e) => { console.log('generateBlob'); console.error(e); resolve({webPath:null});  });
        }).catch((error: any) => {console.log('getFile');console.error(error);resolve({webPath:false});});
      }
    })
  }

  saveGallery(photoList: any[]){
    let photos: UserPhoto[] = [];
    photoList.forEach(image => { photos.push({file: null, webPath: image.path}); })
    this.processor.savePictures(photos, this.data, this.currentRoute, 'Filesystem');
  }

}
