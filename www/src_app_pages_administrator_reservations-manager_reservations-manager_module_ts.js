"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_administrator_reservations-manager_reservations-manager_module_ts"],{

/***/ 91643:
/*!***********************************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/reservation-admin/reservation-admin.component.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationAdminComponent": () => (/* binding */ ReservationAdminComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _reservation_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reservation-admin.component.html?ngResource */ 20294);
/* harmony import */ var _reservation_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reservation-admin.component.scss?ngResource */ 83991);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_core_services_modules_reservations_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/reservations.service */ 53957);
/* harmony import */ var src_app_shared_components_spaces_new_reservation_new_reservation_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/components/spaces/new-reservation/new-reservation.component */ 21897);
/* harmony import */ var src_app_shared_components_spaces_pick_rent_space_pick_rent_space_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/components/spaces/pick-rent-space/pick-rent-space.component */ 29204);










let ReservationAdminComponent = class ReservationAdminComponent {
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
          user: _this4.user
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

ReservationAdminComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__.FireAuthService
}, {
  type: src_app_core_services_modules_reservations_service__WEBPACK_IMPORTED_MODULE_4__.ReservationsService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRouterOutlet
}];

ReservationAdminComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-reservation-admin',
  template: _reservation_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_reservation_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ReservationAdminComponent);


/***/ }),

/***/ 87941:
/*!*************************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/reservations-manager-routing.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationsManagerPageRoutingModule": () => (/* binding */ ReservationsManagerPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _reservations_manager_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservations-manager.page */ 71557);




const routes = [
    {
        path: '',
        component: _reservations_manager_page__WEBPACK_IMPORTED_MODULE_0__.ReservationsManagerPage
    }
];
let ReservationsManagerPageRoutingModule = class ReservationsManagerPageRoutingModule {
};
ReservationsManagerPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ReservationsManagerPageRoutingModule);



/***/ }),

/***/ 9585:
/*!*****************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/reservations-manager.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationsManagerPageModule": () => (/* binding */ ReservationsManagerPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _reservations_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservations-manager-routing.module */ 87941);
/* harmony import */ var _reservations_manager_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reservations-manager.page */ 71557);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);
/* harmony import */ var _spaces_admin_spaces_admin_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./spaces-admin/spaces-admin.component */ 65452);
/* harmony import */ var _reservation_admin_reservation_admin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reservation-admin/reservation-admin.component */ 91643);










let ReservationsManagerPageModule = class ReservationsManagerPageModule {
};
ReservationsManagerPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _reservations_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__.ReservationsManagerPageRoutingModule
        ],
        declarations: [
            _reservations_manager_page__WEBPACK_IMPORTED_MODULE_1__.ReservationsManagerPage,
            _spaces_admin_spaces_admin_component__WEBPACK_IMPORTED_MODULE_3__.SpacesAdminComponent,
            _reservation_admin_reservation_admin_component__WEBPACK_IMPORTED_MODULE_4__.ReservationAdminComponent
        ]
    })
], ReservationsManagerPageModule);



/***/ }),

/***/ 71557:
/*!***************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/reservations-manager.page.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationsManagerPage": () => (/* binding */ ReservationsManagerPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _reservations_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservations-manager.page.html?ngResource */ 10844);
/* harmony import */ var _reservations_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reservations-manager.page.scss?ngResource */ 71321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);





let ReservationsManagerPage = class ReservationsManagerPage {
    constructor(userCtrl) {
        this.userCtrl = userCtrl;
        this.selectedTab = 'reservations';
    }
    ngOnInit() { }
    segmentChanged(ev) {
        this.selectedTab = ev.detail.value;
    }
};
ReservationsManagerPage.ctorParameters = () => [
    { type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__.UserController }
];
ReservationsManagerPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-reservations-manager',
        template: _reservations_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_reservations_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ReservationsManagerPage);



/***/ }),

/***/ 65452:
/*!*************************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/spaces-admin/spaces-admin.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpacesAdminComponent": () => (/* binding */ SpacesAdminComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _spaces_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spaces-admin.component.html?ngResource */ 64156);
/* harmony import */ var _spaces_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./spaces-admin.component.scss?ngResource */ 46119);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_shared_components_spaces_new_space_new_space_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/components/spaces/new-space/new-space.component */ 61559);
/* harmony import */ var src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/spaces.service */ 59269);









