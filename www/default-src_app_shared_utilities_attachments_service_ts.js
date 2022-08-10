"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_shared_utilities_attachments_service_ts"],{

/***/ 36071:
/*!*********************************************************!*\
  !*** ./src/app/core/services/image-uploader.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageUploaderService": () => (/* binding */ ImageUploaderService)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _capacitor_filesystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/filesystem */ 91662);
/* harmony import */ var ngx_image_compress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-image-compress */ 32568);
/* harmony import */ var src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/utilities/error-handler.service */ 43570);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/storage */ 19058);
/* harmony import */ var _my_store_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./my-store.service */ 30259);









let ImageUploaderService = class ImageUploaderService {
  constructor(router, store, error, imageCompress) {
    this.router = router;
    this.store = store;
    this.error = error;
    this.imageCompress = imageCompress;
    this.photo = [];
    this.PHOTO_STORAGE = 'userPhotos';
  }

  uploadFile(folder, filename, file, progressState) {
    return new Promise((resolve, reject) => {
      const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.getStorage)(); // Create a reference to 'folder/image.format'

      const storageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.ref)(storage, folder + '/' + filename);
      const uploadTask = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.uploadBytesResumable)(storageRef, file); // Listen for state changes, errors, and completion of the upload.

      uploadTask.on('state_changed', snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100; // console.log('Upload is ' + progress + '% done');

        progressState(progress);

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;

          case 'running':
            // console.log('Upload is running');
            break;
        }
      }, error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            reject({
              message: this.error.handle(error),
              snapshot: null
            });
            break;

          case 'storage/canceled':
            // User canceled the upload
            reject({
              message: this.error.handle(error),
              snapshot: null
            });
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            reject({
              message: this.error.handle(error),
              snapshot: null
            });
            break;

          default:
            reject({
              message: this.error.handle(error),
              snapshot: null
            });
            break;
        }
      }, () => {
        // Upload completed successfully, now we can get the download URL
        (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.getDownloadURL)(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL);
          resolve({
            message: 'Archivo transferido',
            url: downloadURL
          });
        });
      });
      (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.uploadBytes)(storageRef, file).then(snapshot => {
        console.log(snapshot);
      });
    });
  }

  uploadBase64(folder, filename, base64) {
    return new Promise((resolve, reject) => {
      const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.getStorage)(); // Create a reference to 'folder/image.format'

      const storageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.ref)(storage, folder + '/' + filename);
      (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.uploadString)(storageRef, base64, 'data_url').then(snapshot => {
        console.log(snapshot);
        resolve({
          message: 'Archivo transferido',
          snapshot
        });
      }).catch(error => {
        reject({
          message: this.error.handle(error),
          snapshot: null
        });
      });
    });
  }

  savePictures(photos, data, route, type, pdfName) {
    photos[0].route = route;
    photos[0].type = type;
    photos[0].data = data;
    if (pdfName) photos[0].pdf;
    this.store.setData(this.PHOTO_STORAGE, photos);
  } // Delete picture by removing it from reference data and the filesystem


  deletePicture() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.photo = [];
      _this.data = undefined;

      _this.store.removeFile(_this.PHOTO_STORAGE);
    })();
  }

  loadSaved() {
    var _this2 = this;

    return new Promise( /*#__PURE__*/function () {
      var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve) {
        try {
          // Retrieve cached photo array data
          const photoList = yield _this2.store.readFile(_this2.PHOTO_STORAGE);
          _this2.photo = photoList ? photoList : [];

          if (_this2.photo.length > 0) {
            if (_this2.photo[0].route !== _this2.router.url) {
              if (_this2.photo[0].route === '') {
                _this2.deletePicture();

                resolve([]);
              } else {
                _this2.photo[0].deploy = false;
                resolve(_this2.photo);
              }
            } else {
              _this2.photo[0].deploy = true;

              for (let i = 0; i < _this2.photo.length; i++) {
                if (_this2.photo[0].type == 'Filesystem') {
                  let contents = yield _capacitor_filesystem__WEBPACK_IMPORTED_MODULE_1__.Filesystem.readFile({
                    path: _this2.photo[i].webPath
                  });
                  _this2.photo[i].webPath = 'data:image/jpeg;base64,' + contents.data;
                }

                _this2.photo[i].file = yield _this2.generateBlob(_this2.photo[i].webPath);
              }

              resolve(_this2.photo);
              setTimeout(() => {
                _this2.deletePicture();
              }, 2000);
            }
          } else {
            resolve([]);
          }
        } catch (error) {
          console.log(error);
          resolve([]);
        }
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  dataURLtoFile(base64, filename) {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // tslint:disable-next-line: one-variable-per-declaration
      const arr = base64.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, {
        type: mime
      });
    })();
  }

  getBase64Size(base64) {
    return new Promise(resolve => {
      this.calculateImageSize(base64).then(size => {
        resolve(size);
      }).catch(e => {
        console.error(e);
        this.error.handle(e);
        resolve(0);
      });
    });
  }

  calculateImageSize(base64String) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let padding;
      let inBytes;
      let base64StringLength;

      if (base64String.endsWith('==')) {
        padding = 2;
      } else if (base64String.endsWith('=')) {
        padding = 1;
      } else {
        padding = 0;
      }

      base64StringLength = base64String.length;
      inBytes = base64StringLength / 4 * 3 - padding;
      _this3.kbytes = inBytes / 1000;
      return _this3.kbytes;
    })();
  }

  reduceImageSize(file) {
    return new Promise((resolve, error) => {
      let oriented = -2;
      this.imgResultBeforeCompress = file;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(file));

      try {
        this.imageCompress.compressFile(file, oriented, 50, 50).then(result => {
          this.imgResultAfterCompress = result;
          resolve(result);
        });
      } catch (e) {
        console.error(e);
        error(e);
      }
    });
  }

  generateBlob(base64Data) {
    return new Promise((resolve, error) => {
      this.dataURLtoFile(base64Data, new Date().toString() + '_mobileImg').then(savedImageFile => {
        const size = savedImageFile.size;

        if (size > 1048576) {
          this.reduceImageSize(base64Data).then(newSize => {
            this.dataURLtoFile(newSize, new Date().toString() + '_mobileImg').then(compressImageFile => {
              resolve(compressImageFile);
            }).catch(e => {
              console.log(e);
              error(e);
            });
          }).catch(e => {
            console.log(e);
            error(e);
          });
        } else {
          resolve(savedImageFile);
        }
      }).catch(e => {
        console.log(e);
        error(e);
      });
    });
  }

};

ImageUploaderService.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router
}, {
  type: _my_store_service__WEBPACK_IMPORTED_MODULE_4__.MyStoreService
}, {
  type: src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_2__.ErrorHandlerService
}, {
  type: ngx_image_compress__WEBPACK_IMPORTED_MODULE_6__.NgxImageCompressService
}];

ImageUploaderService = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Injectable)({
  providedIn: 'root'
})], ImageUploaderService);


/***/ }),

/***/ 30259:
/*!***************************************************!*\
  !*** ./src/app/core/services/my-store.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MyStoreService": () => (/* binding */ MyStoreService)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _capacitor_preferences__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/preferences */ 85191);




let MyStoreService = class MyStoreService {
  constructor() {}

  setData(filename, data) {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const lockData = JSON.stringify(data);
        yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_1__.Preferences.set({
          key: filename,
          value: lockData
        });
        return 'ok';
      } catch (error) {
        console.log(error);
        return 'data not saved';
      }
    })();
  }

  readFile(filename) {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const {
          value
        } = yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_1__.Preferences.get({
          key: filename
        });
        return JSON.parse(value);
      } catch (error) {
        console.log(error);
        return 'file not found';
      }
    })();
  }

  removeFile(filename) {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_1__.Preferences.remove({
          key: filename
        });
        return 'file removed';
      } catch (error) {
        console.log(error);
        return 'file not found';
      }
    })();
  }

};

MyStoreService.ctorParameters = () => [];

MyStoreService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], MyStoreService);


/***/ }),

/***/ 80884:
/*!********************************************!*\
  !*** ./src/app/shared/utilities/alerts.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlertsService": () => (/* binding */ AlertsService)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _haptics_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./haptics.service */ 54387);





let AlertsService = class AlertsService {
  constructor(alertController, vibe) {
    this.alertController = alertController;
    this.vibe = vibe;
  }

  showAlert(title, message, buttonOk) {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const button = buttonOk ? [buttonOk] : ['OK'];
      const alert = yield _this.alertController.create({
        cssClass: 'my-custom-class',
        header: title,
        message,
        buttons: button,
        mode: 'ios'
      });

      _this.vibe.vibrate();

      yield alert.present();
      yield alert.onDidDismiss();
      return;
    })();
  }

  AlertConfirm(title, message, yes, no) {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let answer = false;
      const alertConfirm = yield _this2.alertController.create({
        cssClass: 'my-custom-class',
        header: title,
        message,
        mode: 'ios',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            answer = false;
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            answer = true;
          }
        }]
      });
      yield alertConfirm.present();
      yield alertConfirm.onDidDismiss();

      _this2.vibe.mediumVibe();

      return answer;
    })();
  }

};

AlertsService.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.AlertController
}, {
  type: _haptics_service__WEBPACK_IMPORTED_MODULE_1__.HapticsService
}];

AlertsService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
  providedIn: 'root'
})], AlertsService);


/***/ }),

/***/ 15909:
/*!*********************************************************!*\
  !*** ./src/app/shared/utilities/attachments.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttachmentsService": () => (/* binding */ AttachmentsService)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/core */ 26549);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _awesome_cordova_plugins_chooser_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @awesome-cordova-plugins/chooser/ngx */ 89519);
/* harmony import */ var _capacitor_filesystem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/filesystem */ 91662);
/* harmony import */ var _capacitor_camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor/camera */ 4241);
/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./alerts */ 80884);
/* harmony import */ var src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/image-uploader.service */ 36071);











