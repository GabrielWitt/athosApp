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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _calendar_orders_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar-orders.component.html?ngResource */ 76495);
/* harmony import */ var _calendar_orders_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-orders.component.scss?ngResource */ 69314);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_core_services_modules_calendar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/calendar.service */ 16695);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/requests.service */ 25293);
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fullcalendar/core */ 22700);
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fullcalendar/daygrid */ 13947);
/* harmony import */ var _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fullcalendar/timegrid */ 69901);
/* harmony import */ var _fullcalendar_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fullcalendar/list */ 80296);












let CalendarOrdersComponent = class CalendarOrdersComponent {
  constructor(calendar, requests, auth) {
    this.calendar = calendar;
    this.requests = requests;
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
    let calendarEl = document.getElementById('calendar');
    let calendar = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_6__.Calendar(calendarEl, {
      plugins: [_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_7__["default"], _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_8__["default"], _fullcalendar_list__WEBPACK_IMPORTED_MODULE_9__["default"]],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialDate: '2018-01-12',
      navLinks: true,
      editable: true,
      dayMaxEvents: true,

      dayHeaderContent(arg) {
        return (0,_fullcalendar_core__WEBPACK_IMPORTED_MODULE_6__.createElement)(src_app_core_services_modules_calendar_service__WEBPACK_IMPORTED_MODULE_3__.CustomDayHeader, {
          text: arg.text
        });
      },

      events: [{
        title: 'All Day Event',
        start: '2018-01-01'
      }, {
        title: 'Long Event',
        start: '2018-01-07',
        end: '2018-01-10'
      }, {
        groupId: '999',
        title: 'Repeating Event',
        start: '2018-01-09T16:00:00'
      }, {
        groupId: '999',
        title: 'Repeating Event',
        start: '2018-01-16T16:00:00'
      }, {
        title: 'Conference',
        start: '2018-01-11',
        end: '2018-01-13'
      }, {
        title: 'Meeting',
        start: '2018-01-12T10:30:00',
        end: '2018-01-12T12:30:00'
      }, {
        title: 'Lunch',
        start: '2018-01-12T12:00:00'
      }, {
        title: 'Meeting',
        start: '2018-01-12T14:30:00'
      }, {
        title: 'Happy Hour',
        start: '2018-01-12T17:30:00'
      }, {
        title: 'Dinner',
        start: '2018-01-12T20:00:00'
      }, {
        title: 'Birthday Party',
        start: '2018-01-13T07:00:00'
      }, {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2018-01-28'
      }]
    });
    calendar.render();
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

      yield _this.requests.readRequestListOrder().then(data => {
        console.log(data);

        _this.calendarItems.forEach(item => {
          data.forEach(service => {
            if (item.uid === service.uid) {
              item['service'] = service;
            }
          });
        });
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
  type: src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_5__.RequestsService
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__.FireAuthService
}];

CalendarOrdersComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
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
        this.selectedTab = 'request';
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

/***/ 13947:
/*!****************************************************!*\
  !*** ./node_modules/@fullcalendar/daygrid/main.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DayGridView": () => (/* binding */ DayTableView),
/* harmony export */   "DayTable": () => (/* binding */ DayTable),
/* harmony export */   "DayTableSlicer": () => (/* binding */ DayTableSlicer),
/* harmony export */   "Table": () => (/* binding */ Table),
/* harmony export */   "TableView": () => (/* binding */ TableView),
/* harmony export */   "buildDayTableModel": () => (/* binding */ buildDayTableModel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/common */ 7085);
/*!
FullCalendar v6.0.0-beta.1
Docs & License: https://fullcalendar.io/
(c) 2022 Adam Shaw
*/

/* An abstract class for the daygrid views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a Table subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.

class TableView extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DateComponent {
  constructor() {
    super(...arguments);
    this.headerElRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  }

  renderSimpleLayout(headerRowContent, bodyContent) {
    let {
      props,
      context
    } = this;
    let sections = [];
    let stickyHeaderDates = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getStickyHeaderDates)(context.options);

    if (headerRowContent) {
      sections.push({
        type: 'header',
        key: 'header',
        isSticky: stickyHeaderDates,
        chunk: {
          elRef: this.headerElRef,
          tableClassName: 'fc-col-header',
          rowContent: headerRowContent
        }
      });
    }

    sections.push({
      type: 'body',
      key: 'body',
      liquid: true,
      chunk: {
        content: bodyContent
      }
    });
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.ViewRoot, {
      viewSpec: context.viewSpec
    }, (rootElRef, classNames) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: rootElRef,
      className: ['fc-daygrid'].concat(classNames).join(' ')
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.SimpleScrollGrid, {
      liquid: !props.isHeightAuto && !props.forPrint,
      collapsibleWidth: props.forPrint,
      cols: []
      /* TODO: make optional? */
      ,
      sections: sections
    })));
  }

  renderHScrollLayout(headerRowContent, bodyContent, colCnt, dayMinWidth) {
    let ScrollGrid = this.context.pluginHooks.scrollGridImpl;

    if (!ScrollGrid) {
      throw new Error('No ScrollGrid implementation');
    }

    let {
      props,
      context
    } = this;
    let stickyHeaderDates = !props.forPrint && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getStickyHeaderDates)(context.options);
    let stickyFooterScrollbar = !props.forPrint && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getStickyFooterScrollbar)(context.options);
    let sections = [];

    if (headerRowContent) {
      sections.push({
        type: 'header',
        key: 'header',
        isSticky: stickyHeaderDates,
        chunks: [{
          key: 'main',
          elRef: this.headerElRef,
          tableClassName: 'fc-col-header',
          rowContent: headerRowContent
        }]
      });
    }

    sections.push({
      type: 'body',
      key: 'body',
      liquid: true,
      chunks: [{
        key: 'main',
        content: bodyContent
      }]
    });

    if (stickyFooterScrollbar) {
      sections.push({
        type: 'footer',
        key: 'footer',
        isSticky: true,
        chunks: [{
          key: 'main',
          content: _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.renderScrollShim
        }]
      });
    }

    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.ViewRoot, {
      viewSpec: context.viewSpec
    }, (rootElRef, classNames) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: rootElRef,
      className: ['fc-daygrid'].concat(classNames).join(' ')
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(ScrollGrid, {
      liquid: !props.isHeightAuto && !props.forPrint,
      collapsibleWidth: props.forPrint,
      colGroups: [{
        cols: [{
          span: colCnt,
          minWidth: dayMinWidth
        }]
      }],
      sections: sections
    })));
  }

}

function splitSegsByRow(segs, rowCnt) {
  let byRow = [];

  for (let i = 0; i < rowCnt; i += 1) {
    byRow[i] = [];
  }

  for (let seg of segs) {
    byRow[seg.row].push(seg);
  }

  return byRow;
}

function splitSegsByFirstCol(segs, colCnt) {
  let byCol = [];

  for (let i = 0; i < colCnt; i += 1) {
    byCol[i] = [];
  }

  for (let seg of segs) {
    byCol[seg.firstCol].push(seg);
  }

  return byCol;
}

function splitInteractionByRow(ui, rowCnt) {
  let byRow = [];

  if (!ui) {
    for (let i = 0; i < rowCnt; i += 1) {
      byRow[i] = null;
    }
  } else {
    for (let i = 0; i < rowCnt; i += 1) {
      byRow[i] = {
        affectedInstances: ui.affectedInstances,
        isEvent: ui.isEvent,
        segs: []
      };
    }

    for (let seg of ui.segs) {
      byRow[seg.row].segs.push(seg);
    }
  }

  return byRow;
}

class TableCellTop extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  render() {
    let {
      props
    } = this;
    let navLinkAttrs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildNavLinkAttrs)(this.context, props.date);
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DayCellContent, {
      date: props.date,
      dateProfile: props.dateProfile,
      todayRange: props.todayRange,
      showDayNumber: props.showDayNumber,
      extraHookProps: props.extraHookProps,
      defaultContent: renderTopInner
    }, (innerElRef, innerContent) => (innerContent || props.forceDayTop) && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-daygrid-day-top",
      ref: innerElRef
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", Object.assign({
      id: props.dayNumberId,
      className: "fc-daygrid-day-number"
    }, navLinkAttrs), innerContent || (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "\u00A0"))));
  }

}

function renderTopInner(props) {
  return props.dayNumberText;
}

const DEFAULT_TABLE_EVENT_TIME_FORMAT = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createFormatter)({
  hour: 'numeric',
  minute: '2-digit',
  omitZeroMinute: true,
  meridiem: 'narrow'
});

function hasListItemDisplay(seg) {
  let {
    display
  } = seg.eventRange.ui;
  return display === 'list-item' || display === 'auto' && !seg.eventRange.def.allDay && seg.firstCol === seg.lastCol && // can't be multi-day
  seg.isStart && // "
  seg.isEnd // "
  ;
}

class TableBlockEvent extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  render() {
    let {
      props
    } = this;
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.StandardEvent, Object.assign({}, props, {
      extraClassNames: ['fc-daygrid-event', 'fc-daygrid-block-event', 'fc-h-event'],
      defaultTimeFormat: DEFAULT_TABLE_EVENT_TIME_FORMAT,
      defaultDisplayEventEnd: props.defaultDisplayEventEnd,
      disableResizing: !props.seg.eventRange.def.allDay
    }));
  }

}

class TableListItemEvent extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  render() {
    let {
      props,
      context
    } = this;
    let timeFormat = context.options.eventTimeFormat || DEFAULT_TABLE_EVENT_TIME_FORMAT;
    let timeText = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildSegTimeText)(props.seg, timeFormat, context, true, props.defaultDisplayEventEnd);
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.EventRoot, {
      seg: props.seg,
      timeText: timeText,
      defaultContent: renderInnerContent,
      isDragging: props.isDragging,
      isResizing: false,
      isDateSelecting: false,
      isSelected: props.isSelected,
      isPast: props.isPast,
      isFuture: props.isFuture,
      isToday: props.isToday
    }, (rootElRef, classNames, innerElRef, innerContent) => // we don't use styles!
    (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", Object.assign({
      className: ['fc-daygrid-event', 'fc-daygrid-dot-event'].concat(classNames).join(' '),
      ref: rootElRef
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegAnchorAttrs)(props.seg, context)), innerContent));
  }

}

function renderInnerContent(innerProps) {
  return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-daygrid-event-dot",
    style: {
      borderColor: innerProps.borderColor || innerProps.backgroundColor
    }
  }), innerProps.timeText && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-time"
  }, innerProps.timeText), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-title"
  }, innerProps.event.title || (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "\u00A0")));
}

class TableCellMoreLink extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor() {
    super(...arguments);
    this.compileSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(compileSegs);
  }

  render() {
    let {
      props
    } = this;
    let {
      allSegs,
      invisibleSegs
    } = this.compileSegs(props.singlePlacements);
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.MoreLinkRoot, {
      dateProfile: props.dateProfile,
      todayRange: props.todayRange,
      allDayDate: props.allDayDate,
      moreCnt: props.moreCnt,
      allSegs: allSegs,
      hiddenSegs: invisibleSegs,
      alignmentElRef: props.alignmentElRef,
      alignGridTop: props.alignGridTop,
      extraDateSpan: props.extraDateSpan,
      popoverContent: () => {
        let isForcedInvisible = (props.eventDrag ? props.eventDrag.affectedInstances : null) || (props.eventResize ? props.eventResize.affectedInstances : null) || {};
        return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, allSegs.map(seg => {
          let instanceId = seg.eventRange.instance.instanceId;
          return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "fc-daygrid-event-harness",
            key: instanceId,
            style: {
              visibility: isForcedInvisible[instanceId] ? 'hidden' : ''
            }
          }, hasListItemDisplay(seg) ? (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableListItemEvent, Object.assign({
            seg: seg,
            isDragging: false,
            isSelected: instanceId === props.eventSelection,
            defaultDisplayEventEnd: false
          }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegMeta)(seg, props.todayRange))) : (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableBlockEvent, Object.assign({
            seg: seg,
            isDragging: false,
            isResizing: false,
            isDateSelecting: false,
            isSelected: instanceId === props.eventSelection,
            defaultDisplayEventEnd: false
          }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegMeta)(seg, props.todayRange))));
        }));
      }
    }, (rootElRef, classNames, innerElRef, innerContent, handleClick, title, isExpanded, popoverId) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", Object.assign({
      ref: rootElRef,
      className: ['fc-daygrid-more-link'].concat(classNames).join(' '),
      title: title,
      "aria-expanded": isExpanded,
      "aria-controls": popoverId
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createAriaClickAttrs)(handleClick)), innerContent));
  }

}

function compileSegs(singlePlacements) {
  let allSegs = [];
  let invisibleSegs = [];

  for (let placement of singlePlacements) {
    allSegs.push(placement.seg);

    if (!placement.isVisible) {
      invisibleSegs.push(placement.seg);
    }
  }

  return {
    allSegs,
    invisibleSegs
  };
}

const DEFAULT_WEEK_NUM_FORMAT = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createFormatter)({
  week: 'narrow'
});

class TableCell extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DateComponent {
  constructor() {
    super(...arguments);
    this.rootElRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.state = {
      dayNumberId: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getUniqueDomId)()
    };

    this.handleRootEl = el => {
      (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.setRef)(this.rootElRef, el);
      (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.setRef)(this.props.elRef, el);
    };
  }

  render() {
    let {
      context,
      props,
      state,
      rootElRef
    } = this;
    let {
      date,
      dateProfile
    } = props;
    let navLinkAttrs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildNavLinkAttrs)(context, date, 'week');
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DayCellRoot, {
      date: date,
      dateProfile: dateProfile,
      todayRange: props.todayRange,
      showDayNumber: props.showDayNumber,
      extraHookProps: props.extraHookProps,
      elRef: this.handleRootEl
    }, (dayElRef, dayClassNames, rootDataAttrs, isDisabled) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", Object.assign({
      ref: dayElRef,
      role: "gridcell",
      className: ['fc-daygrid-day'].concat(dayClassNames, props.extraClassNames || []).join(' ')
    }, rootDataAttrs, props.extraDataAttrs, props.showDayNumber ? {
      'aria-labelledby': state.dayNumberId
    } : {}), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner",
      ref: props.innerElRef
      /* different from hook system! RENAME */

    }, props.showWeekNumber && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.WeekNumberRoot, {
      date: date,
      defaultFormat: DEFAULT_WEEK_NUM_FORMAT
    }, (weekElRef, weekClassNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", Object.assign({
      ref: weekElRef,
      className: ['fc-daygrid-week-number'].concat(weekClassNames).join(' ')
    }, navLinkAttrs), innerContent)), !isDisabled && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableCellTop, {
      date: date,
      dateProfile: dateProfile,
      showDayNumber: props.showDayNumber,
      dayNumberId: state.dayNumberId,
      forceDayTop: props.forceDayTop,
      todayRange: props.todayRange,
      extraHookProps: props.extraHookProps
    }), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-daygrid-day-events",
      ref: props.fgContentElRef
    }, props.fgContent, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-daygrid-day-bottom",
      style: {
        marginTop: props.moreMarginTop
      }
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableCellMoreLink, {
      allDayDate: date,
      singlePlacements: props.singlePlacements,
      moreCnt: props.moreCnt,
      alignmentElRef: rootElRef,
      alignGridTop: !props.showDayNumber,
      extraDateSpan: props.extraDateSpan,
      dateProfile: props.dateProfile,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      todayRange: props.todayRange
    }))), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-daygrid-day-bg"
    }, props.bgContent))));
  }

}

function computeFgSegPlacement(segs, // assumed already sorted
dayMaxEvents, dayMaxEventRows, strictOrder, eventInstanceHeights, maxContentHeight, cells) {
  let hierarchy = new DayGridSegHierarchy();
  hierarchy.allowReslicing = true;
  hierarchy.strictOrder = strictOrder;

  if (dayMaxEvents === true || dayMaxEventRows === true) {
    hierarchy.maxCoord = maxContentHeight;
    hierarchy.hiddenConsumes = true;
  } else if (typeof dayMaxEvents === 'number') {
    hierarchy.maxStackCnt = dayMaxEvents;
  } else if (typeof dayMaxEventRows === 'number') {
    hierarchy.maxStackCnt = dayMaxEventRows;
    hierarchy.hiddenConsumes = true;
  } // create segInputs only for segs with known heights


  let segInputs = [];
  let unknownHeightSegs = [];

  for (let i = 0; i < segs.length; i += 1) {
    let seg = segs[i];
    let {
      instanceId
    } = seg.eventRange.instance;
    let eventHeight = eventInstanceHeights[instanceId];

    if (eventHeight != null) {
      segInputs.push({
        index: i,
        thickness: eventHeight,
        span: {
          start: seg.firstCol,
          end: seg.lastCol + 1
        }
      });
    } else {
      unknownHeightSegs.push(seg);
    }
  }

  let hiddenEntries = hierarchy.addSegs(segInputs);
  let segRects = hierarchy.toRects();
  let {
    singleColPlacements,
    multiColPlacements,
    leftoverMargins
  } = placeRects(segRects, segs, cells);
  let moreCnts = [];
  let moreMarginTops = []; // add segs with unknown heights

  for (let seg of unknownHeightSegs) {
    multiColPlacements[seg.firstCol].push({
      seg,
      isVisible: false,
      isAbsolute: true,
      absoluteTop: 0,
      marginTop: 0
    });

    for (let col = seg.firstCol; col <= seg.lastCol; col += 1) {
      singleColPlacements[col].push({
        seg: resliceSeg(seg, col, col + 1, cells),
        isVisible: false,
        isAbsolute: false,
        absoluteTop: 0,
        marginTop: 0
      });
    }
  } // add the hidden entries


  for (let col = 0; col < cells.length; col += 1) {
    moreCnts.push(0);
  }

  for (let hiddenEntry of hiddenEntries) {
    let seg = segs[hiddenEntry.index];
    let hiddenSpan = hiddenEntry.span;
    multiColPlacements[hiddenSpan.start].push({
      seg: resliceSeg(seg, hiddenSpan.start, hiddenSpan.end, cells),
      isVisible: false,
      isAbsolute: true,
      absoluteTop: 0,
      marginTop: 0
    });

    for (let col = hiddenSpan.start; col < hiddenSpan.end; col += 1) {
      moreCnts[col] += 1;
      singleColPlacements[col].push({
        seg: resliceSeg(seg, col, col + 1, cells),
        isVisible: false,
        isAbsolute: false,
        absoluteTop: 0,
        marginTop: 0
      });
    }
  } // deal with leftover margins


  for (let col = 0; col < cells.length; col += 1) {
    moreMarginTops.push(leftoverMargins[col]);
  }

  return {
    singleColPlacements,
    multiColPlacements,
    moreCnts,
    moreMarginTops
  };
} // rects ordered by top coord, then left


