"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_administrator_services-manager_services-manager_module_ts"],{

/***/ 94947:
/*!*******************************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/maintenance-admin/maintenance-admin.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaintenanceAdminComponent": () => (/* binding */ MaintenanceAdminComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _maintenance_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maintenance-admin.component.html?ngResource */ 86083);
/* harmony import */ var _maintenance_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maintenance-admin.component.scss?ngResource */ 97240);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);





let MaintenanceAdminComponent = class MaintenanceAdminComponent {
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

  createRequest() {}

};

MaintenanceAdminComponent.ctorParameters = () => [];

MaintenanceAdminComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'app-maintenance-admin',
  template: _maintenance_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_maintenance_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], MaintenanceAdminComponent);


/***/ }),

/***/ 7381:
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/request-admin/request-admin.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestAdminComponent": () => (/* binding */ RequestAdminComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _request_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request-admin.component.html?ngResource */ 71187);
/* harmony import */ var _request_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./request-admin.component.scss?ngResource */ 96063);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);





let RequestAdminComponent = class RequestAdminComponent {
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

  createRequest() {}

};

RequestAdminComponent.ctorParameters = () => [];

RequestAdminComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'app-request-admin',
  template: _request_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_request_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], RequestAdminComponent);


/***/ }),

/***/ 13156:
/*!*************************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/services-admin/services-admin.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesAdminComponent": () => (/* binding */ ServicesAdminComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _services_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-admin.component.html?ngResource */ 30581);
/* harmony import */ var _services_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services-admin.component.scss?ngResource */ 38611);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_core_services_modules_reservations_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/reservations.service */ 53957);
/* harmony import */ var src_app_shared_components_spaces_pick_rent_space_pick_rent_space_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/components/spaces/pick-rent-space/pick-rent-space.component */ 29204);









let ServicesAdminComponent = class ServicesAdminComponent {
  constructor(modal, auth, request, routerOutlet) {
    this.modal = modal;
    this.auth = auth;
    this.request = request;
    this.routerOutlet = routerOutlet;
    this.loading = true;
    this.itemList = [];
    this.filterSelected = '>';
    this.filterItems = [{
      name: 'Mantenimientos',
      filter: '>'
    }, {
      name: 'Servicios',
      filter: '<'
    }];
  }

  ngOnInit() {
    this.loading = true;
    this.loadData().then(user => {
      this.loading = false;
    });
  }

  loadData() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const userData = yield _this.auth.getUser(); // this.itemList = await //this.request.readReservationsListOrderRent("startDate",new Date().toISOString(),this.filterSelected);

      console.log(_this.itemList);
      _this.user = userData.data;
      return _this.user;
    })();
  }

  filterChange(e) {
    this.filterSelected = e.detail.value;
    this.loadData();
  }

  doRefresh(refresh) {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // load 
      yield _this2.loadData();

      if (refresh) {
        refresh.target.complete();
      }
    })();
  }

  createService() {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modalPick = yield _this3.modal.create({
        component: src_app_shared_components_spaces_pick_rent_space_pick_rent_space_component__WEBPACK_IMPORTED_MODULE_5__.PickRentSpaceComponent,
        componentProps: {
          reservation: null,
          user: _this3.user
        },
        mode: 'ios',
        presentingElement: _this3.routerOutlet.nativeEl
      });
      modalPick.present();
      const modalResult1 = yield modalPick.onWillDismiss();

      if (modalResult1.data) {}
    })();
  }

};

ServicesAdminComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__.FireAuthService
}, {
  type: src_app_core_services_modules_reservations_service__WEBPACK_IMPORTED_MODULE_4__.ReservationsService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRouterOutlet
}];

ServicesAdminComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-services-admin',
  template: _services_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_services_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ServicesAdminComponent);


/***/ }),

/***/ 74351:
/*!*****************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/services-manager-routing.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesManagerPageRoutingModule": () => (/* binding */ ServicesManagerPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _services_manager_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-manager.page */ 41696);




const routes = [
    {
        path: '',
        component: _services_manager_page__WEBPACK_IMPORTED_MODULE_0__.ServicesManagerPage
    }
];
let ServicesManagerPageRoutingModule = class ServicesManagerPageRoutingModule {
};
ServicesManagerPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ServicesManagerPageRoutingModule);



/***/ }),

/***/ 55450:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/services-manager.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesManagerPageModule": () => (/* binding */ ServicesManagerPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _services_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-manager-routing.module */ 74351);
/* harmony import */ var _services_manager_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-manager.page */ 41696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);
/* harmony import */ var _maintenance_admin_maintenance_admin_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maintenance-admin/maintenance-admin.component */ 94947);
/* harmony import */ var _services_admin_services_admin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services-admin/services-admin.component */ 13156);
/* harmony import */ var _request_admin_request_admin_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./request-admin/request-admin.component */ 7381);











let ServicesManagerPageModule = class ServicesManagerPageModule {
};
ServicesManagerPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _services_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__.ServicesManagerPageRoutingModule
        ],
        declarations: [
            _services_manager_page__WEBPACK_IMPORTED_MODULE_1__.ServicesManagerPage,
            _maintenance_admin_maintenance_admin_component__WEBPACK_IMPORTED_MODULE_3__.MaintenanceAdminComponent,
            _services_admin_services_admin_component__WEBPACK_IMPORTED_MODULE_4__.ServicesAdminComponent,
            _request_admin_request_admin_component__WEBPACK_IMPORTED_MODULE_5__.RequestAdminComponent
        ]
    })
], ServicesManagerPageModule);



