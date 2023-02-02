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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _reservations_resident_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reservations-resident.page.html?ngResource */ 72186);
/* harmony import */ var _reservations_resident_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reservations-resident.page.scss?ngResource */ 22191);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_core_services_modules_reservations_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/reservations.service */ 53957);
/* harmony import */ var src_app_shared_components_spaces_new_reservation_new_reservation_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/components/spaces/new-reservation/new-reservation.component */ 21897);
/* harmony import */ var src_app_shared_components_spaces_pick_rent_space_pick_rent_space_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/components/spaces/pick-rent-space/pick-rent-space.component */ 29204);











let ReservationsResidentPage = class ReservationsResidentPage {
  constructor(modal, auth, userCtrl, request, routerOutlet) {
    this.modal = modal;
    this.auth = auth;
    this.userCtrl = userCtrl;
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
    console.log(this.userCtrl.user);
    this.loadData().then(user => {
      this.loading = false;
    });
  }

  loadData() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const userData = yield _this.auth.getUser();
      _this.user = userData.data;
      _this.itemList = yield _this.request.readUserReservationsListOrderRent("startDate", new Date().toISOString(), _this.userCtrl.currentUser.uid, _this.filterSelected);
      console.log(_this.itemList);
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
        component: src_app_shared_components_spaces_pick_rent_space_pick_rent_space_component__WEBPACK_IMPORTED_MODULE_7__.PickRentSpaceComponent,
        componentProps: {
          reservation: null,
          user: _this3.userCtrl.user
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
        component: src_app_shared_components_spaces_new_reservation_new_reservation_component__WEBPACK_IMPORTED_MODULE_6__.NewReservationComponent,
        componentProps: {
          reservation,
          space,
          currentUser: _this4.user,
          users: [_this4.user]
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

ReservationsResidentPage.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__.FireAuthService
}, {
  type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__.UserController
}, {
  type: src_app_core_services_modules_reservations_service__WEBPACK_IMPORTED_MODULE_5__.ReservationsService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRouterOutlet
}];

ReservationsResidentPage = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  selector: 'app-reservations-resident',
  template: _reservations_resident_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_reservations_resident_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ReservationsResidentPage);


/***/ }),

/***/ 22191:
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

module.exports = "<app-main-header title=\"Reservaciones\"></app-main-header>\n<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n    <ion-row>\n      \n    </ion-row>\n  </ion-list>\n  \n  <ion-item *ngIf=\"!loading\">\n    <ion-label>Reservas:</ion-label>\n    <ion-select placeholder=\"Todos los espacios\" class=\"ion-text-capitalize\" mode='ios' [value]=\"filterSelected\" (ionChange)=\"filterChange($event)\">\n      <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let item of filterItems\" [value]=\"item.filter\"> {{item.name}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene reservaciones aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    <app-item-reservation *ngFor=\"let request of itemList\" [request]=\"request\" (click)=\"openReservation(request,null)\"></app-item-reservation>\n  </ion-list>\n  \n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" (click)=\"createReservation()\">\n      <ion-icon size=\"large\" name=\"add-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_client_reservations-resident_reservations-resident_module_ts.js.map