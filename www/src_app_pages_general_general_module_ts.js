"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_general_general_module_ts"],{

/***/ 95219:
/*!****************************************************************************!*\
  !*** ./src/app/pages/general/forgot-password/forgot-password.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ForgotPasswordComponent": () => (/* binding */ ForgotPasswordComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _forgot_password_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forgot-password.component.html?ngResource */ 34357);
/* harmony import */ var _forgot_password_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forgot-password.component.scss?ngResource */ 38971);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_route_history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/route-history */ 46147);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);










let ForgotPasswordComponent = class ForgotPasswordComponent {
    constructor(formBuilder, router, auth, verification, history, alert) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.auth = auth;
        this.verification = verification;
        this.history = history;
        this.alert = alert;
        this.block = false;
        this.loading = false;
        this.validateCode = false;
        this.validationMessages = {
            email: [
                { type: 'required', message: 'Email requerido' },
                { type: 'email', message: 'Formato incorrecto' }
            ]
        };
        this.emailForm = this.formBuilder.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.email
            ]))
        });
    }
    ngOnInit() {
    }
    EnterSubmit(evt, form) {
        this.verification.EnterSubmit(evt, form, this.loading).then(answer => {
            if (answer) {
                this.enviarEmail(this.emailForm.value);
            }
        });
    }
    enviarEmail(form) {
        this.auth.forgotPassword(this.emailForm.value.email).then((done) => {
            console.log(done);
            this.alert.showAlert('', done + this.emailForm.value.email, 'OK').then(() => {
                this.router.navigateByUrl('general/login');
            });
        }).catch(error => { this.messageError = error; });
    }
    cancel() {
        this.messageError = '';
        this.router.navigateByUrl('general/login');
    }
};
ForgotPasswordComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormBuilder },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router },
    { type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_2__.FireAuthService },
    { type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_5__.VerificationFuncService },
    { type: src_app_shared_utilities_route_history__WEBPACK_IMPORTED_MODULE_4__.RouteHistoryService },
    { type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__.AlertsService }
];
ForgotPasswordComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-forgot-password',
        template: _forgot_password_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_forgot_password_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ForgotPasswordComponent);



/***/ }),

/***/ 92892:
/*!*********************************************************!*\
  !*** ./src/app/pages/general/general-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeneralPageRoutingModule": () => (/* binding */ GeneralPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ 95219);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login/login.component */ 23956);
/* harmony import */ var _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sign-up/sign-up.component */ 95090);
/* harmony import */ var _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./verify-email/verify-email.component */ 50717);







const routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_1__.LoginComponent
    },
    {
        path: 'forgot-password',
        component: _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_0__.ForgotPasswordComponent
    },
    {
        path: 'signup',
        component: _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_2__.SignUpComponent
    },
    {
        path: 'verify-email/:email',
        component: _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_3__.VerifyEmailComponent
    }
];
let GeneralPageRoutingModule = class GeneralPageRoutingModule {
};
GeneralPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule],
    })
], GeneralPageRoutingModule);



/***/ }),

/***/ 13387:
/*!*************************************************!*\
  !*** ./src/app/pages/general/general.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeneralPageModule": () => (/* binding */ GeneralPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _general_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general-routing.module */ 92892);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login/login.component */ 23956);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ 95219);
/* harmony import */ var _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sign-up/sign-up.component */ 95090);
/* harmony import */ var _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./verify-email/verify-email.component */ 50717);











let GeneralPageModule = class GeneralPageModule {
};
GeneralPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule,
            _general_routing_module__WEBPACK_IMPORTED_MODULE_0__.GeneralPageRoutingModule
        ],
        declarations: [
            _login_login_component__WEBPACK_IMPORTED_MODULE_1__.LoginComponent,
            _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_3__.ForgotPasswordComponent,
            _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_4__.SignUpComponent,
            _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_5__.VerifyEmailComponent
        ]
    })
], GeneralPageModule);



/***/ }),

/***/ 23956:
/*!********************************************************!*\
  !*** ./src/app/pages/general/login/login.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _login_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component.html?ngResource */ 39928);
/* harmony import */ var _login_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.component.scss?ngResource */ 1062);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_shared_utilities_route_history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/route-history */ 46147);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);









let LoginComponent = class LoginComponent {
    constructor(formBuilder, router, auth, verification, history) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.auth = auth;
        this.verification = verification;
        this.history = history;
        this.block = false;
        this.loading = true;
        this.validateCode = false;
    }
    ngOnInit() {
        this.validationMessages = {
            email: [
                { type: 'required', message: 'Email requerido' },
                { type: 'email', message: 'Formato incorrecto' }
            ],
            password: [
                { type: 'required', message: 'Contraseña requerida' },
            ]
        };
        this.loginForm = this.formBuilder.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.email
            ])),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required
            ]))
        });
        this.loading = true;
        this.auth.refreshUser()
            .then((login) => {
            if (login) {
                setTimeout(() => { this.loading = false; }, 5000);
            }
            else {
                this.loading = false;
            }
        });
    }
    EnterSubmit(evt, form) {
        this.verification.EnterSubmit(evt, form, this.loading).then(answer => {
            if (answer) {
                this.loginProcess(this.loginForm.value);
            }
        }).catch(error => {
            this.messageError = error;
            this.loading = false;
        });
    }
    loginProcess(form) {
        this.messageError = '';
        this.loading = true;
        this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
            .then(() => { setTimeout(() => { this.loading = false; }, 3000); })
            .catch(error => {
            this.messageError = error;
            this.loading = false;
        });
    }
    forgotPassword() {
        this.router.navigateByUrl('general/forgot-password');
    }
    registrase() {
        this.router.navigateByUrl('general/signup');
    }
};
LoginComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router },
    { type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_2__.FireAuthService },
    { type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_4__.VerificationFuncService },
    { type: src_app_shared_utilities_route_history__WEBPACK_IMPORTED_MODULE_3__.RouteHistoryService }
];
LoginComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-login',
        template: _login_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_login_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], LoginComponent);



/***/ }),

/***/ 95090:
/*!************************************************************!*\
  !*** ./src/app/pages/general/sign-up/sign-up.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignUpComponent": () => (/* binding */ SignUpComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _sign_up_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign-up.component.html?ngResource */ 4357);
/* harmony import */ var _sign_up_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sign-up.component.scss?ngResource */ 17938);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_core_services_firestore_actions_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/firestore-actions.service */ 14871);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_route_history__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/utilities/route-history */ 46147);
/* harmony import */ var src_app_shared_utilities_validators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/utilities/validators */ 57916);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);