let AttachmentsService = class AttachmentsService {
  constructor(router, documents, alerts, processor, actionSheetController) {
    var _this = this;

    this.router = router;
    this.documents = documents;
    this.alerts = alerts;
    this.processor = processor;
    this.actionSheetController = actionSheetController;
    this.imgHeight = undefined;
    this.imgWidth = undefined;
    this.currentRoute = '';
    this.photo = [];
    this.limit = 1;
    this.DemoPDF = 'data:application/pdf;base64,JVBERi0xLjQKJcOIw4HDhMOXDQo4IDAgb2JqCjw8Ci9GaWx0ZXIgL0ZsYXRlRGVjb2RlIAovTGVuZ3RoIDEyMSAKPj4gc3RyZWFtCnicVYuxCsIwFEX3fsUZ06HxvdrktasgiJuQTdxMdYgUM+jvWxdBLtx77nB4In6M9tf1hn1JsXUnCwxh64NGOhPxqgM1M3Nq2CU2h1xeaE+aUWSN/vQo3mQiPc7unktZWrreRty7RcUtdf0aXLm2F9KxgX1qPvc2IBcKZW5kc3RyZWFtCmVuZG9iago2IDAgb2JqCjw8Ci9Hcm91cCA8PAovUyAvVHJhbnNwYXJlbmN5IC9LIHRydWUgL0kgdHJ1ZSAvQ1MgNCAwIFIgID4+ICAKL0NvbnRlbnRzIDggMCBSICAKL1Jlc291cmNlcyA8PAovRm9udCA8PAovSGVsdiA5IDAgUiAgPj4gIC9Db2xvclNwYWNlIDw8Ci9EZWZhdWx0UkdCIDQgMCBSICA+PiAgL1Byb2NTZXQgWy9QREYgL1RleHRdID4+ICAKL1R5cGUgL1BhZ2UgCi9QYXJlbnQgNyAwIFIgIAovTWVkaWFCb3ggWzAgMCA1OTUuMjM4IDg0MS44MzZdIAo+PiBlbmRvYmoKNyAwIG9iago8PAovS2lkcyBbNiAwIFJdIAovVHlwZSAvUGFnZXMgCi9Db3VudCAxIAovUGFyZW50IDIgMCBSICAKPj4gZW5kb2JqCjIgMCBvYmoKPDwKL0tpZHMgWzcgMCBSXSAKL1R5cGUgL1BhZ2VzIAovQ291bnQgMSAKPj4gZW5kb2JqCjEgMCBvYmoKPDwKL091dGxpbmVzIDMgMCBSICAKL1BhZ2VzIDIgMCBSICAKL1R5cGUgL0NhdGFsb2cgCi9QYWdlTW9kZSAvVXNlTm9uZSAKPj4gZW5kb2JqCjQgMCBvYmoKWy9JQ0NCYXNlZCA1IDAgUiBdIAplbmRvYmoKNSAwIG9iago8PAovRmlsdGVyIC9GbGF0ZURlY29kZSAKL04gMyAKL0xlbmd0aCAyNjAyIAo+PiBzdHJlYW0KeJwBHwrg9XicnZZnVFTXFsfPvXd6oc0wdBh6720A6b1Jr6IyzAwwlAGHGRDFhogKRBQRaYogQQEDRkORWBHFQlBUsBuQIKDEYBRRUXkzulbiy8t7L8n/w72/tc/e555dzloXAJJPAJeXAUsBkM4T8EO93ejRMbF07CCAAR5ggDkATFZWZmCYVzgQydfTnZ4lcgL/ptcjABK/bxr7BNPp4O9JmpXJFwAABYvYks3JYom4QMRpOYJMsX1WxNSEVDHDKDHzRQcUsbyYkz6z0Sefz+wiZnY6jy1i8Zkz2elsMfeJeFu2kCNiJEDEhdlcTo6Ib4lYK02YzhXxG3FsOoeZBQCKJLYLOKxkEZuJmMQPD3UX8RIAcKSkLzjhCxZwVgvESblnZObyuUnJAroeS59ubmfHoPtwctI4AoFxMJOVyuSz6e4Z6ZlMXi4An3P+JBlxbemiItuY29nYGFuYmH9RqP+5+Bcl7u1nehnyqWcQbeB325/5ZTQAwJgT1Wbn77aEKgC6tgAgf+93m9YBACRFfeu89kU+NPG8JAsEmfampjk5OSZcDstEXNDf9H8d/oK++J6JeLvfykP34CQyhWkCurhurIy0DCGfnpXJZHHoxn8c4n8c+OfnMArlJHL4HJ4oIlI0ZVxekqjdPDZXwM3g0bm8/9bEfxj2B32ea5EojR8BdaUJkLpGBcjPAwBFIQIkbr9oBfqtbwH4SCC+eVFqk5/n/pOg/9wVLhU/srhJn+LcQ8PpLCE/+/Oa+FoCNCAASUAFCkAVaAI9YAwsgC1wAC7AE/iBIBAOYsAKwALJIB3wQQ7IA5tAISgGO8EeUA3qQCNoBm3gGOgCJ8E5cBFcBdfBMLgPRsEEeAZmwWuwAEEQFiJDFEgBUoO0IUPIAmJATpAnFACFQjFQPJQE8SAhlAdthoqhMqgaqoeaoW+hE9A56DI0BN2FxqBp6FfoHYzAJJgKq8A6sCnMgF1hfzgcXg4nwavgNXABvAOuhBvgI3AnfA6+Cg/Do/AzeA4BCBGhIeqIMcJA3JEgJBZJRPjIeqQIqUAakDakB+lHbiKjyAzyFoVBUVB0lDHKAeWDikCxUKtQ61ElqGrUYVQnqg91EzWGmkV9RJPRymhDtD3aFx2NTkLnoAvRFegmdAf6AnoYPYF+jcFgaBhdjC3GBxODScGsxZRg9mHaMWcxQ5hxzBwWi1XAGmIdsUFYJlaALcRWYY9gz2BvYCewb3BEnBrOAueFi8XxcPm4ClwL7jTuBm4St4CXwmvj7fFBeDY+F1+Kb8T34K/hJ/ALBGmCLsGREE5IIWwiVBLaCBcIDwgviUSiBtGOGELkEjcSK4lHiZeIY8S3JBmSAcmdFEcSknaQDpHOku6SXpLJZB2yCzmWLCDvIDeTz5Mfkd9IUCRMJHwl2BIbJGokOiVuSDyXxEtqS7pKrpBcI1kheVzymuSMFF5KR8pdiim1XqpG6oTUbak5aYq0uXSQdLp0iXSL9GXpKRmsjI6MpwxbpkDmoMx5mXEKQtGkuFNYlM2URsoFygQVQ9Wl+lJTqMXUb6iD1FlZGVkr2UjZ1bI1sqdkR2kITYfmS0ujldKO0UZo7+RU5FzlOHLb5drkbsjNyyvJu8hz5Ivk2+WH5d8p0BU8FVIVdil0KTxURCkaKIYo5ijuV7ygOKNEVXJQYikVKR1TuqcMKxsohyqvVT6oPKA8p6Kq4q2SqVKlcl5lRpWm6qKaolquelp1Wo2i5qTGVStXO6P2lC5Ld6Wn0SvpffRZdWV1H3Wher36oPqChq5GhEa+RrvGQ02CJkMzUbNcs1dzVktNK1ArT6tV6542Xpuhnay9V7tfe15HVydKZ6tOl86Urryur+4a3VbdB3pkPWe9VXoNerf0MfoM/VT9ffrXDWADa4NkgxqDa4awoY0h13Cf4ZAR2sjOiGfUYHTbmGTsapxt3Go8ZkIzCTDJN+kyeW6qZRprusu03/SjmbVZmlmj2X1zGXM/83zzHvNfLQwsWBY1FrcsyZZelhssuy1fWBlacaz2W92xplgHWm+17rX+YGNrw7dps5m21bKNt621vc2gMoIZJYxLdmg7N7sNdift3trb2Avsj9n/4mDskOrQ4jC1RHcJZ0njknFHDUemY73jqBPdKd7pgNOos7oz07nB+bGLpgvbpcll0lXfNcX1iOtzNzM3vluH27y7vfs697MeiIe3R5HHoKeMZ4RntecjLw2vJK9Wr1lva++13md90D7+Prt8bvuq+LJ8m31n/Wz91vn1+ZP8w/yr/R8HGATwA3oC4UC/wN2BD5ZqL+Ut7QoCQb5Bu4MeBusGrwr+PgQTEhxSE/Ik1Dw0L7Q/jBK2Mqwl7HW4W3hp+P0IvQhhRG+kZGRcZHPkfJRHVFnUaLRp9LroqzGKMdyY7lhsbGRsU+zcMs9le5ZNxFnHFcaNLNddvnr55RWKK9JWnFopuZK58ng8Oj4qviX+PTOI2cCcS/BNqE2YZbmz9rKesV3Y5expjiOnjDOZ6JhYljiV5Ji0O2k62Tm5InmG686t5r5I8UmpS5lPDUo9lLqYFpXWno5Lj08/wZPhpfL6MlQzVmcMZRpmFmaOrrJftWfVLN+f35QFZS3P6hZQRT9TA0I94RbhWLZTdk32m5zInOOrpVfzVg/kGuRuz51c47Xm67Wotay1vXnqeZvyxta5rqtfD61PWN+7QXNDwYaJjd4bD28ibErd9EO+WX5Z/qvNUZt7ClQKNhaMb/He0looUcgvvL3VYWvdNtQ27rbB7Zbbq7Z/LGIXXSk2K64ofl/CKrnylflXlV8t7kjcMVhqU7p/J2Ynb+fILuddh8uky9aUje8O3N1ZTi8vKn+1Z+WeyxVWFXV7CXuFe0crAyq7q7Sqdla9r06uHq5xq2mvVa7dXju/j73vxn6X/W11KnXFde8OcA/cqfeu72zQaag4iDmYffBJY2Rj/9eMr5ubFJuKmz4c4h0aPRx6uK/Ztrm5RbmltBVuFbZOH4k7cv0bj2+624zb6ttp7cVHwVHh0affxn87csz/WO9xxvG277S/q+2gdBR1Qp25nbNdyV2j3THdQyf8TvT2OPR0fG/y/aGT6idrTsmeKj1NOF1wevHMmjNzZzPPzpxLOjfeu7L3/vno87f6QvoGL/hfuHTR6+L5ftf+M5ccL528bH/5xBXGla6rNlc7B6wHOn6w/qFj0Gaw85rtte7rdtd7hpYMnb7hfOPcTY+bF2/53ro6vHR4aCRi5M7tuNujd9h3pu6m3X1xL/vewv2ND9APih5KPax4pPyo4Uf9H9tHbUZPjXmMDTwOe3x/nDX+7Kesn95PFDwhP6mYVJtsnrKYOjntNX396bKnE88yny3MFP4s/XPtc73n3/3i8svAbPTsxAv+i8VfS14qvDz0yupV71zw3KPX6a8X5oveKLw5/Jbxtv9d1LvJhZz32PeVH/Q/9Hz0//hgMX1x8V/3hPP7y2IJQQplbmRzdHJlYW0KZW5kb2JqCjMgMCBvYmoKPDwKPj4gZW5kb2JqCjkgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EgCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIAovU3VidHlwZSAvVHlwZTEgCi9UeXBlIC9Gb250IAovTmFtZSAvSGVsdiAKPj4gZW5kb2JqCjEwIDAgb2JqCjw8Ci9DcmVhdGlvbkRhdGUgKEQ6MjAwODA2MTExNjU2MDMpIAovTW9kRGF0ZSAoRDoyMDA4MDYxMTE2NTYwMykgCi9Qcm9kdWNlciAoSWJleCBQREYgQ3JlYXRvciA0LjMuNi40LzUwMjUgWy5ORVQgMi4wXSkgCj4+IGVuZG9iagp4cmVmCjAgMTEKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwNjE2IDAwMDAwIG4gCjAwMDAwMDA1NTYgMDAwMDAgbiAKMDAwMDAwMzQyNCAwMDAwMCBuIAowMDAwMDAwNzA2IDAwMDAwIG4gCjAwMDAwMDA3NDEgMDAwMDAgbiAKMDAwMDAwMDIxNSAwMDAwMCBuIAowMDAwMDAwNDgwIDAwMDAwIG4gCjAwMDAwMDAwMjAgMDAwMDAgbiAKMDAwMDAwMzQ0NSAwMDAwMCBuIAowMDAwMDAzNTU5IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTEgCi9JbmZvIDEwIDAgUiAgCi9Sb290IDEgMCBSIAo+PgpzdGFydHhyZWYKMzY5OAolJUVPRgo='; // Buttons Available

    this.CameraButton = {
      text: 'Camera',
      icon: 'camera-outline',
      handler: () => {
        return new Promise((resolve, error) => {
          this.getCameraImage().then(image => {
            this.photo.push(image);
            resolve(true);
          }).catch(e => {
            error(e);
          });
        });
      }
    };
    this.GalleryButton = {
      text: 'Gallery',
      icon: 'image-outline',
      handler: () => {
        return new Promise((resolve, error) => {
          this.getGalleryImage().then(image => {
            this.photo = image;
            resolve(true);
          }).catch(e => {
            error(e);
          });
        });
      }
    };
    this.PDFButton = {
      text: 'PDF',
      icon: 'document-attach-outline',
      handler: () => {
        return new Promise((resolve, error) => {
          this.pickPdf().then( /*#__PURE__*/function () {
            var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (PDF) {
              if (PDF.webPath === 'false') {
                error('false');
              } else {
                _this.photo.push(PDF);

                resolve(true);
              }
            });

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }()).catch(e => {
            error(e);
          });
        });
      }
    };
    this.CancelButton = {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        this.actionSheetController.dismiss();
        return false;
      }
    };
    this.cameraButtons = [this.CameraButton, this.GalleryButton, this.CancelButton];
    this.pdfButtons = [this.CameraButton, this.GalleryButton, this.PDFButton, this.CancelButton];
  }

  loadSaved() {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this2.processor.loadSaved();
    })();
  }

  deletePicture() {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this3.processor.deletePicture();
    })();
  }

  presentImageOptions(options) {
    var _this4 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.processor.deletePicture();

      _this4.imgHeight = options.height ? options.height : undefined;
      _this4.imgWidth = options.width ? options.width : undefined;
      _this4.limit = options.limit ? options.limit : 1;
      _this4.data = options.data ? options.data : null;
      _this4.currentRoute = _this4.router.url;
      _this4.photo = [];
      let buttons = [];

      if (options.pdf) {
        buttons = _this4.pdfButtons;
      } else {
        buttons = _this4.cameraButtons;
      }

      const actionSheet = yield _this4.actionSheetController.create({
        header: 'Take image from:',
        buttons: buttons
      });
      yield actionSheet.present();
      return actionSheet.onDidDismiss().then(data => {
        _this4.imgHeight = undefined;
        _this4.imgWidth = undefined;
        _this4.currentRoute = '';
        return _this4.photo;
      });
    })();
  }

  getCameraImage() {
    var _this5 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, error) {
          const OPTIONS = {
            source: _capacitor_camera__WEBPACK_IMPORTED_MODULE_4__.CameraSource.Camera,
            direction: _capacitor_camera__WEBPACK_IMPORTED_MODULE_4__.CameraDirection.Rear,
            resultType: _capacitor_camera__WEBPACK_IMPORTED_MODULE_4__.CameraResultType.Base64,
            quality: 100,
            saveToGallery: true,
            allowEditing: true,
            promptLabelCancel: 'Cancel'
          };
          _capacitor_camera__WEBPACK_IMPORTED_MODULE_4__.Camera.getPhoto(OPTIONS).then(capturedPhoto => {
            const img = 'data:image/jpeg;base64,' + capturedPhoto.base64String;

            _this5.processor.savePictures([{
              file: null,
              webPath: img
            }], _this5.data, _this5.currentRoute, 'Base64');

            _this5.processor.generateBlob(img).then(savedImageFile => {
              resolve({
                file: savedImageFile,
                webPath: img
              });
            });
          }).catch(e => error(e));
        });

        return function (_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }());
    })();
  }

  getGalleryImage() {
    var _this6 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise( /*#__PURE__*/function () {
        var _ref3 = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, error) {
          const OPTIONS = {
            limit: _this6.limit
          };
          _capacitor_camera__WEBPACK_IMPORTED_MODULE_4__.Camera.pickImages(OPTIONS).then( /*#__PURE__*/function () {
            var _ref4 = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (capturedPhotos) {
              let photos = [];

              _this6.saveGallery(capturedPhotos.photos);

              for (let image of capturedPhotos.photos) {
                let contents = yield _capacitor_filesystem__WEBPACK_IMPORTED_MODULE_3__.Filesystem.readFile({
                  path: image.path
                });
                const img = 'data:image/jpeg;base64,' + contents.data;
                yield _this6.processor.generateBlob(img).then(savedImageFile => {
                  photos.push({
                    file: savedImageFile,
                    webPath: img
                  });
                });
              }

              resolve(photos);
            });

            return function (_x6) {
              return _ref4.apply(this, arguments);
            };
          }()).catch(e => {
            console.log(e);
            error(e);
          });
        });

        return function (_x4, _x5) {
          return _ref3.apply(this, arguments);
        };
      }());
    })();
  }

  pickPdf() {
    var _this7 = this;

    return new Promise( /*#__PURE__*/function () {
      var _ref5 = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve) {
        if (_capacitor_core__WEBPACK_IMPORTED_MODULE_1__.Capacitor.getPlatform() === 'web') {
          _this7.alerts.AlertConfirm('PDF', 'Upload pdf?').then(answer => {
            if (answer) {
              _this7.processor.savePictures([{
                file: null,
                webPath: _this7.DemoPDF,
                pdf: 'TestPDF.pdf'
              }], _this7.data, _this7.currentRoute, 'PDF');

              _this7.processor.generateBlob(_this7.DemoPDF).then(savedImageFile => {
                resolve({
                  file: savedImageFile,
                  webPath: _this7.DemoPDF,
                  type: 'PDF',
                  pdf: 'TestPDF.pdf'
                });
              }).catch(e => {
                console.log('generateBlob');
                console.error(e);
                resolve({
                  webPath: false
                });
              });
            } else {
              console.log('cancelPDF');
              resolve({
                webPath: false
              });
            }
          });
        } else {
          _this7.documents.getFile('application/pdf').then(file => {
            const base64String = file.dataURI;

            _this7.processor.savePictures([{
              file: null,
              webPath: file.dataURI,
              pdf: file.name
            }], _this7.data, _this7.currentRoute, 'PDF');

            _this7.processor.generateBlob(base64String).then(savedImageFile => {
              resolve({
                file: savedImageFile,
                webPath: base64String,
                type: 'PDF',
                pdf: file.name
              });
            }).catch(e => {
              console.log('generateBlob');
              console.error(e);
              resolve({
                webPath: null
              });
            });
          }).catch(error => {
            console.log('getFile');
            console.error(error);
            resolve({
              webPath: false
            });
          });
        }
      });

      return function (_x7) {
        return _ref5.apply(this, arguments);
      };
    }());
  }

  saveGallery(photoList) {
    let photos = [];
    photoList.forEach(image => {
      photos.push({
        file: null,
        webPath: image.path
      });
    });
    this.processor.savePictures(photos, this.data, this.currentRoute, 'Filesystem');
  }

};

AttachmentsService.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router
}, {
  type: _awesome_cordova_plugins_chooser_ngx__WEBPACK_IMPORTED_MODULE_2__.Chooser
}, {
  type: _alerts__WEBPACK_IMPORTED_MODULE_5__.AlertsService
}, {
  type: src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_6__.ImageUploaderService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ActionSheetController
}];

AttachmentsService = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injectable)({
  providedIn: 'root'
})], AttachmentsService);


/***/ }),

/***/ 43570:
/*!***********************************************************!*\
  !*** ./src/app/shared/utilities/error-handler.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorHandlerService": () => (/* binding */ ErrorHandlerService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


let ErrorHandlerService = class ErrorHandlerService {
    constructor() { }
    handle(error) {
        console.log(error);
        try {
            const errorCode = error.code;
            console.log('code: ', errorCode);
            const message = errorCode.split('/')[1].replaceAll("-", " ");
            switch (message) {
                case 'user not found':
                    return 'Usuario no encontrado';
                case 'wrong-password':
                    return 'Usuario o contraseña erroneo';
                case 'email already in use':
                    return 'Usuario ya posee una cuenta';
                default:
                    return message;
            }
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
};
ErrorHandlerService.ctorParameters = () => [];
ErrorHandlerService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)({
        providedIn: 'root'
    })
], ErrorHandlerService);



/***/ }),

/***/ 54387:
/*!*****************************************************!*\
  !*** ./src/app/shared/utilities/haptics.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HapticsService": () => (/* binding */ HapticsService)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _capacitor_haptics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/haptics */ 66909);




let HapticsService = class HapticsService {
  constructor() {}

  lightVibe() {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _capacitor_haptics__WEBPACK_IMPORTED_MODULE_1__.Haptics.impact({
        style: _capacitor_haptics__WEBPACK_IMPORTED_MODULE_1__.ImpactStyle.Light
      });
    })();
  }

  mediumVibe() {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _capacitor_haptics__WEBPACK_IMPORTED_MODULE_1__.Haptics.impact({
        style: _capacitor_haptics__WEBPACK_IMPORTED_MODULE_1__.ImpactStyle.Medium
      });
    })();
  }

  vibrate() {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _capacitor_haptics__WEBPACK_IMPORTED_MODULE_1__.Haptics.vibrate();
    })();
  }

  startAction() {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _capacitor_haptics__WEBPACK_IMPORTED_MODULE_1__.Haptics.impact({
        style: _capacitor_haptics__WEBPACK_IMPORTED_MODULE_1__.ImpactStyle.Medium
      });
    })();
  }

  changeAction() {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _capacitor_haptics__WEBPACK_IMPORTED_MODULE_1__.Haptics.selectionChanged();
    })();
  }

  endAction() {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _capacitor_haptics__WEBPACK_IMPORTED_MODULE_1__.Haptics.selectionEnd();
    })();
  }

};

HapticsService.ctorParameters = () => [];

HapticsService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], HapticsService);


/***/ }),

/***/ 34830:
/*!****************************************************************!*\
  !*** ./node_modules/@capacitor/camera/dist/esm/definitions.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CameraDirection": () => (/* binding */ CameraDirection),
/* harmony export */   "CameraResultType": () => (/* binding */ CameraResultType),
/* harmony export */   "CameraSource": () => (/* binding */ CameraSource)
/* harmony export */ });
var CameraSource;

(function (CameraSource) {
  /**
   * Prompts the user to select either the photo album or take a photo.
   */
  CameraSource["Prompt"] = "PROMPT";
  /**
   * Take a new photo using the camera.
   */

  CameraSource["Camera"] = "CAMERA";
  /**
   * Pick an existing photo from the gallery or photo album.
   */

  CameraSource["Photos"] = "PHOTOS";
})(CameraSource || (CameraSource = {}));

var CameraDirection;

(function (CameraDirection) {
  CameraDirection["Rear"] = "REAR";
  CameraDirection["Front"] = "FRONT";
})(CameraDirection || (CameraDirection = {}));

var CameraResultType;

(function (CameraResultType) {
  CameraResultType["Uri"] = "uri";
  CameraResultType["Base64"] = "base64";
  CameraResultType["DataUrl"] = "dataUrl";
})(CameraResultType || (CameraResultType = {}));

/***/ }),

/***/ 4241:
/*!**********************************************************!*\
  !*** ./node_modules/@capacitor/camera/dist/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Camera": () => (/* binding */ Camera),
/* harmony export */   "CameraDirection": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.CameraDirection),
/* harmony export */   "CameraResultType": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.CameraResultType),
/* harmony export */   "CameraSource": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.CameraSource)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 26549);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ 34830);

const Camera = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('Camera', {
  web: () => __webpack_require__.e(/*! import() */ "node_modules_capacitor_camera_dist_esm_web_js").then(__webpack_require__.bind(__webpack_require__, /*! ./web */ 71327)).then(m => new m.CameraWeb())
});



/***/ }),

/***/ 93568:
/*!********************************************************************!*\
  !*** ./node_modules/@capacitor/filesystem/dist/esm/definitions.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Directory": () => (/* binding */ Directory),
/* harmony export */   "Encoding": () => (/* binding */ Encoding),
/* harmony export */   "FilesystemDirectory": () => (/* binding */ FilesystemDirectory),
/* harmony export */   "FilesystemEncoding": () => (/* binding */ FilesystemEncoding)
/* harmony export */ });
var Directory;

