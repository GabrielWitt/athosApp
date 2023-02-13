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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _maintenance_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maintenance.component.html?ngResource */ 61649);
/* harmony import */ var _maintenance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maintenance.component.scss?ngResource */ 86177);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_calendar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/calendar.service */ 16695);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/requests.service */ 25293);
/* harmony import */ var src_app_shared_components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/components/services/new-request/new-request.component */ 58151);










let MaintenanceComponent = class MaintenanceComponent {
  constructor(calendar, modal, routerOutlet, requests, auth) {
    this.calendar = calendar;
    this.modal = modal;
    this.routerOutlet = routerOutlet;
    this.requests = requests;
    this.auth = auth;
    this.itemList = [];
    this.loading = false;
    this.filterSelected = '>';
    this.filterItems = [{
      name: 'Próximas',
      filter: '>'
    }, {
      name: 'Pasadas',
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
      const userData = yield _this.auth.getUser();
      _this.currentUser = userData.data;
      _this.itemList = yield _this.requests.readResidentRequestListOrderRent('userUID', _this.currentUser.uid, '==');
      console.log(_this.itemList);
      return _this.currentUser;
    })();
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

  editService(request) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modalService = yield _this3.modal.create({
        component: src_app_shared_components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_6__.NewRequestComponent,
        componentProps: {
          service: null,
          request,
          currentUser: _this3.currentUser
        },
        mode: 'ios',
        presentingElement: _this3.routerOutlet.nativeEl
      });
      modalService.present();
      const modalResult1 = yield modalService.onWillDismiss();

      if (modalResult1.data) {}
    })();
  }

};

MaintenanceComponent.ctorParameters = () => [{
  type: src_app_core_services_modules_calendar_service__WEBPACK_IMPORTED_MODULE_3__.CalendarService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRouterOutlet
}, {
  type: src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_5__.RequestsService
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__.FireAuthService
}];

MaintenanceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _services_resident_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-resident.page.html?ngResource */ 42527);
/* harmony import */ var _services_resident_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-resident.page.scss?ngResource */ 25042);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_core_controller_services_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/controller/services.controller */ 82333);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);






let ServicesResidentPage = class ServicesResidentPage {
    constructor(services, userCtrl) {
        this.services = services;
        this.userCtrl = userCtrl;
    }
    ngOnInit() {
    }
    segmentChanged(ev) {
        this.services.changeTab(ev.detail.value);
    }
};
ServicesResidentPage.ctorParameters = () => [
    { type: src_app_core_controller_services_controller__WEBPACK_IMPORTED_MODULE_2__.ServicesController },
    { type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__.UserController }
];
ServicesResidentPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _services_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services.component.html?ngResource */ 69018);
/* harmony import */ var _services_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services.component.scss?ngResource */ 77848);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_controller_services_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/controller/services.controller */ 82333);
/* harmony import */ var src_app_shared_components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/components/services/new-request/new-request.component */ 58151);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);









let ServicesComponent = class ServicesComponent {
  constructor(services, auth, routerOutlet, modal) {
    this.services = services;
    this.auth = auth;
    this.routerOutlet = routerOutlet;
    this.modal = modal;
    this.loading = false;
    this.defaultSpace = '../../../../../assets/blueprint.png';
  }

  ngOnInit() {
    this.auth.getUser().then(user => {
      this.user = user.data;
    });
  }

  doRefresh(refresh) {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.loading = true;

      _this.services.loadServices(_this.user.type).then(() => {
        _this.loading = false;

        if (refresh) {
          refresh.target.complete();
        }
      });
    })();
  }

  showCost(space) {
    if (space.rent) {
      return space.rentData.cost + "$";
    } else {
      return 'Gratis';
    }
  }

  pickService(request, service) {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modalCreate = yield _this2.modal.create({
        component: src_app_shared_components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_4__.NewRequestComponent,
        componentProps: {
          service,
          request,
          currentUser: _this2.user
        },
        mode: 'ios',
        presentingElement: _this2.routerOutlet.nativeEl
      });
      modalCreate.present();
      const modalResult2 = yield modalCreate.onWillDismiss();
      console.log(modalResult2);

      if (modalResult2.data) {
        _this2.services.changeTab('maintenance');
      }
    })();
  }

};

ServicesComponent.ctorParameters = () => [{
  type: src_app_core_controller_services_controller__WEBPACK_IMPORTED_MODULE_3__.ServicesController
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_5__.FireAuthService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRouterOutlet
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController
}];

ServicesComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-services',
  template: _services_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_services_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ServicesComponent);


/***/ }),

/***/ 86177:
/*!**************************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/maintenance/maintenance.component.scss?ngResource ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWludGVuYW5jZS5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 25042:
/*!***************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services-resident.page.scss?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlcy1yZXNpZGVudC5wYWdlLnNjc3MifQ== */";

/***/ }),

