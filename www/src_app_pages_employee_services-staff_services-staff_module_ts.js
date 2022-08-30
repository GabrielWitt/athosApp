"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_employee_services-staff_services-staff_module_ts"],{

/***/ 68699:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/calendar-orders/calendar-orders.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalendarOrdersComponent": () => (/* binding */ CalendarOrdersComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _calendar_orders_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar-orders.component.html?ngResource */ 76495);
/* harmony import */ var _calendar_orders_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-orders.component.scss?ngResource */ 69314);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_core_services_modules_calendar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/calendar.service */ 16695);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);







let CalendarOrdersComponent = class CalendarOrdersComponent {
  constructor(calendar, auth) {
    this.calendar = calendar;
    this.auth = auth;
    this.calendarItems = [];
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
    this.loadData().then(() => {
      this.loading = false;
    });
  }

  loadData() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const user = yield _this.auth.getUser();
      _this.currentUser = user.data;
      _this.calendarItems = yield _this.calendar.readFutureServicesByUser(_this.currentUser.uid, new Date().toISOString(), _this.filterSelected);

      _this.calendarItems.sort((a, b) => {
        if (a.startDate > b.startDate) {
          return 1;
        }

        if (a.startDate < b.startDate) {
          return -1;
        }

        return 0;
      });

      console.log(_this.calendarItems);
      return null;
      /*
      this.calendarItems = await this.calendar.readScheduleServicesByUser(this.currentUser.uid);
      this.calendar.readReservationCalendar().then(data => {
        console.log(data);
      })
       */
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

  filterChange(e) {
    this.filterSelected = e.detail.value;
    this.loadData();
  }

};

CalendarOrdersComponent.ctorParameters = () => [{
  type: src_app_core_services_modules_calendar_service__WEBPACK_IMPORTED_MODULE_3__.CalendarService
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__.FireAuthService
}];

CalendarOrdersComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
  selector: 'app-calendar-orders',
  template: _calendar_orders_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_calendar_orders_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], CalendarOrdersComponent);


/***/ }),

/***/ 62330:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/services-orders/services-orders.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesOrdersComponent": () => (/* binding */ ServicesOrdersComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _services_orders_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-orders.component.html?ngResource */ 90896);
/* harmony import */ var _services_orders_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services-orders.component.scss?ngResource */ 31064);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_controller_services_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/controller/services.controller */ 82333);
/* harmony import */ var src_app_shared_components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/components/services/new-request/new-request.component */ 58151);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);









let ServicesOrdersComponent = class ServicesOrdersComponent {
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

ServicesOrdersComponent.ctorParameters = () => [{
  type: src_app_core_controller_services_controller__WEBPACK_IMPORTED_MODULE_3__.ServicesController
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_5__.FireAuthService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRouterOutlet
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController
}];

ServicesOrdersComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-services-orders',
  template: _services_orders_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_services_orders_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ServicesOrdersComponent);


/***/ }),

/***/ 68151:
/*!********************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/services-staff-routing.module.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesStaffPageRoutingModule": () => (/* binding */ ServicesStaffPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _services_staff_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-staff.page */ 86079);




const routes = [
    {
        path: '',
        component: _services_staff_page__WEBPACK_IMPORTED_MODULE_0__.ServicesStaffPage
    }
];
let ServicesStaffPageRoutingModule = class ServicesStaffPageRoutingModule {
};
ServicesStaffPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ServicesStaffPageRoutingModule);



/***/ }),

/***/ 67794:
/*!************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/services-staff.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesStaffPageModule": () => (/* binding */ ServicesStaffPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _services_staff_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-staff-routing.module */ 68151);
/* harmony import */ var _services_staff_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-staff.page */ 86079);
/* harmony import */ var _calendar_orders_calendar_orders_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-orders/calendar-orders.component */ 68699);
/* harmony import */ var _services_orders_services_orders_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services-orders/services-orders.component */ 62330);
/* harmony import */ var _ticket_orders_ticket_orders_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ticket-orders/ticket-orders.component */ 41318);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);











let ServicesStaffPageModule = class ServicesStaffPageModule {
};
ServicesStaffPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule,
            _services_staff_routing_module__WEBPACK_IMPORTED_MODULE_0__.ServicesStaffPageRoutingModule
        ],
        declarations: [
            _services_staff_page__WEBPACK_IMPORTED_MODULE_1__.ServicesStaffPage,
            _calendar_orders_calendar_orders_component__WEBPACK_IMPORTED_MODULE_2__.CalendarOrdersComponent,
            _services_orders_services_orders_component__WEBPACK_IMPORTED_MODULE_3__.ServicesOrdersComponent,
            _ticket_orders_ticket_orders_component__WEBPACK_IMPORTED_MODULE_4__.TicketOrdersComponent
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_7__.CUSTOM_ELEMENTS_SCHEMA],
    })
], ServicesStaffPageModule);



/***/ }),

