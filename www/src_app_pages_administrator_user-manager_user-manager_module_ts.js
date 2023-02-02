"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_administrator_user-manager_user-manager_module_ts"],{

/***/ 22474:
/*!*****************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/billing-view/billing-view.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BillingViewComponent": () => (/* binding */ BillingViewComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _billing_view_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./billing-view.component.html?ngResource */ 25201);
/* harmony import */ var _billing_view_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./billing-view.component.scss?ngResource */ 96996);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_billing_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/billing.service */ 50317);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/spaces.service */ 59269);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);
/* harmony import */ var src_app_shared_components_bills_new_receipt_new_receipt_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/components/bills/new-receipt/new-receipt.component */ 11537);
/* harmony import */ var src_app_shared_components_view_sign_modal_sign_modal_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/components/view/sign-modal/sign-modal.component */ 8326);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/shared/utilities/time-handler */ 8123);














let BillingViewComponent = class BillingViewComponent {
  constructor(users, alerts, auth, spaces, modal, billing, time, routerOutlet) {
    this.users = users;
    this.alerts = alerts;
    this.auth = auth;
    this.spaces = spaces;
    this.modal = modal;
    this.billing = billing;
    this.time = time;
    this.routerOutlet = routerOutlet;
    this.billsList = [];
    this.loading = false;
    this.receiptDate = new Date().toISOString();
    this.receiptProgress = 0;
  }

  ngOnInit() {
    this.loading = true;
    this.receiptDate = this.time.getCurrentMonthStart(new Date());
    this.selectedMonth = this.time.getCurrentMonthStart(new Date());
    this.endMonth = this.time.getEndMonth(this.selectedMonth);
    this.loadData().then(() => {
      this.loading = false;
    });
  }

  nextMonth() {
    this.selectedMonth = this.time.getNextMonStart(this.selectedMonth);
    this.endMonth = this.time.getEndMonth(this.selectedMonth);
    this.loading = true;
    this.loadData().then(() => {
      this.loading = false;
    });
  }

  prevMonth() {
    this.selectedMonth = this.time.getPrevMonStart(this.selectedMonth);
    this.endMonth = this.time.getEndMonth(this.selectedMonth);
    this.loading = true;
    this.loadData().then(() => {
      this.loading = false;
    });
  }

  loadData() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.billsList = yield _this.billing.readMonthReceiptList(_this.selectedMonth, _this.endMonth);

        _this.auth.getUser().then(user => {
          _this.currentUser = user.data;
        });

        return 'done';
      } catch (error) {
        console.log(error);
      }
    })();
  }

  newReceiptModal(receipt) {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this2.modal.create({
        component: src_app_shared_components_bills_new_receipt_new_receipt_component__WEBPACK_IMPORTED_MODULE_7__.NewReceiptComponent,
        componentProps: {
          user: null,
          currentUser: _this2.currentUser,
          receipt
        },
        mode: 'ios',
        presentingElement: _this2.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();

      if (modalResult.data) {
        if (modalResult.data.action === 'payReceipt') {
          _this2.SignModal(receipt);
        } else {
          _this2.loadData();
        }
      }
    })();
  }

  SignModal(receipt) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this3.modal.create({
        component: src_app_shared_components_view_sign_modal_sign_modal_component__WEBPACK_IMPORTED_MODULE_8__.SignModalComponent,
        componentProps: {
          receipt,
          currentUser: _this3.currentUser
        },
        mode: 'ios',
        presentingElement: _this3.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();

      if (modalResult.data) {
        console.log(modalResult.data);

        if (modalResult.data.receipt) {
          const update = modalResult.data.receipt;
          let list = [];

          _this3.billsList.forEach(receipt => {
            if (update.uid === receipt.uid) {
              list.push(update);
            } else {
              list.push(receipt);
            }
          });

          _this3.billsList = list;
        }
      }
    })();
  }

  changeReceiptDate(event) {
    this.receiptDate = new Date(event).toISOString();
  }

  createListReceipt() {
    var _this4 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.loading = true;

      const selectedMonth = _this4.time.getCurrentMonthStart(_this4.receiptDate);

      const endMonth = _this4.time.getEndMonth(selectedMonth);

      let billsList = yield _this4.billing.readMonthReceiptList(selectedMonth, endMonth);

      if (billsList.length > 0) {
        _this4.selectedMonth = selectedMonth;
        _this4.endMonth = endMonth;
        _this4.billsList = billsList;
        _this4.loading = false;

        _this4.alerts.showAlert('RECIBOS MENSUALES', 'Se encontraron recibos de ' + _this4.time.getMonthName(_this4.receiptDate) + ', ya se encuentran generados.', 'OK');

        _this4.modal.dismiss();
      } else {
        const communities = yield _this4.spaces.readCommunityList();
        const list = yield _this4.users.readOnlyResidents();
        let lastNumber = communities[0].lastReceiptNumber;
        let listBills = [];

        for (let i = 0; i < list.length; i++) {
          lastNumber = i + 1 + communities[0].lastReceiptNumber;
          const bill = yield _this4.billing.generateReceipt(lastNumber, _this4.receiptDate, list[i], _this4.currentUser, [], []);
          _this4.receiptProgress = i / list.length;
          listBills.push(bill);
        }

        _this4.billsList = listBills;
        yield _this4.spaces.UpdateCommunity({ ...communities[0],
          lastReceiptNumber: lastNumber
        });

        _this4.alerts.showAlert('RECIBOS MENSUALES ' + _this4.time.getMonthName(_this4.receiptDate).toUpperCase(), list.length + ' nuevos recibos han sido generados', 'OK');

        _this4.selectedMonth = selectedMonth;
        _this4.endMonth = endMonth;

        _this4.modal.dismiss();

        _this4.receiptProgress = 0;

        _this4.loadData().then(() => {
          _this4.loading = false;
        });
      }
    })();
  }

  eraseBills() {
    var _this5 = this;

    this.billsList.forEach( /*#__PURE__*/function () {
      var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (item) {
        yield _this5.billing.eraseBill(item);
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  checkList() {
    var _this6 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let List = yield _this6.billing.readAllReceiptList();
      List.sort((a, b) => {
        return a.receiptNumber - b.receiptNumber;
      });
      console.log(List);
      let lastNumber = 0;

      for (let i = 0; i < List.length; i++) {
        /*
        lastNumber = (i+1)
        let update: Receipt = {...List[i], status:'Pendiente', receiptNumber: (i+1)}
        await this.billing.UpdateReceipt(update);
        console.log(update);
        */
        console.log(List[i].receiptNumber);
      } // await this.spaces.UpdateCommunity({...communities[0],lastReceiptNumber:lastNumber})

    })();
  }

};

BillingViewComponent.ctorParameters = () => [{
  type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_6__.UsersService
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_9__.AlertsService
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__.FireAuthService
}, {
  type: src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_5__.SpacesService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.ModalController
}, {
  type: src_app_core_services_modules_billing_service__WEBPACK_IMPORTED_MODULE_3__.BillingService
}, {
  type: src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_10__.TimeHandlerModule
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonRouterOutlet
}];

BillingViewComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
  selector: 'app-billing-view',
  template: _billing_view_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_billing_view_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], BillingViewComponent);


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
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _profile_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-detail.component.html?ngResource */ 57268);
/* harmony import */ var _profile_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-detail.component.scss?ngResource */ 90431);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/attachments.service */ 15909);
/* harmony import */ var src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/utilities/haptics.service */ 54387);