(function (Directory) {
  /**
   * The Documents directory
   * On iOS it's the app's documents directory.
   * Use this directory to store user-generated content.
   * On Android it's the Public Documents folder, so it's accessible from other apps.
   * It's not accesible on Android 10 unless the app enables legacy External Storage
   * by adding `android:requestLegacyExternalStorage="true"` in the `application` tag
   * in the `AndroidManifest.xml`.
   * It's not accesible on Android 11 or newer.
   *
   * @since 1.0.0
   */
  Directory["Documents"] = "DOCUMENTS";
  /**
   * The Data directory
   * On iOS it will use the Documents directory.
   * On Android it's the directory holding application files.
   * Files will be deleted when the application is uninstalled.
   *
   * @since 1.0.0
   */

  Directory["Data"] = "DATA";
  /**
   * The Library directory
   * On iOS it will use the Library directory.
   * On Android it's the directory holding application files.
   * Files will be deleted when the application is uninstalled.
   *
   * @since 1.1.0
   */

  Directory["Library"] = "LIBRARY";
  /**
   * The Cache directory
   * Can be deleted in cases of low memory, so use this directory to write app-specific files
   * that your app can re-create easily.
   *
   * @since 1.0.0
   */

  Directory["Cache"] = "CACHE";
  /**
   * The external directory
   * On iOS it will use the Documents directory
   * On Android it's the directory on the primary shared/external
   * storage device where the application can place persistent files it owns.
   * These files are internal to the applications, and not typically visible
   * to the user as media.
   * Files will be deleted when the application is uninstalled.
   *
   * @since 1.0.0
   */

  Directory["External"] = "EXTERNAL";
  /**
   * The external storage directory
   * On iOS it will use the Documents directory
   * On Android it's the primary shared/external storage directory.
   * It's not accesible on Android 10 unless the app enables legacy External Storage
   * by adding `android:requestLegacyExternalStorage="true"` in the `application` tag
   * in the `AndroidManifest.xml`.
   * It's not accesible on Android 11 or newer.
   *
   * @since 1.0.0
   */

  Directory["ExternalStorage"] = "EXTERNAL_STORAGE";
})(Directory || (Directory = {}));

var Encoding;

(function (Encoding) {
  /**
   * Eight-bit UCS Transformation Format
   *
   * @since 1.0.0
   */
  Encoding["UTF8"] = "utf8";
  /**
   * Seven-bit ASCII, a.k.a. ISO646-US, a.k.a. the Basic Latin block of the
   * Unicode character set
   * This encoding is only supported on Android.
   *
   * @since 1.0.0
   */

  Encoding["ASCII"] = "ascii";
  /**
   * Sixteen-bit UCS Transformation Format, byte order identified by an
   * optional byte-order mark
   * This encoding is only supported on Android.
   *
   * @since 1.0.0
   */

  Encoding["UTF16"] = "utf16";
})(Encoding || (Encoding = {}));
/**
 * @deprecated Use `Directory`.
 * @since 1.0.0
 */


const FilesystemDirectory = Directory;
/**
 * @deprecated Use `Encoding`.
 * @since 1.0.0
 */

const FilesystemEncoding = Encoding;

/***/ }),

/***/ 91662:
/*!**************************************************************!*\
  !*** ./node_modules/@capacitor/filesystem/dist/esm/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Directory": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.Directory),
/* harmony export */   "Encoding": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.Encoding),
/* harmony export */   "Filesystem": () => (/* binding */ Filesystem),
/* harmony export */   "FilesystemDirectory": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.FilesystemDirectory),
/* harmony export */   "FilesystemEncoding": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.FilesystemEncoding)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 26549);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ 93568);

const Filesystem = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('Filesystem', {
  web: () => __webpack_require__.e(/*! import() */ "node_modules_capacitor_filesystem_dist_esm_web_js").then(__webpack_require__.bind(__webpack_require__, /*! ./web */ 64046)).then(m => new m.FilesystemWeb())
});



/***/ }),

/***/ 17682:
/*!*****************************************************************!*\
  !*** ./node_modules/@capacitor/haptics/dist/esm/definitions.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HapticsImpactStyle": () => (/* binding */ HapticsImpactStyle),
/* harmony export */   "HapticsNotificationType": () => (/* binding */ HapticsNotificationType),
/* harmony export */   "ImpactStyle": () => (/* binding */ ImpactStyle),
/* harmony export */   "NotificationType": () => (/* binding */ NotificationType)
/* harmony export */ });
var ImpactStyle;

(function (ImpactStyle) {
  /**
   * A collision between large, heavy user interface elements
   *
   * @since 1.0.0
   */
  ImpactStyle["Heavy"] = "HEAVY";
  /**
   * A collision between moderately sized user interface elements
   *
   * @since 1.0.0
   */

  ImpactStyle["Medium"] = "MEDIUM";
  /**
   * A collision between small, light user interface elements
   *
   * @since 1.0.0
   */

  ImpactStyle["Light"] = "LIGHT";
})(ImpactStyle || (ImpactStyle = {}));

var NotificationType;

(function (NotificationType) {
  /**
   * A notification feedback type indicating that a task has completed successfully
   *
   * @since 1.0.0
   */
  NotificationType["Success"] = "SUCCESS";
  /**
   * A notification feedback type indicating that a task has produced a warning
   *
   * @since 1.0.0
   */

  NotificationType["Warning"] = "WARNING";
  /**
   * A notification feedback type indicating that a task has failed
   *
   * @since 1.0.0
   */

  NotificationType["Error"] = "ERROR";
})(NotificationType || (NotificationType = {}));
/**
 * @deprecated Use `NotificationType`.
 * @since 1.0.0
 */


const HapticsNotificationType = NotificationType;
/**
 * @deprecated Use `ImpactStyle`.
 * @since 1.0.0
 */

const HapticsImpactStyle = ImpactStyle;

/***/ }),

/***/ 66909:
/*!***********************************************************!*\
  !*** ./node_modules/@capacitor/haptics/dist/esm/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Haptics": () => (/* binding */ Haptics),
/* harmony export */   "HapticsImpactStyle": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.HapticsImpactStyle),
/* harmony export */   "HapticsNotificationType": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.HapticsNotificationType),
/* harmony export */   "ImpactStyle": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.ImpactStyle),
/* harmony export */   "NotificationType": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.NotificationType)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 26549);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ 17682);

const Haptics = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('Haptics', {
  web: () => __webpack_require__.e(/*! import() */ "node_modules_capacitor_haptics_dist_esm_web_js").then(__webpack_require__.bind(__webpack_require__, /*! ./web */ 82237)).then(m => new m.HapticsWeb())
});



/***/ }),

/***/ 84970:
/*!*********************************************************************!*\
  !*** ./node_modules/@capacitor/preferences/dist/esm/definitions.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ 85191:
/*!***************************************************************!*\
  !*** ./node_modules/@capacitor/preferences/dist/esm/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Preferences": () => (/* binding */ Preferences)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 26549);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ 84970);

const Preferences = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('Preferences', {
  web: () => __webpack_require__.e(/*! import() */ "node_modules_capacitor_preferences_dist_esm_web_js").then(__webpack_require__.bind(__webpack_require__, /*! ./web */ 97333)).then(m => new m.PreferencesWeb())
});



/***/ }),

/***/ 8376:
/*!**************************************************************!*\
  !*** ./node_modules/@firebase/storage/dist/index.esm2017.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StringFormat": () => (/* binding */ StringFormat),
/* harmony export */   "_FbsBlob": () => (/* binding */ FbsBlob),
/* harmony export */   "_Location": () => (/* binding */ Location),
/* harmony export */   "_TaskEvent": () => (/* binding */ TaskEvent),
/* harmony export */   "_TaskState": () => (/* binding */ TaskState),
/* harmony export */   "_UploadTask": () => (/* binding */ UploadTask),
/* harmony export */   "_dataFromString": () => (/* binding */ dataFromString),
/* harmony export */   "_getChild": () => (/* binding */ _getChild),
/* harmony export */   "_invalidArgument": () => (/* binding */ invalidArgument),
/* harmony export */   "_invalidRootOperation": () => (/* binding */ invalidRootOperation),
/* harmony export */   "connectStorageEmulator": () => (/* binding */ connectStorageEmulator),
/* harmony export */   "deleteObject": () => (/* binding */ deleteObject),
/* harmony export */   "getBlob": () => (/* binding */ getBlob),
/* harmony export */   "getBytes": () => (/* binding */ getBytes),
/* harmony export */   "getDownloadURL": () => (/* binding */ getDownloadURL),
/* harmony export */   "getMetadata": () => (/* binding */ getMetadata),
/* harmony export */   "getStorage": () => (/* binding */ getStorage),
/* harmony export */   "getStream": () => (/* binding */ getStream),
/* harmony export */   "list": () => (/* binding */ list),
/* harmony export */   "listAll": () => (/* binding */ listAll),
/* harmony export */   "ref": () => (/* binding */ ref),
/* harmony export */   "updateMetadata": () => (/* binding */ updateMetadata),
/* harmony export */   "uploadBytes": () => (/* binding */ uploadBytes),
/* harmony export */   "uploadBytesResumable": () => (/* binding */ uploadBytesResumable),
/* harmony export */   "uploadString": () => (/* binding */ uploadString)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @firebase/app */ 98770);
/* harmony import */ var _firebase_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @firebase/util */ 17748);
/* harmony import */ var _firebase_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @firebase/component */ 44692);




/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Constants used in the Firebase Storage library.
 */

/**
 * Domain name for firebase storage.
 */

const DEFAULT_HOST = 'firebasestorage.googleapis.com';
/**
 * The key in Firebase config json for the storage bucket.
 */

const CONFIG_STORAGE_BUCKET_KEY = 'storageBucket';
/**
 * 2 minutes
 *
 * The timeout for all operations except upload.
 */

const DEFAULT_MAX_OPERATION_RETRY_TIME = 2 * 60 * 1000;
/**
 * 10 minutes
 *
 * The timeout for upload.
 */

const DEFAULT_MAX_UPLOAD_RETRY_TIME = 10 * 60 * 1000;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An error returned by the Firebase Storage SDK.
 * @public
 */

class StorageError extends _firebase_util__WEBPACK_IMPORTED_MODULE_2__.FirebaseError {
  /**
   * @param code - A StorageErrorCode string to be prefixed with 'storage/' and
   *  added to the end of the message.
   * @param message  - Error message.
   */
  constructor(code, message) {
    super(prependCode(code), `Firebase Storage: ${message} (${prependCode(code)})`);
    /**
     * Stores custom error data unque to StorageError.
     */

    this.customData = {
      serverResponse: null
    };
    this._baseMessage = this.message; // Without this, `instanceof StorageError`, in tests for example,
    // returns false.

    Object.setPrototypeOf(this, StorageError.prototype);
  }
  /**
   * Compares a StorageErrorCode against this error's code, filtering out the prefix.
   */


  _codeEquals(code) {
    return prependCode(code) === this.code;
  }
  /**
   * Optional response message that was added by the server.
   */


  get serverResponse() {
    return this.customData.serverResponse;
  }

  set serverResponse(serverResponse) {
    this.customData.serverResponse = serverResponse;

    if (this.customData.serverResponse) {
      this.message = `${this._baseMessage}\n${this.customData.serverResponse}`;
    } else {
      this.message = this._baseMessage;
    }
  }

}

function prependCode(code) {
  return 'storage/' + code;
}

function unknown() {
  const message = 'An unknown error occurred, please check the error payload for ' + 'server response.';
  return new StorageError("unknown"
  /* UNKNOWN */
  , message);
}

function objectNotFound(path) {
  return new StorageError("object-not-found"
  /* OBJECT_NOT_FOUND */
  , "Object '" + path + "' does not exist.");
}

function quotaExceeded(bucket) {
  return new StorageError("quota-exceeded"
  /* QUOTA_EXCEEDED */
  , "Quota for bucket '" + bucket + "' exceeded, please view quota on " + 'https://firebase.google.com/pricing/.');
}

function unauthenticated() {
  const message = 'User is not authenticated, please authenticate using Firebase ' + 'Authentication and try again.';
  return new StorageError("unauthenticated"
  /* UNAUTHENTICATED */
  , message);
}

function unauthorizedApp() {
  return new StorageError("unauthorized-app"
  /* UNAUTHORIZED_APP */
  , 'This app does not have permission to access Firebase Storage on this project.');
}

function unauthorized(path) {
  return new StorageError("unauthorized"
  /* UNAUTHORIZED */
  , "User does not have permission to access '" + path + "'.");
}

function retryLimitExceeded() {
  return new StorageError("retry-limit-exceeded"
  /* RETRY_LIMIT_EXCEEDED */
  , 'Max retry time for operation exceeded, please try again.');
}

function canceled() {
  return new StorageError("canceled"
  /* CANCELED */
  , 'User canceled the upload/download.');
}

function invalidUrl(url) {
  return new StorageError("invalid-url"
  /* INVALID_URL */
  , "Invalid URL '" + url + "'.");
}

function invalidDefaultBucket(bucket) {
  return new StorageError("invalid-default-bucket"
  /* INVALID_DEFAULT_BUCKET */
  , "Invalid default bucket '" + bucket + "'.");
}

function noDefaultBucket() {
  return new StorageError("no-default-bucket"
  /* NO_DEFAULT_BUCKET */
  , 'No default bucket ' + "found. Did you set the '" + CONFIG_STORAGE_BUCKET_KEY + "' property when initializing the app?");
}

function cannotSliceBlob() {
  return new StorageError("cannot-slice-blob"
  /* CANNOT_SLICE_BLOB */
  , 'Cannot slice blob for upload. Please retry the upload.');
}

function serverFileWrongSize() {
  return new StorageError("server-file-wrong-size"
  /* SERVER_FILE_WRONG_SIZE */
  , 'Server recorded incorrect upload file size, please retry the upload.');
}

function noDownloadURL() {
  return new StorageError("no-download-url"
  /* NO_DOWNLOAD_URL */
  , 'The given file does not have any download URLs.');
}
/**
 * @internal
 */


function invalidArgument(message) {
  return new StorageError("invalid-argument"
  /* INVALID_ARGUMENT */
  , message);
}

function appDeleted() {
  return new StorageError("app-deleted"
  /* APP_DELETED */
  , 'The Firebase app was deleted.');
}
/**
 * @param name - The name of the operation that was invalid.
 *
 * @internal
 */


function invalidRootOperation(name) {
  return new StorageError("invalid-root-operation"
  /* INVALID_ROOT_OPERATION */
  , "The operation '" + name + "' cannot be performed on a root reference, create a non-root " + "reference using child, such as .child('file.png').");
}
/**
 * @param format - The format that was not valid.
 * @param message - A message describing the format violation.
 */


function invalidFormat(format, message) {
  return new StorageError("invalid-format"
  /* INVALID_FORMAT */
  , "String does not match format '" + format + "': " + message);
}
/**
 * @param message - A message describing the internal error.
 */


function internalError(message) {
  throw new StorageError("internal-error"
  /* INTERNAL_ERROR */
  , 'Internal error: ' + message);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Firebase Storage location data.
 *
 * @internal
 */


class Location {
  constructor(bucket, path) {
    this.bucket = bucket;
    this.path_ = path;
  }

  get path() {
    return this.path_;
  }

  get isRoot() {
    return this.path.length === 0;
  }

  fullServerUrl() {
    const encode = encodeURIComponent;
    return '/b/' + encode(this.bucket) + '/o/' + encode(this.path);
  }

  bucketOnlyServerUrl() {
    const encode = encodeURIComponent;
    return '/b/' + encode(this.bucket) + '/o';
  }

  static makeFromBucketSpec(bucketString, host) {
    let bucketLocation;

    try {
      bucketLocation = Location.makeFromUrl(bucketString, host);
    } catch (e) {
      // Not valid URL, use as-is. This lets you put bare bucket names in
      // config.
      return new Location(bucketString, '');
    }

    if (bucketLocation.path === '') {
      return bucketLocation;
    } else {
      throw invalidDefaultBucket(bucketString);
    }
  }

  static makeFromUrl(url, host) {
    let location = null;
    const bucketDomain = '([A-Za-z0-9.\\-_]+)';

    function gsModify(loc) {
      if (loc.path.charAt(loc.path.length - 1) === '/') {
        loc.path_ = loc.path_.slice(0, -1);
      }
    }

    const gsPath = '(/(.*))?$';
    const gsRegex = new RegExp('^gs://' + bucketDomain + gsPath, 'i');
    const gsIndices = {
      bucket: 1,
      path: 3
    };

    function httpModify(loc) {
      loc.path_ = decodeURIComponent(loc.path);
    }

    const version = 'v[A-Za-z0-9_]+';
    const firebaseStorageHost = host.replace(/[.]/g, '\\.');
    const firebaseStoragePath = '(/([^?#]*).*)?$';
    const firebaseStorageRegExp = new RegExp(`^https?://${firebaseStorageHost}/${version}/b/${bucketDomain}/o${firebaseStoragePath}`, 'i');
    const firebaseStorageIndices = {
      bucket: 1,
      path: 3
    };
    const cloudStorageHost = host === DEFAULT_HOST ? '(?:storage.googleapis.com|storage.cloud.google.com)' : host;
    const cloudStoragePath = '([^?#]*)';
    const cloudStorageRegExp = new RegExp(`^https?://${cloudStorageHost}/${bucketDomain}/${cloudStoragePath}`, 'i');
    const cloudStorageIndices = {
      bucket: 1,
      path: 2
    };
    const groups = [{
      regex: gsRegex,
      indices: gsIndices,
      postModify: gsModify
    }, {
      regex: firebaseStorageRegExp,
      indices: firebaseStorageIndices,
      postModify: httpModify
    }, {
      regex: cloudStorageRegExp,
      indices: cloudStorageIndices,
      postModify: httpModify
    }];

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const captures = group.regex.exec(url);

      if (captures) {
        const bucketValue = captures[group.indices.bucket];
        let pathValue = captures[group.indices.path];

        if (!pathValue) {
          pathValue = '';
        }

        location = new Location(bucketValue, pathValue);
        group.postModify(location);
        break;
      }
    }

    if (location == null) {
      throw invalidUrl(url);
    }

    return location;
  }

}
/**
 * A request whose promise always fails.
 */


