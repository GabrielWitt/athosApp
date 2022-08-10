"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_client_reservations-resident_reservations-resident_module_ts"],{

/***/ 47783:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/client/reservations-resident/reservations-resident-routing.module.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationsResidentPageRoutingModule": () => (/* binding */ ReservationsResidentPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _reservations_resident_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservations-resident.page */ 77561);




const routes = [
    {
        path: '',
        component: _reservations_resident_page__WEBPACK_IMPORTED_MODULE_0__.ReservationsResidentPage
    }
];
let ReservationsResidentPageRoutingModule = class ReservationsResidentPageRoutingModule {
};
ReservationsResidentPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ReservationsResidentPageRoutingModule);



/***/ }),

/***/ 68038:
/*!************************************************************************************!*\
  !*** ./src/app/pages/client/reservations-resident/reservations-resident.module.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationsResidentPageModule": () => (/* binding */ ReservationsResidentPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _reservations_resident_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservations-resident-routing.module */ 47783);
/* harmony import */ var _reservations_resident_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reservations-resident.page */ 77561);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);








let ReservationsResidentPageModule = class ReservationsResidentPageModule {
};
ReservationsResidentPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            _reservations_resident_routing_module__WEBPACK_IMPORTED_MODULE_0__.ReservationsResidentPageRoutingModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule
        ],
        declarations: [_reservations_resident_page__WEBPACK_IMPORTED_MODULE_1__.ReservationsResidentPage]
    })
], ReservationsResidentPageModule);



/***/ }),

/***/ 77561:
/*!**********************************************************************************!*\
  !*** ./src/app/pages/client/reservations-resident/reservations-resident.page.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationsResidentPage": () => (/* binding */ ReservationsResidentPage)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _reservations_resident_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reservations-resident.page.html?ngResource */ 72186);
/* harmony import */ var _reservations_resident_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reservations-resident.page.scss?ngResource */ 43476);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);





let ReservationsResidentPage = class ReservationsResidentPage {
  constructor() {
    this.loading = true;
    this.itemList = [];
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

  doRefresh(refresh) {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // load 
      if (refresh) {
        refresh.target.complete();
      }
    })();
  }

};

ReservationsResidentPage.ctorParameters = () => [];

ReservationsResidentPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'app-reservations-resident',
  template: _reservations_resident_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_reservations_resident_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ReservationsResidentPage);


/***/ }),

/***/ 43476:
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/client/reservations-resident/reservations-resident.page.scss?ngResource ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXNlcnZhdGlvbnMtcmVzaWRlbnQucGFnZS5zY3NzIn0= */";

/***/ }),

/***/ 72186:
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/client/reservations-resident/reservations-resident.page.html?ngResource ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = "<app-main-header title=\"Reservaciones\"></app-main-header>\n<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene reservaciones aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n\n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    \n  </ion-list>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_client_reservations-resident_reservations-resident_module_ts.js.map