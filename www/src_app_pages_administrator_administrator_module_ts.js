"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_administrator_administrator_module_ts"],{

/***/ 21850:
/*!*********************************************************************!*\
  !*** ./src/app/pages/administrator/administrator-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdministratorPageRoutingModule": () => (/* binding */ AdministratorPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _administrator_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./administrator.page */ 52784);




const routes = [
    {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full'
    },
    {
        path: '',
        component: _administrator_page__WEBPACK_IMPORTED_MODULE_0__.AdministratorPage,
        children: [
            {
                path: 'profile',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("src_app_pages_administrator_profile-manager_profile-manager_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../administrator/profile-manager/profile-manager.module */ 72232)).then(m => m.ProfileManagerPageModule),
                data: { viewName: 'Profile' }
            },
            {
                path: 'users',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_pages_administrator_user-manager_user-manager_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./user-manager/user-manager.module */ 22913)).then(m => m.UserManagerPageModule),
                data: { viewName: 'Users' }
            },
            {
                path: 'news',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("src_app_pages_administrator_notice-manager_notice-manager_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./notice-manager/notice-manager.module */ 42034)).then(m => m.NoticeManagerPageModule),
                data: { viewName: 'News' }
            },
            {
                path: 'reservations',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("src_app_pages_administrator_reservations-manager_reservations-manager_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./reservations-manager/reservations-manager.module */ 9585)).then(m => m.ReservationsManagerPageModule)
            },
            {
                path: 'services',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_shared_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_pages_administrator_services-manager_services-manager_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./services-manager/services-manager.module */ 55450)).then(m => m.ServicesManagerPageModule)
            }
        ]
    },
    {
        path: 'calendar',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_administrator_calendar_calendar_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./calendar/calendar.module */ 40346)).then(m => m.CalendarPageModule)
    },
];
let AdministratorPageRoutingModule = class AdministratorPageRoutingModule {
};
AdministratorPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], AdministratorPageRoutingModule);



/***/ }),

/***/ 66484:
/*!*************************************************************!*\
  !*** ./src/app/pages/administrator/administrator.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdministratorPageModule": () => (/* binding */ AdministratorPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _administrator_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./administrator-routing.module */ 21850);
/* harmony import */ var _administrator_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./administrator.page */ 52784);







let AdministratorPageModule = class AdministratorPageModule {
};
AdministratorPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _administrator_routing_module__WEBPACK_IMPORTED_MODULE_0__.AdministratorPageRoutingModule
        ],
        declarations: [_administrator_page__WEBPACK_IMPORTED_MODULE_1__.AdministratorPage]
    })
], AdministratorPageModule);



/***/ }),

/***/ 52784:
/*!***********************************************************!*\
  !*** ./src/app/pages/administrator/administrator.page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdministratorPage": () => (/* binding */ AdministratorPage)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _administrator_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./administrator.page.html?ngResource */ 90554);
/* harmony import */ var _administrator_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./administrator.page.scss?ngResource */ 59287);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);
/* harmony import */ var src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/attachments.service */ 15909);








let AdministratorPage = class AdministratorPage {
  constructor(userCtrl, router, images) {
    this.userCtrl = userCtrl;
    this.router = router;
    this.images = images;
  }

  ngOnInit() {
    this.userCtrl.loadUser();
  }

  checkSavedImages() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.images.loadSaved().then(photos => {
        if (photos.length) {
          setTimeout(() => {
            _this.router.navigateByUrl(photos[0].route.substring(1));
          }, 1500);
        } else {
          _this.router.navigateByUrl('/administrator/news');
        }
      }).catch(e => {
        console.log(e);

        _this.router.navigateByUrl('/administrator/news');
      });
    })();
  }

};

AdministratorPage.ctorParameters = () => [{
  type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__.UserController
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router
}, {
  type: src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_4__.AttachmentsService
}];

AdministratorPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
  selector: 'app-administrator',
  template: _administrator_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_administrator_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], AdministratorPage);


/***/ }),

/***/ 59287:
/*!************************************************************************!*\
  !*** ./src/app/pages/administrator/administrator.page.scss?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbmlzdHJhdG9yLnBhZ2Uuc2NzcyJ9 */";

/***/ }),

/***/ 90554:
/*!************************************************************************!*\
  !*** ./src/app/pages/administrator/administrator.page.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-tabs>\n    <ion-tab-bar slot=\"bottom\">\n\n      <ion-tab-button tab=\"news\">\n        <ion-icon name=\"newspaper-outline\"></ion-icon>\n        <ion-label>ANUNCIOS</ion-label>\n      </ion-tab-button>\n  \n      <ion-tab-button tab=\"reservations\">\n        <ion-icon name=\"business-outline\"></ion-icon>\n        <ion-label>ESPACIOS</ion-label>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"services\">\n        <ion-icon name=\"construct-outline\"></ion-icon>\n        <ion-label>SERVICIOS</ion-label>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"users\">\n        <ion-icon name=\"people-circle-outline\"></ion-icon>\n        <ion-label>USUARIOS</ion-label>\n      </ion-tab-button>\n    </ion-tab-bar>\n  </ion-tabs>\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_administrator_administrator_module_ts.js.map