function placeRects(allRects, segs, cells) {
  let rectsByEachCol = groupRectsByEachCol(allRects, cells.length);
  let singleColPlacements = [];
  let multiColPlacements = [];
  let leftoverMargins = [];

  for (let col = 0; col < cells.length; col += 1) {
    let rects = rectsByEachCol[col]; // compute all static segs in singlePlacements

    let singlePlacements = [];
    let currentHeight = 0;
    let currentMarginTop = 0;

    for (let rect of rects) {
      let seg = segs[rect.index];
      singlePlacements.push({
        seg: resliceSeg(seg, col, col + 1, cells),
        isVisible: true,
        isAbsolute: false,
        absoluteTop: rect.levelCoord,
        marginTop: rect.levelCoord - currentHeight
      });
      currentHeight = rect.levelCoord + rect.thickness;
    } // compute mixed static/absolute segs in multiPlacements


    let multiPlacements = [];
    currentHeight = 0;
    currentMarginTop = 0;

    for (let rect of rects) {
      let seg = segs[rect.index];
      let isAbsolute = rect.span.end - rect.span.start > 1; // multi-column?

      let isFirstCol = rect.span.start === col;
      currentMarginTop += rect.levelCoord - currentHeight; // amount of space since bottom of previous seg

      currentHeight = rect.levelCoord + rect.thickness; // height will now be bottom of current seg

      if (isAbsolute) {
        currentMarginTop += rect.thickness;

        if (isFirstCol) {
          multiPlacements.push({
            seg: resliceSeg(seg, rect.span.start, rect.span.end, cells),
            isVisible: true,
            isAbsolute: true,
            absoluteTop: rect.levelCoord,
            marginTop: 0
          });
        }
      } else if (isFirstCol) {
        multiPlacements.push({
          seg: resliceSeg(seg, rect.span.start, rect.span.end, cells),
          isVisible: true,
          isAbsolute: false,
          absoluteTop: rect.levelCoord,
          marginTop: currentMarginTop // claim the margin

        });
        currentMarginTop = 0;
      }
    }

    singleColPlacements.push(singlePlacements);
    multiColPlacements.push(multiPlacements);
    leftoverMargins.push(currentMarginTop);
  }

  return {
    singleColPlacements,
    multiColPlacements,
    leftoverMargins
  };
}

function groupRectsByEachCol(rects, colCnt) {
  let rectsByEachCol = [];

  for (let col = 0; col < colCnt; col += 1) {
    rectsByEachCol.push([]);
  }

  for (let rect of rects) {
    for (let col = rect.span.start; col < rect.span.end; col += 1) {
      rectsByEachCol[col].push(rect);
    }
  }

  return rectsByEachCol;
}

function resliceSeg(seg, spanStart, spanEnd, cells) {
  if (seg.firstCol === spanStart && seg.lastCol === spanEnd - 1) {
    return seg;
  }

  let eventRange = seg.eventRange;
  let origRange = eventRange.range;
  let slicedRange = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.intersectRanges)(origRange, {
    start: cells[spanStart].date,
    end: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.addDays)(cells[spanEnd - 1].date, 1)
  });
  return Object.assign(Object.assign({}, seg), {
    firstCol: spanStart,
    lastCol: spanEnd - 1,
    eventRange: {
      def: eventRange.def,
      ui: Object.assign(Object.assign({}, eventRange.ui), {
        durationEditable: false
      }),
      instance: eventRange.instance,
      range: slicedRange
    },
    isStart: seg.isStart && slicedRange.start.valueOf() === origRange.start.valueOf(),
    isEnd: seg.isEnd && slicedRange.end.valueOf() === origRange.end.valueOf()
  });
}

class DayGridSegHierarchy extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.SegHierarchy {
  constructor() {
    super(...arguments); // config

    this.hiddenConsumes = false; // allows us to keep hidden entries in the hierarchy so they take up space

    this.forceHidden = {};
  }

  addSegs(segInputs) {
    const hiddenSegs = super.addSegs(segInputs);
    const {
      entriesByLevel
    } = this;

    const excludeHidden = entry => !this.forceHidden[(0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildEntryKey)(entry)]; // remove the forced-hidden segs


    for (let level = 0; level < entriesByLevel.length; level += 1) {
      entriesByLevel[level] = entriesByLevel[level].filter(excludeHidden);
    }

    return hiddenSegs;
  }

  handleInvalidInsertion(insertion, entry, hiddenEntries) {
    const {
      entriesByLevel,
      forceHidden
    } = this;
    const {
      touchingEntry,
      touchingLevel,
      touchingLateral
    } = insertion;

    if (this.hiddenConsumes && touchingEntry) {
      const touchingEntryId = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildEntryKey)(touchingEntry); // if not already hidden

      if (!forceHidden[touchingEntryId]) {
        if (this.allowReslicing) {
          const placeholderEntry = Object.assign(Object.assign({}, touchingEntry), {
            span: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.intersectSpans)(touchingEntry.span, entry.span)
          });
          const placeholderEntryId = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildEntryKey)(placeholderEntry);
          forceHidden[placeholderEntryId] = true;
          entriesByLevel[touchingLevel][touchingLateral] = placeholderEntry; // replace touchingEntry with our placeholder

          this.splitEntry(touchingEntry, entry, hiddenEntries); // split up the touchingEntry, reinsert it
        } else {
          forceHidden[touchingEntryId] = true;
          hiddenEntries.push(touchingEntry);
        }
      }
    }

    return super.handleInvalidInsertion(insertion, entry, hiddenEntries);
  }

}

class TableRow extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DateComponent {
  constructor() {
    super(...arguments);
    this.cellElRefs = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RefMap(); // the <td>

    this.frameElRefs = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RefMap(); // the fc-daygrid-day-frame

    this.fgElRefs = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RefMap(); // the fc-daygrid-day-events

    this.segHarnessRefs = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RefMap(); // indexed by "instanceId:firstCol"

    this.rootElRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.state = {
      framePositions: null,
      maxContentHeight: null,
      eventInstanceHeights: {}
    };
  }

  render() {
    let {
      props,
      state,
      context
    } = this;
    let {
      options
    } = context;
    let colCnt = props.cells.length;
    let businessHoursByCol = splitSegsByFirstCol(props.businessHourSegs, colCnt);
    let bgEventSegsByCol = splitSegsByFirstCol(props.bgEventSegs, colCnt);
    let highlightSegsByCol = splitSegsByFirstCol(this.getHighlightSegs(), colCnt);
    let mirrorSegsByCol = splitSegsByFirstCol(this.getMirrorSegs(), colCnt);
    let {
      singleColPlacements,
      multiColPlacements,
      moreCnts,
      moreMarginTops
    } = computeFgSegPlacement((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.sortEventSegs)(props.fgEventSegs, options.eventOrder), props.dayMaxEvents, props.dayMaxEventRows, options.eventOrderStrict, state.eventInstanceHeights, state.maxContentHeight, props.cells);
    let isForcedInvisible = // TODO: messy way to compute this
    props.eventDrag && props.eventDrag.affectedInstances || props.eventResize && props.eventResize.affectedInstances || {};
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      ref: this.rootElRef,
      role: "row"
    }, props.renderIntro && props.renderIntro(), props.cells.map((cell, col) => {
      let normalFgNodes = this.renderFgSegs(col, props.forPrint ? singleColPlacements[col] : multiColPlacements[col], props.todayRange, isForcedInvisible);
      let mirrorFgNodes = this.renderFgSegs(col, buildMirrorPlacements(mirrorSegsByCol[col], multiColPlacements), props.todayRange, {}, Boolean(props.eventDrag), Boolean(props.eventResize), false);
      return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableCell, {
        key: cell.key,
        elRef: this.cellElRefs.createRef(cell.key),
        innerElRef: this.frameElRefs.createRef(cell.key)
        /* FF <td> problem, but okay to use for left/right. TODO: rename prop */
        ,
        dateProfile: props.dateProfile,
        date: cell.date,
        showDayNumber: props.showDayNumbers,
        showWeekNumber: props.showWeekNumbers && col === 0,
        forceDayTop: props.showWeekNumbers
        /* even displaying weeknum for row, not necessarily day */
        ,
        todayRange: props.todayRange,
        eventSelection: props.eventSelection,
        eventDrag: props.eventDrag,
        eventResize: props.eventResize,
        extraHookProps: cell.extraHookProps,
        extraDataAttrs: cell.extraDataAttrs,
        extraClassNames: cell.extraClassNames,
        extraDateSpan: cell.extraDateSpan,
        moreCnt: moreCnts[col],
        moreMarginTop: moreMarginTops[col],
        singlePlacements: singleColPlacements[col],
        fgContentElRef: this.fgElRefs.createRef(cell.key),
        fgContent: // Fragment scopes the keys
        (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, normalFgNodes), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, mirrorFgNodes)),
        bgContent: // Fragment scopes the keys
        (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, this.renderFillSegs(highlightSegsByCol[col], 'highlight'), this.renderFillSegs(businessHoursByCol[col], 'non-business'), this.renderFillSegs(bgEventSegsByCol[col], 'bg-event'))
      });
    }));
  }

  componentDidMount() {
    this.updateSizing(true);
  }

  componentDidUpdate(prevProps, prevState) {
    let currentProps = this.props;
    this.updateSizing(!(0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.isPropsEqual)(prevProps, currentProps));
  }

  getHighlightSegs() {
    let {
      props
    } = this;

    if (props.eventDrag && props.eventDrag.segs.length) {
      // messy check
      return props.eventDrag.segs;
    }

    if (props.eventResize && props.eventResize.segs.length) {
      // messy check
      return props.eventResize.segs;
    }

    return props.dateSelectionSegs;
  }

  getMirrorSegs() {
    let {
      props
    } = this;

    if (props.eventResize && props.eventResize.segs.length) {
      // messy check
      return props.eventResize.segs;
    }

    return [];
  }

  renderFgSegs(col, segPlacements, todayRange, isForcedInvisible, isDragging, isResizing, isDateSelecting) {
    let {
      context
    } = this;
    let {
      eventSelection
    } = this.props;
    let {
      framePositions
    } = this.state;
    let defaultDisplayEventEnd = this.props.cells.length === 1; // colCnt === 1

    let isMirror = isDragging || isResizing || isDateSelecting;
    let nodes = [];

    if (framePositions) {
      for (let placement of segPlacements) {
        let {
          seg
        } = placement;
        let {
          instanceId
        } = seg.eventRange.instance;
        let key = instanceId + ':' + col;
        let isVisible = placement.isVisible && !isForcedInvisible[instanceId];
        let isAbsolute = placement.isAbsolute;
        let left = '';
        let right = '';

        if (isAbsolute) {
          if (context.isRtl) {
            right = 0;
            left = framePositions.lefts[seg.lastCol] - framePositions.lefts[seg.firstCol];
          } else {
            left = 0;
            right = framePositions.rights[seg.firstCol] - framePositions.rights[seg.lastCol];
          }
        }
        /*
        known bug: events that are force to be list-item but span multiple days still take up space in later columns
        todo: in print view, for multi-day events, don't display title within non-start/end segs
        */


        nodes.push((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: 'fc-daygrid-event-harness' + (isAbsolute ? ' fc-daygrid-event-harness-abs' : ''),
          key: key,
          ref: isMirror ? null : this.segHarnessRefs.createRef(key),
          style: {
            visibility: isVisible ? '' : 'hidden',
            marginTop: isAbsolute ? '' : placement.marginTop,
            top: isAbsolute ? placement.absoluteTop : '',
            left,
            right
          }
        }, hasListItemDisplay(seg) ? (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableListItemEvent, Object.assign({
          seg: seg,
          isDragging: isDragging,
          isSelected: instanceId === eventSelection,
          defaultDisplayEventEnd: defaultDisplayEventEnd
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegMeta)(seg, todayRange))) : (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableBlockEvent, Object.assign({
          seg: seg,
          isDragging: isDragging,
          isResizing: isResizing,
          isDateSelecting: isDateSelecting,
          isSelected: instanceId === eventSelection,
          defaultDisplayEventEnd: defaultDisplayEventEnd
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegMeta)(seg, todayRange)))));
      }
    }

    return nodes;
  }

  renderFillSegs(segs, fillType) {
    let {
      isRtl
    } = this.context;
    let {
      todayRange
    } = this.props;
    let {
      framePositions
    } = this.state;
    let nodes = [];

    if (framePositions) {
      for (let seg of segs) {
        let leftRightCss = isRtl ? {
          right: 0,
          left: framePositions.lefts[seg.lastCol] - framePositions.lefts[seg.firstCol]
        } : {
          left: 0,
          right: framePositions.rights[seg.firstCol] - framePositions.rights[seg.lastCol]
        };
        nodes.push((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildEventRangeKey)(seg.eventRange),
          className: "fc-daygrid-bg-harness",
          style: leftRightCss
        }, fillType === 'bg-event' ? (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BgEvent, Object.assign({
          seg: seg
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegMeta)(seg, todayRange))) : (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.renderFill)(fillType)));
      }
    }

    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, ...nodes);
  }

  updateSizing(isExternalSizingChange) {
    let {
      props,
      frameElRefs
    } = this;

    if (!props.forPrint && props.clientWidth !== null // positioning ready?
    ) {
      if (isExternalSizingChange) {
        let frameEls = props.cells.map(cell => frameElRefs.currentMap[cell.key]);

        if (frameEls.length) {
          let originEl = this.rootElRef.current;
          this.setState({
            framePositions: new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.PositionCache(originEl, frameEls, true, // isHorizontal
            false)
          });
        }
      }

      const oldInstanceHeights = this.state.eventInstanceHeights;
      const newInstanceHeights = this.queryEventInstanceHeights();
      const limitByContentHeight = props.dayMaxEvents === true || props.dayMaxEventRows === true;
      this.safeSetState({
        // HACK to prevent oscillations of events being shown/hidden from max-event-rows
        // Essentially, once you compute an element's height, never null-out.
        // TODO: always display all events, as visibility:hidden?
        eventInstanceHeights: Object.assign(Object.assign({}, oldInstanceHeights), newInstanceHeights),
        maxContentHeight: limitByContentHeight ? this.computeMaxContentHeight() : null
      });
    }
  }

  queryEventInstanceHeights() {
    let segElMap = this.segHarnessRefs.currentMap;
    let eventInstanceHeights = {}; // get the max height amongst instance segs

    for (let key in segElMap) {
      let height = Math.round(segElMap[key].getBoundingClientRect().height);
      let instanceId = key.split(':')[0]; // deconstruct how renderFgSegs makes the key

      eventInstanceHeights[instanceId] = Math.max(eventInstanceHeights[instanceId] || 0, height);
    }

    return eventInstanceHeights;
  }

  computeMaxContentHeight() {
    let firstKey = this.props.cells[0].key;
    let cellEl = this.cellElRefs.currentMap[firstKey];
    let fcContainerEl = this.fgElRefs.currentMap[firstKey];
    return cellEl.getBoundingClientRect().bottom - fcContainerEl.getBoundingClientRect().top;
  }

  getCellEls() {
    let elMap = this.cellElRefs.currentMap;
    return this.props.cells.map(cell => elMap[cell.key]);
  }

}

TableRow.addStateEquality({
  eventInstanceHeights: _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.isPropsEqual
});

function buildMirrorPlacements(mirrorSegs, colPlacements) {
  if (!mirrorSegs.length) {
    return [];
  }

  let topsByInstanceId = buildAbsoluteTopHash(colPlacements); // TODO: cache this at first render?

  return mirrorSegs.map(seg => ({
    seg,
    isVisible: true,
    isAbsolute: true,
    absoluteTop: topsByInstanceId[seg.eventRange.instance.instanceId],
    marginTop: 0
  }));
}

function buildAbsoluteTopHash(colPlacements) {
  let topsByInstanceId = {};

  for (let placements of colPlacements) {
    for (let placement of placements) {
      topsByInstanceId[placement.seg.eventRange.instance.instanceId] = placement.absoluteTop;
    }
  }

  return topsByInstanceId;
}