/***/ }),

/***/ 41696:
/*!*******************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/services-manager.page.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesManagerPage": () => (/* binding */ ServicesManagerPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _services_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-manager.page.html?ngResource */ 42727);
/* harmony import */ var _services_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-manager.page.scss?ngResource */ 62837);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);




let ServicesManagerPage = class ServicesManagerPage {
    constructor() {
        this.selectedTab = 'request';
    }
    ngOnInit() {
    }
    segmentChanged(ev) {
        this.selectedTab = ev.detail.value;
    }
};
ServicesManagerPage.ctorParameters = () => [];
ServicesManagerPage = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-services-manager',
        template: _services_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_services_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ServicesManagerPage);



/***/ }),

/***/ 97240:
/*!********************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/maintenance-admin/maintenance-admin.component.scss?ngResource ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWludGVuYW5jZS1hZG1pbi5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 96063:
/*!************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/request-admin/request-admin.component.scss?ngResource ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXF1ZXN0LWFkbWluLmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 38611:
/*!**************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/services-admin/services-admin.component.scss?ngResource ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlcy1hZG1pbi5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 62837:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/services-manager.page.scss?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlcy1tYW5hZ2VyLnBhZ2Uuc2NzcyJ9 */";

/***/ }),

/***/ 86083:
/*!********************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/maintenance-admin/maintenance-admin.component.html?ngResource ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n  <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n</ion-refresher>\n\n<ion-list *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-list>\n\n<app-not-data-yet-message \n  *ngIf=\"itemList.length == 0 && !loading\"\n  text=\"No tiene mantenimientos aún\" icon=\"alert-circle-outline\"\n></app-not-data-yet-message>\n\n<ion-list *ngIf=\"itemList.length > 0 && !loading\">\n  \n</ion-list>\n  \n<ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n  <ion-fab-button color=\"secondary\" (click)=\"createRequest()\">\n    <ion-icon size=\"large\" name=\"create-outline\"></ion-icon>\n  </ion-fab-button>\n</ion-fab>";

/***/ }),

/***/ 71187:
/*!************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/request-admin/request-admin.component.html?ngResource ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n  <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n</ion-refresher>\n\n<ion-list *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-list>\n\n<app-not-data-yet-message \n  *ngIf=\"itemList.length == 0 && !loading\"\n  text=\"No tiene solicitudes aún\" icon=\"alert-circle-outline\"\n></app-not-data-yet-message>\n\n<ion-list *ngIf=\"itemList.length > 0 && !loading\">\n  \n</ion-list>\n  \n<ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n  <ion-fab-button color=\"secondary\" (click)=\"createRequest()\">\n    <ion-icon size=\"large\" name=\"create-outline\"></ion-icon>\n  </ion-fab-button>\n</ion-fab>";

/***/ }),

/***/ 30581:
/*!**************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/services-admin/services-admin.component.html?ngResource ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n  <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n</ion-refresher>\n\n<ion-list *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-list>\n\n<app-not-data-yet-message \n  *ngIf=\"itemList.length == 0 && !loading\"\n  text=\"No tiene servicios aún\" icon=\"alert-circle-outline\"\n></app-not-data-yet-message>\n\n<ion-list *ngIf=\"itemList.length > 0 && !loading\">\n  \n</ion-list>\n    \n<ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n  <ion-fab-button color=\"secondary\" (click)=\"createService()\">\n    <ion-icon size=\"large\" name=\"create-outline\"></ion-icon>\n  </ion-fab-button>\n</ion-fab>";

/***/ }),

/***/ 42727:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/services-manager.page.html?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "<app-main-header *ngIf=\"selectedTab === 'request'\" title=\"Solicitudes\"></app-main-header>\n<app-main-header *ngIf=\"selectedTab === 'services'\" title=\"Servicios\"></app-main-header>\n<app-main-header *ngIf=\"selectedTab === 'maintenance'\" title=\"Mantenimientos\"></app-main-header>\n<ion-toolbar>\n  <ion-segment mode=\"ios\" (ionChange)=\"segmentChanged($event)\" value=\"request\">\n    <ion-segment-button value=\"request\">\n      <ion-label class=\"ion-padding-start ion-padding-end\"> <h2> <ion-icon name=\"book-outline\"></ion-icon> </h2> </ion-label> \n    </ion-segment-button>\n    <ion-segment-button value=\"services\">\n      <ion-label class=\"ion-padding-start ion-padding-end\"> <h2> <ion-icon name=\"hammer-outline\"></ion-icon> </h2> </ion-label> \n    </ion-segment-button>\n    <ion-segment-button value=\"maintenance\">\n      <ion-label class=\"ion-padding-start ion-padding-end\"> <h2> <ion-icon name=\"build-outline\"></ion-icon> </h2> </ion-label>\n    </ion-segment-button>\n  </ion-segment>\n</ion-toolbar>\n\n<ion-content>\n  <app-request-admin *ngIf=\"selectedTab === 'request'\"></app-request-admin>\n  <app-services-admin *ngIf=\"selectedTab === 'services'\"></app-services-admin>\n  <app-maintenance-admin *ngIf=\"selectedTab === 'maintenance'\"></app-maintenance-admin>\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_administrator_services-manager_services-manager_module_ts.js.map