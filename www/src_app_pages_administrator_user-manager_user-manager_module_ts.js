"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_administrator_user-manager_user-manager_module_ts"],{

/***/ 77464:
/*!********************************************************!*\
  !*** ./src/app/core/services/modules/users.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UsersService": () => (/* binding */ UsersService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/utilities/error-handler.service */ 43570);
/* harmony import */ var _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../firestore-actions.service */ 14871);




let UsersService = class UsersService {
    constructor(firestore, error) {
        this.firestore = firestore;
        this.error = error;
    }
    readAllUsers() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollection('users')
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readUser(UserUID) {
        return new Promise((resolve, reject) => {
            this.firestore.readDocument('users', UserUID)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    upgradeUser(uid) {
        return new Promise((resolve, reject) => {
            this.firestore.setNamedDocument('users', uid, { manager: true })
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
};
UsersService.ctorParameters = () => [
    { type: _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__.FirestoreActionsService },
    { type: src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_0__.ErrorHandlerService }
];
UsersService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
        providedIn: 'root'
    })
], UsersService);



/***/ }),

/***/ 76526:
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/profile-detail/profile-detail.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileDetailComponent": () => (/* binding */ ProfileDetailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _profile_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-detail.component.html?ngResource */ 57268);
/* harmony import */ var _profile_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-detail.component.scss?ngResource */ 1085);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);







let ProfileDetailComponent = class ProfileDetailComponent {
    constructor(modal, alert, users) {
        this.modal = modal;
        this.alert = alert;
        this.users = users;
        this.loading = false;
        this.upgrading = false;
        this.petList = [];
        this.defaultUser = '../../../../assets/profile/ProfileBlank.png';
    }
    ngOnInit() { }
    upgradeUser() {
        this.alert.AlertConfirm('CAMBIO A ADMINISTRADOR', '¿Está seguro que desea cambiar a este usuario a Administrador?')
            .then(answer => {
            if (answer) {
                console.log('Administrador Nuevo');
                this.upgrading = true;
                this.users.upgradeUser(this.user.uid).then(done => {
                    this.alert.showAlert('USUARIO MEJORADO', 'Solicite que el usuario ingrese a su perfil para continuar con el proceso', 'OK');
                    this.user.type = 'administrador';
                    this.upgrading = false;
                }).catch(e => {
                    console.log(e);
                    this.upgrading = false;
                });
            }
        });
    }
};
ProfileDetailComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController },
    { type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__.AlertsService },
    { type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_2__.UsersService }
];
ProfileDetailComponent.propDecorators = {
    user: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }]
};
ProfileDetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-profile-detail',
        template: _profile_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_profile_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProfileDetailComponent);



/***/ }),

/***/ 63216:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-manager-routing.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserManagerPageRoutingModule": () => (/* binding */ UserManagerPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _user_manager_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-manager.page */ 40648);




const routes = [
    {
        path: '',
        component: _user_manager_page__WEBPACK_IMPORTED_MODULE_0__.UserManagerPage
    }
];
let UserManagerPageRoutingModule = class UserManagerPageRoutingModule {
};
UserManagerPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], UserManagerPageRoutingModule);



/***/ }),

/***/ 22913:
/*!*************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-manager.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserManagerPageModule": () => (/* binding */ UserManagerPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _user_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-manager-routing.module */ 63216);
/* harmony import */ var _user_manager_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-manager.page */ 40648);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);
/* harmony import */ var _profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile-detail/profile-detail.component */ 76526);









let UserManagerPageModule = class UserManagerPageModule {
};
UserManagerPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _user_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__.UserManagerPageRoutingModule
        ],
        declarations: [
            _user_manager_page__WEBPACK_IMPORTED_MODULE_1__.UserManagerPage,
            _profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_3__.ProfileDetailComponent
        ]
    })
], UserManagerPageModule);



/***/ }),

/***/ 40648:
/*!***********************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-manager.page.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserManagerPage": () => (/* binding */ UserManagerPage)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _user_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-manager.page.html?ngResource */ 65468);
/* harmony import */ var _user_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-manager.page.scss?ngResource */ 5731);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_pages_administrator_user_manager_profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/pages/administrator/user-manager/profile-detail/profile-detail.component */ 76526);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);