class Table extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DateComponent {
  constructor() {
    super(...arguments);
    this.splitBusinessHourSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitSegsByRow);
    this.splitBgEventSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitSegsByRow);
    this.splitFgEventSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitSegsByRow);
    this.splitDateSelectionSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitSegsByRow);
    this.splitEventDrag = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitInteractionByRow);
    this.splitEventResize = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitInteractionByRow);
    this.rowRefs = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RefMap();

    this.handleRootEl = rootEl => {
      this.rootEl = rootEl;

      if (rootEl) {
        this.context.registerInteractiveComponent(this, {
          el: rootEl,
          isHitComboAllowed: this.props.isHitComboAllowed
        });
      } else {
        this.context.unregisterInteractiveComponent(this);
      }
    };
  }

  render() {
    let {
      props
    } = this;
    let {
      dateProfile,
      dayMaxEventRows,
      dayMaxEvents,
      expandRows
    } = props;
    let rowCnt = props.cells.length;
    let businessHourSegsByRow = this.splitBusinessHourSegs(props.businessHourSegs, rowCnt);
    let bgEventSegsByRow = this.splitBgEventSegs(props.bgEventSegs, rowCnt);
    let fgEventSegsByRow = this.splitFgEventSegs(props.fgEventSegs, rowCnt);
    let dateSelectionSegsByRow = this.splitDateSelectionSegs(props.dateSelectionSegs, rowCnt);
    let eventDragByRow = this.splitEventDrag(props.eventDrag, rowCnt);
    let eventResizeByRow = this.splitEventResize(props.eventResize, rowCnt);
    let limitViaBalanced = dayMaxEvents === true || dayMaxEventRows === true; // if rows can't expand to fill fixed height, can't do balanced-height event limit
    // TODO: best place to normalize these options?

    if (limitViaBalanced && !expandRows) {
      limitViaBalanced = false;
      dayMaxEventRows = null;
      dayMaxEvents = null;
    }

    let classNames = ['fc-daygrid-body', limitViaBalanced ? 'fc-daygrid-body-balanced' : 'fc-daygrid-body-unbalanced', expandRows ? '' : 'fc-daygrid-body-natural' // will height of one row depend on the others?
    ];
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: classNames.join(' '),
      ref: this.handleRootEl,
      style: {
        // these props are important to give this wrapper correct dimensions for interactions
        // TODO: if we set it here, can we avoid giving to inner tables?
        width: props.clientWidth,
        minWidth: props.tableMinWidth
      }
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.NowTimer, {
      unit: "day"
    }, (nowDate, todayRange) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      role: "presentation",
      className: "fc-scrollgrid-sync-table",
      style: {
        width: props.clientWidth,
        minWidth: props.tableMinWidth,
        height: expandRows ? props.clientHeight : ''
      }
    }, props.colGroupNode, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", {
      role: "presentation"
    }, props.cells.map((cells, row) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableRow, {
      ref: this.rowRefs.createRef(row),
      key: cells.length ? cells[0].date.toISOString()
      /* best? or put key on cell? or use diff formatter? */
      : row // in case there are no cells (like when resource view is loading)
      ,
      showDayNumbers: rowCnt > 1,
      showWeekNumbers: props.showWeekNumbers,
      todayRange: todayRange,
      dateProfile: dateProfile,
      cells: cells,
      renderIntro: props.renderRowIntro,
      businessHourSegs: businessHourSegsByRow[row],
      eventSelection: props.eventSelection,
      bgEventSegs: bgEventSegsByRow[row].filter(isSegAllDay)
      /* hack */
      ,
      fgEventSegs: fgEventSegsByRow[row],
      dateSelectionSegs: dateSelectionSegsByRow[row],
      eventDrag: eventDragByRow[row],
      eventResize: eventResizeByRow[row],
      dayMaxEvents: dayMaxEvents,
      dayMaxEventRows: dayMaxEventRows,
      clientWidth: props.clientWidth,
      clientHeight: props.clientHeight,
      forPrint: props.forPrint
    })))))));
  } // Hit System
  // ----------------------------------------------------------------------------------------------------


  prepareHits() {
    this.rowPositions = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.PositionCache(this.rootEl, this.rowRefs.collect().map(rowObj => rowObj.getCellEls()[0]), // first cell el in each row. TODO: not optimal
    false, true);
    this.colPositions = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.PositionCache(this.rootEl, this.rowRefs.currentMap[0].getCellEls(), // cell els in first row
    true, // horizontal
    false);
  }

  queryHit(positionLeft, positionTop) {
    let {
      colPositions,
      rowPositions
    } = this;
    let col = colPositions.leftToIndex(positionLeft);
    let row = rowPositions.topToIndex(positionTop);

    if (row != null && col != null) {
      let cell = this.props.cells[row][col];
      return {
        dateProfile: this.props.dateProfile,
        dateSpan: Object.assign({
          range: this.getCellRange(row, col),
          allDay: true
        }, cell.extraDateSpan),
        dayEl: this.getCellEl(row, col),
        rect: {
          left: colPositions.lefts[col],
          right: colPositions.rights[col],
          top: rowPositions.tops[row],
          bottom: rowPositions.bottoms[row]
        },
        layer: 0
      };
    }

    return null;
  }

  getCellEl(row, col) {
    return this.rowRefs.currentMap[row].getCellEls()[col]; // TODO: not optimal
  }

  getCellRange(row, col) {
    let start = this.props.cells[row][col].date;
    let end = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.addDays)(start, 1);
    return {
      start,
      end
    };
  }

}

function isSegAllDay(seg) {
  return seg.eventRange.def.allDay;
}

class DayTableSlicer extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Slicer {
  constructor() {
    super(...arguments);
    this.forceDayIfListItem = true;
  }

  sliceRange(dateRange, dayTableModel) {
    return dayTableModel.sliceRange(dateRange);
  }

}

class DayTable extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DateComponent {
  constructor() {
    super(...arguments);
    this.slicer = new DayTableSlicer();
    this.tableRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  }

  render() {
    let {
      props,
      context
    } = this;
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(Table, Object.assign({
      ref: this.tableRef
    }, this.slicer.sliceProps(props, props.dateProfile, props.nextDayThreshold, context, props.dayTableModel), {
      dateProfile: props.dateProfile,
      cells: props.dayTableModel.cells,
      colGroupNode: props.colGroupNode,
      tableMinWidth: props.tableMinWidth,
      renderRowIntro: props.renderRowIntro,
      dayMaxEvents: props.dayMaxEvents,
      dayMaxEventRows: props.dayMaxEventRows,
      showWeekNumbers: props.showWeekNumbers,
      expandRows: props.expandRows,
      headerAlignElRef: props.headerAlignElRef,
      clientWidth: props.clientWidth,
      clientHeight: props.clientHeight,
      forPrint: props.forPrint
    }));
  }

}

class DayTableView extends TableView {
  constructor() {
    super(...arguments);
    this.buildDayTableModel = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(buildDayTableModel);
    this.headerRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.tableRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  }

  render() {
    let {
      options,
      dateProfileGenerator
    } = this.context;
    let {
      props
    } = this;
    let dayTableModel = this.buildDayTableModel(props.dateProfile, dateProfileGenerator);
    let headerContent = options.dayHeaders && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DayHeader, {
      ref: this.headerRef,
      dateProfile: props.dateProfile,
      dates: dayTableModel.headerDates,
      datesRepDistinctDays: dayTableModel.rowCnt === 1
    });

    let bodyContent = contentArg => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(DayTable, {
      ref: this.tableRef,
      dateProfile: props.dateProfile,
      dayTableModel: dayTableModel,
      businessHours: props.businessHours,
      dateSelection: props.dateSelection,
      eventStore: props.eventStore,
      eventUiBases: props.eventUiBases,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      nextDayThreshold: options.nextDayThreshold,
      colGroupNode: contentArg.tableColGroupNode,
      tableMinWidth: contentArg.tableMinWidth,
      dayMaxEvents: options.dayMaxEvents,
      dayMaxEventRows: options.dayMaxEventRows,
      showWeekNumbers: options.weekNumbers,
      expandRows: !props.isHeightAuto,
      headerAlignElRef: this.headerElRef,
      clientWidth: contentArg.clientWidth,
      clientHeight: contentArg.clientHeight,
      forPrint: props.forPrint
    });

    return options.dayMinWidth ? this.renderHScrollLayout(headerContent, bodyContent, dayTableModel.colCnt, options.dayMinWidth) : this.renderSimpleLayout(headerContent, bodyContent);
  }

}

function buildDayTableModel(dateProfile, dateProfileGenerator) {
  let daySeries = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DaySeriesModel(dateProfile.renderRange, dateProfileGenerator);
  return new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DayTableModel(daySeries, /year|month|week/.test(dateProfile.currentRangeUnit));
}

class TableDateProfileGenerator extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DateProfileGenerator {
  // Computes the date range that will be rendered.
  buildRenderRange(currentRange, currentRangeUnit, isRangeAllDay) {
    let {
      dateEnv
    } = this.props;
    let renderRange = super.buildRenderRange(currentRange, currentRangeUnit, isRangeAllDay);
    let start = renderRange.start;
    let end = renderRange.end;
    let endOfWeek; // year and month views should be aligned with weeks. this is already done for week

    if (/^(year|month)$/.test(currentRangeUnit)) {
      start = dateEnv.startOfWeek(start); // make end-of-week if not already

      endOfWeek = dateEnv.startOfWeek(end);

      if (endOfWeek.valueOf() !== end.valueOf()) {
        end = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.addWeeks)(endOfWeek, 1);
      }
    } // ensure 6 weeks


    if (this.props.monthMode && this.props.fixedWeekCount) {
      let rowCnt = Math.ceil( // could be partial weeks due to hiddenDays
      (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.diffWeeks)(start, end));
      end = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.addWeeks)(end, 6 - rowCnt);
    }

    return {
      start,
      end
    };
  }

}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n:root {\n  --fc-daygrid-event-dot-width: 8px;\n}\n/* help things clear margins of inner content */\n.fc-daygrid-day-frame,\n.fc-daygrid-day-events,\n.fc-daygrid-event-harness { /* for event top/bottom margins */\n}\n.fc-daygrid-day-frame:before, .fc-daygrid-day-events:before, .fc-daygrid-event-harness:before {\n  content: \"\";\n  clear: both;\n  display: table; }\n.fc-daygrid-day-frame:after, .fc-daygrid-day-events:after, .fc-daygrid-event-harness:after {\n  content: \"\";\n  clear: both;\n  display: table; }\n.fc .fc-daygrid-body { /* a <div> that wraps the table */\n    position: relative;\n    z-index: 1; /* container inner z-index's because <tr>s can't do it */\n  }\n.fc .fc-daygrid-day.fc-day-today {\n      background-color: rgba(255, 220, 40, 0.15);\n      background-color: var(--fc-today-bg-color, rgba(255, 220, 40, 0.15));\n    }\n.fc .fc-daygrid-day-frame {\n    position: relative;\n    min-height: 100%; /* seems to work better than `height` because sets height after rows/cells naturally do it */\n  }\n.fc {\n\n  /* cell top */\n\n}\n.fc .fc-daygrid-day-top {\n    display: flex;\n    flex-direction: row-reverse;\n  }\n.fc .fc-day-other .fc-daygrid-day-top {\n    opacity: 0.3;\n  }\n.fc {\n\n  /* day number (within cell top) */\n\n}\n.fc .fc-daygrid-day-number {\n    position: relative;\n    z-index: 4;\n    padding: 4px;\n  }\n.fc {\n\n  /* event container */\n\n}\n.fc .fc-daygrid-day-events {\n    margin-top: 1px; /* needs to be margin, not padding, so that available cell height can be computed */\n  }\n.fc {\n\n  /* positioning for balanced vs natural */\n\n}\n.fc .fc-daygrid-body-balanced .fc-daygrid-day-events {\n      position: absolute;\n      left: 0;\n      right: 0;\n    }\n.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events {\n      position: relative; /* for containing abs positioned event harnesses */\n      min-height: 2em; /* in addition to being a min-height during natural height, equalizes the heights a little bit */\n    }\n.fc .fc-daygrid-body-natural { /* can coexist with -unbalanced */\n  }\n.fc .fc-daygrid-body-natural .fc-daygrid-day-events {\n      margin-bottom: 1em;\n    }\n.fc {\n\n  /* event harness */\n\n}\n.fc .fc-daygrid-event-harness {\n    position: relative;\n  }\n.fc .fc-daygrid-event-harness-abs {\n    position: absolute;\n    top: 0; /* fallback coords for when cannot yet be computed */\n    left: 0; /* */\n    right: 0; /* */\n  }\n.fc .fc-daygrid-bg-harness {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n  }\n.fc {\n\n  /* bg content */\n\n}\n.fc .fc-daygrid-day-bg .fc-non-business { z-index: 1 }\n.fc .fc-daygrid-day-bg .fc-bg-event { z-index: 2 }\n.fc .fc-daygrid-day-bg .fc-highlight { z-index: 3 }\n.fc {\n\n  /* events */\n\n}\n.fc .fc-daygrid-event {\n    z-index: 6;\n    margin-top: 1px;\n  }\n.fc .fc-daygrid-event.fc-event-mirror {\n    z-index: 7;\n  }\n.fc {\n\n  /* cell bottom (within day-events) */\n\n}\n.fc .fc-daygrid-day-bottom {\n    font-size: .85em;\n    padding: 2px 3px 0\n  }\n.fc .fc-daygrid-day-bottom:before {\n  content: \"\";\n  clear: both;\n  display: table; }\n.fc .fc-daygrid-more-link {\n    position: relative;\n    z-index: 4;\n    cursor: pointer;\n  }\n.fc {\n\n  /* week number (within frame) */\n\n}\n.fc .fc-daygrid-week-number {\n    position: absolute;\n    z-index: 5;\n    top: 0;\n    padding: 2px;\n    min-width: 1.5em;\n    text-align: center;\n    background-color: rgba(208, 208, 208, 0.3);\n    background-color: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3));\n    color: #808080;\n    color: var(--fc-neutral-text-color, #808080);\n  }\n.fc {\n\n  /* popover */\n\n}\n.fc .fc-more-popover .fc-popover-body {\n    min-width: 220px;\n    padding: 10px;\n  }\n.fc-direction-ltr .fc-daygrid-event.fc-event-start,\n.fc-direction-rtl .fc-daygrid-event.fc-event-end {\n  margin-left: 2px;\n}\n.fc-direction-ltr .fc-daygrid-event.fc-event-end,\n.fc-direction-rtl .fc-daygrid-event.fc-event-start {\n  margin-right: 2px;\n}\n.fc-direction-ltr .fc-daygrid-week-number {\n    left: 0;\n    border-radius: 0 0 3px 0;\n  }\n.fc-direction-rtl .fc-daygrid-week-number {\n    right: 0;\n    border-radius: 0 0 0 3px;\n  }\n.fc-liquid-hack .fc-daygrid-day-frame {\n    position: static; /* will cause inner absolute stuff to expand to <td> */\n  }\n.fc-daygrid-event { /* make root-level, because will be dragged-and-dropped outside of a component root */\n  position: relative; /* for z-indexes assigned later */\n  white-space: nowrap;\n  border-radius: 3px; /* dot event needs this to when selected */\n  font-size: .85em;\n  font-size: var(--fc-small-font-size, .85em);\n}\n/* --- the rectangle (\"block\") style of event --- */\n.fc-daygrid-block-event .fc-event-time {\n    font-weight: bold;\n  }\n.fc-daygrid-block-event .fc-event-time,\n  .fc-daygrid-block-event .fc-event-title {\n    padding: 1px;\n  }\n/* --- the dot style of event --- */\n.fc-daygrid-dot-event {\n  display: flex;\n  align-items: center;\n  padding: 2px 0\n\n}\n.fc-daygrid-dot-event .fc-event-title {\n    flex-grow: 1;\n    flex-shrink: 1;\n    min-width: 0; /* important for allowing to shrink all the way */\n    overflow: hidden;\n    font-weight: bold;\n  }\n.fc-daygrid-dot-event:hover,\n  .fc-daygrid-dot-event.fc-event-mirror {\n    background: rgba(0, 0, 0, 0.1);\n  }\n.fc-daygrid-dot-event.fc-event-selected:before {\n    /* expand hit area */\n    top: -10px;\n    bottom: -10px;\n  }\n.fc-daygrid-event-dot { /* the actual dot */\n  margin: 0 4px;\n  box-sizing: content-box;\n  width: 0;\n  height: 0;\n  border: 4px solid #3788d8;\n  border: calc(var(--fc-daygrid-event-dot-width, 8px) / 2) solid var(--fc-event-border-color, #3788d8);\n  border-radius: 4px;\n  border-radius: calc(var(--fc-daygrid-event-dot-width, 8px) / 2);\n}\n/* --- spacing between time and title --- */\n.fc-direction-ltr .fc-daygrid-event .fc-event-time {\n    margin-right: 3px;\n  }\n.fc-direction-rtl .fc-daygrid-event .fc-event-time {\n    margin-left: 3px;\n  }\n";
styleInject(css_248z);
var main = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createPlugin)({
  initialView: 'dayGridMonth',
  views: {
    dayGrid: {
      component: DayTableView,
      dateProfileGeneratorClass: TableDateProfileGenerator
    },
    dayGridDay: {
      type: 'dayGrid',
      duration: {
        days: 1
      }
    },
    dayGridWeek: {
      type: 'dayGrid',
      duration: {
        weeks: 1
      }
    },
    dayGridMonth: {
      type: 'dayGrid',
      duration: {
        months: 1
      },
      monthMode: true,
      fixedWeekCount: true
    }
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (main);


/***/ }),

/***/ 80296:
/*!*************************************************!*\
  !*** ./node_modules/@fullcalendar/list/main.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListView": () => (/* binding */ ListView),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/common */ 7085);