let SignUpComponent = class SignUpComponent {
  constructor(formBuilder, router, verification, history, auth, action, alert) {
    this.formBuilder = formBuilder;
    this.router = router;
    this.verification = verification;
    this.history = history;
    this.auth = auth;
    this.action = action;
    this.alert = alert;
    this.block = false;
    this.loading = false;
    this.validateCode = false;
  }

  ngOnInit() {
    this.validationMessages = {
      email: [{
        type: 'required',
        message: 'El email es requerido'
      }, {
        type: 'email',
        message: 'El email tiene formato incorrecto'
      }]
    };
    this.signUpForm = this.formBuilder.group({
      email: [null, {
        validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.email]
      }],
      password1: [null, {
        validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(8), src_app_shared_utilities_validators__WEBPACK_IMPORTED_MODULE_7__.min1digit, src_app_shared_utilities_validators__WEBPACK_IMPORTED_MODULE_7__.min1lowercase, src_app_shared_utilities_validators__WEBPACK_IMPORTED_MODULE_7__.min1uppercase, src_app_shared_utilities_validators__WEBPACK_IMPORTED_MODULE_7__.min1specialCharacter]
      }],
      password2: [null, {
        validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required]
      }]
    }, {
      validators: [(0,src_app_shared_utilities_validators__WEBPACK_IMPORTED_MODULE_7__.compareValidator)('password1', 'password2')]
    });
  }

  EnterSubmit(evt, form) {
    this.verification.EnterSubmit(evt, form, this.loading).then(answer => {
      if (answer) {
        this.signProcess(this.signUpForm.value);
      }
    });
  }

  signProcess(form) {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.messageError = '';
        _this.loading = true;

        _this.auth.registerUser(form.email, form.password1).then(user => {
          _this.auth.verifyEmail().then(verify => {
            _this.loading = false;

            _this.alert.showAlert('', verify, 'OK').then(() => {
              _this.router.navigateByUrl('general/verify-email/' + user.email);
            });
          });
        });
      } catch (error) {
        _this.messageError = error;
        _this.loading = false;
      }
    })();
  }

  cancel() {
    this.messageError = '';
    this.router.navigateByUrl('general/login');
  }

};

SignUpComponent.ctorParameters = () => [{
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_10__.Router
}, {
  type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_8__.VerificationFuncService
}, {
  type: src_app_shared_utilities_route_history__WEBPACK_IMPORTED_MODULE_6__.RouteHistoryService
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__.FireAuthService
}, {
  type: src_app_core_services_firestore_actions_service__WEBPACK_IMPORTED_MODULE_3__.FirestoreActionsService
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__.AlertsService
}];

SignUpComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
  selector: 'app-sign-up',
  template: _sign_up_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_sign_up_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], SignUpComponent);


/***/ }),

/***/ 50717:
/*!**********************************************************************!*\
  !*** ./src/app/pages/general/verify-email/verify-email.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VerifyEmailComponent": () => (/* binding */ VerifyEmailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _verify_email_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./verify-email.component.html?ngResource */ 43108);
/* harmony import */ var _verify_email_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./verify-email.component.scss?ngResource */ 82198);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);







let VerifyEmailComponent = class VerifyEmailComponent {
    constructor(routerParams, router, auth, alerts) {
        this.routerParams = routerParams;
        this.router = router;
        this.auth = auth;
        this.alerts = alerts;
        this.loading = false;
        this.errorMessage = '';
    }
    ngOnInit() {
        if (this.routerParams.snapshot.params.email) {
            this.email = this.routerParams.snapshot.params.email;
        }
    }
    resendEmail() {
        this.loading = true;
        this.errorMessage = '';
        this.auth.verifyEmail().then((done) => {
            this.loading = false;
            this.alerts.showAlert('', done + ' a ' + this.email, 'OK');
        }).catch(error => { this.errorMessage = error; });
    }
    checkUser() {
        this.loading = true;
        this.errorMessage = '';
        this.loading = true;
        this.auth.reCheckUser().then((done) => {
            if (done) {
                if (!done.user.emailVerified) {
                    this.alerts.showAlert('', 'El email: ' + this.email + ' aun no ha sido verificado', 'OK');
                }
                setTimeout(() => { this.loading = false; }, 5000);
            }
            else {
                this.loading = false;
            }
            this.loading = false;
        }).catch(e => { this.loading = false; });
    }
    cancel() {
        this.loading = true;
        this.errorMessage = '';
        this.auth.signOut().then(done => {
            this.loading = false;
            this.router.navigateByUrl('general/login');
        });
    }
};
VerifyEmailComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router },
    { type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_2__.FireAuthService },
    { type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__.AlertsService }
];
VerifyEmailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-verify-email',
        template: _verify_email_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_verify_email_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], VerifyEmailComponent);



/***/ }),

/***/ 46147:
/*!***************************************************!*\
  !*** ./src/app/shared/utilities/route-history.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RouteHistoryService": () => (/* binding */ RouteHistoryService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


let RouteHistoryService = class RouteHistoryService {
    constructor() { }
    goBack() {
    }
};
RouteHistoryService.ctorParameters = () => [];
RouteHistoryService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)({
        providedIn: 'root'
    })
], RouteHistoryService);



/***/ }),

/***/ 57916:
/*!************************************************!*\
  !*** ./src/app/shared/utilities/validators.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrayAtLeastOneIf": () => (/* binding */ arrayAtLeastOneIf),
/* harmony export */   "arrayAtLeastOneIfNot": () => (/* binding */ arrayAtLeastOneIfNot),
/* harmony export */   "arrayAtLeastOneIsRequired": () => (/* binding */ arrayAtLeastOneIsRequired),
/* harmony export */   "compareValidator": () => (/* binding */ compareValidator),
/* harmony export */   "customValidatorAtLeastAControlSet": () => (/* binding */ customValidatorAtLeastAControlSet),
/* harmony export */   "customValidatorCompareDateBetweenStaticValues": () => (/* binding */ customValidatorCompareDateBetweenStaticValues),
/* harmony export */   "customValidatorCompareDateGreaterThan": () => (/* binding */ customValidatorCompareDateGreaterThan),
/* harmony export */   "customValidatorCompareDateGreaterThanPlusNDays": () => (/* binding */ customValidatorCompareDateGreaterThanPlusNDays),
/* harmony export */   "customValidatorCompareTimeGreaterThan": () => (/* binding */ customValidatorCompareTimeGreaterThan),
/* harmony export */   "customValidatorDateOffSetNotGreatherThan": () => (/* binding */ customValidatorDateOffSetNotGreatherThan),
/* harmony export */   "customValidatorNotEqualTo": () => (/* binding */ customValidatorNotEqualTo),
/* harmony export */   "customValidatorTimeRange": () => (/* binding */ customValidatorTimeRange),
/* harmony export */   "imageMinMaxResolution": () => (/* binding */ imageMinMaxResolution),
/* harmony export */   "maxFileSize": () => (/* binding */ maxFileSize),
/* harmony export */   "min1digit": () => (/* binding */ min1digit),
/* harmony export */   "min1lowercase": () => (/* binding */ min1lowercase),
/* harmony export */   "min1specialCharacter": () => (/* binding */ min1specialCharacter),
/* harmony export */   "min1uppercase": () => (/* binding */ min1uppercase),
/* harmony export */   "requireAgeGroupToBeOver": () => (/* binding */ requireAgeGroupToBeOver),
/* harmony export */   "requireAgeGroupToBeUnder": () => (/* binding */ requireAgeGroupToBeUnder),
/* harmony export */   "requiredIf": () => (/* binding */ requiredIf),
/* harmony export */   "requiredIf2": () => (/* binding */ requiredIf2),
/* harmony export */   "requiredIfNot": () => (/* binding */ requiredIfNot),
/* harmony export */   "validFileType": () => (/* binding */ validFileType),
/* harmony export */   "wholeNumberRequired": () => (/* binding */ wholeNumberRequired)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 56908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 64139);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var _time_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time-handler */ 8123);



