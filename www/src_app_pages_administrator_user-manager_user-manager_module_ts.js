"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_administrator_user-manager_user-manager_module_ts"],{

/***/ 76526:
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/profile-detail/profile-detail.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileDetailComponent": () => (/* binding */ ProfileDetailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _profile_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-detail.component.html?ngResource */ 57268);
/* harmony import */ var _profile_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-detail.component.scss?ngResource */ 1085);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/haptics.service */ 54387);








let ProfileDetailComponent = class ProfileDetailComponent {
    constructor(modal, alerts, vibe, users) {
        this.modal = modal;
        this.alerts = alerts;
        this.vibe = vibe;
        this.users = users;
        this.loading = false;
        this.upgrading = false;
        this.petList = [];
        this.defaultUser = '../../../../assets/profile/ProfileBlank.png';
        this.editUserForm = false;
        this.myCurrentUser = {
            CI: null,
            photo: null,
            email: null,
            phonePersonal: null,
            phoneHome: null,
            phoneWork: null,
            name: null,
            secondName: null,
            lastName: null,
            secondLastName: null,
            birthDate: null,
            type: null,
        };
        this.progress = 0;
        this.showCalendar = false;
        this.typeList = ['residente', 'empleado', 'administrador'];
    }
    ngOnInit() {
        console.log(this.user);
        this.myCurrentUser = this.user;
    }
    editUser() {
        if (this.editUserForm) {
            this.myCurrentUser = this.user;
            this.editUserForm = false;
        }
        else {
            this.editUserForm = true;
        }
    }
    CIListener(e) { this.myCurrentUser.CI = e.detail.value; }
    emailListener(e) { this.myCurrentUser.email = e.detail.value; }
    phonePersonalListener(e) { this.myCurrentUser.phonePersonal = e.detail.value; }
    phoneHomeListener(e) { this.myCurrentUser.phoneHome = e.detail.value; }
    phoneWorkListener(e) { this.myCurrentUser.phoneWork = e.detail.value; }
    nameListener(e) { this.myCurrentUser.name = e.detail.value; }
    secondNameListener(e) { this.myCurrentUser.secondName = e.detail.value; }
    lastNameListener(e) { this.myCurrentUser.lastName = e.detail.value; }
    secondLastNameListener(e) { this.myCurrentUser.secondLastName = e.detail.value; }
    showCalendar1() { this.showCalendar = !this.showCalendar; }
    changeScheduleTime(event) {
        this.showCalendar = false;
        this.myCurrentUser.birthDate = new Date(event).toISOString();
    }
    sendData() {
        if (this.user) {
            this.users.createUser(this.myCurrentUser);
        }
        else {
            this.users.updateUser(this.myCurrentUser);
        }
        this.alerts.showAlert('USUARIO', this.user ? 'Datos de ' + this.user.name + ' ' + this.user.lastName + ' han sido actualizados' : 'Nuevo usuario agregado', 'OK');
        this.loading = false;
        this.modal.dismiss(true);
        return 'done';
    }
};
ProfileDetailComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController },
    { type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__.AlertsService },
    { type: src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_4__.HapticsService },
    { type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_2__.UsersService }
];
ProfileDetailComponent.propDecorators = {
    user: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input }],
    currentUser: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input }]
};
ProfileDetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _user_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-manager.page.html?ngResource */ 65468);
/* harmony import */ var _user_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-manager.page.scss?ngResource */ 5731);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_pages_administrator_user_manager_profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/pages/administrator/user-manager/profile-detail/profile-detail.component */ 76526);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);
/* harmony import */ var src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/modules/spaces.service */ 59269);