class FailRequest {
  constructor(error) {
    this.promise_ = Promise.reject(error);
  }
  /** @inheritDoc */


  getPromise() {
    return this.promise_;
  }
  /** @inheritDoc */


  cancel(_appDelete = false) {}

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param f May be invoked
 *     before the function returns.
 * @param callback Get all the arguments passed to the function
 *     passed to f, including the initial boolean.
 */


function start(f, // eslint-disable-next-line @typescript-eslint/no-explicit-any
callback, timeout) {
  // TODO(andysoto): make this code cleaner (probably refactor into an actual
  // type instead of a bunch of functions with state shared in the closure)
  let waitSeconds = 1; // Would type this as "number" but that doesn't work for Node so ¯\_(ツ)_/¯
  // TODO: find a way to exclude Node type definition for storage because storage only works in browser
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  let retryTimeoutId = null; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  let globalTimeoutId = null;
  let hitTimeout = false;
  let cancelState = 0;

  function canceled() {
    return cancelState === 2;
  }

  let triggeredCallback = false;

  function triggerCallback(...args) {
    if (!triggeredCallback) {
      triggeredCallback = true;
      callback.apply(null, args);
    }
  }

  function callWithDelay(millis) {
    retryTimeoutId = setTimeout(() => {
      retryTimeoutId = null;
      f(handler, canceled());
    }, millis);
  }

  function clearGlobalTimeout() {
    if (globalTimeoutId) {
      clearTimeout(globalTimeoutId);
    }
  }

  function handler(success, ...args) {
    if (triggeredCallback) {
      clearGlobalTimeout();
      return;
    }

    if (success) {
      clearGlobalTimeout();
      triggerCallback.call(null, success, ...args);
      return;
    }

    const mustStop = canceled() || hitTimeout;

    if (mustStop) {
      clearGlobalTimeout();
      triggerCallback.call(null, success, ...args);
      return;
    }

    if (waitSeconds < 64) {
      /* TODO(andysoto): don't back off so quickly if we know we're offline. */
      waitSeconds *= 2;
    }

    let waitMillis;

    if (cancelState === 1) {
      cancelState = 2;
      waitMillis = 0;
    } else {
      waitMillis = (waitSeconds + Math.random()) * 1000;
    }

    callWithDelay(waitMillis);
  }

  let stopped = false;

  function stop(wasTimeout) {
    if (stopped) {
      return;
    }

    stopped = true;
    clearGlobalTimeout();

    if (triggeredCallback) {
      return;
    }

    if (retryTimeoutId !== null) {
      if (!wasTimeout) {
        cancelState = 2;
      }

      clearTimeout(retryTimeoutId);
      callWithDelay(0);
    } else {
      if (!wasTimeout) {
        cancelState = 1;
      }
    }
  }

  callWithDelay(0);
  globalTimeoutId = setTimeout(() => {
    hitTimeout = true;
    stop(true);
  }, timeout);
  return stop;
}
/**
 * Stops the retry loop from repeating.
 * If the function is currently "in between" retries, it is invoked immediately
 * with the second parameter as "true". Otherwise, it will be invoked once more
 * after the current invocation finishes iff the current invocation would have
 * triggered another retry.
 */


function stop(id) {
  id(false);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function isJustDef(p) {
  return p !== void 0;
} // eslint-disable-next-line @typescript-eslint/ban-types


function isFunction(p) {
  return typeof p === 'function';
}

function isNonArrayObject(p) {
  return typeof p === 'object' && !Array.isArray(p);
}

function isString(p) {
  return typeof p === 'string' || p instanceof String;
}

function isNativeBlob(p) {
  return isNativeBlobDefined() && p instanceof Blob;
}

function isNativeBlobDefined() {
  return typeof Blob !== 'undefined';
}

function validateNumber(argument, minValue, maxValue, value) {
  if (value < minValue) {
    throw invalidArgument(`Invalid value for '${argument}'. Expected ${minValue} or greater.`);
  }

  if (value > maxValue) {
    throw invalidArgument(`Invalid value for '${argument}'. Expected ${maxValue} or less.`);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function makeUrl(urlPart, host, protocol) {
  let origin = host;

  if (protocol == null) {
    origin = `https://${host}`;
  }

  return `${protocol}://${origin}/v0${urlPart}`;
}

function makeQueryString(params) {
  const encode = encodeURIComponent;
  let queryPart = '?';

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const nextPart = encode(key) + '=' + encode(params[key]);
      queryPart = queryPart + nextPart + '&';
    }
  } // Chop off the extra '&' or '?' on the end


  queryPart = queryPart.slice(0, -1);
  return queryPart;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Error codes for requests made by the the XhrIo wrapper.
 */


var ErrorCode;

(function (ErrorCode) {
  ErrorCode[ErrorCode["NO_ERROR"] = 0] = "NO_ERROR";
  ErrorCode[ErrorCode["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
  ErrorCode[ErrorCode["ABORT"] = 2] = "ABORT";
})(ErrorCode || (ErrorCode = {}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Handles network logic for all Storage Requests, including error reporting and
 * retries with backoff.
 *
 * @param I - the type of the backend's network response.
 * @param - O the output type used by the rest of the SDK. The conversion
 * happens in the specified `callback_`.
 */


class NetworkRequest {
  constructor(url_, method_, headers_, body_, successCodes_, additionalRetryCodes_, callback_, errorCallback_, timeout_, progressCallback_, connectionFactory_) {
    this.url_ = url_;
    this.method_ = method_;
    this.headers_ = headers_;
    this.body_ = body_;
    this.successCodes_ = successCodes_;
    this.additionalRetryCodes_ = additionalRetryCodes_;
    this.callback_ = callback_;
    this.errorCallback_ = errorCallback_;
    this.timeout_ = timeout_;
    this.progressCallback_ = progressCallback_;
    this.connectionFactory_ = connectionFactory_;
    this.pendingConnection_ = null;
    this.backoffId_ = null;
    this.canceled_ = false;
    this.appDelete_ = false;
    this.promise_ = new Promise((resolve, reject) => {
      this.resolve_ = resolve;
      this.reject_ = reject;
      this.start_();
    });
  }
  /**
   * Actually starts the retry loop.
   */


  start_() {
    const doTheRequest = (backoffCallback, canceled) => {
      if (canceled) {
        backoffCallback(false, new RequestEndStatus(false, null, true));
        return;
      }

      const connection = this.connectionFactory_();
      this.pendingConnection_ = connection;

      const progressListener = progressEvent => {
        const loaded = progressEvent.loaded;
        const total = progressEvent.lengthComputable ? progressEvent.total : -1;

        if (this.progressCallback_ !== null) {
          this.progressCallback_(loaded, total);
        }
      };

      if (this.progressCallback_ !== null) {
        connection.addUploadProgressListener(progressListener);
      } // connection.send() never rejects, so we don't need to have a error handler or use catch on the returned promise.
      // eslint-disable-next-line @typescript-eslint/no-floating-promises


      connection.send(this.url_, this.method_, this.body_, this.headers_).then(() => {
        if (this.progressCallback_ !== null) {
          connection.removeUploadProgressListener(progressListener);
        }

        this.pendingConnection_ = null;
        const hitServer = connection.getErrorCode() === ErrorCode.NO_ERROR;
        const status = connection.getStatus();

        if (!hitServer || this.isRetryStatusCode_(status)) {
          const wasCanceled = connection.getErrorCode() === ErrorCode.ABORT;
          backoffCallback(false, new RequestEndStatus(false, null, wasCanceled));
          return;
        }

        const successCode = this.successCodes_.indexOf(status) !== -1;
        backoffCallback(true, new RequestEndStatus(successCode, connection));
      });
    };
    /**
     * @param requestWentThrough - True if the request eventually went
     *     through, false if it hit the retry limit or was canceled.
     */


    const backoffDone = (requestWentThrough, status) => {
      const resolve = this.resolve_;
      const reject = this.reject_;
      const connection = status.connection;

      if (status.wasSuccessCode) {
        try {
          const result = this.callback_(connection, connection.getResponse());

          if (isJustDef(result)) {
            resolve(result);
          } else {
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      } else {
        if (connection !== null) {
          const err = unknown();
          err.serverResponse = connection.getErrorText();

          if (this.errorCallback_) {
            reject(this.errorCallback_(connection, err));
          } else {
            reject(err);
          }
        } else {
          if (status.canceled) {
            const err = this.appDelete_ ? appDeleted() : canceled();
            reject(err);
          } else {
            const err = retryLimitExceeded();
            reject(err);
          }
        }
      }
    };

    if (this.canceled_) {
      backoffDone(false, new RequestEndStatus(false, null, true));
    } else {
      this.backoffId_ = start(doTheRequest, backoffDone, this.timeout_);
    }
  }
  /** @inheritDoc */


  getPromise() {
    return this.promise_;
  }
  /** @inheritDoc */


  cancel(appDelete) {
    this.canceled_ = true;
    this.appDelete_ = appDelete || false;

    if (this.backoffId_ !== null) {
      stop(this.backoffId_);
    }

    if (this.pendingConnection_ !== null) {
      this.pendingConnection_.abort();
    }
  }

  isRetryStatusCode_(status) {
    // The codes for which to retry came from this page:
    // https://cloud.google.com/storage/docs/exponential-backoff
    const isFiveHundredCode = status >= 500 && status < 600;
    const extraRetryCodes = [// Request Timeout: web server didn't receive full request in time.
    408, // Too Many Requests: you're getting rate-limited, basically.
    429];
    const isExtraRetryCode = extraRetryCodes.indexOf(status) !== -1;
    const isRequestSpecificRetryCode = this.additionalRetryCodes_.indexOf(status) !== -1;
    return isFiveHundredCode || isExtraRetryCode || isRequestSpecificRetryCode;
  }

}
/**
 * A collection of information about the result of a network request.
 * @param opt_canceled - Defaults to false.
 */


class RequestEndStatus {
  constructor(wasSuccessCode, connection, canceled) {
    this.wasSuccessCode = wasSuccessCode;
    this.connection = connection;
    this.canceled = !!canceled;
  }

}

function addAuthHeader_(headers, authToken) {
  if (authToken !== null && authToken.length > 0) {
    headers['Authorization'] = 'Firebase ' + authToken;
  }
}

function addVersionHeader_(headers, firebaseVersion) {
  headers['X-Firebase-Storage-Version'] = 'webjs/' + (firebaseVersion !== null && firebaseVersion !== void 0 ? firebaseVersion : 'AppManager');
}

function addGmpidHeader_(headers, appId) {
  if (appId) {
    headers['X-Firebase-GMPID'] = appId;
  }
}

function addAppCheckHeader_(headers, appCheckToken) {
  if (appCheckToken !== null) {
    headers['X-Firebase-AppCheck'] = appCheckToken;
  }
}

function makeRequest(requestInfo, appId, authToken, appCheckToken, requestFactory, firebaseVersion) {
  const queryPart = makeQueryString(requestInfo.urlParams);
  const url = requestInfo.url + queryPart;
  const headers = Object.assign({}, requestInfo.headers);
  addGmpidHeader_(headers, appId);
  addAuthHeader_(headers, authToken);
  addVersionHeader_(headers, firebaseVersion);
  addAppCheckHeader_(headers, appCheckToken);
  return new NetworkRequest(url, requestInfo.method, headers, requestInfo.body, requestInfo.successCodes, requestInfo.additionalRetryCodes, requestInfo.handler, requestInfo.errorHandler, requestInfo.timeout, requestInfo.progressCallback, requestFactory);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function getBlobBuilder() {
  if (typeof BlobBuilder !== 'undefined') {
    return BlobBuilder;
  } else if (typeof WebKitBlobBuilder !== 'undefined') {
    return WebKitBlobBuilder;
  } else {
    return undefined;
  }
}
/**
 * Concatenates one or more values together and converts them to a Blob.
 *
 * @param args The values that will make up the resulting blob.
 * @return The blob.
 */


function getBlob$1(...args) {
  const BlobBuilder = getBlobBuilder();

  if (BlobBuilder !== undefined) {
    const bb = new BlobBuilder();

    for (let i = 0; i < args.length; i++) {
      bb.append(args[i]);
    }

    return bb.getBlob();
  } else {
    if (isNativeBlobDefined()) {
      return new Blob(args);
    } else {
      throw new StorageError("unsupported-environment"
      /* UNSUPPORTED_ENVIRONMENT */
      , "This browser doesn't seem to support creating Blobs");
    }
  }
}
/**
 * Slices the blob. The returned blob contains data from the start byte
 * (inclusive) till the end byte (exclusive). Negative indices cannot be used.
 *
 * @param blob The blob to be sliced.
 * @param start Index of the starting byte.
 * @param end Index of the ending byte.
 * @return The blob slice or null if not supported.
 */


function sliceBlob(blob, start, end) {
  if (blob.webkitSlice) {
    return blob.webkitSlice(start, end);
  } else if (blob.mozSlice) {
    return blob.mozSlice(start, end);
  } else if (blob.slice) {
    return blob.slice(start, end);
  }

  return null;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Converts a Base64 encoded string to a binary string. */


function decodeBase64(encoded) {
  return atob(encoded);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An enumeration of the possible string formats for upload.
 * @public
 */


const StringFormat = {
  /**
   * Indicates the string should be interpreted "raw", that is, as normal text.
   * The string will be interpreted as UTF-16, then uploaded as a UTF-8 byte
   * sequence.
   * Example: The string 'Hello! \\ud83d\\ude0a' becomes the byte sequence
   * 48 65 6c 6c 6f 21 20 f0 9f 98 8a
   */
  RAW: 'raw',

  /**
   * Indicates the string should be interpreted as base64-encoded data.
   * Padding characters (trailing '='s) are optional.
   * Example: The string 'rWmO++E6t7/rlw==' becomes the byte sequence
   * ad 69 8e fb e1 3a b7 bf eb 97
   */
  BASE64: 'base64',

  /**
   * Indicates the string should be interpreted as base64url-encoded data.
   * Padding characters (trailing '='s) are optional.
   * Example: The string 'rWmO--E6t7_rlw==' becomes the byte sequence
   * ad 69 8e fb e1 3a b7 bf eb 97
   */
  BASE64URL: 'base64url',

  /**
   * Indicates the string is a data URL, such as one obtained from
   * canvas.toDataURL().
   * Example: the string 'data:application/octet-stream;base64,aaaa'
   * becomes the byte sequence
   * 69 a6 9a
   * (the content-type "application/octet-stream" is also applied, but can
   * be overridden in the metadata object).
   */
  DATA_URL: 'data_url'
};

class StringData {
  constructor(data, contentType) {
    this.data = data;
    this.contentType = contentType || null;
  }

}
/**
 * @internal
 */


function dataFromString(format, stringData) {
  switch (format) {
    case StringFormat.RAW:
      return new StringData(utf8Bytes_(stringData));

    case StringFormat.BASE64:
    case StringFormat.BASE64URL:
      return new StringData(base64Bytes_(format, stringData));

    case StringFormat.DATA_URL:
      return new StringData(dataURLBytes_(stringData), dataURLContentType_(stringData));
    // do nothing
  } // assert(false);


  throw unknown();
}

function utf8Bytes_(value) {
  const b = [];

  for (let i = 0; i < value.length; i++) {
    let c = value.charCodeAt(i);

    if (c <= 127) {
      b.push(c);
    } else {
      if (c <= 2047) {
        b.push(192 | c >> 6, 128 | c & 63);
      } else {
        if ((c & 64512) === 55296) {
          // The start of a surrogate pair.
          const valid = i < value.length - 1 && (value.charCodeAt(i + 1) & 64512) === 56320;

          if (!valid) {
            // The second surrogate wasn't there.
            b.push(239, 191, 189);
          } else {
            const hi = c;
            const lo = value.charCodeAt(++i);
            c = 65536 | (hi & 1023) << 10 | lo & 1023;
            b.push(240 | c >> 18, 128 | c >> 12 & 63, 128 | c >> 6 & 63, 128 | c & 63);
          }
        } else {
          if ((c & 64512) === 56320) {
            // Invalid low surrogate.
            b.push(239, 191, 189);
          } else {
            b.push(224 | c >> 12, 128 | c >> 6 & 63, 128 | c & 63);
          }
        }
      }
    }
  }

  return new Uint8Array(b);
}

function percentEncodedBytes_(value) {
  let decoded;

  try {
    decoded = decodeURIComponent(value);
  } catch (e) {
    throw invalidFormat(StringFormat.DATA_URL, 'Malformed data URL.');
  }

  return utf8Bytes_(decoded);
}

function base64Bytes_(format, value) {
  switch (format) {
    case StringFormat.BASE64:
      {
        const hasMinus = value.indexOf('-') !== -1;
        const hasUnder = value.indexOf('_') !== -1;

        if (hasMinus || hasUnder) {
          const invalidChar = hasMinus ? '-' : '_';
          throw invalidFormat(format, "Invalid character '" + invalidChar + "' found: is it base64url encoded?");
        }

        break;
      }

    case StringFormat.BASE64URL:
      {
        const hasPlus = value.indexOf('+') !== -1;
        const hasSlash = value.indexOf('/') !== -1;

        if (hasPlus || hasSlash) {
          const invalidChar = hasPlus ? '+' : '/';
          throw invalidFormat(format, "Invalid character '" + invalidChar + "' found: is it base64 encoded?");
        }

        value = value.replace(/-/g, '+').replace(/_/g, '/');
        break;
      }
    // do nothing
  }

  let bytes;

  try {
    bytes = decodeBase64(value);
  } catch (e) {
    throw invalidFormat(format, 'Invalid character found');
  }

  const array = new Uint8Array(bytes.length);

  for (let i = 0; i < bytes.length; i++) {
    array[i] = bytes.charCodeAt(i);
  }

  return array;
}

class DataURLParts {
  constructor(dataURL) {
    this.base64 = false;
    this.contentType = null;
    const matches = dataURL.match(/^data:([^,]+)?,/);

    if (matches === null) {
      throw invalidFormat(StringFormat.DATA_URL, "Must be formatted 'data:[<mediatype>][;base64],<data>");
    }

    const middle = matches[1] || null;

    if (middle != null) {
      this.base64 = endsWith(middle, ';base64');
      this.contentType = this.base64 ? middle.substring(0, middle.length - ';base64'.length) : middle;
    }

    this.rest = dataURL.substring(dataURL.indexOf(',') + 1);
  }

}

function dataURLBytes_(dataUrl) {
  const parts = new DataURLParts(dataUrl);

  if (parts.base64) {
    return base64Bytes_(StringFormat.BASE64, parts.rest);
  } else {
    return percentEncodedBytes_(parts.rest);
  }
}

function dataURLContentType_(dataUrl) {
  const parts = new DataURLParts(dataUrl);
  return parts.contentType;
}

function endsWith(s, end) {
  const longEnough = s.length >= end.length;

  if (!longEnough) {
    return false;
  }

  return s.substring(s.length - end.length) === end;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param opt_elideCopy - If true, doesn't copy mutable input data
 *     (e.g. Uint8Arrays). Pass true only if you know the objects will not be
 *     modified after this blob's construction.
 *
 * @internal
 */


class FbsBlob {
  constructor(data, elideCopy) {
    let size = 0;
    let blobType = '';

    if (isNativeBlob(data)) {
      this.data_ = data;
      size = data.size;
      blobType = data.type;
    } else if (data instanceof ArrayBuffer) {
      if (elideCopy) {
        this.data_ = new Uint8Array(data);
      } else {
        this.data_ = new Uint8Array(data.byteLength);
        this.data_.set(new Uint8Array(data));
      }

      size = this.data_.length;
    } else if (data instanceof Uint8Array) {
      if (elideCopy) {
        this.data_ = data;
      } else {
        this.data_ = new Uint8Array(data.length);
        this.data_.set(data);
      }

      size = data.length;
    }

    this.size_ = size;
    this.type_ = blobType;
  }

  size() {
    return this.size_;
  }

  type() {
    return this.type_;
  }

  slice(startByte, endByte) {
    if (isNativeBlob(this.data_)) {
      const realBlob = this.data_;
      const sliced = sliceBlob(realBlob, startByte, endByte);

      if (sliced === null) {
        return null;
      }

      return new FbsBlob(sliced);
    } else {
      const slice = new Uint8Array(this.data_.buffer, startByte, endByte - startByte);
      return new FbsBlob(slice, true);
    }
  }

  static getBlob(...args) {
    if (isNativeBlobDefined()) {
      const blobby = args.map(val => {
        if (val instanceof FbsBlob) {
          return val.data_;
        } else {
          return val;
        }
      });
      return new FbsBlob(getBlob$1.apply(null, blobby));
    } else {
      const uint8Arrays = args.map(val => {
        if (isString(val)) {
          return dataFromString(StringFormat.RAW, val).data;
        } else {
          // Blobs don't exist, so this has to be a Uint8Array.
          return val.data_;
        }
      });
      let finalLength = 0;
      uint8Arrays.forEach(array => {
        finalLength += array.byteLength;
      });
      const merged = new Uint8Array(finalLength);
      let index = 0;
      uint8Arrays.forEach(array => {
        for (let i = 0; i < array.length; i++) {
          merged[index++] = array[i];
        }
      });
      return new FbsBlob(merged, true);
    }
  }

  uploadData() {
    return this.data_;
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns the Object resulting from parsing the given JSON, or null if the
 * given string does not represent a JSON object.
 */


function jsonObjectOrNull(s) {
  let obj;

  try {
    obj = JSON.parse(s);
  } catch (e) {
    return null;
  }

  if (isNonArrayObject(obj)) {
    return obj;
  } else {
    return null;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Contains helper methods for manipulating paths.
 */

/**
 * @return Null if the path is already at the root.
 */


function parent(path) {
  if (path.length === 0) {
    return null;
  }

  const index = path.lastIndexOf('/');

  if (index === -1) {
    return '';
  }

  const newPath = path.slice(0, index);
  return newPath;
}

function child(path, childPath) {
  const canonicalChildPath = childPath.split('/').filter(component => component.length > 0).join('/');

  if (path.length === 0) {
    return canonicalChildPath;
  } else {
    return path + '/' + canonicalChildPath;
  }
}
/**
 * Returns the last component of a path.
 * '/foo/bar' -> 'bar'
 * '/foo/bar/baz/' -> 'baz/'
 * '/a' -> 'a'
 */


function lastComponent(path) {
  const index = path.lastIndexOf('/', path.length - 2);

  if (index === -1) {
    return path;
  } else {
    return path.slice(index + 1);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function noXform_(metadata, value) {
  return value;
}

class Mapping {
  constructor(server, local, writable, xform) {
    this.server = server;
    this.local = local || server;
    this.writable = !!writable;
    this.xform = xform || noXform_;
  }

}

let mappings_ = null;

function xformPath(fullPath) {
  if (!isString(fullPath) || fullPath.length < 2) {
    return fullPath;
  } else {
    return lastComponent(fullPath);
  }
}

function getMappings() {
  if (mappings_) {
    return mappings_;
  }

  const mappings = [];
  mappings.push(new Mapping('bucket'));
  mappings.push(new Mapping('generation'));
  mappings.push(new Mapping('metageneration'));
  mappings.push(new Mapping('name', 'fullPath', true));

  function mappingsXformPath(_metadata, fullPath) {
    return xformPath(fullPath);
  }

  const nameMapping = new Mapping('name');
  nameMapping.xform = mappingsXformPath;
  mappings.push(nameMapping);
  /**
   * Coerces the second param to a number, if it is defined.
   */

  function xformSize(_metadata, size) {
    if (size !== undefined) {
      return Number(size);
    } else {
      return size;
    }
  }

  const sizeMapping = new Mapping('size');
  sizeMapping.xform = xformSize;
  mappings.push(sizeMapping);
  mappings.push(new Mapping('timeCreated'));
  mappings.push(new Mapping('updated'));
  mappings.push(new Mapping('md5Hash', null, true));
  mappings.push(new Mapping('cacheControl', null, true));
  mappings.push(new Mapping('contentDisposition', null, true));
  mappings.push(new Mapping('contentEncoding', null, true));
  mappings.push(new Mapping('contentLanguage', null, true));
  mappings.push(new Mapping('contentType', null, true));
  mappings.push(new Mapping('metadata', 'customMetadata', true));
  mappings_ = mappings;
  return mappings_;
}

function addRef(metadata, service) {
  function generateRef() {
    const bucket = metadata['bucket'];
    const path = metadata['fullPath'];
    const loc = new Location(bucket, path);
    return service._makeStorageReference(loc);
  }

  Object.defineProperty(metadata, 'ref', {
    get: generateRef
  });
}

function fromResource(service, resource, mappings) {
  const metadata = {};
  metadata['type'] = 'file';
  const len = mappings.length;

  for (let i = 0; i < len; i++) {
    const mapping = mappings[i];
    metadata[mapping.local] = mapping.xform(metadata, resource[mapping.server]);
  }

  addRef(metadata, service);
  return metadata;
}

function fromResourceString(service, resourceString, mappings) {
  const obj = jsonObjectOrNull(resourceString);

  if (obj === null) {
    return null;
  }

  const resource = obj;
  return fromResource(service, resource, mappings);
}

function downloadUrlFromResourceString(metadata, resourceString, host, protocol) {
  const obj = jsonObjectOrNull(resourceString);

  if (obj === null) {
    return null;
  }

  if (!isString(obj['downloadTokens'])) {
    // This can happen if objects are uploaded through GCS and retrieved
    // through list, so we don't want to throw an Error.
    return null;
  }

  const tokens = obj['downloadTokens'];

  if (tokens.length === 0) {
    return null;
  }

  const encode = encodeURIComponent;
  const tokensList = tokens.split(',');
  const urls = tokensList.map(token => {
    const bucket = metadata['bucket'];
    const path = metadata['fullPath'];
    const urlPart = '/b/' + encode(bucket) + '/o/' + encode(path);
    const base = makeUrl(urlPart, host, protocol);
    const queryString = makeQueryString({
      alt: 'media',
      token
    });
    return base + queryString;
  });
  return urls[0];
}

function toResourceString(metadata, mappings) {
  const resource = {};
  const len = mappings.length;

  for (let i = 0; i < len; i++) {
    const mapping = mappings[i];

    if (mapping.writable) {
      resource[mapping.server] = metadata[mapping.local];
    }
  }

  return JSON.stringify(resource);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const PREFIXES_KEY = 'prefixes';
const ITEMS_KEY = 'items';

function fromBackendResponse(service, bucket, resource) {
  const listResult = {
    prefixes: [],
    items: [],
    nextPageToken: resource['nextPageToken']
  };

  if (resource[PREFIXES_KEY]) {
    for (const path of resource[PREFIXES_KEY]) {
      const pathWithoutTrailingSlash = path.replace(/\/$/, '');

      const reference = service._makeStorageReference(new Location(bucket, pathWithoutTrailingSlash));

      listResult.prefixes.push(reference);
    }
  }

  if (resource[ITEMS_KEY]) {
    for (const item of resource[ITEMS_KEY]) {
      const reference = service._makeStorageReference(new Location(bucket, item['name']));

      listResult.items.push(reference);
    }
  }

  return listResult;
}

function fromResponseString(service, bucket, resourceString) {
  const obj = jsonObjectOrNull(resourceString);

  if (obj === null) {
    return null;
  }

  const resource = obj;
  return fromBackendResponse(service, bucket, resource);
}
/**
 * Contains a fully specified request.
 *
 * @param I - the type of the backend's network response.
 * @param O - the output response type used by the rest of the SDK.
 */


class RequestInfo {
  constructor(url, method,
  /**
   * Returns the value with which to resolve the request's promise. Only called
   * if the request is successful. Throw from this function to reject the
   * returned Request's promise with the thrown error.
   * Note: The XhrIo passed to this function may be reused after this callback
   * returns. Do not keep a reference to it in any way.
   */
  handler, timeout) {
    this.url = url;
    this.method = method;
    this.handler = handler;
    this.timeout = timeout;
    this.urlParams = {};
    this.headers = {};
    this.body = null;
    this.errorHandler = null;
    /**
     * Called with the current number of bytes uploaded and total size (-1 if not
     * computable) of the request body (i.e. used to report upload progress).
     */

    this.progressCallback = null;
    this.successCodes = [200];
    this.additionalRetryCodes = [];
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Throws the UNKNOWN StorageError if cndn is false.
 */


function handlerCheck(cndn) {
  if (!cndn) {
    throw unknown();
  }
}

function metadataHandler(service, mappings) {
  function handler(xhr, text) {
    const metadata = fromResourceString(service, text, mappings);
    handlerCheck(metadata !== null);
    return metadata;
  }

  return handler;
}

function listHandler(service, bucket) {
  function handler(xhr, text) {
    const listResult = fromResponseString(service, bucket, text);
    handlerCheck(listResult !== null);
    return listResult;
  }

  return handler;
}

function downloadUrlHandler(service, mappings) {
  function handler(xhr, text) {
    const metadata = fromResourceString(service, text, mappings);
    handlerCheck(metadata !== null);
    return downloadUrlFromResourceString(metadata, text, service.host, service._protocol);
  }

  return handler;
}

function sharedErrorHandler(location) {
  function errorHandler(xhr, err) {
    let newErr;

    if (xhr.getStatus() === 401) {
      if ( // This exact message string is the only consistent part of the
      // server's error response that identifies it as an App Check error.
      xhr.getErrorText().includes('Firebase App Check token is invalid')) {
        newErr = unauthorizedApp();
      } else {
        newErr = unauthenticated();
      }
    } else {
      if (xhr.getStatus() === 402) {
        newErr = quotaExceeded(location.bucket);
      } else {
        if (xhr.getStatus() === 403) {
          newErr = unauthorized(location.path);
        } else {
          newErr = err;
        }
      }
    }

    newErr.serverResponse = err.serverResponse;
    return newErr;
  }

  return errorHandler;
}

function objectErrorHandler(location) {
  const shared = sharedErrorHandler(location);

  function errorHandler(xhr, err) {
    let newErr = shared(xhr, err);

    if (xhr.getStatus() === 404) {
      newErr = objectNotFound(location.path);
    }

    newErr.serverResponse = err.serverResponse;
    return newErr;
  }

  return errorHandler;
}

function getMetadata$2(service, location, mappings) {
  const urlPart = location.fullServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'GET';
  const timeout = service.maxOperationRetryTime;
  const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
  requestInfo.errorHandler = objectErrorHandler(location);
  return requestInfo;
}

function list$2(service, location, delimiter, pageToken, maxResults) {
  const urlParams = {};

  if (location.isRoot) {
    urlParams['prefix'] = '';
  } else {
    urlParams['prefix'] = location.path + '/';
  }

  if (delimiter && delimiter.length > 0) {
    urlParams['delimiter'] = delimiter;
  }

  if (pageToken) {
    urlParams['pageToken'] = pageToken;
  }

  if (maxResults) {
    urlParams['maxResults'] = maxResults;
  }

  const urlPart = location.bucketOnlyServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'GET';
  const timeout = service.maxOperationRetryTime;
  const requestInfo = new RequestInfo(url, method, listHandler(service, location.bucket), timeout);
  requestInfo.urlParams = urlParams;
  requestInfo.errorHandler = sharedErrorHandler(location);
  return requestInfo;
}

function getBytes$1(service, location, maxDownloadSizeBytes) {
  const urlPart = location.fullServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol) + '?alt=media';
  const method = 'GET';
  const timeout = service.maxOperationRetryTime;
  const requestInfo = new RequestInfo(url, method, (_, data) => data, timeout);
  requestInfo.errorHandler = objectErrorHandler(location);

  if (maxDownloadSizeBytes !== undefined) {
    requestInfo.headers['Range'] = `bytes=0-${maxDownloadSizeBytes}`;
    requestInfo.successCodes = [200
    /* OK */
    , 206
    /* Partial Content */
    ];
  }

  return requestInfo;
}

function getDownloadUrl(service, location, mappings) {
  const urlPart = location.fullServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'GET';
  const timeout = service.maxOperationRetryTime;
  const requestInfo = new RequestInfo(url, method, downloadUrlHandler(service, mappings), timeout);
  requestInfo.errorHandler = objectErrorHandler(location);
  return requestInfo;
}

function updateMetadata$2(service, location, metadata, mappings) {
  const urlPart = location.fullServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'PATCH';
  const body = toResourceString(metadata, mappings);
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
  };
  const timeout = service.maxOperationRetryTime;
  const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
  requestInfo.headers = headers;
  requestInfo.body = body;
  requestInfo.errorHandler = objectErrorHandler(location);
  return requestInfo;
}

function deleteObject$2(service, location) {
  const urlPart = location.fullServerUrl();
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'DELETE';
  const timeout = service.maxOperationRetryTime;

  function handler(_xhr, _text) {}

  const requestInfo = new RequestInfo(url, method, handler, timeout);
  requestInfo.successCodes = [200, 204];
  requestInfo.errorHandler = objectErrorHandler(location);
  return requestInfo;
}

function determineContentType_(metadata, blob) {
  return metadata && metadata['contentType'] || blob && blob.type() || 'application/octet-stream';
}

function metadataForUpload_(location, blob, metadata) {
  const metadataClone = Object.assign({}, metadata);
  metadataClone['fullPath'] = location.path;
  metadataClone['size'] = blob.size();

  if (!metadataClone['contentType']) {
    metadataClone['contentType'] = determineContentType_(null, blob);
  }

  return metadataClone;
}
/**
 * Prepare RequestInfo for uploads as Content-Type: multipart.
 */


function multipartUpload(service, location, mappings, blob, metadata) {
  const urlPart = location.bucketOnlyServerUrl();
  const headers = {
    'X-Goog-Upload-Protocol': 'multipart'
  };

  function genBoundary() {
    let str = '';

    for (let i = 0; i < 2; i++) {
      str = str + Math.random().toString().slice(2);
    }

    return str;
  }

  const boundary = genBoundary();
  headers['Content-Type'] = 'multipart/related; boundary=' + boundary;
  const metadata_ = metadataForUpload_(location, blob, metadata);
  const metadataString = toResourceString(metadata_, mappings);
  const preBlobPart = '--' + boundary + '\r\n' + 'Content-Type: application/json; charset=utf-8\r\n\r\n' + metadataString + '\r\n--' + boundary + '\r\n' + 'Content-Type: ' + metadata_['contentType'] + '\r\n\r\n';
  const postBlobPart = '\r\n--' + boundary + '--';
  const body = FbsBlob.getBlob(preBlobPart, blob, postBlobPart);

  if (body === null) {
    throw cannotSliceBlob();
  }

  const urlParams = {
    name: metadata_['fullPath']
  };
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'POST';
  const timeout = service.maxUploadRetryTime;
  const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
  requestInfo.urlParams = urlParams;
  requestInfo.headers = headers;
  requestInfo.body = body.uploadData();
  requestInfo.errorHandler = sharedErrorHandler(location);
  return requestInfo;
}
/**
 * @param current The number of bytes that have been uploaded so far.
 * @param total The total number of bytes in the upload.
 * @param opt_finalized True if the server has finished the upload.
 * @param opt_metadata The upload metadata, should
 *     only be passed if opt_finalized is true.
 */


class ResumableUploadStatus {
  constructor(current, total, finalized, metadata) {
    this.current = current;
    this.total = total;
    this.finalized = !!finalized;
    this.metadata = metadata || null;
  }

}

function checkResumeHeader_(xhr, allowed) {
  let status = null;

  try {
    status = xhr.getResponseHeader('X-Goog-Upload-Status');
  } catch (e) {
    handlerCheck(false);
  }

  const allowedStatus = allowed || ['active'];
  handlerCheck(!!status && allowedStatus.indexOf(status) !== -1);
  return status;
}

function createResumableUpload(service, location, mappings, blob, metadata) {
  const urlPart = location.bucketOnlyServerUrl();
  const metadataForUpload = metadataForUpload_(location, blob, metadata);
  const urlParams = {
    name: metadataForUpload['fullPath']
  };
  const url = makeUrl(urlPart, service.host, service._protocol);
  const method = 'POST';
  const headers = {
    'X-Goog-Upload-Protocol': 'resumable',
    'X-Goog-Upload-Command': 'start',
    'X-Goog-Upload-Header-Content-Length': `${blob.size()}`,
    'X-Goog-Upload-Header-Content-Type': metadataForUpload['contentType'],
    'Content-Type': 'application/json; charset=utf-8'
  };
  const body = toResourceString(metadataForUpload, mappings);
  const timeout = service.maxUploadRetryTime;

  function handler(xhr) {
    checkResumeHeader_(xhr);
    let url;

    try {
      url = xhr.getResponseHeader('X-Goog-Upload-URL');
    } catch (e) {
      handlerCheck(false);
    }

    handlerCheck(isString(url));
    return url;
  }

  const requestInfo = new RequestInfo(url, method, handler, timeout);
  requestInfo.urlParams = urlParams;
  requestInfo.headers = headers;
  requestInfo.body = body;
  requestInfo.errorHandler = sharedErrorHandler(location);
  return requestInfo;
}
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 */


function getResumableUploadStatus(service, location, url, blob) {
  const headers = {
    'X-Goog-Upload-Command': 'query'
  };

  function handler(xhr) {
    const status = checkResumeHeader_(xhr, ['active', 'final']);
    let sizeString = null;

    try {
      sizeString = xhr.getResponseHeader('X-Goog-Upload-Size-Received');
    } catch (e) {
      handlerCheck(false);
    }

    if (!sizeString) {
      // null or empty string
      handlerCheck(false);
    }

    const size = Number(sizeString);
    handlerCheck(!isNaN(size));
    return new ResumableUploadStatus(size, blob.size(), status === 'final');
  }

  const method = 'POST';
  const timeout = service.maxUploadRetryTime;
  const requestInfo = new RequestInfo(url, method, handler, timeout);
  requestInfo.headers = headers;
  requestInfo.errorHandler = sharedErrorHandler(location);
  return requestInfo;
}
/**
 * Any uploads via the resumable upload API must transfer a number of bytes
 * that is a multiple of this number.
 */


const RESUMABLE_UPLOAD_CHUNK_SIZE = 256 * 1024;
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 * @param chunkSize Number of bytes to upload.
 * @param status The previous status.
 *     If not passed or null, we start from the beginning.
 * @throws fbs.Error If the upload is already complete, the passed in status
 *     has a final size inconsistent with the blob, or the blob cannot be sliced
 *     for upload.
 */

function continueResumableUpload(location, service, url, blob, chunkSize, mappings, status, progressCallback) {
  // TODO(andysoto): standardize on internal asserts
  // assert(!(opt_status && opt_status.finalized));
  const status_ = new ResumableUploadStatus(0, 0);

  if (status) {
    status_.current = status.current;
    status_.total = status.total;
  } else {
    status_.current = 0;
    status_.total = blob.size();
  }

  if (blob.size() !== status_.total) {
    throw serverFileWrongSize();
  }

  const bytesLeft = status_.total - status_.current;
  let bytesToUpload = bytesLeft;

  if (chunkSize > 0) {
    bytesToUpload = Math.min(bytesToUpload, chunkSize);
  }

  const startByte = status_.current;
  const endByte = startByte + bytesToUpload;
  const uploadCommand = bytesToUpload === bytesLeft ? 'upload, finalize' : 'upload';
  const headers = {
    'X-Goog-Upload-Command': uploadCommand,
    'X-Goog-Upload-Offset': `${status_.current}`
  };
  const body = blob.slice(startByte, endByte);

  if (body === null) {
    throw cannotSliceBlob();
  }

  function handler(xhr, text) {
    // TODO(andysoto): Verify the MD5 of each uploaded range:
    // the 'x-range-md5' header comes back with status code 308 responses.
    // We'll only be able to bail out though, because you can't re-upload a
    // range that you previously uploaded.
    const uploadStatus = checkResumeHeader_(xhr, ['active', 'final']);
    const newCurrent = status_.current + bytesToUpload;
    const size = blob.size();
    let metadata;

    if (uploadStatus === 'final') {
      metadata = metadataHandler(service, mappings)(xhr, text);
    } else {
      metadata = null;
    }

    return new ResumableUploadStatus(newCurrent, size, uploadStatus === 'final', metadata);
  }

  const method = 'POST';
  const timeout = service.maxUploadRetryTime;
  const requestInfo = new RequestInfo(url, method, handler, timeout);
  requestInfo.headers = headers;
  requestInfo.body = body.uploadData();
  requestInfo.progressCallback = progressCallback || null;
  requestInfo.errorHandler = sharedErrorHandler(location);
  return requestInfo;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An event that is triggered on a task.
 * @internal
 */


const TaskEvent = {
  /**
   * For this event,
   * <ul>
   *   <li>The `next` function is triggered on progress updates and when the
   *       task is paused/resumed with an `UploadTaskSnapshot` as the first
   *       argument.</li>
   *   <li>The `error` function is triggered if the upload is canceled or fails
   *       for another reason.</li>
   *   <li>The `complete` function is triggered if the upload completes
   *       successfully.</li>
   * </ul>
   */
  STATE_CHANGED: 'state_changed'
}; // type keys = keyof TaskState

/**
 * Represents the current state of a running upload.
 * @internal
 */

const TaskState = {
  /** The task is currently transferring data. */
  RUNNING: 'running',

  /** The task was paused by the user. */
  PAUSED: 'paused',

  /** The task completed successfully. */
  SUCCESS: 'success',

  /** The task was canceled. */
  CANCELED: 'canceled',

  /** The task failed with an error. */
  ERROR: 'error'
};

function taskStateFromInternalTaskState(state) {
  switch (state) {
    case "running"
    /* RUNNING */
    :
    case "pausing"
    /* PAUSING */
    :
    case "canceling"
    /* CANCELING */
    :
      return TaskState.RUNNING;

    case "paused"
    /* PAUSED */
    :
      return TaskState.PAUSED;

    case "success"
    /* SUCCESS */
    :
      return TaskState.SUCCESS;

    case "canceled"
    /* CANCELED */
    :
      return TaskState.CANCELED;

    case "error"
    /* ERROR */
    :
      return TaskState.ERROR;

    default:
      // TODO(andysoto): assert(false);
      return TaskState.ERROR;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class Observer {
  constructor(nextOrObserver, error, complete) {
    const asFunctions = isFunction(nextOrObserver) || error != null || complete != null;

    if (asFunctions) {
      this.next = nextOrObserver;
      this.error = error !== null && error !== void 0 ? error : undefined;
      this.complete = complete !== null && complete !== void 0 ? complete : undefined;
    } else {
      const observer = nextOrObserver;
      this.next = observer.next;
      this.error = observer.error;
      this.complete = observer.complete;
    }
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a function that invokes f with its arguments asynchronously as a
 * microtask, i.e. as soon as possible after the current script returns back
 * into browser code.
 */
// eslint-disable-next-line @typescript-eslint/ban-types


function async(f) {
  return (...argsToForward) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.resolve().then(() => f(...argsToForward));
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** An override for the text-based Connection. Used in tests. */


let textFactoryOverride = null;
/**
 * Network layer for browsers. We use this instead of goog.net.XhrIo because
 * goog.net.XhrIo is hyuuuuge and doesn't work in React Native on Android.
 */

class XhrConnection {
  constructor() {
    this.sent_ = false;
    this.xhr_ = new XMLHttpRequest();
    this.initXhr();
    this.errorCode_ = ErrorCode.NO_ERROR;
    this.sendPromise_ = new Promise(resolve => {
      this.xhr_.addEventListener('abort', () => {
        this.errorCode_ = ErrorCode.ABORT;
        resolve();
      });
      this.xhr_.addEventListener('error', () => {
        this.errorCode_ = ErrorCode.NETWORK_ERROR;
        resolve();
      });
      this.xhr_.addEventListener('load', () => {
        resolve();
      });
    });
  }

  send(url, method, body, headers) {
    if (this.sent_) {
      throw internalError('cannot .send() more than once');
    }

    this.sent_ = true;
    this.xhr_.open(method, url, true);

    if (headers !== undefined) {
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          this.xhr_.setRequestHeader(key, headers[key].toString());
        }
      }
    }

    if (body !== undefined) {
      this.xhr_.send(body);
    } else {
      this.xhr_.send();
    }

    return this.sendPromise_;
  }

  getErrorCode() {
    if (!this.sent_) {
      throw internalError('cannot .getErrorCode() before sending');
    }

    return this.errorCode_;
  }

  getStatus() {
    if (!this.sent_) {
      throw internalError('cannot .getStatus() before sending');
    }

    try {
      return this.xhr_.status;
    } catch (e) {
      return -1;
    }
  }

  getResponse() {
    if (!this.sent_) {
      throw internalError('cannot .getResponse() before sending');
    }

    return this.xhr_.response;
  }

  getErrorText() {
    if (!this.sent_) {
      throw internalError('cannot .getErrorText() before sending');
    }

    return this.xhr_.statusText;
  }
  /** Aborts the request. */


  abort() {
    this.xhr_.abort();
  }

  getResponseHeader(header) {
    return this.xhr_.getResponseHeader(header);
  }

  addUploadProgressListener(listener) {
    if (this.xhr_.upload != null) {
      this.xhr_.upload.addEventListener('progress', listener);
    }
  }

  removeUploadProgressListener(listener) {
    if (this.xhr_.upload != null) {
      this.xhr_.upload.removeEventListener('progress', listener);
    }
  }

}

class XhrTextConnection extends XhrConnection {
  initXhr() {
    this.xhr_.responseType = 'text';
  }

}

function newTextConnection() {
  return textFactoryOverride ? textFactoryOverride() : new XhrTextConnection();
}

class XhrBytesConnection extends XhrConnection {
  initXhr() {
    this.xhr_.responseType = 'arraybuffer';
  }

}

function newBytesConnection() {
  return new XhrBytesConnection();
}

class XhrBlobConnection extends XhrConnection {
  initXhr() {
    this.xhr_.responseType = 'blob';
  }

}

function newBlobConnection() {
  return new XhrBlobConnection();
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents a blob being uploaded. Can be used to pause/resume/cancel the
 * upload and manage callbacks for various events.
 * @internal
 */


class UploadTask {
  /**
   * @param ref - The firebaseStorage.Reference object this task came
   *     from, untyped to avoid cyclic dependencies.
   * @param blob - The blob to upload.
   */
  constructor(ref, blob, metadata = null) {
    /**
     * Number of bytes transferred so far.
     */
    this._transferred = 0;
    this._needToFetchStatus = false;
    this._needToFetchMetadata = false;
    this._observers = [];
    this._error = undefined;
    this._uploadUrl = undefined;
    this._request = undefined;
    this._chunkMultiplier = 1;
    this._resolve = undefined;
    this._reject = undefined;
    this._ref = ref;
    this._blob = blob;
    this._metadata = metadata;
    this._mappings = getMappings();
    this._resumable = this._shouldDoResumable(this._blob);
    this._state = "running"
    /* RUNNING */
    ;

    this._errorHandler = error => {
      this._request = undefined;
      this._chunkMultiplier = 1;

      if (error._codeEquals("canceled"
      /* CANCELED */
      )) {
        this._needToFetchStatus = true;
        this.completeTransitions_();
      } else {
        this._error = error;

        this._transition("error"
        /* ERROR */
        );
      }
    };

    this._metadataErrorHandler = error => {
      this._request = undefined;

      if (error._codeEquals("canceled"
      /* CANCELED */
      )) {
        this.completeTransitions_();
      } else {
        this._error = error;

        this._transition("error"
        /* ERROR */
        );
      }
    };

    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;

      this._start();
    }); // Prevent uncaught rejections on the internal promise from bubbling out
    // to the top level with a dummy handler.

    this._promise.then(null, () => {});
  }

  _makeProgressCallback() {
    const sizeBefore = this._transferred;
    return loaded => this._updateProgress(sizeBefore + loaded);
  }

  _shouldDoResumable(blob) {
    return blob.size() > 256 * 1024;
  }

  _start() {
    if (this._state !== "running"
    /* RUNNING */
    ) {
      // This can happen if someone pauses us in a resume callback, for example.
      return;
    }

    if (this._request !== undefined) {
      return;
    }

    if (this._resumable) {
      if (this._uploadUrl === undefined) {
        this._createResumable();
      } else {
        if (this._needToFetchStatus) {
          this._fetchStatus();
        } else {
          if (this._needToFetchMetadata) {
            // Happens if we miss the metadata on upload completion.
            this._fetchMetadata();
          } else {
            this._continueUpload();
          }
        }
      }
    } else {
      this._oneShotUpload();
    }
  }

  _resolveToken(callback) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.all([this._ref.storage._getAuthToken(), this._ref.storage._getAppCheckToken()]).then(([authToken, appCheckToken]) => {
      switch (this._state) {
        case "running"
        /* RUNNING */
        :
          callback(authToken, appCheckToken);
          break;

        case "canceling"
        /* CANCELING */
        :
          this._transition("canceled"
          /* CANCELED */
          );

          break;

        case "pausing"
        /* PAUSING */
        :
          this._transition("paused"
          /* PAUSED */
          );

          break;
      }
    });
  } // TODO(andysoto): assert false


  _createResumable() {
    this._resolveToken((authToken, appCheckToken) => {
      const requestInfo = createResumableUpload(this._ref.storage, this._ref._location, this._mappings, this._blob, this._metadata);

      const createRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);

      this._request = createRequest;
      createRequest.getPromise().then(url => {
        this._request = undefined;
        this._uploadUrl = url;
        this._needToFetchStatus = false;
        this.completeTransitions_();
      }, this._errorHandler);
    });
  }

  _fetchStatus() {
    // TODO(andysoto): assert(this.uploadUrl_ !== null);
    const url = this._uploadUrl;

    this._resolveToken((authToken, appCheckToken) => {
      const requestInfo = getResumableUploadStatus(this._ref.storage, this._ref._location, url, this._blob);

      const statusRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);

      this._request = statusRequest;
      statusRequest.getPromise().then(status => {
        status = status;
        this._request = undefined;

        this._updateProgress(status.current);

        this._needToFetchStatus = false;

        if (status.finalized) {
          this._needToFetchMetadata = true;
        }

        this.completeTransitions_();
      }, this._errorHandler);
    });
  }

  _continueUpload() {
    const chunkSize = RESUMABLE_UPLOAD_CHUNK_SIZE * this._chunkMultiplier;
    const status = new ResumableUploadStatus(this._transferred, this._blob.size()); // TODO(andysoto): assert(this.uploadUrl_ !== null);

    const url = this._uploadUrl;

    this._resolveToken((authToken, appCheckToken) => {
      let requestInfo;

      try {
        requestInfo = continueResumableUpload(this._ref._location, this._ref.storage, url, this._blob, chunkSize, this._mappings, status, this._makeProgressCallback());
      } catch (e) {
        this._error = e;

        this._transition("error"
        /* ERROR */
        );

        return;
      }

      const uploadRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);

      this._request = uploadRequest;
      uploadRequest.getPromise().then(newStatus => {
        this._increaseMultiplier();

        this._request = undefined;

        this._updateProgress(newStatus.current);

        if (newStatus.finalized) {
          this._metadata = newStatus.metadata;

          this._transition("success"
          /* SUCCESS */
          );
        } else {
          this.completeTransitions_();
        }
      }, this._errorHandler);
    });
  }

  _increaseMultiplier() {
    const currentSize = RESUMABLE_UPLOAD_CHUNK_SIZE * this._chunkMultiplier; // Max chunk size is 32M.

    if (currentSize < 32 * 1024 * 1024) {
      this._chunkMultiplier *= 2;
    }
  }

  _fetchMetadata() {
    this._resolveToken((authToken, appCheckToken) => {
      const requestInfo = getMetadata$2(this._ref.storage, this._ref._location, this._mappings);

      const metadataRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);

      this._request = metadataRequest;
      metadataRequest.getPromise().then(metadata => {
        this._request = undefined;
        this._metadata = metadata;

        this._transition("success"
        /* SUCCESS */
        );
      }, this._metadataErrorHandler);
    });
  }

  _oneShotUpload() {
    this._resolveToken((authToken, appCheckToken) => {
      const requestInfo = multipartUpload(this._ref.storage, this._ref._location, this._mappings, this._blob, this._metadata);

      const multipartRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);

      this._request = multipartRequest;
      multipartRequest.getPromise().then(metadata => {
        this._request = undefined;
        this._metadata = metadata;

        this._updateProgress(this._blob.size());

        this._transition("success"
        /* SUCCESS */
        );
      }, this._errorHandler);
    });
  }

  _updateProgress(transferred) {
    const old = this._transferred;
    this._transferred = transferred; // A progress update can make the "transferred" value smaller (e.g. a
    // partial upload not completed by server, after which the "transferred"
    // value may reset to the value at the beginning of the request).

    if (this._transferred !== old) {
      this._notifyObservers();
    }
  }

  _transition(state) {
    if (this._state === state) {
      return;
    }

    switch (state) {
      case "canceling"
      /* CANCELING */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.RUNNING ||
        //        this.state_ === InternalTaskState.PAUSING);
        this._state = state;

        if (this._request !== undefined) {
          this._request.cancel();
        }

        break;

      case "pausing"
      /* PAUSING */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.RUNNING);
        this._state = state;

        if (this._request !== undefined) {
          this._request.cancel();
        }

        break;

      case "running"
      /* RUNNING */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.PAUSED ||
        //        this.state_ === InternalTaskState.PAUSING);
        const wasPaused = this._state === "paused"
        /* PAUSED */
        ;
        this._state = state;

        if (wasPaused) {
          this._notifyObservers();

          this._start();
        }

        break;

      case "paused"
      /* PAUSED */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.PAUSING);
        this._state = state;

        this._notifyObservers();

        break;

      case "canceled"
      /* CANCELED */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.PAUSED ||
        //        this.state_ === InternalTaskState.CANCELING);
        this._error = canceled();
        this._state = state;

        this._notifyObservers();

        break;

      case "error"
      /* ERROR */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.RUNNING ||
        //        this.state_ === InternalTaskState.PAUSING ||
        //        this.state_ === InternalTaskState.CANCELING);
        this._state = state;

        this._notifyObservers();

        break;

      case "success"
      /* SUCCESS */
      :
        // TODO(andysoto):
        // assert(this.state_ === InternalTaskState.RUNNING ||
        //        this.state_ === InternalTaskState.PAUSING ||
        //        this.state_ === InternalTaskState.CANCELING);
        this._state = state;

        this._notifyObservers();

        break;
    }
  }

  completeTransitions_() {
    switch (this._state) {
      case "pausing"
      /* PAUSING */
      :
        this._transition("paused"
        /* PAUSED */
        );

        break;

      case "canceling"
      /* CANCELING */
      :
        this._transition("canceled"
        /* CANCELED */
        );

        break;

      case "running"
      /* RUNNING */
      :
        this._start();

        break;
    }
  }
  /**
   * A snapshot of the current task state.
   */


  get snapshot() {
    const externalState = taskStateFromInternalTaskState(this._state);
    return {
      bytesTransferred: this._transferred,
      totalBytes: this._blob.size(),
      state: externalState,
      metadata: this._metadata,
      task: this,
      ref: this._ref
    };
  }
  /**
   * Adds a callback for an event.
   * @param type - The type of event to listen for.
   * @param nextOrObserver -
   *     The `next` function, which gets called for each item in
   *     the event stream, or an observer object with some or all of these three
   *     properties (`next`, `error`, `complete`).
   * @param error - A function that gets called with a `StorageError`
   *     if the event stream ends due to an error.
   * @param completed - A function that gets called if the
   *     event stream ends normally.
   * @returns
   *     If only the event argument is passed, returns a function you can use to
   *     add callbacks (see the examples above). If more than just the event
   *     argument is passed, returns a function you can call to unregister the
   *     callbacks.
   */


  on(type, nextOrObserver, error, completed) {
    const observer = new Observer(nextOrObserver || undefined, error || undefined, completed || undefined);

    this._addObserver(observer);

    return () => {
      this._removeObserver(observer);
    };
  }
  /**
   * This object behaves like a Promise, and resolves with its snapshot data
   * when the upload completes.
   * @param onFulfilled - The fulfillment callback. Promise chaining works as normal.
   * @param onRejected - The rejection callback.
   */


  then(onFulfilled, onRejected) {
    // These casts are needed so that TypeScript can infer the types of the
    // resulting Promise.
    return this._promise.then(onFulfilled, onRejected);
  }
  /**
   * Equivalent to calling `then(null, onRejected)`.
   */


  catch(onRejected) {
    return this.then(null, onRejected);
  }
  /**
   * Adds the given observer.
   */


  _addObserver(observer) {
    this._observers.push(observer);

    this._notifyObserver(observer);
  }
  /**
   * Removes the given observer.
   */


  _removeObserver(observer) {
    const i = this._observers.indexOf(observer);

    if (i !== -1) {
      this._observers.splice(i, 1);
    }
  }

  _notifyObservers() {
    this._finishPromise();

    const observers = this._observers.slice();

    observers.forEach(observer => {
      this._notifyObserver(observer);
    });
  }

  _finishPromise() {
    if (this._resolve !== undefined) {
      let triggered = true;

      switch (taskStateFromInternalTaskState(this._state)) {
        case TaskState.SUCCESS:
          async(this._resolve.bind(null, this.snapshot))();
          break;

        case TaskState.CANCELED:
        case TaskState.ERROR:
          const toCall = this._reject;
          async(toCall.bind(null, this._error))();
          break;

        default:
          triggered = false;
          break;
      }

      if (triggered) {
        this._resolve = undefined;
        this._reject = undefined;
      }
    }
  }

  _notifyObserver(observer) {
    const externalState = taskStateFromInternalTaskState(this._state);

    switch (externalState) {
      case TaskState.RUNNING:
      case TaskState.PAUSED:
        if (observer.next) {
          async(observer.next.bind(observer, this.snapshot))();
        }

        break;

      case TaskState.SUCCESS:
        if (observer.complete) {
          async(observer.complete.bind(observer))();
        }

        break;

      case TaskState.CANCELED:
      case TaskState.ERROR:
        if (observer.error) {
          async(observer.error.bind(observer, this._error))();
        }

        break;

      default:
        // TODO(andysoto): assert(false);
        if (observer.error) {
          async(observer.error.bind(observer, this._error))();
        }

    }
  }
  /**
   * Resumes a paused task. Has no effect on a currently running or failed task.
   * @returns True if the operation took effect, false if ignored.
   */


  resume() {
    const valid = this._state === "paused"
    /* PAUSED */
    || this._state === "pausing"
    /* PAUSING */
    ;

    if (valid) {
      this._transition("running"
      /* RUNNING */
      );
    }

    return valid;
  }
  /**
   * Pauses a currently running task. Has no effect on a paused or failed task.
   * @returns True if the operation took effect, false if ignored.
   */


  pause() {
    const valid = this._state === "running"
    /* RUNNING */
    ;

    if (valid) {
      this._transition("pausing"
      /* PAUSING */
      );
    }

    return valid;
  }
  /**
   * Cancels a currently running or paused task. Has no effect on a complete or
   * failed task.
   * @returns True if the operation took effect, false if ignored.
   */


  cancel() {
    const valid = this._state === "running"
    /* RUNNING */
    || this._state === "pausing"
    /* PAUSING */
    ;

    if (valid) {
      this._transition("canceling"
      /* CANCELING */
      );
    }

    return valid;
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provides methods to interact with a bucket in the Firebase Storage service.
 * @internal
 * @param _location - An fbs.location, or the URL at
 *     which to base this object, in one of the following forms:
 *         gs://<bucket>/<object-path>
 *         http[s]://firebasestorage.googleapis.com/
 *                     <api-version>/b/<bucket>/o/<object-path>
 *     Any query or fragment strings will be ignored in the http[s]
 *     format. If no value is passed, the storage object will use a URL based on
 *     the project ID of the base firebase.App instance.
 */


class Reference {
  constructor(_service, location) {
    this._service = _service;

    if (location instanceof Location) {
      this._location = location;
    } else {
      this._location = Location.makeFromUrl(location, _service.host);
    }
  }
  /**
   * Returns the URL for the bucket and path this object references,
   *     in the form gs://<bucket>/<object-path>
   * @override
   */


  toString() {
    return 'gs://' + this._location.bucket + '/' + this._location.path;
  }

  _newRef(service, location) {
    return new Reference(service, location);
  }
  /**
   * A reference to the root of this object's bucket.
   */


  get root() {
    const location = new Location(this._location.bucket, '');
    return this._newRef(this._service, location);
  }
  /**
   * The name of the bucket containing this reference's object.
   */


  get bucket() {
    return this._location.bucket;
  }
  /**
   * The full path of this object.
   */


  get fullPath() {
    return this._location.path;
  }
  /**
   * The short name of this object, which is the last component of the full path.
   * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
   */


  get name() {
    return lastComponent(this._location.path);
  }
  /**
   * The `StorageService` instance this `StorageReference` is associated with.
   */


  get storage() {
    return this._service;
  }
  /**
   * A `StorageReference` pointing to the parent location of this `StorageReference`, or null if
   * this reference is the root.
   */


  get parent() {
    const newPath = parent(this._location.path);

    if (newPath === null) {
      return null;
    }

    const location = new Location(this._location.bucket, newPath);
    return new Reference(this._service, location);
  }
  /**
   * Utility function to throw an error in methods that do not accept a root reference.
   */


  _throwIfRoot(name) {
    if (this._location.path === '') {
      throw invalidRootOperation(name);
    }
  }

}
/**
 * Download the bytes at the object's location.
 * @returns A Promise containing the downloaded bytes.
 */


function getBytesInternal(ref, maxDownloadSizeBytes) {
  ref._throwIfRoot('getBytes');

  const requestInfo = getBytes$1(ref.storage, ref._location, maxDownloadSizeBytes);
  return ref.storage.makeRequestWithTokens(requestInfo, newBytesConnection).then(bytes => maxDownloadSizeBytes !== undefined ? // GCS may not honor the Range header for small files
  bytes.slice(0, maxDownloadSizeBytes) : bytes);
}
/**
 * Download the bytes at the object's location.
 * @returns A Promise containing the downloaded blob.
 */


function getBlobInternal(ref, maxDownloadSizeBytes) {
  ref._throwIfRoot('getBlob');

  const requestInfo = getBytes$1(ref.storage, ref._location, maxDownloadSizeBytes);
  return ref.storage.makeRequestWithTokens(requestInfo, newBlobConnection).then(blob => maxDownloadSizeBytes !== undefined ? // GCS may not honor the Range header for small files
  blob.slice(0, maxDownloadSizeBytes) : blob);
}
/**
 * Uploads data to this object's location.
 * The upload is not resumable.
 *
 * @param ref - StorageReference where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the newly uploaded data.
 * @returns A Promise containing an UploadResult
 */


function uploadBytes$1(ref, data, metadata) {
  ref._throwIfRoot('uploadBytes');

  const requestInfo = multipartUpload(ref.storage, ref._location, getMappings(), new FbsBlob(data, true), metadata);
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection).then(finalMetadata => {
    return {
      metadata: finalMetadata,
      ref
    };
  });
}
/**
 * Uploads data to this object's location.
 * The upload can be paused and resumed, and exposes progress updates.
 * @public
 * @param ref - StorageReference where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the newly uploaded data.
 * @returns An UploadTask
 */


function uploadBytesResumable$1(ref, data, metadata) {
  ref._throwIfRoot('uploadBytesResumable');

  return new UploadTask(ref, new FbsBlob(data), metadata);
}
/**
 * Uploads a string to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - StorageReference where string should be uploaded.
 * @param value - The string to upload.
 * @param format - The format of the string to upload.
 * @param metadata - Metadata for the newly uploaded string.
 * @returns A Promise containing an UploadResult
 */


function uploadString$1(ref, value, format = StringFormat.RAW, metadata) {
  ref._throwIfRoot('uploadString');

  const data = dataFromString(format, value);
  const metadataClone = Object.assign({}, metadata);

  if (metadataClone['contentType'] == null && data.contentType != null) {
    metadataClone['contentType'] = data.contentType;
  }

  return uploadBytes$1(ref, data.data, metadataClone);
}
/**
 * List all items (files) and prefixes (folders) under this storage reference.
 *
 * This is a helper method for calling list() repeatedly until there are
 * no more results. The default pagination size is 1000.
 *
 * Note: The results may not be consistent if objects are changed while this
 * operation is running.
 *
 * Warning: listAll may potentially consume too many resources if there are
 * too many results.
 * @public
 * @param ref - StorageReference to get list from.
 *
 * @returns A Promise that resolves with all the items and prefixes under
 *      the current storage reference. `prefixes` contains references to
 *      sub-directories and `items` contains references to objects in this
 *      folder. `nextPageToken` is never returned.
 */


function listAll$1(ref) {
  const accumulator = {
    prefixes: [],
    items: []
  };
  return listAllHelper(ref, accumulator).then(() => accumulator);
}
/**
 * Separated from listAll because async functions can't use "arguments".
 * @param ref
 * @param accumulator
 * @param pageToken
 */


function listAllHelper(_x, _x2, _x3) {
  return _listAllHelper.apply(this, arguments);
}
/**
 * List items (files) and prefixes (folders) under this storage reference.
 *
 * List API is only available for Firebase Rules Version 2.
 *
 * GCS is a key-blob store. Firebase Storage imposes the semantic of '/'
 * delimited folder structure.
 * Refer to GCS's List API if you want to learn more.
 *
 * To adhere to Firebase Rules's Semantics, Firebase Storage does not
 * support objects whose paths end with "/" or contain two consecutive
 * "/"s. Firebase Storage List API will filter these unsupported objects.
 * list() may fail if there are too many unsupported objects in the bucket.
 * @public
 *
 * @param ref - StorageReference to get list from.
 * @param options - See ListOptions for details.
 * @returns A Promise that resolves with the items and prefixes.
 *      `prefixes` contains references to sub-folders and `items`
 *      contains references to objects in this folder. `nextPageToken`
 *      can be used to get the rest of the results.
 */


function _listAllHelper() {
  _listAllHelper = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (ref, accumulator, pageToken) {
    const opt = {
      // maxResults is 1000 by default.
      pageToken
    };
    const nextPage = yield list$1(ref, opt);
    accumulator.prefixes.push(...nextPage.prefixes);
    accumulator.items.push(...nextPage.items);

    if (nextPage.nextPageToken != null) {
      yield listAllHelper(ref, accumulator, nextPage.nextPageToken);
    }
  });
  return _listAllHelper.apply(this, arguments);
}

function list$1(ref, options) {
  if (options != null) {
    if (typeof options.maxResults === 'number') {
      validateNumber('options.maxResults',
      /* minValue= */
      1,
      /* maxValue= */
      1000, options.maxResults);
    }
  }

  const op = options || {};
  const requestInfo = list$2(ref.storage, ref._location,
  /*delimiter= */
  '/', op.pageToken, op.maxResults);
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * A `Promise` that resolves with the metadata for this object. If this
 * object doesn't exist or metadata cannot be retreived, the promise is
 * rejected.
 * @public
 * @param ref - StorageReference to get metadata from.
 */


function getMetadata$1(ref) {
  ref._throwIfRoot('getMetadata');

  const requestInfo = getMetadata$2(ref.storage, ref._location, getMappings());
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * Updates the metadata for this object.
 * @public
 * @param ref - StorageReference to update metadata for.
 * @param metadata - The new metadata for the object.
 *     Only values that have been explicitly set will be changed. Explicitly
 *     setting a value to null will remove the metadata.
 * @returns A `Promise` that resolves
 *     with the new metadata for this object.
 *     See `firebaseStorage.Reference.prototype.getMetadata`
 */


function updateMetadata$1(ref, metadata) {
  ref._throwIfRoot('updateMetadata');

  const requestInfo = updateMetadata$2(ref.storage, ref._location, metadata, getMappings());
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * Returns the download URL for the given Reference.
 * @public
 * @returns A `Promise` that resolves with the download
 *     URL for this object.
 */


function getDownloadURL$1(ref) {
  ref._throwIfRoot('getDownloadURL');

  const requestInfo = getDownloadUrl(ref.storage, ref._location, getMappings());
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection).then(url => {
    if (url === null) {
      throw noDownloadURL();
    }

    return url;
  });
}
/**
 * Deletes the object at this location.
 * @public
 * @param ref - StorageReference for object to delete.
 * @returns A `Promise` that resolves if the deletion succeeds.
 */


function deleteObject$1(ref) {
  ref._throwIfRoot('deleteObject');

  const requestInfo = deleteObject$2(ref.storage, ref._location);
  return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * Returns reference for object obtained by appending `childPath` to `ref`.
 *
 * @param ref - StorageReference to get child of.
 * @param childPath - Child path from provided ref.
 * @returns A reference to the object obtained by
 * appending childPath, removing any duplicate, beginning, or trailing
 * slashes.
 *
 */


function _getChild$1(ref, childPath) {
  const newPath = child(ref._location.path, childPath);
  const location = new Location(ref._location.bucket, newPath);
  return new Reference(ref.storage, location);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function isUrl(path) {
  return /^[A-Za-z]+:\/\//.test(path);
}
/**
 * Returns a firebaseStorage.Reference for the given url.
 */


function refFromURL(service, url) {
  return new Reference(service, url);
}
/**
 * Returns a firebaseStorage.Reference for the given path in the default
 * bucket.
 */


function refFromPath(ref, path) {
  if (ref instanceof FirebaseStorageImpl) {
    const service = ref;

    if (service._bucket == null) {
      throw noDefaultBucket();
    }

    const reference = new Reference(service, service._bucket);

    if (path != null) {
      return refFromPath(reference, path);
    } else {
      return reference;
    }
  } else {
    // ref is a Reference
    if (path !== undefined) {
      return _getChild$1(ref, path);
    } else {
      return ref;
    }
  }
}

function ref$1(serviceOrRef, pathOrUrl) {
  if (pathOrUrl && isUrl(pathOrUrl)) {
    if (serviceOrRef instanceof FirebaseStorageImpl) {
      return refFromURL(serviceOrRef, pathOrUrl);
    } else {
      throw invalidArgument('To use ref(service, url), the first argument must be a Storage instance.');
    }
  } else {
    return refFromPath(serviceOrRef, pathOrUrl);
  }
}

function extractBucket(host, config) {
  const bucketString = config === null || config === void 0 ? void 0 : config[CONFIG_STORAGE_BUCKET_KEY];

  if (bucketString == null) {
    return null;
  }

  return Location.makeFromBucketSpec(bucketString, host);
}

function connectStorageEmulator$1(storage, host, port, options = {}) {
  storage.host = `${host}:${port}`;
  storage._protocol = 'http';
  const {
    mockUserToken
  } = options;

  if (mockUserToken) {
    storage._overrideAuthToken = typeof mockUserToken === 'string' ? mockUserToken : (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.createMockUserToken)(mockUserToken, storage.app.options.projectId);
  }
}
/**
 * A service that provides Firebase Storage Reference instances.
 * @param opt_url - gs:// url to a custom Storage Bucket
 *
 * @internal
 */


class FirebaseStorageImpl {
  constructor(
  /**
   * FirebaseApp associated with this StorageService instance.
   */
  app, _authProvider,
  /**
   * @internal
   */
  _appCheckProvider,
  /**
   * @internal
   */
  _url, _firebaseVersion) {
    this.app = app;
    this._authProvider = _authProvider;
    this._appCheckProvider = _appCheckProvider;
    this._url = _url;
    this._firebaseVersion = _firebaseVersion;
    this._bucket = null;
    /**
     * This string can be in the formats:
     * - host
     * - host:port
     */

    this._host = DEFAULT_HOST;
    this._protocol = 'https';
    this._appId = null;
    this._deleted = false;
    this._maxOperationRetryTime = DEFAULT_MAX_OPERATION_RETRY_TIME;
    this._maxUploadRetryTime = DEFAULT_MAX_UPLOAD_RETRY_TIME;
    this._requests = new Set();

    if (_url != null) {
      this._bucket = Location.makeFromBucketSpec(_url, this._host);
    } else {
      this._bucket = extractBucket(this._host, this.app.options);
    }
  }
  /**
   * The host string for this service, in the form of `host` or
   * `host:port`.
   */


  get host() {
    return this._host;
  }

  set host(host) {
    this._host = host;

    if (this._url != null) {
      this._bucket = Location.makeFromBucketSpec(this._url, host);
    } else {
      this._bucket = extractBucket(host, this.app.options);
    }
  }
  /**
   * The maximum time to retry uploads in milliseconds.
   */


  get maxUploadRetryTime() {
    return this._maxUploadRetryTime;
  }

  set maxUploadRetryTime(time) {
    validateNumber('time',
    /* minValue=*/
    0,
    /* maxValue= */
    Number.POSITIVE_INFINITY, time);
    this._maxUploadRetryTime = time;
  }
  /**
   * The maximum time to retry operations other than uploads or downloads in
   * milliseconds.
   */


  get maxOperationRetryTime() {
    return this._maxOperationRetryTime;
  }

  set maxOperationRetryTime(time) {
    validateNumber('time',
    /* minValue=*/
    0,
    /* maxValue= */
    Number.POSITIVE_INFINITY, time);
    this._maxOperationRetryTime = time;
  }

  _getAuthToken() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this._overrideAuthToken) {
        return _this._overrideAuthToken;
      }

      const auth = _this._authProvider.getImmediate({
        optional: true
      });

      if (auth) {
        const tokenData = yield auth.getToken();

        if (tokenData !== null) {
          return tokenData.accessToken;
        }
      }

      return null;
    })();
  }

  _getAppCheckToken() {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const appCheck = _this2._appCheckProvider.getImmediate({
        optional: true
      });

      if (appCheck) {
        const result = yield appCheck.getToken(); // TODO: What do we want to do if there is an error getting the token?
        // Context: appCheck.getToken() will never throw even if an error happened. In the error case, a dummy token will be
        // returned along with an error field describing the error. In general, we shouldn't care about the error condition and just use
        // the token (actual or dummy) to send requests.

        return result.token;
      }

      return null;
    })();
  }
  /**
   * Stop running requests and prevent more from being created.
   */


  _delete() {
    if (!this._deleted) {
      this._deleted = true;

      this._requests.forEach(request => request.cancel());

      this._requests.clear();
    }

    return Promise.resolve();
  }
  /**
   * Returns a new firebaseStorage.Reference object referencing this StorageService
   * at the given Location.
   */


  _makeStorageReference(loc) {
    return new Reference(this, loc);
  }
  /**
   * @param requestInfo - HTTP RequestInfo object
   * @param authToken - Firebase auth token
   */


  _makeRequest(requestInfo, requestFactory, authToken, appCheckToken) {
    if (!this._deleted) {
      const request = makeRequest(requestInfo, this._appId, authToken, appCheckToken, requestFactory, this._firebaseVersion);

      this._requests.add(request); // Request removes itself from set when complete.


      request.getPromise().then(() => this._requests.delete(request), () => this._requests.delete(request));
      return request;
    } else {
      return new FailRequest(appDeleted());
    }
  }

  makeRequestWithTokens(requestInfo, requestFactory) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const [authToken, appCheckToken] = yield Promise.all([_this3._getAuthToken(), _this3._getAppCheckToken()]);
      return _this3._makeRequest(requestInfo, requestFactory, authToken, appCheckToken).getPromise();
    })();
  }

}

const name = "@firebase/storage";
const version = "0.9.9";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Type constant for Firebase Storage.
 */

const STORAGE_TYPE = 'storage';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Downloads the data at the object's location. Returns an error if the object
 * is not found.
 *
 * To use this functionality, you have to whitelist your app's origin in your
 * Cloud Storage bucket. See also
 * https://cloud.google.com/storage/docs/configuring-cors
 *
 * @public
 * @param ref - StorageReference where data should be downloaded.
 * @param maxDownloadSizeBytes - If set, the maximum allowed size in bytes to
 * retrieve.
 * @returns A Promise containing the object's bytes
 */

function getBytes(ref, maxDownloadSizeBytes) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return getBytesInternal(ref, maxDownloadSizeBytes);
}
/**
 * Uploads data to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - {@link StorageReference} where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns A Promise containing an UploadResult
 */


function uploadBytes(ref, data, metadata) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return uploadBytes$1(ref, data, metadata);
}
/**
 * Uploads a string to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - {@link StorageReference} where string should be uploaded.
 * @param value - The string to upload.
 * @param format - The format of the string to upload.
 * @param metadata - Metadata for the string to upload.
 * @returns A Promise containing an UploadResult
 */


function uploadString(ref, value, format, metadata) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return uploadString$1(ref, value, format, metadata);
}
/**
 * Uploads data to this object's location.
 * The upload can be paused and resumed, and exposes progress updates.
 * @public
 * @param ref - {@link StorageReference} where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns An UploadTask
 */


function uploadBytesResumable(ref, data, metadata) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return uploadBytesResumable$1(ref, data, metadata);
}
/**
 * A `Promise` that resolves with the metadata for this object. If this
 * object doesn't exist or metadata cannot be retreived, the promise is
 * rejected.
 * @public
 * @param ref - {@link StorageReference} to get metadata from.
 */


function getMetadata(ref) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return getMetadata$1(ref);
}
/**
 * Updates the metadata for this object.
 * @public
 * @param ref - {@link StorageReference} to update metadata for.
 * @param metadata - The new metadata for the object.
 *     Only values that have been explicitly set will be changed. Explicitly
 *     setting a value to null will remove the metadata.
 * @returns A `Promise` that resolves with the new metadata for this object.
 */


function updateMetadata(ref, metadata) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return updateMetadata$1(ref, metadata);
}
/**
 * List items (files) and prefixes (folders) under this storage reference.
 *
 * List API is only available for Firebase Rules Version 2.
 *
 * GCS is a key-blob store. Firebase Storage imposes the semantic of '/'
 * delimited folder structure.
 * Refer to GCS's List API if you want to learn more.
 *
 * To adhere to Firebase Rules's Semantics, Firebase Storage does not
 * support objects whose paths end with "/" or contain two consecutive
 * "/"s. Firebase Storage List API will filter these unsupported objects.
 * list() may fail if there are too many unsupported objects in the bucket.
 * @public
 *
 * @param ref - {@link StorageReference} to get list from.
 * @param options - See {@link ListOptions} for details.
 * @returns A `Promise` that resolves with the items and prefixes.
 *      `prefixes` contains references to sub-folders and `items`
 *      contains references to objects in this folder. `nextPageToken`
 *      can be used to get the rest of the results.
 */


function list(ref, options) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return list$1(ref, options);
}
/**
 * List all items (files) and prefixes (folders) under this storage reference.
 *
 * This is a helper method for calling list() repeatedly until there are
 * no more results. The default pagination size is 1000.
 *
 * Note: The results may not be consistent if objects are changed while this
 * operation is running.
 *
 * Warning: `listAll` may potentially consume too many resources if there are
 * too many results.
 * @public
 * @param ref - {@link StorageReference} to get list from.
 *
 * @returns A `Promise` that resolves with all the items and prefixes under
 *      the current storage reference. `prefixes` contains references to
 *      sub-directories and `items` contains references to objects in this
 *      folder. `nextPageToken` is never returned.
 */


function listAll(ref) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return listAll$1(ref);
}
/**
 * Returns the download URL for the given {@link StorageReference}.
 * @public
 * @param ref - {@link StorageReference} to get the download URL for.
 * @returns A `Promise` that resolves with the download
 *     URL for this object.
 */


function getDownloadURL(ref) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return getDownloadURL$1(ref);
}
/**
 * Deletes the object at this location.
 * @public
 * @param ref - {@link StorageReference} for object to delete.
 * @returns A `Promise` that resolves if the deletion succeeds.
 */


function deleteObject(ref) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return deleteObject$1(ref);
}