/** Validates the the string of characters contains at least 1 lowercase character */
function min1lowercase(c) {
    if (c.value === null) {
        return null; // don't validate empty value
    }
    if (typeof c.value !== 'string') {
        console.warn('min1lowercase validator: value is not a string');
        return { min1lowercase: true };
    }
    const isValid = new RegExp('[a-z]').test(c.value);
    if (!isValid) {
        return { min1lowercase: true };
    }
    return null;
}
/** Validates the the string of characters contains at least 1 uppercase character */
function min1uppercase(c) {
    if (c.value === null) {
        return null; // don't validate empty value
    }
    if (typeof c.value !== 'string') {
        console.warn('min1uppercase validator: value is not a string');
        return { min1uppercase: true };
    }
    const isValid = new RegExp('[A-Z]').test(c.value);
    if (!isValid) {
        return { min1uppercase: true };
    }
    return null;
}
/** Validates the the string of characters contains at least 1 number character */
function min1digit(c) {
    if (c.value === null) {
        return null; // don't validate empty value
    }
    if (typeof c.value !== 'string') {
        console.warn('min1digit validator: value is not a string');
        return { min1digit: true };
    }
    const isValid = new RegExp('[0-9]').test(c.value);
    if (!isValid) {
        return { min1digit: true };
    }
    return null;
}
/** Validates the the string of characters contains at least 1 special character */
function min1specialCharacter(c) {
    if (c.value === null) {
        return null; // don't validate empty value
    }
    if (typeof c.value !== 'string') {
        console.warn('min1specialCharacter validator: value is not a string');
        return { min1specialCharacter: true };
    }
    const isValid = new RegExp('[^((0-9)|(a-z)|(A-Z)|\s)]').test(c.value);
    if (!isValid) {
        return { min1specialCharacter: true };
    }
    return null;
}
/**
 * This Function is intended to validate that to formControl from the same FormGroup have the same value
 * Perfect for:
 * - Password matching validation
 * - Validating against a specific string, declared as a fromControl
 * @param controlNameToCompare name of the fromControl of the same formGroup to validate against
 */
function compareValidator(control1Name, control2Name) {
    return (c) => {
        const control1 = c.get(control1Name).value;
        const control2 = c.get(control2Name).value;
        if (control1 === null || control2 === null) {
            return null; // don't validate empty value
        }
        if (control1 !== control2) {
            return { compareValidator: true };
        }
        else {
            return null;
        }
    };
}
/**
 * This Function is intended to validate that all files match at least one of the provided MIME types in the validator function
 * For more information check: https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 * @param fileTypes File types MIME can be an array or a single MIME type
 */
function validFileType(fileTypes) {
    if (!fileTypes) {
        console.error('Invalid FileType validator, please provide one, using empty string as default');
        fileTypes = '';
    }
    return (c) => {
        const files = c.value;
        const fileTypesArray = Array.isArray(fileTypes) ? fileTypes : [fileTypes];
        if (c.value === null || c.value.length === 0) {
            return null; // don't validate empty value
        }
        let filesArray;
        if (files instanceof FileList) {
            filesArray = Array.from(files);
        }
        if (files instanceof File) {
            filesArray = [files];
        }
        const isValid = filesArray.every((f) => {
            return fileTypesArray.some((t) => t === f.type);
        });
        if (isValid) {
            return null;
        }
        else {
            return { invalidFileType: true };
        }
    };
}
/**
 * This Function is intended to validate the maximum valid file size of a File type object
 * @param fileSize File size in Bytes
 */
function maxFileSize(fileSize) {
    return (c) => {
        if (!fileSize) {
            console.error('Invalid fileSize, please provide one, not performing validation as default');
            return null;
        }
        const files = c.value;
        if (c.value === null || c.value.length === 0) {
            return null; // don't validate empty value
        }
        let filesArray;
        if (files instanceof FileList) {
            filesArray = Array.from(files);
        }
        if (files instanceof File) {
            filesArray = [files];
        }
        const isValid = filesArray.every((f) => {
            return f.size < fileSize;
        });
        if (isValid) {
            return null;
        }
        else {
            return { maximumFileSize: true };
        }
    };
}
/**
 * This Function is intended to validate the maximum or minimum width and height resolution of an image, the
 * @param width Image expected minimum or maximum resolution on the X axis
 * @param height Image expected minimum or maximum resolution on the Y axis
 * @param validationMinOrMax determined if the validation should match above of below the expected X and Y axis values can be 'min' or 'max'
 */
function imageMinMaxResolution(width, height, validationMinOrMax) {
    return (c) => {
        if (isNaN(width) || isNaN(height)) {
            console.error('Invalid width or height value params on validator function, please provide both values correctly');
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
        }
        if (!validationMinOrMax) {
            console.error('Invalid validationMinOrMax value params on validator function, please provide a correct value');
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
        }
        if (c.value === null) {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null); // don't validate empty value
        }
        const observable = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        /** here we validate if the height and width of the loaded image have values greater than the provided by the validator params */
        const validateAsMin = (image) => {
            if (image.height < height || image.width < width) {
                observable.next({
                    invalidResolution: true,
                    invalidResolutionWidth: image.width,
                    invalidResolutionHeight: image.height,
                });
                observable.complete();
                return;
            }
            observable.next(null);
            observable.complete();
        };
        /** here we validate if the height and width of the loaded image have values lower than the provided by the validator params */
        const validateAsMax = (image) => {
            if (image.height > height || image.width > width) {
                observable.next({
                    invalidResolution: true,
                    invalidResolutionWidth: image.width,
                    invalidResolutionHeight: image.height,
                });
                observable.complete();
                return;
            }
            observable.next(null);
            observable.complete();
        };
        const image = new Image();
        image.src = window.URL.createObjectURL(c.value);
        image.onload = () => {
            if (validationMinOrMax === 'min') {
                validateAsMin(image);
            }
            if (validationMinOrMax === 'max') {
                validateAsMax(image);
            }
            return;
        };
        return observable;
    };
}
/**
 * This Function is intended to validate 2 date/time on the same FormGroup, checking date1 don't be greater than date2.
 * @param controlNameDate1 name of the fromControl for date1
 * @param controlNameTime1 name of the fromControl for time1
 * @param controlNameDate2 name of the fromControl for date2
 * @param controlNameTime2 name of the fromControl for time2
 * @param justEvaluateDate indicates if only needs to evaluate date part
 * @param validatorProperty in case need a different error property name (default: 'invalidRange')
 * @param daysOffSet max amount of days accepted between date1 and date2
 */