/*!
FullCalendar v6.0.0-beta.1
Docs & License: https://fullcalendar.io/
(c) 2022 Adam Shaw
*/


class ListViewHeaderRow extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor() {
    super(...arguments);
    this.state = {
      textId: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getUniqueDomId)()
    };
  }

  render() {
    let {
      theme,
      dateEnv,
      options,
      viewApi
    } = this.context;
    let {
      cellId,
      dayDate,
      todayRange
    } = this.props;
    let {
      textId
    } = this.state;
    let dayMeta = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getDateMeta)(dayDate, todayRange); // will ever be falsy?

    let text = options.listDayFormat ? dateEnv.format(dayDate, options.listDayFormat) : ''; // will ever be falsy? also, BAD NAME "alt"

    let sideText = options.listDaySideFormat ? dateEnv.format(dayDate, options.listDaySideFormat) : '';
    let hookProps = Object.assign({
      date: dateEnv.toDate(dayDate),
      view: viewApi,
      textId,
      text,
      sideText,
      navLinkAttrs: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildNavLinkAttrs)(this.context, dayDate),
      sideNavLinkAttrs: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildNavLinkAttrs)(this.context, dayDate, 'day', false)
    }, dayMeta);
    let classNames = ['fc-list-day'].concat((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getDayClassNames)(dayMeta, theme)); // TODO: make a reusable HOC for dayHeader (used in daygrid/timegrid too)

    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RenderHook, {
      hookProps: hookProps,
      classNames: options.dayHeaderClassNames,
      content: options.dayHeaderContent,
      defaultContent: renderInnerContent,
      didMount: options.dayHeaderDidMount,
      willUnmount: options.dayHeaderWillUnmount
    }, (rootElRef, customClassNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      ref: rootElRef,
      className: classNames.concat(customClassNames).join(' '),
      "data-date": (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.formatDayString)(dayDate)
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      scope: "colgroup",
      colSpan: 3,
      id: cellId,
      "aria-labelledby": textId
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'fc-list-day-cushion ' + theme.getClass('tableCellShaded'),
      ref: innerElRef
    }, innerContent))));
  }

}

function renderInnerContent(props) {
  return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.text && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", Object.assign({
    id: props.textId,
    className: "fc-list-day-text"
  }, props.navLinkAttrs), props.text), props.sideText &&
  /* not keyboard tabbable */
  (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", Object.assign({
    "aria-hidden": true,
    className: "fc-list-day-side-text"
  }, props.sideNavLinkAttrs), props.sideText));
}

const DEFAULT_TIME_FORMAT = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createFormatter)({
  hour: 'numeric',
  minute: '2-digit',
  meridiem: 'short'
});

class ListViewEventRow extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  render() {
    let {
      props,
      context
    } = this;
    let {
      seg,
      timeHeaderId,
      eventHeaderId,
      dateHeaderId
    } = props;
    let timeFormat = context.options.eventTimeFormat || DEFAULT_TIME_FORMAT;
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.EventRoot, {
      seg: seg,
      timeText: "" // BAD. because of all-day content
      ,
      disableDragging: true,
      disableResizing: true,
      defaultContent: () => renderEventInnerContent(seg, context)
      /* weird */
      ,
      isPast: props.isPast,
      isFuture: props.isFuture,
      isToday: props.isToday,
      isSelected: props.isSelected,
      isDragging: props.isDragging,
      isResizing: props.isResizing,
      isDateSelecting: props.isDateSelecting
    }, (rootElRef, classNames, innerElRef, innerContent, hookProps) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      className: ['fc-list-event', hookProps.event.url ? 'fc-event-forced-url' : ''].concat(classNames).join(' '),
      ref: rootElRef
    }, buildTimeContent(seg, timeFormat, context, timeHeaderId, dateHeaderId), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      "aria-hidden": true,
      className: "fc-list-event-graphic"
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "fc-list-event-dot",
      style: {
        borderColor: hookProps.borderColor || hookProps.backgroundColor
      }
    })), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      ref: innerElRef,
      headers: `${eventHeaderId} ${dateHeaderId}`,
      className: "fc-list-event-title"
    }, innerContent)));
  }

}

function renderEventInnerContent(seg, context) {
  let interactiveAttrs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegAnchorAttrs)(seg, context);
  return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", Object.assign({}, interactiveAttrs), seg.eventRange.def.title);
}

function buildTimeContent(seg, timeFormat, context, timeHeaderId, dateHeaderId) {
  let {
    options
  } = context;

  if (options.displayEventTime !== false) {
    let eventDef = seg.eventRange.def;
    let eventInstance = seg.eventRange.instance;
    let doAllDay = false;
    let timeText;

    if (eventDef.allDay) {
      doAllDay = true;
    } else if ((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.isMultiDayRange)(seg.eventRange.range)) {
      // TODO: use (!isStart || !isEnd) instead?
      if (seg.isStart) {
        timeText = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildSegTimeText)(seg, timeFormat, context, null, null, eventInstance.range.start, seg.end);
      } else if (seg.isEnd) {
        timeText = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildSegTimeText)(seg, timeFormat, context, null, null, seg.start, eventInstance.range.end);
      } else {
        doAllDay = true;
      }
    } else {
      timeText = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildSegTimeText)(seg, timeFormat, context);
    }

    if (doAllDay) {
      let hookProps = {
        text: context.options.allDayText,
        view: context.viewApi
      };
      return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RenderHook, {
        hookProps: hookProps,
        classNames: options.allDayClassNames,
        content: options.allDayContent,
        defaultContent: renderAllDayInner,
        didMount: options.allDayDidMount,
        willUnmount: options.allDayWillUnmount
      }, (rootElRef, classNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
        ref: rootElRef,
        headers: `${timeHeaderId} ${dateHeaderId}`,
        className: ['fc-list-event-time'].concat(classNames).join(' ')
      }, innerContent));
    }

    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "fc-list-event-time"
    }, timeText);
  }

  return null;
}

function renderAllDayInner(hookProps) {
  return hookProps.text;
}
/*
Responsible for the scroller, and forwarding event-related actions into the "grid".
*/


class ListView extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DateComponent {
  constructor() {
    super(...arguments);
    this.computeDateVars = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(computeDateVars);
    this.eventStoreToSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(this._eventStoreToSegs);
    this.state = {
      timeHeaderId: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getUniqueDomId)(),
      eventHeaderId: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getUniqueDomId)(),
      dateHeaderIdRoot: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getUniqueDomId)()
    };

    this.setRootEl = rootEl => {
      if (rootEl) {
        this.context.registerInteractiveComponent(this, {
          el: rootEl
        });
      } else {
        this.context.unregisterInteractiveComponent(this);
      }
    };
  }

  render() {
    let {
      props,
      context
    } = this;
    let extraClassNames = ['fc-list', context.theme.getClass('table'), context.options.stickyHeaderDates !== false ? 'fc-list-sticky' : ''];
    let {
      dayDates,
      dayRanges
    } = this.computeDateVars(props.dateProfile);
    let eventSegs = this.eventStoreToSegs(props.eventStore, props.eventUiBases, dayRanges);
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.ViewRoot, {
      viewSpec: context.viewSpec,
      elRef: this.setRootEl
    }, (rootElRef, classNames) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: rootElRef,
      className: extraClassNames.concat(classNames).join(' ')
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Scroller, {
      liquid: !props.isHeightAuto,
      overflowX: props.isHeightAuto ? 'visible' : 'hidden',
      overflowY: props.isHeightAuto ? 'visible' : 'auto'
    }, eventSegs.length > 0 ? this.renderSegList(eventSegs, dayDates) : this.renderEmptyMessage())));
  }

  renderEmptyMessage() {
    let {
      options,
      viewApi
    } = this.context;
    let hookProps = {
      text: options.noEventsText,
      view: viewApi
    };
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RenderHook, {
      hookProps: hookProps,
      classNames: options.noEventsClassNames,
      content: options.noEventsContent,
      defaultContent: renderNoEventsInner,
      didMount: options.noEventsDidMount,
      willUnmount: options.noEventsWillUnmount
    }, (rootElRef, classNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: ['fc-list-empty'].concat(classNames).join(' '),
      ref: rootElRef
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-list-empty-cushion",
      ref: innerElRef
    }, innerContent)));
  }

  renderSegList(allSegs, dayDates) {
    let {
      theme,
      options
    } = this.context;
    let {
      timeHeaderId,
      eventHeaderId,
      dateHeaderIdRoot
    } = this.state;
    let segsByDay = groupSegsByDay(allSegs); // sparse array

    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.NowTimer, {
      unit: "day"
    }, (nowDate, todayRange) => {
      let innerNodes = [];

      for (let dayIndex = 0; dayIndex < segsByDay.length; dayIndex += 1) {
        let daySegs = segsByDay[dayIndex];

        if (daySegs) {
          // sparse array, so might be undefined
          let dayStr = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.formatDayString)(dayDates[dayIndex]);
          let dateHeaderId = dateHeaderIdRoot + '-' + dayStr; // append a day header

          innerNodes.push((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(ListViewHeaderRow, {
            key: dayStr,
            cellId: dateHeaderId,
            dayDate: dayDates[dayIndex],
            todayRange: todayRange
          }));
          daySegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.sortEventSegs)(daySegs, options.eventOrder);

          for (let seg of daySegs) {
            innerNodes.push((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(ListViewEventRow, Object.assign({
              key: dayStr + ':' + seg.eventRange.instance.instanceId
              /* are multiple segs for an instanceId */
              ,
              seg: seg,
              isDragging: false,
              isResizing: false,
              isDateSelecting: false,
              isSelected: false,
              timeHeaderId: timeHeaderId,
              eventHeaderId: eventHeaderId,
              dateHeaderId: dateHeaderId
            }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegMeta)(seg, todayRange, nowDate))));
          }
        }
      }

      return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
        className: 'fc-list-table ' + theme.getClass('table')
      }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
        scope: "col",
        id: timeHeaderId
      }, options.timeHint), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
        scope: "col",
        "aria-hidden": true
      }), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
        scope: "col",
        id: eventHeaderId
      }, options.eventHint))), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, innerNodes));
    });
  }

  _eventStoreToSegs(eventStore, eventUiBases, dayRanges) {
    return this.eventRangesToSegs((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.sliceEventStore)(eventStore, eventUiBases, this.props.dateProfile.activeRange, this.context.options.nextDayThreshold).fg, dayRanges);
  }

  eventRangesToSegs(eventRanges, dayRanges) {
    let segs = [];

    for (let eventRange of eventRanges) {
      segs.push(...this.eventRangeToSegs(eventRange, dayRanges));
    }

    return segs;
  }

  eventRangeToSegs(eventRange, dayRanges) {
    let {
      dateEnv
    } = this.context;
    let {
      nextDayThreshold
    } = this.context.options;
    let range = eventRange.range;
    let allDay = eventRange.def.allDay;
    let dayIndex;
    let segRange;
    let seg;
    let segs = [];

    for (dayIndex = 0; dayIndex < dayRanges.length; dayIndex += 1) {
      segRange = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.intersectRanges)(range, dayRanges[dayIndex]);

      if (segRange) {
        seg = {
          component: this,
          eventRange,
          start: segRange.start,
          end: segRange.end,
          isStart: eventRange.isStart && segRange.start.valueOf() === range.start.valueOf(),
          isEnd: eventRange.isEnd && segRange.end.valueOf() === range.end.valueOf(),
          dayIndex
        };
        segs.push(seg); // detect when range won't go fully into the next day,
        // and mutate the latest seg to the be the end.

        if (!seg.isEnd && !allDay && dayIndex + 1 < dayRanges.length && range.end < dateEnv.add(dayRanges[dayIndex + 1].start, nextDayThreshold)) {
          seg.end = range.end;
          seg.isEnd = true;
          break;
        }
      }
    }

    return segs;
  }

}

function renderNoEventsInner(hookProps) {
  return hookProps.text;
}

function computeDateVars(dateProfile) {
  let dayStart = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateProfile.renderRange.start);
  let viewEnd = dateProfile.renderRange.end;
  let dayDates = [];
  let dayRanges = [];

  while (dayStart < viewEnd) {
    dayDates.push(dayStart);
    dayRanges.push({
      start: dayStart,
      end: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.addDays)(dayStart, 1)
    });
    dayStart = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.addDays)(dayStart, 1);
  }

  return {
    dayDates,
    dayRanges
  };
} // Returns a sparse array of arrays, segs grouped by their dayIndex


function groupSegsByDay(segs) {
  let segsByDay = []; // sparse array

  let i;
  let seg;

  for (i = 0; i < segs.length; i += 1) {
    seg = segs[i];
    (segsByDay[seg.dayIndex] || (segsByDay[seg.dayIndex] = [])).push(seg);
  }

  return segsByDay;
}

const OPTION_REFINERS = {
  listDayFormat: createFalsableFormatter,
  listDaySideFormat: createFalsableFormatter,
  noEventsClassNames: _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.identity,
  noEventsContent: _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.identity,
  noEventsDidMount: _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.identity,
  noEventsWillUnmount: _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.identity // noEventsText is defined in base options

};

function createFalsableFormatter(input) {
  return input === false ? null : (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createFormatter)(input);
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n:root {\n  --fc-list-event-dot-width: 10px;\n  --fc-list-event-hover-bg-color: #f5f5f5;\n}\n.fc-theme-standard .fc-list {\n    border: 1px solid #ddd;\n    border: 1px solid var(--fc-border-color, #ddd);\n  }\n.fc {\n\n  /* message when no events */\n\n}\n.fc .fc-list-empty {\n    background-color: rgba(208, 208, 208, 0.3);\n    background-color: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3));\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center; /* vertically aligns fc-list-empty-inner */\n  }\n.fc .fc-list-empty-cushion {\n    margin: 5em 0;\n  }\n.fc {\n\n  /* table within the scroller */\n  /* ---------------------------------------------------------------------------------------------------- */\n\n}\n.fc .fc-list-table {\n    width: 100%;\n    border-style: hidden; /* kill outer border on theme */\n  }\n.fc .fc-list-table tr > * {\n    border-left: 0;\n    border-right: 0;\n  }\n.fc .fc-list-sticky .fc-list-day > * { /* the cells */\n      position: sticky;\n      top: 0;\n      background: #fff;\n      background: var(--fc-page-bg-color, #fff); /* for when headers are styled to be transparent and sticky */\n    }\n.fc {\n\n  /* only exists for aria reasons, hide for non-screen-readers */\n\n}\n.fc .fc-list-table thead {\n    position: absolute;\n    left: -10000px;\n  }\n.fc {\n\n  /* the table's border-style:hidden gets confused by hidden thead. force-hide top border of first cell */\n\n}\n.fc .fc-list-table tbody > tr:first-child th {\n    border-top: 0;\n  }\n.fc .fc-list-table th {\n    padding: 0; /* uses an inner-wrapper instead... */\n  }\n.fc .fc-list-table td,\n  .fc .fc-list-day-cushion {\n    padding: 8px 14px;\n  }\n.fc {\n\n\n  /* date heading rows */\n  /* ---------------------------------------------------------------------------------------------------- */\n\n}\n.fc .fc-list-day-cushion:after {\n  content: \"\";\n  clear: both;\n  display: table; /* clear floating */\n    }\n.fc-theme-standard .fc-list-day-cushion {\n    background-color: rgba(208, 208, 208, 0.3);\n    background-color: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3));\n  }\n.fc-direction-ltr .fc-list-day-text,\n.fc-direction-rtl .fc-list-day-side-text {\n  float: left;\n}\n.fc-direction-ltr .fc-list-day-side-text,\n.fc-direction-rtl .fc-list-day-text {\n  float: right;\n}\n/* make the dot closer to the event title */\n.fc-direction-ltr .fc-list-table .fc-list-event-graphic { padding-right: 0 }\n.fc-direction-rtl .fc-list-table .fc-list-event-graphic { padding-left: 0 }\n.fc .fc-list-event.fc-event-forced-url {\n    cursor: pointer; /* whole row will seem clickable */\n  }\n.fc .fc-list-event:hover td {\n    background-color: #f5f5f5;\n    background-color: var(--fc-list-event-hover-bg-color, #f5f5f5);\n  }\n.fc {\n\n  /* shrink certain cols */\n\n}\n.fc .fc-list-event-graphic,\n  .fc .fc-list-event-time {\n    white-space: nowrap;\n    width: 1px;\n  }\n.fc .fc-list-event-dot {\n    display: inline-block;\n    box-sizing: content-box;\n    width: 0;\n    height: 0;\n    border: 5px solid #3788d8;\n    border: calc(var(--fc-list-event-dot-width, 10px) / 2) solid var(--fc-event-border-color, #3788d8);\n    border-radius: 5px;\n    border-radius: calc(var(--fc-list-event-dot-width, 10px) / 2);\n  }\n.fc {\n\n  /* reset <a> styling */\n\n}\n.fc .fc-list-event-title a {\n    color: inherit;\n    text-decoration: none;\n  }\n.fc {\n\n  /* underline link when hovering over any part of row */\n\n}\n.fc .fc-list-event.fc-event-forced-url:hover a {\n    text-decoration: underline;\n  }\n";
styleInject(css_248z);
var main = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createPlugin)({
  optionRefiners: OPTION_REFINERS,
  views: {
    list: {
      component: ListView,
      buttonTextKey: 'list',
      listDayFormat: {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      } // like "January 1, 2016"

    },
    listDay: {
      type: 'list',
      duration: {
        days: 1
      },
      listDayFormat: {
        weekday: 'long'
      } // day-of-week is all we need. full date is probably in headerToolbar

    },
    listWeek: {
      type: 'list',
      duration: {
        weeks: 1
      },
      listDayFormat: {
        weekday: 'long'
      },
      listDaySideFormat: {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }
    },
    listMonth: {
      type: 'list',
      duration: {
        month: 1
      },
      listDaySideFormat: {
        weekday: 'long'
      } // day-of-week is nice-to-have

    },
    listYear: {
      type: 'list',
      duration: {
        year: 1
      },
      listDaySideFormat: {
        weekday: 'long'
      } // day-of-week is nice-to-have

    }
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (main);


/***/ }),

/***/ 69901:
/*!*****************************************************!*\
  !*** ./node_modules/@fullcalendar/timegrid/main.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DayTimeCols": () => (/* binding */ DayTimeCols),
/* harmony export */   "DayTimeColsSlicer": () => (/* binding */ DayTimeColsSlicer),
/* harmony export */   "DayTimeColsView": () => (/* binding */ DayTimeColsView),
/* harmony export */   "TimeCols": () => (/* binding */ TimeCols),
/* harmony export */   "TimeColsSlatsCoords": () => (/* binding */ TimeColsSlatsCoords),
/* harmony export */   "TimeColsView": () => (/* binding */ TimeColsView),
/* harmony export */   "buildDayRanges": () => (/* binding */ buildDayRanges),
/* harmony export */   "buildSlatMetas": () => (/* binding */ buildSlatMetas),
/* harmony export */   "buildTimeColsModel": () => (/* binding */ buildTimeColsModel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/common */ 7085);
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fullcalendar/daygrid */ 13947);
/*!
FullCalendar v6.0.0-beta.1
Docs & License: https://fullcalendar.io/
(c) 2022 Adam Shaw
*/



