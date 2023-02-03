"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_shared_utilities_attachments_service_ts"],{

/***/ 15909:
/*!*********************************************************!*\
  !*** ./src/app/shared/utilities/attachments.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttachmentsService": () => (/* binding */ AttachmentsService)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
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
    this.DemoPDF = 'data:application/pdf;base64,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686t5r5I8UmpS5lPDUo9lLqYFpXWno5Lj08/wZPhpfL6MlQzVmcMZRpmFmaOrrJftWfVLN+f35QFZS3P6hZQRT9TA0I94RbhWLZTdk32m5zInOOrpVfzVg/kGuRuz51c47Xm67Wotay1vXnqeZvyxta5rqtfD61PWN+7QXNDwYaJjd4bD28ibErd9EO+WX5Z/qvNUZt7ClQKNhaMb/He0looUcgvvL3VYWvdNtQ27rbB7Zbbq7Z/LGIXXSk2K64ofl/CKrnylflXlV8t7kjcMVhqU7p/J2Ynb+fILuddh8uky9aUje8O3N1ZTi8vKn+1Z+WeyxVWFXV7CXuFe0crAyq7q7Sqdla9r06uHq5xq2mvVa7dXju/j73vxn6X/W11KnXFde8OcA/cqfeu72zQaag4iDmYffBJY2Rj/9eMr5ubFJuKmz4c4h0aPRx6uK/Ztrm5RbmltBVuFbZOH4k7cv0bj2+624zb6ttp7cVHwVHh0affxn87csz/WO9xxvG277S/q+2gdBR1Qp25nbNdyV2j3THdQyf8TvT2OPR0fG/y/aGT6idrTsmeKj1NOF1wevHMmjNzZzPPzpxLOjfeu7L3/vno87f6QvoGL/hfuHTR6+L5ftf+M5ccL528bH/5xBXGla6rNlc7B6wHOn6w/qFj0Gaw85rtte7rdtd7hpYMnb7hfOPcTY+bF2/53ro6vHR4aCRi5M7tuNujd9h3pu6m3X1xL/vewv2ND9APih5KPax4pPyo4Uf9H9tHbUZPjXmMDTwOe3x/nDX+7Kesn95PFDwhP6mYVJtsnrKYOjntNX396bKnE88yny3MFP4s/XPtc73n3/3i8svAbPTsxAv+i8VfS14qvDz0yupV71zw3KPX6a8X5oveKLw5/Jbxtv9d1LvJhZz32PeVH/Q/9Hz0//hgMX1x8V/3hPP7y2IJQQplbmRzdHJlYW0KZW5kb2JqCjMgMCBvYmoKPDwKPj4gZW5kb2JqCjkgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EgCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIAovU3VidHlwZSAvVHlwZTEgCi9UeXBlIC9Gb250IAovTmFtZSAvSGVsdiAKPj4gZW5kb2JqCjEwIDAgb2JqCjw8Ci9DcmVhdGlvbkRhdGUgKEQ6MjAwODA2MTExNjU2MDMpIAovTW9kRGF0ZSAoRDoyMDA4MDYxMTE2NTYwMykgCi9Qcm9kdWNlciAoSWJleCBQREYgQ3JlYXRvciA0LjMuNi40LzUwMjUgWy5ORVQgMi4wXSkgCj4+IGVuZG9iagp4cmVmCjAgMTEKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwNjE2IDAwMDAwIG4gCjAwMDAwMDA1NTYgMDAwMDAgbiAKMDAwMDAwMzQyNCAwMDAwMCBuIAowMDAwMDAwNzA2IDAwMDAwIG4gCjAwMDAwMDA3NDEgMDAwMDAgbiAKMDAwMDAwMDIxNSAwMDAwMCBuIAowMDAwMDAwNDgwIDAwMDAwIG4gCjAwMDAwMDAwMjAgMDAwMDAgbiAKMDAwMDAwMzQ0NSAwMDAwMCBuIAowMDAwMDAzNTU5IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTEgCi9JbmZvIDEwIDAgUiAgCi9Sb290IDEgMCBSIAo+PgpzdGFydHhyZWYKMzY5OAolJUVPRgo='; // Buttons Available

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
            var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (PDF) {
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

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this2.processor.loadSaved();
    })();
  }

  deletePicture() {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this3.processor.deletePicture();
    })();
  }

  presentImageOptions(options) {
    var _this4 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
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

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, error) {
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

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise( /*#__PURE__*/function () {
        var _ref3 = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, error) {
          const OPTIONS = {
            limit: _this6.limit
          };
          _capacitor_camera__WEBPACK_IMPORTED_MODULE_4__.Camera.pickImages(OPTIONS).then( /*#__PURE__*/function () {
            var _ref4 = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (capturedPhotos) {
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
      var _ref5 = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve) {
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



/***/ })

}]);
//# sourceMappingURL=default-src_app_shared_utilities_attachments_service_ts.js.map