function customValidatorCompareDateGreaterThan(controlNameDate1, controlNameTime1, controlNameDate2, controlNameTime2, justEvaluateDate, canExecuteThisValidator, validatorProperty = 'invalidRange', validatorPropertyOffset = 'invalidOffset', daysOffSet) {
    return (c) => {
        const controlDate1 = c.get(controlNameDate1).value;
        const controlTime1 = justEvaluateDate ? null : c.get(controlNameTime1).value;
        const controlDate2 = c.get(controlNameDate2).value;
        const controlTime2 = justEvaluateDate ? null : c.get(controlNameTime2).value;
        if (!controlDate1
            || (justEvaluateDate ? false : !controlTime1)
            || !controlDate2
            || (justEvaluateDate ? false : !controlTime2)) {
            return null;
        }
        if (canExecuteThisValidator && !canExecuteThisValidator(c)) {
            return null;
        }
        const startDate = (0,_time_handler__WEBPACK_IMPORTED_MODULE_1__.joinDateTimeInISO8601)(controlDate1, controlTime1);
        const endDate = (0,_time_handler__WEBPACK_IMPORTED_MODULE_1__.joinDateTimeInISO8601)(controlDate2, controlTime2);
        const validatorObj = {};
        validatorObj[validatorProperty] = true;
        if (moment__WEBPACK_IMPORTED_MODULE_0__(endDate).isBefore(moment__WEBPACK_IMPORTED_MODULE_0__(startDate))) {
            return validatorObj;
        }
        else if (!daysOffSet) {
            return null;
        }
        const validatorObjOffset = {};
        validatorObjOffset[validatorPropertyOffset] = true;
        return moment__WEBPACK_IMPORTED_MODULE_0__.duration(moment__WEBPACK_IMPORTED_MODULE_0__(endDate).diff(moment__WEBPACK_IMPORTED_MODULE_0__(startDate))).asDays() < daysOffSet ? validatorObjOffset : null;
    };
}
/**
 * This Function is intended to validate 2 date/time on the same FormGroup, checking date1 don't be greater than date2.
 * @param controlNameDate1 name of the fromControl for date1
 * @param controlNameDate2 name of the fromControl for date2
 * @param plusNDays Number of days to include / substract from the difference
 * @param validatorProperty in case need a different error property name (default: 'invalidRange')
 */
function customValidatorCompareDateGreaterThanPlusNDays(controlNameDate1, controlNameDate2, startDatePlusNDays, canExecuteThisValidator, validatorProperty = 'invalidRangeNDays') {
    return (c) => {
        const controlDate1 = c.get(controlNameDate1).value;
        const controlDate2 = c.get(controlNameDate2).value;
        if (!controlDate1 || !controlDate2) {
            return null;
        }
        if (canExecuteThisValidator && !canExecuteThisValidator(c)) {
            return null;
        }
        const startDate = (0,_time_handler__WEBPACK_IMPORTED_MODULE_1__.joinDateTimeInISO8601)(controlDate1, null);
        const endDate = (0,_time_handler__WEBPACK_IMPORTED_MODULE_1__.joinDateTimeInISO8601)(controlDate2, null);
        const validatorObj = {};
        validatorObj[validatorProperty] = true;
        if (moment__WEBPACK_IMPORTED_MODULE_0__(endDate).isBefore(moment__WEBPACK_IMPORTED_MODULE_0__(startDate).add(startDatePlusNDays, 'day'))) {
            return validatorObj;
        }
        return null;
    };
}
/**
 * This Function is intended to evaluate a FormControl is between 2 constant values returned by callbacks
 * @param controlNameDate Name of the fromControl for date to evaluated between boundaries
 * @param startingDateGetCallback Lower date boundary
 * @param endingDateGetCallback Greater date boundary
 * @param validatorProperty in case need a different error property name (default: 'invalidDateBetween')
 */
function customValidatorCompareDateBetweenStaticValues(controlNameDate, startingDateGetCallback, endingDateGetCallback, validatorProperty = 'invalidDateBetween') {
    return (c) => {
        const controlDate0 = c.get(controlNameDate).value;
        const controlDate1 = startingDateGetCallback();
        const controlDate2 = endingDateGetCallback();
        if (!controlDate0 || !controlDate1 || !controlDate2) {
            return null;
        }
        const validatorObj = {};
        validatorObj[validatorProperty] = true;
        if (moment__WEBPACK_IMPORTED_MODULE_0__(controlDate0).isBetween(moment__WEBPACK_IMPORTED_MODULE_0__(controlDate1), moment__WEBPACK_IMPORTED_MODULE_0__(controlDate2), 'days', '[]')) {
            return null;
        }
        return validatorObj;
    };
}
/** Checks diff between controlNameDate and current date be between maxDaysOffSet */
function customValidatorDateOffSetNotGreatherThan(controlNameDate, maxDaysOffSet, validatorPropertyDateOffset = 'invalidDateOffset') {
    return (c) => {
        if (!c.get(controlNameDate).value) {
            return null;
        }
        const dateValue = moment__WEBPACK_IMPORTED_MODULE_0__(c.get(controlNameDate).value).format('YYYY-MM-DDT00:00:00');
        const todayValue = moment__WEBPACK_IMPORTED_MODULE_0__(moment__WEBPACK_IMPORTED_MODULE_0__().format('YYYY-MM-DDT00:00:00'));
        const offset = moment__WEBPACK_IMPORTED_MODULE_0__.duration(moment__WEBPACK_IMPORTED_MODULE_0__(dateValue).diff(todayValue)).asDays();
        if (offset > maxDaysOffSet) {
            const objReturned = {};
            objReturned[validatorPropertyDateOffset] = true;
            return objReturned;
        }
        return null;
    };
}
/**
 * This Function is intended to validate 2 times on the same FormGroup, checking time1 don't be greater than time2.
 * @param controlNameTime1 name of the fromControl for time1
 * @param controlNameTime2 name of the fromControl for time2
 * @param minutesOffSet max amount of minutes accepted between time1 and time2
 * @param validatorProperty in case need a different error property name (default: 'invalidRange')
 */