let ProfileDetailComponent = class ProfileDetailComponent {
  constructor(modal, alerts, images, vibe, users) {
    this.modal = modal;
    this.alerts = alerts;
    this.images = images;
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
      type: null
    };
    this.progress = 0;
    this.showCalendar = false;
    this.typeList = ['residente', 'empleado', 'administrador', 'inactivo'];
  }

  ngOnInit() {
    if (this.user) {
      this.myCurrentUser = this.user;
    }
  }

  editUser() {
    if (this.editUserForm) {
      this.myCurrentUser = this.user;
      this.editUserForm = false;
    } else {
      this.editUserForm = true;
    }
  }

  CIListener(e) {
    this.myCurrentUser.CI = e.detail.value;
  }

  emailListener(e) {
    this.myCurrentUser.email = e.detail.value;
  }

  phonePersonalListener(e) {
    this.myCurrentUser.phonePersonal = e.detail.value;
  }

  phoneHomeListener(e) {
    this.myCurrentUser.phoneHome = e.detail.value;
  }

  phoneWorkListener(e) {
    this.myCurrentUser.phoneWork = e.detail.value;
  }

  nameListener(e) {
    this.myCurrentUser.name = e.detail.value;
  }

  secondNameListener(e) {
    this.myCurrentUser.secondName = e.detail.value;
  }

  lastNameListener(e) {
    this.myCurrentUser.lastName = e.detail.value;
  }

  secondLastNameListener(e) {
    this.myCurrentUser.secondLastName = e.detail.value;
  }

  showCalendar1() {
    this.showCalendar = !this.showCalendar;
  }

  changeScheduleTime(event) {
    this.showCalendar = false;
    this.myCurrentUser.birthDate = new Date(event).toISOString();
  }

  typeHandler(e) {
    this.myCurrentUser.type = e.detail.value;
  }

  addPhoto() {
    var _this = this;

    if (this.user) {
      const options = {
        currentRoute: 'administrator/users',
        height: null,
        width: null,
        pdf: false
      };
      this.images.presentImageOptions(options).then( /*#__PURE__*/function () {
        var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (imageObj) {
          if (imageObj[0] !== undefined) {
            _this.newImage = imageObj[0];
          }
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }

  sendData() {
    if (this.user) {
      this.users.createUser(this.myCurrentUser);
    } else {
      this.users.updateUser(this.myCurrentUser);
    }

    this.alerts.showAlert('USUARIO', this.user ? 'Datos de ' + this.user.name + ' ' + this.user.lastName + ' han sido actualizados' : 'Nuevo usuario agregado', 'OK');
    this.loading = false;
    this.modal.dismiss({
      action: 'reload'
    });
    return 'done';
  }

  newReceipts() {
    this.modal.dismiss({
      action: 'receipt',
      user: this.user
    });
  }

  editSpaces() {
    this.modal.dismiss({
      action: 'spaces',
      user: this.currentUser
    });
  }

};

ProfileDetailComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_4__.AlertsService
}, {
  type: src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_5__.AttachmentsService
}, {
  type: src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_6__.HapticsService
}, {
  type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_3__.UsersService
}];

ProfileDetailComponent.propDecorators = {
  admin: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Input
  }],
  user: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Input
  }],
  currentUser: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Input
  }]
};
ProfileDetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-profile-detail',
  template: _profile_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_profile_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], ProfileDetailComponent);