class AllDaySplitter extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Splitter {
  getKeyInfo() {
    return {
      allDay: {},
      timed: {}
    };
  }

  getKeysForDateSpan(dateSpan) {
    if (dateSpan.allDay) {
      return ['allDay'];
    }

    return ['timed'];
  }

  getKeysForEventDef(eventDef) {
    if (!eventDef.allDay) {
      return ['timed'];
    }

    if ((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.hasBgRendering)(eventDef)) {
      return ['timed', 'allDay'];
    }

    return ['allDay'];
  }

}

const DEFAULT_SLAT_LABEL_FORMAT = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createFormatter)({
  hour: 'numeric',
  minute: '2-digit',
  omitZeroMinute: true,
  meridiem: 'short'
});

function TimeColsAxisCell(props) {
  let classNames = ['fc-timegrid-slot', 'fc-timegrid-slot-label', props.isLabeled ? 'fc-scrollgrid-shrink' : 'fc-timegrid-slot-minor'];
  return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.ViewContextType.Consumer, null, context => {
    if (!props.isLabeled) {
      return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
        className: classNames.join(' '),
        "data-time": props.isoTimeStr
      });
    }

    let {
      dateEnv,
      options,
      viewApi
    } = context;
    let labelFormat = // TODO: fully pre-parse
    options.slotLabelFormat == null ? DEFAULT_SLAT_LABEL_FORMAT : Array.isArray(options.slotLabelFormat) ? (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createFormatter)(options.slotLabelFormat[0]) : (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createFormatter)(options.slotLabelFormat);
    let hookProps = {
      level: 0,
      time: props.time,
      date: dateEnv.toDate(props.date),
      view: viewApi,
      text: dateEnv.format(props.date, labelFormat)
    };
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RenderHook, {
      hookProps: hookProps,
      classNames: options.slotLabelClassNames,
      content: options.slotLabelContent,
      defaultContent: renderInnerContent,
      didMount: options.slotLabelDidMount,
      willUnmount: options.slotLabelWillUnmount
    }, (rootElRef, customClassNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      ref: rootElRef,
      className: classNames.concat(customClassNames).join(' '),
      "data-time": props.isoTimeStr
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame"
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-slot-label-cushion fc-scrollgrid-shrink-cushion",
      ref: innerElRef
    }, innerContent))));
  });
}

function renderInnerContent(props) {
  return props.text;
}

class TimeBodyAxis extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  render() {
    return this.props.slatMetas.map(slatMeta => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: slatMeta.key
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeColsAxisCell, Object.assign({}, slatMeta))));
  }

}

const DEFAULT_WEEK_NUM_FORMAT = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createFormatter)({
  week: 'short'
});
const AUTO_ALL_DAY_MAX_EVENT_ROWS = 5;

class TimeColsView extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DateComponent {
  constructor() {
    super(...arguments);
    this.allDaySplitter = new AllDaySplitter(); // for use by subclasses

    this.headerElRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.rootElRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.scrollerElRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.state = {
      slatCoords: null
    };

    this.handleScrollTopRequest = scrollTop => {
      let scrollerEl = this.scrollerElRef.current;

      if (scrollerEl) {
        // TODO: not sure how this could ever be null. weirdness with the reducer
        scrollerEl.scrollTop = scrollTop;
      }
    };
    /* Header Render Methods
    ------------------------------------------------------------------------------------------------------------------*/


    this.renderHeadAxis = (rowKey, frameHeight = '') => {
      let {
        options
      } = this.context;
      let {
        dateProfile
      } = this.props;
      let range = dateProfile.renderRange;
      let dayCnt = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.diffDays)(range.start, range.end);
      let navLinkAttrs = dayCnt === 1 // only do in day views (to avoid doing in week views that dont need it)
      ? (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildNavLinkAttrs)(this.context, range.start, 'week') : {};

      if (options.weekNumbers && rowKey === 'day') {
        return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.WeekNumberRoot, {
          date: range.start,
          defaultFormat: DEFAULT_WEEK_NUM_FORMAT
        }, (rootElRef, classNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
          ref: rootElRef,
          "aria-hidden": true,
          className: ['fc-timegrid-axis', 'fc-scrollgrid-shrink'].concat(classNames).join(' ')
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "fc-timegrid-axis-frame fc-scrollgrid-shrink-frame fc-timegrid-axis-frame-liquid",
          style: {
            height: frameHeight
          }
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", Object.assign({
          ref: innerElRef,
          className: "fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner"
        }, navLinkAttrs), innerContent))));
      }

      return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
        "aria-hidden": true,
        className: "fc-timegrid-axis"
      }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "fc-timegrid-axis-frame",
        style: {
          height: frameHeight
        }
      }));
    };
    /* Table Component Render Methods
    ------------------------------------------------------------------------------------------------------------------*/
    // only a one-way height sync. we don't send the axis inner-content height to the DayGrid,
    // but DayGrid still needs to have classNames on inner elements in order to measure.


    this.renderTableRowAxis = rowHeight => {
      let {
        options,
        viewApi
      } = this.context;
      let hookProps = {
        text: options.allDayText,
        view: viewApi
      };
      return (// TODO: make reusable hook. used in list view too
        (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RenderHook, {
          hookProps: hookProps,
          classNames: options.allDayClassNames,
          content: options.allDayContent,
          defaultContent: renderAllDayInner,
          didMount: options.allDayDidMount,
          willUnmount: options.allDayWillUnmount
        }, (rootElRef, classNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
          ref: rootElRef,
          "aria-hidden": true,
          className: ['fc-timegrid-axis', 'fc-scrollgrid-shrink'].concat(classNames).join(' ')
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: 'fc-timegrid-axis-frame fc-scrollgrid-shrink-frame' + (rowHeight == null ? ' fc-timegrid-axis-frame-liquid' : ''),
          style: {
            height: rowHeight
          }
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner",
          ref: innerElRef
        }, innerContent))))
      );
    };

    this.handleSlatCoords = slatCoords => {
      this.setState({
        slatCoords
      });
    };
  } // rendering
  // ----------------------------------------------------------------------------------------------------


  renderSimpleLayout(headerRowContent, allDayContent, timeContent) {
    let {
      context,
      props
    } = this;
    let sections = [];
    let stickyHeaderDates = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getStickyHeaderDates)(context.options);

    if (headerRowContent) {
      sections.push({
        type: 'header',
        key: 'header',
        isSticky: stickyHeaderDates,
        chunk: {
          elRef: this.headerElRef,
          tableClassName: 'fc-col-header',
          rowContent: headerRowContent
        }
      });
    }

    if (allDayContent) {
      sections.push({
        type: 'body',
        key: 'all-day',
        chunk: {
          content: allDayContent
        }
      });
      sections.push({
        type: 'body',
        key: 'all-day-divider',
        outerContent: // TODO: rename to cellContent so don't need to define <tr>?
        (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
          role: "presentation",
          className: "fc-scrollgrid-section"
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
          className: 'fc-timegrid-divider ' + context.theme.getClass('tableCellShaded')
        }))
      });
    }

    sections.push({
      type: 'body',
      key: 'body',
      liquid: true,
      expandRows: Boolean(context.options.expandRows),
      chunk: {
        scrollerElRef: this.scrollerElRef,
        content: timeContent
      }
    });
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.ViewRoot, {
      viewSpec: context.viewSpec,
      elRef: this.rootElRef
    }, (rootElRef, classNames) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: ['fc-timegrid'].concat(classNames).join(' '),
      ref: rootElRef
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.SimpleScrollGrid, {
      liquid: !props.isHeightAuto && !props.forPrint,
      collapsibleWidth: props.forPrint,
      cols: [{
        width: 'shrink'
      }],
      sections: sections
    })));
  }

  renderHScrollLayout(headerRowContent, allDayContent, timeContent, colCnt, dayMinWidth, slatMetas, slatCoords) {
    let ScrollGrid = this.context.pluginHooks.scrollGridImpl;

    if (!ScrollGrid) {
      throw new Error('No ScrollGrid implementation');
    }

    let {
      context,
      props
    } = this;
    let stickyHeaderDates = !props.forPrint && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getStickyHeaderDates)(context.options);
    let stickyFooterScrollbar = !props.forPrint && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getStickyFooterScrollbar)(context.options);
    let sections = [];

    if (headerRowContent) {
      sections.push({
        type: 'header',
        key: 'header',
        isSticky: stickyHeaderDates,
        syncRowHeights: true,
        chunks: [{
          key: 'axis',
          rowContent: arg => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
            role: "presentation"
          }, this.renderHeadAxis('day', arg.rowSyncHeights[0]))
        }, {
          key: 'cols',
          elRef: this.headerElRef,
          tableClassName: 'fc-col-header',
          rowContent: headerRowContent
        }]
      });
    }

    if (allDayContent) {
      sections.push({
        type: 'body',
        key: 'all-day',
        syncRowHeights: true,
        chunks: [{
          key: 'axis',
          rowContent: contentArg => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
            role: "presentation"
          }, this.renderTableRowAxis(contentArg.rowSyncHeights[0]))
        }, {
          key: 'cols',
          content: allDayContent
        }]
      });
      sections.push({
        key: 'all-day-divider',
        type: 'body',
        outerContent: // TODO: rename to cellContent so don't need to define <tr>?
        (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
          role: "presentation",
          className: "fc-scrollgrid-section"
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
          colSpan: 2,
          className: 'fc-timegrid-divider ' + context.theme.getClass('tableCellShaded')
        }))
      });
    }

    let isNowIndicator = context.options.nowIndicator;
    sections.push({
      type: 'body',
      key: 'body',
      liquid: true,
      expandRows: Boolean(context.options.expandRows),
      chunks: [{
        key: 'axis',
        content: arg => // TODO: make this now-indicator arrow more DRY with TimeColsContent
        (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "fc-timegrid-axis-chunk"
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
          "aria-hidden": true,
          style: {
            height: arg.expandRows ? arg.clientHeight : ''
          }
        }, arg.tableColGroupNode, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeBodyAxis, {
          slatMetas: slatMetas
        }))), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "fc-timegrid-now-indicator-container"
        }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.NowTimer, {
          unit: isNowIndicator ? 'minute' : 'day'
          /* hacky */

        }, nowDate => {
          let nowIndicatorTop = isNowIndicator && slatCoords && slatCoords.safeComputeTop(nowDate); // might return void

          if (typeof nowIndicatorTop === 'number') {
            return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.NowIndicatorRoot, {
              isAxis: true,
              date: nowDate
            }, (rootElRef, classNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
              ref: rootElRef,
              className: ['fc-timegrid-now-indicator-arrow'].concat(classNames).join(' '),
              style: {
                top: nowIndicatorTop
              }
            }, innerContent));
          }

          return null;
        })))
      }, {
        key: 'cols',
        scrollerElRef: this.scrollerElRef,
        content: timeContent
      }]
    });

    if (stickyFooterScrollbar) {
      sections.push({
        key: 'footer',
        type: 'footer',
        isSticky: true,
        chunks: [{
          key: 'axis',
          content: _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.renderScrollShim
        }, {
          key: 'cols',
          content: _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.renderScrollShim
        }]
      });
    }

    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.ViewRoot, {
      viewSpec: context.viewSpec,
      elRef: this.rootElRef
    }, (rootElRef, classNames) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: ['fc-timegrid'].concat(classNames).join(' '),
      ref: rootElRef
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(ScrollGrid, {
      liquid: !props.isHeightAuto && !props.forPrint,
      collapsibleWidth: false,
      colGroups: [{
        width: 'shrink',
        cols: [{
          width: 'shrink'
        }]
      }, {
        cols: [{
          span: colCnt,
          minWidth: dayMinWidth
        }]
      }],
      sections: sections
    })));
  }
  /* Dimensions
  ------------------------------------------------------------------------------------------------------------------*/


  getAllDayMaxEventProps() {
    let {
      dayMaxEvents,
      dayMaxEventRows
    } = this.context.options;

    if (dayMaxEvents === true || dayMaxEventRows === true) {
      // is auto?
      dayMaxEvents = undefined;
      dayMaxEventRows = AUTO_ALL_DAY_MAX_EVENT_ROWS; // make sure "auto" goes to a real number
    }

    return {
      dayMaxEvents,
      dayMaxEventRows
    };
  }

}

function renderAllDayInner(hookProps) {
  return hookProps.text;
}

class TimeColsSlatsCoords {
  constructor(positions, dateProfile, slotDuration) {
    this.positions = positions;
    this.dateProfile = dateProfile;
    this.slotDuration = slotDuration;
  }

  safeComputeTop(date) {
    let {
      dateProfile
    } = this;

    if ((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.rangeContainsMarker)(dateProfile.currentRange, date)) {
      let startOfDayDate = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(date);
      let timeMs = date.valueOf() - startOfDayDate.valueOf();

      if (timeMs >= (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.asRoughMs)(dateProfile.slotMinTime) && timeMs < (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.asRoughMs)(dateProfile.slotMaxTime)) {
        return this.computeTimeTop((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createDuration)(timeMs));
      }
    }

    return null;
  } // Computes the top coordinate, relative to the bounds of the grid, of the given date.
  // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.


  computeDateTop(when, startOfDayDate) {
    if (!startOfDayDate) {
      startOfDayDate = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(when);
    }

    return this.computeTimeTop((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createDuration)(when.valueOf() - startOfDayDate.valueOf()));
  } // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
  // This is a makeshify way to compute the time-top. Assumes all slatMetas dates are uniform.
  // Eventually allow computation with arbirary slat dates.


  computeTimeTop(duration) {
    let {
      positions,
      dateProfile
    } = this;
    let len = positions.els.length; // floating-point value of # of slots covered

    let slatCoverage = (duration.milliseconds - (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.asRoughMs)(dateProfile.slotMinTime)) / (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.asRoughMs)(this.slotDuration);
    let slatIndex;
    let slatRemainder; // compute a floating-point number for how many slats should be progressed through.
    // from 0 to number of slats (inclusive)
    // constrained because slotMinTime/slotMaxTime might be customized.

    slatCoverage = Math.max(0, slatCoverage);
    slatCoverage = Math.min(len, slatCoverage); // an integer index of the furthest whole slat
    // from 0 to number slats (*exclusive*, so len-1)

    slatIndex = Math.floor(slatCoverage);
    slatIndex = Math.min(slatIndex, len - 1); // how much further through the slatIndex slat (from 0.0-1.0) must be covered in addition.
    // could be 1.0 if slatCoverage is covering *all* the slots

    slatRemainder = slatCoverage - slatIndex;
    return positions.tops[slatIndex] + positions.getHeight(slatIndex) * slatRemainder;
  }

}

class TimeColsSlatsBody extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  render() {
    let {
      props,
      context
    } = this;
    let {
      options
    } = context;
    let {
      slatElRefs
    } = props;
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, props.slatMetas.map((slatMeta, i) => {
      let hookProps = {
        time: slatMeta.time,
        date: context.dateEnv.toDate(slatMeta.date),
        view: context.viewApi
      };
      let classNames = ['fc-timegrid-slot', 'fc-timegrid-slot-lane', slatMeta.isLabeled ? '' : 'fc-timegrid-slot-minor'];
      return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
        key: slatMeta.key,
        ref: slatElRefs.createRef(slatMeta.key)
      }, props.axis && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeColsAxisCell, Object.assign({}, slatMeta)), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RenderHook, {
        hookProps: hookProps,
        classNames: options.slotLaneClassNames,
        content: options.slotLaneContent,
        didMount: options.slotLaneDidMount,
        willUnmount: options.slotLaneWillUnmount
      }, (rootElRef, customClassNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
        ref: rootElRef,
        className: classNames.concat(customClassNames).join(' '),
        "data-time": slatMeta.isoTimeStr
      }, innerContent)));
    }));
  }

}
/*
for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
*/