function customValidatorCompareTimeGreaterThan(controlNameTime1, controlNameTime2, minutesOffSet, validatorProperty = 'invalidRange', validatorPropertyOffset = 'invalidOffset', canExecuteThisValidator) {
    return (c) => {
        const controlTime1 = c.get(controlNameTime1).value;
        const controlTime2 = c.get(controlNameTime2).value;
        if (!controlTime1 || !controlTime2) {
            return null;
        }
        if (canExecuteThisValidator && !canExecuteThisValidator(c)) {
            return null;
        }
        const startDate = moment__WEBPACK_IMPORTED_MODULE_0__(controlTime1, 'HH:mm');
        const endDate = moment__WEBPACK_IMPORTED_MODULE_0__(controlTime2, 'HH:mm');
        const validatorObj = {};
        validatorObj[validatorProperty] = true;
        if (moment__WEBPACK_IMPORTED_MODULE_0__(endDate).isBefore(moment__WEBPACK_IMPORTED_MODULE_0__(startDate))) {
            return validatorObj;
        }
        else if (!minutesOffSet) {
            return null;
        }
        const validatorObjOffset = {};
        validatorObjOffset[validatorPropertyOffset] = true;
        return moment__WEBPACK_IMPORTED_MODULE_0__.duration(moment__WEBPACK_IMPORTED_MODULE_0__(endDate).diff(moment__WEBPACK_IMPORTED_MODULE_0__(startDate))).asMinutes() > minutesOffSet ? validatorObjOffset : null;
    };
}
/**
 * This Function is intended to validate 2 times on the same FormGroup, checking time1 don't be greater than time2.
 * @param controlNameTime1 name of the fromControl for time1
 * @param controlNameTime2 name of the fromControl for time2
 * @param minutesOffSet max amount of minutes accepted between time1 and time2
 * @param validatorProperty in case need a different error property name (default: 'invalidRange')
 */
function customValidatorTimeRange(controlNameTime, rangeTime1, rangeTime2, validatorProperty = 'invalidTimeRange', canExecuteThisValidator) {
    return (c) => {
        const controlTime = c.get(controlNameTime).value;
        if (!controlTime) {
            return null;
        }
        if (canExecuteThisValidator && !canExecuteThisValidator(c)) {
            return null;
        }
        const startDate = moment__WEBPACK_IMPORTED_MODULE_0__(controlTime, 'HH:mm');
        const range1 = moment__WEBPACK_IMPORTED_MODULE_0__(rangeTime1, 'HH:mm').add(-1, 'minute');
        const range2 = moment__WEBPACK_IMPORTED_MODULE_0__(rangeTime2, 'HH:mm').add(1, 'minute');
        const validatorObj = {};
        validatorObj[validatorProperty] = true;
        if (!startDate.isBetween(range1, range2)) {
            return validatorObj;
        }
        return null;
    };
}
/**
 * This Function is intended to validate a formGroup as a valid date under a specific year of age
 * @param dateFieldName name of the fromControl of the same formGroup to validate the Date field YYYY-MM-(DD)
 * @param monthFieldName name of the fromControl of the same formGroup to validate the Month field YYYY-(MM)-DD
 * @param yearFieldName name of the fromControl of the same formGroup to validate the Year field (YYYY)-MM-DD
 * @param ageValidity amount of age to validate against.
 */
function requireAgeGroupToBeUnder(dateFieldName, monthFieldName, yearFieldName, ageValidity) {
    return (c) => {
        const dob = moment__WEBPACK_IMPORTED_MODULE_0__.utc();
        // doesn't guaranty a true validation due to relative date from the host machine clock
        const AgeDate = moment__WEBPACK_IMPORTED_MODULE_0__.utc().subtract(ageValidity, 'y');
        dob.set({
            year: parseInt(c.get(yearFieldName).value),
            month: parseInt(c.get(monthFieldName).value) - 1,
            date: parseInt(c.get(dateFieldName).value),
            hour: 0,
            minute: 0,
            second: 0,
        });
        if (!dob.isValid()) {
            return null; // don't validate empty value
        }
        if (dob.isAfter(AgeDate) && dob.isBefore(moment__WEBPACK_IMPORTED_MODULE_0__.utc())) {
            return null;
        }
        else {
            return { invalid_under_age: true };
        }
    };
}
/**
 * This Function is intended to validate a formGroup as a valid date over a specific year of age
 * @param dateFieldName name of the fromControl of the same formGroup to validate the Date field YYYY-MM-(DD)
 * @param monthFieldName name of the fromControl of the same formGroup to validate the Month field YYYY-(MM)-DD
 * @param yearFieldName name of the fromControl of the same formGroup to validate the Year field (YYYY)-MM-DD
 * @param ageValidity amount of age to validate against.
 */
function requireAgeGroupToBeOver(dateFieldName, monthFieldName, yearFieldName, ageValidity) {
    return (c) => {
        const dob = moment__WEBPACK_IMPORTED_MODULE_0__.utc();
        // doesn't guaranty a true validation due to relative date from the host machine clock
        const AgeDate = moment__WEBPACK_IMPORTED_MODULE_0__.utc().subtract(ageValidity, 'y');
        dob.set({
            year: parseInt(c.get(yearFieldName).value),
            month: parseInt(c.get(monthFieldName).value) - 1,
            date: parseInt(c.get(dateFieldName).value),
            hour: 0,
            minute: 0,
            second: 0,
        });
        if (!dob.isValid()) {
            return null; // don't validate empty value
        }
        if (dob.isBefore(AgeDate)) {
            return null;
        }
        else {
            return { invalid_over_age: true };
        }
    };
}
/**
 * This Function is intended to validate a formControl as required if another formControl from the same FormGroup has a truthy value
 * @param controlNameToEvaluate name or names of the fromControl of the same formGroup to validate against
 * @param controlNamesToBeRequired array name of fromControls of the same formGroup to validate against
 * @param optionalConf optional params to change validation behavior
 * - formRoot: change the perspective of the controlNameToEvaluate log from the root of the formGroup
 */
function requiredIf(controlNameToEvaluate, controlNamesToBeRequired, optionalConf) {
    const singleControlName = (c, controlName) => {
        let controlValue = c.get(controlName)?.value;
        if (optionalConf?.formRoot) {
            controlValue = c.root?.get(controlName)?.value;
        }
        const invalidControls = {};
        if (controlValue === null) {
            return null; // don't validate empty value
        }
        // This "if" statement, is what it's been test here to see if the controlNamesToBeRequired should be evaluated
        if (controlValue) {
            if (controlNamesToBeRequired?.length > 0) {
                /** @param controlNamesToBeRequired if at least one is Falsy, then mark with error */
                for (const requiredControl of controlNamesToBeRequired) {
                    const value = c.get(requiredControl).value;
                    if (value === null || value === undefined || value === false || value === '' || value?.length === 0) {
                        invalidControls[requiredControl] = true;
                    }
                }
                if (Object.keys(invalidControls)?.length > 0) {
                    return { requiredIf: { requiredControls: invalidControls } };
                }
            }
        }
        return null;
    };
    return (c) => {
        if (Array.isArray(controlNameToEvaluate)) {
            const hasError = controlNameToEvaluate.some((controlName) => {
                return singleControlName(c, controlName);
            });
            return hasError ? { requiredIf: true } : null;
        }
        else {
            return singleControlName(c, controlNameToEvaluate);
        }
    };
}
/**
 * This Function is intended to validate a formControl as required if another formControl from the same FormGroup has a Falsy value
 * @param controlNameToEvaluate name of the fromControl of the same formGroup to validate against
 * @param controlNamesToBeRequired array name of fromControls of the same formGroup to validate against
 */
