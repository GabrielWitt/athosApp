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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ 95219);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login/login.component */ 23956);
/* harmony import */ var _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./privacy/privacy.component */ 7131);
/* harmony import */ var _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sign-up/sign-up.component */ 95090);
/* harmony import */ var _terminos_condiciones_terminos_condiciones_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./terminos-condiciones/terminos-condiciones.component */ 37785);
/* harmony import */ var _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./verify-email/verify-email.component */ 50717);









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
        component: _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_3__.SignUpComponent
    },
    {
        path: 'verify-email/:email',
        component: _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_5__.VerifyEmailComponent
    },
    {
        path: 'privacy',
        component: _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_2__.PrivacyComponent
    },
    {
        path: 'terms-of-conditions',
        component: _terminos_condiciones_terminos_condiciones_component__WEBPACK_IMPORTED_MODULE_4__.TerminosCondicionesComponent
    },
];
let GeneralPageRoutingModule = class GeneralPageRoutingModule {
};
GeneralPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule],
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _general_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general-routing.module */ 92892);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login/login.component */ 23956);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ 95219);
/* harmony import */ var _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sign-up/sign-up.component */ 95090);
/* harmony import */ var _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./verify-email/verify-email.component */ 50717);
/* harmony import */ var _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./privacy/privacy.component */ 7131);
/* harmony import */ var _terminos_condiciones_terminos_condiciones_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./terminos-condiciones/terminos-condiciones.component */ 37785);













let GeneralPageModule = class GeneralPageModule {
};
GeneralPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonicModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule,
            _general_routing_module__WEBPACK_IMPORTED_MODULE_0__.GeneralPageRoutingModule
        ],
        declarations: [
            _login_login_component__WEBPACK_IMPORTED_MODULE_1__.LoginComponent,
            _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_3__.ForgotPasswordComponent,
            _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_4__.SignUpComponent,
            _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_5__.VerifyEmailComponent,
            _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_6__.PrivacyComponent,
            _terminos_condiciones_terminos_condiciones_component__WEBPACK_IMPORTED_MODULE_7__.TerminosCondicionesComponent
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

/***/ 7131:
/*!************************************************************!*\
  !*** ./src/app/pages/general/privacy/privacy.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivacyComponent": () => (/* binding */ PrivacyComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _privacy_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./privacy.component.html?ngResource */ 13906);
/* harmony import */ var _privacy_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./privacy.component.scss?ngResource */ 29961);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);




let PrivacyComponent = class PrivacyComponent {
    constructor() { }
    ngOnInit() { }
};
PrivacyComponent.ctorParameters = () => [];
PrivacyComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-privacy',
        template: _privacy_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_privacy_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], PrivacyComponent);



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
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
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

    return (0,_Users_gabrielwitt_Desktop_UTPL_Practicum_4_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
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

/***/ 37785:
/*!**************************************************************************************!*\
  !*** ./src/app/pages/general/terminos-condiciones/terminos-condiciones.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TerminosCondicionesComponent": () => (/* binding */ TerminosCondicionesComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _terminos_condiciones_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./terminos-condiciones.component.html?ngResource */ 25090);
/* harmony import */ var _terminos_condiciones_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./terminos-condiciones.component.scss?ngResource */ 78553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);




let TerminosCondicionesComponent = class TerminosCondicionesComponent {
    constructor() { }
    ngOnInit() { }
};
TerminosCondicionesComponent.ctorParameters = () => [];
TerminosCondicionesComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-terminos-condiciones',
        template: _terminos_condiciones_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_terminos_condiciones_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], TerminosCondicionesComponent);



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

module.exports = "ion-item {\n  --border-color: #000;\n  --backgroud: var(--ion-color-light-shade) ;\n}\n\n.forgot_text {\n  width: 100%;\n  text-align: end;\n  margin: 0;\n  padding-top: 15px;\n  font-size: 14pt;\n}\n\n.textInput {\n  font-size: 15pt;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vUHJhY3RpY3VtJTIwNC9hdGhvc0FwcC9zcmMvYXBwL3BhZ2VzL2dlbmVyYWwvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxvQkFBQTtFQUNBLDBDQUFBO0FDQ0o7O0FERUE7RUFDSSxXQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7QUNDSiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1pdGVtIHtcbiAgICAtLWJvcmRlci1jb2xvcjogIzAwMDsgXG4gICAgLS1iYWNrZ3JvdWQ6IHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSlcbn07XG5cbi5mb3Jnb3RfdGV4dHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBlbmQ7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xuICAgIGZvbnQtc2l6ZTogMTRwdDtcbn1cblxuLnRleHRJbnB1dHtcbiAgICBmb250LXNpemU6IDE1cHQ7XG59IiwiaW9uLWl0ZW0ge1xuICAtLWJvcmRlci1jb2xvcjogIzAwMDtcbiAgLS1iYWNrZ3JvdWQ6IHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSkgO1xufVxuXG4uZm9yZ290X3RleHQge1xuICB3aWR0aDogMTAwJTtcbiAgdGV4dC1hbGlnbjogZW5kO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmctdG9wOiAxNXB4O1xuICBmb250LXNpemU6IDE0cHQ7XG59XG5cbi50ZXh0SW5wdXQge1xuICBmb250LXNpemU6IDE1cHQ7XG59Il19 */";

/***/ }),

/***/ 29961:
/*!*************************************************************************!*\
  !*** ./src/app/pages/general/privacy/privacy.component.scss?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcml2YWN5LmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 17938:
/*!*************************************************************************!*\
  !*** ./src/app/pages/general/sign-up/sign-up.component.scss?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWduLXVwLmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 78553:
/*!***************************************************************************************************!*\
  !*** ./src/app/pages/general/terminos-condiciones/terminos-condiciones.component.scss?ngResource ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0ZXJtaW5vcy1jb25kaWNpb25lcy5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 82198:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/general/verify-email/verify-email.component.scss?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = ".fullWidth {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcmlmeS1lbWFpbC5jb21wb25lbnQuc2NzcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL1ByYWN0aWN1bSUyMDQvYXRob3NBcHAvc3JjL2FwcC9wYWdlcy9nZW5lcmFsL3ZlcmlmeS1lbWFpbC92ZXJpZnktZW1haWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRyxXQUFBO0FDQ0giLCJmaWxlIjoidmVyaWZ5LWVtYWlsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZ1bGxXaWR0aCB7XG4gICB3aWR0aDogMTAwJTsgXG59IiwiLmZ1bGxXaWR0aCB7XG4gIHdpZHRoOiAxMDAlO1xufSJdfQ== */";

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