class TimeColsSlats extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor() {
    super(...arguments);
    this.rootElRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.slatElRefs = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RefMap();
  }

  render() {
    let {
      props,
      context
    } = this;
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: this.rootElRef,
      className: "fc-timegrid-slots"
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      "aria-hidden": true,
      className: context.theme.getClass('table'),
      style: {
        minWidth: props.tableMinWidth,
        width: props.clientWidth,
        height: props.minHeight
      }
    }, props.tableColGroupNode
    /* relies on there only being a single <col> for the axis */
    , (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeColsSlatsBody, {
      slatElRefs: this.slatElRefs,
      axis: props.axis,
      slatMetas: props.slatMetas
    })));
  }

  componentDidMount() {
    this.updateSizing();
  }

  componentDidUpdate() {
    this.updateSizing();
  }

  componentWillUnmount() {
    if (this.props.onCoords) {
      this.props.onCoords(null);
    }
  }

  updateSizing() {
    let {
      context,
      props
    } = this;

    if (props.onCoords && props.clientWidth !== null // means sizing has stabilized
    ) {
      let rootEl = this.rootElRef.current;

      if (rootEl.offsetHeight) {
        // not hidden by css
        props.onCoords(new TimeColsSlatsCoords(new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.PositionCache(this.rootElRef.current, collectSlatEls(this.slatElRefs.currentMap, props.slatMetas), false, true), this.props.dateProfile, context.options.slotDuration));
      }
    }
  }

}

function collectSlatEls(elMap, slatMetas) {
  return slatMetas.map(slatMeta => elMap[slatMeta.key]);
}

function splitSegsByCol(segs, colCnt) {
  let segsByCol = [];
  let i;

  for (i = 0; i < colCnt; i += 1) {
    segsByCol.push([]);
  }

  if (segs) {
    for (i = 0; i < segs.length; i += 1) {
      segsByCol[segs[i].col].push(segs[i]);
    }
  }

  return segsByCol;
}

function splitInteractionByCol(ui, colCnt) {
  let byRow = [];

  if (!ui) {
    for (let i = 0; i < colCnt; i += 1) {
      byRow[i] = null;
    }
  } else {
    for (let i = 0; i < colCnt; i += 1) {
      byRow[i] = {
        affectedInstances: ui.affectedInstances,
        isEvent: ui.isEvent,
        segs: []
      };
    }

    for (let seg of ui.segs) {
      byRow[seg.col].segs.push(seg);
    }
  }

  return byRow;
}

class TimeColMoreLink extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor() {
    super(...arguments);
    this.rootElRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  }

  render() {
    let {
      props
    } = this;
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.MoreLinkRoot, {
      allDayDate: null,
      moreCnt: props.hiddenSegs.length,
      allSegs: props.hiddenSegs,
      hiddenSegs: props.hiddenSegs,
      alignmentElRef: this.rootElRef,
      defaultContent: renderMoreLinkInner,
      extraDateSpan: props.extraDateSpan,
      dateProfile: props.dateProfile,
      todayRange: props.todayRange,
      popoverContent: () => renderPlainFgSegs(props.hiddenSegs, props)
    }, (rootElRef, classNames, innerElRef, innerContent, handleClick, title, isExpanded, popoverId) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      ref: el => {
        (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.setRef)(rootElRef, el);
        (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.setRef)(this.rootElRef, el);
      },
      className: ['fc-timegrid-more-link'].concat(classNames).join(' '),
      style: {
        top: props.top,
        bottom: props.bottom
      },
      onClick: handleClick,
      title: title,
      "aria-expanded": isExpanded,
      "aria-controls": popoverId
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: innerElRef,
      className: "fc-timegrid-more-link-inner fc-sticky"
    }, innerContent)));
  }

}

function renderMoreLinkInner(props) {
  return props.shortText;
} // segInputs assumed sorted


function buildPositioning(segInputs, strictOrder, maxStackCnt) {
  let hierarchy = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.SegHierarchy();

  if (strictOrder != null) {
    hierarchy.strictOrder = strictOrder;
  }

  if (maxStackCnt != null) {
    hierarchy.maxStackCnt = maxStackCnt;
  }

  let hiddenEntries = hierarchy.addSegs(segInputs);
  let hiddenGroups = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.groupIntersectingEntries)(hiddenEntries);
  let web = buildWeb(hierarchy);
  web = stretchWeb(web, 1); // all levelCoords/thickness will have 0.0-1.0

  let segRects = webToRects(web);
  return {
    segRects,
    hiddenGroups
  };
}

function buildWeb(hierarchy) {
  const {
    entriesByLevel
  } = hierarchy;
  const buildNode = cacheable((level, lateral) => level + ':' + lateral, (level, lateral) => {
    let siblingRange = findNextLevelSegs(hierarchy, level, lateral);
    let nextLevelRes = buildNodes(siblingRange, buildNode);
    let entry = entriesByLevel[level][lateral];
    return [Object.assign(Object.assign({}, entry), {
      nextLevelNodes: nextLevelRes[0]
    }), entry.thickness + nextLevelRes[1] // the pressure builds
    ];
  });
  return buildNodes(entriesByLevel.length ? {
    level: 0,
    lateralStart: 0,
    lateralEnd: entriesByLevel[0].length
  } : null, buildNode)[0];
}

function buildNodes(siblingRange, buildNode) {
  if (!siblingRange) {
    return [[], 0];
  }

  let {
    level,
    lateralStart,
    lateralEnd
  } = siblingRange;
  let lateral = lateralStart;
  let pairs = [];

  while (lateral < lateralEnd) {
    pairs.push(buildNode(level, lateral));
    lateral += 1;
  }

  pairs.sort(cmpDescPressures);
  return [pairs.map(extractNode), pairs[0][1] // first item's pressure
  ];
}

function cmpDescPressures(a, b) {
  return b[1] - a[1];
}

function extractNode(a) {
  return a[0];
}

function findNextLevelSegs(hierarchy, subjectLevel, subjectLateral) {
  let {
    levelCoords,
    entriesByLevel
  } = hierarchy;
  let subjectEntry = entriesByLevel[subjectLevel][subjectLateral];
  let afterSubject = levelCoords[subjectLevel] + subjectEntry.thickness;
  let levelCnt = levelCoords.length;
  let level = subjectLevel; // skip past levels that are too high up

  for (; level < levelCnt && levelCoords[level] < afterSubject; level += 1); // do nothing


  for (; level < levelCnt; level += 1) {
    let entries = entriesByLevel[level];
    let entry;
    let searchIndex = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.binarySearch)(entries, subjectEntry.span.start, _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getEntrySpanEnd);
    let lateralStart = searchIndex[0] + searchIndex[1]; // if exact match (which doesn't collide), go to next one

    let lateralEnd = lateralStart;

    while ( // loop through entries that horizontally intersect
    (entry = entries[lateralEnd]) && // but not past the whole seg list
    entry.span.start < subjectEntry.span.end) {
      lateralEnd += 1;
    }

    if (lateralStart < lateralEnd) {
      return {
        level,
        lateralStart,
        lateralEnd
      };
    }
  }

  return null;
}

function stretchWeb(topLevelNodes, totalThickness) {
  const stretchNode = cacheable((node, startCoord, prevThickness) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildEntryKey)(node), (node, startCoord, prevThickness) => {
    let {
      nextLevelNodes,
      thickness
    } = node;
    let allThickness = thickness + prevThickness;
    let thicknessFraction = thickness / allThickness;
    let endCoord;
    let newChildren = [];

    if (!nextLevelNodes.length) {
      endCoord = totalThickness;
    } else {
      for (let childNode of nextLevelNodes) {
        if (endCoord === undefined) {
          let res = stretchNode(childNode, startCoord, allThickness);
          endCoord = res[0];
          newChildren.push(res[1]);
        } else {
          let res = stretchNode(childNode, endCoord, 0);
          newChildren.push(res[1]);
        }
      }
    }

    let newThickness = (endCoord - startCoord) * thicknessFraction;
    return [endCoord - newThickness, Object.assign(Object.assign({}, node), {
      thickness: newThickness,
      nextLevelNodes: newChildren
    })];
  });
  return topLevelNodes.map(node => stretchNode(node, 0, 0)[1]);
} // not sorted in any particular order


function webToRects(topLevelNodes) {
  let rects = [];
  const processNode = cacheable((node, levelCoord, stackDepth) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildEntryKey)(node), (node, levelCoord, stackDepth) => {
    let rect = Object.assign(Object.assign({}, node), {
      levelCoord,
      stackDepth,
      stackForward: 0
    });
    rects.push(rect);
    return rect.stackForward = processNodes(node.nextLevelNodes, levelCoord + node.thickness, stackDepth + 1) + 1;
  });

  function processNodes(nodes, levelCoord, stackDepth) {
    let stackForward = 0;

    for (let node of nodes) {
      stackForward = Math.max(processNode(node, levelCoord, stackDepth), stackForward);
    }

    return stackForward;
  }

  processNodes(topLevelNodes, 0, 0);
  return rects; // TODO: sort rects by levelCoord to be consistent with toRects?
} // TODO: move to general util


function cacheable(keyFunc, workFunc) {
  const cache = {};
  return (...args) => {
    let key = keyFunc(...args);
    return key in cache ? cache[key] : cache[key] = workFunc(...args);
  };
}

function computeSegVCoords(segs, colDate, slatCoords = null, eventMinHeight = 0) {
  let vcoords = [];

  if (slatCoords) {
    for (let i = 0; i < segs.length; i += 1) {
      let seg = segs[i];
      let spanStart = slatCoords.computeDateTop(seg.start, colDate);
      let spanEnd = Math.max(spanStart + (eventMinHeight || 0), // :(
      slatCoords.computeDateTop(seg.end, colDate));
      vcoords.push({
        start: Math.round(spanStart),
        end: Math.round(spanEnd) //

      });
    }
  }

  return vcoords;
}

function computeFgSegPlacements(segs, segVCoords, // might not have for every seg
eventOrderStrict, eventMaxStack) {
  let segInputs = [];
  let dumbSegs = []; // segs without coords

  for (let i = 0; i < segs.length; i += 1) {
    let vcoords = segVCoords[i];

    if (vcoords) {
      segInputs.push({
        index: i,
        thickness: 1,
        span: vcoords
      });
    } else {
      dumbSegs.push(segs[i]);
    }
  }

  let {
    segRects,
    hiddenGroups
  } = buildPositioning(segInputs, eventOrderStrict, eventMaxStack);
  let segPlacements = [];

  for (let segRect of segRects) {
    segPlacements.push({
      seg: segs[segRect.index],
      rect: segRect
    });
  }

  for (let dumbSeg of dumbSegs) {
    segPlacements.push({
      seg: dumbSeg,
      rect: null
    });
  }

  return {
    segPlacements,
    hiddenGroups
  };
}

const DEFAULT_TIME_FORMAT = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createFormatter)({
  hour: 'numeric',
  minute: '2-digit',
  meridiem: false
});

class TimeColEvent extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  render() {
    let classNames = ['fc-timegrid-event', 'fc-v-event'];

    if (this.props.isShort) {
      classNames.push('fc-timegrid-event-short');
    }

    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.StandardEvent, Object.assign({}, this.props, {
      defaultTimeFormat: DEFAULT_TIME_FORMAT,
      extraClassNames: classNames
    }));
  }

}

class TimeColMisc extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  render() {
    let {
      props
    } = this;
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DayCellContent, {
      date: props.date,
      dateProfile: props.dateProfile,
      todayRange: props.todayRange,
      extraHookProps: props.extraHookProps
    }, (innerElRef, innerContent) => innerContent && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-col-misc",
      ref: innerElRef
    }, innerContent));
  }

}

class TimeCol extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor() {
    super(...arguments);
    this.sortEventSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.sortEventSegs);
  } // TODO: memoize event-placement?


  render() {
    let {
      props,
      context
    } = this;
    let isSelectMirror = context.options.selectMirror;
    let mirrorSegs = props.eventDrag && props.eventDrag.segs || props.eventResize && props.eventResize.segs || isSelectMirror && props.dateSelectionSegs || [];
    let interactionAffectedInstances = // TODO: messy way to compute this
    props.eventDrag && props.eventDrag.affectedInstances || props.eventResize && props.eventResize.affectedInstances || {};
    let sortedFgSegs = this.sortEventSegs(props.fgEventSegs, context.options.eventOrder);
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DayCellRoot, {
      elRef: props.elRef,
      date: props.date,
      dateProfile: props.dateProfile,
      todayRange: props.todayRange,
      extraHookProps: props.extraHookProps
    }, (rootElRef, classNames, dataAttrs) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", Object.assign({
      ref: rootElRef,
      role: "gridcell",
      className: ['fc-timegrid-col'].concat(classNames, props.extraClassNames || []).join(' ')
    }, dataAttrs, props.extraDataAttrs), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-col-frame"
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-col-bg"
    }, this.renderFillSegs(props.businessHourSegs, 'non-business'), this.renderFillSegs(props.bgEventSegs, 'bg-event'), this.renderFillSegs(props.dateSelectionSegs, 'highlight')), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-col-events"
    }, this.renderFgSegs(sortedFgSegs, interactionAffectedInstances, false, false, false)), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-col-events"
    }, this.renderFgSegs(mirrorSegs, {}, Boolean(props.eventDrag), Boolean(props.eventResize), Boolean(isSelectMirror))), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-now-indicator-container"
    }, this.renderNowIndicator(props.nowIndicatorSegs)), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeColMisc, {
      date: props.date,
      dateProfile: props.dateProfile,
      todayRange: props.todayRange,
      extraHookProps: props.extraHookProps
    }))));
  }

  renderFgSegs(sortedFgSegs, segIsInvisible, isDragging, isResizing, isDateSelecting) {
    let {
      props
    } = this;

    if (props.forPrint) {
      return renderPlainFgSegs(sortedFgSegs, props);
    }

    return this.renderPositionedFgSegs(sortedFgSegs, segIsInvisible, isDragging, isResizing, isDateSelecting);
  }

  renderPositionedFgSegs(segs, // if not mirror, needs to be sorted
  segIsInvisible, isDragging, isResizing, isDateSelecting) {
    let {
      eventMaxStack,
      eventShortHeight,
      eventOrderStrict,
      eventMinHeight
    } = this.context.options;
    let {
      date,
      slatCoords,
      eventSelection,
      todayRange,
      nowDate
    } = this.props;
    let isMirror = isDragging || isResizing || isDateSelecting;
    let segVCoords = computeSegVCoords(segs, date, slatCoords, eventMinHeight);
    let {
      segPlacements,
      hiddenGroups
    } = computeFgSegPlacements(segs, segVCoords, eventOrderStrict, eventMaxStack);
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, this.renderHiddenGroups(hiddenGroups, segs), segPlacements.map(segPlacement => {
      let {
        seg,
        rect
      } = segPlacement;
      let instanceId = seg.eventRange.instance.instanceId;
      let isVisible = isMirror || Boolean(!segIsInvisible[instanceId] && rect);
      let vStyle = computeSegVStyle(rect && rect.span);
      let hStyle = !isMirror && rect ? this.computeSegHStyle(rect) : {
        left: 0,
        right: 0
      };
      let isInset = Boolean(rect) && rect.stackForward > 0;
      let isShort = Boolean(rect) && rect.span.end - rect.span.start < eventShortHeight; // look at other places for this problem

      return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: 'fc-timegrid-event-harness' + (isInset ? ' fc-timegrid-event-harness-inset' : ''),
        key: instanceId,
        style: Object.assign(Object.assign({
          visibility: isVisible ? '' : 'hidden'
        }, vStyle), hStyle)
      }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeColEvent, Object.assign({
        seg: seg,
        isDragging: isDragging,
        isResizing: isResizing,
        isDateSelecting: isDateSelecting,
        isSelected: instanceId === eventSelection,
        isShort: isShort
      }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegMeta)(seg, todayRange, nowDate))));
    }));
  } // will already have eventMinHeight applied because segInputs already had it


  renderHiddenGroups(hiddenGroups, segs) {
    let {
      extraDateSpan,
      dateProfile,
      todayRange,
      nowDate,
      eventSelection,
      eventDrag,
      eventResize
    } = this.props;
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, hiddenGroups.map(hiddenGroup => {
      let positionCss = computeSegVStyle(hiddenGroup.span);
      let hiddenSegs = compileSegsFromEntries(hiddenGroup.entries, segs);
      return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeColMoreLink, {
        key: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildIsoString)((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.computeEarliestSegStart)(hiddenSegs)),
        hiddenSegs: hiddenSegs,
        top: positionCss.top,
        bottom: positionCss.bottom,
        extraDateSpan: extraDateSpan,
        dateProfile: dateProfile,
        todayRange: todayRange,
        nowDate: nowDate,
        eventSelection: eventSelection,
        eventDrag: eventDrag,
        eventResize: eventResize
      });
    }));
  }

  renderFillSegs(segs, fillType) {
    let {
      props,
      context
    } = this;
    let segVCoords = computeSegVCoords(segs, props.date, props.slatCoords, context.options.eventMinHeight); // don't assume all populated

    let children = segVCoords.map((vcoords, i) => {
      let seg = segs[i];
      return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.buildEventRangeKey)(seg.eventRange),
        className: "fc-timegrid-bg-harness",
        style: computeSegVStyle(vcoords)
      }, fillType === 'bg-event' ? (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BgEvent, Object.assign({
        seg: seg
      }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegMeta)(seg, props.todayRange, props.nowDate))) : (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.renderFill)(fillType));
    });
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, children);
  }

  renderNowIndicator(segs) {
    let {
      slatCoords,
      date
    } = this.props;

    if (!slatCoords) {
      return null;
    }

    return segs.map((seg, i) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.NowIndicatorRoot, {
      isAxis: false,
      date: date,
      // key doesn't matter. will only ever be one
      key: i
    }, (rootElRef, classNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: rootElRef,
      className: ['fc-timegrid-now-indicator-line'].concat(classNames).join(' '),
      style: {
        top: slatCoords.computeDateTop(seg.start, date)
      }
    }, innerContent)));
  }

  computeSegHStyle(segHCoords) {
    let {
      isRtl,
      options
    } = this.context;
    let shouldOverlap = options.slotEventOverlap;
    let nearCoord = segHCoords.levelCoord; // the left side if LTR. the right side if RTL. floating-point

    let farCoord = segHCoords.levelCoord + segHCoords.thickness; // the right side if LTR. the left side if RTL. floating-point

    let left; // amount of space from left edge, a fraction of the total width

    let right; // amount of space from right edge, a fraction of the total width

    if (shouldOverlap) {
      // double the width, but don't go beyond the maximum forward coordinate (1.0)
      farCoord = Math.min(1, nearCoord + (farCoord - nearCoord) * 2);
    }

    if (isRtl) {
      left = 1 - farCoord;
      right = nearCoord;
    } else {
      left = nearCoord;
      right = 1 - farCoord;
    }

    let props = {
      zIndex: segHCoords.stackDepth + 1,
      left: left * 100 + '%',
      right: right * 100 + '%'
    };

    if (shouldOverlap && !segHCoords.stackForward) {
      // add padding to the edge so that forward stacked events don't cover the resizer's icon
      props[isRtl ? 'marginLeft' : 'marginRight'] = 10 * 2; // 10 is a guesstimate of the icon's width
    }

    return props;
  }

}

