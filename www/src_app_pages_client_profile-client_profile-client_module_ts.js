"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_client_profile-client_profile-client_module_ts"],{

/***/ 2961:
/*!******************************************************************************!*\
  !*** ./src/app/pages/client/profile-client/profile-client-routing.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileClientPageRoutingModule": () => (/* binding */ ProfileClientPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _profile_client_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-client.page */ 59950);




const routes = [
    {
        path: '',
        component: _profile_client_page__WEBPACK_IMPORTED_MODULE_0__.ProfileClientPage
    }
];
let ProfileClientPageRoutingModule = class ProfileClientPageRoutingModule {
};
ProfileClientPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ProfileClientPageRoutingModule);



/***/ }),

/***/ 72579:
/*!**********************************************************************!*\
  !*** ./src/app/pages/client/profile-client/profile-client.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileClientPageModule": () => (/* binding */ ProfileClientPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _profile_client_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-client-routing.module */ 2961);
/* harmony import */ var _profile_client_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-client.page */ 59950);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);








let ProfileClientPageModule = class ProfileClientPageModule {
};
ProfileClientPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
            _profile_client_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProfileClientPageRoutingModule
        ],
        declarations: [_profile_client_page__WEBPACK_IMPORTED_MODULE_1__.ProfileClientPage]
    })
], ProfileClientPageModule);



/***/ }),

/***/ 59950:
/*!********************************************************************!*\
  !*** ./src/app/pages/client/profile-client/profile-client.page.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileClientPage": () => (/* binding */ ProfileClientPage)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _profile_client_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-client.page.html?ngResource */ 37524);
/* harmony import */ var _profile_client_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-client.page.scss?ngResource */ 95933);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_shared_components_users_user_settings_user_settings_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/components/users/user-settings/user-settings.component */ 31318);









let ProfileClientPage = class ProfileClientPage {
  constructor(modal, routerOutlet, auth, userCtrl) {
    this.modal = modal;
    this.routerOutlet = routerOutlet;
    this.auth = auth;
    this.userCtrl = userCtrl;
    this.loading = false;
    this.defaultUser = '../../../../assets/profile/ProfileBlank.png';
  }

  ngOnInit() {
    this.loadUser();
  }

  ionViewWillEnter() {
    this.loadUser();
  }

  doRefresh(refresh) {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.auth.getUser().then(user => {
        _this.user = user.user;
        _this.currentUser = user.data;

        if (refresh) {
          refresh.target.complete();
        }
      });
    })();
  }

  loadUser() {
    this.loading = true;
    this.auth.getUser().then(user => {
      this.user = user.user;
      this.currentUser = user.data;
      this.loading = false;
    });
  }

  displayConfig() {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modalService = yield _this2.modal.create({
        component: src_app_shared_components_users_user_settings_user_settings_component__WEBPACK_IMPORTED_MODULE_5__.UserSettingsComponent,
        componentProps: {
          currentUser: _this2.currentUser
        },
        mode: 'ios',
        presentingElement: _this2.routerOutlet.nativeEl
      });
      modalService.present();
      const modalResult1 = yield modalService.onWillDismiss();

      if (modalResult1.data) {}
    })();
  }

};

ProfileClientPage.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRouterOutlet
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__.FireAuthService
}, {
  type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__.UserController
}];

ProfileClientPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-profile-client',
  template: _profile_client_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_profile_client_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ProfileClientPage);


/***/ }),

/***/ 95933:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/client/profile-client/profile-client.page.scss?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = ".ripple-parent {\n  position: relative;\n  overflow: hidden;\n}\n\n.profileCircle {\n  --border-radius: 50%;\n  --size: 40pt;\n  position: relative;\n}\n\n.cameraButton {\n  position: absolute;\n  background-color: var(--ion-color-medium);\n  top: 25pt;\n  left: 25pt;\n  width: 20pt;\n  height: 20pt;\n  font-size: 15pt;\n  border-radius: 50%;\n  padding: 2pt;\n}\n\n.uploadingImage {\n  position: absolute;\n  top: 10pt;\n  left: 10pt;\n}\n\n.imageProfile {\n  position: absolute;\n}\n\n.loadingImage {\n  position: absolute;\n  top: 41pt;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUtY2xpZW50LnBhZ2Uuc2NzcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL1ByYWN0aWN1bSUyMDQvYXRob3NBcHAvc3JjL2FwcC9wYWdlcy9jbGllbnQvcHJvZmlsZS1jbGllbnQvcHJvZmlsZS1jbGllbnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0VBQ0EseUNBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtBQ0NKIiwiZmlsZSI6InByb2ZpbGUtY2xpZW50LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yaXBwbGUtcGFyZW50IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnByb2ZpbGVDaXJjbGV7XG4gICAgLS1ib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgLS1zaXplOiA0MHB0O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmNhbWVyYUJ1dHRvbntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgdG9wOiAyNXB0O1xuICAgIGxlZnQ6IDI1cHQ7XG4gICAgd2lkdGg6IDIwcHQ7XG4gICAgaGVpZ2h0OiAyMHB0O1xuICAgIGZvbnQtc2l6ZTogMTVwdDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgcGFkZGluZzogMnB0O1xufVxuXG4udXBsb2FkaW5nSW1hZ2V7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMTBwdDtcbiAgICBsZWZ0OiAxMHB0O1xufVxuXG4uaW1hZ2VQcm9maWxle1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLmxvYWRpbmdJbWFnZXtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA0MXB0O1xufSIsIi5yaXBwbGUtcGFyZW50IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ucHJvZmlsZUNpcmNsZSB7XG4gIC0tYm9yZGVyLXJhZGl1czogNTAlO1xuICAtLXNpemU6IDQwcHQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmNhbWVyYUJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIHRvcDogMjVwdDtcbiAgbGVmdDogMjVwdDtcbiAgd2lkdGg6IDIwcHQ7XG4gIGhlaWdodDogMjBwdDtcbiAgZm9udC1zaXplOiAxNXB0O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHBhZGRpbmc6IDJwdDtcbn1cblxuLnVwbG9hZGluZ0ltYWdlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwcHQ7XG4gIGxlZnQ6IDEwcHQ7XG59XG5cbi5pbWFnZVByb2ZpbGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5sb2FkaW5nSW1hZ2Uge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNDFwdDtcbn0iXX0= */";

/***/ }),

/***/ 37524:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/client/profile-client/profile-client.page.html?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = "<app-main-header title=\"Mi Perfil\"></app-main-header>\n\n<ion-content class=\"ion-padding\" *ngIf=\"currentUser && !loading\">\n\n  <ion-fab slot=\"fixed\" vertical=\"top\" horizontal=\"start\" [edge]=\"true\">\n    <ion-fab-button (click)=\"displayConfig()\">\n      <ion-icon name=\"construct-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  <app-user-detail *ngIf=\"!userCtrl.edit && user\" [user]=\"user\" [userData]=\"currentUser\" [editDataForm]=\"true\"></app-user-detail>\n  <app-edit-user *ngIf=\"userCtrl.edit && user\" [user]=\"user\" [userData]=\"currentUser\"></app-edit-user>\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_client_profile-client_profile-client_module_ts.js.map