/***/ 86079:
/*!**********************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/services-staff.page.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesStaffPage": () => (/* binding */ ServicesStaffPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _services_staff_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-staff.page.html?ngResource */ 27091);
/* harmony import */ var _services_staff_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-staff.page.scss?ngResource */ 37132);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);





let ServicesStaffPage = class ServicesStaffPage {
    constructor(userCtrl) {
        this.userCtrl = userCtrl;
        this.selectedTab = 'calendar';
    }
    ngOnInit() {
    }
    segmentChanged(ev) {
        this.selectedTab = ev.detail.value;
    }
};
ServicesStaffPage.ctorParameters = () => [
    { type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__.UserController }
];
ServicesStaffPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-services-staff',
        template: _services_staff_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_services_staff_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ServicesStaffPage);



/***/ }),

/***/ 41318:
/*!****************************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/ticket-orders/ticket-orders.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TicketOrdersComponent": () => (/* binding */ TicketOrdersComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _ticket_orders_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ticket-orders.component.html?ngResource */ 24524);
/* harmony import */ var _ticket_orders_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ticket-orders.component.scss?ngResource */ 15713);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);
/* harmony import */ var src_app_shared_components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/components/services/new-request/new-request.component */ 58151);
/* harmony import */ var src_app_shared_components_services_pick_service_pick_service_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/components/services/pick-service/pick-service.component */ 2850);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);
/* harmony import */ var src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/modules/requests.service */ 25293);











let TicketOrdersComponent = class TicketOrdersComponent {
  constructor(modal, requests, userService, userCtrl, routerOutlet) {
    this.modal = modal;
    this.requests = requests;
    this.userService = userService;
    this.userCtrl = userCtrl;
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
      const userData = yield _this.userCtrl.loadUser();
      _this.user = userData.data;
      _this.users = yield _this.userService.readAllUsers();
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
        component: src_app_shared_components_services_pick_service_pick_service_component__WEBPACK_IMPORTED_MODULE_5__.PickServiceComponent,
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
      const modalCreate = yield _this4.modal.create({
        component: src_app_shared_components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_4__.NewRequestComponent,
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

TicketOrdersComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
}, {
  type: src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_7__.RequestsService
}, {
  type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_6__.UsersService
}, {
  type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__.UserController
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRouterOutlet
}];

TicketOrdersComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  selector: 'app-ticket-orders',
  template: _ticket_orders_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_ticket_orders_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], TicketOrdersComponent);


/***/ }),

/***/ 69314:
/*!*********************************************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/calendar-orders/calendar-orders.component.scss?ngResource ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWxlbmRhci1vcmRlcnMuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 31064:
/*!*********************************************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/services-orders/services-orders.component.scss?ngResource ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = ".headerServiceList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzLW9yZGVycy5jb21wb25lbnQuc2NzcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL1ByYWN0aWN1bSUyMDQvYXRob3NBcHAvc3JjL2FwcC9wYWdlcy9lbXBsb3llZS9zZXJ2aWNlcy1zdGFmZi9zZXJ2aWNlcy1vcmRlcnMvc2VydmljZXMtb3JkZXJzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksMkNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FDQ0oiLCJmaWxlIjoic2VydmljZXMtb3JkZXJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlclNlcnZpY2VMaXN0e1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XG4gICAgZm9udC1zaXplOiAxNXB0O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiBibGFjaztcbn0iLCIuaGVhZGVyU2VydmljZUxpc3Qge1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiKDE4NywgMTg3LCAxODcpO1xuICBmb250LXNpemU6IDE1cHQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogYmxhY2s7XG59Il19 */";

/***/ }),

/***/ 37132:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/services-staff.page.scss?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlcy1zdGFmZi5wYWdlLnNjc3MifQ== */";

/***/ }),

/***/ 15713:
/*!*****************************************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/ticket-orders/ticket-orders.component.scss?ngResource ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aWNrZXQtb3JkZXJzLmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 76495:
/*!*********************************************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/calendar-orders/calendar-orders.component.html?ngResource ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n\n  <app-loading-view *ngIf=\"loading\"></app-loading-view>\n  \n  <app-not-data-yet-message \n    *ngIf=\"calendarItems.length == 0 && !loading\"\n    text=\"No tiene eventos aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-item *ngIf=\"!loading\">\n    <ion-label>Servicios:</ion-label>\n    <ion-select placeholder=\"Todos los espacios\" class=\"ion-text-capitalize\" mode='ios' [value]=\"filterSelected\" (ionChange)=\"filterChange($event)\">\n      <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let item of filterItems\" [value]=\"item.filter\"> {{item.name}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  <ion-list *ngIf=\"calendarItems.length > 0 && !loading\">\n    <app-calendar-service-item *ngFor=\"let item of calendarItems\" [item]=\"item\"></app-calendar-service-item>\n  </ion-list>\n  \n</ion-content>";

/***/ }),