let SpacesAdminComponent = class SpacesAdminComponent {
  constructor(modal, auth, spaces, routerOutlet) {
    this.modal = modal;
    this.auth = auth;
    this.spaces = spaces;
    this.routerOutlet = routerOutlet;
    this.loading = true;
    this.itemList = [];
    this.filterSelected = 'Todos';
    this.filterItems = ['Todos', 'oficina', 'vivienda', 'parqueo', 'recepción', 'bodega', 'salón', 'tienda', 'terraza'];
  }

  ngOnInit() {
    this.loading = true;
    this.loadData().then(user => {
      this.loading = false;
    });
  }

  loadData(reload) {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        let list = [];
        const userData = yield _this.auth.getUser();

        if (_this.filterSelected === 'Todos') {
          list = yield _this.spaces.readSpacesListOrder();
        } else {
          list = yield _this.spaces.readSpacesListOrderType(_this.filterSelected);
        }

        if (reload) {
          if (list.length > 0 && list.length < _this.itemList.length) {
            list.forEach(newItem => {
              let found = false;

              _this.itemList.forEach(item => {
                if (newItem.uid === item.uid) {
                  item = newItem;
                  found = true;
                }
              });

              if (!found) _this.itemList.push(newItem);
            });
          } else {
            _this.itemList = list;
          }
        } else {
          _this.itemList = list;
        }

        _this.user = userData.data;
        return _this.user;
      } catch (error) {
        console.log(error);
        _this.loading = false;
      }
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

  filterChange(e) {
    this.filterSelected = e.detail.value;
    this.loadData();
  }

  createSpace() {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this3.modal.create({
        component: src_app_shared_components_spaces_new_space_new_space_component__WEBPACK_IMPORTED_MODULE_4__.NewSpaceComponent,
        componentProps: {
          space: null,
          user: _this3.user
        },
        mode: 'ios',
        presentingElement: _this3.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();
      console.log(modalResult);

      if (modalResult.data) {
        _this3.loadData();
      }
    })();
  }

  detailSpace(space) {
    var _this4 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this4.modal.create({
        component: src_app_shared_components_spaces_new_space_new_space_component__WEBPACK_IMPORTED_MODULE_4__.NewSpaceComponent,
        componentProps: {
          space,
          user: _this4.user
        },
        mode: 'ios',
        presentingElement: _this4.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();

      if (modalResult.data) {
        _this4.loadData(true);
      }
    })();
  }

};

SpacesAdminComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__.FireAuthService
}, {
  type: src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_5__.SpacesService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRouterOutlet
}];

SpacesAdminComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-spaces-admin',
  template: _spaces_admin_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_spaces_admin_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], SpacesAdminComponent);


/***/ }),

/***/ 83991:
/*!************************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/reservation-admin/reservation-admin.component.scss?ngResource ***!
  \************************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXNlcnZhdGlvbi1hZG1pbi5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 71321:
/*!****************************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/reservations-manager.page.scss?ngResource ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXNlcnZhdGlvbnMtbWFuYWdlci5wYWdlLnNjc3MifQ== */";

/***/ }),

/***/ 46119:
/*!**************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/spaces-admin/spaces-admin.component.scss?ngResource ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = ".headerSpaceList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlcy1hZG1pbi5jb21wb25lbnQuc2NzcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL1ByYWN0aWN1bSUyMDQvYXRob3NBcHAvc3JjL2FwcC9wYWdlcy9hZG1pbmlzdHJhdG9yL3Jlc2VydmF0aW9ucy1tYW5hZ2VyL3NwYWNlcy1hZG1pbi9zcGFjZXMtYWRtaW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwyQ0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7QUNDSiIsImZpbGUiOiJzcGFjZXMtYWRtaW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVyU3BhY2VMaXN0e1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XG4gICAgZm9udC1zaXplOiAxNXB0O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiBibGFjaztcbn0iLCIuaGVhZGVyU3BhY2VMaXN0IHtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYigxODcsIDE4NywgMTg3KTtcbiAgZm9udC1zaXplOiAxNXB0O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6IGJsYWNrO1xufSJdfQ== */";