function ref(serviceOrRef, pathOrUrl) {
  serviceOrRef = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(serviceOrRef);
  return ref$1(serviceOrRef, pathOrUrl);
}
/**
 * @internal
 */


function _getChild(ref, childPath) {
  return _getChild$1(ref, childPath);
}
/**
 * Gets a {@link FirebaseStorage} instance for the given Firebase app.
 * @public
 * @param app - Firebase app to get {@link FirebaseStorage} instance for.
 * @param bucketUrl - The gs:// url to your Firebase Storage Bucket.
 * If not passed, uses the app's default Storage Bucket.
 * @returns A {@link FirebaseStorage} instance.
 */


function getStorage(app = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_1__.getApp)(), bucketUrl) {
  app = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(app);

  const storageProvider = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_1__._getProvider)(app, STORAGE_TYPE);

  const storageInstance = storageProvider.getImmediate({
    identifier: bucketUrl
  });
  return storageInstance;
}
/**
 * Modify this {@link FirebaseStorage} instance to communicate with the Cloud Storage emulator.
 *
 * @param storage - The {@link FirebaseStorage} instance
 * @param host - The emulator host (ex: localhost)
 * @param port - The emulator port (ex: 5001)
 * @param options - Emulator options. `options.mockUserToken` is the mock auth
 * token to use for unit testing Security Rules.
 * @public
 */


