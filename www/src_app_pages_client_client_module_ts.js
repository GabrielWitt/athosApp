"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_client_client_module_ts"],{

/***/ 67320:
/*!*******************************************************!*\
  !*** ./src/app/pages/client/client-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientPageRoutingModule": () => (/* binding */ ClientPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _client_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client.page */ 8952);




const routes = [
    {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full'
    },
    {
        path: '',
        component: _client_page__WEBPACK_IMPORTED_MODULE_0__.ClientPage,
        children: [
            {
                path: 'news',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("default-src_app_shared_utilities_attachments_service_ts"), __webpack_require__.e("src_app_pages_client_notices-client_notices-client_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./notices-client/notices-client.module */ 92606)).then(m => m.NoticesClientPageModule)
            },
            {
                path: 'services',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("default-src_app_shared_utilities_attachments_service_ts"), __webpack_require__.e("src_app_pages_client_services-resident_services-resident_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./services-resident/services-resident.module */ 56124)).then(m => m.ServicesResidentPageModule)
            },
            {
                path: 'reservations',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("default-src_app_shared_utilities_attachments_service_ts"), __webpack_require__.e("src_app_pages_client_reservations-resident_reservations-resident_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./reservations-resident/reservations-resident.module */ 68038)).then(m => m.ReservationsResidentPageModule)
            },
            {
                path: 'profile',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("default-src_app_shared_utilities_attachments_service_ts"), __webpack_require__.e("src_app_pages_client_profile-client_profile-client_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./profile-client/profile-client.module */ 72579)).then(m => m.ProfileClientPageModule)
            }
        ]
    },
];
let ClientPageRoutingModule = class ClientPageRoutingModule {
};
ClientPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ClientPageRoutingModule);



/***/ }),

/***/ 54373:
/*!***********************************************!*\
  !*** ./src/app/pages/client/client.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientPageModule": () => (/* binding */ ClientPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _client_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-routing.module */ 67320);
/* harmony import */ var _client_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client.page */ 8952);







let ClientPageModule = class ClientPageModule {
};
ClientPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _client_routing_module__WEBPACK_IMPORTED_MODULE_0__.ClientPageRoutingModule
        ],
        declarations: [_client_page__WEBPACK_IMPORTED_MODULE_1__.ClientPage]
    })
], ClientPageModule);



/***/ }),

/***/ 8952:
/*!*********************************************!*\
  !*** ./src/app/pages/client/client.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientPage": () => (/* binding */ ClientPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _client_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client.page.html?ngResource */ 33482);
/* harmony import */ var _client_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client.page.scss?ngResource */ 95377);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);






let ClientPage = class ClientPage {
    constructor(router, userCtrl) {
        this.router = router;
        this.userCtrl = userCtrl;
    }
    ngOnInit() {
        this.userCtrl.loadUser();
    }
};
ClientPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router },
    { type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__.UserController }
];
ClientPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-client',
        template: _client_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_client_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ClientPage);



/***/ }),

/***/ 95377:
/*!**********************************************************!*\
  !*** ./src/app/pages/client/client.page.scss?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjbGllbnQucGFnZS5zY3NzIn0= */";

/***/ }),

/***/ 33482:
/*!**********************************************************!*\
  !*** ./src/app/pages/client/client.page.html?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-tabs>\n    <ion-tab-bar slot=\"bottom\">\n      <ion-tab-button tab=\"news\">\n        <ion-icon name=\"newspaper-outline\"></ion-icon>\n        <ion-label>AVISOS</ion-label>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"services\">\n        <ion-icon name=\"construct-outline\"></ion-icon>\n        <ion-label>SERVICIOS</ion-label>\n      </ion-tab-button> \n  \n      <ion-tab-button tab=\"reservations\">\n        <ion-icon name=\"calendar-outline\"></ion-icon>\n        <ion-label>RESERVAS</ion-label>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"profile\">\n        <ion-icon name=\"person-outline\"></ion-icon>\n        <ion-label>PERFIL</ion-label>\n      </ion-tab-button>\n    </ion-tab-bar>\n  </ion-tabs>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_client_client_module_ts.js.map