let UserManagerPage = class UserManagerPage {
  constructor(users, spaces, modal, utility, routerOutlet, userCtrl) {
    this.users = users;
    this.spaces = spaces;
    this.modal = modal;
    this.utility = utility;
    this.routerOutlet = routerOutlet;
    this.userCtrl = userCtrl;
    this.loading = true;
    this.userList = [];
    this.fakeList = ["Rafael Bonilla", "Jorge Vela (Revival)", "Alba Vasques (2 reps.)", "Mario Duran", "Ana María Pachano", "Regina Tyson (KPMG del Ecuador)", "Francisca Cisneros", "Roger Valle (Plublistrategy S.A.)", "Yolanda Freile", "Francisca Cisneros (Bureau Group)", "Ronald Adamson (2 reps.)", "Soren Fredrick (INMORIDOVAL S.A.)", "Elsa Cordova", "Celia Varea (IES)", "Sylvia Busse (ABPRO)", "Jorge Mera (2 reps.)", "Lilia Cotter (QUITOIL)", "Liliana Roldan (Publiclaw)", "Elizabeth Borja (Intersalud)", "Diego Camacho (Trust Fiduciaria)", "Roberto Bueno"];
    this.unitListData = [[], ['OFICINA 0001'], ['OFICINA 0101', 'BODEGA #29', 'PARQUEO #27', 'PARQUEO #46', 'PARQUEO #47'], ['OFICINA 0102', 'BODEGA #25', 'PARQUEO #39', 'PARQUEO #40'], ['OFICINA 0201', 'BODEGA #26', 'PARQUEO #37', 'PARQUEO #38'], ['OFICINA 0202', 'BODEGA #24', 'PARQUEO #35', 'PARQUEO #36'], ['OFICINA 0301', 'OFICINA 0302', 'BODEGA #27', 'BODEGA #28', 'BODEGA #30', 'PARQUEO #42', 'PARQUEO #43', 'PARQUEO #44', 'PARQUEO #45'], ['OFICINA 0401', 'BODEGA #26', 'PARQUEO #33', 'PARQUEO #34'], ['OFICINA 0402', 'BODEGA #31', 'PARQUEO 28', 'PARQUEO #53'], ['OFICINA 501', 'BODEGA #18', 'PARQUEO #29', 'PARQUEO #30'], ['OFICINA 0502', 'BODEGA #22', 'PARQUEO #31', 'PARQUEO #32', 'PARQUEO #51'], ['OFICINA 0601', 'BODEGA #13', 'BODEGA #14', 'PARQUEO #26', 'PARQUEO #50'], ['OFICINA 0602', 'BODEGA #02', 'PARQUEO #01', 'PARQUEO #02', 'PARQUEO #25'], ['OFICINA 0701', 'BODEGA #01', 'PARQUEO #04', 'PARQUEO #05'], ['OFICINA 0702', 'BODEGA #17', 'PARQUEO #03', 'PARQUEO #06'], ['OFICINA 0801', 'BODEGA #04', 'BODEGA #10', 'PARQUEO #09', 'PARQUEO #10'], ['OFICINA 0802', 'BODEGA #05', 'PARQUEO #11', 'PARQUEO #15', 'PARQUEO #41'], ['OFICINA 0901', 'BODEGA #11', 'BODEGA #12', 'PARQUEO #16', 'PARQUEO #17'], ['OFICINA 0902', 'BODEGA #03', 'PARQUEO #07', 'PARQUEO #08', 'PARQUEO #48', 'PARQUEO #49'], ['OFICINA 1001', 'BODEGA #15', 'PARQUEO #21', 'PARQUEO #22', 'PARQUEO #52'], ['OFICINA 1002', 'BODEGA #16', 'PARQUEO #23', 'PARQUEO #24'], ['OFICINA 1101', 'BODEGA #09', 'BODEGA #19', 'BODEGA #20', 'BODEGA #23', 'PARQUEO #18', 'PARQUEO #19', 'PARQUEO #20', 'OFICINA 1102', 'BODEGA #06', 'BODEGA #07', 'BODEGA #08', 'PARQUEO #12', 'PARQUEO #13', 'PARQUEO #14']];
  }

  loadUsers() {
    var _this = this;

    return new Promise( /*#__PURE__*/function () {
      var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        _this.users.readAllUsers().then(list => {
          console.log(list);
          _this.userList = list;

          _this.userCtrl.loadUser().then(data => {
            _this.user = data.user;
            _this.currentUser = data.data;
          });

          resolve('ok');
        }).catch(error => {
          console.log(error);
          reject('error');
        });
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  ngOnInit() {
    this.loadUsers().then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

  userDetail(user) {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this2.modal.create({
        component: src_app_pages_administrator_user_manager_profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_3__.ProfileDetailComponent,
        componentProps: {
          user,
          currentUser: _this2.currentUser
        },
        mode: 'ios',
        presentingElement: _this2.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();

      if (modalResult.data) {
        _this2.loadUsers();
      }
    })();
  }

  newUser(user) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this3.modal.create({
        component: src_app_pages_administrator_user_manager_profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_3__.ProfileDetailComponent,
        componentProps: {
          user,
          currentUser: _this3.currentUser
        },
        mode: 'ios',
        presentingElement: _this3.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();

      if (modalResult.data) {
        _this3.loadUsers();
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

  newUserModal() {
    var _this4 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this4.modal.create({
        component: src_app_pages_administrator_user_manager_profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_3__.ProfileDetailComponent,
        componentProps: {
          user: null
        },
        mode: 'ios',
        presentingElement: _this4.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();

      if (modalResult.data) {
        _this4.loadUsers();
      }
    })();
  }

};

UserManagerPage.ctorParameters = () => [{
  type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_4__.UsersService
}, {
  type: src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_7__.SpacesService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
}, {
  type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_5__.VerificationFuncService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRouterOutlet
}, {
  type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_6__.UserController
}];

UserManagerPage = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
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

module.exports = ".ripple-parent {\n  position: relative;\n  overflow: hidden;\n}\n\n.profileCircle {\n  --border-radius: 50%;\n  --size: 40pt;\n  position: relative;\n}\n\n.cameraButton {\n  position: absolute;\n  background-color: var(--ion-color-medium);\n  top: 25pt;\n  left: 25pt;\n  width: 20pt;\n  height: 20pt;\n  font-size: 15pt;\n  border-radius: 50%;\n  padding: 2pt;\n}\n\n.uploadingImage {\n  position: absolute;\n  top: 10pt;\n  left: 10pt;\n}\n\n.imageProfile {\n  position: absolute;\n}\n\n.loadingImage {\n  position: absolute;\n  top: 41pt;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUtZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vUHJhY3RpY3VtJTIwNC9hdGhvc0FwcC9zcmMvYXBwL3BhZ2VzL2FkbWluaXN0cmF0b3IvdXNlci1tYW5hZ2VyL3Byb2ZpbGUtZGV0YWlsL3Byb2ZpbGUtZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0VBQ0EseUNBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtBQ0NKIiwiZmlsZSI6InByb2ZpbGUtZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJpcHBsZS1wYXJlbnQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ucHJvZmlsZUNpcmNsZXtcbiAgICAtLWJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAtLXNpemU6IDQwcHQ7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uY2FtZXJhQnV0dG9ue1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB0b3A6IDI1cHQ7XG4gICAgbGVmdDogMjVwdDtcbiAgICB3aWR0aDogMjBwdDtcbiAgICBoZWlnaHQ6IDIwcHQ7XG4gICAgZm9udC1zaXplOiAxNXB0O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwYWRkaW5nOiAycHQ7XG59XG5cbi51cGxvYWRpbmdJbWFnZXtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxMHB0O1xuICAgIGxlZnQ6IDEwcHQ7XG59XG5cbi5pbWFnZVByb2ZpbGV7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4ubG9hZGluZ0ltYWdle1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDQxcHQ7XG59IiwiLnJpcHBsZS1wYXJlbnQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5wcm9maWxlQ2lyY2xlIHtcbiAgLS1ib3JkZXItcmFkaXVzOiA1MCU7XG4gIC0tc2l6ZTogNDBwdDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uY2FtZXJhQnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgdG9wOiAyNXB0O1xuICBsZWZ0OiAyNXB0O1xuICB3aWR0aDogMjBwdDtcbiAgaGVpZ2h0OiAyMHB0O1xuICBmb250LXNpemU6IDE1cHQ7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgcGFkZGluZzogMnB0O1xufVxuXG4udXBsb2FkaW5nSW1hZ2Uge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTBwdDtcbiAgbGVmdDogMTBwdDtcbn1cblxuLmltYWdlUHJvZmlsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLmxvYWRpbmdJbWFnZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA0MXB0O1xufSJdfQ== */";

/***/ }),

/***/ 5731:
/*!************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-manager.page.scss?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = ".headerUserList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItbWFuYWdlci5wYWdlLnNjc3MiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9QcmFjdGljdW0lMjA0L2F0aG9zQXBwL3NyYy9hcHAvcGFnZXMvYWRtaW5pc3RyYXRvci91c2VyLW1hbmFnZXIvdXNlci1tYW5hZ2VyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDJDQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQ0NKIiwiZmlsZSI6InVzZXItbWFuYWdlci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVyVXNlckxpc3R7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYigxODcsIDE4NywgMTg3KTtcbiAgICBmb250LXNpemU6IDE1cHQ7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6IGJsYWNrO1xufSIsIi5oZWFkZXJVc2VyTGlzdCB7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XG4gIGZvbnQtc2l6ZTogMTVwdDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiBibGFjaztcbn0iXX0= */";

/***/ }),

/***/ 57268:
/*!**********************************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/profile-detail/profile-detail.component.html?ngResource ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button color=\"primary\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Atrás\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">{{user?user.name +' '+ user.lastName:'Nuevo Usuario'}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"!user || editUserForm\" color=\"success\" (click)=\"sendData()\" \n        [disabled]=\"loading && !myCurrentUser?.type && !myCurrentUser?.CI && !myCurrentUser?.name &&\n        !myCurrentUser?.secondName && !myCurrentUser?.lastName && !myCurrentUser?.birthDate &&\n        !myCurrentUser?.email && !myCurrentUser?.phonePersonal\n        \">\n          Enviar\n      </ion-button>\n      <ion-button *ngIf=\"user && currentUser?.type === 'administrador' && !editUserForm\" color=\"dark\" (click)=\"editUser()\">\n          Editar\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\" *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<ion-content *ngIf=\"!loading && user && !editUserForm\">\n  <app-user-detail [user]=\"null\" [userData]=\"user\" [editDataForm]=\"false\"></app-user-detail>\n</ion-content>\n\n<ion-content class=\"ion-padding\" *ngIf=\"!loading && (!user || editUserForm)\">\n  <ion-list>\n    <ion-item>\n      <ion-thumbnail *ngIf=\"!newImage\" slot=\"start\" class=\"profileCircle\">\n        <img class=\"imageProfile\" src=\"{{user?.photo ? user.photo : defaultUser}}\">\n      </ion-thumbnail>\n      <ion-thumbnail *ngIf=\"newImage\" slot=\"start\" class=\"profileCircle\">\n        <img src=\"{{newImage.webPath}}\">\n        <ion-spinner class=\"uploadingImage\" size=\"large\" name=\"circles\"></ion-spinner>\n        <ion-progress-bar class=\"loadingImage\" color=\"primary\" [value]=\"progress\"></ion-progress-bar>\n      </ion-thumbnail>\n      <ion-label class=\"ion-text-wrap\">\n        <ion-text color=\"dark\">\n          <ion-card-title>{{myCurrentUser ? myCurrentUser.name + ' ' + myCurrentUser.lastName : 'Cargando'}} <ion-spinner *ngIf=\"!myCurrentUser\" name=\"dots\"></ion-spinner></ion-card-title>\n        </ion-text>\n        <p>{{user?.email ? user?.email : '_'}}</p>\n        <ion-text color=\"primary\">\n          <p class=\"ion-text-capitalize\">Tipo: {{myCurrentUser?.type ? myCurrentUser?.type : '_'}}</p>\n        </ion-text>\n      </ion-label>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>Identificación:</ion-label>\n      <ion-input class=\"ion-text-center\" placeholder=\"Cédula o Pasaporte\" type=\"number\" maxlength=\"10\" (ionChange)=\"CIListener($event)\" [value]=\"myCurrentUser.CI\"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>Email:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" (ionChange)=\"emailListener($event)\" [value]=\"myCurrentUser.email\"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>Nombre:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"Primer Nombre\" (ionChange)=\"nameListener($event)\" [value]=\"myCurrentUser.name\"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>2º Nombre:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"\" (ionChange)=\"secondNameListener($event)\" [value]=\"myCurrentUser.secondName\"></ion-input>\n    </ion-item>\n    <div class=\"error-message\" *ngIf=\"!myCurrentUser.secondName\">\n      <ion-text class=\"ion-padding-start\" color=\"danger\"> \n        <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  Segundo Nombre Requerido\n      </ion-text>\n    </div>\n  \n    <ion-item>\n      <ion-label>Apellido:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"Primer Apellido\" (ionChange)=\"lastNameListener($event)\" [value]=\"myCurrentUser.lastName\"></ion-input>\n    </ion-item>\n    <div class=\"error-message\" *ngIf=\"!myCurrentUser.lastName\">\n      <ion-text class=\"ion-padding-start\" color=\"danger\"> \n        <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  Nombre Requerido\n      </ion-text>\n    </div>\n  \n    <ion-item>\n      <ion-label>2º Apellido:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"(Opcional)\" (ionChange)=\"secondLastNameListener($event)\" [value]=\"myCurrentUser.secondLastName\"></ion-input>\n    </ion-item>\n  \n    <ion-item (click)=\"showCalendar1()\">\n      <ion-label>Fecha de Nacimiento: </ion-label>\n      <ion-label class=\"ion-text-center\"> \n        <ion-text *ngIf=\"myCurrentUser.birthDate\" style=\"font-size: inherit; float: inherit;\">{{myCurrentUser.birthDate | timeFormat: 'DD/MM/YYYY'}}</ion-text>\n        <ion-text *ngIf=\"!myCurrentUser.birthDate\" style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit; float: right;\">(Selección fecha)</ion-text>\n      </ion-label>\n      <ion-button class=\"downArrow\" slot=\"end\" size=\"small\"><ion-icon style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit;\" name=\"caret-down-outline\"></ion-icon></ion-button>\n    </ion-item>\n    <ion-row *ngIf=\"showCalendar\">\n      <ion-col>\n        <ion-item>\n          <ion-datetime #datetime style=\"margin: 0 auto;\" presentation=\"date\" \n                [(ngModel)]=\"myCurrentUser.birthDate\" (ionChange)=\"changeScheduleTime(datetime.value)\">\n            <ion-buttons slot=\"buttons\">\n              <ion-button color=\"danger\" (click)=\"showCalendar1()\">Cancelar</ion-button>\n              <ion-button color=\"success\" (click)=\"datetime.confirm()\">OK</ion-button>\n            </ion-buttons>\n          </ion-datetime>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  \n    <ion-item>\n      <ion-label>Teléfono Principal:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"number\" placeholder=\"Para Emergencias\" (ionChange)=\"phonePersonalListener($event)\" [value]=\"myCurrentUser.phonePersonal\"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>Teléfono Secundario:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"Fijo o Trabajo\" (ionChange)=\"phoneHomeListener($event)\" [value]=\"myCurrentUser.phoneHome\"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>Teléfono Contacto:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"En caso de que no esté disponible\" (ionChange)=\"phoneWorkListener($event)\" [value]=\"myCurrentUser.phoneWork\"></ion-input>\n    </ion-item>\n  \n  </ion-list>\n</ion-content>";

/***/ }),

/***/ 65468:
/*!************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-manager.page.html?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = "<app-main-header title=\"Usuarios\"></app-main-header>\n\n<ion-content class=\"ion-padding\">\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n      <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" \n      refreshingSpinner=\"dots\"></ion-refresher-content> \n    </ion-refresher>\n    <app-loading-view *ngIf=\"loading\"></app-loading-view>\n    <div *ngIf=\"!loading && userList.length > 0\">\n      <ion-row class=\"headerUserList\">\n        <ion-col size=\"3\" class=\"ion-text-center\">Nombre</ion-col>\n        <ion-col size=\"3\" class=\"ion-text-center\">Espacio</ion-col>\n        <ion-col size=\"4\" class=\"ion-text-center\">Email</ion-col>\n        <ion-col size=\"2\" class=\"ion-text-center\">Tipo</ion-col>\n      </ion-row>\n      <app-item-user *ngFor=\"let user of userList\" [user]=\"user\" (click)=\"userDetail(user)\"></app-item-user>\n    </div>\n    <app-not-data-yet-message \n      *ngIf=\"userList.length == 0 && !loading\"\n      text=\"No tiene espacios aún\" icon=\"alert-circle-outline\"\n    ></app-not-data-yet-message>\n    \n    <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n      <ion-fab-button color=\"secondary\" (click)=\"newUserModal()\">\n        <ion-icon size=\"large\" name=\"add-outline\"></ion-icon>\n      </ion-fab-button>\n    </ion-fab>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_administrator_user-manager_user-manager_module_ts.js.map