function connectStorageEmulator(storage, host, port, options = {}) {
  connectStorageEmulator$1(storage, host, port, options);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Downloads the data at the object's location. Returns an error if the object
 * is not found.
 *
 * To use this functionality, you have to whitelist your app's origin in your
 * Cloud Storage bucket. See also
 * https://cloud.google.com/storage/docs/configuring-cors
 *
 * This API is not available in Node.
 *
 * @public
 * @param ref - StorageReference where data should be downloaded.
 * @param maxDownloadSizeBytes - If set, the maximum allowed size in bytes to
 * retrieve.
 * @returns A Promise that resolves with a Blob containing the object's bytes
 */


function getBlob(ref, maxDownloadSizeBytes) {
  ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
  return getBlobInternal(ref, maxDownloadSizeBytes);
}
/**
 * Downloads the data at the object's location. Raises an error event if the
 * object is not found.
 *
 * This API is only available in Node.
 *
 * @public
 * @param ref - StorageReference where data should be downloaded.
 * @param maxDownloadSizeBytes - If set, the maximum allowed size in bytes to
 * retrieve.
 * @returns A stream with the object's data as bytes
 */


function getStream(ref, maxDownloadSizeBytes) {
  throw new Error('getStream() is only supported by NodeJS builds');
}
/**
 * Cloud Storage for Firebase
 *
 * @packageDocumentation
 */


function factory(container, {
  instanceIdentifier: url
}) {
  const app = container.getProvider('app').getImmediate();
  const authProvider = container.getProvider('auth-internal');
  const appCheckProvider = container.getProvider('app-check-internal');
  return new FirebaseStorageImpl(app, authProvider, appCheckProvider, url, _firebase_app__WEBPACK_IMPORTED_MODULE_1__.SDK_VERSION);
}

function registerStorage() {
  (0,_firebase_app__WEBPACK_IMPORTED_MODULE_1__._registerComponent)(new _firebase_component__WEBPACK_IMPORTED_MODULE_3__.Component(STORAGE_TYPE, factory, "PUBLIC"
  /* PUBLIC */
  ).setMultipleInstances(true)); //RUNTIME_ENV will be replaced during the compilation to "node" for nodejs and an empty string for browser


  (0,_firebase_app__WEBPACK_IMPORTED_MODULE_1__.registerVersion)(name, version, ''); // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation

  (0,_firebase_app__WEBPACK_IMPORTED_MODULE_1__.registerVersion)(name, version, 'esm2017');
}

registerStorage();


/***/ }),