/***/ }),

/***/ 44917:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-list/user-list.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserListComponent": () => (/* binding */ UserListComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _user_list_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-list.component.html?ngResource */ 82774);
/* harmony import */ var _user_list_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-list.component.scss?ngResource */ 94016);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);
/* harmony import */ var src_app_pages_administrator_user_manager_profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/pages/administrator/user-manager/profile-detail/profile-detail.component */ 76526);
/* harmony import */ var src_app_shared_components_assign_space_assign_space_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/components/assign-space/assign-space.component */ 49599);
/* harmony import */ var src_app_shared_utilities_loader_data_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/utilities/loader-data.service */ 51366);












let UserListComponent = class UserListComponent {
  constructor(users, router, modal, routerOutlet, userCtrl, call) {
    this.users = users;
    this.router = router;
    this.modal = modal;
    this.routerOutlet = routerOutlet;
    this.userCtrl = userCtrl;
    this.call = call;
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
    var _this = this;

    return new Promise( /*#__PURE__*/function () {
      var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        _this.userList = [];

        _this.users.readAllUsers().then(list => {
          _this.userList = _this.call.loadItems(list, _this.userList);
          _this.userList = list.sort(_this.sortByName);

          _this.userCtrl.loadUser().then(data => {
            _this.user = data.user;
            _this.currentUser = data.data;
            resolve('ok');
          });
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

  sortByName(a, b) {
    if (a.type < b.type) {
      return -1;
    }

    if (a.type > b.type) {
      return 1;
    }

    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }

    return 0;
  }

  userDetail(user) {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (user.uid === _this2.currentUser.uid) {
        _this2.router.navigateByUrl('administrator/profile');
      } else {
        const modal = yield _this2.modal.create({
          component: src_app_pages_administrator_user_manager_profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_5__.ProfileDetailComponent,
          componentProps: {
            user,
            currentUser: _this2.currentUser,
            admin: true
          },
          mode: 'ios',
          presentingElement: _this2.routerOutlet.nativeEl
        });
        modal.present();
        const modalResult = yield modal.onWillDismiss();
        console.log(modalResult.data);

        if (modalResult.data) {
          if (modalResult.data.action === 'reload') {
            _this2.loadUsers();
          } else if (modalResult.data.action === 'spaces') {
            _this2.editSpaces(user);
          }
        }
      }
    })();
  }

  editSpaces(user) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log(user);
      const modal = yield _this3.modal.create({
        component: src_app_shared_components_assign_space_assign_space_component__WEBPACK_IMPORTED_MODULE_6__.AssignSpaceComponent,
        componentProps: {
          userData: user
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

  newUser(user) {
    var _this4 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this4.modal.create({
        component: src_app_pages_administrator_user_manager_profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_5__.ProfileDetailComponent,
        componentProps: {
          user,
          currentUser: _this4.currentUser
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

  newUserModal() {
    var _this5 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this5.modal.create({
        component: src_app_pages_administrator_user_manager_profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_5__.ProfileDetailComponent,
        componentProps: {
          user: null,
          currentUser: _this5.currentUser
        },
        mode: 'ios',
        presentingElement: _this5.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();

      if (modalResult.data) {
        _this5.loadUsers();
      }
    })();
  }

};

UserListComponent.ctorParameters = () => [{
  type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_4__.UsersService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.Router
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRouterOutlet
}, {
  type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__.UserController
}, {
  type: src_app_shared_utilities_loader_data_service__WEBPACK_IMPORTED_MODULE_7__.LoaderDataService
}];

UserListComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
  selector: 'app-user-list',
  template: _user_list_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_user_list_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], UserListComponent);


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _user_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-manager-routing.module */ 63216);
/* harmony import */ var _user_manager_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-manager.page */ 40648);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);
/* harmony import */ var _profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile-detail/profile-detail.component */ 76526);
/* harmony import */ var _billing_view_billing_view_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./billing-view/billing-view.component */ 22474);
/* harmony import */ var _user_list_user_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-list/user-list.component */ 44917);











let UserManagerPageModule = class UserManagerPageModule {
};
UserManagerPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _user_manager_routing_module__WEBPACK_IMPORTED_MODULE_0__.UserManagerPageRoutingModule
        ],
        declarations: [
            _user_manager_page__WEBPACK_IMPORTED_MODULE_1__.UserManagerPage,
            _profile_detail_profile_detail_component__WEBPACK_IMPORTED_MODULE_3__.ProfileDetailComponent,
            _billing_view_billing_view_component__WEBPACK_IMPORTED_MODULE_4__.BillingViewComponent,
            _user_list_user_list_component__WEBPACK_IMPORTED_MODULE_5__.UserListComponent
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _user_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-manager.page.html?ngResource */ 76421);
/* harmony import */ var _user_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-manager.page.scss?ngResource */ 92320);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);