function renderPlainFgSegs(sortedFgSegs, {
  todayRange,
  nowDate,
  eventSelection,
  eventDrag,
  eventResize
}) {
  let hiddenInstances = (eventDrag ? eventDrag.affectedInstances : null) || (eventResize ? eventResize.affectedInstances : null) || {};
  return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, sortedFgSegs.map(seg => {
    let instanceId = seg.eventRange.instance.instanceId;
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: instanceId,
      style: {
        visibility: hiddenInstances[instanceId] ? 'hidden' : ''
      }
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeColEvent, Object.assign({
      seg: seg,
      isDragging: false,
      isResizing: false,
      isDateSelecting: false,
      isSelected: instanceId === eventSelection,
      isShort: false
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.getSegMeta)(seg, todayRange, nowDate))));
  }));
}

function computeSegVStyle(segVCoords) {
  if (!segVCoords) {
    return {
      top: '',
      bottom: ''
    };
  }

  return {
    top: segVCoords.start,
    bottom: -segVCoords.end
  };
}

function compileSegsFromEntries(segEntries, allSegs) {
  return segEntries.map(segEntry => allSegs[segEntry.index]);
}

class TimeColsContent extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor() {
    super(...arguments);
    this.splitFgEventSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitSegsByCol);
    this.splitBgEventSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitSegsByCol);
    this.splitBusinessHourSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitSegsByCol);
    this.splitNowIndicatorSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitSegsByCol);
    this.splitDateSelectionSegs = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitSegsByCol);
    this.splitEventDrag = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitInteractionByCol);
    this.splitEventResize = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(splitInteractionByCol);
    this.rootElRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.cellElRefs = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.RefMap();
  }

  render() {
    let {
      props,
      context
    } = this;
    let nowIndicatorTop = context.options.nowIndicator && props.slatCoords && props.slatCoords.safeComputeTop(props.nowDate); // might return void

    let colCnt = props.cells.length;
    let fgEventSegsByRow = this.splitFgEventSegs(props.fgEventSegs, colCnt);
    let bgEventSegsByRow = this.splitBgEventSegs(props.bgEventSegs, colCnt);
    let businessHourSegsByRow = this.splitBusinessHourSegs(props.businessHourSegs, colCnt);
    let nowIndicatorSegsByRow = this.splitNowIndicatorSegs(props.nowIndicatorSegs, colCnt);
    let dateSelectionSegsByRow = this.splitDateSelectionSegs(props.dateSelectionSegs, colCnt);
    let eventDragByRow = this.splitEventDrag(props.eventDrag, colCnt);
    let eventResizeByRow = this.splitEventResize(props.eventResize, colCnt);
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-cols",
      ref: this.rootElRef
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      role: "presentation",
      style: {
        minWidth: props.tableMinWidth,
        width: props.clientWidth
      }
    }, props.tableColGroupNode, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", {
      role: "presentation"
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      role: "row"
    }, props.axis && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      "aria-hidden": true,
      className: "fc-timegrid-col fc-timegrid-axis"
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-col-frame"
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-now-indicator-container"
    }, typeof nowIndicatorTop === 'number' && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.NowIndicatorRoot, {
      isAxis: true,
      date: props.nowDate
    }, (rootElRef, classNames, innerElRef, innerContent) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: rootElRef,
      className: ['fc-timegrid-now-indicator-arrow'].concat(classNames).join(' '),
      style: {
        top: nowIndicatorTop
      }
    }, innerContent))))), props.cells.map((cell, i) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeCol, {
      key: cell.key,
      elRef: this.cellElRefs.createRef(cell.key),
      dateProfile: props.dateProfile,
      date: cell.date,
      nowDate: props.nowDate,
      todayRange: props.todayRange,
      extraHookProps: cell.extraHookProps,
      extraDataAttrs: cell.extraDataAttrs,
      extraClassNames: cell.extraClassNames,
      extraDateSpan: cell.extraDateSpan,
      fgEventSegs: fgEventSegsByRow[i],
      bgEventSegs: bgEventSegsByRow[i],
      businessHourSegs: businessHourSegsByRow[i],
      nowIndicatorSegs: nowIndicatorSegsByRow[i],
      dateSelectionSegs: dateSelectionSegsByRow[i],
      eventDrag: eventDragByRow[i],
      eventResize: eventResizeByRow[i],
      slatCoords: props.slatCoords,
      eventSelection: props.eventSelection,
      forPrint: props.forPrint
    }))))));
  }

  componentDidMount() {
    this.updateCoords();
  }

  componentDidUpdate() {
    this.updateCoords();
  }

  updateCoords() {
    let {
      props
    } = this;

    if (props.onColCoords && props.clientWidth !== null // means sizing has stabilized
    ) {
      props.onColCoords(new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.PositionCache(this.rootElRef.current, collectCellEls(this.cellElRefs.currentMap, props.cells), true, // horizontal
      false));
    }
  }

}

function collectCellEls(elMap, cells) {
  return cells.map(cell => elMap[cell.key]);
}
/* A component that renders one or more columns of vertical time slots
----------------------------------------------------------------------------------------------------------------------*/


class TimeCols extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DateComponent {
  constructor() {
    super(...arguments);
    this.processSlotOptions = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(processSlotOptions);
    this.state = {
      slatCoords: null
    };

    this.handleRootEl = el => {
      if (el) {
        this.context.registerInteractiveComponent(this, {
          el,
          isHitComboAllowed: this.props.isHitComboAllowed
        });
      } else {
        this.context.unregisterInteractiveComponent(this);
      }
    };

    this.handleScrollRequest = request => {
      let {
        onScrollTopRequest
      } = this.props;
      let {
        slatCoords
      } = this.state;

      if (onScrollTopRequest && slatCoords) {
        if (request.time) {
          let top = slatCoords.computeTimeTop(request.time);
          top = Math.ceil(top); // zoom can give weird floating-point values. rather scroll a little bit further

          if (top) {
            top += 1; // to overcome top border that slots beyond the first have. looks better
          }

          onScrollTopRequest(top);
        }

        return true;
      }

      return false;
    };

    this.handleColCoords = colCoords => {
      this.colCoords = colCoords;
    };

    this.handleSlatCoords = slatCoords => {
      this.setState({
        slatCoords
      });

      if (this.props.onSlatCoords) {
        this.props.onSlatCoords(slatCoords);
      }
    };
  }

  render() {
    let {
      props,
      state
    } = this;
    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-timegrid-body",
      ref: this.handleRootEl,
      style: {
        // these props are important to give this wrapper correct dimensions for interactions
        // TODO: if we set it here, can we avoid giving to inner tables?
        width: props.clientWidth,
        minWidth: props.tableMinWidth
      }
    }, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeColsSlats, {
      axis: props.axis,
      dateProfile: props.dateProfile,
      slatMetas: props.slatMetas,
      clientWidth: props.clientWidth,
      minHeight: props.expandRows ? props.clientHeight : '',
      tableMinWidth: props.tableMinWidth,
      tableColGroupNode: props.axis ? props.tableColGroupNode : null
      /* axis depends on the colgroup's shrinking */
      ,
      onCoords: this.handleSlatCoords
    }), (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeColsContent, {
      cells: props.cells,
      axis: props.axis,
      dateProfile: props.dateProfile,
      businessHourSegs: props.businessHourSegs,
      bgEventSegs: props.bgEventSegs,
      fgEventSegs: props.fgEventSegs,
      dateSelectionSegs: props.dateSelectionSegs,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      todayRange: props.todayRange,
      nowDate: props.nowDate,
      nowIndicatorSegs: props.nowIndicatorSegs,
      clientWidth: props.clientWidth,
      tableMinWidth: props.tableMinWidth,
      tableColGroupNode: props.tableColGroupNode,
      slatCoords: state.slatCoords,
      onColCoords: this.handleColCoords,
      forPrint: props.forPrint
    }));
  }

  componentDidMount() {
    this.scrollResponder = this.context.createScrollResponder(this.handleScrollRequest);
  }

  componentDidUpdate(prevProps) {
    this.scrollResponder.update(prevProps.dateProfile !== this.props.dateProfile);
  }

  componentWillUnmount() {
    this.scrollResponder.detach();
  }

  queryHit(positionLeft, positionTop) {
    let {
      dateEnv,
      options
    } = this.context;
    let {
      colCoords
    } = this;
    let {
      dateProfile
    } = this.props;
    let {
      slatCoords
    } = this.state;
    let {
      snapDuration,
      snapsPerSlot
    } = this.processSlotOptions(this.props.slotDuration, options.snapDuration);
    let colIndex = colCoords.leftToIndex(positionLeft);
    let slatIndex = slatCoords.positions.topToIndex(positionTop);

    if (colIndex != null && slatIndex != null) {
      let cell = this.props.cells[colIndex];
      let slatTop = slatCoords.positions.tops[slatIndex];
      let slatHeight = slatCoords.positions.getHeight(slatIndex);
      let partial = (positionTop - slatTop) / slatHeight; // floating point number between 0 and 1

      let localSnapIndex = Math.floor(partial * snapsPerSlot); // the snap # relative to start of slat

      let snapIndex = slatIndex * snapsPerSlot + localSnapIndex;
      let dayDate = this.props.cells[colIndex].date;
      let time = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.addDurations)(dateProfile.slotMinTime, (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.multiplyDuration)(snapDuration, snapIndex));
      let start = dateEnv.add(dayDate, time);
      let end = dateEnv.add(start, snapDuration);
      return {
        dateProfile,
        dateSpan: Object.assign({
          range: {
            start,
            end
          },
          allDay: false
        }, cell.extraDateSpan),
        dayEl: colCoords.els[colIndex],
        rect: {
          left: colCoords.lefts[colIndex],
          right: colCoords.rights[colIndex],
          top: slatTop,
          bottom: slatTop + slatHeight
        },
        layer: 0
      };
    }

    return null;
  }

}

function processSlotOptions(slotDuration, snapDurationOverride) {
  let snapDuration = snapDurationOverride || slotDuration;
  let snapsPerSlot = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.wholeDivideDurations)(slotDuration, snapDuration);

  if (snapsPerSlot === null) {
    snapDuration = slotDuration;
    snapsPerSlot = 1; // TODO: say warning?
  }

  return {
    snapDuration,
    snapsPerSlot
  };
}

class DayTimeColsSlicer extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.Slicer {
  sliceRange(range, dayRanges) {
    let segs = [];

    for (let col = 0; col < dayRanges.length; col += 1) {
      let segRange = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.intersectRanges)(range, dayRanges[col]);

      if (segRange) {
        segs.push({
          start: segRange.start,
          end: segRange.end,
          isStart: segRange.start.valueOf() === range.start.valueOf(),
          isEnd: segRange.end.valueOf() === range.end.valueOf(),
          col
        });
      }
    }

    return segs;
  }

}

class DayTimeCols extends _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DateComponent {
  constructor() {
    super(...arguments);
    this.buildDayRanges = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(buildDayRanges);
    this.slicer = new DayTimeColsSlicer();
    this.timeColsRef = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  }

  render() {
    let {
      props,
      context
    } = this;
    let {
      dateProfile,
      dayTableModel
    } = props;
    let isNowIndicator = context.options.nowIndicator;
    let dayRanges = this.buildDayRanges(dayTableModel, dateProfile, context.dateEnv); // give it the first row of cells
    // TODO: would move this further down hierarchy, but sliceNowDate needs it

    return (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.NowTimer, {
      unit: isNowIndicator ? 'minute' : 'day'
    }, (nowDate, todayRange) => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimeCols, Object.assign({
      ref: this.timeColsRef
    }, this.slicer.sliceProps(props, dateProfile, null, context, dayRanges), {
      forPrint: props.forPrint,
      axis: props.axis,
      dateProfile: dateProfile,
      slatMetas: props.slatMetas,
      slotDuration: props.slotDuration,
      cells: dayTableModel.cells[0],
      tableColGroupNode: props.tableColGroupNode,
      tableMinWidth: props.tableMinWidth,
      clientWidth: props.clientWidth,
      clientHeight: props.clientHeight,
      expandRows: props.expandRows,
      nowDate: nowDate,
      nowIndicatorSegs: isNowIndicator && this.slicer.sliceNowDate(nowDate, context, dayRanges),
      todayRange: todayRange,
      onScrollTopRequest: props.onScrollTopRequest,
      onSlatCoords: props.onSlatCoords
    })));
  }

}

function buildDayRanges(dayTableModel, dateProfile, dateEnv) {
  let ranges = [];

  for (let date of dayTableModel.headerDates) {
    ranges.push({
      start: dateEnv.add(date, dateProfile.slotMinTime),
      end: dateEnv.add(date, dateProfile.slotMaxTime)
    });
  }

  return ranges;
} // potential nice values for the slot-duration and interval-duration
// from largest to smallest


const STOCK_SUB_DURATIONS = [{
  hours: 1
}, {
  minutes: 30
}, {
  minutes: 15
}, {
  seconds: 30
}, {
  seconds: 15
}];

function buildSlatMetas(slotMinTime, slotMaxTime, explicitLabelInterval, slotDuration, dateEnv) {
  let dayStart = new Date(0);
  let slatTime = slotMinTime;
  let slatIterator = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createDuration)(0);
  let labelInterval = explicitLabelInterval || computeLabelInterval(slotDuration);
  let metas = [];

  while ((0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.asRoughMs)(slatTime) < (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.asRoughMs)(slotMaxTime)) {
    let date = dateEnv.add(dayStart, slatTime);
    let isLabeled = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.wholeDivideDurations)(slatIterator, labelInterval) !== null;
    metas.push({
      date,
      time: slatTime,
      key: date.toISOString(),
      isoTimeStr: (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.formatIsoTimeString)(date),
      isLabeled
    });
    slatTime = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.addDurations)(slatTime, slotDuration);
    slatIterator = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.addDurations)(slatIterator, slotDuration);
  }

  return metas;
} // Computes an automatic value for slotLabelInterval


function computeLabelInterval(slotDuration) {
  let i;
  let labelInterval;
  let slotsPerLabel; // find the smallest stock label interval that results in more than one slots-per-label

  for (i = STOCK_SUB_DURATIONS.length - 1; i >= 0; i -= 1) {
    labelInterval = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createDuration)(STOCK_SUB_DURATIONS[i]);
    slotsPerLabel = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.wholeDivideDurations)(labelInterval, slotDuration);

    if (slotsPerLabel !== null && slotsPerLabel > 1) {
      return labelInterval;
    }
  }

  return slotDuration; // fall back
}

