"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_administrator_profile-manager_profile-manager_module_ts"],{

/***/ 13457:
/*!***************************************************************************************!*\
  !*** ./src/app/pages/administrator/profile-manager/profile-manager-routing.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileManagerPageRoutingModule": () => (/* binding */ ProfileManagerPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _profile_manager_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-manager.page */ 16781);




const routes = [
    {
        path: '',
        component: _profile_manager_page__WEBPACK_IMPORTED_MODULE_0__.ProfileManagerPage
    }
];
let ProfileManagerPageRoutingModule = class ProfileManagerPageRoutingModule {
};
ProfileManagerPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ProfileManagerPageRoutingModule);



/***/ }),

/***/ 72232:
/*!*******************************************************************************!*\
  !*** ./src/app/pages/administrator/profile-manager/profile-manager.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileManagerPageModule": () => (/* binding */ ProfileManagerPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _profile_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-manager-routing.module */ 13457);
/* harmony import */ var _profile_manager_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-manager.page */ 16781);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);








let ProfileManagerPageModule = class ProfileManagerPageModule {
};
ProfileManagerPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
            _profile_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProfileManagerPageRoutingModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule
        ],
        declarations: [_profile_manager_page__WEBPACK_IMPORTED_MODULE_1__.ProfileManagerPage]
    })
], ProfileManagerPageModule);



/***/ }),

/***/ 16781:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/administrator/profile-manager/profile-manager.page.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileManagerPage": () => (/* binding */ ProfileManagerPage)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _profile_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-manager.page.html?ngResource */ 41862);
/* harmony import */ var _profile_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-manager.page.scss?ngResource */ 81451);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/attachments.service */ 15909);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);









let ProfileManagerPage = class ProfileManagerPage {
  constructor(userCtrl, alerts, images, routerOutlet) {
    this.userCtrl = userCtrl;
    this.alerts = alerts;
    this.images = images;
    this.routerOutlet = routerOutlet;
    this.loading = false;
    this.edit = false;
    this.progress = 0;
    this.defaultUser = '../../../../assets/profile/ProfileBlank.png';
  }

  ngOnInit() {
    this.loadUser();
  }

  ionViewWillEnter() {}

  loadUser() {
    this.userCtrl.loadUser().then(data => {
      console.log(data);
      this.user = data.user;
      this.currentUser = data.data;
    });
  }

  addPhoto() {
    var _this = this;

    const options = {
      currentRoute: 'manager/profile',
      height: null,
      width: null,
      pdf: false
    };
    this.images.presentImageOptions(options).then( /*#__PURE__*/function () {
      var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (imageObj) {
        if (imageObj[0] !== undefined) {
          _this.loading = true;
          _this.newImage = imageObj[0];

          _this.userCtrl.changeProfileImage(imageObj[0], upload => _this.progress = upload).then(() => {
            _this.alerts.showAlert('PERFIL', 'Tus imagen de perfil ha sido actualizada', 'OK');

            _this.newImage = null;
            _this.loading = false;
          }).catch(() => {
            console.log('Error: uploading image');
            _this.loading = false;
          });
        }
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  editForm() {}

};

ProfileManagerPage.ctorParameters = () => [{
  type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_5__.UserController
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__.AlertsService
}, {
  type: src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_4__.AttachmentsService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRouterOutlet
}];

ProfileManagerPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-profile-manager',
  template: _profile_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_profile_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ProfileManagerPage);


/***/ }),

/***/ 81451:
/*!******************************************************************************************!*\
  !*** ./src/app/pages/administrator/profile-manager/profile-manager.page.scss?ngResource ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9maWxlLW1hbmFnZXIucGFnZS5zY3NzIn0= */";

/***/ }),

/***/ 41862:
/*!******************************************************************************************!*\
  !*** ./src/app/pages/administrator/profile-manager/profile-manager.page.html?ngResource ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = "<app-main-header title=\"Mi Perfil\"></app-main-header>\n\n<ion-content class=\"ion-padding\">\n  <app-user-detail *ngIf=\"!userCtrl.edit && user\" [user]=\"user\" [userData]=\"currentUser\" [editDataForm]=\"true\"></app-user-detail>\n  <app-edit-user *ngIf=\"userCtrl.edit && user\" [user]=\"user\" [userData]=\"currentUser\"></app-edit-user>\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_administrator_profile-manager_profile-manager_module_ts.js.map