let UserManagerPage = class UserManagerPage {
    constructor(userCtrl) {
        this.userCtrl = userCtrl;
        this.selectedTab = 'users';
    }
    ngOnInit() {
    }
    segmentChanged(ev) {
        this.selectedTab = ev.detail.value;
    }
};
UserManagerPage.ctorParameters = () => [
    { type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_2__.UserController }
];
UserManagerPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-user-manager',
        template: _user_manager_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_user_manager_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], UserManagerPage);



/***/ }),

/***/ 51366:
/*!*********************************************************!*\
  !*** ./src/app/shared/utilities/loader-data.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoaderDataService": () => (/* binding */ LoaderDataService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


let LoaderDataService = class LoaderDataService {
    constructor() { }
    loadItems(oldItems, newItems) {
        if (newItems.length < oldItems.length) {
            return oldItems.concat(newItems);
        }
        else {
            return newItems;
        }
    }
    loadItemsRefresh(oldItems, newItems) {
        if (newItems.length < oldItems.length) {
            return oldItems.concat(newItems);
        }
        else {
            return newItems;
        }
    }
};
LoaderDataService.ctorParameters = () => [];
LoaderDataService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)({
        providedIn: 'root'
    })
], LoaderDataService);



/***/ }),

/***/ 96996:
/*!******************************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/billing-view/billing-view.component.scss?ngResource ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = ".headerUserList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbGxpbmctdmlldy5jb21wb25lbnQuc2NzcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL1ByYWN0aWN1bSUyMDQvYXRob3NBcHAvc3JjL2FwcC9wYWdlcy9hZG1pbmlzdHJhdG9yL3VzZXItbWFuYWdlci9iaWxsaW5nLXZpZXcvYmlsbGluZy12aWV3LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksMkNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FDQ0oiLCJmaWxlIjoiYmlsbGluZy12aWV3LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlclVzZXJMaXN0e1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XG4gICAgZm9udC1zaXplOiAxNXB0O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiBibGFjaztcbn0iLCIuaGVhZGVyVXNlckxpc3Qge1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiKDE4NywgMTg3LCAxODcpO1xuICBmb250LXNpemU6IDE1cHQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogYmxhY2s7XG59Il19 */";

/***/ }),