function requiredIfNot(controlNameToEvaluate, controlNamesToBeRequired) {
    return (c) => {
        const controlValue = c.get(controlNameToEvaluate).value;
        const invalidControls = {};
        if (controlValue === null || controlValue === undefined || controlValue === false || controlValue === '' || controlValue?.length === 0) {
            if (controlNamesToBeRequired?.length > 0) {
                /** @param controlNamesToBeRequired if at least one is Falsy, then mark with error */
                for (const controlName of controlNamesToBeRequired) {
                    const value = c.get(controlName).value;
                    if (value === null || value === undefined || value === false || value === '' || value?.length === 0) {
                        invalidControls[controlName] = true;
                    }
                }
                if (Object.keys(invalidControls)?.length > 0) {
                    return { requiredIfNot: { requiredControls: invalidControls } };
                }
            }
        }
        else {
            return null;
        }
    };
}
/**
 * This Function is intended to validate if a FormArray contains at least 1 value that matches the given expression
 * @param expression An optional expression to handle how each value of the FormArray should be test as valid
 */
function arrayAtLeastOneIsRequired(expression) {
    return (c) => {
        if (c.value === null) {
            return null;
        }
        let isValid = false;
        if (c.controls.length > 0) {
            if (expression) {
                isValid = c.controls.some(expression);
            }
            else {
                isValid = c.controls.some(control => control.value);
            }
            return isValid ? null : { arrayAtLeastOneIsRequired: true };
        }
        return null;
    };
}
/**
 * This Function is intended to validate if a FormArray contains at least 1 value that matches the given expression
 * @param controlNameToEvaluate name of the fromControl of the same formGroup to validate against
 * @param expression An optional expression to handle how each value of the FormArray should be test as valid
 * @param optionalConf optional params to change validation behavior
 * - formRoot: change the perspective of the controlNameToEvaluate log from the root of the formGroup
 */
function arrayAtLeastOneIf(controlNameToEvaluate, expression, optionalConf) {
    return (c) => {
        let controlValue = c.get(controlNameToEvaluate)?.value;
        if (optionalConf?.formRoot) {
            controlValue = c.root?.get(controlNameToEvaluate)?.value;
        }
        if (controlValue === null) {
            return null;
        }
        if (controlValue) {
            let isValid = false;
            if (c.controls.length > 0) {
                if (expression) {
                    isValid = c.controls.some(expression);
                }
                else {
                    isValid = c.controls.some(control => control.value);
                }
                return isValid ? null : { arrayAtLeastOneIf: true };
            }
        }
        return null;
    };
}
/**
 * This Function is intended to validate if a FormArray contains at least 1 value that matches the given expression and the controlNameToEvaluate has a falsy value
 * @param controlNameToEvaluate name of the fromControl of the same formGroup to validate against
 * @param expression An optional expression to handle how each value of the FormArray should be test as valid
 * @param optionalConf optional params to change validation behavior
 * - formRoot: change the perspective of the controlNameToEvaluate log from the root of the formGroup
 */
function arrayAtLeastOneIfNot(controlNameToEvaluate, expression, optionalConf) {
    return (c) => {
        let controlValue = c.get(controlNameToEvaluate)?.value;
        if (optionalConf?.formRoot) {
            controlValue = c.root?.get(controlNameToEvaluate)?.value;
        }
        if (controlValue === null) {
            return null;
        }
        if (controlValue === null || controlValue === undefined || controlValue === false || controlValue === '' || controlValue?.length === 0) {
            let isValid = false;
            if (c.controls.length > 0) {
                if (expression) {
                    isValid = c.controls.some(expression);
                }
                else {
                    isValid = c.controls.some(control => control.value);
                }
                return isValid ? null : { arrayAtLeastOneIf: true };
            }
        }
        return null;
    };
}
/** Validate the value don't be equal to valueToCompare */
function customValidatorNotEqualTo(valueToCompare, validatorProperty = 'valueEqualTo') {
    return (c) => {
        if (!valueToCompare || c.value === null || c.value.length === 0) {
            return null;
        }
        const validatorObj = {};
        validatorObj[validatorProperty] = true;
        return c.value === valueToCompare ? validatorObj : null;
    };
}
/** Validates if the value as a whole number, it access values in string and number format */
function wholeNumberRequired(c) {
    if (c.value === null) {
        return null; // don't validate empty value
    }
    const validateNumber = (value) => {
        if (value % 1 !== 0) {
            return { wholeNumberRequired: { notAWholeNumber: true } };
        }
        return null;
    };
    if (typeof c.value === 'string') {
        return validateNumber(parseFloat(c.value));
    }
    if (typeof c.value === 'number') {
        return validateNumber(c.value);
    }
    return { wholeNumberRequired: { notANumber: true } };
}
/**
 * This Function is intended to validate 2 date/time on the same FormGroup, checking date1 don't be greater than date2.
 * @param controlsToEvaluate name of Controls inside group to evaluate
 * @param validatorProperty in case need a different error property name (default: 'AtLeastAControlSet')
 */
function customValidatorAtLeastAControlSet(controlsToEvaluate, validatorProperty = 'AtLeastAControlSet') {
    return (c) => {
        if (controlsToEvaluate.filter(controlName => {
            const controlValue = c.get(controlName).value;
            return controlValue;
        }).length > 0) {
            return null;
        }
        const validatorReturn = {};
        validatorReturn[validatorProperty] = true;
        return validatorReturn;
    };
}
/**
 * This Function is intended to validate a formControl as required if another formControl from the same FormGroup has a truthy value
 * @param controlsToValidateCallback callback returns array of fields required
 * @param validatorProperty field name of FormGroup's error object
 */
function requiredIf2(controlsToValidateCallback, validatorProperty = 'requiredIf2') {
    return (c) => {
        const controlNamesToBeRequired = controlsToValidateCallback(c);
        if (controlNamesToBeRequired && controlNamesToBeRequired.length > 0) {
            const invalidControls = {};
            if (controlNamesToBeRequired?.length > 0) {
                for (const requiredControl of controlNamesToBeRequired) {
                    const value = c.get(requiredControl)?.value;
                    if (value === null || value === undefined || value === false || value === '' || value?.length === 0) {
                        invalidControls[requiredControl] = true;
                    }
                }
                if (Object.keys(invalidControls)?.length > 0) {
                    const validatorObj = {};
                    validatorObj[validatorProperty] = invalidControls;
                    return validatorObj;
                }
            }
        }
        return null;
    };
}