module.exports = "<ion-content class=\"ion-padding\">\n  <ion-toolbar>\n    <p class=\"ion-text-center ion-text-capitalize inputLogin\" style=\"width: 100%;\"> INICIO DE SESIÓN </p>\n  </ion-toolbar>\n\n  <ion-card style=\"width: 200px; height: 200px; margin: 10pt auto 0 auto; border-radius: 7pt; background-color: #e3e3e3;\">\n    <ion-img src=\"../../../../assets/Athos.png\"></ion-img>\n  </ion-card>\n  \n  <form #login=\"ngForm\" [formGroup]=loginForm (ngSubmit)=loginProcess(loginForm.value) (keydown)=\"EnterSubmit($event, loginForm)\" novalidate>\n    <ion-item>\n      <ion-label color=\"dark\" class=\"textInput\" position=\"floating\"> <b>Email</b></ion-label>\n      <ion-input color=\"dark\" class=\"textInput\" formControlName=\"email\" type=\"email\" clearInput=\"true\"></ion-input>\n    </ion-item>\n    \n    <ng-container *ngFor=\"let validation of validationMessages.email\">\n      <div class=\"error-message\" *ngIf=\"loginForm.get('email').hasError(validation.type) && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n        <ion-text class=\"ion-padding-start\" color=\"danger\"> <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ validation.message }}</ion-text>\n      </div>\n    </ng-container>\n    <ion-text class=\"ion-padding-start ion-margin-vertical\" color=\"danger\" *ngIf=\"messageError\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ messageError }}\n    </ion-text>\n\n    <ion-item #emailInput>\n      <ion-label color=\"dark\" class=\"textInput\" position='floating'><b>Password</b></ion-label>\n      <ion-input color=\"dark\" class=\"textInput\" formControlName=\"password\" type=\"password\" clearInput=\"true\"></ion-input>\n    </ion-item>\n\n    <ng-container *ngFor=\"let validation of validationMessages.password\">\n      <div class=\"error-message ion-margin-bottom\" *ngIf=\"loginForm.get('password').hasError(validation.type) && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n        <ion-text class=\"ion-padding-start\" color=\"danger\"> <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ validation.message }}</ion-text>\n      </div>\n    </ng-container>\n    <ion-text class=\"ion-padding-start ion-margin-vertical\" color=\"danger\" *ngIf=\"messageError\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ messageError }}\n    </ion-text>\n\n\n    <div class='ion-padding-start ion-margin-bottom' *ngIf=\"!this.block && !loading\"> \n      <ion-text color='dark'> <p class=\"forgot_text\"><span (click)='forgotPassword()'>¿Olvidó su contraseña?</span></p>    </ion-text> \n    </div>\n    <ion-row class=\"ion-margin-top\">\n      <app-big-button type=\"submit\" class=\"ion-padding-top\" LABEL=\"INICIAR SESIÓN\" buttonType=\"PRIMARY\" [loading]=\"loading\" [disabled]=\"!loginForm.valid || loading\" \n      (click)=\"loginProcess(loginForm.value)\"></app-big-button>\n    </ion-row>\n    <ion-row class=\"ion-margin-top\">\n      <app-big-button class=\"ion-padding-top\" LABEL=\"REGISTRARSE\" buttonType=\"SECONDARY\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"registrase()\"></app-big-button>\n    </ion-row>\n  </form> \n\n</ion-content>";

/***/ }),