/***/ 90896:
/*!*********************************************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/services-orders/services-orders.component.html?ngResource ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\" *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<app-not-data-yet-message \n  *ngIf=\"services.serviceList.length == 0 && services.maintenanceList.length == 0  && !loading\"\n  text=\"No tiene servicios aún\" icon=\"alert-circle-outline\"\n></app-not-data-yet-message>\n\n<ion-content class=\"ion-padding\"  *ngIf=\"(services.serviceList.length > 0 || services.maintenanceList.length > 0 ) && !loading\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  <ion-list>\n    <ion-accordion-group #accordionGroup value=\"second\">\n      <ion-accordion value=\"first\" *ngIf=\"(services.maintenanceList.length> 0)\">\n        <ion-item slot=\"header\" color=\"light\">\n          <ion-label>Mantenimiento</ion-label>\n        </ion-item>\n        <div class=\"ion-padding\" slot=\"content\">\n          <ion-row class=\"headerServiceList\" *ngIf=\"(services.maintenanceList.length> 0)\">\n            <ion-col size=\"2\" class=\"ion-text-center\"></ion-col>\n            <ion-col size=\"5\" class=\"ion-text-center\">Tipo</ion-col>\n            <ion-col size=\"5\" class=\"ion-text-center\">Servicio</ion-col>\n          </ion-row>\n          <app-service-item *ngFor=\"let service of services.maintenanceList\" [service]=\"service\" \n          (click)=\"pickService(null,service)\" [maintenance]=\"true\"></app-service-item>\n        </div>\n      </ion-accordion>\n      <ion-accordion value=\"second\" *ngIf=\"(services.serviceList.length> 0)\">\n        <ion-item slot=\"header\" color=\"light\">\n          <ion-label>Servicios</ion-label>\n        </ion-item>\n        <div class=\"ion-padding\" slot=\"content\">\n\n          <ion-row class=\"headerServiceList\" *ngIf=\"(services.serviceList.length> 0)\">\n            <ion-col size=\"1\" class=\"ion-text-center\"></ion-col>\n            <ion-col size=\"4\" class=\"ion-text-center\">Tipo</ion-col>\n            <ion-col size=\"4\" class=\"ion-text-center\">Servicio</ion-col>\n            <ion-col size=\"3\" class=\"ion-text-center\">Precio</ion-col>\n          </ion-row>\n          <app-service-item *ngFor=\"let service of services.serviceList\" [service]=\"service\" \n          (click)=\"pickService(null,service)\" [maintenance]=\"false\"></app-service-item>\n        </div>\n      </ion-accordion>\n    </ion-accordion-group>\n\n  </ion-list>\n</ion-content>";

/***/ }),

/***/ 27091:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/services-staff.page.html?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"userCtrl.platform !== 'web'\">\n  <app-main-header *ngIf=\"selectedTab === 'request'\" title=\"Tíquetes\"></app-main-header>\n  <app-main-header *ngIf=\"selectedTab === 'services'\" title=\"Servicios\"></app-main-header>\n  <app-main-header *ngIf=\"selectedTab === 'calendar'\" title=\"Agenda\"></app-main-header>\n</div>\n<ion-toolbar>\n  <ion-segment (ionChange)=\"segmentChanged($event)\" value=\"calendar\">\n    <ion-segment-button value=\"calendar\" layout=\"icon-start\">\n      <ion-label *ngIf=\"userCtrl.platform === 'web'\">Agenda</ion-label>\n      <ion-icon name=\"calendar-outline\"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value=\"request\" layout=\"icon-start\">\n      <ion-label *ngIf=\"userCtrl.platform === 'web'\">Tíquetes</ion-label>\n      <ion-icon name=\"book-outline\"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value=\"services\" layout=\"icon-start\">\n      <ion-label *ngIf=\"userCtrl.platform === 'web'\">Servicios</ion-label>\n      <ion-icon name=\"hammer-outline\"></ion-icon>\n    </ion-segment-button>\n  </ion-segment>\n</ion-toolbar>\n\n<app-calendar-orders *ngIf=\"selectedTab === 'calendar'\" style=\"height: 100%\"></app-calendar-orders>\n<app-ticket-orders *ngIf=\"selectedTab === 'request'\" style=\"height: 100%\"></app-ticket-orders>\n<app-services-orders *ngIf=\"selectedTab === 'services'\" style=\"height: 100%\"></app-services-orders>";

/***/ }),

/***/ 24524:
/*!*****************************************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/ticket-orders/ticket-orders.component.html?ngResource ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene solicitudes aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    <app-item-request *ngFor=\"let request of itemList\" [request]=\"request\" [reserve]=\"false\" [currentUser]=\"user\" (click)=\"openRequest(request,null)\"></app-item-request>\n  </ion-list>\n    \n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" (click)=\"createRequest()\">\n      <ion-icon size=\"large\" name=\"create-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_employee_services-staff_services-staff_module_ts.js.map