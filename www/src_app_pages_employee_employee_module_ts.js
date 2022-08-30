"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_employee_employee_module_ts"],{

/***/ 17786:
/*!***********************************************************!*\
  !*** ./src/app/pages/employee/employee-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeePageRoutingModule": () => (/* binding */ EmployeePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _employee_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./employee.page */ 98613);




const routes = [
    {
        path: '',
        redirectTo: 'services',
        pathMatch: 'full'
    },
    {
        path: '',
        component: _employee_page__WEBPACK_IMPORTED_MODULE_0__.EmployeePage,
        children: [
            {
                path: 'news',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("default-src_app_shared_utilities_attachments_service_ts"), __webpack_require__.e("src_app_pages_employee_notices-staff_notices-staff_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./notices-staff/notices-staff.module */ 53364)).then(m => m.NoticesStaffPageModule)
            },
            {
                path: 'profile',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("default-src_app_shared_utilities_attachments_service_ts"), __webpack_require__.e("src_app_pages_employee_profile-staff_profile-staff_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./profile-staff/profile-staff.module */ 32444)).then(m => m.ProfileStaffPageModule)
            },
            {
                path: 'services',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("default-src_app_shared_utilities_attachments_service_ts"), __webpack_require__.e("src_app_pages_employee_services-staff_services-staff_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./services-staff/services-staff.module */ 67794)).then(m => m.ServicesStaffPageModule)
            },
            {
                path: 'reservations',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("default-src_app_shared_utilities_attachments_service_ts"), __webpack_require__.e("src_app_pages_employee_reservation-staff_reservation-staff_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./reservation-staff/reservation-staff.module */ 3485)).then(m => m.ReservationStaffPageModule)
            }
        ]
    }
];
let EmployeePageRoutingModule = class EmployeePageRoutingModule {
};
EmployeePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], EmployeePageRoutingModule);



/***/ }),

/***/ 53354:
/*!***************************************************!*\
  !*** ./src/app/pages/employee/employee.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeePageModule": () => (/* binding */ EmployeePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _employee_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./employee-routing.module */ 17786);
/* harmony import */ var _employee_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./employee.page */ 98613);







let EmployeePageModule = class EmployeePageModule {
};
EmployeePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _employee_routing_module__WEBPACK_IMPORTED_MODULE_0__.EmployeePageRoutingModule
        ],
        declarations: [_employee_page__WEBPACK_IMPORTED_MODULE_1__.EmployeePage]
    })
], EmployeePageModule);



/***/ }),

/***/ 98613:
/*!*************************************************!*\
  !*** ./src/app/pages/employee/employee.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeePage": () => (/* binding */ EmployeePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _employee_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./employee.page.html?ngResource */ 71872);
/* harmony import */ var _employee_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./employee.page.scss?ngResource */ 72626);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);






let EmployeePage = class EmployeePage {
    constructor(router, userCtrl) {
        this.router = router;
        this.userCtrl = userCtrl;
    }
    ngOnInit() {
        this.userCtrl.loadUser();
    }
};
EmployeePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router },
    { type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__.UserController }
];
EmployeePage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-employee',
        template: _employee_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_employee_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], EmployeePage);



/***/ }),

/***/ 72626:
/*!**************************************************************!*\
  !*** ./src/app/pages/employee/employee.page.scss?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlbXBsb3llZS5wYWdlLnNjc3MifQ== */";

/***/ }),

/***/ 71872:
/*!**************************************************************!*\
  !*** ./src/app/pages/employee/employee.page.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-tabs>\n    <ion-tab-bar slot=\"bottom\">\n      <ion-tab-button tab=\"news\">\n        <ion-icon name=\"newspaper-outline\"></ion-icon>\n        <ion-label>AVISOS</ion-label>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"services\">\n        <ion-icon name=\"construct-outline\"></ion-icon>\n        <ion-label>SERVICIOS</ion-label>\n      </ion-tab-button> \n  \n      <ion-tab-button tab=\"reservations\">\n        <ion-icon name=\"calendar-outline\"></ion-icon>\n        <ion-label>RESERVAS</ion-label>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"profile\">\n        <ion-icon name=\"person-outline\"></ion-icon>\n        <ion-label>PERFIL</ion-label>\n      </ion-tab-button>\n    </ion-tab-bar>\n  </ion-tabs>\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_employee_employee_module_ts.js.map