/***/ 77848:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services/services.component.scss?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = ".headerServiceList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzLmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vUHJhY3RpY3VtJTIwNC9hdGhvc0FwcC9zcmMvYXBwL3BhZ2VzL2NsaWVudC9zZXJ2aWNlcy1yZXNpZGVudC9zZXJ2aWNlcy9zZXJ2aWNlcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDJDQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQ0NKIiwiZmlsZSI6InNlcnZpY2VzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlclNlcnZpY2VMaXN0e1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XG4gICAgZm9udC1zaXplOiAxNXB0O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiBibGFjaztcbn0iLCIuaGVhZGVyU2VydmljZUxpc3Qge1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiKDE4NywgMTg3LCAxODcpO1xuICBmb250LXNpemU6IDE1cHQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogYmxhY2s7XG59Il19 */";

/***/ }),

/***/ 61649:
/*!**************************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/maintenance/maintenance.component.html?ngResource ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene mantenimientos aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n\n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    <app-calendar-service-item *ngFor=\"let item of itemList\" [item]=\"item\" (click)=\"editService(item)\"></app-calendar-service-item>\n  </ion-list>\n</ion-content>\n";

/***/ }),

/***/ 42527:
/*!***************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services-resident.page.html?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"userCtrl.platform !== 'web'\">\n  <app-main-header *ngIf=\"services.selectedTab === 'maintenance'\" title=\"Tíquetes\"></app-main-header>\n  <app-main-header *ngIf=\"services.selectedTab === 'services'\" title=\"Servicios\"></app-main-header>\n</div>\n\n<ion-toolbar>\n  <ion-segment (ionChange)=\"segmentChanged($event)\" [value]=\"services.selectedTab\">\n    <ion-segment-button value=\"services\" layout=\"icon-start\">\n      <ion-label>Servicios</ion-label>\n      <ion-icon name=\"hammer-outline\"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value=\"maintenance\" layout=\"icon-start\">\n      <ion-label>Tíquetes</ion-label>\n      <ion-icon name=\"book-outline\"></ion-icon>\n    </ion-segment-button>\n  </ion-segment>\n</ion-toolbar>\n<app-services *ngIf=\"services.selectedTab === 'services'\" style=\"height: 100%\"></app-services>\n<app-maintenance *ngIf=\"services.selectedTab === 'maintenance'\" style=\"height: 100%\"></app-maintenance>";

/***/ }),

/***/ 69018:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/client/services-resident/services/services.component.html?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\" *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<app-not-data-yet-message \n  *ngIf=\"services.serviceList.length == 0 && services.maintenanceList.length == 0  && !loading\"\n  text=\"No tiene servicios aún\" icon=\"alert-circle-outline\"\n></app-not-data-yet-message>\n\n<ion-content class=\"ion-padding\"  *ngIf=\"(services.serviceList.length > 0 || services.maintenanceList.length > 0 ) && !loading\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  <ion-list>\n    <ion-accordion-group #accordionGroup value=\"second\">\n      <ion-accordion value=\"first\" *ngIf=\"(services.maintenanceList.length> 0)\">\n        <ion-item slot=\"header\" color=\"light\">\n          <ion-label>Mantenimiento</ion-label>\n        </ion-item>\n        <div class=\"ion-padding\" slot=\"content\">\n          <ion-row class=\"headerServiceList\" *ngIf=\"(services.maintenanceList.length> 0)\">\n            <ion-col size=\"2\" class=\"ion-text-center\"></ion-col>\n            <ion-col size=\"5\" class=\"ion-text-center\">Tipo</ion-col>\n            <ion-col size=\"5\" class=\"ion-text-center\">Servicio</ion-col>\n          </ion-row>\n          <app-service-item *ngFor=\"let service of services.maintenanceList\" [service]=\"service\" \n          (click)=\"pickService(null,service)\" [maintenance]=\"true\"></app-service-item>\n        </div>\n      </ion-accordion>\n      <ion-accordion value=\"second\" *ngIf=\"(services.serviceList.length> 0)\">\n        <ion-item slot=\"header\" color=\"light\">\n          <ion-label>Servicios</ion-label>\n        </ion-item>\n        <div class=\"ion-padding\" slot=\"content\">\n\n          <ion-row class=\"headerServiceList\" *ngIf=\"(services.serviceList.length> 0)\">\n            <ion-col size=\"1\" class=\"ion-text-center\"></ion-col>\n            <ion-col size=\"4\" class=\"ion-text-center\">Tipo</ion-col>\n            <ion-col size=\"4\" class=\"ion-text-center\">Servicio</ion-col>\n            <ion-col size=\"3\" class=\"ion-text-center\">Precio</ion-col>\n          </ion-row>\n          <app-service-item *ngFor=\"let service of services.serviceList\" [service]=\"service\" \n          (click)=\"pickService(null,service)\" [maintenance]=\"false\"></app-service-item>\n        </div>\n      </ion-accordion>\n    </ion-accordion-group>\n\n  </ion-list>\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_client_services-resident_services-resident_module_ts.js.map