/***/ }),

/***/ 38971:
/*!*****************************************************************************************!*\
  !*** ./src/app/pages/general/forgot-password/forgot-password.component.scss?ngResource ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 1062:
/*!*********************************************************************!*\
  !*** ./src/app/pages/general/login/login.component.scss?ngResource ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "ion-item {\n  --border-color: #000;\n  --backgroud: var(--ion-color-light-shade) ;\n}\n\n.forgot_text {\n  width: 100%;\n  text-align: end;\n  margin: 0;\n  padding-top: 15px;\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksb0JBQUE7RUFDQSwwQ0FBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBQ0oiLCJmaWxlIjoibG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taXRlbSB7XG4gICAgLS1ib3JkZXItY29sb3I6ICMwMDA7IFxuICAgIC0tYmFja2dyb3VkOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpXG59O1xuXG4uZm9yZ290X3RleHR7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdGV4dC1hbGlnbjogZW5kO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG59Il19 */";

/***/ }),

/***/ 17938:
/*!*************************************************************************!*\
  !*** ./src/app/pages/general/sign-up/sign-up.component.scss?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWduLXVwLmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 82198:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/general/verify-email/verify-email.component.scss?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = ".fullWidth {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcmlmeS1lbWFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNHLFdBQUE7QUFDSCIsImZpbGUiOiJ2ZXJpZnktZW1haWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZnVsbFdpZHRoIHtcbiAgIHdpZHRoOiAxMDAlOyBcbn0iXX0= */";

/***/ }),

/***/ 34357:
/*!*****************************************************************************************!*\
  !*** ./src/app/pages/general/forgot-password/forgot-password.component.html?ngResource ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\">\n  <ion-toolbar>\n    <p class=\"ion-text-center ion-text-capitalize inputLogin\" style=\"width: 100%;\"> RECUPERAR CONTRASEÑA </p>\n  </ion-toolbar>\n\n  <ion-card style=\"width: 200px; height: 200px; margin: 10pt auto 0 auto; border-radius: 7pt; background-color: #e3e3e3;\">\n    <ion-img src=\"../../../../assets/Athos.png\"></ion-img>\n  </ion-card>\n\n  \n  <form #login=\"ngForm\" [formGroup]=emailForm (ngSubmit)=enviarEmail(emailForm.value) (keydown)=\"EnterSubmit($event, emailForm)\" novalidate>\n    <ion-item>\n      <ion-label color=\"dark\" position=\"floating\"> <b>Email</b></ion-label>\n      <ion-input color=\"dark\" formControlName=\"email\" type=\"email\" clearInput=\"true\"></ion-input>\n    </ion-item>\n    \n    <ng-container *ngFor=\"let validation of validationMessages.email\">\n      <div class=\"error-message\" *ngIf=\"emailForm.get('email').hasError(validation.type) && (emailForm.get('email').dirty || emailForm.get('email').touched)\">\n        <ion-text class=\"ion-padding-start\" color=\"danger\"> <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ validation.message }}</ion-text>\n      </div>\n    </ng-container>\n    <ion-text class=\"ion-padding-start ion-margin-vertical\" color=\"danger\" *ngIf=\"messageError\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ messageError }}\n    </ion-text>\n\n    <ion-row class=\"ion-margin-top\">\n      <app-big-button type=\"submit\" class=\"ion-padding-top\" LABEL=\"SOLICITAR CONTRASEÑA\" buttonType=\"PRIMARY\" [loading]=\"loading\" [disabled]=\"!emailForm.valid || loading\" (click)=\"enviarEmail(emailForm.value)\"></app-big-button>\n    </ion-row>\n\n    <ion-row class=\"ion-margin-top\">\n      <app-big-button class=\"ion-padding-top\" LABEL=\"Cancelar\" buttonType=\"GRAY\" [loading]=\"loading\" [disabled]=\"false\" (click)=\"cancel()\"></app-big-button>\n    </ion-row>\n  </form> \n\n</ion-content>";

/***/ }),

/***/ 39928:
/*!*********************************************************************!*\
  !*** ./src/app/pages/general/login/login.component.html?ngResource ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\">\n  <ion-toolbar>\n    <p class=\"ion-text-center ion-text-capitalize inputLogin\" style=\"width: 100%;\"> INICIO DE SESIÓN </p>\n  </ion-toolbar>\n\n  <ion-card style=\"width: 200px; height: 200px; margin: 10pt auto 0 auto; border-radius: 7pt; background-color: #e3e3e3;\">\n    <ion-img src=\"../../../../assets/Athos.png\"></ion-img>\n  </ion-card>\n  \n  <form #login=\"ngForm\" [formGroup]=loginForm (ngSubmit)=loginProcess(loginForm.value) (keydown)=\"EnterSubmit($event, loginForm)\" novalidate>\n    <ion-item>\n      <ion-label color=\"dark\" position=\"floating\"> <b>Email</b></ion-label>\n      <ion-input color=\"dark\" formControlName=\"email\" type=\"email\" clearInput=\"true\"></ion-input>\n    </ion-item>\n    \n    <ng-container *ngFor=\"let validation of validationMessages.email\">\n      <div class=\"error-message\" *ngIf=\"loginForm.get('email').hasError(validation.type) && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n        <ion-text class=\"ion-padding-start\" color=\"danger\"> <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ validation.message }}</ion-text>\n      </div>\n    </ng-container>\n    <ion-text class=\"ion-padding-start ion-margin-vertical\" color=\"danger\" *ngIf=\"messageError\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ messageError }}\n    </ion-text>\n\n    <ion-item #emailInput>\n      <ion-label color=\"dark\" position='floating'><b>Password</b></ion-label>\n      <ion-input color=\"dark\" formControlName=\"password\" type=\"password\" clearInput=\"true\"></ion-input>\n    </ion-item>\n\n    <ng-container *ngFor=\"let validation of validationMessages.password\">\n      <div class=\"error-message ion-margin-bottom\" *ngIf=\"loginForm.get('password').hasError(validation.type) && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n        <ion-text class=\"ion-padding-start\" color=\"danger\"> <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ validation.message }}</ion-text>\n      </div>\n    </ng-container>\n    <ion-text class=\"ion-padding-start ion-margin-vertical\" color=\"danger\" *ngIf=\"messageError\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ messageError }}\n    </ion-text>\n\n\n    <div class='ion-padding-start' *ngIf=\"!this.block && !loading\"> \n      <ion-text color='dark'> <p class=\"forgot_text\" (click)='forgotPassword()'><span>¿Olvidó su contraseña?</span></p>    </ion-text> \n    </div>\n    <ion-row class=\"ion-margin-top\">\n      <app-big-button type=\"submit\" class=\"ion-padding-top\" LABEL=\"INICIAR SESIÓN\" buttonType=\"PRIMARY\" [loading]=\"loading\" [disabled]=\"!loginForm.valid || loading\" \n      (click)=\"loginProcess(loginForm.value)\"></app-big-button>\n    </ion-row>\n    <ion-row class=\"ion-margin-top\">\n      <app-big-button class=\"ion-padding-top\" LABEL=\"REGISTRARSE\" buttonType=\"SECONDARY\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"registrase()\"></app-big-button>\n    </ion-row>\n  </form> \n\n</ion-content>";

/***/ }),

