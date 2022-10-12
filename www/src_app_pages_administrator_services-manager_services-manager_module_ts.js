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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _maintenance_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maintenance-admin.component.html?ngResource */ 86083);
/* harmony import */ var _maintenance_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maintenance-admin.component.scss?ngResource */ 97240);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_shared_components_services_new_service_new_service_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/components/services/new-service/new-service.component */ 36048);
/* harmony import */ var src_app_core_services_modules_maintenance_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/maintenance.service */ 82227);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);










let MaintenanceAdminComponent = class MaintenanceAdminComponent {
  constructor(modal, auth, services, routerOutlet, utility) {
    this.modal = modal;
    this.auth = auth;
    this.services = services;
    this.routerOutlet = routerOutlet;
    this.utility = utility;
    this.loading = true;
    this.itemList = [];
    this.filterSelected = '>';
    this.servicesList = [{
      title: 'Inpeccionar Tuberias',
      type: 'Plomería'
    }, {
      title: 'Inpeccionar Muros Húmedos',
      type: 'Plomería'
    }, {
      title: 'Inpeccionar Cableado',
      type: 'Eléctrico'
    }, {
      title: 'Inpeccionar Iluminación',
      type: 'Eléctrico'
    }, {
      title: 'Inpeccionar Dispositivo',
      type: 'Eléctrico'
    }, {
      title: 'Inpeccionar Ventana',
      type: 'Limpieza / Jardineria'
    }, {
      title: 'Inpeccionar Paneles de yeso',
      type: 'Muebles / Construcción'
    }, {
      title: 'Inpeccionar Concreto Agrietado',
      type: 'Muebles / Construcción'
    }, {
      title: 'Inpeccionar Area Dañada',
      type: 'Muebles / Construcción'
    }, {
      title: 'Inpeccionar Plantas',
      type: 'Limpieza / Jardineria'
    }, {
      title: 'Inpeccionar Area Sucia',
      type: 'Limpieza / Jardineria'
    }, {
      title: 'Limpieza de Espacio Comunal',
      type: 'Limpieza / Jardineria'
    }];
    this.typeList = this.services.typeList;
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
      const userData = yield _this.auth.getUser();
      _this.itemList = yield _this.services.readServicesListOrder('MD61xvWSecqNMYYjvEoM', true);
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

  editService(service) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modalService = yield _this3.modal.create({
        component: src_app_shared_components_services_new_service_new_service_component__WEBPACK_IMPORTED_MODULE_4__.NewServiceComponent,
        componentProps: {
          service,
          user: _this3.user
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

MaintenanceAdminComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__.FireAuthService
}, {
  type: src_app_core_services_modules_maintenance_service__WEBPACK_IMPORTED_MODULE_5__.MaintenanceService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRouterOutlet
}, {
  type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_6__.VerificationFuncService
}];

MaintenanceAdminComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _request_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request-admin.component.html?ngResource */ 71187);
/* harmony import */ var _request_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./request-admin.component.scss?ngResource */ 96063);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);
/* harmony import */ var src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/requests.service */ 25293);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_shared_components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/components/services/new-request/new-request.component */ 58151);
/* harmony import */ var src_app_shared_components_services_pick_service_pick_service_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/components/services/pick-service/pick-service.component */ 2850);











let RequestAdminComponent = class RequestAdminComponent {
  constructor(modal, requests, auth, userServ, routerOutlet) {
    this.modal = modal;
    this.requests = requests;
    this.auth = auth;
    this.userServ = userServ;
    this.routerOutlet = routerOutlet;
    this.loading = true;
    this.itemList = [];
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const userData = yield _this.auth.getUser();
      _this.user = userData.data;
      _this.itemList = yield _this.requests.readRequestListOrder();
      _this.loading = false;
      return _this.user;
    })();
  }

  doRefresh(refresh) {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.loadData();

      if (refresh) {
        refresh.target.complete();
      }
    })();
  }

  createRequest() {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modalService = yield _this3.modal.create({
        component: src_app_shared_components_services_pick_service_pick_service_component__WEBPACK_IMPORTED_MODULE_7__.PickServiceComponent,
        componentProps: {
          user: _this3.user
        },
        mode: 'ios',
        presentingElement: _this3.routerOutlet.nativeEl
      });
      modalService.present();
      const modalResult1 = yield modalService.onWillDismiss();

      if (modalResult1.data) {
        _this3.openRequest(null, modalResult1.data);
      }
    })();
  }

  openRequest(request, service) {
    var _this4 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.users = yield _this4.userServ.readOnlyResidents();
      const modalCreate = yield _this4.modal.create({
        component: src_app_shared_components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_6__.NewRequestComponent,
        componentProps: {
          service,
          request,
          currentUser: _this4.user,
          users: _this4.users
        },
        mode: 'ios',
        presentingElement: _this4.routerOutlet.nativeEl
      });
      modalCreate.present();
      const modalResult2 = yield modalCreate.onWillDismiss();
      console.log(modalResult2);

      if (modalResult2.data) {
        _this4.loadData();
      }
    })();
  }

};

RequestAdminComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
}, {
  type: src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_4__.RequestsService
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_5__.FireAuthService
}, {
  type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_3__.UsersService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRouterOutlet
}];

RequestAdminComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _services_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-admin.component.html?ngResource */ 30581);
/* harmony import */ var _services_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services-admin.component.scss?ngResource */ 38611);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);
/* harmony import */ var src_app_core_services_modules_maintenance_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/maintenance.service */ 82227);
/* harmony import */ var src_app_shared_components_services_new_service_new_service_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/components/services/new-service/new-service.component */ 36048);










let ServicesAdminComponent = class ServicesAdminComponent {
  constructor(modal, auth, services, routerOutlet, utility) {
    this.modal = modal;
    this.auth = auth;
    this.services = services;
    this.routerOutlet = routerOutlet;
    this.utility = utility;
    this.loading = true;
    this.itemList = [];
    this.filterSelected = '>';
    this.servicesList = [{
      title: 'Inodoro corriendo',
      type: 'Plomería'
    }, {
      title: 'Desagües obstruidos',
      type: 'Plomería'
    }, {
      title: 'Tuberías oxidadas',
      type: 'Plomería'
    }, {
      title: 'Tuberías con fugas',
      type: 'Plomería'
    }, {
      title: 'Reparaciones de pintura',
      type: 'Plomería'
    }, {
      title: 'Re/Cableado Eléctrico',
      type: 'Eléctrico'
    }, {
      title: 'Reparación Eléctrica',
      type: 'Eléctrico'
    }, {
      title: 'Instalación de Piezas Eléctricas',
      type: 'Eléctrico'
    }, {
      title: 'Mantenimiento/Inpección de Piezas Eléctricas',
      type: 'Eléctrico'
    }, {
      title: 'Reparación/Mantenimiento de Artefactos con motor',
      type: 'Eléctrico'
    }, {
      title: 'Cambio de Paneles de yeso',
      type: 'Muebles / Construcción'
    }, {
      title: 'Reparar Concreto Agrietado',
      type: 'Muebles / Construcción'
    }, {
      title: 'Diseño/Colocación de Ambiente navideño',
      type: 'Limpieza / Jardineria'
    }, {
      title: 'Retiro de Ambiente Navideño',
      type: 'Limpieza / Jardineria'
    }, {
      title: 'Limpieza de Espacio',
      type: 'Limpieza / Jardineria'
    }, {
      title: 'Limpieza Profunda Anual',
      type: 'Limpieza / Jardineria'
    }, {
      title: 'Cuidado de Macetas',
      type: 'Limpieza / Jardineria'
    }, {
      title: 'Poda de Arbustos y Plantas Ornamentales',
      type: 'Limpieza / Jardineria'
    }, {
      title: 'Abonar las plantas',
      type: 'Limpieza / Jardineria'
    }, {
      title: 'Reemplazar Ventana',
      type: 'Limpieza / Jardineria'
    }];
    this.typeList = this.services.typeList;
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
      const userData = yield _this.auth.getUser();
      _this.itemList = yield _this.services.readServicesListOrder('MD61xvWSecqNMYYjvEoM', false);
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

  editService(service) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modalService = yield _this3.modal.create({
        component: src_app_shared_components_services_new_service_new_service_component__WEBPACK_IMPORTED_MODULE_6__.NewServiceComponent,
        componentProps: {
          service,
          user: _this3.user
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

ServicesAdminComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__.FireAuthService
}, {
  type: src_app_core_services_modules_maintenance_service__WEBPACK_IMPORTED_MODULE_5__.MaintenanceService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRouterOutlet
}, {
  type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_4__.VerificationFuncService
}];

ServicesAdminComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _services_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-manager.page.html?ngResource */ 42727);
/* harmony import */ var _services_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-manager.page.scss?ngResource */ 62837);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);





let ServicesManagerPage = class ServicesManagerPage {
    constructor(userCtrl) {
        this.userCtrl = userCtrl;
        this.selectedTab = 'request';
    }
    ngOnInit() {
    }
    segmentChanged(ev) {
        this.selectedTab = ev.detail.value;
    }
};
ServicesManagerPage.ctorParameters = () => [
    { type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__.UserController }
];
ServicesManagerPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
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

module.exports = ".headerServiceList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW50ZW5hbmNlLWFkbWluLmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vUHJhY3RpY3VtJTIwNC9hdGhvc0FwcC9zcmMvYXBwL3BhZ2VzL2FkbWluaXN0cmF0b3Ivc2VydmljZXMtbWFuYWdlci9tYWludGVuYW5jZS1hZG1pbi9tYWludGVuYW5jZS1hZG1pbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDJDQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQ0NKIiwiZmlsZSI6Im1haW50ZW5hbmNlLWFkbWluLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlclNlcnZpY2VMaXN0e1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XG4gICAgZm9udC1zaXplOiAxNXB0O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiBibGFjaztcbn0iLCIuaGVhZGVyU2VydmljZUxpc3Qge1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiKDE4NywgMTg3LCAxODcpO1xuICBmb250LXNpemU6IDE1cHQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogYmxhY2s7XG59Il19 */";

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