/***/ 13906:
/*!*************************************************************************!*\
  !*** ./src/app/pages/general/privacy/privacy.component.html?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\">\n  <ion-toolbar>\n    <p class=\"ion-text-center ion-text-capitalize inputLogin\" style=\"width: 100%;\"> POLÍTICA DE PRIVACIDAD </p>\n  </ion-toolbar>\n\n  <ion-card style=\"width: 200px; height: 200px; margin: 10pt auto 0 auto; border-radius: 7pt; background-color: #e3e3e3;\">\n    <ion-img src=\"../../../../assets/Athos.png\"></ion-img>\n  </ion-card>\n  \n  <ion-grid>\n    <div _ngcontent-cpd-c167=\"\">\n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\" class=\"\">1. Introducción</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">¡Bienvenido! </span><span style=\"vertical-align: inherit;\">Su uso del sitio web de AthosApp (\" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">la Compañía</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \") en </span></span><a href=\"https://homeservices-63df6.web.app/\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://homeservices-63df6.web.app/</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (y los servicios disponibles a través del mismo) (juntos, el \" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Sitio Web</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \") constituye su aceptación de esta Política de Privacidad (la \" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Política de Privacidad</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \" ), que incorpora por referencia nuestros Términos y condiciones de uso que se encuentran en </span></span><a href=\"https://homeservices-63df6.web.app/general/terms-of-conditions/\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://homeservices-63df6.web.app/general/terms-of-conditions/</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> . </span><span style=\"vertical-align: inherit;\">Si no acepta esta Política de Privacidad, no podrá utilizar el Sitio Web. </span><span style=\"vertical-align: inherit;\">Si en algún momento no está de acuerdo con esta Política de privacidad, debe dejar de usar el sitio web.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Valoramos a nuestros clientes y estamos comprometidos a proteger su privacidad e informarles sobre cómo se usarán sus datos personales. </span><span style=\"vertical-align: inherit;\">Como cuestión general, recopilamos información del cliente en un esfuerzo por mejorar su experiencia al usar el sitio web y la de nuestros otros usuarios del sitio web, y para comunicarnos con usted acerca de nuestros servicios y promociones, así como otros asuntos en los que pueda estar interesado. </span><span style=\"vertical-align: inherit;\">Reconocemos que debemos mantener y utilizar la información del cliente de manera responsable. </span><span style=\"vertical-align: inherit;\">Hemos creado esta Política de privacidad para abordar nuestras prácticas con respecto a la información recopilada de los visitantes y usuarios del sitio web.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Esta Política de privacidad NO se aplica a otros sitios web o aplicaciones a los que podamos vincularnos, ni a otras empresas, proveedores externos que nos brinden servicios o entidades que puedan figurar como contactos de terceros en el sitio web, cada uno de que podrán regirse por sus propias políticas de privacidad. </span><span style=\"vertical-align: inherit;\">Esta Política de privacidad tampoco se aplica a la información que podemos obtener de otras fuentes sobre usted. </span><span style=\"vertical-align: inherit;\">Al usar el sitio web y/o al contactarnos y proporcionar cualquier dato personal, usted acepta la recopilación, transferencia, almacenamiento, divulgación y uso de información por parte de nosotros de acuerdo con esta Política de privacidad. </span><span style=\"vertical-align: inherit;\">Si decidimos cambiar nuestra Política de privacidad, publicaremos esos cambios en esta página.</span></span></p>\n      \n      \n      \n      <p><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">No visite ni utilice el sitio web desde la Unión Europea o el Espacio Económico Europeo, o en cualquier otro lugar cuyas leyes puedan entrar en conflicto con esta Política de privacidad; </span><span style=\"vertical-align: inherit;\">el sitio web no está diseñado para su uso si está intentando utilizarlo desde cualquiera de estos países y no tiene permiso para utilizar el sitio web, excepto para uso temporal a corto plazo durante vacaciones o viajes de negocios a corto plazo. </span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">&nbsp; Tenga en cuenta que esta exclusión se debe únicamente a que es posible que las leyes de su país no se ajusten a nuestras políticas establecidas en esta Política de privacidad.</span></span></p>\n      \n      \n      \n      <p><span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">2. </span></span></strong> <strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Por qué recopilamos información</span></span></strong></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Recopilamos datos personales porque: (a) nos permite prestar los servicios ofrecidos a través del Sitio Web; </span><span style=\"vertical-align: inherit;\">(b) nos permite responder a las preguntas que usted u otros puedan tener sobre el sitio web o la información proporcionada a usted u otros en oa través del sitio web; </span><span style=\"vertical-align: inherit;\">(c) nos ayuda a proporcionar y mejorar el sitio web y la información proporcionada desde o a través del sitio web; </span><span style=\"vertical-align: inherit;\">y (d) nos permite, con su consentimiento, publicar sus comentarios y anotaciones e información relacionada, y que proporcionemos otra información útil en el sitio web. </span><span style=\"vertical-align: inherit;\">Además, sus datos personales nos ayudan a comunicarnos con usted a través del sitio web, así como a proporcionar información adicional relacionada y eventos sobre los que le gustaría escuchar. </span><span style=\"vertical-align: inherit;\">También podemos correlacionar sus datos personales con información de otras fuentes. </span><span style=\"vertical-align: inherit;\">Por ejemplo,&nbsp; </span></span></p>\n      \n      \n      \n      <p><span> <strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">3. Qué información recopilamos sobre usted</span></span></strong></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Podemos recopilar todo tipo de \" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">datos personales</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \". </span><span style=\"vertical-align: inherit;\">A los efectos de esta Política de privacidad, el término \" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">datos personales</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \" se refiere a cualquier dato relacionado con una persona física (a diferencia de una empresa o entidad corporativa) que lo hace identificable y puede incluir específicamente:</span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\" class=\"\">Nombres e información de contacto, incluido el número de teléfono, la dirección física y la dirección de correo electrónico;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">datos de actividad de pago;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Información financiera, bancaria y crediticia relacionada con cualquier solicitud para alquilar una residencia o recibir servicios relacionados o de otro modo en o a través del sitio web;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Datos de fuente de referencia (es decir, cómo terminó en el sitio web);</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Días y horarios de las fechas de servicio preferidas;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier comentario que deje en o a través del sitio web, en la medida en que incluya datos personales, incluidos los datos descritos en esta sección; </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier otra información similar que nos proporcione usted o en su nombre en relación con nuestros Servicios (como se define a continuación).</span></span></li></ul>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted acepta que podemos recopilar y procesar todos los datos personales que nos proporcione para permitirnos proporcionar los servicios (los \" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Servicios</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \"). </span><span style=\"vertical-align: inherit;\">Estos Servicios pueden incluir:</span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Alquiler y posible alquiler de residencias con servicios relacionados identificados en el sitio web.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Gestión del Sitio Web y de todos los contenidos y servicios del mismo.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cancelación de un servicio que usted ordenó previamente con nosotros.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Permitiéndole hacer ciertos arreglos con respecto a paquetes y entregas.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Mejorar y optimizar el Sitio Web.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Responder o abordar cualquier pregunta o consulta suya o sobre nosotros, cualquier servicio que brindemos o nuestro sitio web (ya sea que su pregunta o consulta haya sido por correo electrónico, directamente en el sitio web, copia impresa o de otra manera).</span></span></li></ul>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">También acepta que podemos utilizar sus datos personales para los siguientes fines adicionales que pueden incluirse en los Servicios o ser parte de ellos:</span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Actualizar nuestros registros;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Monitorear el historial de uso de su sitio web, la información revisada y los comentarios o anotaciones realizadas;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Obtener información demográfica de nuestros usuarios;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">En relación con cualquier solicitud de empleo con la Compañía;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Análisis interno para nuestros fines de gestión comercial;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\" class=\"\">Cualquier propósito legal o reglamentario que requiera el procesamiento de sus datos personales;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cumplimiento legal y regulatorio;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Prevención de fraudes y delitos;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Auditorías internas o externas; </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier otra finalidad para la que se obtenga el consentimiento válido.</span></span></li></ul>\n      \n      \n      \n      <p><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Por favor, no nos proporcione lo siguiente:</span></span></strong></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Actualizar nuestros registros;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Monitorear el historial de uso de su Aplicación, la información revisada y los comentarios o anotaciones realizadas;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Obtener información demográfica de nuestros usuarios;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">En relación con cualquier solicitud de empleo con la Compañía;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Análisis interno para nuestros fines de gestión comercial;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier propósito legal o reglamentario que requiera el procesamiento de sus datos personales;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cumplimiento legal y regulatorio;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Prevención de fraudes y delitos;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Auditorías internas o externas; </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier otra finalidad para la que se obtenga el consentimiento válido.</span></span></li></ul>\n      \n      \n      \n      <p><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Por favor, no nos proporcione lo siguiente:</span></span></strong></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Los datos personales de cualquier otra persona, a menos que la Compañía le solicite explícitamente que lo haga;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier categoría de sus datos personales que no haya sido solicitada explícitamente por la Compañía;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier información confidencial, patentada, secreta o protegida legalmente que la Compañía no le solicite explícitamente que proporcione; </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier información confidencial, patentada, secreta o legalmente protegida que tenga la obligación legal de no proporcionar o compartir con la Compañía.</span></span></li></ul>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">4. Cómo recopilamos información sobre usted</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Recopilamos información sobre usted (incluidos datos personales) cuando:</span></span></p>\n      \n      \n      \n      <ul><li><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> nos proporciona información: puede proporcionarnos información cuando:</span></span><ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted configura una cuenta con nosotros;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Nos lo proporciona completando formularios, incluida una solicitud para alquilar una residencia o en relación con la búsqueda de servicios, la obtención de membresías, la búsqueda o celebración de un contrato de arrendamiento, el alquiler de una residencia o cualquier otro formulario que pueda completar;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Nos envía un correo electrónico o envía cualquier consulta en o a través del sitio web, incluso en relación con una solicitud o consulta de \"contacto con el servicio al cliente\";</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted proporciona información por teléfono o en persona;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted nos proporciona información por escrito y nos la envía de otra manera que no sea por correo electrónico, teléfono o en persona (es decir, correo, FedEx, etc.);</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted nos proporciona documentación;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted nos proporciona información que puede contener datos personales;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted nos proporciona información en relación con la búsqueda de empleo en la Compañía.</span></span></li><li><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Recopilamos información automáticamente</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> : recopilamos automáticamente ciertos tipos de información cuando visita nuestro sitio web (como se explica a continuación). </span><span style=\"vertical-align: inherit;\">Esto incluye tokens y servicios como Google Analytics (ver </span></span><a href=\"https://support.google.com/analytics/answer/6004245?hl=en\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://support.google.com/analytics/answer/6004245?hl=en</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> ).</span></span></li><li><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Recopilamos información de otras fuentes</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> : también podemos obtener información sobre usted de fuentes externas. </span><span style=\"vertical-align: inherit;\">Por ejemplo, podemos obtener información disponible comercialmente sobre usted de terceros o comprar listas de correo electrónico de terceros con fines publicitarios y de marketing. </span><span style=\"vertical-align: inherit;\">También podemos recibir información de terceros que nos brindan servicios a través de balizas web y otras tecnologías descritas en esta Política de privacidad.</span></span></li></ul></li></ul>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">5. Uso de fichas</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Un token de dispositivo es un identificador único emitido al sitio web por el sistema operativo de su dispositivo móvil. </span><span style=\"vertical-align: inherit;\">Podemos usar o acceder a uno o más tokens de dispositivo para los siguientes propósitos:</span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">autenticación: utilizamos tokens para identificar a los usuarios del sitio web y/o la ubicación de las personas que acceden al sitio web;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">estado: usamos tokens para ayudarnos a determinar si ha iniciado sesión en nuestro sitio web;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">personalización: utilizamos tokens para almacenar información sobre sus preferencias y personalizar el sitio web para usted;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">seguridad: utilizamos tokens como un elemento de las medidas de seguridad utilizadas para proteger las cuentas de los usuarios, incluida la prevención del uso fraudulento de las credenciales de inicio de sesión, y para proteger nuestro sitio web y nuestros servicios en general;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">publicidad: usamos tokens para ayudarnos a mostrar anuncios que serán relevantes para usted</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">diagnóstico: usamos tokens para diagnosticar problemas con nuestros Servicios y servidores; </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">análisis: utilizamos tokens para ayudarnos a analizar el uso y el rendimiento de nuestro sitio web y nuestros servicios.</span></span></li></ul>\n      \n      \n      \n      <p><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cookies o tokens utilizados por nuestros proveedores y vendedores de servicios</span></span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Nuestros proveedores de servicios y vendedores pueden usar cookies y esas cookies pueden almacenarse en su computadora cuando visita nuestro sitio web. </span><span style=\"vertical-align: inherit;\">Nos esforzaremos por alertarlo sobre la identidad de dichos proveedores de servicios y vendedores en esta Política de privacidad en caso de que se utilicen dichas cookies.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Nuestros proveedores de servicios y vendedores pueden cambiar de vez en cuando, o los servicios adicionales que decidamos incluir. </span><span style=\"vertical-align: inherit;\">Si bien actualizaremos periódicamente nuestra lista de dichos vendedores y proveedores de servicios, es posible que la lista anterior no esté completa en un momento dado.</span></span></li></ul>\n      \n      \n      \n      <p><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Gestión de cookies</span></span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">La mayoría de los navegadores le permiten negarse a aceptar cookies y eliminar cookies. </span><span style=\"vertical-align: inherit;\">Los métodos para hacerlo varían de un navegador a otro y de una versión a otra. </span><span style=\"vertical-align: inherit;\">No obstante, puede obtener información actualizada sobre el bloqueo y eliminación de cookies a través de estos enlaces:</span></span><ul><li><a href=\"https://support.google.com/chrome/answer/95647?hl=en\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://support.google.com/chrome/answer/95647?hl=en</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Chrome);</span></span></li><li><a href=\"https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Firefox);</span></span></li><li><a href=\"http://www.opera.com/help/tutorials/security/cookies/\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">http://www.opera.com/help/tutorials/security/cookies/</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Opera);</span></span></li><li><a href=\"https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Internet Explorer);</span></span></li><li><a href=\"https://support.apple.com/kb/PH21411\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://support.apple.com/kb/PH21411</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Safari); </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><a href=\"https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Edge).</span></span></li></ul></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">El bloqueo de algunas o todas las cookies puede tener un impacto negativo en la usabilidad del sitio web.</span></span></li></ul>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">6. Cómo usamos la información que recopilamos</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usamos la información que recopilamos de varias maneras. </span><span style=\"vertical-align: inherit;\">En general, utilizamos la información que recopilamos, incluida la información proporcionada por usted, sus datos personales y los datos agregados/desidentificados, para proporcionar los Servicios.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">También podemos utilizar la información que recopilamos internamente en nuestro negocio para muchos fines comerciales, como para: (i) proporcionar los Servicios que puede buscar o que están disponibles en el sitio web; </span><span style=\"vertical-align: inherit;\">(ii) proporcionar datos agregados o de otro tipo a terceros con respecto a los resultados de sus informes y monitoreo en y a través del sitio web, con o sin otros datos agregados; </span><span style=\"vertical-align: inherit;\">(iii) analizar tendencias y realizar investigaciones; </span><span style=\"vertical-align: inherit;\">(iv) brindar soporte y responder a las preguntas de nuestros usuarios, visitantes del sitio web y clientes; </span><span style=\"vertical-align: inherit;\">(v) mejorar nuestro sitio web; </span><span style=\"vertical-align: inherit;\">(vi) conocer las necesidades de los usuarios y clientes; </span><span style=\"vertical-align: inherit;\">(vii) contactar a los usuarios con fines de investigación, información y marketing, incluida la personalización de nuestro sitio web; </span><span style=\"vertical-align: inherit;\">(viii) realizar un seguimiento de los patrones de tráfico y el uso del sitio web; </span><span style=\"vertical-align: inherit;\">(ix) brindar atención al cliente y soporte técnico; </span><span style=\"vertical-align: inherit;\">(x) correlacionar la información con otra información disponible comercialmente para identificar datos demográficos, necesidades de informes y seguimiento, condiciones de los senderos, impacto del usuario y cualquier otro servicio o información que se ofrezca en el sitio web o a través de este; </span><span style=\"vertical-align: inherit;\">(xi) proporcionarle información de marketing, promocional u otra información relevante específica; </span><span style=\"vertical-align: inherit;\">(xii) abordar la seguridad de la información y/o las prácticas de privacidad, el funcionamiento de la red, la ingeniería y los problemas de solución de problemas; </span><span style=\"vertical-align: inherit;\">(xiii) investigar reclamos y/o acciones legales, violaciones de leyes o acuerdos, y el cumplimiento de las leyes y procesos legales aplicables; </span><span style=\"vertical-align: inherit;\">(xiv) cumplir con la ley, o en base a nuestra creencia de buena fe de que es necesario cumplir con la ley, o de otro modo divulgar información para prevenir el fraude para reducir los riesgos crediticios, para cooperar con la policía y otras autoridades gubernamentales, </span><span style=\"vertical-align: inherit;\">o para proteger los derechos, la propiedad o la seguridad de los visitantes del sitio web, nuestros socios o clientes, o el público; </span><span style=\"vertical-align: inherit;\">y (xv) procesar o participar en una venta de todo o parte de nuestro(s) negocio(s)/organización(es), o si pasamos por una reorganización o fusión.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">También podemos compartir datos personales e información de identificación no personal externamente con nuestros afiliados y socios comerciales, así como con otros proveedores de servicios externos que nos ayuden a proporcionar servicios operativos para el sitio y nuestro negocio, lo que puede incluir, pero no es limitado necesariamente a: entidades comerciales que brindan servicios de administración de direcciones de correo electrónico y contacto de comunicación, proveedores de administración de equipos de red y aplicaciones y entidades de hospedaje, proveedores de contabilidad judicial, administrativa y/o legal o financiera en caso de que la información deba ser revisada o divulgada en respuesta a investigaciones civiles y/o penales, reclamos, demandas, o si estamos sujetos a procesos judiciales o administrativos (como una citación) para divulgar su información o para enjuiciar o defender acciones legales,y otros proveedores de servicios que pueden estar involucrados en los otros tipos de servicios y actividades discutidos en esta Política de privacidad.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">También podemos utilizar sus datos personales para comunicarnos con usted de otras formas distintas al correo electrónico o correo postal, como por teléfono o fax. </span><span style=\"vertical-align: inherit;\">Todo uso de información de identificación personal estará permitido por la ley aplicable.</span></span></p>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">7. Transferencias comerciales</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si la Compañía o sustancialmente todos sus activos fueran adquiridos, o en el improbable caso de que la Compañía cierre su negocio o entre en bancarrota, la información del usuario sería uno de los activos que un tercero transfiere o adquiere. </span><span style=\"vertical-align: inherit;\">Usted reconoce que tales transferencias pueden ocurrir y que cualquier adquirente de la Compañía puede continuar usando sus datos personales como se establece en esta Política de Privacidad.</span></span></p>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">8. Sus opciones sobre la información que recopilamos</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si no acepta la forma en que podemos usar sus datos personales, no nos envíe ningún dato personal. </span><span style=\"vertical-align: inherit;\">Tenga en cuenta que si no nos proporciona ciertos datos personales, es posible que la Compañía no pueda permitirle usar o acceder al sitio web, o que los servicios y/o la información en o a través del sitio web no sean tan buenos como podrían ser. .</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si no desea recibir nuestros correos electrónicos, haga clic en el enlace para darse de baja que se encuentra en nuestros correos electrónicos o opte por no participar en el perfil de su cuenta.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si no desea recibir otros materiales de marketing de nuestra parte y/o si no desea que compartamos sus datos personales con otras entidades como se indica en esta Política de privacidad, indíquenos su nombre y dirección exactos y avísenos que desea optar por no compartir información o recibir información de nosotros o ambos, según sea el caso, e incluya las palabras \"OPT-OUT\" en TODO MAYÚSCULAS en la línea de asunto. </span><span style=\"vertical-align: inherit;\">Tenga en cuenta que los datos anónimos y agregados, incluidos sus datos personales, aún pueden compartirse, pero no serán identificados ni identificables para usted. </span><span style=\"vertical-align: inherit;\">Dirija su solicitud de exclusión a los siguientes contactos:</span></span></p>\n      \n      \n      \n      <p><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Dirección de correo electrónico: </span></span></strong><a href=\"mailto:gabrowitt@gmail.com\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">gabrowitt@gmail.com</span></span></a></p>\n      \n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">9. Privacidad de los niños que visitan el sitio web</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Reconocemos la importancia de la seguridad y privacidad de los niños. </span><span style=\"vertical-align: inherit;\">El sitio web no está diseñado para atraer a niños y no está destinado a ser utilizado por niños menores de 18 años. No solicitamos ni recopilamos a sabiendas ninguna información de identificación personal de niños menores de 18 años.</span></span></p>\n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">10. Visitantes del sitio web desde fuera de Ecuador</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si está visitando el sitio web desde una ubicación fuera de Ecuador, no debe usar el sitio web y no tiene permiso para hacerlo. </span><span style=\"vertical-align: inherit;\">Su conexión puede ser a través y hacia servidores ubicados en Ecuador. </span><span style=\"vertical-align: inherit;\">Tenga en cuenta que las leyes de protección de datos en Ecuador y otros países pueden no ser las mismas que las de su país. </span><span style=\"vertical-align: inherit;\">Al usar el sitio web y/o enviarnos información, usted acepta específicamente la transferencia de su información a Ecuador a las instalaciones y servidores que usamos, y a aquellos con quienes podemos compartir su información.</span></span></p>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">11. Seguridad</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Creemos en proporcionar una experiencia segura para todos nuestros visitantes en línea. </span><span style=\"vertical-align: inherit;\">Con ese fin, hemos implementado medidas de seguridad para proteger la información recopilada de usted. </span><span style=\"vertical-align: inherit;\">Mantenemos medidas de seguridad físicas y electrónicas razonables diseñadas para limitar el acceso no autorizado a su información de identificación personal y para protegerlo contra el mal uso delictivo de esa información.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si bien utilizamos las medidas de seguridad anteriores para proteger su información, tenga en cuenta que no se puede garantizar que los datos transmitidos a través de Internet o almacenados y utilizados con fines comerciales sean completamente seguros. </span><span style=\"vertical-align: inherit;\">Ninguna medida de seguridad es perfecta o impenetrable. </span><span style=\"vertical-align: inherit;\">No podemos garantizar que solo las personas autorizadas verán su información. </span><span style=\"vertical-align: inherit;\">No podemos garantizar que la información que comparte en el sitio web no esté disponible públicamente. </span><span style=\"vertical-align: inherit;\">Puede reducir estos riesgos utilizando prácticas de seguridad de sentido común, como elegir una contraseña segura, usar diferentes contraseñas para diferentes servicios y usar un software antivirus actualizado.</span></span></p>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">13. Preguntas/Cambios en el Aviso</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si tiene preguntas o inquietudes con respecto a nuestra Política de privacidad, puede contactarnos en </span></span><a href=\"mailto:gabrowitt@gmail.com\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">gabrowitt@gmail.com</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> &nbsp; . Podemos optar por cambiar o modificar nuestra Política de privacidad; </span><span style=\"vertical-align: inherit;\">en tal caso, publicaremos los cambios de aviso en nuestra Política de privacidad en el sitio web.</span></span></p>\n      </div>\n  </ion-grid>\n</ion-content>";

/***/ }),