/***/ 4357:
/*!*************************************************************************!*\
  !*** ./src/app/pages/general/sign-up/sign-up.component.html?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\">\n  <ion-toolbar>\n    <p class=\"ion-text-center ion-text-capitalize inputLogin\" style=\"width: 100%;\"> REGISTRO </p>\n  </ion-toolbar>\n\n  <ion-card style=\"width: 200px; height: 200px; margin: 10pt auto 0 auto; border-radius: 7pt; background-color: #e3e3e3;\">\n    <ion-img src=\"../../../../assets/Athos.png\"></ion-img>\n  </ion-card>\n\n  <form #email=\"ngForm\" [formGroup]=\"signUpForm\" (ngSubmit)=\"signProcess(signUpForm.value)\" (keydown)=\"EnterSubmit($event, signUpForm)\" novalidate>\n    <ion-item>\n      <ion-label color=\"dark\" position=\"floating\"> <b>Email / Usuario</b></ion-label>\n      <ion-input color=\"dark\" formControlName=\"email\" type=\"email\" clearInput=\"true\"></ion-input>\n    </ion-item>\n    <ng-container *ngFor=\"let validation of validationMessages.email\">\n      <div class=\"error-message\" *ngIf=\"signUpForm.get('email').hasError(validation.type) && (signUpForm.get('email').dirty || signUpForm.get('email').touched)\">\n        <ion-text class=\"ion-padding-start\" color=\"danger\"> \n          <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ validation.message }}\n        </ion-text>\n      </div>\n    </ng-container>\n\n    <ion-item>\n      <ion-label color=\"dark\" position='floating'><b>Contraseña</b></ion-label>\n      <ion-input color=\"dark\" formControlName=\"password1\" type=\"password\" clearInput=\"true\"></ion-input>\n    </ion-item>\n    <ng-container>\n      <div *ngIf=\"(signUpForm.get('password1').dirty || signUpForm.get('password1').touched)\">\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'required'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Contraseña requerida\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'minlength'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Requiere 8 letras por los menos\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'min1digit'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Requiere un número por lo menos\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'min1uppercase'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  \n            Requiere una letra mayúscula por lo menos\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'min1lowercase'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  \n            Requiere una letra minúscula por lo menos\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'min1specialCharacter'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  \n            Requiere un cáracter special {{'(^ $ * . [ ] { } ( ) ? - \" ! @ # % & / \\ , > < ' + \"' : ; | _ ~ ` + =)\"}}\n          </ion-text>\n        </div>\n      </div>\n    </ng-container>\n\n    <ion-item>\n      <ion-label color=\"dark\" position='floating'><b>Repetir Contraseña</b></ion-label>\n      <ion-input color=\"dark\" formControlName=\"password2\" type=\"password\" clearInput=\"true\"></ion-input>\n    </ion-item>\n    <ng-container>\n      <div *ngIf=\"(signUpForm.get('password2').dirty || signUpForm.get('password2').touched)\">\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password2').errors | first) === 'required'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>\n            Repita la contraseña\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.errors | first) === 'compareValidator'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  \n            Las contraseñas no coinciden\n          </ion-text>\n        </div>\n      </div>\n      <ion-text class=\"ion-padding-start ion-margin-vertical ion-text-capitalize\" color=\"danger\" *ngIf=\"messageError\"> \n        <ion-icon class=\"vertical-align \" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ messageError }}\n      </ion-text>\n    </ng-container>\n    <ion-row class=\"ion-margin-top\">\n      <app-big-button LABEL=\"REGISTRARSE\" buttonType=\"\" [loading]=\"loading\" [disabled]=\"!signUpForm.valid || loading\" (click)=\"signProcess(signUpForm.value)\"></app-big-button>\n    </ion-row>\n    <ion-row class=\"ion-margin-top\">\n      <app-big-button class=\"ion-padding-top\" LABEL=\"CANCELAR\" buttonType=\"GRAY\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"cancel()\"></app-big-button>\n    </ion-row>\n  </form>\n\n</ion-content>";

/***/ }),

/***/ 43108:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/general/verify-email/verify-email.component.html?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\">\n  <ion-toolbar>\n    <p class=\"ion-text-center ion-text-capitalize inputLogin\" style=\"width: 100%;\"> INICIO DE SESIÓN </p>\n  </ion-toolbar>\n\n  <ion-card style=\"width: 200px; height: 200px; margin: 10pt auto 0 auto; border-radius: 7pt; background-color: #e3e3e3;\">\n    <ion-img src=\"../../../../assets/Athos.png\"></ion-img>\n  </ion-card>\n  \n  <ion-item>\n    <ion-text color=\"dark\">\n      <p>Email: {{email}}</p>\n    </ion-text>\n  </ion-item>\n  \n  <ion-row class=\"fullWidth\">\n    <ion-text color=\"danger\" class=\"ion-padding ion-text-center fullWidth\">\n      <p>{{errorMessage}}</p>\n    </ion-text>\n  </ion-row>\n  \n  <ion-row class=\"ion-margin-top\">\n    <p class=\"ion-padding ion-text-center\">Verifique si el correo se encuentra en 'no deseado' o 'spam'. Si no lo tiene, presione el botón 'Reenviar' para volver a enviarle el mail de verificación</p>\n    <app-big-button type=\"submit\" class=\"\" LABEL=\"Reenviar\" buttonType=\"SECONDARY\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"resendEmail()\"></app-big-button>\n  </ion-row>\n  \n  <ion-row class=\"ion-margin-top\">\n    <app-big-button type=\"submit\" class=\"ion-padding-top\" LABEL=\"Verificar Email\" buttonType=\"PRIMARY\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"checkUser()\"></app-big-button>\n  </ion-row>\n\n  <ion-row class=\"ion-margin-top\">\n    <app-big-button class=\"ion-padding-top\" LABEL=\"Cancelar\" buttonType=\"GRAY\" [loading]=\"loading\" [disabled]=\"false\" (click)=\"cancel()\"></app-big-button>\n  </ion-row>\n\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_general_general_module_ts.js.map