/***/ 19058:
/*!*********************************************************!*\
  !*** ./node_modules/firebase/storage/dist/index.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StringFormat": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.StringFormat),
/* harmony export */   "_FbsBlob": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._FbsBlob),
/* harmony export */   "_Location": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._Location),
/* harmony export */   "_TaskEvent": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._TaskEvent),
/* harmony export */   "_TaskState": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._TaskState),
/* harmony export */   "_UploadTask": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._UploadTask),
/* harmony export */   "_dataFromString": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._dataFromString),
/* harmony export */   "_getChild": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._getChild),
/* harmony export */   "_invalidArgument": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._invalidArgument),
/* harmony export */   "_invalidRootOperation": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._invalidRootOperation),
/* harmony export */   "connectStorageEmulator": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.connectStorageEmulator),
/* harmony export */   "deleteObject": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.deleteObject),
/* harmony export */   "getBlob": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getBlob),
/* harmony export */   "getBytes": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getBytes),
/* harmony export */   "getDownloadURL": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getDownloadURL),
/* harmony export */   "getMetadata": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getMetadata),
/* harmony export */   "getStorage": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getStorage),
/* harmony export */   "getStream": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getStream),
/* harmony export */   "list": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.list),
/* harmony export */   "listAll": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.listAll),
/* harmony export */   "ref": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.ref),
/* harmony export */   "updateMetadata": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.updateMetadata),
/* harmony export */   "uploadBytes": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.uploadBytes),
/* harmony export */   "uploadBytesResumable": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.uploadBytesResumable),
/* harmony export */   "uploadString": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.uploadString)
/* harmony export */ });
/* harmony import */ var _firebase_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/storage */ 8376);


/***/ })

}]);
//# sourceMappingURL=default-src_app_shared_utilities_attachments_service_ts.js.map