/***/ 90431:
/*!**********************************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/profile-detail/profile-detail.component.scss?ngResource ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = ".ripple-parent {\n  position: relative;\n  overflow: hidden;\n}\n\n.profileCircle {\n  --border-radius: 50%;\n  --size: 40pt;\n  position: relative;\n  margin: 0 auto;\n}\n\n.cameraButton {\n  position: absolute;\n  background-color: var(--ion-color-medium);\n  top: 25pt;\n  left: 25pt;\n  width: 20pt;\n  height: 20pt;\n  font-size: 15pt;\n  border-radius: 50%;\n  padding: 2pt;\n}\n\n.uploadingImage {\n  position: absolute;\n  top: 10pt;\n  left: 10pt;\n}\n\n.imageProfile {\n  position: absolute;\n}\n\n.loadingImage {\n  position: absolute;\n  top: 41pt;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUtZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vUHJhY3RpY3VtJTIwNC9hdGhvc0FwcC9zcmMvYXBwL3BhZ2VzL2FkbWluaXN0cmF0b3IvdXNlci1tYW5hZ2VyL3Byb2ZpbGUtZGV0YWlsL3Byb2ZpbGUtZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FDQ0o7O0FERUE7RUFDSSxrQkFBQTtFQUNBLHlDQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSxrQkFBQTtFQUNBLFNBQUE7QUNDSiIsImZpbGUiOiJwcm9maWxlLWRldGFpbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yaXBwbGUtcGFyZW50IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnByb2ZpbGVDaXJjbGV7XG4gICAgLS1ib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgLS1zaXplOiA0MHB0O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW46IDAgYXV0bztcbn1cblxuLmNhbWVyYUJ1dHRvbntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgdG9wOiAyNXB0O1xuICAgIGxlZnQ6IDI1cHQ7XG4gICAgd2lkdGg6IDIwcHQ7XG4gICAgaGVpZ2h0OiAyMHB0O1xuICAgIGZvbnQtc2l6ZTogMTVwdDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgcGFkZGluZzogMnB0O1xufVxuXG4udXBsb2FkaW5nSW1hZ2V7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMTBwdDtcbiAgICBsZWZ0OiAxMHB0O1xufVxuXG4uaW1hZ2VQcm9maWxle1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLmxvYWRpbmdJbWFnZXtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA0MXB0O1xufSIsIi5yaXBwbGUtcGFyZW50IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ucHJvZmlsZUNpcmNsZSB7XG4gIC0tYm9yZGVyLXJhZGl1czogNTAlO1xuICAtLXNpemU6IDQwcHQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5jYW1lcmFCdXR0b24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICB0b3A6IDI1cHQ7XG4gIGxlZnQ6IDI1cHQ7XG4gIHdpZHRoOiAyMHB0O1xuICBoZWlnaHQ6IDIwcHQ7XG4gIGZvbnQtc2l6ZTogMTVwdDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBwYWRkaW5nOiAycHQ7XG59XG5cbi51cGxvYWRpbmdJbWFnZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMHB0O1xuICBsZWZ0OiAxMHB0O1xufVxuXG4uaW1hZ2VQcm9maWxlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4ubG9hZGluZ0ltYWdlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDQxcHQ7XG59Il19 */";

/***/ }),

/***/ 94016:
/*!************************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-list/user-list.component.scss?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = ".headerUserList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItbGlzdC5jb21wb25lbnQuc2NzcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL1ByYWN0aWN1bSUyMDQvYXRob3NBcHAvc3JjL2FwcC9wYWdlcy9hZG1pbmlzdHJhdG9yL3VzZXItbWFuYWdlci91c2VyLWxpc3QvdXNlci1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksMkNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FDQ0oiLCJmaWxlIjoidXNlci1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlclVzZXJMaXN0e1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XG4gICAgZm9udC1zaXplOiAxNXB0O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiBibGFjaztcbn0iLCIuaGVhZGVyVXNlckxpc3Qge1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiKDE4NywgMTg3LCAxODcpO1xuICBmb250LXNpemU6IDE1cHQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogYmxhY2s7XG59Il19 */";

/***/ }),

/***/ 92320:
/*!************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-manager.page.scss?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = ".headerUserList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItbWFuYWdlci5wYWdlLnNjc3MiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9QcmFjdGljdW0lMjA0L2F0aG9zQXBwL3NyYy9hcHAvcGFnZXMvYWRtaW5pc3RyYXRvci91c2VyLW1hbmFnZXIvdXNlci1tYW5hZ2VyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDJDQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQ0NKIiwiZmlsZSI6InVzZXItbWFuYWdlci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVyVXNlckxpc3R7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYigxODcsIDE4NywgMTg3KTtcbiAgICBmb250LXNpemU6IDE1cHQ7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6IGJsYWNrO1xufSIsIi5oZWFkZXJVc2VyTGlzdCB7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XG4gIGZvbnQtc2l6ZTogMTVwdDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiBibGFjaztcbn0iXX0= */";

/***/ }),

