"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_client_services-resident_services-resident_module_ts"],{

/***/ 11418:
/*!*************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/maintenance/maintenance.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaintenanceComponent": () => (/* binding */ MaintenanceComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _maintenance_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maintenance.component.html?ngResource */ 61649);
/* harmony import */ var _maintenance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maintenance.component.scss?ngResource */ 32183);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);





let MaintenanceComponent = class MaintenanceComponent {
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

MaintenanceComponent.ctorParameters = () => [];

MaintenanceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'app-maintenance',
  template: _maintenance_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_maintenance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], MaintenanceComponent);


/***/ }),

/***/ 6342:
/*!************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services-resident-routing.module.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesResidentPageRoutingModule": () => (/* binding */ ServicesResidentPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _services_resident_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-resident.page */ 71303);




const routes = [
    {
        path: '',
        component: _services_resident_page__WEBPACK_IMPORTED_MODULE_0__.ServicesResidentPage
    },
];
let ServicesResidentPageRoutingModule = class ServicesResidentPageRoutingModule {
};
ServicesResidentPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ServicesResidentPageRoutingModule);



/***/ }),

/***/ 56124:
/*!****************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services-resident.module.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesResidentPageModule": () => (/* binding */ ServicesResidentPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _services_resident_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-resident-routing.module */ 6342);
/* harmony import */ var _services_resident_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-resident.page */ 71303);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);
/* harmony import */ var _maintenance_maintenance_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maintenance/maintenance.component */ 11418);
/* harmony import */ var _services_services_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/services.component */ 87088);










let ServicesResidentPageModule = class ServicesResidentPageModule {
};
ServicesResidentPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _services_resident_routing_module__WEBPACK_IMPORTED_MODULE_0__.ServicesResidentPageRoutingModule
        ],
        declarations: [
            _services_resident_page__WEBPACK_IMPORTED_MODULE_1__.ServicesResidentPage,
            _maintenance_maintenance_component__WEBPACK_IMPORTED_MODULE_3__.MaintenanceComponent,
            _services_services_component__WEBPACK_IMPORTED_MODULE_4__.ServicesComponent
        ]
    })
], ServicesResidentPageModule);



/***/ }),

/***/ 71303:
/*!**************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services-resident.page.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesResidentPage": () => (/* binding */ ServicesResidentPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _services_resident_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-resident.page.html?ngResource */ 42527);
/* harmony import */ var _services_resident_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-resident.page.scss?ngResource */ 62319);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);




let ServicesResidentPage = class ServicesResidentPage {
    constructor() {
        this.selectedTab = 'services';
    }
    ngOnInit() {
    }
    segmentChanged(ev) {
        this.selectedTab = ev.detail.value;
    }
};
ServicesResidentPage.ctorParameters = () => [];
ServicesResidentPage = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-services-resident',
        template: _services_resident_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_services_resident_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ServicesResidentPage);



/***/ }),

/***/ 87088:
/*!*******************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services/services.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesComponent": () => (/* binding */ ServicesComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _services_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services.component.html?ngResource */ 69018);
/* harmony import */ var _services_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services.component.scss?ngResource */ 62944);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);





let ServicesComponent = class ServicesComponent {
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

ServicesComponent.ctorParameters = () => [];

ServicesComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'app-services',
  template: _services_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_services_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ServicesComponent);


/***/ }),

/***/ 32183:
/*!**************************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/maintenance/maintenance.component.scss?ngResource ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWludGVuYW5jZS5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 62319:
/*!***************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services-resident.page.scss?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlcy1yZXNpZGVudC5wYWdlLnNjc3MifQ== */";

/***/ }),

/***/ 62944:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services/services.component.scss?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlcy5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 61649:
/*!**************************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/maintenance/maintenance.component.html?ngResource ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = "\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene mantenimientos aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n\n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    \n  </ion-list>\n";

/***/ }),

/***/ 42527:
/*!***************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services-resident.page.html?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "<app-main-header title=\"Servicios\"></app-main-header>\n\n<ion-content>\n  <ion-segment mode=\"ios\" (ionChange)=\"segmentChanged($event)\" value=\"services\">\n    <ion-segment-button value=\"services\">\n      <ion-label> <h2>Servicios</h2> </ion-label> \n    </ion-segment-button>\n    <ion-segment-button value=\"maintenance\">\n      <ion-label> <h2>Mantenimientos</h2> </ion-label>\n    </ion-segment-button>\n  </ion-segment>\n  <app-services *ngIf=\"selectedTab === 'services'\"></app-services>\n  <app-maintenance *ngIf=\"selectedTab === 'maintenance'\"></app-maintenance>\n</ion-content>\n";

/***/ }),

/***/ 69018:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services/services.component.html?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene servicios aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n\n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    \n  </ion-list>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_client_services-resident_services-resident_module_ts.js.map