/***/ }),

/***/ 20294:
/*!************************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/reservation-admin/reservation-admin.component.html?ngResource ***!
  \************************************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n    <ion-row>\n      \n    </ion-row>\n  </ion-list>\n  \n  <ion-item *ngIf=\"!loading\">\n    <ion-label>Reservas:</ion-label>\n    <ion-select placeholder=\"Todos los espacios\" class=\"ion-text-capitalize\" mode='ios' [value]=\"filterSelected\" (ionChange)=\"filterChange($event)\">\n      <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let item of filterItems\" [value]=\"item.filter\"> {{item.name}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  \n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene reservaciones aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    <app-item-reservation *ngFor=\"let request of itemList\" [request]=\"request\" (click)=\"openReservation(request,null)\"></app-item-reservation>\n  </ion-list>\n  \n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" (click)=\"createReservation()\">\n      <ion-icon size=\"large\" name=\"add-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>";

/***/ }),

/***/ 10844:
/*!****************************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/reservations-manager.page.html?ngResource ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar *ngIf=\"userCtrl.platform !== 'web'\">\n    <ion-title *ngIf=\"selectedTab === 'spaces'\" class=\"ion-text-uppercase\">Espacios</ion-title>\n    <ion-title *ngIf=\"selectedTab === 'reservations'\" class=\"ion-text-uppercase\">Reservaciones</ion-title>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-segment (ionChange)=\"segmentChanged($event)\" value=\"reservations\">\n      <ion-segment-button value=\"reservations\" layout=\"icon-start\">\n        <ion-label *ngIf=\"userCtrl.platform === 'web'\">Reservas</ion-label>\n        <ion-icon name=\"calendar-outline\"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button value=\"spaces\" layout=\"icon-start\">\n        <ion-label *ngIf=\"userCtrl.platform === 'web'\">Inmuebles</ion-label>\n        <ion-icon name=\"business-outline\"></ion-icon>\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<app-spaces-admin *ngIf=\"selectedTab === 'spaces'\" style=\"height: 100%\"></app-spaces-admin>\n<app-reservation-admin *ngIf=\"selectedTab === 'reservations'\" style=\"height: 100%\"></app-reservation-admin>\n";

/***/ }),

/***/ 64156:
/*!**************************************************************************************************************!*\
  !*** ./src/app/pages/administrator/reservations-manager/spaces-admin/spaces-admin.component.html?ngResource ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  \n  <ion-list *ngIf=\"loading\">\n    <app-loading-view></app-loading-view>\n  </ion-list>\n  \n  <ion-item *ngIf=\"!loading\">\n    <ion-label>Tipo Inmueble:</ion-label>\n    <ion-select placeholder=\"Todos los espacios\" class=\"ion-text-capitalize\" mode='ios' \n    [value]=\"filterSelected\" (ionChange)=\"filterChange($event)\">\n      <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let item of filterItems\" \n      [value]=\"item\"> {{item}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  <app-not-data-yet-message \n    *ngIf=\"itemList.length == 0 && !loading\"\n    text=\"No tiene espacios aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  \n  <ion-list *ngIf=\"itemList.length > 0 && !loading\">\n    <ion-row class=\"headerSpaceList\">\n      <ion-col size=\"2\" class=\"ion-text-center\"></ion-col>\n      <ion-col size=\"4\" class=\"ion-text-center\">Espacio</ion-col>\n      <ion-col size=\"2\" class=\"ion-text-center\">Tipo</ion-col>\n      <ion-col size=\"4\" class=\"ion-text-center\">Ocupante</ion-col>\n    </ion-row>\n    <app-item-space *ngFor=\"let space of itemList\" [space]=\"space\" (click)=\"detailSpace(space)\">\n    </app-item-space>\n  </ion-list>\n    \n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" (click)=\"createSpace()\">\n      <ion-icon size=\"large\" name=\"create-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_administrator_reservations-manager_reservations-manager_module_ts.js.map