/***/ 4357:
/*!*************************************************************************!*\
  !*** ./src/app/pages/general/sign-up/sign-up.component.html?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\">\n  <ion-toolbar>\n    <p class=\"ion-text-center ion-text-capitalize inputLogin\" style=\"width: 100%;\"> REGISTRO </p>\n  </ion-toolbar>\n\n  <ion-card style=\"width: 200px; height: 200px; margin: 10pt auto 0 auto; border-radius: 7pt; background-color: #e3e3e3;\">\n    <ion-img src=\"../../../../assets/Athos.png\"></ion-img>\n  </ion-card>\n\n  <form #email=\"ngForm\" [formGroup]=\"signUpForm\" (ngSubmit)=\"signProcess(signUpForm.value)\" (keydown)=\"EnterSubmit($event, signUpForm)\" novalidate>\n    <ion-item>\n      <ion-label color=\"dark\" position=\"floating\"> <b>Email / Usuario</b></ion-label>\n      <ion-input color=\"dark\" formControlName=\"email\" type=\"email\" clearInput=\"true\"></ion-input>\n    </ion-item>\n    <ng-container *ngFor=\"let validation of validationMessages.email\">\n      <div class=\"error-message\" *ngIf=\"signUpForm.get('email').hasError(validation.type) && (signUpForm.get('email').dirty || signUpForm.get('email').touched)\">\n        <ion-text class=\"ion-padding-start\" color=\"danger\"> \n          <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ validation.message }}\n        </ion-text>\n      </div>\n    </ng-container>\n\n    <ion-item>\n      <ion-label color=\"dark\" position='floating'><b>Contraseña</b></ion-label>\n      <ion-input color=\"dark\" formControlName=\"password1\" type=\"password\" clearInput=\"true\"></ion-input>\n    </ion-item>\n    <ng-container>\n      <div *ngIf=\"(signUpForm.get('password1').dirty || signUpForm.get('password1').touched)\">\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'required'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Contraseña requerida\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'minlength'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Requiere 8 letras por los menos\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'min1digit'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Requiere un número por lo menos\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'min1uppercase'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  \n            Requiere una letra mayúscula por lo menos\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'min1lowercase'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  \n            Requiere una letra minúscula por lo menos\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password1').errors | first) === 'min1specialCharacter'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  \n            Requiere un cáracter special {{'(^ $ * . [ ] { } ( ) ? - \" ! @ # % & / \\ , > < ' + \"' : ; | _ ~ ` + =)\"}}\n          </ion-text>\n        </div>\n      </div>\n    </ng-container>\n\n    <ion-item>\n      <ion-label color=\"dark\" position='floating'><b>Repetir Contraseña</b></ion-label>\n      <ion-input color=\"dark\" formControlName=\"password2\" type=\"password\" clearInput=\"true\"></ion-input>\n    </ion-item>\n    <ng-container>\n      <div *ngIf=\"(signUpForm.get('password2').dirty || signUpForm.get('password2').touched)\">\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.get('password2').errors | first) === 'required'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>\n            Repita la contraseña\n          </ion-text>\n        </div>\n        <div class=\"error-message ion-margin-bottom\" *ngIf=\"(signUpForm.errors | first) === 'compareValidator'\">\n          <ion-text class=\"ion-padding-start\" color=\"danger\"> \n            <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  \n            Las contraseñas no coinciden\n          </ion-text>\n        </div>\n      </div>\n      <ion-text class=\"ion-padding-start ion-margin-vertical ion-text-capitalize\" color=\"danger\" *ngIf=\"messageError\"> \n        <ion-icon class=\"vertical-align \" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  {{ messageError }}\n      </ion-text>\n    </ng-container>\n    <ion-row class=\"ion-margin-top\">\n      <app-big-button LABEL=\"REGISTRARSE\" buttonType=\"\" [loading]=\"loading\" [disabled]=\"!signUpForm.valid || loading\" (click)=\"signProcess(signUpForm.value)\"></app-big-button>\n    </ion-row>\n    <ion-row class=\"ion-margin-top\">\n      <app-big-button class=\"ion-padding-top\" LABEL=\"CANCELAR\" buttonType=\"GRAY\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"cancel()\"></app-big-button>\n    </ion-row>\n  </form>\n\n</ion-content>";

/***/ }),

