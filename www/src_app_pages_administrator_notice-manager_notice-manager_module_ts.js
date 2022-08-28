"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_administrator_notice-manager_notice-manager_module_ts"],{

/***/ 25673:
/*!*************************************************************************************!*\
  !*** ./src/app/pages/administrator/notice-manager/notice-manager-routing.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoticeManagerPageRoutingModule": () => (/* binding */ NoticeManagerPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _notice_manager_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notice-manager.page */ 48429);




const routes = [
    {
        path: '',
        component: _notice_manager_page__WEBPACK_IMPORTED_MODULE_0__.NoticeManagerPage
    }
];
let NoticeManagerPageRoutingModule = class NoticeManagerPageRoutingModule {
};
NoticeManagerPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], NoticeManagerPageRoutingModule);



/***/ }),

/***/ 42034:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/administrator/notice-manager/notice-manager.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoticeManagerPageModule": () => (/* binding */ NoticeManagerPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _notice_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notice-manager-routing.module */ 25673);
/* harmony import */ var _notice_manager_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notice-manager.page */ 48429);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);








let NoticeManagerPageModule = class NoticeManagerPageModule {
};
NoticeManagerPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _notice_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__.NoticeManagerPageRoutingModule
        ],
        declarations: [_notice_manager_page__WEBPACK_IMPORTED_MODULE_1__.NoticeManagerPage]
    })
], NoticeManagerPageModule);



/***/ }),

/***/ 48429:
/*!***************************************************************************!*\
  !*** ./src/app/pages/administrator/notice-manager/notice-manager.page.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoticeManagerPage": () => (/* binding */ NoticeManagerPage)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _notice_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notice-manager.page.html?ngResource */ 43376);
/* harmony import */ var _notice_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notice-manager.page.scss?ngResource */ 15972);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_core_services_modules_notice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/notice.service */ 2941);
/* harmony import */ var src_app_shared_components_new_notice_new_notice_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/components/new-notice/new-notice.component */ 67186);









let NoticeManagerPage = class NoticeManagerPage {
  constructor(auth, notices, modal, routerOutlet) {
    this.auth = auth;
    this.notices = notices;
    this.modal = modal;
    this.routerOutlet = routerOutlet;
    this.loading = true;
    this.loadingColor = false;
    this.loadingList = [1, 2, 3, 4, 5];
    this.noticeList = [];
  }

  ngOnInit() {
    this.loading = true;
    this.auth.getUser().then(user => {
      this.user = user.user;
      this.userData = user.data;
      this.loadData().then(() => {
        this.loading = false;
      });
    });
  }

  loadData() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.noticeList = yield _this.notices.readNoticeList();
        console.log(_this.noticeList);
        return 'done';
      } catch (error) {
        console.log(error);
      }
    })();
  }

  detailNotice(notice) {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this2.modal.create({
        component: src_app_shared_components_new_notice_new_notice_component__WEBPACK_IMPORTED_MODULE_5__.NewNoticeComponent,
        componentProps: {
          notice,
          user: _this2.userData
        },
        mode: 'ios',
        presentingElement: _this2.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();

      if (modalResult.data) {
        _this2.loadData();
      }
    })();
  }

  doRefresh(refresh) {
    this.loadData().then(done => {
      if (refresh) {
        refresh.target.complete();
      }
    }).catch(error => {
      console.log(error);

      if (refresh) {
        refresh.target.complete();
      }
    });
  }

  reloadData(reload) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const that = _this3;

      if (reload) {
        that.noticeList = yield that.notices.readNoticeList();
      }
    })();
  }

};

NoticeManagerPage.ctorParameters = () => [{
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_3__.FireAuthService
}, {
  type: src_app_core_services_modules_notice_service__WEBPACK_IMPORTED_MODULE_4__.NoticeService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRouterOutlet
}];

NoticeManagerPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-notice-manager',
  template: _notice_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_notice_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], NoticeManagerPage);


/***/ }),

/***/ 15972:
/*!****************************************************************************************!*\
  !*** ./src/app/pages/administrator/notice-manager/notice-manager.page.scss?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJub3RpY2UtbWFuYWdlci5wYWdlLnNjc3MifQ== */";

/***/ }),

/***/ 43376:
/*!****************************************************************************************!*\
  !*** ./src/app/pages/administrator/notice-manager/notice-manager.page.html?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = "<app-main-header title=\"Anuncios\" [rightButton]=\"reloadData\"></app-main-header>\n\n<ion-content class=\"ion-padding\">\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n      <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n    </ion-refresher>\n\n    <app-not-data-yet-message \n      *ngIf=\"noticeList.length == 0 && !loading\"\n      text=\"No hay anuncios aún\" icon=\"archive-outline\"\n    ></app-not-data-yet-message>\n  \n    <ion-list *ngIf=\"noticeList.length>0\">\n        <ion-card *ngFor=\"let notice of noticeList\" (click)=\"detailNotice(notice)\">\n            <ion-card-header>\n                <ion-card-subtitle>\n                    <ion-icon color=\"tertiary\" size=\"small\" [name]=\"notice.type.icon\"></ion-icon>\n                    <ion-text color=\"tertiary\">{{notice.type.name}}</ion-text>\n                </ion-card-subtitle>\n            </ion-card-header>\n            <ion-img [src]=\"notice.photo\"></ion-img>\n            <ion-item detail>\n                <ion-label>\n                    <p>{{notice.title}}</p>\n                </ion-label>\n            </ion-item>\n            <ion-row>\n                <ion-col class=\"ion-text-center\">\n                    <ion-icon name=\"thumbs-up-outline\"></ion-icon> Likes {{notice.likes.length}}\n                </ion-col>\n                <ion-col class=\"ion-text-center\">\n                <ion-icon name=\"chatbubble-ellipses-outline\"></ion-icon> Comentarios {{notice.comments.length}}\n                </ion-col>\n            </ion-row>\n        </ion-card>\n    </ion-list>\n    \n    <ion-list *ngIf=\"loading\">\n        <app-loading-view></app-loading-view>\n      </ion-list>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_administrator_notice-manager_notice-manager_module_ts.js.map