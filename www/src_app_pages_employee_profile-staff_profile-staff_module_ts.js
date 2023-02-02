"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_employee_profile-staff_profile-staff_module_ts"],{

/***/ 73777:
/*!******************************************************************************!*\
  !*** ./src/app/pages/employee/profile-staff/profile-staff-routing.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileStaffPageRoutingModule": () => (/* binding */ ProfileStaffPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _profile_staff_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-staff.page */ 67362);




const routes = [
    {
        path: '',
        component: _profile_staff_page__WEBPACK_IMPORTED_MODULE_0__.ProfileStaffPage
    }
];
let ProfileStaffPageRoutingModule = class ProfileStaffPageRoutingModule {
};
ProfileStaffPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ProfileStaffPageRoutingModule);



/***/ }),

/***/ 32444:
/*!**********************************************************************!*\
  !*** ./src/app/pages/employee/profile-staff/profile-staff.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileStaffPageModule": () => (/* binding */ ProfileStaffPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _profile_staff_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-staff-routing.module */ 73777);
/* harmony import */ var _profile_staff_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-staff.page */ 67362);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);








let ProfileStaffPageModule = class ProfileStaffPageModule {
};
ProfileStaffPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _profile_staff_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProfileStaffPageRoutingModule
        ],
        declarations: [_profile_staff_page__WEBPACK_IMPORTED_MODULE_1__.ProfileStaffPage]
    })
], ProfileStaffPageModule);



/***/ }),

/***/ 67362:
/*!********************************************************************!*\
  !*** ./src/app/pages/employee/profile-staff/profile-staff.page.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileStaffPage": () => (/* binding */ ProfileStaffPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _profile_staff_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-staff.page.html?ngResource */ 58762);
/* harmony import */ var _profile_staff_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-staff.page.scss?ngResource */ 92739);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);






let ProfileStaffPage = class ProfileStaffPage {
    constructor(userCtrl, auth) {
        this.userCtrl = userCtrl;
        this.auth = auth;
        this.defaultUser = '../../../../assets/profile/ProfileBlank.png';
        this.edit = false;
        this.loading = true;
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.loading = true;
        this.auth.getUser().then((user) => {
            this.user = user.user;
            this.currentUser = user.data;
            console.log(this.currentUser);
            this.loading = false;
        });
    }
};
ProfileStaffPage.ctorParameters = () => [
    { type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__.UserController },
    { type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__.FireAuthService }
];
ProfileStaffPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-profile-staff',
        template: _profile_staff_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_profile_staff_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProfileStaffPage);



/***/ }),

/***/ 92739:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/employee/profile-staff/profile-staff.page.scss?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9maWxlLXN0YWZmLnBhZ2Uuc2NzcyJ9 */";

/***/ }),

/***/ 58762:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/employee/profile-staff/profile-staff.page.html?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = "<app-main-header title=\"Mi Perfil\"></app-main-header>\n\n<ion-content class=\"ion-padding\">\n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  <app-user-detail *ngIf=\"!loading && !userCtrl.edit && user\" [user]=\"user\" [userData]=\"currentUser\" [editDataForm]=\"true\"></app-user-detail>\n  <app-edit-user *ngIf=\"!loading && userCtrl.edit && user\" [user]=\"user\" [userData]=\"currentUser\"></app-edit-user>\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_employee_profile-staff_profile-staff_module_ts.js.map