/***/ 25090:
/*!***************************************************************************************************!*\
  !*** ./src/app/pages/general/terminos-condiciones/terminos-condiciones.component.html?ngResource ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\">\n  <ion-toolbar>\n    <p class=\"ion-text-center ion-text-capitalize inputLogin\" style=\"width: 100%;\"> POLÍTICA DE PRIVACIDAD </p>\n  </ion-toolbar>\n\n  <ion-card style=\"width: 200px; height: 200px; margin: 10pt auto 0 auto; border-radius: 7pt; background-color: #e3e3e3;\">\n    <ion-img src=\"../../../../assets/Athos.png\"></ion-img>\n  </ion-card>\n  \n  <ion-grid>\n    <div _ngcontent-cpd-c167=\"\">\n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\" class=\"\">1. Introducción</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">¡Bienvenido! </span><span style=\"vertical-align: inherit;\">Su uso del sitio web de AthosApp (\" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">la Compañía</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \") en </span></span><a href=\"https://homeservices-63df6.web.app/\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://homeservices-63df6.web.app/</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (y los servicios disponibles a través del mismo) (juntos, el \" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Sitio Web</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \") constituye su aceptación de esta Política de Privacidad (la \" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Política de Privacidad</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \" ), que incorpora por referencia nuestros Términos y condiciones de uso que se encuentran en </span></span><a href=\"https://homeservices-63df6.web.app/general/terms-of-conditions/\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://homeservices-63df6.web.app/general/terms-of-conditions/</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> . </span><span style=\"vertical-align: inherit;\">Si no acepta esta Política de Privacidad, no podrá utilizar el Sitio Web. </span><span style=\"vertical-align: inherit;\">Si en algún momento no está de acuerdo con esta Política de privacidad, debe dejar de usar el sitio web.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Valoramos a nuestros clientes y estamos comprometidos a proteger su privacidad e informarles sobre cómo se usarán sus datos personales. </span><span style=\"vertical-align: inherit;\">Como cuestión general, recopilamos información del cliente en un esfuerzo por mejorar su experiencia al usar el sitio web y la de nuestros otros usuarios del sitio web, y para comunicarnos con usted acerca de nuestros servicios y promociones, así como otros asuntos en los que pueda estar interesado. </span><span style=\"vertical-align: inherit;\">Reconocemos que debemos mantener y utilizar la información del cliente de manera responsable. </span><span style=\"vertical-align: inherit;\">Hemos creado esta Política de privacidad para abordar nuestras prácticas con respecto a la información recopilada de los visitantes y usuarios del sitio web.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Esta Política de privacidad NO se aplica a otros sitios web o aplicaciones a los que podamos vincularnos, ni a otras empresas, proveedores externos que nos brinden servicios o entidades que puedan figurar como contactos de terceros en el sitio web, cada uno de que podrán regirse por sus propias políticas de privacidad. </span><span style=\"vertical-align: inherit;\">Esta Política de privacidad tampoco se aplica a la información que podemos obtener de otras fuentes sobre usted. </span><span style=\"vertical-align: inherit;\">Al usar el sitio web y/o al contactarnos y proporcionar cualquier dato personal, usted acepta la recopilación, transferencia, almacenamiento, divulgación y uso de información por parte de nosotros de acuerdo con esta Política de privacidad. </span><span style=\"vertical-align: inherit;\">Si decidimos cambiar nuestra Política de privacidad, publicaremos esos cambios en esta página.</span></span></p>\n      \n      \n      \n      <p><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">No visite ni utilice el sitio web desde la Unión Europea o el Espacio Económico Europeo, o en cualquier otro lugar cuyas leyes puedan entrar en conflicto con esta Política de privacidad; </span><span style=\"vertical-align: inherit;\">el sitio web no está diseñado para su uso si está intentando utilizarlo desde cualquiera de estos países y no tiene permiso para utilizar el sitio web, excepto para uso temporal a corto plazo durante vacaciones o viajes de negocios a corto plazo. </span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">&nbsp; Tenga en cuenta que esta exclusión se debe únicamente a que es posible que las leyes de su país no se ajusten a nuestras políticas establecidas en esta Política de privacidad.</span></span></p>\n      \n      \n      \n      <p><span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">2. </span></span></strong> <strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Por qué recopilamos información</span></span></strong></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Recopilamos datos personales porque: (a) nos permite prestar los servicios ofrecidos a través del Sitio Web; </span><span style=\"vertical-align: inherit;\">(b) nos permite responder a las preguntas que usted u otros puedan tener sobre el sitio web o la información proporcionada a usted u otros en oa través del sitio web; </span><span style=\"vertical-align: inherit;\">(c) nos ayuda a proporcionar y mejorar el sitio web y la información proporcionada desde o a través del sitio web; </span><span style=\"vertical-align: inherit;\">y (d) nos permite, con su consentimiento, publicar sus comentarios y anotaciones e información relacionada, y que proporcionemos otra información útil en el sitio web. </span><span style=\"vertical-align: inherit;\">Además, sus datos personales nos ayudan a comunicarnos con usted a través del sitio web, así como a proporcionar información adicional relacionada y eventos sobre los que le gustaría escuchar. </span><span style=\"vertical-align: inherit;\">También podemos correlacionar sus datos personales con información de otras fuentes. </span><span style=\"vertical-align: inherit;\">Por ejemplo,&nbsp; </span></span></p>\n      \n      \n      \n      <p><span> <strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">3. Qué información recopilamos sobre usted</span></span></strong></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Podemos recopilar todo tipo de \" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">datos personales</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \". </span><span style=\"vertical-align: inherit;\">A los efectos de esta Política de privacidad, el término \" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">datos personales</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \" se refiere a cualquier dato relacionado con una persona física (a diferencia de una empresa o entidad corporativa) que lo hace identificable y puede incluir específicamente:</span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\" class=\"\">Nombres e información de contacto, incluido el número de teléfono, la dirección física y la dirección de correo electrónico;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">datos de actividad de pago;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Información financiera, bancaria y crediticia relacionada con cualquier solicitud para alquilar una residencia o recibir servicios relacionados o de otro modo en o a través del sitio web;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Datos de fuente de referencia (es decir, cómo terminó en el sitio web);</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Días y horarios de las fechas de servicio preferidas;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier comentario que deje en o a través del sitio web, en la medida en que incluya datos personales, incluidos los datos descritos en esta sección; </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier otra información similar que nos proporcione usted o en su nombre en relación con nuestros Servicios (como se define a continuación).</span></span></li></ul>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted acepta que podemos recopilar y procesar todos los datos personales que nos proporcione para permitirnos proporcionar los servicios (los \" </span></span><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Servicios</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> \"). </span><span style=\"vertical-align: inherit;\">Estos Servicios pueden incluir:</span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Alquiler y posible alquiler de residencias con servicios relacionados identificados en el sitio web.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Gestión del Sitio Web y de todos los contenidos y servicios del mismo.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cancelación de un servicio que usted ordenó previamente con nosotros.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Permitiéndole hacer ciertos arreglos con respecto a paquetes y entregas.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Mejorar y optimizar el Sitio Web.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Responder o abordar cualquier pregunta o consulta suya o sobre nosotros, cualquier servicio que brindemos o nuestro sitio web (ya sea que su pregunta o consulta haya sido por correo electrónico, directamente en el sitio web, copia impresa o de otra manera).</span></span></li></ul>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">También acepta que podemos utilizar sus datos personales para los siguientes fines adicionales que pueden incluirse en los Servicios o ser parte de ellos:</span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Actualizar nuestros registros;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Monitorear el historial de uso de su sitio web, la información revisada y los comentarios o anotaciones realizadas;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Obtener información demográfica de nuestros usuarios;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">En relación con cualquier solicitud de empleo con la Compañía;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Análisis interno para nuestros fines de gestión comercial;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\" class=\"\">Cualquier propósito legal o reglamentario que requiera el procesamiento de sus datos personales;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cumplimiento legal y regulatorio;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Prevención de fraudes y delitos;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Auditorías internas o externas; </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier otra finalidad para la que se obtenga el consentimiento válido.</span></span></li></ul>\n      \n      \n      \n      <p><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Por favor, no nos proporcione lo siguiente:</span></span></strong></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Actualizar nuestros registros;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Monitorear el historial de uso de su Aplicación, la información revisada y los comentarios o anotaciones realizadas;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Obtener información demográfica de nuestros usuarios;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">En relación con cualquier solicitud de empleo con la Compañía;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Análisis interno para nuestros fines de gestión comercial;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier propósito legal o reglamentario que requiera el procesamiento de sus datos personales;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cumplimiento legal y regulatorio;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Prevención de fraudes y delitos;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Auditorías internas o externas; </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier otra finalidad para la que se obtenga el consentimiento válido.</span></span></li></ul>\n      \n      \n      \n      <p><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Por favor, no nos proporcione lo siguiente:</span></span></strong></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Los datos personales de cualquier otra persona, a menos que la Compañía le solicite explícitamente que lo haga;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier categoría de sus datos personales que no haya sido solicitada explícitamente por la Compañía;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier información confidencial, patentada, secreta o protegida legalmente que la Compañía no le solicite explícitamente que proporcione; </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cualquier información confidencial, patentada, secreta o legalmente protegida que tenga la obligación legal de no proporcionar o compartir con la Compañía.</span></span></li></ul>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">4. Cómo recopilamos información sobre usted</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Recopilamos información sobre usted (incluidos datos personales) cuando:</span></span></p>\n      \n      \n      \n      <ul><li><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> nos proporciona información: puede proporcionarnos información cuando:</span></span><ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted configura una cuenta con nosotros;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Nos lo proporciona completando formularios, incluida una solicitud para alquilar una residencia o en relación con la búsqueda de servicios, la obtención de membresías, la búsqueda o celebración de un contrato de arrendamiento, el alquiler de una residencia o cualquier otro formulario que pueda completar;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Nos envía un correo electrónico o envía cualquier consulta en o a través del sitio web, incluso en relación con una solicitud o consulta de \"contacto con el servicio al cliente\";</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted proporciona información por teléfono o en persona;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted nos proporciona información por escrito y nos la envía de otra manera que no sea por correo electrónico, teléfono o en persona (es decir, correo, FedEx, etc.);</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted nos proporciona documentación;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted nos proporciona información que puede contener datos personales;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usted nos proporciona información en relación con la búsqueda de empleo en la Compañía.</span></span></li><li><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Recopilamos información automáticamente</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> : recopilamos automáticamente ciertos tipos de información cuando visita nuestro sitio web (como se explica a continuación). </span><span style=\"vertical-align: inherit;\">Esto incluye tokens y servicios como Google Analytics (ver </span></span><a href=\"https://support.google.com/analytics/answer/6004245?hl=en\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://support.google.com/analytics/answer/6004245?hl=en</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> ).</span></span></li><li><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Recopilamos información de otras fuentes</span></span></strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> : también podemos obtener información sobre usted de fuentes externas. </span><span style=\"vertical-align: inherit;\">Por ejemplo, podemos obtener información disponible comercialmente sobre usted de terceros o comprar listas de correo electrónico de terceros con fines publicitarios y de marketing. </span><span style=\"vertical-align: inherit;\">También podemos recibir información de terceros que nos brindan servicios a través de balizas web y otras tecnologías descritas en esta Política de privacidad.</span></span></li></ul></li></ul>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">5. Uso de fichas</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Un token de dispositivo es un identificador único emitido al sitio web por el sistema operativo de su dispositivo móvil. </span><span style=\"vertical-align: inherit;\">Podemos usar o acceder a uno o más tokens de dispositivo para los siguientes propósitos:</span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">autenticación: utilizamos tokens para identificar a los usuarios del sitio web y/o la ubicación de las personas que acceden al sitio web;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">estado: usamos tokens para ayudarnos a determinar si ha iniciado sesión en nuestro sitio web;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">personalización: utilizamos tokens para almacenar información sobre sus preferencias y personalizar el sitio web para usted;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">seguridad: utilizamos tokens como un elemento de las medidas de seguridad utilizadas para proteger las cuentas de los usuarios, incluida la prevención del uso fraudulento de las credenciales de inicio de sesión, y para proteger nuestro sitio web y nuestros servicios en general;</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">publicidad: usamos tokens para ayudarnos a mostrar anuncios que serán relevantes para usted</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">diagnóstico: usamos tokens para diagnosticar problemas con nuestros Servicios y servidores; </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">análisis: utilizamos tokens para ayudarnos a analizar el uso y el rendimiento de nuestro sitio web y nuestros servicios.</span></span></li></ul>\n      \n      \n      \n      <p><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Cookies o tokens utilizados por nuestros proveedores y vendedores de servicios</span></span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Nuestros proveedores de servicios y vendedores pueden usar cookies y esas cookies pueden almacenarse en su computadora cuando visita nuestro sitio web. </span><span style=\"vertical-align: inherit;\">Nos esforzaremos por alertarlo sobre la identidad de dichos proveedores de servicios y vendedores en esta Política de privacidad en caso de que se utilicen dichas cookies.</span></span></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Nuestros proveedores de servicios y vendedores pueden cambiar de vez en cuando, o los servicios adicionales que decidamos incluir. </span><span style=\"vertical-align: inherit;\">Si bien actualizaremos periódicamente nuestra lista de dichos vendedores y proveedores de servicios, es posible que la lista anterior no esté completa en un momento dado.</span></span></li></ul>\n      \n      \n      \n      <p><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Gestión de cookies</span></span></span></p>\n      \n      \n      \n      <ul><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">La mayoría de los navegadores le permiten negarse a aceptar cookies y eliminar cookies. </span><span style=\"vertical-align: inherit;\">Los métodos para hacerlo varían de un navegador a otro y de una versión a otra. </span><span style=\"vertical-align: inherit;\">No obstante, puede obtener información actualizada sobre el bloqueo y eliminación de cookies a través de estos enlaces:</span></span><ul><li><a href=\"https://support.google.com/chrome/answer/95647?hl=en\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://support.google.com/chrome/answer/95647?hl=en</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Chrome);</span></span></li><li><a href=\"https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Firefox);</span></span></li><li><a href=\"http://www.opera.com/help/tutorials/security/cookies/\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">http://www.opera.com/help/tutorials/security/cookies/</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Opera);</span></span></li><li><a href=\"https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Internet Explorer);</span></span></li><li><a href=\"https://support.apple.com/kb/PH21411\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://support.apple.com/kb/PH21411</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Safari); </span><span style=\"vertical-align: inherit;\">y</span></span></li><li><a href=\"https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> (Edge).</span></span></li></ul></li><li><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">El bloqueo de algunas o todas las cookies puede tener un impacto negativo en la usabilidad del sitio web.</span></span></li></ul>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">6. Cómo usamos la información que recopilamos</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Usamos la información que recopilamos de varias maneras. </span><span style=\"vertical-align: inherit;\">En general, utilizamos la información que recopilamos, incluida la información proporcionada por usted, sus datos personales y los datos agregados/desidentificados, para proporcionar los Servicios.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">También podemos utilizar la información que recopilamos internamente en nuestro negocio para muchos fines comerciales, como para: (i) proporcionar los Servicios que puede buscar o que están disponibles en el sitio web; </span><span style=\"vertical-align: inherit;\">(ii) proporcionar datos agregados o de otro tipo a terceros con respecto a los resultados de sus informes y monitoreo en y a través del sitio web, con o sin otros datos agregados; </span><span style=\"vertical-align: inherit;\">(iii) analizar tendencias y realizar investigaciones; </span><span style=\"vertical-align: inherit;\">(iv) brindar soporte y responder a las preguntas de nuestros usuarios, visitantes del sitio web y clientes; </span><span style=\"vertical-align: inherit;\">(v) mejorar nuestro sitio web; </span><span style=\"vertical-align: inherit;\">(vi) conocer las necesidades de los usuarios y clientes; </span><span style=\"vertical-align: inherit;\">(vii) contactar a los usuarios con fines de investigación, información y marketing, incluida la personalización de nuestro sitio web; </span><span style=\"vertical-align: inherit;\">(viii) realizar un seguimiento de los patrones de tráfico y el uso del sitio web; </span><span style=\"vertical-align: inherit;\">(ix) brindar atención al cliente y soporte técnico; </span><span style=\"vertical-align: inherit;\">(x) correlacionar la información con otra información disponible comercialmente para identificar datos demográficos, necesidades de informes y seguimiento, condiciones de los senderos, impacto del usuario y cualquier otro servicio o información que se ofrezca en el sitio web o a través de este; </span><span style=\"vertical-align: inherit;\">(xi) proporcionarle información de marketing, promocional u otra información relevante específica; </span><span style=\"vertical-align: inherit;\">(xii) abordar la seguridad de la información y/o las prácticas de privacidad, el funcionamiento de la red, la ingeniería y los problemas de solución de problemas; </span><span style=\"vertical-align: inherit;\">(xiii) investigar reclamos y/o acciones legales, violaciones de leyes o acuerdos, y el cumplimiento de las leyes y procesos legales aplicables; </span><span style=\"vertical-align: inherit;\">(xiv) cumplir con la ley, o en base a nuestra creencia de buena fe de que es necesario cumplir con la ley, o de otro modo divulgar información para prevenir el fraude para reducir los riesgos crediticios, para cooperar con la policía y otras autoridades gubernamentales, </span><span style=\"vertical-align: inherit;\">o para proteger los derechos, la propiedad o la seguridad de los visitantes del sitio web, nuestros socios o clientes, o el público; </span><span style=\"vertical-align: inherit;\">y (xv) procesar o participar en una venta de todo o parte de nuestro(s) negocio(s)/organización(es), o si pasamos por una reorganización o fusión.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">También podemos compartir datos personales e información de identificación no personal externamente con nuestros afiliados y socios comerciales, así como con otros proveedores de servicios externos que nos ayuden a proporcionar servicios operativos para el sitio y nuestro negocio, lo que puede incluir, pero no es limitado necesariamente a: entidades comerciales que brindan servicios de administración de direcciones de correo electrónico y contacto de comunicación, proveedores de administración de equipos de red y aplicaciones y entidades de hospedaje, proveedores de contabilidad judicial, administrativa y/o legal o financiera en caso de que la información deba ser revisada o divulgada en respuesta a investigaciones civiles y/o penales, reclamos, demandas, o si estamos sujetos a procesos judiciales o administrativos (como una citación) para divulgar su información o para enjuiciar o defender acciones legales,y otros proveedores de servicios que pueden estar involucrados en los otros tipos de servicios y actividades discutidos en esta Política de privacidad.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">También podemos utilizar sus datos personales para comunicarnos con usted de otras formas distintas al correo electrónico o correo postal, como por teléfono o fax. </span><span style=\"vertical-align: inherit;\">Todo uso de información de identificación personal estará permitido por la ley aplicable.</span></span></p>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">7. Transferencias comerciales</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si la Compañía o sustancialmente todos sus activos fueran adquiridos, o en el improbable caso de que la Compañía cierre su negocio o entre en bancarrota, la información del usuario sería uno de los activos que un tercero transfiere o adquiere. </span><span style=\"vertical-align: inherit;\">Usted reconoce que tales transferencias pueden ocurrir y que cualquier adquirente de la Compañía puede continuar usando sus datos personales como se establece en esta Política de Privacidad.</span></span></p>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">8. Sus opciones sobre la información que recopilamos</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si no acepta la forma en que podemos usar sus datos personales, no nos envíe ningún dato personal. </span><span style=\"vertical-align: inherit;\">Tenga en cuenta que si no nos proporciona ciertos datos personales, es posible que la Compañía no pueda permitirle usar o acceder al sitio web, o que los servicios y/o la información en o a través del sitio web no sean tan buenos como podrían ser. .</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si no desea recibir nuestros correos electrónicos, haga clic en el enlace para darse de baja que se encuentra en nuestros correos electrónicos o opte por no participar en el perfil de su cuenta.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si no desea recibir otros materiales de marketing de nuestra parte y/o si no desea que compartamos sus datos personales con otras entidades como se indica en esta Política de privacidad, indíquenos su nombre y dirección exactos y avísenos que desea optar por no compartir información o recibir información de nosotros o ambos, según sea el caso, e incluya las palabras \"OPT-OUT\" en TODO MAYÚSCULAS en la línea de asunto. </span><span style=\"vertical-align: inherit;\">Tenga en cuenta que los datos anónimos y agregados, incluidos sus datos personales, aún pueden compartirse, pero no serán identificados ni identificables para usted. </span><span style=\"vertical-align: inherit;\">Dirija su solicitud de exclusión a los siguientes contactos:</span></span></p>\n      \n      \n      \n      <p><strong><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Dirección de correo electrónico: </span></span></strong><a href=\"mailto:gabrowitt@gmail.com\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">gabrowitt@gmail.com</span></span></a></p>\n      \n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">9. Privacidad de los niños que visitan el sitio web</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Reconocemos la importancia de la seguridad y privacidad de los niños. </span><span style=\"vertical-align: inherit;\">El sitio web no está diseñado para atraer a niños y no está destinado a ser utilizado por niños menores de 18 años. No solicitamos ni recopilamos a sabiendas ninguna información de identificación personal de niños menores de 18 años.</span></span></p>\n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">10. Visitantes del sitio web desde fuera de Ecuador</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si está visitando el sitio web desde una ubicación fuera de Ecuador, no debe usar el sitio web y no tiene permiso para hacerlo. </span><span style=\"vertical-align: inherit;\">Su conexión puede ser a través y hacia servidores ubicados en Ecuador. </span><span style=\"vertical-align: inherit;\">Tenga en cuenta que las leyes de protección de datos en Ecuador y otros países pueden no ser las mismas que las de su país. </span><span style=\"vertical-align: inherit;\">Al usar el sitio web y/o enviarnos información, usted acepta específicamente la transferencia de su información a Ecuador a las instalaciones y servidores que usamos, y a aquellos con quienes podemos compartir su información.</span></span></p>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">11. Seguridad</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Creemos en proporcionar una experiencia segura para todos nuestros visitantes en línea. </span><span style=\"vertical-align: inherit;\">Con ese fin, hemos implementado medidas de seguridad para proteger la información recopilada de usted. </span><span style=\"vertical-align: inherit;\">Mantenemos medidas de seguridad físicas y electrónicas razonables diseñadas para limitar el acceso no autorizado a su información de identificación personal y para protegerlo contra el mal uso delictivo de esa información.</span></span></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si bien utilizamos las medidas de seguridad anteriores para proteger su información, tenga en cuenta que no se puede garantizar que los datos transmitidos a través de Internet o almacenados y utilizados con fines comerciales sean completamente seguros. </span><span style=\"vertical-align: inherit;\">Ninguna medida de seguridad es perfecta o impenetrable. </span><span style=\"vertical-align: inherit;\">No podemos garantizar que solo las personas autorizadas verán su información. </span><span style=\"vertical-align: inherit;\">No podemos garantizar que la información que comparte en el sitio web no esté disponible públicamente. </span><span style=\"vertical-align: inherit;\">Puede reducir estos riesgos utilizando prácticas de seguridad de sentido común, como elegir una contraseña segura, usar diferentes contraseñas para diferentes servicios y usar un software antivirus actualizado.</span></span></p>\n      \n      \n      \n      <p><strong><span><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">13. Preguntas/Cambios en el Aviso</span></span></span></strong></p>\n      \n      \n      \n      <p><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">Si tiene preguntas o inquietudes con respecto a nuestra Política de privacidad, puede contactarnos en </span></span><a href=\"mailto:gabrowitt@gmail.com\"><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\">gabrowitt@gmail.com</span></span></a><span style=\"vertical-align: inherit;\"><span style=\"vertical-align: inherit;\"> &nbsp; . Podemos optar por cambiar o modificar nuestra Política de privacidad; </span><span style=\"vertical-align: inherit;\">en tal caso, publicaremos los cambios de aviso en nuestra Política de privacidad en el sitio web.</span></span></p>\n      </div>\n  </ion-grid>\n</ion-content>";

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