class DayTimeColsView extends TimeColsView {
  constructor() {
    super(...arguments);
    this.buildTimeColsModel = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(buildTimeColsModel);
    this.buildSlatMetas = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.memoize)(buildSlatMetas);
  }

  render() {
    let {
      options,
      dateEnv,
      dateProfileGenerator
    } = this.context;
    let {
      props
    } = this;
    let {
      dateProfile
    } = props;
    let dayTableModel = this.buildTimeColsModel(dateProfile, dateProfileGenerator);
    let splitProps = this.allDaySplitter.splitProps(props);
    let slatMetas = this.buildSlatMetas(dateProfile.slotMinTime, dateProfile.slotMaxTime, options.slotLabelInterval, options.slotDuration, dateEnv);
    let {
      dayMinWidth
    } = options;
    let hasAttachedAxis = !dayMinWidth;
    let hasDetachedAxis = dayMinWidth;
    let headerContent = options.dayHeaders && (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DayHeader, {
      dates: dayTableModel.headerDates,
      dateProfile: dateProfile,
      datesRepDistinctDays: true,
      renderIntro: hasAttachedAxis ? this.renderHeadAxis : null
    });

    let allDayContent = options.allDaySlot !== false && (contentArg => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__.DayTable, Object.assign({}, splitProps.allDay, {
      dateProfile: dateProfile,
      dayTableModel: dayTableModel,
      nextDayThreshold: options.nextDayThreshold,
      tableMinWidth: contentArg.tableMinWidth,
      colGroupNode: contentArg.tableColGroupNode,
      renderRowIntro: hasAttachedAxis ? this.renderTableRowAxis : null,
      showWeekNumbers: false,
      expandRows: false,
      headerAlignElRef: this.headerElRef,
      clientWidth: contentArg.clientWidth,
      clientHeight: contentArg.clientHeight,
      forPrint: props.forPrint
    }, this.getAllDayMaxEventProps())));

    let timeGridContent = contentArg => (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createElement)(DayTimeCols, Object.assign({}, splitProps.timed, {
      dayTableModel: dayTableModel,
      dateProfile: dateProfile,
      axis: hasAttachedAxis,
      slotDuration: options.slotDuration,
      slatMetas: slatMetas,
      forPrint: props.forPrint,
      tableColGroupNode: contentArg.tableColGroupNode,
      tableMinWidth: contentArg.tableMinWidth,
      clientWidth: contentArg.clientWidth,
      clientHeight: contentArg.clientHeight,
      onSlatCoords: this.handleSlatCoords,
      expandRows: contentArg.expandRows,
      onScrollTopRequest: this.handleScrollTopRequest
    }));

    return hasDetachedAxis ? this.renderHScrollLayout(headerContent, allDayContent, timeGridContent, dayTableModel.colCnt, dayMinWidth, slatMetas, this.state.slatCoords) : this.renderSimpleLayout(headerContent, allDayContent, timeGridContent);
  }

}

function buildTimeColsModel(dateProfile, dateProfileGenerator) {
  let daySeries = new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DaySeriesModel(dateProfile.renderRange, dateProfileGenerator);
  return new _fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.DayTableModel(daySeries, false);
}

const OPTION_REFINERS = {
  allDaySlot: Boolean
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n/*\nA VERTICAL event\n*/\n\n.fc-v-event { /* allowed to be top-level */\n  display: block;\n  border: 1px solid #3788d8;\n  border: 1px solid var(--fc-event-border-color, #3788d8);\n  background-color: #3788d8;\n  background-color: var(--fc-event-bg-color, #3788d8)\n\n}\n\n.fc-v-event .fc-event-main {\n    color: #fff;\n    color: var(--fc-event-text-color, #fff);\n    height: 100%;\n  }\n\n.fc-v-event .fc-event-main-frame {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n  }\n\n.fc-v-event .fc-event-time {\n    flex-grow: 0;\n    flex-shrink: 0;\n    max-height: 100%;\n    overflow: hidden;\n  }\n\n.fc-v-event .fc-event-title-container { /* a container for the sticky cushion */\n    flex-grow: 1;\n    flex-shrink: 1;\n    min-height: 0; /* important for allowing to shrink all the way */\n  }\n\n.fc-v-event .fc-event-title { /* will have fc-sticky on it */\n    top: 0;\n    bottom: 0;\n    max-height: 100%; /* clip overflow */\n    overflow: hidden;\n  }\n\n.fc-v-event:not(.fc-event-start) {\n    border-top-width: 0;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n  }\n\n.fc-v-event:not(.fc-event-end) {\n    border-bottom-width: 0;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n\n.fc-v-event.fc-event-selected:before {\n    /* expand hit area */\n    left: -10px;\n    right: -10px;\n  }\n\n.fc-v-event {\n\n  /* resizer (mouse AND touch) */\n\n}\n\n.fc-v-event .fc-event-resizer-start {\n    cursor: n-resize;\n  }\n\n.fc-v-event .fc-event-resizer-end {\n    cursor: s-resize;\n  }\n\n.fc-v-event {\n\n  /* resizer for MOUSE */\n\n}\n\n.fc-v-event:not(.fc-event-selected) .fc-event-resizer {\n      height: 8px;\n      height: var(--fc-event-resizer-thickness, 8px);\n      left: 0;\n      right: 0;\n    }\n\n.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start {\n      top: -4px;\n      top: calc(var(--fc-event-resizer-thickness, 8px) / -2);\n    }\n\n.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end {\n      bottom: -4px;\n      bottom: calc(var(--fc-event-resizer-thickness, 8px) / -2);\n    }\n\n.fc-v-event {\n\n  /* resizer for TOUCH (when event is \"selected\") */\n\n}\n\n.fc-v-event.fc-event-selected .fc-event-resizer {\n      left: 50%;\n      margin-left: -4px;\n      margin-left: calc(var(--fc-event-resizer-dot-total-width, 8px) / -2);\n    }\n\n.fc-v-event.fc-event-selected .fc-event-resizer-start {\n      top: -4px;\n      top: calc(var(--fc-event-resizer-dot-total-width, 8px) / -2);\n    }\n\n.fc-v-event.fc-event-selected .fc-event-resizer-end {\n      bottom: -4px;\n      bottom: calc(var(--fc-event-resizer-dot-total-width, 8px) / -2);\n    }\n.fc .fc-timegrid .fc-daygrid-body { /* the all-day daygrid within the timegrid view */\n    z-index: 2; /* put above the timegrid-body so that more-popover is above everything. TODO: better solution */\n  }\n.fc .fc-timegrid-divider {\n    padding: 0 0 2px; /* browsers get confused when you set height. use padding instead */\n  }\n.fc .fc-timegrid-body {\n    position: relative;\n    z-index: 1; /* scope the z-indexes of slots and cols */\n    min-height: 100%; /* fill height always, even when slat table doesn't grow */\n  }\n.fc .fc-timegrid-axis-chunk { /* for advanced ScrollGrid */\n    position: relative /* offset parent for now-indicator-container */\n\n  }\n.fc .fc-timegrid-axis-chunk > table {\n      position: relative;\n      z-index: 1; /* above the now-indicator-container */\n    }\n.fc .fc-timegrid-slots {\n    position: relative;\n    z-index: 1;\n  }\n.fc .fc-timegrid-slot { /* a <td> */\n    height: 1.5em;\n    border-bottom: 0 /* each cell owns its top border */\n  }\n.fc .fc-timegrid-slot:empty:before {\n      content: '\\00a0'; /* make sure there's at least an empty space to create height for height syncing */\n    }\n.fc .fc-timegrid-slot-minor {\n    border-top-style: dotted;\n  }\n.fc .fc-timegrid-slot-label-cushion {\n    display: inline-block;\n    white-space: nowrap;\n  }\n.fc .fc-timegrid-slot-label {\n    vertical-align: middle; /* vertical align the slots */\n  }\n.fc {\n\n\n  /* slots AND axis cells (top-left corner of view including the \"all-day\" text) */\n\n}\n.fc .fc-timegrid-axis-cushion,\n  .fc .fc-timegrid-slot-label-cushion {\n    padding: 0 4px;\n  }\n.fc {\n\n\n  /* axis cells (top-left corner of view including the \"all-day\" text) */\n  /* vertical align is more complicated, uses flexbox */\n\n}\n.fc .fc-timegrid-axis-frame-liquid {\n    height: 100%; /* will need liquid-hack in FF */\n  }\n.fc .fc-timegrid-axis-frame {\n    overflow: hidden;\n    display: flex;\n    align-items: center; /* vertical align */\n    justify-content: flex-end; /* horizontal align. matches text-align below */\n  }\n.fc .fc-timegrid-axis-cushion {\n    max-width: 60px; /* limits the width of the \"all-day\" text */\n    flex-shrink: 0; /* allows text to expand how it normally would, regardless of constrained width */\n  }\n.fc-direction-ltr .fc-timegrid-slot-label-frame {\n    text-align: right;\n  }\n.fc-direction-rtl .fc-timegrid-slot-label-frame {\n    text-align: left;\n  }\n.fc-liquid-hack .fc-timegrid-axis-frame-liquid {\n  height: auto;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  }\n.fc .fc-timegrid-col.fc-day-today {\n      background-color: rgba(255, 220, 40, 0.15);\n      background-color: var(--fc-today-bg-color, rgba(255, 220, 40, 0.15));\n    }\n.fc .fc-timegrid-col-frame {\n    min-height: 100%; /* liquid-hack is below */\n    position: relative;\n  }\n.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame {\n  height: auto;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n    }\n.fc-media-screen .fc-timegrid-cols {\n    position: absolute; /* no z-index. children will decide and go above slots */\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0\n  }\n.fc-media-screen .fc-timegrid-cols > table {\n      height: 100%;\n    }\n.fc-media-screen .fc-timegrid-col-bg,\n  .fc-media-screen .fc-timegrid-col-events,\n  .fc-media-screen .fc-timegrid-now-indicator-container {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n  }\n.fc {\n\n  /* bg */\n\n}\n.fc .fc-timegrid-col-bg {\n    z-index: 2; /* TODO: kill */\n  }\n.fc .fc-timegrid-col-bg .fc-non-business { z-index: 1 }\n.fc .fc-timegrid-col-bg .fc-bg-event { z-index: 2 }\n.fc .fc-timegrid-col-bg .fc-highlight { z-index: 3 }\n.fc .fc-timegrid-bg-harness {\n    position: absolute; /* top/bottom will be set by JS */\n    left: 0;\n    right: 0;\n  }\n.fc {\n\n  /* fg events */\n  /* (the mirror segs are put into a separate container with same classname, */\n  /* and they must be after the normal seg container to appear at a higher z-index) */\n\n}\n.fc .fc-timegrid-col-events {\n    z-index: 3;\n    /* child event segs have z-indexes that are scoped within this div */\n  }\n.fc {\n\n  /* now indicator */\n\n}\n.fc .fc-timegrid-now-indicator-container {\n    bottom: 0;\n    overflow: hidden; /* don't let overflow of lines/arrows cause unnecessary scrolling */\n    /* z-index is set on the individual elements */\n  }\n.fc-direction-ltr .fc-timegrid-col-events {\n    margin: 0 2.5% 0 2px;\n  }\n.fc-direction-rtl .fc-timegrid-col-events {\n    margin: 0 2px 0 2.5%;\n  }\n.fc-timegrid-event-harness {\n  position: absolute /* top/left/right/bottom will all be set by JS */\n}\n.fc-timegrid-event-harness > .fc-timegrid-event {\n    position: absolute; /* absolute WITHIN the harness */\n    top: 0; /* for when not yet positioned */\n    bottom: 0; /* \" */\n    left: 0;\n    right: 0;\n  }\n.fc-timegrid-event-harness-inset .fc-timegrid-event,\n.fc-timegrid-event.fc-event-mirror,\n.fc-timegrid-more-link {\n  box-shadow: 0px 0px 0px 1px #fff;\n  box-shadow: 0px 0px 0px 1px var(--fc-page-bg-color, #fff);\n}\n.fc-timegrid-event,\n.fc-timegrid-more-link { /* events need to be root */\n  font-size: .85em;\n  font-size: var(--fc-small-font-size, .85em);\n  border-radius: 3px;\n}\n.fc-timegrid-event { /* events need to be root */\n  margin-bottom: 1px /* give some space from bottom */\n}\n.fc-timegrid-event .fc-event-main {\n    padding: 1px 1px 0;\n  }\n.fc-timegrid-event .fc-event-time {\n    white-space: nowrap;\n    font-size: .85em;\n    font-size: var(--fc-small-font-size, .85em);\n    margin-bottom: 1px;\n  }\n.fc-timegrid-event-short .fc-event-main-frame {\n    flex-direction: row;\n    overflow: hidden;\n  }\n.fc-timegrid-event-short .fc-event-time:after {\n    content: '\\00a0-\\00a0'; /* dash surrounded by non-breaking spaces */\n  }\n.fc-timegrid-event-short .fc-event-title {\n    font-size: .85em;\n    font-size: var(--fc-small-font-size, .85em)\n  }\n.fc-timegrid-more-link { /* does NOT inherit from fc-timegrid-event */\n  position: absolute;\n  z-index: 9999; /* hack */\n  color: inherit;\n  color: var(--fc-more-link-text-color, inherit);\n  background: #d0d0d0;\n  background: var(--fc-more-link-bg-color, #d0d0d0);\n  cursor: pointer;\n  margin-bottom: 1px; /* match space below fc-timegrid-event */\n}\n.fc-timegrid-more-link-inner { /* has fc-sticky */\n  padding: 3px 2px;\n  top: 0;\n}\n.fc-direction-ltr .fc-timegrid-more-link {\n    right: 0;\n  }\n.fc-direction-rtl .fc-timegrid-more-link {\n    left: 0;\n  }\n.fc {\n\n  /* line */\n\n}\n.fc .fc-timegrid-now-indicator-line {\n    position: absolute;\n    z-index: 4;\n    left: 0;\n    right: 0;\n    border-style: solid;\n    border-color: red;\n    border-color: var(--fc-now-indicator-color, red);\n    border-width: 1px 0 0;\n  }\n.fc {\n\n  /* arrow */\n\n}\n.fc .fc-timegrid-now-indicator-arrow {\n    position: absolute;\n    z-index: 4;\n    margin-top: -5px; /* vertically center on top coordinate */\n    border-style: solid;\n    border-color: red;\n    border-color: var(--fc-now-indicator-color, red);\n  }\n.fc-direction-ltr .fc-timegrid-now-indicator-arrow {\n    left: 0;\n\n    /* triangle pointing right. TODO: mixin */\n    border-width: 5px 0 5px 6px;\n    border-top-color: transparent;\n    border-bottom-color: transparent;\n  }\n.fc-direction-rtl .fc-timegrid-now-indicator-arrow {\n    right: 0;\n\n    /* triangle pointing left. TODO: mixin */\n    border-width: 5px 6px 5px 0;\n    border-top-color: transparent;\n    border-bottom-color: transparent;\n  }\n";
styleInject(css_248z);
var main = (0,_fullcalendar_common__WEBPACK_IMPORTED_MODULE_0__.createPlugin)({
  initialView: 'timeGridWeek',
  optionRefiners: OPTION_REFINERS,
  views: {
    timeGrid: {
      component: DayTimeColsView,
      usesMinMaxTime: true,
      allDaySlot: true,
      slotDuration: '00:30:00',
      slotEventOverlap: true // a bad name. confused with overlap/constraint system

    },
    timeGridDay: {
      type: 'timeGrid',
      duration: {
        days: 1
      }
    },
    timeGridWeek: {
      type: 'timeGrid',
      duration: {
        weeks: 1
      }
    }
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (main);


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

module.exports = "<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n\n  <app-loading-view *ngIf=\"loading\"></app-loading-view>\n  \n  <app-not-data-yet-message \n    *ngIf=\"calendarItems.length == 0 && !loading\"\n    text=\"No tiene eventos aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-item *ngIf=\"!loading\">\n    <ion-label>Servicios:</ion-label>\n    <ion-select placeholder=\"Todos los espacios\" class=\"ion-text-capitalize\" mode='ios' [value]=\"filterSelected\" (ionChange)=\"filterChange($event)\">\n      <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let item of filterItems\" [value]=\"item.filter\"> {{item.name}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  <ion-list *ngIf=\"calendarItems.length > 0 && !loading\">\n    <app-calendar-service-item *ngFor=\"let item of calendarItems\" [item]=\"item\"></app-calendar-service-item>\n  </ion-list>\n  <div id='calendar'></div>\n</ion-content>";

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

module.exports = "<div *ngIf=\"userCtrl.platform !== 'web'\">\n  <app-main-header *ngIf=\"selectedTab === 'request'\" title=\"Tíquetes\"></app-main-header>\n  <app-main-header *ngIf=\"selectedTab === 'services'\" title=\"Servicios\"></app-main-header>\n  <app-main-header *ngIf=\"selectedTab === 'calendar'\" title=\"Agenda\"></app-main-header>\n</div>\n<ion-toolbar>\n  <ion-segment (ionChange)=\"segmentChanged($event)\" value=\"request\">\n  <!-- \n    <ion-segment-button value=\"calendar\" layout=\"icon-start\">\n      <ion-label *ngIf=\"userCtrl.platform === 'web'\">Agenda</ion-label>\n      <ion-icon name=\"calendar-outline\"></ion-icon>\n    </ion-segment-button>\n  -->\n    <ion-segment-button value=\"request\" layout=\"icon-start\">\n      <ion-label *ngIf=\"userCtrl.platform === 'web'\">Tíquetes</ion-label>\n      <ion-icon name=\"book-outline\"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value=\"services\" layout=\"icon-start\">\n      <ion-label *ngIf=\"userCtrl.platform === 'web'\">Servicios</ion-label>\n      <ion-icon name=\"hammer-outline\"></ion-icon>\n    </ion-segment-button>\n  </ion-segment>\n</ion-toolbar>\n\n<app-calendar-orders *ngIf=\"selectedTab === 'calendar'\" style=\"height: 100%\"></app-calendar-orders>\n<app-ticket-orders *ngIf=\"selectedTab === 'request'\" style=\"height: 100%\"></app-ticket-orders>\n<app-services-orders *ngIf=\"selectedTab === 'services'\" style=\"height: 100%\"></app-services-orders>";

/***/ }),

/***/ 24524:
/*!*****************************************************************************************************!*\
  !*** ./src/app/pages/employee/services-staff/ticket-orders/ticket-orders.component.html?ngResource ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene solicitudes aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    <div *ngFor=\"let request of itemList\">\n      <app-item-request *ngIf=\"request.employeeUID === user.uid\" [request]=\"request\" [reserve]=\"false\" [currentUser]=\"user\" (click)=\"openRequest(request,null)\"></app-item-request>\n    </div>\n  </ion-list>\n    <!-- \n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" (click)=\"createRequest()\">\n      <ion-icon size=\"large\" name=\"create-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n    -->\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_employee_services-staff_services-staff_module_ts.js.map