module.exports = ".headerServiceList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzLWFkbWluLmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vUHJhY3RpY3VtJTIwNC9hdGhvc0FwcC9zcmMvYXBwL3BhZ2VzL2FkbWluaXN0cmF0b3Ivc2VydmljZXMtbWFuYWdlci9zZXJ2aWNlcy1hZG1pbi9zZXJ2aWNlcy1hZG1pbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDJDQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQ0NKIiwiZmlsZSI6InNlcnZpY2VzLWFkbWluLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlclNlcnZpY2VMaXN0e1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XG4gICAgZm9udC1zaXplOiAxNXB0O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiBibGFjaztcbn0iLCIuaGVhZGVyU2VydmljZUxpc3Qge1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiKDE4NywgMTg3LCAxODcpO1xuICBmb250LXNpemU6IDE1cHQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogYmxhY2s7XG59Il19 */";

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

module.exports = "<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene mantenimientos aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    <ion-row class=\"headerServiceList\">\n      <ion-col size=\"2\" class=\"ion-text-center\"></ion-col>\n      <ion-col size=\"5\" class=\"ion-text-center\">Tipo</ion-col>\n      <ion-col size=\"5\" class=\"ion-text-center\">Servicio</ion-col>\n    </ion-row>\n    <app-service-item *ngFor=\"let service of itemList\" [service]=\"service\" [maintenance]=\"true\"\n    (click)=\"editService(service)\"></app-service-item>\n  </ion-list>\n    \n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" (click)=\"editService(null)\">\n      <ion-icon name=\"create-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>";

/***/ }),

/***/ 71187:
/*!************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/request-admin/request-admin.component.html?ngResource ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene solicitudes aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    <app-item-request *ngFor=\"let request of itemList\" [request]=\"request\" [reserve]=\"false\" [currentUser]=\"user\" (click)=\"openRequest(request,null)\"></app-item-request>\n  </ion-list>\n    \n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" (click)=\"createRequest()\">\n      <ion-icon size=\"large\" name=\"add-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>";

/***/ }),

/***/ 30581:
/*!**************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/services-admin/services-admin.component.html?ngResource ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene servicios aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    <ion-row class=\"headerServiceList\">\n      <ion-col size=\"1\" class=\"ion-text-center\"></ion-col>\n      <ion-col size=\"4\" class=\"ion-text-center\">Tipo</ion-col>\n      <ion-col size=\"4\" class=\"ion-text-center\">Servicio</ion-col>\n      <ion-col size=\"3\" class=\"ion-text-center\">Precio</ion-col>\n    </ion-row>\n    <app-service-item *ngFor=\"let service of itemList\" [service]=\"service\" \n    (click)=\"editService(service)\" [maintenance]=\"false\"></app-service-item>\n  </ion-list>\n      \n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" (click)=\"editService(null)\">\n      <ion-icon name=\"create-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>";

/***/ }),

/***/ 42727:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/administrator/services-manager/services-manager.page.html?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"userCtrl.platform !== 'web'\">\n  <app-main-header *ngIf=\"selectedTab === 'request'\" title=\"Tíquetes\"></app-main-header>\n  <app-main-header *ngIf=\"selectedTab === 'services'\" title=\"Servicios\"></app-main-header>\n  <app-main-header *ngIf=\"selectedTab === 'maintenance'\" title=\"Mantenimientos\"></app-main-header>\n</div>\n<ion-toolbar>\n  <ion-segment (ionChange)=\"segmentChanged($event)\" value=\"request\">\n    <ion-segment-button value=\"request\" layout=\"icon-start\">\n      <ion-label *ngIf=\"userCtrl.platform === 'web'\">Tíquetes</ion-label>\n      <ion-icon name=\"book-outline\"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value=\"services\" layout=\"icon-start\">\n      <ion-label *ngIf=\"userCtrl.platform === 'web'\">Servicios</ion-label>\n      <ion-icon name=\"hammer-outline\"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value=\"maintenance\" layout=\"icon-start\">\n      <ion-label *ngIf=\"userCtrl.platform === 'web'\">Mantenimiento</ion-label>\n      <ion-icon name=\"build-outline\"></ion-icon>\n    </ion-segment-button>\n  </ion-segment>\n</ion-toolbar>\n\n<app-request-admin *ngIf=\"selectedTab === 'request'\" style=\"height: 100%\"></app-request-admin>\n<app-services-admin *ngIf=\"selectedTab === 'services'\" style=\"height: 100%\"></app-services-admin>\n<app-maintenance-admin *ngIf=\"selectedTab === 'maintenance'\" style=\"height: 100%\"></app-maintenance-admin>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_administrator_services-manager_services-manager_module_ts.js.map