/***/ 25201:
/*!******************************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/billing-view/billing-view.component.html?ngResource ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <ion-row *ngIf=\"!loading\">\n    <ion-col>\n      <div class=\"ion-float-end\">\n        <ion-button (click)=\"prevMonth()\" size=\"small\">{{'< Anterior '}}</ion-button>\n      </div>\n    </ion-col>\n    <ion-col class=\"ion-text-center\">\n      <ion-label class=\"ion-text-uppercase iom-margin-top\">{{selectedMonth | timeFormat: 'MonthDisplay'}}</ion-label>\n    </ion-col>\n    <ion-col class=\"ion-float-start\">\n      <div>\n        <ion-button (click)=\"nextMonth()\" size=\"small\">{{' Siguiente >'}}</ion-button>\n      </div>\n    </ion-col>\n  </ion-row>\n  <app-loading-view *ngIf=\"loading\"></app-loading-view>\n\n<app-not-data-yet-message \n  *ngIf=\"billsList.length == 0 && !loading\"\n  text=\"No tienes recibos aún\" icon=\"alert-circle-outline\"\n></app-not-data-yet-message>\n\n<ion-list *ngIf=\"!loading && billsList.length > 0\">\n  <ion-row class=\"headerUserList\">\n    <ion-col size=\"4\" class=\"ion-text-center\">Residente</ion-col>\n    <ion-col size=\"1\" class=\"ion-text-center\">Items</ion-col>\n    <ion-col size=\"3\" class=\"ion-text-center\">Total</ion-col>\n    <ion-col size=\"4\" class=\"ion-text-center\">Status</ion-col>\n  </ion-row>\n  <app-receipt-item *ngFor=\"let receipt of billsList\" [receipt]=\"receipt\" (click)=\"newReceiptModal(receipt)\"></app-receipt-item>\n</ion-list>\n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" id=\"open-modal\" >\n      <ion-icon size=\"large\" name=\"receipt-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n\n  <ion-modal #modal trigger=\"open-modal\" [initialBreakpoint]=\"0.6\" [breakpoints]=\"[0, 0.6]\">\n    <ng-template>\n      <ion-content class=\" ion-padding\">\n        <ion-list>\n          <ion-list-header>\n            <ion-label>Generador de Recibos</ion-label>\n          </ion-list-header>\n          <p *ngIf=\"receiptProgress > 0\">Generando Recibos...</p>\n          <ion-progress-bar *ngIf=\"receiptProgress > 0\" [value]=\"receiptProgress\"></ion-progress-bar>\n          <p *ngIf=\"receiptProgress === 0\">Se genera una lista de recibos para todos los residentes existentes. Seleccione el mes y año de los recibos que desea crear:</p>\n          <ion-item *ngIf=\"receiptProgress === 0\">\n            <ion-datetime #datetime style=\"margin: 0 auto;\" [value]=\"receiptDate\" (ionChange)=\"changeReceiptDate(datetime.value)\" presentation=\"month-year\"></ion-datetime>\n          </ion-item>\n          <ion-row>\n            <ion-col>\n              <ion-button color=\"danger\" expand=\"block\" (click)=\"modal.dismiss()\" [disabled]=\"receiptProgress > 0\">Cancelar</ion-button>\n            </ion-col>\n            <ion-col>\n              <ion-button expand=\"block\" (click)=\"createListReceipt()\" [disabled]=\"receiptProgress > 0\">Crear Recibos</ion-button>\n            </ion-col>\n          </ion-row>\n        </ion-list>\n      </ion-content>\n    </ng-template>\n  </ion-modal>\n</ion-content>";

/***/ }),

