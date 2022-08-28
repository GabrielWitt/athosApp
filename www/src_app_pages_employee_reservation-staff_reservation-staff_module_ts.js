"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_employee_reservation-staff_reservation-staff_module_ts"],{

/***/ 65180:
/*!**************************************************************************************!*\
  !*** ./src/app/pages/employee/reservation-staff/reservation-staff-routing.module.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationStaffPageRoutingModule": () => (/* binding */ ReservationStaffPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _reservation_staff_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservation-staff.page */ 9877);




const routes = [
    {
        path: '',
        component: _reservation_staff_page__WEBPACK_IMPORTED_MODULE_0__.ReservationStaffPage
    }
];
let ReservationStaffPageRoutingModule = class ReservationStaffPageRoutingModule {
};
ReservationStaffPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ReservationStaffPageRoutingModule);



/***/ }),

/***/ 3485:
/*!******************************************************************************!*\
  !*** ./src/app/pages/employee/reservation-staff/reservation-staff.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationStaffPageModule": () => (/* binding */ ReservationStaffPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _reservation_staff_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservation-staff-routing.module */ 65180);
/* harmony import */ var _reservation_staff_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reservation-staff.page */ 9877);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);








let ReservationStaffPageModule = class ReservationStaffPageModule {
};
ReservationStaffPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _reservation_staff_routing_module__WEBPACK_IMPORTED_MODULE_0__.ReservationStaffPageRoutingModule
        ],
        declarations: [_reservation_staff_page__WEBPACK_IMPORTED_MODULE_1__.ReservationStaffPage]
    })
], ReservationStaffPageModule);



/***/ }),

/***/ 9877:
/*!****************************************************************************!*\
  !*** ./src/app/pages/employee/reservation-staff/reservation-staff.page.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationStaffPage": () => (/* binding */ ReservationStaffPage)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _reservation_staff_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reservation-staff.page.html?ngResource */ 50900);
/* harmony import */ var _reservation_staff_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reservation-staff.page.scss?ngResource */ 64464);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_core_services_modules_reservations_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/reservations.service */ 53957);
/* harmony import */ var src_app_shared_components_spaces_new_reservation_new_reservation_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/components/spaces/new-reservation/new-reservation.component */ 21897);
/* harmony import */ var src_app_shared_components_spaces_pick_rent_space_pick_rent_space_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/components/spaces/pick-rent-space/pick-rent-space.component */ 29204);










let ReservationStaffPage = class ReservationStaffPage {
  constructor(modal, auth, request, routerOutlet) {
    this.modal = modal;
    this.auth = auth;
    this.request = request;
    this.routerOutlet = routerOutlet;
    this.loading = true;
    this.itemList = [];
    this.rentSpacesList = [];
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
      _this.itemList = yield _this.request.readReservationsListOrderRent("startDate", new Date().toISOString(), _this.filterSelected);
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

  createReservation() {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modalPick = yield _this3.modal.create({
        component: src_app_shared_components_spaces_pick_rent_space_pick_rent_space_component__WEBPACK_IMPORTED_MODULE_6__.PickRentSpaceComponent,
        componentProps: {
          reservation: null,
          user: _this3.user
        },
        mode: 'ios',
        presentingElement: _this3.routerOutlet.nativeEl
      });
      modalPick.present();
      const modalResult1 = yield modalPick.onWillDismiss();

      if (modalResult1.data) {
        _this3.openReservation(null, modalResult1.data);
      }
    })();
  }

  openReservation(reservation, space) {
    var _this4 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modalCreate = yield _this4.modal.create({
        component: src_app_shared_components_spaces_new_reservation_new_reservation_component__WEBPACK_IMPORTED_MODULE_5__.NewReservationComponent,
        componentProps: {
          reservation,
          space,
          currentUser: _this4.user
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

ReservationStaffPage.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__.FireAuthService
}, {
  type: src_app_core_services_modules_reservations_service__WEBPACK_IMPORTED_MODULE_4__.ReservationsService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRouterOutlet
}];

ReservationStaffPage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-reservation-staff',
  template: _reservation_staff_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_reservation_staff_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ReservationStaffPage);


/***/ }),

/***/ 64464:
/*!*****************************************************************************************!*\
  !*** ./src/app/pages/employee/reservation-staff/reservation-staff.page.scss?ngResource ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXNlcnZhdGlvbi1zdGFmZi5wYWdlLnNjc3MifQ== */";

/***/ }),

/***/ 50900:
/*!*****************************************************************************************!*\
  !*** ./src/app/pages/employee/reservation-staff/reservation-staff.page.html?ngResource ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = "<app-main-header title=\"RESERVAS\"></app-main-header>\n\n<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n    <ion-row>\n      \n    </ion-row>\n  </ion-list>\n  \n  <ion-item *ngIf=\"!loading\">\n    <ion-label>Reservas:</ion-label>\n    <ion-select placeholder=\"Todos los espacios\" class=\"ion-text-capitalize\" mode='ios' [value]=\"filterSelected\" (ionChange)=\"filterChange($event)\">\n      <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let item of filterItems\" [value]=\"item.filter\"> {{item.name}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene reservaciones aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    <app-item-reservation *ngFor=\"let request of itemList\" [request]=\"request\" (click)=\"openReservation(request,null)\"></app-item-reservation>\n  </ion-list>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_employee_reservation-staff_reservation-staff_module_ts.js.map