let UserManagerPage = class UserManagerPage {
  constructor(users, modal, routerOutlet) {
    this.users = users;
    this.modal = modal;
    this.routerOutlet = routerOutlet;
    this.loading = true;
    this.userList = [];
  }

  ngOnInit() {
    this.loadUsers().then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

  loadUsers() {
    return new Promise((resolve, reject) => {
      this.users.readAllUsers().then(list => {
        console.log(list);
        this.userList = list;
        resolve('ok');
      }).catch(error => {
        console.log(error);
        reject('error');
      });
    });
  }

  userDetail(user) {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this.modal.create({
        component: src_app_pages_administrator_user_manager_profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_3__.ProfileDetailComponent,
        componentProps: {
          user
        },
        mode: 'ios',
        presentingElement: _this.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();

      if (modalResult.data) {
        _this.loadUsers();
      }
    })();
  }

  doRefresh(refresh) {
    this.loadUsers().then(done => {
      console.log('done');

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

};

UserManagerPage.ctorParameters = () => [{
  type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_4__.UsersService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonRouterOutlet
}];

UserManagerPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
  selector: 'app-user-manager',
  template: _user_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_user_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], UserManagerPage);


/***/ }),

/***/ 1085:
/*!**********************************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/profile-detail/profile-detail.component.scss?ngResource ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9maWxlLWRldGFpbC5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 5731:
/*!************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-manager.page.scss?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLW1hbmFnZXIucGFnZS5zY3NzIn0= */";

/***/ }),

/***/ 57268:
/*!**********************************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/profile-detail/profile-detail.component.html?ngResource ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button color=\"primary\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Atrás\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">Perfil de {{user.name}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"!upgrading\" color=\"primary\" (click)=\"upgradeUser()\">\n        <ion-icon name=\"arrow-up-circle-outline\"></ion-icon>\n      </ion-button>\n      <ion-button *ngIf=\"upgrading\" color=\"primary\">\n        <ion-spinner name=\"lines-small\" color=\"tertiary\"></ion-spinner>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list class=\"ion-padding\">\n    <ion-item>\n      <ion-thumbnail slot=\"start\">\n        <img class=\"imageProfile\" src=\"{{user?.photo ? user?.photo : defaultUser}}\">\n      </ion-thumbnail>\n      <ion-label class=\"ion-text-wrap\">\n        <ion-text color=\"dark\">\n          <ion-card-title>{{user.name + ' ' + user.lastName}} </ion-card-title>\n        </ion-text>\n        <p>{{user?.email ? user?.email : '_'}}</p>\n        <ion-text color=\"primary\">\n          <p class=\"ion-text-capitalize\"> Tipo: {{user.type}}</p>\n        </ion-text>\n      </ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label color=\"dark\" position=\"floating\"> <b>Nombre</b></ion-label>\n      <ion-input [value]=\"user.name\" type=\"text\" [disabled]=\"true\"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color=\"dark\" position=\"floating\"> <b>Apellido</b></ion-label>\n      <ion-input [value]=\"user.lastName\" type=\"text\" [disabled]=\"true\"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color=\"dark\" position='floating'><b>Cumpleaños</b></ion-label>\n      <ion-input [value]=\"user.birthDate\" type=\"date\" [disabled]=\"true\"></ion-input>\n    </ion-item>\n  </ion-list>\n  <div *ngIf=\"petList.length > 0\">\n    <ion-list-header>\n      <ion-label>Mascotas:</ion-label>\n    </ion-list-header>\n    <ion-item *ngFor=\"let pet of petList\">\n      <ion-avatar slot=\"start\">  <img [src]=\"pet.photo\"> </ion-avatar>\n      <ion-label>\n        <h3> {{pet.name}} </h3>\n        <p> {{pet.specie}}  {{pet.breed?'/ '+pet.breed:''}}  </p>\n      </ion-label>\n    </ion-item>\n  </div>\n</ion-content>";

/***/ }),

/***/ 65468:
/*!************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-manager.page.html?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = "<app-main-header title=\"Usuarios\"></app-main-header>\n\n<ion-content>\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n      <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" refreshingSpinner=\"dots\"></ion-refresher-content> \n    </ion-refresher>\n <ion-list>\n    <app-user-profile *ngFor=\"let user of userList\" [user]=\"user\" (click)=\"userDetail(user)\"></app-user-profile>\n </ion-list>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_administrator_user-manager_user-manager_module_ts.js.map