/***/ 57268:
/*!**********************************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/profile-detail/profile-detail.component.html?ngResource ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button color=\"primary\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Atrás\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">{{user?user.name +' '+ user.lastName:'Nuevo Usuario'}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"!user || editUserForm\" color=\"success\" (click)=\"sendData()\" \n        [disabled]=\"loading && !myCurrentUser?.type && !myCurrentUser?.CI && !myCurrentUser?.name &&\n        !myCurrentUser?.secondName && !myCurrentUser?.lastName && !myCurrentUser?.birthDate &&\n        !myCurrentUser?.email && !myCurrentUser?.phonePersonal\n        \">\n          Enviar\n      </ion-button>\n      <ion-button *ngIf=\"user && currentUser?.type === 'administrador' && !editUserForm\" color=\"dark\" (click)=\"editUser()\">\n          Editar\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\" *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<ion-content *ngIf=\"!loading && user && !editUserForm\">\n  <app-user-detail [user]=\"null\" [userData]=\"user\" [editDataForm]=\"false\"></app-user-detail>\n</ion-content>\n\n<ion-content class=\"ion-padding\" *ngIf=\"!loading && (!user || editUserForm)\">\n  <ion-list>\n    <ion-item *ngIf=\"!user\">\n      <ion-thumbnail size=\"large\" *ngIf=\"!newImage\" class=\"profileCircle\"(click)=\"addPhoto()\">\n        <img class=\"imageProfile\" src=\"{{defaultUser}}\">\n        <div class=\"cameraButton\" *ngIf=\"user\">\n          <ion-icon name=\"camera-outline\" color=\"light\"></ion-icon>\n        </div>\n      </ion-thumbnail>\n      <ion-thumbnail size=\"large\" *ngIf=\"newImage\" class=\"profileCircle\" (click)=\"addPhoto()\">\n        <img src=\"{{newImage.webPath}}\">\n        <ion-spinner class=\"uploadingImage\" size=\"large\" name=\"circles\"></ion-spinner>\n        <ion-progress-bar class=\"loadingImage\" color=\"primary\" [value]=\"progress\"></ion-progress-bar>\n      </ion-thumbnail>\n    </ion-item>\n    <ion-item *ngIf=\"user\">\n      <ion-thumbnail *ngIf=\"!newImage\" slot=\"start\" class=\"profileCircle\">\n        <img class=\"imageProfile\" src=\"{{user?.photo ? user.photo : defaultUser}}\">\n      </ion-thumbnail>\n      <ion-thumbnail *ngIf=\"newImage\" slot=\"start\" class=\"profileCircle\">\n        <img src=\"{{newImage.webPath}}\">\n        <ion-spinner class=\"uploadingImage\" size=\"large\" name=\"circles\"></ion-spinner>\n        <ion-progress-bar class=\"loadingImage\" color=\"primary\" [value]=\"progress\"></ion-progress-bar>\n      </ion-thumbnail>\n      <ion-label class=\"ion-text-wrap\">\n        <ion-text color=\"dark\">\n          <ion-card-title>{{myCurrentUser ? myCurrentUser.name + ' ' + myCurrentUser.lastName : 'Cargando'}} <ion-spinner *ngIf=\"!myCurrentUser\" name=\"dots\"></ion-spinner></ion-card-title>\n        </ion-text>\n        <p>{{user?.email ? user?.email : '_'}}</p>\n        <ion-text color=\"primary\">\n          <p class=\"ion-text-capitalize\">Tipo: {{myCurrentUser?.type ? myCurrentUser?.type : '_'}}</p>\n        </ion-text>\n      </ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Tipo de Usuario</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"myCurrentUser.type\" (ionChange)=\"typeHandler($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let type of typeList\" [value]=\"type\"> {{type}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>Identificación:</ion-label>\n      <ion-input class=\"ion-text-center\" placeholder=\"Cédula o Pasaporte\" type=\"number\" maxlength=\"10\" (ionChange)=\"CIListener($event)\" [value]=\"myCurrentUser.CI\"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>Email:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" (ionChange)=\"emailListener($event)\" [value]=\"myCurrentUser.email\"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>Nombre:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"Primer Nombre\" (ionChange)=\"nameListener($event)\" [value]=\"myCurrentUser.name\"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>2º Nombre:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"\" (ionChange)=\"secondNameListener($event)\" [value]=\"myCurrentUser.secondName\"></ion-input>\n    </ion-item>\n    <div class=\"error-message\" *ngIf=\"!myCurrentUser.secondName\">\n      <ion-text class=\"ion-padding-start\" color=\"danger\"> \n        <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  Segundo Nombre Requerido\n      </ion-text>\n    </div>\n  \n    <ion-item>\n      <ion-label>Apellido:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"Primer Apellido\" (ionChange)=\"lastNameListener($event)\" [value]=\"myCurrentUser.lastName\"></ion-input>\n    </ion-item>\n    <div class=\"error-message\" *ngIf=\"!myCurrentUser.lastName\">\n      <ion-text class=\"ion-padding-start\" color=\"danger\"> \n        <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  Nombre Requerido\n      </ion-text>\n    </div>\n  \n    <ion-item>\n      <ion-label>2º Apellido:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"(Opcional)\" (ionChange)=\"secondLastNameListener($event)\" [value]=\"myCurrentUser.secondLastName\"></ion-input>\n    </ion-item>\n  \n    <ion-item (click)=\"showCalendar1()\">\n      <ion-label>Fecha de Nacimiento: </ion-label>\n      <ion-label class=\"ion-text-center\"> \n        <ion-text *ngIf=\"myCurrentUser.birthDate\" style=\"font-size: inherit; float: inherit;\">{{myCurrentUser.birthDate | timeFormat: 'DD/MM/YYYY'}}</ion-text>\n        <ion-text *ngIf=\"!myCurrentUser.birthDate\" style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit; float: right;\">(Selección fecha)</ion-text>\n      </ion-label>\n      <ion-button class=\"downArrow\" slot=\"end\" size=\"small\"><ion-icon style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit;\" name=\"caret-down-outline\"></ion-icon></ion-button>\n    </ion-item>\n    <ion-row *ngIf=\"showCalendar\">\n      <ion-col>\n        <ion-item>\n          <ion-datetime #datetime style=\"margin: 0 auto;\" presentation=\"date\" \n                [(ngModel)]=\"myCurrentUser.birthDate\" (ionChange)=\"changeScheduleTime(datetime.value)\">\n            <ion-buttons slot=\"buttons\">\n              <ion-button color=\"danger\" (click)=\"showCalendar1()\">Cancelar</ion-button>\n              <ion-button color=\"success\" (click)=\"datetime.confirm()\">OK</ion-button>\n            </ion-buttons>\n          </ion-datetime>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  \n    <ion-item>\n      <ion-label>Teléfono Principal:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"number\" placeholder=\"Para Emergencias\" (ionChange)=\"phonePersonalListener($event)\" [value]=\"myCurrentUser.phonePersonal\"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>Teléfono Secundario:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"Fijo o Trabajo\" (ionChange)=\"phoneHomeListener($event)\" [value]=\"myCurrentUser.phoneHome\"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label>Teléfono Contacto:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"En caso de que no esté disponible\" (ionChange)=\"phoneWorkListener($event)\" [value]=\"myCurrentUser.phoneWork\"></ion-input>\n    </ion-item>\n  \n  </ion-list>\n</ion-content>\n<ion-footer *ngIf=\"admin && !editUserForm && myCurrentUser?.type === 'residente'\">\n  <ion-toolbar>\n    <ion-button color=\"tertiary\" expand=\"full\" (click)=\"editSpaces()\">Editar Espacios</ion-button>\n  </ion-toolbar>\n</ion-footer>";

/***/ }),

/***/ 82774:
/*!************************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-list/user-list.component.html?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" style=\"background-color: gray;\">\n    <ion-refresher-content pullingIcon=\"arrow-down\" pullingText=\"Desliza abajo para refrescar...\" \n    refreshingSpinner=\"dots\"></ion-refresher-content> \n  </ion-refresher>\n  <app-loading-view *ngIf=\"loading\"></app-loading-view>\n  <div *ngIf=\"!loading && userList.length > 0\">\n    <ion-row class=\"headerUserList\">\n      <ion-col size=\"3\" class=\"ion-text-center\">Nombre</ion-col>\n      <ion-col size=\"3\" class=\"ion-text-center\">Espacio</ion-col>\n      <ion-col size=\"4\" class=\"ion-text-center\">Email</ion-col>\n      <ion-col size=\"2\" class=\"ion-text-center\">Tipo</ion-col>\n    </ion-row>\n    <app-item-user *ngFor=\"let user of userList\" [user]=\"user\" (click)=\"userDetail(user)\"></app-item-user>\n  </div>\n  <app-not-data-yet-message \n    *ngIf=\"userList.length == 0 && !loading\"\n    text=\"No tiens usuarios aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" (click)=\"newUserModal()\">\n      <ion-icon size=\"large\" color=\"dark\" name=\"person-add-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>";

/***/ }),

/***/ 76421:
/*!************************************************************************************!*\
  !*** ./src/app/pages/administrator/user-manager/user-manager.page.html?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"userCtrl.platform !== 'web'\">\n  <app-main-header *ngIf=\"selectedTab === 'users'\" title=\"Usuarios\"></app-main-header>\n  <app-main-header *ngIf=\"selectedTab === 'payments'\" title=\"Pagos\"></app-main-header>\n</div>\n<ion-toolbar>\n  <ion-segment (ionChange)=\"segmentChanged($event)\" value=\"users\">\n    <ion-segment-button value=\"users\" layout=\"icon-start\">\n      <ion-label>Usuarios</ion-label>\n      <ion-icon name=\"people-outline\"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value=\"payments\" layout=\"icon-start\">\n      <ion-label>Pagos</ion-label>\n      <ion-icon name=\"card-outline\"></ion-icon>\n    </ion-segment-button>\n  </ion-segment>\n</ion-toolbar>\n\n<app-user-list *ngIf=\"selectedTab === 'users'\" style=\"height: 100%\"></app-user-list>\n<app-billing-view *ngIf=\"selectedTab === 'payments'\" style=\"height: 100%\"></app-billing-view>\n\n\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_administrator_user-manager_user-manager_module_ts.js.map