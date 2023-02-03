"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_shared_shared_module_ts"],{

/***/ 50317:
/*!**********************************************************!*\
  !*** ./src/app/core/services/modules/billing.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BillingService": () => (/* binding */ BillingService)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../firestore-actions.service */ 14871);
/* harmony import */ var src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/utilities/error-handler.service */ 43570);
/* harmony import */ var src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/time-handler */ 8123);
/* harmony import */ var _calendar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./calendar.service */ 16695);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/firestore */ 31866);
/* harmony import */ var _reservations_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reservations.service */ 53957);
/* harmony import */ var _requests_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./requests.service */ 25293);











let BillingService = class BillingService {
  constructor(firestore, error, time, calendar, reservation, services, utility) {
    this.firestore = firestore;
    this.error = error;
    this.time = time;
    this.calendar = calendar;
    this.reservation = reservation;
    this.services = services;
    this.utility = utility;
    this.ReceiptFolder = 'billing';
    this.ReceiptFolder = 'billing';
  }

  createReceipt(data) {
    return new Promise((resolve, reject) => {
      this.firestore.createDocument(this.ReceiptFolder, data).then(doc => {
        resolve(doc);
      }).catch(error => {
        reject(this.error.handle(error));
      });
    });
  }

  UpdateReceipt(data) {
    return new Promise((resolve, reject) => {
      this.firestore.setNamedDocument(this.ReceiptFolder, data.uid, data).then(docs => {
        resolve(docs);
      }).catch(error => {
        reject(this.error.handle(error));
      });
    });
  }

  readAllReceiptList() {
    return new Promise((resolve, reject) => {
      this.firestore.readCollectionOrderBy(this.ReceiptFolder, 'receiptDate').then(docs => {
        resolve(docs);
      }).catch(error => {
        reject(this.error.handle(error));
      });
    });
  }

  readMonthReceiptList(startMonth, endMonth) {
    return new Promise((resolve, reject) => {
      this.firestore.readReceiptsByMonth(this.ReceiptFolder, startMonth, endMonth).then(docs => {
        resolve(docs);
      }).catch(error => {
        reject(this.error.handle(error));
      });
    });
  }

  changeReceiptStatus(data, status, currentUser) {
    var _this = this;

    return new Promise( /*#__PURE__*/function () {
      var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        try {
          if (!data.history) {
            data.history = [];
          }

          const newItem = {
            updateAt: _this.time.dateTransform((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.serverTimestamp)()),
            updateByUID: currentUser.uid,
            updateByName: currentUser.name + ' ' + currentUser.lastName,
            status: status
          };
          data.history.push(newItem);
          yield _this.UpdateReceipt(data);
          resolve(data);
        } catch (error) {
          console.log(error);
          reject('error');
        }
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  generateReceipt(receiptNumber, receiptDate, user, currentUser, request, reservation) {
    var _this2 = this;

    return new Promise( /*#__PURE__*/function () {
      var _ref2 = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        try {
          let myReceipt = {
            receiptDate: receiptDate,
            ruc: '1791430751001',
            receiptNumber: receiptNumber,
            userUID: user.uid,
            userName: user.name + ' ' + user.lastName,
            userCI: user.CI,
            address: 'Av. Rep. del Salvador 734 y Av. Portugal' + ' ' + user.leases[0].spaceLease.description,
            itemDetail: [],
            total: 0,
            status: 'Pendiente',
            userSignature: '',
            createdBy: yield _this2.utility.createShortUser(currentUser)
          };

          const dates = _this2.time.getMonthDates(receiptDate);

          const reservations = yield _this2.reservation.readUserReservationsByMonth(dates.start, dates.end, 'startDate', user.uid);
          const services = yield _this2.services.readUserServicesByMonth(dates.start, dates.end, 'scheduleDate', user.uid); // Leases

          user.leases.forEach(lease => {
            const subtotal = parseFloat(lease.monthlyCost.toFixed(2));
            const leaseItem = {
              itemDescription: lease.spaceLease.description,
              numberItems: '1',
              unitValue: '' + lease.monthlyCost.toFixed(2),
              totalValue: '' + lease.monthlyCost.toFixed(2)
            };
            myReceipt.itemDetail.push(leaseItem);
            myReceipt.total = myReceipt.total + subtotal;
          }); // Reservation

          reservations.forEach(reserve => {
            if (reserve.status === 'Aprobado') {
              const subtotal = parseFloat('' + reserve.reservation.price).toFixed(2);
              const leaseItem = {
                itemDescription: reserve.reservation.unitNumber + ' ' + _this2.time.timeSchedule(reserve.startDate),
                numberItems: '1',
                unitValue: subtotal,
                totalValue: subtotal
              };
              myReceipt.itemDetail.push(leaseItem);
              myReceipt.total = myReceipt.total + parseFloat(subtotal);
            }
          }); // Services

          services.forEach(service => {
            if (service.status === 'Terminado') {
              const subtotal = service.service.maintenance ? '0' : parseFloat('' + service.service.cost).toFixed(2);
              const leaseItem = {
                itemDescription: service.service.name + ' ' + _this2.time.timeSchedule(service.updatedAt),
                numberItems: '1',
                unitValue: subtotal,
                totalValue: subtotal
              };
              myReceipt.itemDetail.push(leaseItem);
              myReceipt.total = myReceipt.total + parseFloat(subtotal);
            }
          });
          myReceipt.total = parseFloat(myReceipt.total.toFixed(2));
          yield _this2.createReceipt(myReceipt);
          resolve(myReceipt);
        } catch (error) {
          console.log(error);
          reject('Error');
        }
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  }

  eraseBill(bill) {
    this.firestore.deleteDocument(this.ReceiptFolder, bill.uid).then(() => {
      console.log('erased receipt: ' + bill.receiptNumber + ' - uid: ' + bill.uid);
    });
  }

};

BillingService.ctorParameters = () => [{
  type: _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__.FirestoreActionsService
}, {
  type: src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_2__.ErrorHandlerService
}, {
  type: src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_3__.TimeHandlerModule
}, {
  type: _calendar_service__WEBPACK_IMPORTED_MODULE_4__.CalendarService
}, {
  type: _reservations_service__WEBPACK_IMPORTED_MODULE_7__.ReservationsService
}, {
  type: _requests_service__WEBPACK_IMPORTED_MODULE_8__.RequestsService
}, {
  type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_5__.VerificationFuncService
}];

BillingService = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injectable)({
  providedIn: 'root'
})], BillingService);


/***/ }),

/***/ 16695:
/*!***********************************************************!*\
  !*** ./src/app/core/services/modules/calendar.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalendarService": () => (/* binding */ CalendarService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _firestore_actions_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../firestore-actions.service */ 14871);
/* harmony import */ var src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/utilities/time-handler */ 8123);
/* harmony import */ var src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/utilities/error-handler.service */ 43570);





let CalendarService = class CalendarService {
    constructor(firestore, error, time) {
        this.firestore = firestore;
        this.error = error;
        this.time = time;
        this.reservationsFolder = 'reservationsCalendar';
        this.serviceRequestFolder = 'servicesCalendar';
        this.reservationsFolder = 'reservationsCalendar';
        this.serviceRequestFolder = 'servicesCalendar';
    }
    confirmReservation(data) {
        return new Promise((resolve, reject) => {
            const timeSlot = {
                uid: data.uid,
                scheduleDate: data.scheduleDate,
                startDate: data.startDate,
                endDate: data.endDate,
                unitNumber: data.reservation.unitNumber,
                spaceUID: data.uid,
                floor: data.reservation.floor,
            };
            this.firestore.setNamedDocument(this.reservationsFolder, data.uid, timeSlot)
                .then((doc) => { resolve(doc); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    cancelReservation(data) {
        return new Promise((resolve, reject) => {
            this.firestore.deleteDocument(this.reservationsFolder + this.time.getShortDateUTC(data.startDate), data.uid)
                .then((doc) => { resolve(doc); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    confirmService(data, staff) {
        return new Promise((resolve, reject) => {
            const timeSlot = {
                uid: data.uid,
                scheduleDate: data.scheduleDate,
                startDate: data.startDate,
                endDate: data.endDate,
                unitNumber: data.service.unitNumber,
                employeeUID: staff.uid,
                employeePhoto: staff.photo,
                employeeFullName: staff.name + ' ' + staff.lastName
            };
            this.firestore.setNamedDocument(this.serviceRequestFolder, data.uid, timeSlot)
                .then((doc) => { resolve(doc); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    createCalendar(data) {
        return new Promise((resolve, reject) => {
            this.firestore.createDocument(this.reservationsFolder, data)
                .then(doc => { resolve(doc); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    UpdateCalendar(data) {
        return new Promise((resolve, reject) => {
            this.firestore.setNamedDocument(this.reservationsFolder, data.uid, data)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readReservationCalendar() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollection(this.reservationsFolder)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readServicesCalendar() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollection(this.serviceRequestFolder)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readScheduleServicesByUser(uid) {
        return new Promise((resolve, reject) => {
            this.firestore.readCollectionFilter(this.serviceRequestFolder, 'employeeUID', uid)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readFutureServicesByUser(uid, startDate, filterOperator) {
        return new Promise((resolve, reject) => {
            this.firestore.readServicesAssignedByDate(this.serviceRequestFolder, uid, startDate, filterOperator)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
};
CalendarService.ctorParameters = () => [
    { type: _firestore_actions_service__WEBPACK_IMPORTED_MODULE_0__.FirestoreActionsService },
    { type: src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_2__.ErrorHandlerService },
    { type: src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_1__.TimeHandlerModule }
];
CalendarService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], CalendarService);



/***/ }),

/***/ 2941:
/*!*********************************************************!*\
  !*** ./src/app/core/services/modules/notice.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoticeService": () => (/* binding */ NoticeService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/utilities/error-handler.service */ 43570);
/* harmony import */ var _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../firestore-actions.service */ 14871);




let NoticeService = class NoticeService {
    constructor(firestore, error) {
        this.firestore = firestore;
        this.error = error;
        this.noticeFolder = 'notices';
    }
    getNoticeType() {
        return [
            { icon: 'information-circle-outline', name: 'INFORMACIÓN' },
            { icon: 'hammer-outline', name: 'REPARACIONES' },
            { icon: 'calendar-outline', name: 'EVENTOS' },
        ];
    }
    createNotice(data) {
        return new Promise((resolve, reject) => {
            this.firestore.createDocument(this.noticeFolder, data)
                .then(doc => { resolve(doc); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    UpdateNotice(data) {
        return new Promise((resolve, reject) => {
            this.firestore.setNamedDocument(this.noticeFolder, data.uid, data)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readNoticeList() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollectionOrderBy(this.noticeFolder, 'createdAt')
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    addComment(NoticeUID, comments) {
        return new Promise((resolve, reject) => {
            this.firestore.setNamedDocument(this.noticeFolder, NoticeUID, { comments })
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    addLike(NoticeUID, likes) {
        return new Promise((resolve, reject) => {
            this.firestore.setNamedDocument(this.noticeFolder, NoticeUID, { likes })
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
};
NoticeService.ctorParameters = () => [
    { type: _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__.FirestoreActionsService },
    { type: src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_0__.ErrorHandlerService }
];
NoticeService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
        providedIn: 'root'
    })
], NoticeService);



/***/ }),

/***/ 25293:
/*!***********************************************************!*\
  !*** ./src/app/core/services/modules/requests.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestsService": () => (/* binding */ RequestsService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/utilities/error-handler.service */ 43570);
/* harmony import */ var _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../firestore-actions.service */ 14871);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ 31866);
/* harmony import */ var src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/time-handler */ 8123);






let RequestsService = class RequestsService {
    constructor(firestore, time, error) {
        this.firestore = firestore;
        this.time = time;
        this.error = error;
        this.RequestFolder = 'requests';
        this.RequestFolder = 'requests';
    }
    createRequest(data) {
        return new Promise((resolve, reject) => {
            this.firestore.createDocument(this.RequestFolder, data)
                .then(doc => { resolve(doc); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    UpdateRequest(data, user) {
        if (!data.history) {
            data.history = [];
        }
        const newItem = {
            updateAt: this.time.dateTransform((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.serverTimestamp)()),
            updateByUID: user.uid,
            updateByName: user.name + ' ' + user.lastName,
            status: data.status
        };
        data.history.push(newItem);
        return new Promise((resolve, reject) => {
            this.firestore.setNamedDocument(this.RequestFolder, data.uid, data)
                .then((doc) => { resolve(doc); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readRequestList() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollection(this.RequestFolder)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readRequestListOrder() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollectionOrderBy(this.RequestFolder, 'startDate')
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readRequestListOrderRent(filterName, filterValue, filterOp) {
        return new Promise((resolve, reject) => {
            if (filterOp === 'unassigned') {
                this.firestore.readCollectionOrderFilter(this.RequestFolder, 'startDate', null, 'status')
                    .then((docs) => { resolve(docs); })
                    .catch((error) => { reject(this.error.handle(error)); });
            }
            else {
                this.firestore.readCollectionOrderFilter(this.RequestFolder, filterName, filterValue, 'startDate', filterOp)
                    .then((docs) => { resolve(docs); })
                    .catch((error) => { reject(this.error.handle(error)); });
            }
        });
    }
    readResidentRequestListOrderRent(filterName, filterValue, filterOp) {
        return new Promise((resolve, reject) => {
            this.firestore.readCollectionOrderFilter(this.RequestFolder, filterName, filterValue, 'startDate', filterOp)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readUserServicesByMonth(startDate, endDate, orderField, userUID) {
        return new Promise((resolve, reject) => {
            this.firestore.readMonthDocs(this.RequestFolder, startDate, endDate, orderField, userUID)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
};
RequestsService.ctorParameters = () => [
    { type: _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__.FirestoreActionsService },
    { type: src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_3__.TimeHandlerModule },
    { type: src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_0__.ErrorHandlerService }
];
RequestsService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], RequestsService);



/***/ }),

/***/ 53957:
/*!***************************************************************!*\
  !*** ./src/app/core/services/modules/reservations.service.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationsService": () => (/* binding */ ReservationsService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/utilities/error-handler.service */ 43570);
/* harmony import */ var _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../firestore-actions.service */ 14871);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ 31866);
/* harmony import */ var src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/time-handler */ 8123);






let ReservationsService = class ReservationsService {
    constructor(firestore, time, error) {
        this.firestore = firestore;
        this.time = time;
        this.error = error;
        this.ReservationsFolder = 'reservations';
        this.ReservationsFolder = 'reservations';
    }
    createReservations(data) {
        return new Promise((resolve, reject) => {
            this.firestore.createDocument(this.ReservationsFolder, data)
                .then(doc => { resolve(doc); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    UpdateReservations(data, user) {
        return new Promise((resolve, reject) => {
            if (!data.history) {
                data.history = [];
            }
            const newItem = {
                updateAt: this.time.dateTransform((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.serverTimestamp)()),
                updateByUID: user.uid,
                updateByName: user.name + ' ' + user.lastName,
                status: data.status
            };
            data.history.push(newItem);
            this.firestore.setNamedDocument(this.ReservationsFolder, data.uid, data)
                .then((doc) => { resolve(doc); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readReservationsList() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollection(this.ReservationsFolder)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readReservationsListOrder() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollectionOrderBy(this.ReservationsFolder, 'unitNumber')
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readReservationsListOrderRent(filterName, filterValue, filterOp) {
        return new Promise((resolve, reject) => {
            this.firestore.readCollectionOrderFilter(this.ReservationsFolder, filterName, filterValue, 'startDate', filterOp)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readUserReservationsListOrderRent(filterName, filterValue, userUID, filterOp) {
        return new Promise((resolve, reject) => {
            this.firestore.readUserCollectionOrderFilter(this.ReservationsFolder, filterName, filterValue, 'startDate', userUID, filterOp)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readUserReservationsByMonth(startDate, endDate, orderField, userUID) {
        return new Promise((resolve, reject) => {
            this.firestore.readMonthDocs(this.ReservationsFolder, startDate, endDate, orderField, userUID)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
};
ReservationsService.ctorParameters = () => [
    { type: _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__.FirestoreActionsService },
    { type: src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_3__.TimeHandlerModule },
    { type: src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_0__.ErrorHandlerService }
];
ReservationsService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], ReservationsService);



/***/ }),

/***/ 59269:
/*!*********************************************************!*\
  !*** ./src/app/core/services/modules/spaces.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpacesService": () => (/* binding */ SpacesService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/utilities/error-handler.service */ 43570);
/* harmony import */ var _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../firestore-actions.service */ 14871);




let SpacesService = class SpacesService {
    constructor(firestore, error) {
        this.firestore = firestore;
        this.error = error;
        this.SpacesFolder = 'spaces';
        this.CommunityFolder = 'communities';
        this.SpacesFolder = 'spaces';
        this.CommunityFolder = 'communities';
    }
    readCommunityList() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollection(this.CommunityFolder)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    UpdateCommunity(data) {
        return new Promise((resolve, reject) => {
            this.firestore.setNamedDocument(this.CommunityFolder, data.uid, data)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    createSpaces(data) {
        return new Promise((resolve, reject) => {
            this.firestore.createDocument(this.SpacesFolder, data)
                .then(doc => { resolve(doc); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    UpdateSpaces(data) {
        return new Promise((resolve, reject) => {
            this.firestore.setNamedDocument(this.SpacesFolder, data.uid, data)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readSpacesList() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollection(this.SpacesFolder)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readSpace(uid) {
        return new Promise((resolve, reject) => {
            this.firestore.readDocument(this.SpacesFolder, uid)
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readSpacesListOrder() {
        return new Promise((resolve, reject) => {
            this.firestore.readCollectionOrderBy(this.SpacesFolder, 'type')
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readSpacesListOrderType(type) {
        return new Promise((resolve, reject) => {
            this.firestore.readCollectionOrderFilter(this.SpacesFolder, 'type', type, 'unitNumber')
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
    readSpacesListOrderRent(filterName, filterValue) {
        return new Promise((resolve, reject) => {
            this.firestore.readCollectionOrderFilter(this.SpacesFolder, filterName, filterValue, 'unitNumber')
                .then((docs) => { resolve(docs); })
                .catch((error) => { reject(this.error.handle(error)); });
        });
    }
};
SpacesService.ctorParameters = () => [
    { type: _firestore_actions_service__WEBPACK_IMPORTED_MODULE_1__.FirestoreActionsService },
    { type: src_app_shared_utilities_error_handler_service__WEBPACK_IMPORTED_MODULE_0__.ErrorHandlerService }
];
SpacesService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
        providedIn: 'root'
    })
], SpacesService);



/***/ }),

/***/ 49599:
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/assign-space/assign-space.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssignSpaceComponent": () => (/* binding */ AssignSpaceComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _assign_space_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assign-space.component.html?ngResource */ 96152);
/* harmony import */ var _assign_space_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assign-space.component.scss?ngResource */ 64393);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/spaces.service */ 59269);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);









let AssignSpaceComponent = class AssignSpaceComponent {
  constructor(modal, spaces, users, alerts) {
    this.modal = modal;
    this.spaces = spaces;
    this.users = users;
    this.alerts = alerts;
    this.loading = false;
    this.edit = false;
    this.showCalendar = false;
    this.showCalendar2 = false;
    this.defaultUser = '../../../../assets/profile/ProfileBlank.png';
    this.defaultSpace = '../../../../assets/blueprint.png';
    this.spacesList = [];
    this.listSelected = [];
  }

  ngOnInit() {
    this.loading = true;
    this.currentUser = this.userData;
    this.currentShortUser = {
      uid: this.userData.uid,
      photo: this.userData.photo,
      email: this.userData.email,
      name: this.userData.name
    };
    this.spaces.readSpacesListOrder().then(list => {
      let available = [];
      list.forEach(item => {
        if (item.spaceType === 'privado') {
          available.push(item);
        }
      });
      this.spacesList = available;
      this.loading = false;
      console.log(this.spacesList);
    });
  }

  editSpaces() {
    if (this.edit || this.alreadyLease) {
      this.currentUser = this.userData;
      this.selectedSpace = null;
      this.alreadyLease = null;
      this.edit = false;
    } else {
      this.edit = true;
    }
  }

  selectSpace(lease) {
    this.alreadyLease = lease;
    let spaceObj = this.spacesList.find(space => space.uid === lease.spaceLease.uid);
    this.editSpaceLease(spaceObj);
  }

  newSpace(e) {
    let spaceObj = this.spacesList.find(space => space.uid === e.detail.value);
    this.editSpaceLease(spaceObj);
  }

  costListener(e) {
    this.selectedSpace.monthlyCost = e.detail.value;
  }

  editSpaceLease(spaceObj) {
    let newLease = {
      spaceLease: {
        uid: spaceObj.uid,
        unitNumber: spaceObj.unitNumber,
        communityUID: spaceObj.communityUID,
        description: spaceObj.description,
        floor: spaceObj.floor,
        photo: spaceObj.photo,
        type: spaceObj.type
      },
      userLease: this.currentShortUser,
      leaseStart: new Date().toISOString(),
      leaseEnd: '',
      status: 'active',
      monthlyCost: 0
    };
    this.selectedSpace = newLease;
  }

  showCalendar1() {
    this.showCalendar = !this.showCalendar;
  }

  changeLeaseStartTime(event) {
    this.showCalendar = false;
    this.selectedSpace.leaseStart = new Date(event).toISOString();
  }

  sendData() {
    this.loading = true;
    this.checkPreviousLease(this.selectedSpace).then(data => {
      if (!data) {
        console.log('error');
      } else {
        this.alerts.showAlert('Asignación', this.selectedSpace.spaceLease.type.toUpperCase() + ' ' + this.selectedSpace.spaceLease.unitNumber + ' ha sido agregado exitosamente');
        this.modal.dismiss(true);
      }

      this.loading = false;
    });
  }

  checkPreviousLease(lease) {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        let spaceObj = _this.spacesList.find(space => space.uid === lease.spaceLease.uid);

        if (spaceObj.lease) {
          let oldLease = yield _this.terminateLease(spaceObj, lease.spaceLease.uid);

          if (oldLease && !spaceObj.leaseHistory) {
            spaceObj.leaseHistory = [oldLease];
          } else {
            spaceObj.leaseHistory.push(oldLease);
          }
        }

        spaceObj.lease = lease;
        spaceObj.lease.monthlyCost = parseFloat('' + spaceObj.lease.monthlyCost);
        yield _this.spaces.UpdateSpaces(spaceObj);

        if (_this.currentUser.leases?.length > 0) {
          _this.currentUser.leases.push(lease);
        } else {
          _this.currentUser.leases = [lease];
        }

        yield _this.users.updateUser(_this.currentUser);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    })();
  }

  terminateLease(spaceObj, uid) {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        let oldLease;
        let previousUser = yield _this2.users.readUser(spaceObj.lease.userLease.uid);
        previousUser.leases.forEach(leaseUser => {
          if (leaseUser.spaceLease.uid === uid) {
            leaseUser.leaseEnd = new Date().toISOString();
            leaseUser.status = 'unactive';
            oldLease = leaseUser;
          }
        });
        yield _this2.users.updateUser(previousUser);
        return oldLease;
      } catch (error) {
        console.log(error);
        return null;
      }
    })();
  }

  closeLease() {
    var _this3 = this;

    this.alerts.AlertConfirm(this.alreadyLease.spaceLease.type.toUpperCase() + ' ' + this.alreadyLease.spaceLease.unitNumber, '¿Seguro que desea finalizar esta asignación?').then( /*#__PURE__*/function () {
      var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (answer) {
        if (answer) {
          _this3.loading = true;

          try {
            let spaceObj = _this3.spacesList.find(space => space.uid === _this3.alreadyLease.spaceLease.uid);

            let oldLease = yield _this3.terminateLease(spaceObj, _this3.alreadyLease.spaceLease.uid);

            if (oldLease && !spaceObj.leaseHistory) {
              spaceObj.leaseHistory = [oldLease];
            } else {
              spaceObj.leaseHistory.push(oldLease);
            }

            _this3.loading = false;

            _this3.modal.dismiss(true);
          } catch (error) {
            console.log(error);
            _this3.loading = false;
          }
        }
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

};

AssignSpaceComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController
}, {
  type: src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_3__.SpacesService
}, {
  type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_4__.UsersService
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__.AlertsService
}];

AssignSpaceComponent.propDecorators = {
  userData: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }]
};
AssignSpaceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
  selector: 'app-assign-space',
  template: _assign_space_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_assign_space_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], AssignSpaceComponent);


/***/ }),

/***/ 11537:
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/bills/new-receipt/new-receipt.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewReceiptComponent": () => (/* binding */ NewReceiptComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _new_receipt_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./new-receipt.component.html?ngResource */ 67812);
/* harmony import */ var _new_receipt_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./new-receipt.component.scss?ngResource */ 26934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);







let NewReceiptComponent = class NewReceiptComponent {
    constructor(utility, modal, alerts) {
        this.utility = utility;
        this.modal = modal;
        this.alerts = alerts;
        this.valueList = [];
        this.total = 0;
        this.totalDescription = '';
        this.loading = false;
    }
    ngOnInit() {
    }
    payReceipt() {
        this.modal.dismiss({ action: 'payReceipt' });
    }
    createReceipt() {
    }
};
NewReceiptComponent.ctorParameters = () => [
    { type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_3__.VerificationFuncService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController },
    { type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_2__.AlertsService }
];
NewReceiptComponent.propDecorators = {
    user: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    currentUser: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    receipt: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }]
};
NewReceiptComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-new-receipt',
        template: _new_receipt_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_new_receipt_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], NewReceiptComponent);



/***/ }),

/***/ 98556:
/*!************************************************************************************!*\
  !*** ./src/app/shared/components/bills/receipt-detail/receipt-detail.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReceiptDetailComponent": () => (/* binding */ ReceiptDetailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _receipt_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./receipt-detail.component.html?ngResource */ 5867);
/* harmony import */ var _receipt_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./receipt-detail.component.scss?ngResource */ 65468);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/time-handler */ 8123);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);








let ReceiptDetailComponent = class ReceiptDetailComponent {
    constructor(utility, modal, alerts, time) {
        this.utility = utility;
        this.modal = modal;
        this.alerts = alerts;
        this.time = time;
        this.total = 0;
        this.totalDescription = '';
        this.loading = false;
        this.displayDate = '';
    }
    ngOnInit() {
        console.log(this.currentReceipt);
        this.displayDate = this.time.geDateFullUTC(this.currentReceipt.receiptDate);
        this.totalDescription = this.utility.numeroALetras(parseFloat('' + this.currentReceipt.total));
    }
    fixNumber(currentNumber) {
        let stringNumber = '' + currentNumber;
        do {
            stringNumber = '0' + stringNumber;
        } while (stringNumber.length < 9);
        return stringNumber;
    }
};
ReceiptDetailComponent.ctorParameters = () => [
    { type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_4__.VerificationFuncService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController },
    { type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_2__.AlertsService },
    { type: src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_3__.TimeHandlerModule }
];
ReceiptDetailComponent.propDecorators = {
    currentReceipt: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input }]
};
ReceiptDetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-receipt-detail',
        template: _receipt_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_receipt_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ReceiptDetailComponent);



/***/ }),

/***/ 79058:
/*!********************************************************************************!*\
  !*** ./src/app/shared/components/bills/receipt-item/receipt-item.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReceiptItemComponent": () => (/* binding */ ReceiptItemComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _receipt_item_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./receipt-item.component.html?ngResource */ 10386);
/* harmony import */ var _receipt_item_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./receipt-item.component.scss?ngResource */ 92487);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let ReceiptItemComponent = class ReceiptItemComponent {
    constructor() { }
    ngOnInit() { }
};
ReceiptItemComponent.ctorParameters = () => [];
ReceiptItemComponent.propDecorators = {
    receipt: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
ReceiptItemComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-receipt-item',
        template: _receipt_item_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_receipt_item_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ReceiptItemComponent);



/***/ }),

/***/ 21438:
/*!*****************************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/calendar-service-item/calendar-service-item.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalendarServiceItemComponent": () => (/* binding */ CalendarServiceItemComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _calendar_service_item_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar-service-item.component.html?ngResource */ 5418);
/* harmony import */ var _calendar_service_item_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar-service-item.component.scss?ngResource */ 80622);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let CalendarServiceItemComponent = class CalendarServiceItemComponent {
    constructor() { }
    ngOnInit() { }
};
CalendarServiceItemComponent.ctorParameters = () => [];
CalendarServiceItemComponent.propDecorators = {
    item: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
CalendarServiceItemComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-calendar-service-item',
        template: _calendar_service_item_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_calendar_service_item_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], CalendarServiceItemComponent);



/***/ }),

/***/ 82461:
/*!***************************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/reservation-calendar/reservation-calendar.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationCalendarComponent": () => (/* binding */ ReservationCalendarComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _reservation_calendar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservation-calendar.component.html?ngResource */ 37650);
/* harmony import */ var _reservation_calendar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reservation-calendar.component.scss?ngResource */ 5398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);




let ReservationCalendarComponent = class ReservationCalendarComponent {
    constructor() { }
    ngOnInit() { }
};
ReservationCalendarComponent.ctorParameters = () => [];
ReservationCalendarComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-reservation-calendar',
        template: _reservation_calendar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_reservation_calendar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ReservationCalendarComponent);



/***/ }),

/***/ 18041:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/reservation-item/reservation-item.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReservationItemComponent": () => (/* binding */ ReservationItemComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _reservation_item_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservation-item.component.html?ngResource */ 44802);
/* harmony import */ var _reservation_item_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reservation-item.component.scss?ngResource */ 57297);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let ReservationItemComponent = class ReservationItemComponent {
    constructor() { }
    ngOnInit() { console.log(this.item); }
};
ReservationItemComponent.ctorParameters = () => [];
ReservationItemComponent.propDecorators = {
    item: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
ReservationItemComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-reservation-item',
        template: _reservation_item_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_reservation_item_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ReservationItemComponent);



/***/ }),

/***/ 81091:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/service-calendar/service-calendar.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServiceCalendarComponent": () => (/* binding */ ServiceCalendarComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _service_calendar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-calendar.component.html?ngResource */ 39801);
/* harmony import */ var _service_calendar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service-calendar.component.scss?ngResource */ 92724);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);




let ServiceCalendarComponent = class ServiceCalendarComponent {
    constructor() { }
    ngOnInit() { }
};
ServiceCalendarComponent.ctorParameters = () => [];
ServiceCalendarComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-service-calendar',
        template: _service_calendar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_service_calendar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ServiceCalendarComponent);



/***/ }),

/***/ 67186:
/*!**********************************************************************!*\
  !*** ./src/app/shared/components/new-notice/new-notice.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewNoticeComponent": () => (/* binding */ NewNoticeComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _new_notice_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./new-notice.component.html?ngResource */ 49578);
/* harmony import */ var _new_notice_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./new-notice.component.scss?ngResource */ 85679);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/image-uploader.service */ 36071);
/* harmony import */ var src_app_core_services_modules_notice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/notice.service */ 2941);
/* harmony import */ var src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/attachments.service */ 15909);
/* harmony import */ var _utilities_alerts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utilities/alerts */ 80884);
/* harmony import */ var _utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utilities/verificationFunc */ 94264);











let NewNoticeComponent = class NewNoticeComponent {
  constructor(notices, modal, extra, alerts, images, upload) {
    this.notices = notices;
    this.modal = modal;
    this.extra = extra;
    this.alerts = alerts;
    this.images = images;
    this.upload = upload;
    this.scroll = false;
    this.fullHeight = 0;
    this.showScroll = 0;
    this.defaultUser = 'assets/profile/ProfileBlank.png';
    this.typeList = [];
    this.myNotice = {
      title: '',
      type: null,
      description: '',
      photo: '',
      writer: null,
      comments: [],
      likes: []
    };
    this.loading = true;
    this.editNoticeForm = false;
    this.myLike = false;
    this.progress = 0; // Comments

    this.sending = false;
    this.newComment = {
      text: '',
      user: null
    };
  }

  ngOnInit() {
    this.loadTypes().then(() => {
      this.loading = false;

      if (this.notice) {
        this.myNotice = this.notice;
        this.noticeType = this.notice.type.name;
        this.notice.likes.forEach(like => {
          if (like === this.user.uid) {
            this.myLike = true;
          }
        });
      } else {
        this.extra.createShortUser(this.user).then(writer => {
          this.myNotice.writer = writer;
        });
      }
    });
  }

  loadTypes() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.typeList = yield _this.notices.getNoticeType();
        return 'done';
      } catch (error) {
        console.log(error);
        return 'error';
      }
    })();
  } // IMAGE SYSTEM


  addPhoto() {
    const options = {
      currentRoute: '/news',
      height: null,
      width: null,
      pdf: false
    };
    this.images.presentImageOptions(options).then(imageObj => {
      if (imageObj[0] !== undefined) {
        this.newImage = imageObj[0];
      }
    });
  }

  addAttachment() {
    const options = {
      currentRoute: '/news',
      height: null,
      width: null,
      pdf: false
    };
    this.images.presentImageOptions(options).then(imageObj => {
      if (imageObj[0] !== undefined) {
        this.newImage = imageObj[0];
      }
    });
  }

  uploadPhoto() {
    return new Promise((resolve, reject) => {
      const imageName = Date().toString() + '_Notice_' + this.myNotice.title;
      this.upload.uploadFile('NoticeList', imageName, this.newImage.file, progress => {
        this.progress = progress;
      }).then(data => {
        this.upload.deletePicture();
        resolve(data.url);
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  } // LISTENRES


  handleType(e) {
    this.typeList.forEach(type => {
      if (type.name === e.detail.value) {
        this.myNotice.type = type;
      }
    });
  }

  titleListener(e) {
    this.myNotice.title = e.detail.value;
  }

  descriptionListener(e) {
    this.myNotice.description = e.detail.value;
  }

  editNotice() {
    if (this.editNoticeForm) {
      this.myNotice = this.notice;
      this.editNoticeForm = false;
    } else {
      this.editNoticeForm = true;
    }
  }

  createNotice() {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this2.loading = true;
        _this2.myNotice.writer = yield _this2.extra.createShortUser(_this2.user);

        if (_this2.newImage) {
          _this2.myNotice.photo = yield _this2.uploadPhoto();
        }

        console.log(_this2.myNotice);

        if (_this2.notice) {
          yield _this2.notices.UpdateNotice(_this2.myNotice);
        } else {
          yield _this2.notices.createNotice(_this2.myNotice);
        }

        _this2.alerts.showAlert('ANUNCIOS', _this2.notice ? 'Datos de ' + _this2.myNotice.title + ' actualizados' : 'Nuevo anuncio agregado', 'OK');

        _this2.loading = false;

        _this2.modal.dismiss(true);
      } catch (error) {
        console.log(error);
        _this2.loading = false;
      }
    })();
  }

  commentListener(e) {
    this.newComment.text = e.detail.value;
  }

  pressSend() {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.sending = true;
      _this3.myNotice = _this3.notice;

      try {
        _this3.newComment.user = {
          uid: _this3.user.uid,
          photo: _this3.user.photo,
          email: _this3.user.email,
          name: _this3.user.name + ' ' + _this3.user.lastName
        };

        _this3.myNotice.comments.push(_this3.newComment);

        yield _this3.notices.UpdateNotice(_this3.myNotice);
        setTimeout(() => {
          _this3.sending = false;
        }, 5000);
        _this3.notice.comments = _this3.myNotice.comments;
        _this3.newComment = {
          text: '',
          user: null
        };
      } catch (error) {
        console.log(error);
        _this3.sending = false;
      }
    })();
  }

  checkScroll(scroll, content) {
    this.content = content;

    if (this.fullHeight < scroll.detail.currentY) {
      this.fullHeight = scroll.detail.currentY;
    }

    this.showScroll = this.fullHeight - scroll.detail.scrollTop;
  }

  scrollDown() {
    if (this.content.scrollToBottom) {
      setTimeout(() => {
        this.content.scrollToBottom(400);
        setTimeout(() => {
          this.showScroll = 1;
        }, 1000);
      }, 500);
    }
  }

};

NewNoticeComponent.ctorParameters = () => [{
  type: src_app_core_services_modules_notice_service__WEBPACK_IMPORTED_MODULE_4__.NoticeService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
}, {
  type: _utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_7__.VerificationFuncService
}, {
  type: _utilities_alerts__WEBPACK_IMPORTED_MODULE_6__.AlertsService
}, {
  type: src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_5__.AttachmentsService
}, {
  type: src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_3__.ImageUploaderService
}];

NewNoticeComponent.propDecorators = {
  content: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild,
    args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, {
      static: false
    }]
  }],
  user: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }],
  notice: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }]
};
NewNoticeComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-new-notice',
  template: _new_notice_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_new_notice_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], NewNoticeComponent);


/***/ }),

/***/ 77894:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/components/services/assign-task/assign-task.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssignTaskComponent": () => (/* binding */ AssignTaskComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _assign_task_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assign-task.component.html?ngResource */ 44125);
/* harmony import */ var _assign_task_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assign-task.component.scss?ngResource */ 14258);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_calendar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/calendar.service */ 16695);
/* harmony import */ var src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/requests.service */ 25293);
/* harmony import */ var src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/users.service */ 77464);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/utilities/time-handler */ 8123);











let AssignTaskComponent = class AssignTaskComponent {
  constructor(requests, calendar, alerts, time, usersServ, modal) {
    this.requests = requests;
    this.calendar = calendar;
    this.alerts = alerts;
    this.time = time;
    this.usersServ = usersServ;
    this.modal = modal;
    this.showCalendar = false;
    this.loading = false;
    this.allDays = [true, true, true, true, true, true, true];
    this.minDate = this.time.getStartDate();

    this.availableDays = dateString => {
      const date = new Date(dateString);
      const utcDay = date.getUTCDay();
      return this.allDays[utcDay];
    };

    this.timeSlotStart = {
      hour: null,
      date: null,
      index: null
    };
    this.timeSlotEnd = {
      hour: null,
      date: null,
      index: null
    };
  }

  ngOnInit() {
    this.selectedUserUID = this.currentUser.uid;
    this.selectedStaff = this.currentUser;
    this.loadData();
  }

  loadData() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.myTask = _this.request;
        _this.staffList = yield _this.usersServ.readOnlyStaff();

        if (_this.staffList.length === 0) {
          _this.staffList.push(_this.currentUser);
        }

        console.log(_this.busySlots);

        if (_this.currentUser.type !== 'administrador') {
          _this.allDays = _this.request.service.preferredDays;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }

  userChange(e) {
    this.selectedUserUID = e.detail.value;
    this.staffList.forEach(user => {
      if (user.uid == this.selectedUserUID) {
        this.selectedStaff = user;
      }
    });
  }

  loadBusySlots() {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.busySlots = yield _this2.calendar.readFutureServicesByUser(_this2.selectedStaff.uid, new Date().toISOString(), '>=');

      _this2.busySlots.sort((a, b) => {
        if (a.startDate > b.startDate) {
          return 1;
        }

        if (a.startDate < b.startDate) {
          return -1;
        }

        return 0;
      });
    })();
  }

  showCalendar1() {
    this.showCalendar = !this.showCalendar;
  }

  changeScheduleTime(event) {
    this.showCalendar = false;

    if (event) {
      this.myTask.scheduleDate = new Date(event).toISOString();
      this.createScheduleList();
    } else {
      this.myTask.scheduleDate = this.time.getStartDate();
    }
  }

  createScheduleList() {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.scheduleTimes = yield _this3.time.getScheduleList(_this3.myTask.scheduleDate, '2022-08-07T12:00:00.000Z', '2022-08-07T22:00:00.000Z', _this3.request.service.estimatedTime);
      return 'done';
    })();
  }

  timeSlotClicked(index, timeSlot) {
    var _this4 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this4.scheduleTimes[index].disabled) {
        _this4.alerts.showAlert('Book Reservation', 'La hora de reservacion no está disponible. ');
      } else {
        const answer = yield _this4.time.clickDaySlot(_this4.scheduleTimes, _this4.timeSlotStart, _this4.timeSlotEnd, timeSlot, index, _this4.request.service.estimatedTime, _this4.request.service.estimatedTime);

        if (answer) {
          _this4.scheduleTimes = answer.scheduleTimes;
          _this4.timeSlotStart = answer.timeSlotStart;
          _this4.timeSlotEnd = answer.timeSlotEnd;
          timeSlot = answer.timeSlot;
        }
      }
    })();
  }

  confirmService() {
    var _this5 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const text = _this5.time.geDateFullUTC(_this5.timeSlotStart.date) + 'de ' + _this5.timeSlotStart.hour;

      _this5.alerts.AlertConfirm('', '¿Seguro desea agendar el servicio para ' + text + '?').then( /*#__PURE__*/function () {
        var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (answer) {
          if (answer) {
            try {
              _this5.loading = true;
              _this5.myTask.status = 'Agendado';
              _this5.myTask.startDate = _this5.timeSlotStart.date;
              _this5.myTask.endDate = _this5.timeSlotEnd.date;
              _this5.myTask.employeeUID = _this5.selectedStaff.uid;
              _this5.myTask.employeePhoto = _this5.selectedStaff.photo;
              _this5.myTask.employeeFullName = _this5.selectedStaff.name + '' + _this5.selectedStaff.lastName;
              console.log(_this5.myTask);
              yield _this5.requests.UpdateRequest(_this5.myTask, _this5.currentUser);
              yield _this5.calendar.confirmService(_this5.myTask, _this5.selectedStaff);

              _this5.alerts.showAlert('SERVICIOS', 'Su servico ha sido actualizado', 'OK');

              _this5.loading = false;

              _this5.modal.dismiss(true);
            } catch (error) {
              console.log(error);
              _this5.loading = false;
            }
          }
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    })();
  }

};

AssignTaskComponent.ctorParameters = () => [{
  type: src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_4__.RequestsService
}, {
  type: src_app_core_services_modules_calendar_service__WEBPACK_IMPORTED_MODULE_3__.CalendarService
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_6__.AlertsService
}, {
  type: src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_7__.TimeHandlerModule
}, {
  type: src_app_core_services_modules_users_service__WEBPACK_IMPORTED_MODULE_5__.UsersService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
}];

AssignTaskComponent.propDecorators = {
  currentUser: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }],
  request: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }]
};
AssignTaskComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-assign-task',
  template: _assign_task_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_assign_task_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], AssignTaskComponent);


/***/ }),

/***/ 34065:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/services/detail-request/detail-request.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailRequestComponent": () => (/* binding */ DetailRequestComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _detail_request_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail-request.component.html?ngResource */ 45778);
/* harmony import */ var _detail_request_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail-request.component.scss?ngResource */ 79121);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let DetailRequestComponent = class DetailRequestComponent {
    constructor() {
        this.defaultSpace = '../../../../../assets/blueprint.png';
    }
    ngOnInit() { }
};
DetailRequestComponent.ctorParameters = () => [];
DetailRequestComponent.propDecorators = {
    request: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    reserve: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
DetailRequestComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-detail-request',
        template: _detail_request_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_detail_request_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], DetailRequestComponent);



/***/ }),

/***/ 85585:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/services/detail-service/detail-service.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailServiceComponent": () => (/* binding */ DetailServiceComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _detail_service_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail-service.component.html?ngResource */ 47488);
/* harmony import */ var _detail_service_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail-service.component.scss?ngResource */ 82563);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let DetailServiceComponent = class DetailServiceComponent {
    constructor() {
        this.defaultSpace = '../../../../../assets/blueprint.png';
    }
    ngOnInit() { }
};
DetailServiceComponent.ctorParameters = () => [];
DetailServiceComponent.propDecorators = {
    service: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    reserve: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
DetailServiceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-detail-service',
        template: _detail_service_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_detail_service_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], DetailServiceComponent);



/***/ }),

/***/ 71227:
/*!***********************************************************************************!*\
  !*** ./src/app/shared/components/services/item-request/item-request.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ItemRequestComponent": () => (/* binding */ ItemRequestComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _item_request_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item-request.component.html?ngResource */ 43272);
/* harmony import */ var _item_request_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item-request.component.scss?ngResource */ 64290);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let ItemRequestComponent = class ItemRequestComponent {
    constructor() {
        this.defaultSpace = '../../../../../assets/blueprint.png';
    }
    ngOnInit() { }
};
ItemRequestComponent.ctorParameters = () => [];
ItemRequestComponent.propDecorators = {
    request: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    reserve: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    currentUser: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
ItemRequestComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-item-request',
        template: _item_request_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_item_request_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ItemRequestComponent);



/***/ }),

/***/ 58151:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/components/services/new-request/new-request.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewRequestComponent": () => (/* binding */ NewRequestComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _new_request_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./new-request.component.html?ngResource */ 97437);
/* harmony import */ var _new_request_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./new-request.component.scss?ngResource */ 20871);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/haptics.service */ 54387);
/* harmony import */ var src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/requests.service */ 25293);
/* harmony import */ var src_app_core_controller_services_controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/controller/services.controller */ 82333);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);











let NewRequestComponent = class NewRequestComponent {
  constructor(vibe, requestService, requests, alerts, modal, extra) {
    this.vibe = vibe;
    this.requestService = requestService;
    this.requests = requests;
    this.alerts = alerts;
    this.modal = modal;
    this.extra = extra;
    this.defaultUser = 'assets/profile/ProfileBlank.png';
    this.defaultSpace = '../../../../../assets/blueprint.png';
    this.users = [];
    this.loading = false;
    this.notes = '';
    this.showRequestForm = false;
    this.dom = false;
    this.lun = true;
    this.mar = true;
    this.mie = true;
    this.jue = true;
    this.vie = true;
    this.sab = false;
    this.myRequest = {
      scheduleDate: null,
      startDate: null,
      endDate: null,
      status: 'Solicitado',
      notes: null,
      service: null,
      requestBy: null,
      userUID: null
    };
  }

  ngOnInit() {
    if (this.service) {
      this.showRequestForm = true;
      this.dom = this.service.weekdays[0];
      this.lun = this.service.weekdays[1];
      this.mar = this.service.weekdays[2];
      this.mie = this.service.weekdays[3];
      this.jue = this.service.weekdays[4];
      this.vie = this.service.weekdays[5];
      this.sab = this.service.weekdays[6];
    }

    if (this.request) {
      this.myRequest = this.request;
    }

    if (this.users?.length > 1) {
      this.selectedUser = this.currentUser;
      this.selectedUserUID = this.currentUser.uid;
      this.units = this.selectedUser.leases;
    } else {
      this.selectedUser = this.currentUser;
      this.selectedUserUID = this.currentUser.uid;
      this.units = this.selectedUser.leases ? this.selectedUser.leases : [];
    }

    this.users.push(this.currentUser);
    console.log(this.request);
  }

  enableForm() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.showRequestForm) {
        _this.service = null;
        _this.showRequestForm = false;
      } else {
        _this.service = yield _this.requestService.getServiceData(_this.request.service.maintenance, _this.request.service.serviceUID);
        _this.dom = _this.service.weekdays[0];
        _this.lun = _this.service.weekdays[1];
        _this.mar = _this.service.weekdays[2];
        _this.mie = _this.service.weekdays[3];
        _this.jue = _this.service.weekdays[4];
        _this.vie = _this.service.weekdays[5];
        _this.sab = _this.service.weekdays[6];
        _this.showRequestForm = true;
      }
    })();
  }

  userChange(e) {
    this.selectedUserUID = e.detail.value;
    this.users.forEach(user => {
      if (user.uid == this.selectedUserUID) {
        this.selectedUser = user;
      }
    });
    this.units = this.selectedUser.leases;
  }

  spaceChange(e) {
    this.selectedUnitUID = e.detail.value;
    this.units.forEach(space => {
      if (space.spaceLease.uid == this.selectedUnitUID) {
        this.selectedUnit = space;
      }
    });
  }

  Listener0(e) {
    this.dom = e.detail.checked;
  }

  Listener1(e) {
    this.lun = e.detail.checked;
  }

  Listener2(e) {
    this.mar = e.detail.checked;
  }

  Listener3(e) {
    this.mie = e.detail.checked;
  }

  Listener4(e) {
    this.jue = e.detail.checked;
  }

  Listener5(e) {
    this.vie = e.detail.checked;
  }

  Listener6(e) {
    this.sab = e.detail.checked;
  }

  notesListener(e) {
    this.notes = e.detail.value;
  }

  cancelRequest() {
    this.myRequest = {
      scheduleDate: null,
      startDate: null,
      endDate: null,
      status: 'Solicitado',
      notes: null,
      service: null,
      requestBy: null,
      userUID: null
    };
    this.modal.dismiss(false);
  }

  createRequest() {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        if (_this2.selectedUser?.leases?.length > 0 && !_this2.selectedUnitUID) {
          console.log('falta Unit');
          return 'error';
        }

        _this2.loading = true;
        _this2.myRequest.requestBy = yield _this2.extra.createShortUser(_this2.selectedUser);
        _this2.myRequest.userUID = _this2.selectedUser.uid;
        _this2.myRequest.service = {
          serviceUID: _this2.service.uid,
          name: _this2.service.name,
          maintenance: _this2.service.maintenance,
          photo: _this2.service.photo,
          estimatedTime: _this2.service.estimatedTime,
          cost: _this2.service.cost > 0 ? _this2.service.cost : 'Gratis',
          spaceUID: _this2.selectedUnit ? _this2.selectedUnit.spaceLease.uid : '-',
          unitNumber: _this2.selectedUnit ? _this2.selectedUnit.spaceLease.type + ' ' + _this2.selectedUnit.spaceLease.unitNumber : '-',
          floor: _this2.selectedUnit ? _this2.selectedUnit.spaceLease.floor : '-',
          notes: _this2.notes,
          comments: [],
          preferredDays: [_this2.dom, _this2.lun, _this2.mar, _this2.mie, _this2.jue, _this2.vie, _this2.sab]
        };

        if (_this2.request) {
          yield _this2.requests.UpdateRequest(_this2.myRequest, _this2.currentUser);
        } else {
          yield _this2.requests.createRequest(_this2.myRequest);
        }

        _this2.vibe.endAction();

        _this2.alerts.showAlert('SERVICIOS', _this2.request ? 'Datos de servicio  actualizados' : 'Nuevo servicio solicitado', 'OK');

        _this2.loading = false;

        _this2.modal.dismiss(true);

        return 'done';
      } catch (error) {
        console.log(error);
        _this2.loading = false;
        return 'error';
      }
    })();
  }

  changeStateReserve(status) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.alerts.AlertConfirm(status, '¿Seguro desea' + (status === '' ? 'aprobar' : 'cancelar') + ' la reserva?').then( /*#__PURE__*/function () {
        var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (answer) {
          if (answer) {
            try {
              _this3.loading = true;
              _this3.myRequest = _this3.request;
              _this3.myRequest.status = status;
              yield _this3.requests.UpdateRequest(_this3.myRequest, _this3.currentUser);

              _this3.vibe.endAction();

              _this3.alerts.showAlert('RESERVAS', 'Su reserva ha sido actualizada', 'OK');

              _this3.loading = false;

              _this3.modal.dismiss(true);
            } catch (error) {
              console.log(error);
              _this3.loading = false;

              _this3.modal.dismiss(true);
            }
          }
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    })();
  }

};

NewRequestComponent.ctorParameters = () => [{
  type: src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_4__.HapticsService
}, {
  type: src_app_core_controller_services_controller__WEBPACK_IMPORTED_MODULE_6__.ServicesController
}, {
  type: src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_5__.RequestsService
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__.AlertsService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
}, {
  type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_7__.VerificationFuncService
}];

NewRequestComponent.propDecorators = {
  currentUser: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }],
  users: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }],
  service: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }],
  request: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }]
};
NewRequestComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-new-request',
  template: _new_request_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_new_request_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], NewRequestComponent);


/***/ }),

/***/ 36048:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/components/services/new-service/new-service.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewServiceComponent": () => (/* binding */ NewServiceComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _new_service_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./new-service.component.html?ngResource */ 52805);
/* harmony import */ var _new_service_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./new-service.component.scss?ngResource */ 53074);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/image-uploader.service */ 36071);
/* harmony import */ var src_app_core_services_modules_maintenance_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/maintenance.service */ 82227);
/* harmony import */ var src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/spaces.service */ 59269);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/utilities/attachments.service */ 15909);
/* harmony import */ var src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/utilities/haptics.service */ 54387);












let NewServiceComponent = class NewServiceComponent {
  constructor(modal, alerts, images, upload, vibe, spaces, services) {
    this.modal = modal;
    this.alerts = alerts;
    this.images = images;
    this.upload = upload;
    this.vibe = vibe;
    this.spaces = spaces;
    this.services = services;
    this.defaultUser = 'assets/profile/ProfileBlank.png';
    this.defaultSpace = '../../../../../assets/blueprint.png';
    this.title = 'Nuevo Servicio';
    this.myService = {
      communityUID: '',
      name: '',
      maintenance: null,
      serviceType: null,
      description: '',
      photo: null,
      terms: '',
      estimatedTime: 0,
      cost: 0,
      available: false,
      weekdays: []
    }; // Avalibility INFO

    this.communitiesList = [];
    this.dom = false;
    this.lun = true;
    this.mar = true;
    this.mie = true;
    this.jue = true;
    this.vie = true;
    this.sab = false;
    this.progress = 0;
    this.loading = false;
    this.editServiceForm = false;
    this.serviceCheck = false;
    this.maintenanceCheck = false;
    this.typeList = this.services.typeList;
    this.timeEstimationList = [{
      text: '30 mins.',
      unit: 30
    }, {
      text: '1 hora',
      unit: 60
    }, {
      text: '1:30 hrs.',
      unit: 90
    }, {
      text: '2:00 hrs.',
      unit: 120
    }, {
      text: '4:00 hrs.',
      unit: 240
    }, {
      text: '6:00 hrs.',
      unit: 360
    }, {
      text: '8:00 hrs.',
      unit: 480
    }];
  }

  ngOnInit() {
    console.log(this.typeList);
    this.spaces.readCommunityList().then(communities => {
      this.communitiesList = communities;
    });

    if (this.service) {
      this.myService = this.service;
      this.dom = this.service.weekdays[0];
      this.lun = this.service.weekdays[1];
      this.mar = this.service.weekdays[2];
      this.mie = this.service.weekdays[3];
      this.jue = this.service.weekdays[4];
      this.vie = this.service.weekdays[5];
      this.sab = this.service.weekdays[6];
    }
  } // LISTENRES


  nameListener(e) {
    this.myService.name = e.detail.value;
  }

  serviceType(e) {
    this.myService.serviceType = e.detail.value;
    this.vibe.changeAction();
    this.typeList.forEach(item => {
      if (item.name === this.myService.serviceType) {
        this.myService.photo = item.image;
      }
    });
  }

  descriptionListener(e) {
    this.myService.description = e.detail.value;
  }

  termsListener(e) {
    this.myService.terms = e.detail.value;
  }

  maintenanceListener(e) {
    this.myService.maintenance = e.detail.checked;

    if (this.myService.maintenance) {
      this.myService.cost = 0;
      this.title = 'Nuevo Mantenimiento';
    } else {
      this.title = 'Nuevo Servicio';
    }
  }

  availableListener(e) {
    this.myService.available = e.detail.value;
  }

  priceListener(e) {
    this.myService.cost = e.detail.value;
  }

  estimatedTimeListener(e) {
    this.myService.estimatedTime = e.detail.value;
    console.log(e.detail.value);
  }

  Listener0(e) {
    this.dom = e.detail.checked;
  }

  Listener1(e) {
    this.lun = e.detail.checked;
  }

  Listener2(e) {
    this.mar = e.detail.checked;
  }

  Listener3(e) {
    this.mie = e.detail.checked;
  }

  Listener4(e) {
    this.jue = e.detail.checked;
  }

  Listener5(e) {
    this.vie = e.detail.checked;
  }

  Listener6(e) {
    this.sab = e.detail.checked;
  } // IMAGE SYSTEM


  addPhoto() {
    const options = {
      currentRoute: '/news',
      height: null,
      width: null,
      pdf: false
    };
    this.images.presentImageOptions(options).then(imageObj => {
      if (imageObj[0] !== undefined) {
        this.newImage = imageObj[0];
      }
    });
  }

  uploadPhoto() {
    return new Promise((resolve, reject) => {
      const imageName = Date().toString() + '_Space_' + this.myService.name;
      this.upload.uploadFile('NoticeList', imageName, this.newImage.file, progress => {
        this.progress = progress;
      }).then(data => {
        this.upload.deletePicture();
        resolve(data.url);
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }

  createService() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.loading = true;
        _this.myService.weekdays = [_this.dom, _this.lun, _this.mar, _this.mie, _this.jue, _this.vie, _this.sab];
        _this.myService.communityUID = _this.communitiesList[0].uid;

        if (_this.service) {
          yield _this.services.UpdateService(_this.myService);
        } else {
          console.log(_this.myService);
          yield _this.services.createService(_this.myService);
        }

        _this.alerts.showAlert('ESPACIOS', _this.service ? 'Datos de ' + _this.service.name + ' actualizado' : 'Nuevo ' + _this.myService.maintenance ? 'mantenimiento' : 0, 'OK');

        _this.loading = false;

        _this.modal.dismiss(true);

        return 'done';
      } catch (error) {
        console.log(error);
        _this.loading = false;
        return 'error';
      }
    })();
  }

  editService() {
    if (this.editServiceForm) {
      this.editServiceForm = false;
    } else {
      this.myService = this.service;
      this.dom = this.service.weekdays[0];
      this.lun = this.service.weekdays[1];
      this.mar = this.service.weekdays[2];
      this.mie = this.service.weekdays[3];
      this.jue = this.service.weekdays[4];
      this.vie = this.service.weekdays[5];
      this.sab = this.service.weekdays[6];
      this.editServiceForm = true;
    }
  }

};

NewServiceComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_6__.AlertsService
}, {
  type: src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_7__.AttachmentsService
}, {
  type: src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_3__.ImageUploaderService
}, {
  type: src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_8__.HapticsService
}, {
  type: src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_5__.SpacesService
}, {
  type: src_app_core_services_modules_maintenance_service__WEBPACK_IMPORTED_MODULE_4__.MaintenanceService
}];

NewServiceComponent.propDecorators = {
  user: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.Input
  }],
  service: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.Input
  }]
};
NewServiceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  selector: 'app-new-service',
  template: _new_service_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_new_service_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], NewServiceComponent);


/***/ }),

/***/ 2850:
/*!***********************************************************************************!*\
  !*** ./src/app/shared/components/services/pick-service/pick-service.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PickServiceComponent": () => (/* binding */ PickServiceComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _pick_service_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pick-service.component.html?ngResource */ 40165);
/* harmony import */ var _pick_service_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pick-service.component.scss?ngResource */ 15923);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_controller_services_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/controller/services.controller */ 82333);







let PickServiceComponent = class PickServiceComponent {
  constructor(services, modal) {
    this.services = services;
    this.modal = modal;
    this.loading = false;
    this.defaultSpace = '../../../../../assets/blueprint.png';
  }

  ngOnInit() {}

  doRefresh(refresh) {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.loading = true;

      _this.services.loadServices(_this.user.type).then(() => {
        _this.loading = false;

        if (refresh) {
          refresh.target.complete();
        }
      });
    })();
  }

  showCost(space) {
    if (space.rent) {
      return space.rentData.cost + "$";
    } else {
      return 'Gratis';
    }
  }

  pickService(service) {
    this.modal.dismiss(service);
  }

};

PickServiceComponent.ctorParameters = () => [{
  type: src_app_core_controller_services_controller__WEBPACK_IMPORTED_MODULE_3__.ServicesController
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController
}];

PickServiceComponent.propDecorators = {
  accordionGroup: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild,
    args: ['accordionGroup', {
      static: true
    }]
  }],
  user: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
  }]
};
PickServiceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'app-pick-service',
  template: _pick_service_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_pick_service_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], PickServiceComponent);


/***/ }),

/***/ 87150:
/*!***********************************************************************************!*\
  !*** ./src/app/shared/components/services/service-item/service-item.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServiceItemComponent": () => (/* binding */ ServiceItemComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _service_item_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-item.component.html?ngResource */ 21644);
/* harmony import */ var _service_item_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service-item.component.scss?ngResource */ 11221);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let ServiceItemComponent = class ServiceItemComponent {
    constructor() {
        this.defaultService = '../../../../../assets/cleaning.png';
    }
    ngOnInit() { }
};
ServiceItemComponent.ctorParameters = () => [];
ServiceItemComponent.propDecorators = {
    service: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    maintenance: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
ServiceItemComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-service-item',
        template: _service_item_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_service_item_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ServiceItemComponent);



/***/ }),

/***/ 83051:
/*!*******************************************************************************!*\
  !*** ./src/app/shared/components/services/solve-task/solve-task.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolveTaskComponent": () => (/* binding */ SolveTaskComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _solve_task_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./solve-task.component.html?ngResource */ 95837);
/* harmony import */ var _solve_task_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solve-task.component.scss?ngResource */ 61824);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/image-uploader.service */ 36071);
/* harmony import */ var src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/requests.service */ 25293);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/utilities/attachments.service */ 15909);
/* harmony import */ var src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/utilities/time-handler */ 8123);











let SolveTaskComponent = class SolveTaskComponent {
  constructor(requests, alerts, modal, time, images, upload) {
    this.requests = requests;
    this.alerts = alerts;
    this.modal = modal;
    this.time = time;
    this.images = images;
    this.upload = upload;
    this.loading = false;
    this.statusList = ['Regular', 'Sucio', 'Muy Sucio'];
    this.initialStatus = 'Regular';
    this.noteService = {
      text: ''
    };
    this.progress = 0;
  }

  ngOnInit() {
    this.myTask = this.request;
    console.log(this.request);
    const spent = this.time.timeSpent(this.request.updatedAt);
    console.log(spent / 60);
  }

  statusListener(e) {
    this.initialStatus = e.detail.value;
  }

  noteListener(e) {
    this.noteService.text = e.detail.value;
  } // IMAGE SYSTEM


  addPhoto() {
    const options = {
      currentRoute: '/news',
      height: null,
      width: null,
      pdf: false
    };
    this.images.presentImageOptions(options).then(imageObj => {
      if (imageObj[0] !== undefined) {
        this.newImage = imageObj[0];
      }
    });
  }

  uploadPhoto() {
    return new Promise((resolve, reject) => {
      const imageName = Date().toString() + '_Service_' + this.request.service.name;
      this.upload.uploadFile('ServicesNotes', imageName, this.newImage.file, progress => {
        this.progress = progress;
      }).then(data => {
        this.upload.deletePicture();
        resolve(data.url);
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }

  changeStatus(status) {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.loading = true;
        _this.myTask.status = status;

        if (_this.newImage) {
          _this.noteService.photo = yield _this.uploadPhoto();
        }

        if (_this.noteService.text || _this.noteService.photo) {
          if (!_this.myTask.notes) {
            _this.myTask.notes = [];
          }

          _this.myTask.notes.push(_this.noteService);
        }

        console.log(_this.myTask);

        if (_this.request.status === 'Agendado') {
          _this.myTask.service.comments.push['Se inicio con el area en estado: ' + _this.initialStatus];
        }

        yield _this.requests.UpdateRequest(_this.myTask, _this.currentUser);

        _this.alerts.showAlert('SERVICIOS', 'Su servico ha sido actualizado', 'OK');

        _this.loading = false;

        _this.modal.dismiss(true);
      } catch (error) {
        console.log(error);
        _this.loading = false;
      }
    })();
  }

};

SolveTaskComponent.ctorParameters = () => [{
  type: src_app_core_services_modules_requests_service__WEBPACK_IMPORTED_MODULE_4__.RequestsService
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__.AlertsService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
}, {
  type: src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_7__.TimeHandlerModule
}, {
  type: src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_6__.AttachmentsService
}, {
  type: src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_3__.ImageUploaderService
}];

SolveTaskComponent.propDecorators = {
  currentUser: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }],
  request: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }]
};
SolveTaskComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-solve-task',
  template: _solve_task_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_solve_task_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], SolveTaskComponent);


/***/ }),

/***/ 56113:
/*!*********************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/detail-reservation/detail-reservation.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailReservationComponent": () => (/* binding */ DetailReservationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _detail_reservation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail-reservation.component.html?ngResource */ 50610);
/* harmony import */ var _detail_reservation_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail-reservation.component.scss?ngResource */ 62890);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let DetailReservationComponent = class DetailReservationComponent {
    constructor() {
        this.defaultSpace = '../../../../../assets/blueprint.png';
    }
    ngOnInit() { }
};
DetailReservationComponent.ctorParameters = () => [];
DetailReservationComponent.propDecorators = {
    request: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
DetailReservationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-detail-reservation',
        template: _detail_reservation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_detail_reservation_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], DetailReservationComponent);



/***/ }),

/***/ 65569:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/components/spaces/detail-space/detail-space.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailSpaceComponent": () => (/* binding */ DetailSpaceComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _detail_space_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail-space.component.html?ngResource */ 90290);
/* harmony import */ var _detail_space_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail-space.component.scss?ngResource */ 67613);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _view_image_preview_image_preview_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../view/image-preview/image-preview.component */ 36729);







let DetailSpaceComponent = class DetailSpaceComponent {
  constructor(modal) {
    this.modal = modal;
    this.defaultSpace = '../../../../../assets/blueprint.png';
  }

  ngOnInit() {}

  openPreview(img) {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let preview = {
        url: img
      };
      const modal = yield _this.modal.create({
        component: _view_image_preview_image_preview_component__WEBPACK_IMPORTED_MODULE_3__.ImagePreviewComponent,
        cssClass: 'transparent-modal',
        componentProps: {
          img: preview
        }
      });
      modal.present();
    })();
  }

};

DetailSpaceComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController
}];

DetailSpaceComponent.propDecorators = {
  space: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
  }],
  user: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
  }],
  reserve: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
  }]
};
DetailSpaceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'app-detail-space',
  template: _detail_space_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_detail_space_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], DetailSpaceComponent);


/***/ }),

/***/ 21375:
/*!*****************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/item-reservation/item-reservation.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ItemReservationComponent": () => (/* binding */ ItemReservationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _item_reservation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item-reservation.component.html?ngResource */ 46719);
/* harmony import */ var _item_reservation_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item-reservation.component.scss?ngResource */ 70506);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let ItemReservationComponent = class ItemReservationComponent {
    constructor() {
        this.defaultSpace = '../../../../../assets/blueprint.png';
    }
    ngOnInit() { }
};
ItemReservationComponent.ctorParameters = () => [];
ItemReservationComponent.propDecorators = {
    request: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
ItemReservationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-item-reservation',
        template: _item_reservation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_item_reservation_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ItemReservationComponent);



/***/ }),

/***/ 67921:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/components/spaces/item-space/item-space.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ItemSpaceComponent": () => (/* binding */ ItemSpaceComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _item_space_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item-space.component.html?ngResource */ 78253);
/* harmony import */ var _item_space_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item-space.component.scss?ngResource */ 99342);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let ItemSpaceComponent = class ItemSpaceComponent {
    constructor() {
        this.defaultSpace = '../../../../../assets/blueprint.png';
    }
    ngOnInit() { }
    fixTitle(title) {
        if (title.length > 50) {
            return title.substring(0, 50) + '...';
        }
        else {
            return title;
        }
    }
    showOccupant() {
        if (this.space.rent) {
            return this.space.rentData.cost + "$";
        }
        else if (this.space.lease) {
            return this.space.lease.userLease.name;
        }
        else {
            return '-';
        }
    }
};
ItemSpaceComponent.ctorParameters = () => [];
ItemSpaceComponent.propDecorators = {
    space: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    profileView: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
ItemSpaceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-item-space',
        template: _item_space_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_item_space_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ItemSpaceComponent);



/***/ }),

/***/ 21897:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/new-reservation/new-reservation.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewReservationComponent": () => (/* binding */ NewReservationComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _new_reservation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./new-reservation.component.html?ngResource */ 44323);
/* harmony import */ var _new_reservation_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./new-reservation.component.scss?ngResource */ 59468);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/time-handler */ 8123);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/utilities/haptics.service */ 54387);
/* harmony import */ var src_app_core_services_modules_reservations_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/modules/reservations.service */ 53957);
/* harmony import */ var src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/modules/spaces.service */ 59269);
/* harmony import */ var src_app_core_services_modules_calendar_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/modules/calendar.service */ 16695);













let NewReservationComponent = class NewReservationComponent {
  constructor(vibe, request, calendar, spaces, alerts, modal, time, extra) {
    this.vibe = vibe;
    this.request = request;
    this.calendar = calendar;
    this.spaces = spaces;
    this.alerts = alerts;
    this.modal = modal;
    this.time = time;
    this.extra = extra;
    this.defaultUser = 'assets/profile/ProfileBlank.png';
    this.defaultSpace = '../../../../../assets/blueprint.png';
    this.rentSpacesList = [];
    this.min = new Date().toISOString();
    this.standAlone = {
      standalone: true
    };
    this.loading = false;
    this.editReservationForm = false;
    this.showReservationForm = false;
    this.showCalendar = false;
    this.guestCounter = 1;

    this.availableDays = dateString => {
      const date = new Date(dateString);
      const utcDay = date.getUTCDay();
      return this.space.rentData.weekdays[utcDay];
    };

    this.timeSlotStart = {
      hour: null,
      date: null,
      index: null
    };
    this.timeSlotEnd = {
      hour: null,
      date: null,
      index: null
    };
    this.addTime = 30;
    this.myReservation = {
      scheduleDate: '',
      startDate: '',
      endDate: '',
      status: 'Solicitado',
      reservation: null,
      requestBy: null,
      userUID: null
    };
  }

  ngOnInit() {
    this.vibe.startAction();

    if (this.users?.length > 1) {
      this.selectedUser = this.currentUser;
      this.selectedUserUID = this.currentUser.uid;
    } else {
      this.selectedUser = this.currentUser;
      this.selectedUserUID = this.currentUser.uid;
    }
  }

  enableForm() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.showReservationForm = true;

      if (_this.reservation) {
        _this.myReservation = _this.reservation;
        _this.guestCounter = _this.myReservation.reservation.guests;
        _this.space = yield _this.spaces.readSpace(_this.reservation.reservation.spaceUID);
        _this.addTime = _this.space.rentData.minTime < 60 ? 30 : 60;
        yield _this.createScheduleList();
        let count = 0;

        _this.scheduleTimes.forEach(slot => {
          if (slot.date === _this.myReservation.startDate) {
            _this.timeSlotClicked(count, slot);
          } else if (slot.date === _this.myReservation.endDate) {
            _this.timeSlotClicked(count, slot);
          }

          count++;
        });
      } else {
        _this.myReservation.requestBy = yield _this.extra.createShortUser(_this.currentUser);
        _this.addTime = _this.space.rentData.minTime < 60 ? 30 : 60;
        _this.myReservation.reservation = {
          spaceUID: _this.space.uid,
          unitNumber: _this.space.type + ' ' + _this.space.unitNumber,
          floor: _this.space.floor,
          guests: 1,
          price: _this.space.rentData.cost
        };

        if (_this.space.photo) {
          _this.myReservation.reservation.photo = _this.space.photo;
        }

        console.log(_this.users);
      }
    })();
  }

  showCalendar1() {
    this.showCalendar = !this.showCalendar;
  }

  changeScheduleTime(event) {
    this.showCalendar = false;

    if (event) {
      this.myReservation.scheduleDate = new Date(event).toISOString();
      this.createScheduleList();
    } else {
      this.myReservation.scheduleDate = this.time.getStartDate();
    }
  }

  createScheduleList() {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.scheduleTimes = yield _this2.time.getScheduleList(_this2.myReservation.scheduleDate, _this2.space.rentData.starTime, _this2.space.rentData.endTime, _this2.addTime);
      return 'done';
    })();
  }

  timeSlotClicked(index, timeSlot) {
    var _this3 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.scheduleTimes[index].disabled) {
        _this3.alerts.showAlert('Book Reservation', 'La hora de reservacion no está disponible. ');
      } else {
        const answer = yield _this3.time.clickDaySlot(_this3.scheduleTimes, _this3.timeSlotStart, _this3.timeSlotEnd, timeSlot, index, _this3.space.rentData.minTime < 60 ? 30 : 60, _this3.space.rentData.maxTime);

        if (answer) {
          _this3.scheduleTimes = answer.scheduleTimes;
          _this3.timeSlotStart = answer.timeSlotStart;
          _this3.timeSlotEnd = answer.timeSlotEnd;
          timeSlot = answer.timeSlot;
        }
      }
    })();
  }

  guestCounterButton(type) {
    const check = this.guestCounter + 1;

    if (type === 'plus' && check < this.space.rentData.capacity + 1) {
      this.guestCounter++;
    } else if (type === 'minus' && this.guestCounter > 1) {
      this.guestCounter--;
    }
  }

  clearSlots() {
    this.timeSlotStart = {
      hour: null,
      date: null,
      index: null
    };
    this.timeSlotEnd = {
      hour: null,
      date: null,
      index: null
    };
  }

  createReservation() {
    var _this4 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this4.loading || !_this4.myReservation.scheduleDate || !_this4.timeSlotStart.date) {
        return null;
      } else {
        try {
          _this4.loading = true;
          _this4.myReservation.startDate = _this4.timeSlotStart.date;
          _this4.myReservation.endDate = _this4.timeSlotEnd.date;
          _this4.myReservation.reservation.guests = _this4.guestCounter;
          _this4.myReservation.userUID = _this4.currentUser.uid;

          _this4.users.forEach(user => {
            if (user.uid == _this4.selectedUserUID) {
              _this4.selectedUser = user;
            }
          });

          if (_this4.reservation) {
            yield _this4.request.UpdateReservations(_this4.myReservation, _this4.currentUser);
          } else {
            yield _this4.request.createReservations(_this4.myReservation);
          }

          _this4.vibe.endAction();

          _this4.alerts.showAlert('RESERVAS', _this4.reservation ? 'Datos de reserva actualizados' : 'Nueva reserva solicitada', 'OK');

          _this4.loading = false;

          _this4.modal.dismiss(true);

          return 'done';
        } catch (error) {
          console.log(error);
          _this4.loading = false;
          return 'error';
        }
      }
    })();
  }

  changeStateReserve(status) {
    var _this5 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this5.alerts.AlertConfirm(status === 'Aprobado' ? 'APROBAR' : 'CANCELAR', '¿Seguro desea ' + (status === 'Aprobado' ? 'aprobar' : 'cancelar') + ' la reserva?').then(answer => {
        if (answer) {
          _this5.changeRequestStatus(status);
        }
      });
    })();
  }

  userChange(e) {
    this.selectedUserUID = e.detail.value;
  }

  cancelReservation() {
    this.myReservation = {
      scheduleDate: '',
      startDate: '',
      endDate: '',
      status: 'Solicitado',
      reservation: null,
      requestBy: null,
      userUID: null
    };
    this.modal.dismiss(false);
  }

  changeRequestStatus(status) {
    var _this6 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this6.loading = true;
        _this6.myReservation = _this6.reservation;
        _this6.myReservation.status = status;
        yield _this6.request.UpdateReservations(_this6.reservation, _this6.currentUser);

        if (status === 'Aprobado') {
          yield _this6.calendar.confirmReservation(_this6.myReservation);
        }

        _this6.vibe.endAction();

        _this6.alerts.showAlert('RESERVAS', 'Su reserva ha sido actualizada', 'OK');

        _this6.loading = false;

        _this6.modal.dismiss(true);
      } catch (error) {
        console.log(error);
        _this6.loading = false;

        _this6.modal.dismiss(true);
      }
    })();
  }

};

NewReservationComponent.ctorParameters = () => [{
  type: src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_6__.HapticsService
}, {
  type: src_app_core_services_modules_reservations_service__WEBPACK_IMPORTED_MODULE_7__.ReservationsService
}, {
  type: src_app_core_services_modules_calendar_service__WEBPACK_IMPORTED_MODULE_9__.CalendarService
}, {
  type: src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_8__.SpacesService
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__.AlertsService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController
}, {
  type: src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_4__.TimeHandlerModule
}, {
  type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_3__.VerificationFuncService
}];

NewReservationComponent.propDecorators = {
  currentUser: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.Input
  }],
  users: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.Input
  }],
  reservation: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.Input
  }],
  space: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.Input
  }]
};
NewReservationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
  selector: 'app-new-reservation',
  template: _new_reservation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_new_reservation_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], NewReservationComponent);


/***/ }),

/***/ 61559:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/spaces/new-space/new-space.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewSpaceComponent": () => (/* binding */ NewSpaceComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _new_space_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./new-space.component.html?ngResource */ 21497);
/* harmony import */ var _new_space_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./new-space.component.scss?ngResource */ 80210);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/image-uploader.service */ 36071);
/* harmony import */ var src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/spaces.service */ 59269);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/utilities/attachments.service */ 15909);
/* harmony import */ var src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/utilities/haptics.service */ 54387);
/* harmony import */ var src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/utilities/time-handler */ 8123);












let NewSpaceComponent = class NewSpaceComponent {
  constructor(spaces, modal, alerts, images, upload, vibe, time) {
    this.spaces = spaces;
    this.modal = modal;
    this.alerts = alerts;
    this.images = images;
    this.upload = upload;
    this.vibe = vibe;
    this.time = time;
    this.defaultUser = 'assets/profile/ProfileBlank.png';
    this.defaultSpace = '../../../../../assets/blueprint.png';
    this.mySpace = {
      unitNumber: '',
      communityUID: '',
      description: '',
      bathrooms: 0,
      rooms: 0,
      squareMeters: 0,
      spaceType: null,
      type: null
    };
    this.progress = 0;
    this.communitiesList = [];
    this.spaceTypeList = ['privado', 'comunal'];
    this.typeList = ['oficina', 'vivienda', 'parqueo', 'recepción', 'bodega', 'salón', 'tienda', 'terraza'];
    this.loading = false;
    this.editSpaceForm = false; // RENT INFO

    this.dom = false;
    this.lun = true;
    this.mar = true;
    this.mie = true;
    this.jue = true;
    this.vie = true;
    this.sab = false;
    this.startTimeSelector1 = false;
    this.startTimeSelector2 = false;
    this.minTimeList = [{
      text: '30 mins.',
      unit: 30
    }, {
      text: '1 hora',
      unit: 60
    }, {
      text: '2:00 hrs.',
      unit: 120
    }];
    this.maxTimeList = [{
      text: '30 mins.',
      unit: 30
    }, {
      text: '1 hora',
      unit: 60
    }, {
      text: '1:30 hrs.',
      unit: 90
    }, {
      text: '2:00 hrs.',
      unit: 120
    }, {
      text: '4:00 hrs.',
      unit: 240
    }, {
      text: '6:00 hrs.',
      unit: 360
    }, {
      text: '8:00 hrs.',
      unit: 480
    }];
  }

  ngOnInit() {
    this.vibe.startAction();

    if (this.space && this.user.type === 'administrador') {
      console.log(this.space);
      this.mySpace = this.space;

      if (this.space.rent) {
        this.dom = this.mySpace.rentData.weekdays[0];
        this.lun = this.mySpace.rentData.weekdays[1];
        this.mar = this.mySpace.rentData.weekdays[2];
        this.mie = this.mySpace.rentData.weekdays[3];
        this.jue = this.mySpace.rentData.weekdays[4];
        this.vie = this.mySpace.rentData.weekdays[5];
        this.sab = this.mySpace.rentData.weekdays[6];
        this.setMaxTime(this.mySpace.rentData.minTime);
      }
    } else {
      this.spaces.readCommunityList().then(communities => {
        this.communitiesList = communities;
      });
    }
  }

  editspace() {
    if (this.editSpaceForm) {
      this.mySpace = this.space;
      this.editSpaceForm = false;
    } else {
      this.editSpaceForm = true;
    }
  } // LISTENRES


  unitListener(e) {
    this.mySpace.unitNumber = e.detail.value;
  }

  spaceType(e) {
    this.mySpace.spaceType = e.detail.value;
    this.vibe.changeAction();
  }

  handleType(e) {
    this.mySpace.type = e.detail.value;
    this.vibe.changeAction();
  }

  handleArea(e) {
    this.mySpace.floor = e.detail.value;
    this.vibe.changeAction();
  }

  descriptionListener(e) {
    this.mySpace.description = e.detail.value;
  }

  metersListener(e) {
    this.mySpace.squareMeters = e.detail.value;
  }

  bathroomsListener(e) {
    this.mySpace.bathrooms = e.detail.value;
  }

  roomsListener(e) {
    this.mySpace.rooms = e.detail.value;
  }

  Listener0(e) {
    this.dom = e.detail.checked;
  }

  Listener1(e) {
    this.lun = e.detail.checked;
  }

  Listener2(e) {
    this.mar = e.detail.checked;
  }

  Listener3(e) {
    this.mie = e.detail.checked;
  }

  Listener4(e) {
    this.jue = e.detail.checked;
  }

  Listener5(e) {
    this.vie = e.detail.checked;
  }

  Listener6(e) {
    this.sab = e.detail.checked;
  }

  rentListener(e) {
    this.mySpace.rentData.cost = e.detail.value;
  }

  capacityListener(e) {
    this.mySpace.rentData.capacity = e.detail.value;
  }

  checkBoxListener(e) {
    if (e.detail.checked) {
      this.mySpace.rent = true;
      this.mySpace.rentData = {
        weekdays: [false, true, true, true, true, true, false],
        starTime: this.time.getStartDate(),
        endTime: this.time.getEndDate(),
        cost: 0,
        capacity: 0,
        minTime: 30,
        maxTime: 120
      };
    } else {
      this.notRent();
    }
  }

  notRent() {
    this.mySpace.rent = false;
    delete this.mySpace.rentData;
    this.dom = false;
    this.lun = true;
    this.mar = true;
    this.mie = true;
    this.jue = true;
    this.vie = true;
    this.sab = false;
  }

  selectTime1() {
    this.startTimeSelector1 = !this.startTimeSelector1;
  }

  changeStartTime(event) {
    this.startTimeSelector1 = false;

    if (event) {
      this.mySpace.rentData.starTime = new Date(event).toISOString();
    } else {
      this.mySpace.rentData.starTime = this.time.getStartDate();
    }
  }

  selectTime2() {
    this.startTimeSelector2 = !this.startTimeSelector2;
  }

  changeEndTime(event) {
    this.startTimeSelector2 = false;

    if (event) {
      this.mySpace.rentData.endTime = new Date(event).toISOString();
    } else {
      this.mySpace.rentData.endTime = this.time.getEndDate();
    }
  }

  handleMinTime(e) {
    this.mySpace.rentData.minTime = e.detail.value;
    this.setMaxTime(e.detail.value);
  }

  handleMaxTime(e) {
    this.mySpace.rentData.maxTime = e.detail.value;
    console.log(this.mySpace.rentData);
  }

  setMaxTime(time) {
    this.maxTimeList = [];
    const min = time === 30 ? 30 : 60;
    let maxTimes = 0; //max 8 hours -> 480 min

    for (let i = 1; maxTimes < 480; i++) {
      maxTimes = i * min;
      let label = '';

      if (maxTimes === 30) {
        label = '30 mins.';
      } else if (maxTimes === 60) {
        label = '1 hora';
      } else {
        let hours = parseInt('' + maxTimes / 60);
        label = maxTimes % 60 === 0 ? hours + ':00 hrs.' : hours + ':30 hrs.';
      }

      this.maxTimeList.push({
        text: label,
        unit: maxTimes
      });
    }
  } // IMAGE SYSTEM


  addPhoto() {
    const options = {
      currentRoute: '/news',
      height: null,
      width: null,
      pdf: false
    };
    this.images.presentImageOptions(options).then(imageObj => {
      if (imageObj[0] !== undefined) {
        this.newImage = imageObj[0];
      }
    });
  }

  addAttachment() {
    const options = {
      currentRoute: '/spaces',
      height: null,
      width: null,
      pdf: false
    };
    this.images.presentImageOptions(options).then(imageObj => {
      if (imageObj[0] !== undefined) {
        this.newImage = imageObj[0];
      }
    });
  }

  uploadPhoto() {
    return new Promise((resolve, reject) => {
      const imageName = Date().toString() + '_Space_' + this.mySpace.unitNumber;
      this.upload.uploadFile('Spaces', imageName, this.newImage.file, progress => {
        this.progress = progress;
      }).then(data => {
        this.upload.deletePicture();
        resolve(data.url);
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }

  createSpace() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.loading = true;
        _this.mySpace.communityUID = _this.communitiesList[0].uid;

        if (_this.newImage) {
          _this.mySpace.photo = yield _this.uploadPhoto();
        }

        if (_this.mySpace.rent) {
          _this.mySpace.rentData.weekdays = [_this.dom, _this.lun, _this.mar, _this.mie, _this.jue, _this.vie, _this.sab];
        }

        _this.vibe.endAction();

        if (_this.space) {
          yield _this.spaces.UpdateSpaces(_this.mySpace);
        } else {
          yield _this.spaces.createSpaces(_this.mySpace);
        }

        _this.alerts.showAlert('ESPACIOS', _this.space ? 'Datos de ' + _this.space.unitNumber + ' actualizados' : 'Nuevo espacio agregado', 'OK');

        _this.loading = false;

        _this.modal.dismiss(true);

        return 'done';
      } catch (error) {
        console.log(error);
        _this.loading = false;
        return 'error';
      }
    })();
  }

};

NewSpaceComponent.ctorParameters = () => [{
  type: src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_4__.SpacesService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__.AlertsService
}, {
  type: src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_6__.AttachmentsService
}, {
  type: src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_3__.ImageUploaderService
}, {
  type: src_app_shared_utilities_haptics_service__WEBPACK_IMPORTED_MODULE_7__.HapticsService
}, {
  type: src_app_shared_utilities_time_handler__WEBPACK_IMPORTED_MODULE_8__.TimeHandlerModule
}];

NewSpaceComponent.propDecorators = {
  user: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.Input
  }],
  space: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.Input
  }]
};
NewSpaceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  selector: 'app-new-space',
  template: _new_space_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_new_space_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], NewSpaceComponent);


/***/ }),

/***/ 29204:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/pick-rent-space/pick-rent-space.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PickRentSpaceComponent": () => (/* binding */ PickRentSpaceComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _pick_rent_space_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pick-rent-space.component.html?ngResource */ 94100);
/* harmony import */ var _pick_rent_space_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pick-rent-space.component.scss?ngResource */ 62113);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/spaces.service */ 59269);







let PickRentSpaceComponent = class PickRentSpaceComponent {
  constructor(spaces, modal) {
    this.spaces = spaces;
    this.modal = modal;
    this.rentSpacesList = [];
    this.loading = true;
    this.defaultSpace = '../../../../../assets/blueprint.png';
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.rentSpacesList = yield _this.spaces.readSpacesListOrderRent('rent', true);
        _this.loading = false;
      } catch (error) {
        console.log(error);
        _this.loading = false;
      }
    })();
  }

  showCost(space) {
    if (space.rent) {
      return space.rentData.cost + "$";
    } else {
      return 'Gratis';
    }
  }

  pickSpace(space) {
    this.modal.dismiss(space);
  }

};

PickRentSpaceComponent.ctorParameters = () => [{
  type: src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_3__.SpacesService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController
}];

PickRentSpaceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
  selector: 'app-pick-rent-space',
  template: _pick_rent_space_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_pick_rent_space_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], PickRentSpaceComponent);


/***/ }),

/***/ 86895:
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/users/edit-user/edit-user.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditUserComponent": () => (/* binding */ EditUserComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _edit_user_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-user.component.html?ngResource */ 41809);
/* harmony import */ var _edit_user_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit-user.component.scss?ngResource */ 20586);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/attachments.service */ 15909);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);








let EditUserComponent = class EditUserComponent {
  constructor(alerts, images, userCtrl) {
    this.alerts = alerts;
    this.images = images;
    this.userCtrl = userCtrl;
    this.loading = false;
    this.edit = false;
    this.defaultUser = '../../../../assets/profile/ProfileBlank.png';
    this.progress = 0;
    this.showCalendar = false;
    this.myCurrentUser = {
      CI: '',
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
  }

  ngOnInit() {
    console.log(this.user);
    console.log(this.userData);
    this.myCurrentUser = this.userData;
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

  editForm() {
    this.loading = true;
    this.userCtrl.updateUser(this.myCurrentUser).then(ok => {
      this.alerts.showAlert('PERFIL', 'Tus datos han sido actualizados', 'OK');
      this.userCtrl.editUser();
      this.loading = false;
    });
  }

  addPhoto() {
    var _this = this;

    const options = {
      currentRoute: 'manager/profile',
      height: null,
      width: null,
      pdf: false
    };
    this.images.presentImageOptions(options).then( /*#__PURE__*/function () {
      var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (imageObj) {
        if (imageObj[0] !== undefined) {
          _this.loading = true;
          _this.newImage = imageObj[0];

          _this.userCtrl.changeProfileImage(imageObj[0], upload => _this.progress = upload).then(() => {
            _this.alerts.showAlert('PERFIL', 'Tus imagen de perfil ha sido actualizada', 'OK');

            _this.newImage = null;
            _this.userData.photo = imageObj[0].webPath;
            _this.loading = false;
          }).catch(() => {
            console.log('Error: uploading image');
            _this.loading = false;
          });
        }
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

};

EditUserComponent.ctorParameters = () => [{
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__.AlertsService
}, {
  type: src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_4__.AttachmentsService
}, {
  type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_5__.UserController
}];

EditUserComponent.propDecorators = {
  user: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input
  }],
  userData: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input
  }]
};
EditUserComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
  selector: 'app-edit-user',
  template: _edit_user_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_edit_user_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], EditUserComponent);


/***/ }),

/***/ 40560:
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/users/item-user/item-user.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ItemUserComponent": () => (/* binding */ ItemUserComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _item_user_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item-user.component.html?ngResource */ 14372);
/* harmony import */ var _item_user_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item-user.component.scss?ngResource */ 47853);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let ItemUserComponent = class ItemUserComponent {
    constructor() {
        this.defaultUser = '../../../../assets/profile/ProfileBlank.png';
    }
    ngOnInit() {
    }
};
ItemUserComponent.ctorParameters = () => [];
ItemUserComponent.propDecorators = {
    user: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
ItemUserComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-item-user',
        template: _item_user_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_item_user_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ItemUserComponent);



/***/ }),

/***/ 9491:
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/users/user-detail/user-detail.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserDetailComponent": () => (/* binding */ UserDetailComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _user_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-detail.component.html?ngResource */ 97718);
/* harmony import */ var _user_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-detail.component.scss?ngResource */ 76159);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/utilities/attachments.service */ 15909);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_shared_components_spaces_new_space_new_space_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/components/spaces/new-space/new-space.component */ 61559);
/* harmony import */ var src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/utilities/verificationFunc */ 94264);
/* harmony import */ var src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/modules/spaces.service */ 59269);













let UserDetailComponent = class UserDetailComponent {
  constructor(alerts, images, userCtrl, modal, auth, utility, spaces) {
    this.alerts = alerts;
    this.images = images;
    this.userCtrl = userCtrl;
    this.modal = modal;
    this.auth = auth;
    this.utility = utility;
    this.spaces = spaces;
    this.loading = false;
    this.edit = false;
    this.defaultUser = '../../../../assets/profile/ProfileBlank.png';
    this.progress = 0;
  }

  ngOnInit() {
    console.log(this.user);
    console.log(this.userData);

    if (this.userData.leases) {
      this.userData.leases.sort(this.utility.sortByType);
    }
  }

  editForm() {
    this.loading = true;
    const data = { ...this.userData
    };
    this.auth.uploadUserForm(this.user.uid, data).then(ok => {
      this.edit = !this.edit;
      this.alerts.showAlert('PERFIL', 'Tus datos han sido actualizados', 'OK');
      this.loading = false;
    });
  }

  addPhoto() {
    var _this = this;

    if (this.user) {
      const options = {
        currentRoute: 'manager/profile',
        height: null,
        width: null,
        pdf: false
      };
      this.images.presentImageOptions(options).then( /*#__PURE__*/function () {
        var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (imageObj) {
          if (imageObj[0] !== undefined) {
            _this.loading = true;
            _this.newImage = imageObj[0];

            _this.userCtrl.changeProfileImage(imageObj[0], upload => _this.progress = upload).then(() => {
              _this.alerts.showAlert('PERFIL', 'Tus imagen de perfil ha sido actualizada', 'OK');

              _this.newImage = null;
              _this.userData.photo = imageObj[0].webPath;
              _this.loading = false;
            }).catch(() => {
              console.log('Error: uploading image');
              _this.loading = false;
            });
          }
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }

  detailSpace(space) {
    var _this2 = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const spaceData = yield _this2.spaces.readSpace(space.spaceLease.uid);
      const modal = yield _this2.modal.create({
        component: src_app_shared_components_spaces_new_space_new_space_component__WEBPACK_IMPORTED_MODULE_7__.NewSpaceComponent,
        componentProps: {
          space: spaceData,
          user: _this2.userData
        },
        mode: 'ios'
      });
      modal.present();
    })();
  }

};

UserDetailComponent.ctorParameters = () => [{
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_3__.AlertsService
}, {
  type: src_app_shared_utilities_attachments_service__WEBPACK_IMPORTED_MODULE_4__.AttachmentsService
}, {
  type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_6__.UserController
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_5__.FireAuthService
}, {
  type: src_app_shared_utilities_verificationFunc__WEBPACK_IMPORTED_MODULE_8__.VerificationFuncService
}, {
  type: src_app_core_services_modules_spaces_service__WEBPACK_IMPORTED_MODULE_9__.SpacesService
}];

UserDetailComponent.propDecorators = {
  user: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.Input
  }],
  userData: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.Input
  }],
  editDataForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.Input
  }]
};
UserDetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
  selector: 'app-user-detail',
  template: _user_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_user_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], UserDetailComponent);


/***/ }),

/***/ 29349:
/*!********************************************************************************!*\
  !*** ./src/app/shared/components/users/user-profile/user-profile.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserProfileComponent": () => (/* binding */ UserProfileComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _user_profile_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-profile.component.html?ngResource */ 6050);
/* harmony import */ var _user_profile_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-profile.component.scss?ngResource */ 70881);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let UserProfileComponent = class UserProfileComponent {
    constructor() {
        this.defaultUser = '../../../../assets/profile/ProfileBlank.png';
        this.lastName = '';
    }
    ngOnInit() {
    }
};
UserProfileComponent.ctorParameters = () => [];
UserProfileComponent.propDecorators = {
    user: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    shortUser: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
UserProfileComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-user-profile',
        template: _user_profile_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_user_profile_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], UserProfileComponent);



/***/ }),

/***/ 23740:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/view/big-button/big-button.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BigButtonComponent": () => (/* binding */ BigButtonComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _big_button_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./big-button.component.html?ngResource */ 14557);
/* harmony import */ var _big_button_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./big-button.component.scss?ngResource */ 39355);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let BigButtonComponent = class BigButtonComponent {
    constructor() { }
    ngOnInit() { }
    checkType(type, value) {
        return type === value;
    }
};
BigButtonComponent.ctorParameters = () => [];
BigButtonComponent.propDecorators = {
    LABEL: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    loading: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    buttonType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
BigButtonComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-big-button',
        template: _big_button_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_big_button_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], BigButtonComponent);



/***/ }),

/***/ 88999:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/components/view/detail-header/detail-header.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailHeaderComponent": () => (/* binding */ DetailHeaderComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _detail_header_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail-header.component.html?ngResource */ 14659);
/* harmony import */ var _detail_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail-header.component.scss?ngResource */ 84318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 93819);






let DetailHeaderComponent = class DetailHeaderComponent {
    constructor(router, modal) {
        this.router = router;
        this.modal = modal;
    }
    ngOnInit() { }
    goBack() {
        this.router.navigateByUrl(this.backButton.backUrl);
    }
};
DetailHeaderComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController }
];
DetailHeaderComponent.propDecorators = {
    title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }],
    backButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }],
    endButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }]
};
DetailHeaderComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-detail-header',
        template: _detail_header_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_detail_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], DetailHeaderComponent);



/***/ }),

/***/ 74218:
/*!*******************************************************************************!*\
  !*** ./src/app/shared/components/view/image-loader/image-loader.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageLoaderComponent": () => (/* binding */ ImageLoaderComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _image_loader_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-loader.component.html?ngResource */ 7621);
/* harmony import */ var _image_loader_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-loader.component.scss?ngResource */ 71936);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 26549);





let ImageLoaderComponent = class ImageLoaderComponent {
    constructor() {
        this.backgroundImg = '../../../../../assets/Athos.png';
    }
    ngOnInit() {
        this.platform = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.getPlatform();
        console.log(this.platform);
    }
};
ImageLoaderComponent.ctorParameters = () => [];
ImageLoaderComponent.propDecorators = {
    notice: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }],
    user: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }]
};
ImageLoaderComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-image-loader',
        template: _image_loader_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_image_loader_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ImageLoaderComponent);



/***/ }),

/***/ 36729:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/components/view/image-preview/image-preview.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImagePreviewComponent": () => (/* binding */ ImagePreviewComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _image_preview_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-preview.component.html?ngResource */ 70404);
/* harmony import */ var _image_preview_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-preview.component.scss?ngResource */ 20473);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);




let ImagePreviewComponent = class ImagePreviewComponent {
    constructor() { }
    ngOnInit() { }
};
ImagePreviewComponent.ctorParameters = () => [];
ImagePreviewComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-image-preview',
        template: _image_preview_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_image_preview_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ImagePreviewComponent);



/***/ }),

/***/ 266:
/*!*******************************************************************************!*\
  !*** ./src/app/shared/components/view/loading-view/loading-view.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoadingViewComponent": () => (/* binding */ LoadingViewComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _loading_view_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loading-view.component.html?ngResource */ 93372);
/* harmony import */ var _loading_view_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loading-view.component.scss?ngResource */ 1594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);




let LoadingViewComponent = class LoadingViewComponent {
    constructor() { }
    ngOnInit() { }
};
LoadingViewComponent.ctorParameters = () => [];
LoadingViewComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-loading-view',
        template: _loading_view_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_loading_view_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], LoadingViewComponent);



/***/ }),

/***/ 54016:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/components/view/main-header/main-header.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainHeaderComponent": () => (/* binding */ MainHeaderComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _main_header_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main-header.component.html?ngResource */ 55229);
/* harmony import */ var _main_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main-header.component.scss?ngResource */ 92450);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/controller/user.controller */ 36046);
/* harmony import */ var src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/modules/fire-auth.service */ 2687);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);
/* harmony import */ var _new_notice_new_notice_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../new-notice/new-notice.component */ 67186);











let MainHeaderComponent = class MainHeaderComponent {
  constructor(userCtrl, router, modal, alerts, auth, routerOutlet) {
    this.userCtrl = userCtrl;
    this.router = router;
    this.modal = modal;
    this.alerts = alerts;
    this.auth = auth;
    this.routerOutlet = routerOutlet;
    this.loading = false;
  }

  ngOnInit() {}

  cerrarSesion() {
    this.loading = true;
    this.alerts.AlertConfirm('', '¿Seguro que desea salir de su sesión?').then(answer => {
      if (answer) {
        this.auth.signOut().then(done => {
          this.loading = false;
          this.router.navigateByUrl('general/login');
        });
      } else {
        this.loading = false;
      }
    });
  }

  createNotice() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const userData = yield _this.auth.getUser();
      const modal = yield _this.modal.create({
        component: _new_notice_new_notice_component__WEBPACK_IMPORTED_MODULE_6__.NewNoticeComponent,
        componentProps: {
          notice: null,
          user: userData.data,
          pet: null
        },
        mode: 'ios',
        presentingElement: _this.routerOutlet.nativeEl
      });
      modal.present();
      const modalResult = yield modal.onWillDismiss();

      _this.rightButton(modalResult.data);
    })();
  }

  goProfile() {
    this.router.navigateByUrl('administrator/profile');
  }

  goBack() {
    this.router.navigateByUrl('administrator/users');
  }

};

MainHeaderComponent.ctorParameters = () => [{
  type: src_app_core_controller_user_controller__WEBPACK_IMPORTED_MODULE_3__.UserController
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_5__.AlertsService
}, {
  type: src_app_core_services_modules_fire_auth_service__WEBPACK_IMPORTED_MODULE_4__.FireAuthService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRouterOutlet
}];

MainHeaderComponent.propDecorators = {
  title: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }],
  rightButton: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
  }]
};
MainHeaderComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-main-header',
  template: _main_header_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_main_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], MainHeaderComponent);


/***/ }),

/***/ 29168:
/*!***********************************************************************************************!*\
  !*** ./src/app/shared/components/view/not-data-yet-message/not-data-yet-message.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotDataYetMessageComponent": () => (/* binding */ NotDataYetMessageComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _not_data_yet_message_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not-data-yet-message.component.html?ngResource */ 95095);
/* harmony import */ var _not_data_yet_message_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./not-data-yet-message.component.scss?ngResource */ 39314);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let NotDataYetMessageComponent = class NotDataYetMessageComponent {
    constructor() { }
    ngOnInit() { }
};
NotDataYetMessageComponent.ctorParameters = () => [];
NotDataYetMessageComponent.propDecorators = {
    text: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    icon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
NotDataYetMessageComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-not-data-yet-message',
        template: _not_data_yet_message_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_not_data_yet_message_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], NotDataYetMessageComponent);



/***/ }),

/***/ 67798:
/*!*****************************************************************************************!*\
  !*** ./src/app/shared/components/view/notice-bottom-bar/notice-bottom-bar.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoticeBottomBarComponent": () => (/* binding */ NoticeBottomBarComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _notice_bottom_bar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notice-bottom-bar.component.html?ngResource */ 63152);
/* harmony import */ var _notice_bottom_bar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notice-bottom-bar.component.scss?ngResource */ 65974);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_core_services_modules_notice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/modules/notice.service */ 2941);






let NoticeBottomBarComponent = class NoticeBottomBarComponent {
  constructor(notices) {
    this.notices = notices;
    this.myNotice = {
      title: '',
      type: null,
      description: '',
      photo: '',
      writer: null,
      comments: [],
      likes: []
    };
    this.sending = true;
    this.editNoticeForm = false;
    this.myLike = false;
  }

  ngOnInit() {
    this.notice.likes.forEach(like => {
      if (like === this.userUID) {
        this.myLike = true;
      }
    });
  }

  addLike() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.sending = true;
      _this.myNotice = _this.notice;

      try {
        if (_this.myLike) {
          let likeList = [];

          _this.notice.likes.forEach(like => {
            if (_this.userUID !== like) {
              likeList.push(like);
            }
          });

          _this.myNotice.likes = likeList;
        } else {
          _this.myNotice.likes.push(_this.userUID);
        }

        yield _this.notices.UpdateNotice(_this.myNotice);
        _this.sending = false;
        _this.notice.likes = _this.myNotice.likes;
        _this.myLike = !_this.myLike;
      } catch (error) {
        console.log(error);
        _this.sending = false;
      }
    })();
  }

};

NoticeBottomBarComponent.ctorParameters = () => [{
  type: src_app_core_services_modules_notice_service__WEBPACK_IMPORTED_MODULE_3__.NoticeService
}];

NoticeBottomBarComponent.propDecorators = {
  userUID: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }],
  notice: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }],
  likes: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }],
  comments: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }]
};
NoticeBottomBarComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'app-notice-bottom-bar',
  template: _notice_bottom_bar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_notice_bottom_bar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], NoticeBottomBarComponent);


/***/ }),

/***/ 8326:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/view/sign-modal/sign-modal.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignModalComponent": () => (/* binding */ SignModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _sign_modal_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign-modal.component.html?ngResource */ 47354);
/* harmony import */ var _sign_modal_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sign-modal.component.scss?ngResource */ 1666);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var signature_pad__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! signature_pad */ 61032);
/* harmony import */ var src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/image-uploader.service */ 36071);
/* harmony import */ var src_app_core_services_modules_billing_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/modules/billing.service */ 50317);
/* harmony import */ var src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/utilities/alerts */ 80884);










let SignModalComponent = class SignModalComponent {
  constructor(modalController, elementRef, upload, billings, alerts) {
    this.modalController = modalController;
    this.elementRef = elementRef;
    this.upload = upload;
    this.billings = billings;
    this.alerts = alerts;
    this.singColor = '#000';
    this.progress = 0;
    this.loading = false;
  }

  ngOnInit() {
    this.signaturePad = new signature_pad__WEBPACK_IMPORTED_MODULE_3__["default"](this.signaturePadElement.nativeElement, {
      backgroundColor: '#FFFFFF'
    });
    this.initCanvasValues();
  }

  initCanvasValues() {
    const canvas = this.elementRef.nativeElement.querySelector('canvas');
    canvas.height = 91.69;
    canvas.width = 434.27;
    this.signaturePad.clear();
    this.myReceipt = { ...this.receipt,
      payerName: ''
    };
  }

  nameListener(e) {
    this.myReceipt.payerName = e.detail.value;
  }

  dismiss(sign) {
    this.modalController.dismiss(sign);
  }

  cancel() {
    this.signaturePad.clear();
    this.singColor = '#000';
    this.dismiss(false);
  }

  saveData() {
    var _this = this;

    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.loading = true;

        const sigImg = _this.signaturePad.toDataURL('image/png');

        if (_this.signaturePad.isEmpty()) {
          _this.loading = false;

          _this.modalController.dismiss();
        } else {
          const imageName = Date().toString() + '_' + _this.receipt.receiptNumber;

          const file = yield _this.upload.generateBlob(sigImg);

          _this.upload.uploadFile('billsSign', imageName, file, progress => {
            _this.progress = progress;
          }).then( /*#__PURE__*/function () {
            var _ref = (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
              _this.upload.deletePicture();

              _this.myReceipt.userSignature = data.url;
              _this.myReceipt.status = 'Pagado';
              yield _this.billings.changeReceiptStatus(_this.myReceipt, 'Pagado', _this.currentUser);
              _this.loading = false;

              _this.alerts.showAlert('RECIBO PAGADO', 'Se ha actulizado su recibo', 'OK');

              _this.modalController.dismiss({
                receipt: _this.myReceipt
              });
            });

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());
        }
      } catch (error) {}
    })();
  }

};

SignModalComponent.ctorParameters = () => [{
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController
}, {
  type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ElementRef
}, {
  type: src_app_core_services_image_uploader_service__WEBPACK_IMPORTED_MODULE_4__.ImageUploaderService
}, {
  type: src_app_core_services_modules_billing_service__WEBPACK_IMPORTED_MODULE_5__.BillingService
}, {
  type: src_app_shared_utilities_alerts__WEBPACK_IMPORTED_MODULE_6__.AlertsService
}];

SignModalComponent.propDecorators = {
  signaturePadElement: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
    args: ['sPad', {
      static: true
    }]
  }],
  receipt: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Input
  }],
  currentUser: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Input
  }]
};
SignModalComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-sign-modal',
  template: _sign_modal_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_sign_modal_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], SignModalComponent);


/***/ }),

/***/ 76543:
/*!***********************************************************************************!*\
  !*** ./src/app/shared/components/view/status-request/status-request.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatusRequestComponent": () => (/* binding */ StatusRequestComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _status_request_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./status-request.component.html?ngResource */ 59585);
/* harmony import */ var _status_request_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./status-request.component.scss?ngResource */ 4448);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let StatusRequestComponent = class StatusRequestComponent {
    constructor() { }
    ngOnInit() {
    }
};
StatusRequestComponent.ctorParameters = () => [];
StatusRequestComponent.propDecorators = {
    status: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
StatusRequestComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-status-request',
        template: _status_request_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_status_request_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], StatusRequestComponent);



/***/ }),

/***/ 82234:
/*!************************************************!*\
  !*** ./src/app/shared/pipes/first-key.pipe.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirstKeyPipe": () => (/* binding */ FirstKeyPipe)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


let FirstKeyPipe = class FirstKeyPipe {
    transform(obj) {
        if (!obj) {
            return '';
        }
        var keys = Object.keys(obj);
        if (keys && keys.length > 0) {
            return keys[0];
        }
        return '';
    }
};
FirstKeyPipe = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Pipe)({
        name: 'first'
    })
], FirstKeyPipe);



/***/ }),

/***/ 84203:
/*!**************************************************!*\
  !*** ./src/app/shared/pipes/time-format.pipe.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeFormatPipe": () => (/* binding */ TimeFormatPipe)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 56908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);



let TimeFormatPipe = class TimeFormatPipe {
    constructor() {
        // | timeFormat:'h:mm A'
        this.RESULT = '';
    }
    transform(date, method) {
        this.RESULT = '';
        switch (method) {
            case 'DD/MM/YYYY':
                this.RESULT = moment__WEBPACK_IMPORTED_MODULE_0__(date).format('DD/MM/YYYY');
                break;
            case 'h:mm A':
                this.RESULT = moment__WEBPACK_IMPORTED_MODULE_0__(date).format('h:mm A');
                break;
            case 'shortDateUTC':
                this.RESULT = moment__WEBPACK_IMPORTED_MODULE_0__.parseZone(date).format('DD/MM/YYYY');
                break;
            case 'fullDateUTC':
                this.RESULT = moment__WEBPACK_IMPORTED_MODULE_0__.parseZone(date).format('DD/MM/YYYY h:mm A');
                break;
            case 'displayDateUTC':
                this.RESULT = moment__WEBPACK_IMPORTED_MODULE_0__.parseZone(date).format('dddd, DD') + ' de ' + moment__WEBPACK_IMPORTED_MODULE_0__.parseZone(date).format('MMMM, YYYY');
                break;
            case 'TimeUTC':
                this.RESULT = moment__WEBPACK_IMPORTED_MODULE_0__.parseZone(date).format('h:mm A');
                break;
            case 'MonthDisplay':
                this.RESULT = moment__WEBPACK_IMPORTED_MODULE_0__.parseZone(date).format('MMMM / YYYY');
                break;
            default:
                this.RESULT = date;
        }
        return this.RESULT;
    }
};
TimeFormatPipe = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Pipe)({
        name: 'timeFormat'
    })
], TimeFormatPipe);



/***/ }),

/***/ 44466:
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var swiper_angular__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! swiper/angular */ 341);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _pipes_first_key_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipes/first-key.pipe */ 82234);
/* harmony import */ var _pipes_time_format_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pipes/time-format.pipe */ 84203);
/* harmony import */ var _components_view_big_button_big_button_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/view/big-button/big-button.component */ 23740);
/* harmony import */ var _components_view_main_header_main_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/view/main-header/main-header.component */ 54016);
/* harmony import */ var _components_view_detail_header_detail_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/view/detail-header/detail-header.component */ 88999);
/* harmony import */ var _components_view_not_data_yet_message_not_data_yet_message_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/view/not-data-yet-message/not-data-yet-message.component */ 29168);
/* harmony import */ var _components_view_loading_view_loading_view_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/view/loading-view/loading-view.component */ 266);
/* harmony import */ var _components_view_status_request_status_request_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/view/status-request/status-request.component */ 76543);
/* harmony import */ var _components_view_image_loader_image_loader_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/view/image-loader/image-loader.component */ 74218);
/* harmony import */ var _components_users_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/users/user-profile/user-profile.component */ 29349);
/* harmony import */ var _components_view_notice_bottom_bar_notice_bottom_bar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/view/notice-bottom-bar/notice-bottom-bar.component */ 67798);
/* harmony import */ var _components_new_notice_new_notice_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/new-notice/new-notice.component */ 67186);
/* harmony import */ var _components_services_new_service_new_service_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/services/new-service/new-service.component */ 36048);
/* harmony import */ var _components_services_service_item_service_item_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/services/service-item/service-item.component */ 87150);
/* harmony import */ var _components_spaces_item_space_item_space_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/spaces/item-space/item-space.component */ 67921);
/* harmony import */ var _components_spaces_new_space_new_space_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/spaces/new-space/new-space.component */ 61559);
/* harmony import */ var _components_spaces_new_reservation_new_reservation_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/spaces/new-reservation/new-reservation.component */ 21897);
/* harmony import */ var _components_spaces_detail_space_detail_space_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/spaces/detail-space/detail-space.component */ 65569);
/* harmony import */ var _components_spaces_pick_rent_space_pick_rent_space_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/spaces/pick-rent-space/pick-rent-space.component */ 29204);
/* harmony import */ var _components_view_image_preview_image_preview_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/view/image-preview/image-preview.component */ 36729);
/* harmony import */ var _components_spaces_item_reservation_item_reservation_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/spaces/item-reservation/item-reservation.component */ 21375);
/* harmony import */ var _components_spaces_detail_reservation_detail_reservation_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/spaces/detail-reservation/detail-reservation.component */ 56113);
/* harmony import */ var _components_services_detail_service_detail_service_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/services/detail-service/detail-service.component */ 85585);
/* harmony import */ var _components_users_item_user_item_user_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/users/item-user/item-user.component */ 40560);
/* harmony import */ var _components_users_user_detail_user_detail_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/users/user-detail/user-detail.component */ 9491);
/* harmony import */ var _components_users_edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/users/edit-user/edit-user.component */ 86895);
/* harmony import */ var _components_services_pick_service_pick_service_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/services/pick-service/pick-service.component */ 2850);
/* harmony import */ var _components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/services/new-request/new-request.component */ 58151);
/* harmony import */ var _components_services_detail_request_detail_request_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/services/detail-request/detail-request.component */ 34065);
/* harmony import */ var _components_services_item_request_item_request_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/services/item-request/item-request.component */ 71227);
/* harmony import */ var _components_services_assign_task_assign_task_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/services/assign-task/assign-task.component */ 77894);
/* harmony import */ var _components_bills_new_receipt_new_receipt_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/bills/new-receipt/new-receipt.component */ 11537);
/* harmony import */ var _components_bills_receipt_detail_receipt_detail_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/bills/receipt-detail/receipt-detail.component */ 98556);
/* harmony import */ var _components_bills_receipt_item_receipt_item_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/bills/receipt-item/receipt-item.component */ 79058);
/* harmony import */ var _components_calendar_reservation_calendar_reservation_calendar_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/calendar/reservation-calendar/reservation-calendar.component */ 82461);
/* harmony import */ var _components_calendar_service_calendar_service_calendar_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components/calendar/service-calendar/service-calendar.component */ 81091);
/* harmony import */ var _components_view_sign_modal_sign_modal_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./components/view/sign-modal/sign-modal.component */ 8326);
/* harmony import */ var _components_calendar_reservation_item_reservation_item_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./components/calendar/reservation-item/reservation-item.component */ 18041);
/* harmony import */ var _components_calendar_calendar_service_item_calendar_service_item_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./components/calendar/calendar-service-item/calendar-service-item.component */ 21438);
/* harmony import */ var _components_services_solve_task_solve_task_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./components/services/solve-task/solve-task.component */ 83051);
/* harmony import */ var _components_assign_space_assign_space_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./components/assign-space/assign-space.component */ 49599);





// Pipes


// General view







// Components
































const components = [
    _components_view_big_button_big_button_component__WEBPACK_IMPORTED_MODULE_2__.BigButtonComponent,
    _components_view_main_header_main_header_component__WEBPACK_IMPORTED_MODULE_3__.MainHeaderComponent,
    _components_view_notice_bottom_bar_notice_bottom_bar_component__WEBPACK_IMPORTED_MODULE_10__.NoticeBottomBarComponent,
    _components_view_detail_header_detail_header_component__WEBPACK_IMPORTED_MODULE_4__.DetailHeaderComponent,
    _components_view_not_data_yet_message_not_data_yet_message_component__WEBPACK_IMPORTED_MODULE_5__.NotDataYetMessageComponent,
    _components_view_loading_view_loading_view_component__WEBPACK_IMPORTED_MODULE_6__.LoadingViewComponent,
    _components_view_image_preview_image_preview_component__WEBPACK_IMPORTED_MODULE_19__.ImagePreviewComponent,
    _components_view_status_request_status_request_component__WEBPACK_IMPORTED_MODULE_7__.StatusRequestComponent,
    _components_view_image_loader_image_loader_component__WEBPACK_IMPORTED_MODULE_8__.ImageLoaderComponent,
    // User
    _components_users_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_9__.UserProfileComponent,
    _components_users_item_user_item_user_component__WEBPACK_IMPORTED_MODULE_23__.ItemUserComponent,
    _components_users_user_detail_user_detail_component__WEBPACK_IMPORTED_MODULE_24__.UserDetailComponent,
    _components_users_edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_25__.EditUserComponent,
    //Notice
    _components_new_notice_new_notice_component__WEBPACK_IMPORTED_MODULE_11__.NewNoticeComponent,
    //Services
    _components_services_new_service_new_service_component__WEBPACK_IMPORTED_MODULE_12__.NewServiceComponent,
    _components_services_service_item_service_item_component__WEBPACK_IMPORTED_MODULE_13__.ServiceItemComponent,
    _components_services_detail_service_detail_service_component__WEBPACK_IMPORTED_MODULE_22__.DetailServiceComponent,
    _components_services_pick_service_pick_service_component__WEBPACK_IMPORTED_MODULE_26__.PickServiceComponent,
    _components_services_new_request_new_request_component__WEBPACK_IMPORTED_MODULE_27__.NewRequestComponent,
    _components_services_detail_request_detail_request_component__WEBPACK_IMPORTED_MODULE_28__.DetailRequestComponent,
    _components_services_item_request_item_request_component__WEBPACK_IMPORTED_MODULE_29__.ItemRequestComponent,
    _components_services_assign_task_assign_task_component__WEBPACK_IMPORTED_MODULE_30__.AssignTaskComponent,
    _components_services_solve_task_solve_task_component__WEBPACK_IMPORTED_MODULE_39__.SolveTaskComponent,
    //Spaces
    _components_spaces_item_space_item_space_component__WEBPACK_IMPORTED_MODULE_14__.ItemSpaceComponent,
    _components_spaces_item_reservation_item_reservation_component__WEBPACK_IMPORTED_MODULE_20__.ItemReservationComponent,
    _components_spaces_detail_space_detail_space_component__WEBPACK_IMPORTED_MODULE_17__.DetailSpaceComponent,
    _components_spaces_detail_reservation_detail_reservation_component__WEBPACK_IMPORTED_MODULE_21__.DetailReservationComponent,
    _components_spaces_new_space_new_space_component__WEBPACK_IMPORTED_MODULE_15__.NewSpaceComponent,
    _components_spaces_pick_rent_space_pick_rent_space_component__WEBPACK_IMPORTED_MODULE_18__.PickRentSpaceComponent,
    _components_spaces_new_reservation_new_reservation_component__WEBPACK_IMPORTED_MODULE_16__.NewReservationComponent,
    _components_assign_space_assign_space_component__WEBPACK_IMPORTED_MODULE_40__.AssignSpaceComponent,
    //Receipts
    _components_bills_new_receipt_new_receipt_component__WEBPACK_IMPORTED_MODULE_31__.NewReceiptComponent,
    _components_bills_receipt_detail_receipt_detail_component__WEBPACK_IMPORTED_MODULE_32__.ReceiptDetailComponent,
    _components_bills_receipt_item_receipt_item_component__WEBPACK_IMPORTED_MODULE_33__.ReceiptItemComponent,
    _components_view_sign_modal_sign_modal_component__WEBPACK_IMPORTED_MODULE_36__.SignModalComponent,
    //Calendar
    _components_calendar_reservation_calendar_reservation_calendar_component__WEBPACK_IMPORTED_MODULE_34__.ReservationCalendarComponent,
    _components_calendar_service_calendar_service_calendar_component__WEBPACK_IMPORTED_MODULE_35__.ServiceCalendarComponent,
    _components_calendar_calendar_service_item_calendar_service_item_component__WEBPACK_IMPORTED_MODULE_38__.CalendarServiceItemComponent,
    _components_calendar_reservation_item_reservation_item_component__WEBPACK_IMPORTED_MODULE_37__.ReservationItemComponent
];
const pipes = [
    _pipes_first_key_pipe__WEBPACK_IMPORTED_MODULE_0__.FirstKeyPipe,
    _pipes_time_format_pipe__WEBPACK_IMPORTED_MODULE_1__.TimeFormatPipe
];
let SharedModule = class SharedModule {
};
SharedModule = (0,tslib__WEBPACK_IMPORTED_MODULE_41__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_42__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_43__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_44__.FormsModule,
            swiper_angular__WEBPACK_IMPORTED_MODULE_45__.SwiperModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_44__.ReactiveFormsModule,
        ],
        declarations: [
            ...pipes,
            ...components
        ],
        exports: [
            ...pipes,
            ...components
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_42__.CUSTOM_ELEMENTS_SCHEMA],
    })
], SharedModule);



/***/ }),

/***/ 94264:
/*!******************************************************!*\
  !*** ./src/app/shared/utilities/verificationFunc.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VerificationFuncService": () => (/* binding */ VerificationFuncService)
/* harmony export */ });
/* harmony import */ var _Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/core */ 26549);
/* harmony import */ var _capacitor_keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/keyboard */ 10523);





let VerificationFuncService = class VerificationFuncService {
  constructor() {}

  aleatorio(a, b) {
    const newNumber = Math.round(Math.random() * (b - a) + parseInt(a));
    return newNumber < 10 ? '0' + newNumber : '' + newNumber;
  }

  sortByType(a, b) {
    if (a.type < b.type) {
      return -1;
    }

    if (a.type > b.type) {
      return 1;
    }

    return 0;
  }

  EnterSubmit(evt, form, block) {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (evt.keyCode === 13 && form.status === 'VALID' && !block) {
        if (_capacitor_core__WEBPACK_IMPORTED_MODULE_1__.Capacitor.getPlatform() !== 'web') {
          _capacitor_keyboard__WEBPACK_IMPORTED_MODULE_2__.Keyboard.hide();
        }

        return true;
      }

      return false;
    })();
  }

  createShortUser(user) {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const short = {
        uid: user.uid,
        photo: user.photo ? user.photo : '',
        email: user.email,
        name: user.name + ' ' + user.lastName
      };
      return short;
    })();
  }

  createShortSpace(space) {
    return (0,_Users_gabrielwitt_Desktop_UTPL_Tesis_athosApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const short = {
        uid: space.uid,
        unitNumber: space.unitNumber,
        communityUID: space.communityUID,
        description: space.description,
        floor: space.floor,
        type: space.type,
        photo: space.photo
      };
      return short;
    })();
  }

  Unidades(num) {
    switch (num) {
      case 1:
        return 'UN';

      case 2:
        return 'DOS';

      case 3:
        return 'TRES';

      case 4:
        return 'CUATRO';

      case 5:
        return 'CINCO';

      case 6:
        return 'SEIS';

      case 7:
        return 'SIETE';

      case 8:
        return 'OCHO';

      case 9:
        return 'NUEVE';
    }

    return '';
  } //Unidades()


  Decenas(num) {
    let decena = Math.floor(num / 10);
    let unidad = num - decena * 10;

    switch (decena) {
      case 1:
        switch (unidad) {
          case 0:
            return 'DIEZ';

          case 1:
            return 'ONCE';

          case 2:
            return 'DOCE';

          case 3:
            return 'TRECE';

          case 4:
            return 'CATORCE';

          case 5:
            return 'QUINCE';

          default:
            return 'DIECI' + this.Unidades(unidad);
        }

      case 2:
        switch (unidad) {
          case 0:
            return 'VEINTE';

          default:
            return 'VEINTI' + this.Unidades(unidad);
        }

      case 3:
        return this.DecenasY('TREINTA', unidad);

      case 4:
        return this.DecenasY('CUARENTA', unidad);

      case 5:
        return this.DecenasY('CINCUENTA', unidad);

      case 6:
        return this.DecenasY('SESENTA', unidad);

      case 7:
        return this.DecenasY('SETENTA', unidad);

      case 8:
        return this.DecenasY('OCHENTA', unidad);

      case 9:
        return this.DecenasY('NOVENTA', unidad);

      case 0:
        return this.Unidades(unidad);
    }
  } //Unidades()


  DecenasY(strSin, numUnidades) {
    if (numUnidades > 0) return strSin + ' Y ' + this.Unidades(numUnidades);
    return strSin;
  } //DecenasY()


  Centenas(num) {
    let centenas = Math.floor(num / 100);
    let decenas = num - centenas * 100;

    switch (centenas) {
      case 1:
        if (decenas > 0) return 'CIENTO ' + this.Decenas(decenas);
        return 'CIEN';

      case 2:
        return 'DOSCIENTOS ' + this.Decenas(decenas);

      case 3:
        return 'TRESCIENTOS ' + this.Decenas(decenas);

      case 4:
        return 'CUATROCIENTOS ' + this.Decenas(decenas);

      case 5:
        return 'QUINIENTOS ' + this.Decenas(decenas);

      case 6:
        return 'SEISCIENTOS ' + this.Decenas(decenas);

      case 7:
        return 'SETECIENTOS ' + this.Decenas(decenas);

      case 8:
        return 'OCHOCIENTOS ' + this.Decenas(decenas);

      case 9:
        return 'NOVECIENTOS ' + this.Decenas(decenas);
    }

    return this.Decenas(decenas);
  } //Centenas()


  Seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;
    let letras = '';
    if (cientos > 0) if (cientos > 1) letras = this.Centenas(cientos) + ' ' + strPlural;else letras = strSingular;
    if (resto > 0) letras += '';
    return letras;
  } //Seccion()


  Miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;
    let strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
    let strCentenas = this.Centenas(resto);
    if (strMiles == '') return strCentenas;
    return strMiles + ' ' + strCentenas;
  } //Miles()


  Millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;
    let strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
    let strMiles = this.Miles(resto);
    if (strMillones == '') return strMiles;
    return strMillones + ' ' + strMiles;
  } //Millones()


  numeroALetras(num, currency) {
    currency = currency || {};
    let data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: Math.round(num * 100) - Math.floor(num) * 100,
      letrasCentavos: '',
      letrasMonedaPlural: currency.plural || 'DÓLARES',
      letrasMonedaSingular: currency.singular || 'DÓLAR',
      letrasMonedaCentavoPlural: currency.centPlural || 'CENTAVOS',
      letrasMonedaCentavoSingular: currency.centSingular || 'CENTAVO'
    };

    if (data.centavos > 0) {
      let centavos = '';
      if (data.centavos == 1) centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;else centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
      data.letrasCentavos = 'CON ' + centavos;
    }

    ;
    if (data.enteros == 0) return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    if (data.enteros == 1) return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;else return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
  }

};

VerificationFuncService.ctorParameters = () => [];

VerificationFuncService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
  providedIn: 'root'
})], VerificationFuncService);


/***/ }),

/***/ 19125:
/*!******************************************************************!*\
  !*** ./node_modules/@capacitor/keyboard/dist/esm/definitions.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyboardResize": () => (/* binding */ KeyboardResize),
/* harmony export */   "KeyboardStyle": () => (/* binding */ KeyboardStyle)
/* harmony export */ });
/// <reference types="@capacitor/cli" />
var KeyboardStyle;

(function (KeyboardStyle) {
  /**
   * Dark keyboard.
   *
   * @since 1.0.0
   */
  KeyboardStyle["Dark"] = "DARK";
  /**
   * Light keyboard.
   *
   * @since 1.0.0
   */

  KeyboardStyle["Light"] = "LIGHT";
  /**
   * On iOS 13 and newer the keyboard style is based on the device appearance.
   * If the device is using Dark mode, the keyboard will be dark.
   * If the device is using Light mode, the keyboard will be light.
   * On iOS 12 the keyboard will be light.
   *
   * @since 1.0.0
   */

  KeyboardStyle["Default"] = "DEFAULT";
})(KeyboardStyle || (KeyboardStyle = {}));

var KeyboardResize;

(function (KeyboardResize) {
  /**
   * Only the `body` HTML element will be resized.
   * Relative units are not affected, because the viewport does not change.
   *
   * @since 1.0.0
   */
  KeyboardResize["Body"] = "body";
  /**
   * Only the `ion-app` HTML element will be resized.
   * Use it only for Ionic Framework apps.
   *
   * @since 1.0.0
   */

  KeyboardResize["Ionic"] = "ionic";
  /**
   * The whole native Web View will be resized when the keyboard shows/hides.
   * This affects the `vh` relative unit.
   *
   * @since 1.0.0
   */

  KeyboardResize["Native"] = "native";
  /**
   * Neither the app nor the Web View are resized.
   *
   * @since 1.0.0
   */

  KeyboardResize["None"] = "none";
})(KeyboardResize || (KeyboardResize = {}));

/***/ }),

/***/ 10523:
/*!************************************************************!*\
  !*** ./node_modules/@capacitor/keyboard/dist/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard),
/* harmony export */   "KeyboardResize": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.KeyboardResize),
/* harmony export */   "KeyboardStyle": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.KeyboardStyle)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 26549);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ 19125);

const Keyboard = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('Keyboard');



/***/ }),

/***/ 61032:
/*!**********************************************************!*\
  !*** ./node_modules/signature_pad/dist/signature_pad.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SignaturePad)
/* harmony export */ });
/*!
 * Signature Pad v4.1.4 | https://github.com/szimek/signature_pad
 * (c) 2022 Szymon Nowak | Released under the MIT license
 */
class Point {
  constructor(x, y, pressure, time) {
    if (isNaN(x) || isNaN(y)) {
      throw new Error(`Point is invalid: (${x}, ${y})`);
    }

    this.x = +x;
    this.y = +y;
    this.pressure = pressure || 0;
    this.time = time || Date.now();
  }

  distanceTo(start) {
    return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
  }

  equals(other) {
    return this.x === other.x && this.y === other.y && this.pressure === other.pressure && this.time === other.time;
  }

  velocityFrom(start) {
    return this.time !== start.time ? this.distanceTo(start) / (this.time - start.time) : 0;
  }

}

class Bezier {
  constructor(startPoint, control2, control1, endPoint, startWidth, endWidth) {
    this.startPoint = startPoint;
    this.control2 = control2;
    this.control1 = control1;
    this.endPoint = endPoint;
    this.startWidth = startWidth;
    this.endWidth = endWidth;
  }

  static fromPoints(points, widths) {
    const c2 = this.calculateControlPoints(points[0], points[1], points[2]).c2;
    const c3 = this.calculateControlPoints(points[1], points[2], points[3]).c1;
    return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);
  }

  static calculateControlPoints(s1, s2, s3) {
    const dx1 = s1.x - s2.x;
    const dy1 = s1.y - s2.y;
    const dx2 = s2.x - s3.x;
    const dy2 = s2.y - s3.y;
    const m1 = {
      x: (s1.x + s2.x) / 2.0,
      y: (s1.y + s2.y) / 2.0
    };
    const m2 = {
      x: (s2.x + s3.x) / 2.0,
      y: (s2.y + s3.y) / 2.0
    };
    const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    const dxm = m1.x - m2.x;
    const dym = m1.y - m2.y;
    const k = l2 / (l1 + l2);
    const cm = {
      x: m2.x + dxm * k,
      y: m2.y + dym * k
    };
    const tx = s2.x - cm.x;
    const ty = s2.y - cm.y;
    return {
      c1: new Point(m1.x + tx, m1.y + ty),
      c2: new Point(m2.x + tx, m2.y + ty)
    };
  }

  length() {
    const steps = 10;
    let length = 0;
    let px;
    let py;

    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
      const cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);

      if (i > 0) {
        const xdiff = cx - px;
        const ydiff = cy - py;
        length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
      }

      px = cx;
      py = cy;
    }

    return length;
  }

  point(t, start, c1, c2, end) {
    return start * (1.0 - t) * (1.0 - t) * (1.0 - t) + 3.0 * c1 * (1.0 - t) * (1.0 - t) * t + 3.0 * c2 * (1.0 - t) * t * t + end * t * t * t;
  }

}

class SignatureEventTarget {
  constructor() {
    try {
      this._et = new EventTarget();
    } catch (error) {
      this._et = document;
    }
  }

  addEventListener(type, listener, options) {
    this._et.addEventListener(type, listener, options);
  }

  dispatchEvent(event) {
    return this._et.dispatchEvent(event);
  }

  removeEventListener(type, callback, options) {
    this._et.removeEventListener(type, callback, options);
  }

}

function throttle(fn, wait = 250) {
  let previous = 0;
  let timeout = null;
  let result;
  let storedContext;
  let storedArgs;

  const later = () => {
    previous = Date.now();
    timeout = null;
    result = fn.apply(storedContext, storedArgs);

    if (!timeout) {
      storedContext = null;
      storedArgs = [];
    }
  };

  return function wrapper(...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    storedContext = this;
    storedArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      result = fn.apply(storedContext, storedArgs);

      if (!timeout) {
        storedContext = null;
        storedArgs = [];
      }
    } else if (!timeout) {
      timeout = window.setTimeout(later, remaining);
    }

    return result;
  };
}

class SignaturePad extends SignatureEventTarget {
  constructor(canvas, options = {}) {
    super();
    this.canvas = canvas;

    this._handleMouseDown = event => {
      if (event.buttons === 1) {
        this._drawningStroke = true;

        this._strokeBegin(event);
      }
    };

    this._handleMouseMove = event => {
      if (this._drawningStroke) {
        this._strokeMoveUpdate(event);
      }
    };

    this._handleMouseUp = event => {
      if (event.buttons === 1 && this._drawningStroke) {
        this._drawningStroke = false;

        this._strokeEnd(event);
      }
    };

    this._handleTouchStart = event => {
      if (event.cancelable) {
        event.preventDefault();
      }

      if (event.targetTouches.length === 1) {
        const touch = event.changedTouches[0];

        this._strokeBegin(touch);
      }
    };

    this._handleTouchMove = event => {
      if (event.cancelable) {
        event.preventDefault();
      }

      const touch = event.targetTouches[0];

      this._strokeMoveUpdate(touch);
    };

    this._handleTouchEnd = event => {
      const wasCanvasTouched = event.target === this.canvas;

      if (wasCanvasTouched) {
        if (event.cancelable) {
          event.preventDefault();
        }

        const touch = event.changedTouches[0];

        this._strokeEnd(touch);
      }
    };

    this._handlePointerStart = event => {
      this._drawningStroke = true;
      event.preventDefault();

      this._strokeBegin(event);
    };

    this._handlePointerMove = event => {
      if (this._drawningStroke) {
        event.preventDefault();

        this._strokeMoveUpdate(event);
      }
    };

    this._handlePointerEnd = event => {
      if (this._drawningStroke) {
        event.preventDefault();
        this._drawningStroke = false;

        this._strokeEnd(event);
      }
    };

    this.velocityFilterWeight = options.velocityFilterWeight || 0.7;
    this.minWidth = options.minWidth || 0.5;
    this.maxWidth = options.maxWidth || 2.5;
    this.throttle = 'throttle' in options ? options.throttle : 16;
    this.minDistance = 'minDistance' in options ? options.minDistance : 5;
    this.dotSize = options.dotSize || 0;
    this.penColor = options.penColor || 'black';
    this.backgroundColor = options.backgroundColor || 'rgba(0,0,0,0)';
    this._strokeMoveUpdate = this.throttle ? throttle(SignaturePad.prototype._strokeUpdate, this.throttle) : SignaturePad.prototype._strokeUpdate;
    this._ctx = canvas.getContext('2d');
    this.clear();
    this.on();
  }

  clear() {
    const {
      _ctx: ctx,
      canvas
    } = this;
    ctx.fillStyle = this.backgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this._data = [];

    this._reset(this._getPointGroupOptions());

    this._isEmpty = true;
  }

  fromDataURL(dataUrl, options = {}) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const ratio = options.ratio || window.devicePixelRatio || 1;
      const width = options.width || this.canvas.width / ratio;
      const height = options.height || this.canvas.height / ratio;
      const xOffset = options.xOffset || 0;
      const yOffset = options.yOffset || 0;

      this._reset(this._getPointGroupOptions());

      image.onload = () => {
        this._ctx.drawImage(image, xOffset, yOffset, width, height);

        resolve();
      };

      image.onerror = error => {
        reject(error);
      };

      image.crossOrigin = 'anonymous';
      image.src = dataUrl;
      this._isEmpty = false;
    });
  }

  toDataURL(type = 'image/png', encoderOptions) {
    switch (type) {
      case 'image/svg+xml':
        if (typeof encoderOptions !== 'object') {
          encoderOptions = undefined;
        }

        return `data:image/svg+xml;base64,${btoa(this.toSVG(encoderOptions))}`;

      default:
        if (typeof encoderOptions !== 'number') {
          encoderOptions = undefined;
        }

        return this.canvas.toDataURL(type, encoderOptions);
    }
  }

  on() {
    this.canvas.style.touchAction = 'none';
    this.canvas.style.msTouchAction = 'none';
    this.canvas.style.userSelect = 'none';
    const isIOS = /Macintosh/.test(navigator.userAgent) && 'ontouchstart' in document;

    if (window.PointerEvent && !isIOS) {
      this._handlePointerEvents();
    } else {
      this._handleMouseEvents();

      if ('ontouchstart' in window) {
        this._handleTouchEvents();
      }
    }
  }

  off() {
    this.canvas.style.touchAction = 'auto';
    this.canvas.style.msTouchAction = 'auto';
    this.canvas.style.userSelect = 'auto';
    this.canvas.removeEventListener('pointerdown', this._handlePointerStart);
    this.canvas.removeEventListener('pointermove', this._handlePointerMove);
    this.canvas.ownerDocument.removeEventListener('pointerup', this._handlePointerEnd);
    this.canvas.removeEventListener('mousedown', this._handleMouseDown);
    this.canvas.removeEventListener('mousemove', this._handleMouseMove);
    this.canvas.ownerDocument.removeEventListener('mouseup', this._handleMouseUp);
    this.canvas.removeEventListener('touchstart', this._handleTouchStart);
    this.canvas.removeEventListener('touchmove', this._handleTouchMove);
    this.canvas.removeEventListener('touchend', this._handleTouchEnd);
  }

  isEmpty() {
    return this._isEmpty;
  }

  fromData(pointGroups, {
    clear = true
  } = {}) {
    if (clear) {
      this.clear();
    }

    this._fromData(pointGroups, this._drawCurve.bind(this), this._drawDot.bind(this));

    this._data = this._data.concat(pointGroups);
  }

  toData() {
    return this._data;
  }

  _getPointGroupOptions(group) {
    return {
      penColor: group && 'penColor' in group ? group.penColor : this.penColor,
      dotSize: group && 'dotSize' in group ? group.dotSize : this.dotSize,
      minWidth: group && 'minWidth' in group ? group.minWidth : this.minWidth,
      maxWidth: group && 'maxWidth' in group ? group.maxWidth : this.maxWidth,
      velocityFilterWeight: group && 'velocityFilterWeight' in group ? group.velocityFilterWeight : this.velocityFilterWeight
    };
  }

  _strokeBegin(event) {
    this.dispatchEvent(new CustomEvent('beginStroke', {
      detail: event
    }));

    const pointGroupOptions = this._getPointGroupOptions();

    const newPointGroup = Object.assign(Object.assign({}, pointGroupOptions), {
      points: []
    });

    this._data.push(newPointGroup);

    this._reset(pointGroupOptions);

    this._strokeUpdate(event);
  }

  _strokeUpdate(event) {
    if (this._data.length === 0) {
      this._strokeBegin(event);

      return;
    }

    this.dispatchEvent(new CustomEvent('beforeUpdateStroke', {
      detail: event
    }));
    const x = event.clientX;
    const y = event.clientY;
    const pressure = event.pressure !== undefined ? event.pressure : event.force !== undefined ? event.force : 0;

    const point = this._createPoint(x, y, pressure);

    const lastPointGroup = this._data[this._data.length - 1];
    const lastPoints = lastPointGroup.points;
    const lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
    const isLastPointTooClose = lastPoint ? point.distanceTo(lastPoint) <= this.minDistance : false;

    const pointGroupOptions = this._getPointGroupOptions(lastPointGroup);

    if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
      const curve = this._addPoint(point, pointGroupOptions);

      if (!lastPoint) {
        this._drawDot(point, pointGroupOptions);
      } else if (curve) {
        this._drawCurve(curve, pointGroupOptions);
      }

      lastPoints.push({
        time: point.time,
        x: point.x,
        y: point.y,
        pressure: point.pressure
      });
    }

    this.dispatchEvent(new CustomEvent('afterUpdateStroke', {
      detail: event
    }));
  }

  _strokeEnd(event) {
    this._strokeUpdate(event);

    this.dispatchEvent(new CustomEvent('endStroke', {
      detail: event
    }));
  }

  _handlePointerEvents() {
    this._drawningStroke = false;
    this.canvas.addEventListener('pointerdown', this._handlePointerStart);
    this.canvas.addEventListener('pointermove', this._handlePointerMove);
    this.canvas.ownerDocument.addEventListener('pointerup', this._handlePointerEnd);
  }

  _handleMouseEvents() {
    this._drawningStroke = false;
    this.canvas.addEventListener('mousedown', this._handleMouseDown);
    this.canvas.addEventListener('mousemove', this._handleMouseMove);
    this.canvas.ownerDocument.addEventListener('mouseup', this._handleMouseUp);
  }

  _handleTouchEvents() {
    this.canvas.addEventListener('touchstart', this._handleTouchStart);
    this.canvas.addEventListener('touchmove', this._handleTouchMove);
    this.canvas.addEventListener('touchend', this._handleTouchEnd);
  }

  _reset(options) {
    this._lastPoints = [];
    this._lastVelocity = 0;
    this._lastWidth = (options.minWidth + options.maxWidth) / 2;
    this._ctx.fillStyle = options.penColor;
  }

  _createPoint(x, y, pressure) {
    const rect = this.canvas.getBoundingClientRect();
    return new Point(x - rect.left, y - rect.top, pressure, new Date().getTime());
  }

  _addPoint(point, options) {
    const {
      _lastPoints
    } = this;

    _lastPoints.push(point);

    if (_lastPoints.length > 2) {
      if (_lastPoints.length === 3) {
        _lastPoints.unshift(_lastPoints[0]);
      }

      const widths = this._calculateCurveWidths(_lastPoints[1], _lastPoints[2], options);

      const curve = Bezier.fromPoints(_lastPoints, widths);

      _lastPoints.shift();

      return curve;
    }

    return null;
  }

  _calculateCurveWidths(startPoint, endPoint, options) {
    const velocity = options.velocityFilterWeight * endPoint.velocityFrom(startPoint) + (1 - options.velocityFilterWeight) * this._lastVelocity;

    const newWidth = this._strokeWidth(velocity, options);

    const widths = {
      end: newWidth,
      start: this._lastWidth
    };
    this._lastVelocity = velocity;
    this._lastWidth = newWidth;
    return widths;
  }

  _strokeWidth(velocity, options) {
    return Math.max(options.maxWidth / (velocity + 1), options.minWidth);
  }

  _drawCurveSegment(x, y, width) {
    const ctx = this._ctx;
    ctx.moveTo(x, y);
    ctx.arc(x, y, width, 0, 2 * Math.PI, false);
    this._isEmpty = false;
  }

  _drawCurve(curve, options) {
    const ctx = this._ctx;
    const widthDelta = curve.endWidth - curve.startWidth;
    const drawSteps = Math.ceil(curve.length()) * 2;
    ctx.beginPath();
    ctx.fillStyle = options.penColor;

    for (let i = 0; i < drawSteps; i += 1) {
      const t = i / drawSteps;
      const tt = t * t;
      const ttt = tt * t;
      const u = 1 - t;
      const uu = u * u;
      const uuu = uu * u;
      let x = uuu * curve.startPoint.x;
      x += 3 * uu * t * curve.control1.x;
      x += 3 * u * tt * curve.control2.x;
      x += ttt * curve.endPoint.x;
      let y = uuu * curve.startPoint.y;
      y += 3 * uu * t * curve.control1.y;
      y += 3 * u * tt * curve.control2.y;
      y += ttt * curve.endPoint.y;
      const width = Math.min(curve.startWidth + ttt * widthDelta, options.maxWidth);

      this._drawCurveSegment(x, y, width);
    }

    ctx.closePath();
    ctx.fill();
  }

  _drawDot(point, options) {
    const ctx = this._ctx;
    const width = options.dotSize > 0 ? options.dotSize : (options.minWidth + options.maxWidth) / 2;
    ctx.beginPath();

    this._drawCurveSegment(point.x, point.y, width);

    ctx.closePath();
    ctx.fillStyle = options.penColor;
    ctx.fill();
  }

  _fromData(pointGroups, drawCurve, drawDot) {
    for (const group of pointGroups) {
      const {
        points
      } = group;

      const pointGroupOptions = this._getPointGroupOptions(group);

      if (points.length > 1) {
        for (let j = 0; j < points.length; j += 1) {
          const basicPoint = points[j];
          const point = new Point(basicPoint.x, basicPoint.y, basicPoint.pressure, basicPoint.time);

          if (j === 0) {
            this._reset(pointGroupOptions);
          }

          const curve = this._addPoint(point, pointGroupOptions);

          if (curve) {
            drawCurve(curve, pointGroupOptions);
          }
        }
      } else {
        this._reset(pointGroupOptions);

        drawDot(points[0], pointGroupOptions);
      }
    }
  }

  toSVG({
    includeBackgroundColor = false
  } = {}) {
    const pointGroups = this._data;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const minX = 0;
    const minY = 0;
    const maxX = this.canvas.width / ratio;
    const maxY = this.canvas.height / ratio;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svg.setAttribute('viewBox', `${minX} ${minY} ${maxX} ${maxY}`);
    svg.setAttribute('width', maxX.toString());
    svg.setAttribute('height', maxY.toString());

    if (includeBackgroundColor && this.backgroundColor) {
      const rect = document.createElement('rect');
      rect.setAttribute('width', '100%');
      rect.setAttribute('height', '100%');
      rect.setAttribute('fill', this.backgroundColor);
      svg.appendChild(rect);
    }

    this._fromData(pointGroups, (curve, {
      penColor
    }) => {
      const path = document.createElement('path');

      if (!isNaN(curve.control1.x) && !isNaN(curve.control1.y) && !isNaN(curve.control2.x) && !isNaN(curve.control2.y)) {
        const attr = `M ${curve.startPoint.x.toFixed(3)},${curve.startPoint.y.toFixed(3)} ` + `C ${curve.control1.x.toFixed(3)},${curve.control1.y.toFixed(3)} ` + `${curve.control2.x.toFixed(3)},${curve.control2.y.toFixed(3)} ` + `${curve.endPoint.x.toFixed(3)},${curve.endPoint.y.toFixed(3)}`;
        path.setAttribute('d', attr);
        path.setAttribute('stroke-width', (curve.endWidth * 2.25).toFixed(3));
        path.setAttribute('stroke', penColor);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        svg.appendChild(path);
      }
    }, (point, {
      penColor,
      dotSize,
      minWidth,
      maxWidth
    }) => {
      const circle = document.createElement('circle');
      const size = dotSize > 0 ? dotSize : (minWidth + maxWidth) / 2;
      circle.setAttribute('r', size.toString());
      circle.setAttribute('cx', point.x.toString());
      circle.setAttribute('cy', point.y.toString());
      circle.setAttribute('fill', penColor);
      svg.appendChild(circle);
    });

    return svg.outerHTML;
  }

}



/***/ }),

/***/ 64393:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/assign-space/assign-space.component.scss?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhc3NpZ24tc3BhY2UuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 26934:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/bills/new-receipt/new-receipt.component.scss?ngResource ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = ".billBorder {\n  border-radius: 25px;\n  border: 2px solid black;\n}\n\n.squareBorder {\n  border: 2px solid black;\n}\n\n.itemBorder {\n  border-left: 2px solid black;\n  border-right: 2px solid black;\n}\n\n.itemMidBorder {\n  border-top: 2px solid black;\n  border-bottom: 2px solid black;\n}\n\n.totalBorder {\n  border-top: 2px solid black;\n  border-bottom: 2px solid black;\n  border-right: 2px solid black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldy1yZWNlaXB0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksbUJBQUE7RUFDQSx1QkFBQTtBQUNKOztBQUVBO0VBQ0ksdUJBQUE7QUFDSjs7QUFFQTtFQUNJLDRCQUFBO0VBQ0EsNkJBQUE7QUFDSjs7QUFFQTtFQUNJLDJCQUFBO0VBQ0EsOEJBQUE7QUFDSjs7QUFFQTtFQUNJLDJCQUFBO0VBQ0EsOEJBQUE7RUFDQSw2QkFBQTtBQUNKIiwiZmlsZSI6Im5ldy1yZWNlaXB0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJpbGxCb3JkZXIge1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gICAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XG59XG5cbi5zcXVhcmVCb3JkZXJ7XG4gICAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XG59XG5cbi5pdGVtQm9yZGVye1xuICAgIGJvcmRlci1sZWZ0OiAycHggc29saWQgYmxhY2s7XG4gICAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgYmxhY2s7XG59XG5cbi5pdGVtTWlkQm9yZGVye1xuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCBibGFjaztcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgYmxhY2s7XG59XG5cbi50b3RhbEJvcmRlcntcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgYmxhY2s7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGJsYWNrO1xuICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkIGJsYWNrO1xufSJdfQ== */";

/***/ }),

/***/ 65468:
/*!*************************************************************************************************!*\
  !*** ./src/app/shared/components/bills/receipt-detail/receipt-detail.component.scss?ngResource ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = ".billBorder {\n  border-radius: 25px;\n  border: 2px solid black;\n}\n\n.squareBorder {\n  border: 2px solid black;\n}\n\n.itemBorder {\n  border-left: 2px solid black;\n  border-right: 2px solid black;\n}\n\n.itemMidBorder {\n  border-top: 2px solid black;\n  border-bottom: 2px solid black;\n}\n\n.totalBorder {\n  border-top: 2px solid black;\n  border-bottom: 2px solid black;\n  border-right: 2px solid black;\n}\n\n.signatureBorder {\n  border-bottom: 2px solid black;\n}\n\n.signSize {\n  height: 90px;\n}\n\n.itemDateBorder {\n  border-top: 2px solid black;\n  border-bottom: 2px solid black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY2VpcHQtZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksbUJBQUE7RUFDQSx1QkFBQTtBQUNKOztBQUVBO0VBQ0ksdUJBQUE7QUFDSjs7QUFFQTtFQUNJLDRCQUFBO0VBQ0EsNkJBQUE7QUFDSjs7QUFFQTtFQUNJLDJCQUFBO0VBQ0EsOEJBQUE7QUFDSjs7QUFFQTtFQUNJLDJCQUFBO0VBQ0EsOEJBQUE7RUFDQSw2QkFBQTtBQUNKOztBQUVBO0VBQ0ksOEJBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7QUFDSjs7QUFFQTtFQUNJLDJCQUFBO0VBQ0EsOEJBQUE7QUFDSiIsImZpbGUiOiJyZWNlaXB0LWRldGFpbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5iaWxsQm9yZGVyIHtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xufVxuXG4uc3F1YXJlQm9yZGVye1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xufVxuXG4uaXRlbUJvcmRlcntcbiAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkIGJsYWNrO1xuICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkIGJsYWNrO1xufVxuXG4uaXRlbU1pZEJvcmRlcntcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgYmxhY2s7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGJsYWNrO1xufVxuXG4udG90YWxCb3JkZXJ7XG4gICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIGJsYWNrO1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBibGFjaztcbiAgICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCBibGFjaztcbn1cblxuLnNpZ25hdHVyZUJvcmRlcntcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgYmxhY2s7XG59XG5cbi5zaWduU2l6ZXtcbiAgICBoZWlnaHQ6IDkwcHg7XG59XG5cbi5pdGVtRGF0ZUJvcmRlcntcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgYmxhY2s7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGJsYWNrO1xufSJdfQ== */";

/***/ }),

/***/ 92487:
/*!*********************************************************************************************!*\
  !*** ./src/app/shared/components/bills/receipt-item/receipt-item.component.scss?ngResource ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = ".userItemList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 13pt;\n  color: black;\n  min-height: 30pt;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY2VpcHQtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDJDQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQUNKIiwiZmlsZSI6InJlY2VpcHQtaXRlbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi51c2VySXRlbUxpc3R7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYigxODcsIDE4NywgMTg3KTtcbiAgICBmb250LXNpemU6IDEzcHQ7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIG1pbi1oZWlnaHQ6IDMwcHQ7XG59Il19 */";

/***/ }),

/***/ 80622:
/*!******************************************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/calendar-service-item/calendar-service-item.component.scss?ngResource ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWxlbmRhci1zZXJ2aWNlLWl0ZW0uY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 5398:
/*!****************************************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/reservation-calendar/reservation-calendar.component.scss?ngResource ***!
  \****************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXNlcnZhdGlvbi1jYWxlbmRhci5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 57297:
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/reservation-item/reservation-item.component.scss?ngResource ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXNlcnZhdGlvbi1pdGVtLmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 92724:
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/service-calendar/service-calendar.component.scss?ngResource ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlLWNhbGVuZGFyLmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 85679:
/*!***********************************************************************************!*\
  !*** ./src/app/shared/components/new-notice/new-notice.component.scss?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = ".rightButtonContainer {\n  text-align: center;\n}\n\n.rightButton {\n  width: 35px;\n  height: 35px;\n  margin: 3px 0px 3px -5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldy1ub3RpY2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSx3QkFBQTtBQUNKIiwiZmlsZSI6Im5ldy1ub3RpY2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmlnaHRCdXR0b25Db250YWluZXJ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucmlnaHRCdXR0b257XG4gICAgd2lkdGg6IDM1cHg7IFxuICAgIGhlaWdodDogMzVweDsgXG4gICAgbWFyZ2luOiAzcHggMHB4IDNweCAtNXB4O1xufSJdfQ== */";

/***/ }),

/***/ 14258:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/services/assign-task/assign-task.component.scss?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = ".spaceView {\n  background-size: 120% auto !important;\n  background-position: center;\n  --size: 20vw;\n}\n\n.time_box {\n  border: 2px solid var(--ion-color-secondary);\n  width: 100%;\n  text-align: center;\n  color: black;\n  padding: 4px 8px;\n  font-size: 14px;\n  font-weight: bold;\n  margin: 2px 0;\n  border-radius: 15px;\n}\n\n.time_box.selected {\n  background-color: var(--ion-color-secondary);\n}\n\n.time_box.disabled {\n  background: darkgray !important;\n  border: 0 !important;\n}\n\n.guest_size {\n  font-size: 20pt;\n}\n\n.input_bg {\n  border: 2pt solid var(--ion-color-dark);\n  border-radius: 15pt;\n  padding: 5pt;\n}\n\n.dateStyle {\n  font-size: inherit;\n  float: right;\n}\n\n.noDateStyle {\n  --color: #b4b4b4;\n  color: #b4b4b4;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2lnbi10YXNrLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0kscUNBQUE7RUFDQSwyQkFBQTtFQUNBLFlBQUE7QUFBSjs7QUFHQTtFQUNJLDRDQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBQUo7O0FBR0E7RUFDSSw0Q0FBQTtBQUFKOztBQUdBO0VBQ0ksK0JBQUE7RUFDQSxvQkFBQTtBQUFKOztBQUdBO0VBQ0ksZUFBQTtBQUFKOztBQUdBO0VBQ0ksdUNBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFBSjs7QUFHQTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtBQUFKOztBQUdBO0VBQ0ksZ0JBQUE7RUFDQSxjQUFBO0FBQUoiLCJmaWxlIjoiYXNzaWduLXRhc2suY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5zcGFjZVZpZXd7XG4gICAgYmFja2dyb3VuZC1zaXplOiAxMjAlIGF1dG8gIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgLS1zaXplOiAyMHZ3O1xufVxuXG4udGltZV9ib3gge1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgcGFkZGluZzogNHB4IDhweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgbWFyZ2luOiAycHggMDtcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xufVxuXG4udGltZV9ib3guc2VsZWN0ZWR7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG59XG5cbi50aW1lX2JveC5kaXNhYmxlZHtcbiAgICBiYWNrZ3JvdW5kOiBkYXJrZ3JheSAhaW1wb3J0YW50O1xuICAgIGJvcmRlcjogMCAhaW1wb3J0YW50O1xufVxuXG4uZ3Vlc3Rfc2l6ZXtcbiAgICBmb250LXNpemU6IDIwcHQ7XG59XG5cbi5pbnB1dF9iZyB7XG4gICAgYm9yZGVyOiAycHQgc29saWQgdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgIGJvcmRlci1yYWRpdXM6IDE1cHQ7XG4gICAgcGFkZGluZzogNXB0O1xuICB9XG5cbi5kYXRlU3R5bGV7XG4gICAgZm9udC1zaXplOiBpbmhlcml0OyBcbiAgICBmbG9hdDogcmlnaHQ7XG59XG5cbi5ub0RhdGVTdHlsZXtcbiAgICAtLWNvbG9yOiAjYjRiNGI0O1xuICAgIGNvbG9yOiAjYjRiNGI0O1xufSJdfQ== */";

/***/ }),

/***/ 79121:
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/services/detail-request/detail-request.component.scss?ngResource ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = ".textoDisplay {\n  font-size: 12pt;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC1yZXF1ZXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7QUFDSiIsImZpbGUiOiJkZXRhaWwtcmVxdWVzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi50ZXh0b0Rpc3BsYXl7XG4gICAgZm9udC1zaXplOiAxMnB0O1xuICAgIGNvbG9yOiBibGFjaztcbn0iXX0= */";

/***/ }),

/***/ 82563:
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/services/detail-service/detail-service.component.scss?ngResource ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZXRhaWwtc2VydmljZS5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 64290:
/*!************************************************************************************************!*\
  !*** ./src/app/shared/components/services/item-request/item-request.component.scss?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpdGVtLXJlcXVlc3QuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 20871:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/services/new-request/new-request.component.scss?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXctcmVxdWVzdC5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 53074:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/services/new-service/new-service.component.scss?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXctc2VydmljZS5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 15923:
/*!************************************************************************************************!*\
  !*** ./src/app/shared/components/services/pick-service/pick-service.component.scss?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = ".headerServiceList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpY2stc2VydmljZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDJDQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQUNKIiwiZmlsZSI6InBpY2stc2VydmljZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXJTZXJ2aWNlTGlzdHtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiKDE4NywgMTg3LCAxODcpO1xuICAgIGZvbnQtc2l6ZTogMTVwdDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBjb2xvcjogYmxhY2s7XG59Il19 */";

/***/ }),

/***/ 11221:
/*!************************************************************************************************!*\
  !*** ./src/app/shared/components/services/service-item/service-item.component.scss?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlLWl0ZW0uY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 61824:
/*!********************************************************************************************!*\
  !*** ./src/app/shared/components/services/solve-task/solve-task.component.scss?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzb2x2ZS10YXNrLmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 62890:
/*!**********************************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/detail-reservation/detail-reservation.component.scss?ngResource ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = ".spaceView {\n  background-size: 120% auto !important;\n  background-position: center;\n  --size: 20vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC1yZXNlcnZhdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFDQUFBO0VBQ0EsMkJBQUE7RUFDQSxZQUFBO0FBQ0oiLCJmaWxlIjoiZGV0YWlsLXJlc2VydmF0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNwYWNlVmlld3tcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEyMCUgYXV0byAhaW1wb3J0YW50O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAtLXNpemU6IDIwdnc7XG59Il19 */";

/***/ }),

/***/ 67613:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/detail-space/detail-space.component.scss?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = ".spaceView {\n  background-size: 120% auto !important;\n  background-position: center;\n  --size: 20vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC1zcGFjZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFDQUFBO0VBQ0EsMkJBQUE7RUFDQSxZQUFBO0FBQ0oiLCJmaWxlIjoiZGV0YWlsLXNwYWNlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNwYWNlVmlld3tcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEyMCUgYXV0byAhaW1wb3J0YW50O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAtLXNpemU6IDIwdnc7XG59Il19 */";

/***/ }),

/***/ 70506:
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/item-reservation/item-reservation.component.scss?ngResource ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpdGVtLXJlc2VydmF0aW9uLmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 99342:
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/item-space/item-space.component.scss?ngResource ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = ".spaceItemList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 13pt;\n  color: black;\n  min-height: 30pt;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIml0ZW0tc3BhY2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwyQ0FBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUFDSiIsImZpbGUiOiJpdGVtLXNwYWNlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNwYWNlSXRlbUxpc3R7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYigxODcsIDE4NywgMTg3KTtcbiAgICBmb250LXNpemU6IDEzcHQ7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIG1pbi1oZWlnaHQ6IDMwcHQ7XG59Il19 */";

/***/ }),

/***/ 59468:
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/new-reservation/new-reservation.component.scss?ngResource ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = ".spaceView {\n  background-size: 120% auto !important;\n  background-position: center;\n  --size: 20vw;\n}\n\n.time_box {\n  border: 2px solid var(--ion-color-secondary);\n  width: 100%;\n  text-align: center;\n  color: black;\n  padding: 4px 8px;\n  font-size: 14px;\n  font-weight: bold;\n  margin: 2px 0;\n  border-radius: 15px;\n}\n\n.time_box.selected {\n  background-color: var(--ion-color-secondary);\n}\n\n.time_box.disabled {\n  background: darkgray !important;\n  border: 0 !important;\n}\n\n.guest_size {\n  font-size: 20pt;\n}\n\n.input_bg {\n  border: 2pt solid var(--ion-color-dark);\n  border-radius: 15pt;\n  padding: 5pt;\n}\n\n.dateStyle {\n  font-size: inherit;\n  float: right;\n}\n\n.noDateStyle {\n  --color: #b4b4b4;\n  color: #b4b4b4;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldy1yZXNlcnZhdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLHFDQUFBO0VBQ0EsMkJBQUE7RUFDQSxZQUFBO0FBQUo7O0FBR0E7RUFDSSw0Q0FBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUdBO0VBQ0ksNENBQUE7QUFBSjs7QUFHQTtFQUNJLCtCQUFBO0VBQ0Esb0JBQUE7QUFBSjs7QUFHQTtFQUNJLGVBQUE7QUFBSjs7QUFHQTtFQUNJLHVDQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBQUo7O0FBR0E7RUFDSSxrQkFBQTtFQUNBLFlBQUE7QUFBSjs7QUFHQTtFQUNJLGdCQUFBO0VBQ0EsY0FBQTtBQUFKIiwiZmlsZSI6Im5ldy1yZXNlcnZhdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLnNwYWNlVmlld3tcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEyMCUgYXV0byAhaW1wb3J0YW50O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAtLXNpemU6IDIwdnc7XG59XG5cbi50aW1lX2JveCB7XG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBtYXJnaW46IDJweCAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG59XG5cbi50aW1lX2JveC5zZWxlY3RlZHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbn1cblxuLnRpbWVfYm94LmRpc2FibGVke1xuICAgIGJhY2tncm91bmQ6IGRhcmtncmF5ICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyOiAwICFpbXBvcnRhbnQ7XG59XG5cbi5ndWVzdF9zaXple1xuICAgIGZvbnQtc2l6ZTogMjBwdDtcbn1cblxuLmlucHV0X2JnIHtcbiAgICBib3JkZXI6IDJwdCBzb2xpZCB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgYm9yZGVyLXJhZGl1czogMTVwdDtcbiAgICBwYWRkaW5nOiA1cHQ7XG4gIH1cblxuLmRhdGVTdHlsZXtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7IFxuICAgIGZsb2F0OiByaWdodDtcbn1cblxuLm5vRGF0ZVN0eWxle1xuICAgIC0tY29sb3I6ICNiNGI0YjQ7XG4gICAgY29sb3I6ICNiNGI0YjQ7XG59Il19 */";

/***/ }),

/***/ 80210:
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/new-space/new-space.component.scss?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXctc3BhY2UuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 62113:
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/pick-rent-space/pick-rent-space.component.scss?ngResource ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = ".headerSpaceList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 15pt;\n  font-weight: bold;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpY2stcmVudC1zcGFjZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDJDQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQUNKIiwiZmlsZSI6InBpY2stcmVudC1zcGFjZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXJTcGFjZUxpc3R7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYigxODcsIDE4NywgMTg3KTtcbiAgICBmb250LXNpemU6IDE1cHQ7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6IGJsYWNrO1xufSJdfQ== */";

/***/ }),

/***/ 20586:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/users/edit-user/edit-user.component.scss?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = ".ripple-parent {\n  position: relative;\n  overflow: hidden;\n}\n\n.profileCircle {\n  --border-radius: 50%;\n  --size: 40pt;\n  position: relative;\n}\n\n.cameraButton {\n  position: absolute;\n  background-color: var(--ion-color-medium);\n  top: 25pt;\n  left: 25pt;\n  width: 20pt;\n  height: 20pt;\n  font-size: 15pt;\n  border-radius: 50%;\n  padding: 2pt;\n}\n\n.uploadingImage {\n  position: absolute;\n  top: 10pt;\n  left: 10pt;\n}\n\n.imageProfile {\n  position: absolute;\n}\n\n.loadingImage {\n  position: absolute;\n  top: 41pt;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQtdXNlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLG9CQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLHlDQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLFNBQUE7QUFDSiIsImZpbGUiOiJlZGl0LXVzZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmlwcGxlLXBhcmVudCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5wcm9maWxlQ2lyY2xle1xuICAgIC0tYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIC0tc2l6ZTogNDBwdDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5jYW1lcmFCdXR0b257XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIHRvcDogMjVwdDtcbiAgICBsZWZ0OiAyNXB0O1xuICAgIHdpZHRoOiAyMHB0O1xuICAgIGhlaWdodDogMjBwdDtcbiAgICBmb250LXNpemU6IDE1cHQ7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHBhZGRpbmc6IDJwdDtcbn1cblxuLnVwbG9hZGluZ0ltYWdle1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDEwcHQ7XG4gICAgbGVmdDogMTBwdDtcbn1cblxuLmltYWdlUHJvZmlsZXtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5sb2FkaW5nSW1hZ2V7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNDFwdDtcbn0iXX0= */";

/***/ }),

/***/ 47853:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/users/item-user/item-user.component.scss?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = ".userItemList {\n  border-bottom: 2px solid rgb(187, 187, 187);\n  font-size: 13pt;\n  color: black;\n  min-height: 30pt;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIml0ZW0tdXNlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDJDQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQUNKIiwiZmlsZSI6Iml0ZW0tdXNlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi51c2VySXRlbUxpc3R7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYigxODcsIDE4NywgMTg3KTtcbiAgICBmb250LXNpemU6IDEzcHQ7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIG1pbi1oZWlnaHQ6IDMwcHQ7XG59Il19 */";

/***/ }),

/***/ 76159:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/users/user-detail/user-detail.component.scss?ngResource ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = ".ripple-parent {\n  position: relative;\n  overflow: hidden;\n}\n\n.profileCircle {\n  --border-radius: 50%;\n  --size: 40pt;\n  position: relative;\n}\n\n.cameraButton {\n  position: absolute;\n  background-color: var(--ion-color-medium);\n  top: 25pt;\n  left: 25pt;\n  width: 20pt;\n  height: 20pt;\n  font-size: 15pt;\n  border-radius: 50%;\n  padding: 2pt;\n}\n\n.uploadingImage {\n  position: absolute;\n  top: 10pt;\n  left: 10pt;\n}\n\n.imageProfile {\n  position: absolute;\n}\n\n.loadingImage {\n  position: absolute;\n  top: 41pt;\n}\n\n.title {\n  font-size: 12pt;\n  color: grey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksb0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EseUNBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtFQUNBLFdBQUE7QUFDSiIsImZpbGUiOiJ1c2VyLWRldGFpbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yaXBwbGUtcGFyZW50IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnByb2ZpbGVDaXJjbGV7XG4gICAgLS1ib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgLS1zaXplOiA0MHB0O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmNhbWVyYUJ1dHRvbntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgdG9wOiAyNXB0O1xuICAgIGxlZnQ6IDI1cHQ7XG4gICAgd2lkdGg6IDIwcHQ7XG4gICAgaGVpZ2h0OiAyMHB0O1xuICAgIGZvbnQtc2l6ZTogMTVwdDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgcGFkZGluZzogMnB0O1xufVxuXG4udXBsb2FkaW5nSW1hZ2V7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMTBwdDtcbiAgICBsZWZ0OiAxMHB0O1xufVxuXG4uaW1hZ2VQcm9maWxle1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLmxvYWRpbmdJbWFnZXtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA0MXB0O1xufVxuXG4udGl0bGV7XG4gICAgZm9udC1zaXplOiAxMnB0O1xuICAgIGNvbG9yOiBncmV5O1xufSJdfQ== */";

/***/ }),

/***/ 70881:
/*!*********************************************************************************************!*\
  !*** ./src/app/shared/components/users/user-profile/user-profile.component.scss?ngResource ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = ".profileCircle {\n  --border-radius: 50%;\n  --size: 40pt ;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItcHJvZmlsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG9CQUFBO0VBQ0EsYUFBQTtBQUNKIiwiZmlsZSI6InVzZXItcHJvZmlsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wcm9maWxlQ2lyY2xle1xuICAgIC0tYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIC0tc2l6ZTogNDBwdFxufSJdfQ== */";

/***/ }),

/***/ 39355:
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/view/big-button/big-button.component.scss?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = ".buttonStyle {\n  border-radius: 7px;\n  --border-radius: 7px;\n  width: 90vw;\n  --width: 90vw;\n  font-size: 20pt;\n  height: 40px;\n  margin: 0 2vw;\n}\n\n.rowStyle {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpZy1idXR0b24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7QUFDSiIsImZpbGUiOiJiaWctYnV0dG9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ1dHRvblN0eWxle1xuICAgIGJvcmRlci1yYWRpdXM6IDdweDtcbiAgICAtLWJvcmRlci1yYWRpdXM6IDdweDtcbiAgICB3aWR0aDogOTB2dztcbiAgICAtLXdpZHRoOiA5MHZ3O1xuICAgIGZvbnQtc2l6ZTogMjBwdDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgbWFyZ2luOiAwIDJ2dztcbn1cblxuLnJvd1N0eWxle1xuICAgIHdpZHRoOiAxMDAlO1xufSJdfQ== */";

/***/ }),

/***/ 84318:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/view/detail-header/detail-header.component.scss?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZXRhaWwtaGVhZGVyLmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 71936:
/*!********************************************************************************************!*\
  !*** ./src/app/shared/components/view/image-loader/image-loader.component.scss?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = ".rect-img-container {\n  position: relative;\n}\n\n.rect-img-container::after {\n  content: \"\";\n  display: block;\n  padding-bottom: 100%;\n}\n\n.rect-img {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 7px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLWxvYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0FBQ0o7O0FBRUU7RUFDRSxXQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0FBQ0o7O0FBRUU7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUNKIiwiZmlsZSI6ImltYWdlLWxvYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZWN0LWltZy1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuICBcbiAgLnJlY3QtaW1nLWNvbnRhaW5lcjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcGFkZGluZy1ib3R0b206IDEwMCU7XG4gIH1cbiAgXG4gIC5yZWN0LWltZyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBib3JkZXItcmFkaXVzOiA3cHg7XG4gIH0iXX0= */";

/***/ }),

/***/ 20473:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/view/image-preview/image-preview.component.scss?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbWFnZS1wcmV2aWV3LmNvbXBvbmVudC5zY3NzIn0= */";

/***/ }),

/***/ 1594:
/*!********************************************************************************************!*\
  !*** ./src/app/shared/components/view/loading-view/loading-view.component.scss?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2FkaW5nLXZpZXcuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 92450:
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/view/main-header/main-header.component.scss?ngResource ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWluLWhlYWRlci5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 39314:
/*!************************************************************************************************************!*\
  !*** ./src/app/shared/components/view/not-data-yet-message/not-data-yet-message.component.scss?ngResource ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJub3QtZGF0YS15ZXQtbWVzc2FnZS5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 65974:
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/view/notice-bottom-bar/notice-bottom-bar.component.scss?ngResource ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJub3RpY2UtYm90dG9tLWJhci5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 1666:
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/view/sign-modal/sign-modal.component.scss?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = ".selector-title {\n  font-size: 22pt;\n}\n\ncanvas {\n  border: 1px solid #B7B7B7;\n}\n\n.body {\n  text-align: center;\n}\n\n.body ion-button {\n  width: 148.35pt;\n  height: 38.51pt;\n  border-radius: 8pt;\n}\n\n.body ion-text {\n  font-size: 20pt;\n}\n\n.separator {\n  margin: 30px 0px 30px 0px;\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) {\n  .selector-title {\n    font-size: 22px;\n  }\n  canvas {\n    border: 1px solid #B7B7B7;\n  }\n  .body {\n    text-align: center;\n  }\n  .body ion-button {\n    width: 148.35px;\n    height: 38.51px;\n    border-radius: 8px;\n  }\n  .body ion-text {\n    font-size: 20px;\n  }\n  .separator {\n    margin: 30px 0px 30px 0px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ24tbW9kYWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWUE7RUFYSSxlQUFBO0FBQ0o7O0FBY0E7RUFDSSx5QkFBQTtBQVhKOztBQWVBO0VBQ0ksa0JBQUE7QUFaSjs7QUFhSTtFQUNJLGVBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFYUjs7QUFhSTtFQW5CQSxlQUFBO0FBU0o7O0FBZUE7RUFDSSx5QkFBQTtBQVpKOztBQWVBO0VBZ0JJO0lBWEksZUFBQTtFQWZOO0VBOEJFO0lBQ0kseUJBQUE7RUE1Qk47RUErQkU7SUFDSSxrQkFBQTtFQTdCTjtFQThCTTtJQUNJLGVBQUE7SUFDQSxlQUFBO0lBQ0Esa0JBQUE7RUE1QlY7RUE4Qk07SUFsQkEsZUFBQTtFQVROO0VBZ0NFO0lBQ0kseUJBQUE7RUE5Qk47QUFDRiIsImZpbGUiOiJzaWduLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQG1peGluIGZ6LTIyIHtcbiAgICBmb250LXNpemU6IDIycHQ7XG59XG5cbkBtaXhpbiBmei0xOCB7XG4gICAgZm9udC1zaXplOiAxOHB0O1xufVxuXG5AbWl4aW4gZnotMjAge1xuICAgIGZvbnQtc2l6ZTogMjBwdDtcbn1cblxuLnNlbGVjdG9yLXRpdGxlIHtcbiAgICBAaW5jbHVkZSBmei0yMlxufVxuXG5jYW52YXMge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNCN0I3Qjc7IFxufVxuXG5cbi5ib2R5IHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgaW9uLWJ1dHRvbiB7XG4gICAgICAgIHdpZHRoOiAxNDguMzVwdDtcbiAgICAgICAgaGVpZ2h0OiAzOC41MXB0O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHQ7XG4gICAgfVxuICAgIGlvbi10ZXh0IHtcbiAgICAgICAgQGluY2x1ZGUgZnotMjA7XG4gICAgfVxufVxuXG4uc2VwYXJhdG9yIHtcbiAgICBtYXJnaW46IDMwcHggMHB4IDMwcHggMHB4O1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW5cbiAgYW5kIChtaW4tZGV2aWNlLXdpZHRoOiAzMjBweClcbiAgYW5kIChtYXgtZGV2aWNlLXdpZHRoOiA3NjdweClcbiAgYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpICB7XG4gICAgQG1peGluIGZ6LTIyIHtcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgIH1cbiAgICBcbiAgICBAbWl4aW4gZnotMTgge1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgfVxuICAgIFxuICAgIEBtaXhpbiBmei0yMCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICB9XG4gICAgXG4gICAgLnNlbGVjdG9yLXRpdGxlIHtcbiAgICAgICAgQGluY2x1ZGUgZnotMjJcbiAgICB9XG4gICAgXG4gICAgY2FudmFzIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI0I3QjdCNzsgXG4gICAgfVxuXG4gICAgLmJvZHkge1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAgICAgd2lkdGg6IDE0OC4zNXB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAzOC41MXB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICB9XG4gICAgICAgIGlvbi10ZXh0IHtcbiAgICAgICAgICAgIEBpbmNsdWRlIGZ6LTIwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLnNlcGFyYXRvciB7XG4gICAgICAgIG1hcmdpbjogMzBweCAwcHggMzBweCAwcHg7XG4gICAgfVxuICB9XG4iXX0= */";

/***/ }),

/***/ 4448:
/*!************************************************************************************************!*\
  !*** ./src/app/shared/components/view/status-request/status-request.component.scss?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdGF0dXMtcmVxdWVzdC5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 96152:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/assign-space/assign-space.component.html?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button color=\"primary\" *ngIf=\"!edit && !alreadyLease\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Atrás\n      </ion-button>\n      <ion-button color=\"danger\" *ngIf=\"edit || alreadyLease\" [disabled]=\"loading\" (click)=\"editSpaces()\">\n        Cancelar\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">Espacios de {{userData ? userData.name +' '+ userData.lastName:'Nuevo Usuario'}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"edit && !loading\" color=\"success\" (click)=\"sendData()\" \n        [disabled]=\"loading || selectedSpace?.monthlyCost === 0\">\n          Enviar\n      </ion-button>\n      <ion-button *ngIf=\"!edit && !loading\" color=\"dark\" (click)=\"editSpaces()\">\n          Editar/Agregar\n      </ion-button>\n      <ion-button color=\"light\" *ngIf=\"loading\">\n        <ion-spinner name=\"lines-small\"></ion-spinner>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-thumbnail slot=\"start\" class=\"profileCircle\">\n        <img class=\"imageProfile\" src=\"{{userData?.photo ? userData?.photo : defaultUser}}\">\n      </ion-thumbnail>\n      <ion-label class=\"ion-text-wrap\">\n        <ion-text color=\"dark\">\n          <ion-card-title>{{userData ? userData.name + ' ' + userData.lastName : 'Cargando'}} <ion-spinner *ngIf=\"!userData\" name=\"dots\"></ion-spinner></ion-card-title>\n        </ion-text>\n        <p>{{userData?.email ? userData.email : '_'}}</p>\n        <ion-text color=\"primary\">\n          <p class=\"ion-text-capitalize\">Tipo: {{userData?.type ? userData.type : '_'}}</p>\n        </ion-text>\n      </ion-label>\n    </ion-item>\n    <ion-item *ngIf=\"edit\">\n      <ion-label>Espacio: </ion-label>\n      <ion-select ngModel placeholder=\"Selecione el espacio a asignar\"\n        (ionChange)=\"newSpace($event)\" ngDefaultControl>\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let space of spacesList\" value=\"{{space.uid}}\">\n          {{space.type}} {{space.unitNumber}}\n        </ion-select-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n\n  <ion-grid *ngIf=\"selectedSpace\">\n    <ion-card>\n      <ion-row>\n        <ion-col size=\"3\">\n          <ion-thumbnail class=\"spaceView\">\n            <ion-img [src]=\"selectedSpace.spaceLease.photo ? selectedSpace.spaceLease.photo : defaultSpace\"></ion-img>\n          </ion-thumbnail>\n        </ion-col>\n        <ion-col size=\"9\">\n          <ion-item>\n            <ion-label>\n              <ion-text class=\"ion-text-capitalize\">\n                <h2>{{selectedSpace.spaceLease.type}} {{selectedSpace.spaceLease.unitNumber}} </h2>\n                <h3>Piso: {{selectedSpace.spaceLease.floor}}</h3>\n              </ion-text>\n            </ion-label>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n    <ion-item>\n      <ion-label>Costo Mensual:</ion-label>\n      <ion-input class=\"ion-text-center\" type=\"number\" placeholder=\"(opcional)\" [value]=\"selectedSpace.monthlyCost\" (ionChange)=\"costListener($event)\"></ion-input>\n    </ion-item>\n    <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"selectedSpace?.monthlyCost === 0\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Agregue el valor de Alicuota\n    </ion-text>\n    <ion-item (click)=\"showCalendar1()\">\n      <ion-label>Contrato Inicio: </ion-label>\n      <ion-label class=\"ion-text-center\"> \n        <ion-text *ngIf=\"selectedSpace.leaseStart\" style=\"font-size: inherit; float: inherit;\">{{selectedSpace.leaseStart | timeFormat: 'DD/MM/YYYY'}}</ion-text>\n        <ion-text *ngIf=\"!selectedSpace.leaseStart\" style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit; float: right;\">(Selección fecha)</ion-text>\n      </ion-label>\n      <ion-button class=\"downArrow\" slot=\"end\" size=\"small\"><ion-icon style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit;\" name=\"caret-down-outline\"></ion-icon></ion-button>\n    </ion-item>\n    <ion-row *ngIf=\"showCalendar\">\n      <ion-col>\n        <ion-item>\n          <ion-datetime #datetime style=\"margin: 0 auto;\" (ionChange)=\"changeLeaseStartTime(datetime.value)\" presentation=\"date\" \n                [(ngModel)]=\"selectedSpace.leaseStart\" ngDefaultControl>\n            <ion-buttons slot=\"buttons\">\n              <ion-button color=\"danger\" (click)=\"showCalendar1()\">Cancelar</ion-button>\n              <ion-button color=\"success\" (click)=\"datetime.confirm()\">OK</ion-button>\n            </ion-buttons>\n          </ion-datetime>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  \n    \n  <app-not-data-yet-message \n  *ngIf=\"(!userData.leases || userData.leases?.length === 0) && !loading && !edit && !selectedSpace\"\n  text=\"No tiene espacios asignados aún\" icon=\"alert-circle-outline\"\n  ></app-not-data-yet-message>\n  \n  <div *ngIf=\"userData.leases?.length > 0 && !edit && !selectedSpace\">\n    <ion-list-header>\n      <ion-label>Espacios Asignados:</ion-label>\n    </ion-list-header>\n    <app-item-space *ngFor=\"let space of userData.leases\" [space]=\"space.spaceLease\" [profileView]=\"true\" (click)=\"selectSpace(space)\">\n    </app-item-space>\n  </div>\n</ion-content>\n<ion-footer *ngIf=\"alreadyLease\">\n  <ion-toolbar>\n    <ion-button color=\"danger\" expand=\"full\" (click)=\"closeLease()\">Terminar Asignación</ion-button>\n  </ion-toolbar>\n</ion-footer>";

/***/ }),

/***/ 67812:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/bills/new-receipt/new-receipt.component.html?ngResource ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button color=\"primary\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Atrás\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">RECIBO </ion-title>\n    <ion-buttons slot=\"end\" *ngIf=\"currentUser.type === 'administrador'\">\n      <ion-button color=\"success\" [disabled]=\"loading\" *ngIf=\"receipt.status !== 'Pagado'\" (click)=\"payReceipt()\">\n          Cobrar\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <app-receipt-detail *ngIf=\"receipt\" [currentReceipt]=\"receipt\"></app-receipt-detail>\n  <ion-row class=\"ion-text-center\" *ngIf=\"receipt.status == 'Pendiente'\">\n    Usted puede hacer transferencias con los siguientes datos:\n  </ion-row>\n  <ion-row *ngIf=\"receipt.status == 'Pendiente'\">\n    <ion-col size=\"2\"></ion-col>\n    <ion-col class=\"ion-text-center\">\n      <ion-text color=\"tertiary\">\n        <h4>EDIFICIO ATHOS</h4>\n        <p>Telf:0999634198</p>\n      </ion-text>\n    </ion-col>\n    <ion-col class=\"ion-text-center\">\n      <ion-text color=\"dark\">\n        <h4>RUC:1791430751001</h4>\n        <p>Email:athosedificio@gmail.com</p>\n      </ion-text>\n    </ion-col>\n    <ion-col size=\"2\"></ion-col>\n  </ion-row>\n</ion-content>";

/***/ }),

/***/ 5867:
/*!*************************************************************************************************!*\
  !*** ./src/app/shared/components/bills/receipt-detail/receipt-detail.component.html?ngResource ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = "\n  <ion-grid class=\"ion-margin ion-padding billBorder\">\n    <ion-row>\n      <ion-col size=\"3\" class=\"ion-margin-start\">\n        <ion-img src=\"../../../../../assets/Athos.png\"></ion-img>\n      </ion-col>\n      <ion-col size=\"8\" class=\"ion-text-center\">\n        <h1>EDIFICIO ATHOS</h1>\n        <h4>Av. República de El Salvador N35-40 y Portugal</h4>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col size=\"4\" class=\"squareBorder ion-text-center\">\n        R.U.C 1791430751001\n      </ion-col>\n      <ion-col size=\"7\" class=\"ion-margin-start ion-text-center\">\n        <h4>Quito - Ecuador</h4>\n      </ion-col>\n    </ion-row>\n\n    <ion-row class=\"ion-margin-top\" *ngIf=\"currentReceipt.status === 'Pagado'\">\n      <ion-col class=\"ion-text-center\">\n        <h3><ion-text color=\"success\">PAGADO</ion-text></h3>\n      </ion-col>\n    </ion-row>\n    <ion-row class=\"ion-margin-top\">\n      <ion-col size=\"7\" class=\"squareBorder\">\n        <ion-text color=\"medium\">Residente:</ion-text> {{currentReceipt?.userName}}\n      </ion-col>\n      <ion-col size=\"4\" class=\"ion-margin-start squareBorder ion-text-center\">\n        RECIBO DE COBRO\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col size=\"7\" class=\"itemBorder\">\n        <ion-text color=\"medium\">ID/R:U:C:</ion-text> No.    {{currentReceipt?.userCI}}\n      </ion-col>\n      <ion-col size=\"4\" class=\"ion-margin-start itemBorder ion-text-center\" style=\"border-bottom: 2px solid black;\">\n        <ion-text color=\"danger\" class=\"ion-text-capitalize\">Nro    {{fixNumber(currentReceipt?.receiptNumber)}}</ion-text>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col size=\"7\" class=\"squareBorder\">\n        <ion-row>\n          <ion-col>\n            <ion-text color=\"medium\">DIRECCIÓN:</ion-text> {{currentReceipt?.address}}\n          </ion-col>\n          <ion-col size=\"5\">\n            <ion-text color=\"medium\">TELEFONO:</ion-text> 0987654321\n          </ion-col>\n        </ion-row>\n      </ion-col>\n      <ion-col size=\"4\" class=\"ion-margin-start ion-margin-top\">\n        <ion-row>\n          <ion-col class=\"ion-text-center squareBorder\">\n            <p><ion-text color=\"dark\">Fecha:</ion-text></p>\n            <p><ion-text color=\"dark\">{{displayDate}}</ion-text></p>\n            <p><ion-text color=\"dark\"><ion-text color=\"medium\">DÍA/MES/AÑO </ion-text></ion-text></p>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n\n    <ion-row class=\"ion-margin-top\">\n      <ion-col size=\"7\" class=\"squareBorder ion-text-center\">\n        <h4>CONCEPTO</h4>\n      </ion-col>\n      <ion-col size=\"2\" class=\"itemMidBorder ion-text-center\">\n        <h4>V. UNITARIO</h4>\n      </ion-col>\n      <ion-col size=\"3\" class=\"squareBorder ion-text-center\">\n        <h4>SUBTOTAL</h4>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngFor=\"let item of currentReceipt?.itemDetail\">\n      <ion-col size=\"7\" class=\"itemBorder ion-text-center\">\n        {{item.itemDescription}}\n      </ion-col>\n      <ion-col size=\"2\" class=\" ion-text-center\">\n        {{item.unitValue}}\n      </ion-col>\n      <ion-col size=\"3\" class=\"itemBorder ion-text-center\">\n        {{item.totalValue}}\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col size=\"7\" class=\"ion-text-center\" style=\"border-top: 2px solid black;\">\n      </ion-col>\n      <ion-col size=\"2\" class=\"squareBorder ion-text-center\">\n        TOTAL USD.\n      </ion-col>\n      <ion-col size=\"3\" class=\"totalBorder ion-text-center\">\n        {{currentReceipt?.total}}$\n      </ion-col>\n    </ion-row>\n\n    <ion-row class=\"ion-margin-top\">\n      <ion-text color=\"medium\">Son: </ion-text> {{totalDescription}}\n    </ion-row>\n\n    <ion-row class=\"ion-margin-top\">\n      <ion-col size=\"1\"></ion-col>\n      <ion-col size=\"4\" class=\"ion-text-center\">\n        <ion-img class=\"signSize signatureBorder\" src=\"../../../../../assets/FirmaAdmin.png\"></ion-img> \n        <ion-label class=\"\">FIRMA AUTORIZADA</ion-label>\n      </ion-col>\n      <ion-col size=\"2\"></ion-col>\n      <ion-col size=\"4\" class=\"ion-text-center\">\n        <div class=\"signSize signatureBorder\" *ngIf=\"!currentReceipt.userSignature\"></div>\n        <ion-img class=\"signSize signatureBorder\" *ngIf=\"currentReceipt.userSignature\" [src]=\"currentReceipt.userSignature\"></ion-img> \n        <ion-label>{{currentReceipt.payerName? currentReceipt.payerName :'RECIBI CONFORME'}}</ion-label>\n      </ion-col>\n      <ion-col size=\"1\"></ion-col>\n    </ion-row>\n\n  </ion-grid>";

/***/ }),

/***/ 10386:
/*!*********************************************************************************************!*\
  !*** ./src/app/shared/components/bills/receipt-item/receipt-item.component.html?ngResource ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-row class=\"userItemList\">\n  <ion-col size=\"4\" class=\"ion-text-center ion-text-capitalize\">{{receipt.userName}}</ion-col>\n  <ion-col size=\"1\" class=\"ion-text-center ion-text-capitalize\">{{receipt.itemDetail.length}} </ion-col>\n  <ion-col size=\"3\" class=\"ion-text-center\">{{receipt.total.toFixed(2)}}$</ion-col>\n  <ion-col size=\"4\" class=\"ion-text-center ion-text-capitalize\">\n    <ion-text color=\"success\" *ngIf=\"receipt.status === 'Pagado'\">Pagado</ion-text>\n    <ion-text color=\"medium\" *ngIf=\"receipt.status === 'Pendiente'\">Pendiente</ion-text>\n    <ion-icon class=\"ion-float-right\" name=\"chevron-forward-outline\"></ion-icon>\n  </ion-col>\n</ion-row>";

/***/ }),

/***/ 5418:
/*!******************************************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/calendar-service-item/calendar-service-item.component.html?ngResource ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-item detail>\n  <ion-thumbnail slot=\"start\">\n    <img [src]=\"item.service.photo\">\n  </ion-thumbnail>\n  <ion-label class=\"ion-text-wrap\">\n    <ion-text color=\"dark\">\n      <h2 class=\"ion-text-capitalize\"> {{item.service.name}} ({{item.service.unitNumber}}) </h2>\n    </ion-text>\n    <app-status-request [status]=\"item.status\"></app-status-request>\n  </ion-label>\n  <ion-note slot=\"end\" style=\"width: 27vw;\">\n    <ion-text color=\"medium\" class=\"ion-text-capitalize\" style=\"font-size: 11pt;\">\n      <!-- <ion-text color=\"tertiary\" *ngIf=\"item.employeeUID === currentUser.uid\">Designado</ion-text> -->\n      <ion-text color=\"dark\"><p *ngIf=\"item.scheduleDate\">{{item.scheduleDate | timeFormat: 'fullDateUTC'}} <ion-icon size=\"small\" color=\"tertiary\" name=\"calendar-number-outline\"></ion-icon></p></ion-text>\n      <p *ngIf=\"!item.scheduleDate && item.createdAt \">{{item.createdAt | timeFormat: 'shortDateUTC'}} <ion-icon size=\"small\" color=\"secondary\" name=\"paper-plane-outline\"></ion-icon></p>\n    </ion-text>\n  </ion-note>\n</ion-item>";

/***/ }),

/***/ 37650:
/*!****************************************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/reservation-calendar/reservation-calendar.component.html?ngResource ***!
  \****************************************************************************************************************/
/***/ ((module) => {

module.exports = "<p>\n  reservation-calendar works!\n</p>\n";

/***/ }),

/***/ 44802:
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/reservation-item/reservation-item.component.html?ngResource ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = "<p>Hello</p>";

/***/ }),

/***/ 39801:
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/calendar/service-calendar/service-calendar.component.html?ngResource ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = "<p>\n  service-calendar works!\n</p>\n";

/***/ }),

/***/ 49578:
/*!***********************************************************************************!*\
  !*** ./src/app/shared/components/new-notice/new-notice.component.html?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button *ngIf=\"!notice\" color=\"danger\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Cancelar\n      </ion-button>\n      <ion-button *ngIf=\"editNoticeForm\" color=\"danger\" [disabled]=\"loading\" (click)=\"editNotice()\">\n        Cancelar\n      </ion-button>\n      <ion-button *ngIf=\"notice && !editNoticeForm\" color=\"primary\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Atrás\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">{{notice ? notice.type.name: 'Nuevo Anuncio'}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"!notice || editNoticeForm\" color=\"success\" (click)=\"createNotice()\" \n        [disabled]=\"loading && (!newImage && myNotice.photo)\">\n          Enviar\n      </ion-button>\n      <ion-button *ngIf=\"notice && !editNoticeForm && (user.uid === notice.writer?.uid)\" color=\"dark\" (click)=\"editNotice()\">\n          Editar\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\"  *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<ion-content *ngIf=\"!loading && notice && !editNoticeForm\" fullscreen  #ionScroll [scrollEvents]=\"true\" (ionScroll)=\"checkScroll($event, ionScroll)\">\n  <ion-card>\n    <img *ngIf=\"notice.photo\" [src]=\"notice.photo\" />\n    <ion-card-header>\n      <ion-card-subtitle>\n        Por: {{notice.writer?.name}}\n      </ion-card-subtitle>\n      <ion-card-title>Título: {{notice.title}}</ion-card-title>\n    </ion-card-header>\n    <ion-card-content>\n      {{notice.description}}\n    </ion-card-content>\n    <ion-footer>\n      <app-notice-bottom-bar [likes]=\"notice.likes.length\" [comments]=\"notice.comments.length\" [notice]=\"notice\" [userUID]=\"user.uid\"></app-notice-bottom-bar>\n    </ion-footer>\n  </ion-card>\n  <ion-list *ngIf=\"this.notice.comments.length > 0\">\n    <div *ngFor=\"let comment of this.notice.comments\">\n      <ion-item>\n        <ion-avatar slot=\"start\"><img src=\"{{comment.user.photo ? comment.user.photo : defaultUser}}\"></ion-avatar>\n        <ion-labe>\n          <h4>{{comment.user.name}}</h4>\n          <p>{{comment.text}}</p>\n        </ion-labe>\n      </ion-item>\n      <ion-row *ngIf=\"comment.photo\">\n        <img [src]=\"comment.photo\">\n      </ion-row>\n    </div>\n  </ion-list>\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" style=\"bottom: 50px; right: 20px;\" *ngIf=\"showScroll > 400\">\n    <ion-fab-button color=\"light\" size=\"small\" (click)=\"scrollDown()\" close-icon=\"close-outline\">\n      <ion-icon name=\"chevron-down-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>\n<ion-footer *ngIf=\"!loading && notice && !editNoticeForm\">\n  <ion-toolbar>\n    <ion-row class=\"inputMargin\" *ngIf=\"!loading\">\n      <ion-col size=\"11\">\n        <ion-textarea style=\"background-color: white; color:black; border-radius: 7pt;\" rows=\"1\" [disabled]=\"sending\" [value]=\"newComment.text\" (ionChange)=\"commentListener($event)\"></ion-textarea>\n      </ion-col>\n      <ion-col size=\"1\" class=\"rightButtonContainer\"> \n        <ion-icon *ngIf=\"!sending\" color=\"dark\" name=\"arrow-up-circle\" class=\"rightButton\" (click)=\"pressSend()\"></ion-icon>\n        <ion-icon *ngIf=\"sending\" color=\"tertiary\" name=\"arrow-up-circle\" class=\"rightButton\"></ion-icon>\n      </ion-col>\n      <div>\n      </div>\n    </ion-row>\n  </ion-toolbar>\n</ion-footer>\n\n<ion-content class=\"ion-padding\" *ngIf=\"!loading && (!notice || editNoticeForm)\">\n  <ion-card>\n    <img *ngIf=\"!newImage && notice\" src=\"{{myNotice.photo}}\" (click)=\"addPhoto()\">\n    <img *ngIf=\"newImage\" src=\"{{newImage.webPath}}\" (click)=\"addPhoto()\">\n    <ion-list>\n      <ion-item *ngIf=\"!newImage && !notice\" (click)=\"addPhoto()\">\n        <ion-label>Agregue una imagen:</ion-label>\n        <ion-button color=\"secondary\"><ion-icon name=\"camera-outline\" color=\"light\"></ion-icon></ion-button>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon slot=\"start\" *ngIf=\"myNotice.type\" color=\"tertiary\" size=\"large\" [name]=\"myNotice.type.icon\"></ion-icon>\n        <ion-label position=\"stacked\">Tipo:</ion-label>\n        <ion-select mode='ios' [value]=\"noticeType\" (ionChange)=\"handleType($event)\">\n          <ion-select-option *ngFor=\"let type of typeList\" [value]=\"type.name\"> {{type.name}}</ion-select-option>\n        </ion-select>\n      </ion-item>\n      <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"!noticeType\"> \n        <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Seleccione un tipo de anuncio\n      </ion-text>\n\n      <ion-item>\n        <ion-label position=\"stacked\">Título:</ion-label>\n        <ion-input type=\"text\" [value]=\"myNotice.title\" (ionChange)=\"titleListener($event)\"></ion-input>\n      </ion-item>\n      <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"myNotice?.title.length === 0 || !myNotice?.title\"> \n        <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>\n        Ingresa el título de este anuncio\n      </ion-text>\n      \n      <ion-item>\n        <ion-label position=\"stacked\">Contenido:</ion-label>\n        <ion-textarea rows=\"10\" placeholder=\"Ingrese el contenido de tu anuncio aquí...\" [value]=\"myNotice.description\" (ionChange)=\"descriptionListener($event)\"></ion-textarea>\n      </ion-item>\n      <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"myNotice?.description.length === 0 || !myNotice?.description\"> \n        <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>\n        Ingresa el contenido de este anuncio\n      </ion-text>\n    </ion-list>\n  </ion-card>\n</ion-content>";

/***/ }),

/***/ 44125:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/services/assign-task/assign-task.component.html?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-card class=\"ion-padding\">\n  \n    <ion-list>\n    <ion-item lines=\"none\">\n      <ion-label>Asignación de Tarea:</ion-label>\n      <ion-button size=\"small\" slot=\"end\" [disabled]=\"\" color=\"success\" [disabled]=\"loading || !myTask?.scheduleDate || !timeSlotStart?.date\" (click)=\"confirmService()\">\n          Enviar\n      </ion-button>\n    </ion-item>\n    <ion-item>\n      <ion-label>\n        <h2>Días Preferidos por cliente:  \n          {{request.service.preferredDays[0]?'Domingo. ':''}}\n          {{request.service.preferredDays[1]?'Lunes. ':''}}\n          {{request.service.preferredDays[2]?'Martes. ':''}}\n          {{request.service.preferredDays[3]?'Miercoles. ':''}}\n          {{request.service.preferredDays[4]?'Jueves. ':''}}\n          {{request.service.preferredDays[5]?'Viernes. ':''}}\n          {{request.service.preferredDays[6]?'Sábado. ':''}}\n        </h2>\n      </ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>Empleado Asignado:</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"selectedUserUID\" (ionChange)=\"userChange($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let user of staffList\" [value]=\"user.uid\">{{user.name}} {{user.lastName}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n  \n    <ion-item (click)=\"showCalendar1()\" *ngIf=\"!showCalendar\">\n      <ion-label>Fecha de Servicio: </ion-label>\n      <ion-label> \n        <ion-text *ngIf=\"myTask?.scheduleDate\" class=\"dateStyle\">\n          {{myTask?.scheduleDate | timeFormat: 'DD/MM/YYYY'}}\n        </ion-text>\n        <ion-text *ngIf=\"!myTask?.scheduleDate\" class=\"dateStyle noDateStyle\">\n          (Seleccióne la fecha)\n        </ion-text>\n      </ion-label>\n      <ion-button class=\"downArrow\" slot=\"end\" size=\"small\">\n        <ion-icon style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit;\" name=\"caret-down-outline\"></ion-icon>\n      </ion-button>\n    </ion-item>\n    <ion-row *ngIf=\"showCalendar\">\n      <ion-col>\n        <ion-label>Fecha de Evento: </ion-label>\n        <ion-datetime #datetime style=\"margin: 0 auto;\" [isDateEnabled]=\"availableDays\" min=\"{{minDate}}\" presentation=\"date\" \n              [(ngModel)]=\"myTask.scheduleDate\" (ionChange)=\"changeScheduleTime(datetime.value)\">\n          <ion-buttons slot=\"buttons\">\n            <ion-button color=\"danger\" (click)=\"showCalendar1()\">Cancelar</ion-button>\n            <ion-button color=\"success\" (click)=\"datetime.confirm()\">OK</ion-button>\n          </ion-buttons>\n        </ion-datetime>\n      </ion-col>\n    </ion-row>\n\n\n    <ion-grid *ngIf=\"myTask?.scheduleDate\">\n      <ion-row class=\"ion-align-items-center\">\n        <ion-col>\n          <p class=\"ion-no-margin ion-text-center\">{{!timeSlotStart.date?'Seleccione tiempo':'Hora de Reserva'}}</p>\n        </ion-col>\n      </ion-row>\n      <ion-row class=\"ion-align-items-center\" *ngIf=\"timeSlotStart.date\">\n        <ion-col class=\"ion-no-margin ion-text-center\">\n          <p class=\"ion-no-margin item_text ion-text-center ion-text-capitalize\">{{timeSlotStart.date | timeFormat: 'displayDateUTC'}}</p>\n          <p class=\"ion-no-margin item_text ion-text-center ion-text-capitalize\">{{timeSlotStart.hour}} - {{timeSlotEnd.hour}}</p>\n        </ion-col>\n      </ion-row>\n\n      <ion-row class=\"ion-align-items-center\">\n        <ion-col>\n          <p class=\"ion-no-margin item_text required ion-text-center\" position=\"stacked\">Disponibilidad:</p>\n        </ion-col>\n      </ion-row>\n      <ion-row class=\"ion-align-items-center\" *ngIf=\"scheduleTimes?.length === 1\">\n        <ion-col *ngFor=\"let timeSlot of scheduleTimes; index as i\">\n          <div class=\"time_box {{timeSlot.disabled?'disabled':(timeSlot.selected?'selected':'')}}\"\n          (click)=\"timeSlotClicked(i,timeSlot)\"\n          >{{timeSlot.time}}</div>\n        </ion-col>\n      </ion-row>\n      <ion-row class=\"ion-align-items-center\" *ngIf=\"scheduleTimes?.length > 1\">\n        <ion-col size=\"6\" *ngFor=\"let timeSlot of scheduleTimes; index as i\">\n          <div class=\"time_box {{timeSlot.disabled?'disabled':(timeSlot.selected?'selected':'')}}\"\n          (click)=\"timeSlotClicked(i,timeSlot)\"\n          >{{timeSlot.time}}</div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n</ion-card>";

/***/ }),

/***/ 45778:
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/services/detail-request/detail-request.component.html?ngResource ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-card>\n  <ion-row>\n    <ion-col size=\"3\">\n      <ion-img [src]=\"request.service.photo ? request.service.photo : defaultSpace\"></ion-img>\n    </ion-col>\n    <ion-col size=\"9\">\n      <ion-item>\n        <ion-label>\n          <ion-text class=\"ion-text-capitalize\">\n            <h2>{{request.service.name}}</h2>\n            <h3>Ubicación: {{request.service.unitNumber}}</h3>\n            <h3><app-status-request [status]=\"request.status\"></app-status-request></h3>\n          </ion-text>\n        </ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n</ion-card>\n<ion-list>\n  <ion-list-header>\n    <ion-label>Información:</ion-label>\n  </ion-list-header>\n  <ion-item>\n    <ion-thumbnail slot=\"start\">\n      <ion-icon size=\"large\" name=\"calendar-number-outline\"></ion-icon>\n    </ion-thumbnail>\n    <ion-label>\n      <app-status-request [status]=\"request.status\"></app-status-request>\n    </ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-thumbnail slot=\"start\">\n      <ion-icon size=\"large\" name=\"calendar-outline\"></ion-icon>\n    </ion-thumbnail>\n    <ion-label>\n      <h2>Días Preferidos:  \n        {{request.service.preferredDays[0]?'Dom. ':''}}\n        {{request.service.preferredDays[1]?'Lun. ':''}}\n        {{request.service.preferredDays[2]?'Mar. ':''}}\n        {{request.service.preferredDays[3]?'Mie. ':''}}\n        {{request.service.preferredDays[4]?'Jue. ':''}}\n        {{request.service.preferredDays[5]?'Vie. ':''}}\n        {{request.service.preferredDays[6]?'Sab. ':''}}\n      </h2>\n    </ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-thumbnail slot=\"start\">\n      <ion-icon size=\"large\" name=\"bookmark-outline\"></ion-icon>\n    </ion-thumbnail>\n    <ion-label class=\"ion-text-capitalize\">\n      <p class=\"textoDisplay\">Fecha de {{request.scheduleDate?'Servicio':'Solicitud'}}: </p>\n      <p class=\"textoDisplay\">\n      <ion-text *ngIf=\"request.scheduleDate\">{{request.scheduleDate | timeFormat: 'displayDateUTC'}}</ion-text>\n      <ion-text *ngIf=\"!request.scheduleDate && request.createdAt\">{{request.createdAt | timeFormat: 'displayDateUTC'}}</ion-text>\n      </p>\n    </ion-label>\n  </ion-item>\n  <ion-item *ngIf=\"request.startDate\">\n    <ion-thumbnail slot=\"start\">\n      <ion-icon size=\"large\" name=\"time-outline\"></ion-icon>\n    </ion-thumbnail>\n    <ion-label>\n      Hora de Servicio: {{request.startDate | timeFormat: 'TimeUTC'}}\n    </ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-thumbnail slot=\"start\">\n      <ion-icon size=\"large\" name=\"time\"></ion-icon>\n    </ion-thumbnail>\n    <ion-label>\n      Tiempo Estimado: {{request.service.estimatedTime}} Minutos\n    </ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-thumbnail slot=\"start\">\n      <ion-icon size=\"large\" name=\"cash-outline\"></ion-icon>\n    </ion-thumbnail>\n    <ion-label>\n      Costo: {{request.service.cost?request.service.cost+'$':'Gratis'}}\n    </ion-label>\n  </ion-item>\n  <div *ngIf=\"request.notes\">\n    <ion-item>\n      <ion-thumbnail slot=\"start\">\n        <ion-icon size=\"large\" name=\"clipboard-outline\"></ion-icon>\n      </ion-thumbnail>\n      <ion-label>\n        Notas:\n      </ion-label>\n    </ion-item>\n    <ion-item *ngFor=\"let note of request.notes\">\n      <ion-thumbnail slot=\"start\" *ngIf=\"note.photo\">\n        <ion-img [src]=\"note.photo\"></ion-img>\n      </ion-thumbnail>\n      <ion-label>\n        {{note.text}}\n      </ion-label>\n    </ion-item>\n  </div>\n  <ion-item>\n    <ion-label>\n      <p class=\"textoDisplay\">Solicitado por: </p>\n      <p class=\"textoDisplay\">    \n        <app-user-profile [shortUser]=\"request.requestBy\"></app-user-profile>\n      </p>\n    </ion-label>\n  </ion-item>";

/***/ }),

/***/ 47488:
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/services/detail-service/detail-service.component.html?ngResource ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-card>\n  <ion-row>\n    <ion-col size=\"3\">\n      <ion-img [src]=\"service.photo ? service.photo : defaultSpace\"></ion-img>\n    </ion-col>\n    <ion-col size=\"9\">\n      <ion-item>\n        <ion-label>\n          <ion-text class=\"ion-text-capitalize\">\n            <h2>{{service.serviceType}}: {{service.name}} </h2>\n            <h3>Tipo: {{service.maintenance?'Mantenimiento':'Servicio Pago'}}</h3>\n          </ion-text>\n        </ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n</ion-card>\n\n<ion-list>\n  <ion-list-header>\n    <ion-label>Información:</ion-label>\n  </ion-list-header>\n  <ion-row>\n    <p class=\"ion-padding ion-text-center\">{{service.description}}</p>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <ion-item>\n        <ion-thumbnail slot=\"start\">\n          <ion-icon size=\"large\" name=\"cash-outline\"></ion-icon>\n        </ion-thumbnail>\n        <ion-label>\n          Costo: {{service.maintenance ? 'Gratis' : service.cost+'$'}} \n        </ion-label>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item>\n        <ion-thumbnail slot=\"start\">\n          <ion-icon size=\"large\" name=\"time-outline\"></ion-icon>\n        </ion-thumbnail>\n        <ion-label>\n          Tiempo Estimado: {{service.estimatedTime}} minutos\n        </ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <ion-item>\n    <ion-thumbnail slot=\"start\">\n      <ion-icon size=\"large\" name=\"calendar-outline\"></ion-icon>\n    </ion-thumbnail>\n    <ion-label>\n      <h2>Disponible:  \n        {{service.weekdays[0]?'Dom. ':''}}\n        {{service.weekdays[1]?'Lun. ':''}}\n        {{service.weekdays[2]?'Mar. ':''}}\n        {{service.weekdays[3]?'Mie. ':''}}\n        {{service.weekdays[4]?'Jue. ':''}}\n        {{service.weekdays[5]?'Vie. ':''}}\n        {{service.weekdays[6]?'Sab. ':''}}\n      </h2>\n    </ion-label>\n  </ion-item>\n\n  <ion-list-header>\n    <ion-label>Términos y Condiciones</ion-label>\n  </ion-list-header>\n  <ion-row>\n    <p class=\"ion-padding ion-text-center\">{{service.terms}}.\n      Al solicitar un servicio, está aceptando los términos y condiciones del servicio.</p>\n  </ion-row>\n</ion-list>";

/***/ }),

/***/ 43272:
/*!************************************************************************************************!*\
  !*** ./src/app/shared/components/services/item-request/item-request.component.html?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-item detail>\n  <ion-thumbnail size=\"small\" style=\"margin-right: 15px;\" slot=\"start\">\n    <img [src]=\"request.service.photo ? request.service.photo : defaultSpace\">\n  </ion-thumbnail>\n  <ion-label class=\"ion-text-wrap\">\n    <ion-text color=\"dark\">\n      <h2 class=\"ion-text-capitalize\"> {{request.service.name}} {{request.service.unitNumber?'('+request.service.unitNumber+')':''}}) </h2>\n    </ion-text>\n    <app-status-request [status]=\"request.status\"></app-status-request>\n  </ion-label>\n  <ion-note slot=\"end\" style=\"width: 30vw;\">\n    <ion-text color=\"medium\" class=\"ion-text-capitalize\">\n      <ion-text color=\"tertiary\" *ngIf=\"request.employeeUID === currentUser.uid\">Designado</ion-text>\n      <ion-text color=\"dark\"><p *ngIf=\"request.startDate\">{{request.startDate | timeFormat: 'fullDateUTC'}} <ion-icon size=\"small\" color=\"tertiary\" name=\"calendar-number-outline\"></ion-icon></p></ion-text>\n      <p *ngIf=\"!request.startDate && request.createdAt \">{{request.createdAt | timeFormat: 'shortDateUTC'}} \n        <ion-icon size=\"small\" *ngIf=\"request.status !== 'Cancelado'\" color=\"secondary\" name=\"paper-plane-outline\"></ion-icon>\n        <ion-icon size=\"small\" *ngIf=\"request.status === 'Cancelado'\" color=\"danger\" name=\"alert-circle-outline\"></ion-icon>\n      </p>\n    </ion-text>\n  </ion-note>\n</ion-item>";

/***/ }),

/***/ 97437:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/services/new-request/new-request.component.html?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button *ngIf=\"!request\" color=\"danger\" [disabled]=\"loading\" (click)=\"cancelRequest()\">\n        Cancelar\n      </ion-button>\n      <ion-button *ngIf=\"showRequestForm && request\" color=\"danger\" [disabled]=\"loading\" (click)=\"enableForm()\">\n        Cancelar\n      </ion-button>\n      <ion-button *ngIf=\"request && !showRequestForm \" color=\"primary\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Atrás\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">{{request ? request.service.name : 'Nuevo Tíquet'}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"(!request || showRequestForm )\" color=\"success\" (click)=\"createRequest()\" \n        [disabled]=\"loading || !selectedUnitUID\">\n          Enviar\n      </ion-button>\n      <ion-button *ngIf=\"request && currentUser.type === 'administrador' && !showRequestForm \" color=\"dark\" (click)=\"enableForm()\">\n          Editar\n      </ion-button>\n      <ion-button *ngIf=\"request && showRequestForm\" color=\"success\" (click)=\"createRequest()\" \n        [disabled]=\"loading || !myRequest.scheduleDate\">\n          Actualizar\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\" *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<ion-content *ngIf=\"!loading\">\n  <app-detail-service *ngIf=\"service\" style=\"height: 100%;\" [user]=\"currentUser\" [service]=\"service\" [reserve]=\"false\"></app-detail-service>\n  <app-assign-task *ngIf=\"request && !showRequestForm && request.status === 'Solicitado' && currentUser.type !== 'residente'\"\n    [currentUser]=\"currentUser\" [request]=\"request\"></app-assign-task>\n  <app-solve-task *ngIf=\"request && !showRequestForm && (request.status === 'Agendado' || request.status === 'En Progreso')\n    && currentUser.type !== 'residente' && request.employeeUID === currentUser.uid\"\n    [currentUser]=\"currentUser\" [request]=\"request\"></app-solve-task>\n  <app-detail-request *ngIf=\"request && !showRequestForm\" style=\"height: 100%;\" [user]=\"currentUser\" [request]=\"request\"></app-detail-request>\n  \n  <ion-list *ngIf=\"showRequestForm\">\n    <ion-item *ngIf=\"users?.length > 1\">\n      <ion-label position=\"stacked\">Usuario Solicitante:</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"selectedUserUID\" (ionChange)=\"userChange($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let user of users\" [value]=\"user.uid\">{{user.name}} {{user.lastName}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item *ngIf=\"selectedUser?.leases?.length > 0\">\n      <ion-label position=\"stacked\">Lugar de Servicio:</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"selectedUnitUID\" (ionChange)=\"spaceChange($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let space of selectedUser.leases\" [value]=\"space.spaceLease.uid\">{{space.spaceLease.type}} {{space.spaceLease.unitNumber}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n    <ion-row *ngIf=\"selectedUser?.leases?.length > 0 && !selectedUnitUID\">\n      <ion-text class=\"ion-padding-start\" color=\"danger\"> \n        <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Seleccione donde recibe el servicio\n      </ion-text>\n    </ion-row>\n\n    <ion-row>\n      <ion-label class=\"ion-padding ion-margin-top\">Seleccione qué días prefiere recibir el servicio:</ion-label>\n    </ion-row>\n    <ion-item>\n      <ion-row *ngIf=\"selectedUser\" style=\"margin: 0 auto 16px auto;\" class=\"ion-margin-bottom\" >\n        <ion-col class=\"ion-text-center\">\n          <p> Dom </p>\n          <ion-checkbox mode='ios' (ionChange)=\"Listener0($event)\" [checked]=\"dom\" color=\"primary\" [disabled]=\"!service.weekdays[0]\"></ion-checkbox>\n        </ion-col>\n        <ion-col class=\"ion-text-center\">\n          <p> Lun </p>\n          <ion-checkbox mode='ios' (ionChange)=\"Listener1($event)\" [checked]=\"lun\" color=\"primary\" [disabled]=\"!service.weekdays[1]\"></ion-checkbox>\n        </ion-col>\n        <ion-col class=\"ion-text-center\">\n          <p> Mar </p>\n          <ion-checkbox mode='ios' (ionChange)=\"Listener2($event)\" [checked]=\"mar\" color=\"primary\" [disabled]=\"!service.weekdays[2]\"></ion-checkbox>\n        </ion-col>\n        <ion-col class=\"ion-text-center\">\n          <p> Mie </p>\n          <ion-checkbox mode='ios' (ionChange)=\"Listener3($event)\" [checked]=\"mie\" color=\"primary\" [disabled]=\"!service.weekdays[3]\"></ion-checkbox>\n        </ion-col>\n        <ion-col class=\"ion-text-center\">\n          <p> Jue </p>\n          <ion-checkbox mode='ios' (ionChange)=\"Listener4($event)\" [checked]=\"jue\" color=\"primary\" [disabled]=\"!service.weekdays[4]\"></ion-checkbox>\n        </ion-col>\n        <ion-col class=\"ion-text-center\">\n          <p> Vie </p>\n          <ion-checkbox mode='ios' (ionChange)=\"Listener5($event)\" [checked]=\"vie\" color=\"primary\" [disabled]=\"!service.weekdays[5]\"></ion-checkbox>\n        </ion-col>\n        <ion-col class=\"ion-text-center\">\n          <p> Sab </p>\n          <ion-checkbox mode='ios' (ionChange)=\"Listener6($event)\" [checked]=\"sab\" color=\"primary\" [disabled]=\"!service.weekdays[6]\"></ion-checkbox>\n        </ion-col>\n      </ion-row>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label position=\"stacked\">Notas:</ion-label>\n      <ion-textarea rows=\"3\" placeholder=\"(opcional) Ingrese detalles u observaciones para el servicio...\" [value]=\"notes\" (ionChange)=\"notesListener($event)\"></ion-textarea>\n    </ion-item>\n\n  </ion-list>\n</ion-content>\n<ion-footer *ngIf=\"!loading && request && request.status ==='Solicitado' && \n(currentUser.type === 'administrador' || request.requestBy.uid === currentUser.uid)\">\n  <ion-toolbar>\n    <app-big-button LABEL=\"ENVIAR\" *ngIf=\"!request && service && showRequestForm\" class=\"ion-padding-top\" buttonType=\"SECONDARY\" [loading]=\"loading\" [disabled]=\"loading || (this.selectedUser?.leases?.length>0 && !this.selectedUnitUID)\" (click)=\"createRequest()\"></app-big-button>\n    <app-big-button LABEL=\"CANCELAR\" *ngIf=\"request?.status ==='Solicitado' && (currentUser.type === 'administrador' || request.requestBy.uid === currentUser.uid)\" class=\"ion-padding-top\" buttonType=\"RED\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"changeStateReserve('Cancelado')\"></app-big-button>\n  </ion-toolbar>\n</ion-footer> ";

/***/ }),

/***/ 52805:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/services/new-service/new-service.component.html?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button *ngIf=\"!service\" color=\"danger\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Cancelar\n      </ion-button>\n      <ion-button *ngIf=\"editServiceForm\" color=\"danger\" [disabled]=\"loading\" (click)=\"editService()\">\n        Cancelar\n      </ion-button>\n      <ion-button *ngIf=\"service && !editServiceForm\" color=\"primary\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Atrás\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">{{service ? service.serviceType+': '+service.name: title}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"!service || editServiceForm\" color=\"success\" (click)=\"createService()\" \n        [disabled]=\"loading\">\n          Enviar\n      </ion-button>\n      <ion-button *ngIf=\"this.service && this.user.type === 'administrador' && !editServiceForm\" color=\"dark\" (click)=\"editService()\">\n          Editar\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\" *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<ion-content *ngIf=\"!loading && service && !editServiceForm\">\n  <app-detail-service style=\"height: 100%;\" [user]=\"user\" [service]=\"service\"></app-detail-service>\n</ion-content>\n\n<ion-content class=\"ion-padding\" *ngIf=\"!loading && (!service || editServiceForm)\">\n  <ion-list>\n    <ion-item>\n      <ion-label>Disponible para residentes:</ion-label>\n      <ion-checkbox slot=\"end\" mode='md' (ionChange)=\"availableListener($event)\" [checked]=\"myService.available\" color=\"primary\"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n      <ion-thumbnail slot=\"start\" *ngIf=\"myService.photo\">\n        <img src=\"{{myService.photo}}\">\n      </ion-thumbnail>\n      <ion-label position=\"stacked\">Tipo de Servicio:</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"myService.serviceType\" (ionChange)=\"serviceType($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let type of typeList\" [value]=\"type.name\"> {{type.name}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n    <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"!myService.serviceType\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Seleccione un tipo de servicio\n    </ion-text>\n    <ion-item>\n      <ion-label position=\"stacked\">Servicio:</ion-label>\n      <ion-input type=\"text\" placeholder=\"Nombre del servicio\" [value]=\"myService.name\" (ionChange)=\"nameListener($event)\"></ion-input>\n    </ion-item>\n    <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"!myService?.name\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>\n      Ingresa título del servicio\n    </ion-text>\n  \n    <ion-item>\n      <ion-label position=\"stacked\">Descripción del servicio:</ion-label>\n      <ion-textarea rows=\"3\" placeholder=\"Ingrese un resumen ...\" [value]=\"myService.description\" \n      (ionChange)=\"descriptionListener($event)\"></ion-textarea>\n    </ion-item>\n    <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"!myService.description\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> \n      Agregue una descripción\n    </ion-text>\n  \n    <ion-item>\n      <ion-label position=\"stacked\">Terminos y Condiciones:</ion-label>\n      <ion-textarea rows=\"3\" placeholder=\"Ingrese las reglas o límites del servicio...\" [value]=\"myService.terms\" \n      (ionChange)=\"termsListener($event)\"></ion-textarea>\n    </ion-item>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label>Mantenimiento</ion-label>\n          <ion-checkbox slot=\"end\" mode='md' (ionChange)=\"maintenanceListener($event)\" \n          [checked]=\"myService.maintenance\" color=\"primary\"></ion-checkbox>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label style=\"height: 33px;\">Precio: {{!myService.maintenance?'':'Gratis'}}</ion-label>\n          <ion-input *ngIf=\"!myService.maintenance\" class=\"ion-text-center\" type=\"number\" placeholder=\"Valor en dólares\" \n          [value]=\"myService.cost\" (ionChange)=\"priceListener($event)\"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"!myService.maintenance && !myService.cost\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Agregue un valor\n    </ion-text>\n\n    <ion-item>\n      <ion-label position=\"stacked\">Duración (minutos) :</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"myService.estimatedTime\" (ionChange)=\"estimatedTimeListener($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let time of timeEstimationList\" [value]=\"time.unit\"> {{time.text}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n    <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"!myService.estimatedTime\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Agregue un tiempo estimado del servicio\n    </ion-text>\n\n    <ion-item>\n      <ion-label>Días disponibles:</ion-label>\n    </ion-item>\n    <ion-row>\n      <ion-col class=\"ion-text-center\">\n        <p> Dom </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener0($event)\" [checked]=\"dom\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Lun </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener1($event)\" [checked]=\"lun\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Mar </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener2($event)\" [checked]=\"mar\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Mie </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener3($event)\" [checked]=\"mie\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Jue </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener4($event)\" [checked]=\"jue\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Vie </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener5($event)\" [checked]=\"vie\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Sab </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener6($event)\" [checked]=\"sab\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n    </ion-row>\n  </ion-list>\n</ion-content>\n\n";

/***/ }),

/***/ 40165:
/*!************************************************************************************************!*\
  !*** ./src/app/shared/components/services/pick-service/pick-service.component.html?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button color=\"danger\" (click)=\"modal.dismiss(false)\">\n        Cancelar\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">Nuevo Tíquet</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\" *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<app-not-data-yet-message \n  *ngIf=\"services.serviceList.length == 0 && services.maintenanceList.length == 0  && !loading\"\n  text=\"No tiene servicios aún\" icon=\"alert-circle-outline\"\n></app-not-data-yet-message>\n\n\n<ion-content class=\"ion-padding\"  *ngIf=\"(services.serviceList.length > 0 || services.maintenanceList.length > 0 ) && !loading\">\n  <ion-list>\n    <ion-accordion-group #accordionGroup value=\"second\">\n      <ion-accordion value=\"first\" *ngIf=\"(services.maintenanceList.length> 0)\">\n        <ion-item slot=\"header\" color=\"light\">\n          <ion-label>Mantenimiento</ion-label>\n        </ion-item>\n        <div class=\"ion-padding\" slot=\"content\">\n          <ion-row class=\"headerServiceList\" *ngIf=\"(services.maintenanceList.length> 0)\">\n            <ion-col size=\"2\" class=\"ion-text-center\"></ion-col>\n            <ion-col size=\"5\" class=\"ion-text-center\">Tipo</ion-col>\n            <ion-col size=\"5\" class=\"ion-text-center\">Servicio</ion-col>\n          </ion-row>\n          <app-service-item *ngFor=\"let service of services.maintenanceList\" [service]=\"service\" \n          (click)=\"pickService(service)\" [maintenance]=\"true\"></app-service-item>\n        </div>\n      </ion-accordion>\n      \n      <ion-accordion value=\"second\" *ngIf=\"(services.serviceList.length> 0)\">\n        <ion-item slot=\"header\" color=\"light\">\n          <ion-label>Servicios</ion-label>\n        </ion-item>\n        <div class=\"ion-padding\" slot=\"content\">\n\n          <ion-row class=\"headerServiceList\" *ngIf=\"(services.serviceList.length> 0)\">\n            <ion-col size=\"1\" class=\"ion-text-center\"></ion-col>\n            <ion-col size=\"4\" class=\"ion-text-center\">Tipo</ion-col>\n            <ion-col size=\"4\" class=\"ion-text-center\">Servicio</ion-col>\n            <ion-col size=\"3\" class=\"ion-text-center\">Precio</ion-col>\n          </ion-row>\n          <app-service-item *ngFor=\"let service of services.serviceList\" [service]=\"service\" \n          (click)=\"pickService(service)\" [maintenance]=\"false\"></app-service-item>\n        </div>\n      </ion-accordion>\n    </ion-accordion-group>\n\n  </ion-list>\n</ion-content>\n";

/***/ }),

/***/ 21644:
/*!************************************************************************************************!*\
  !*** ./src/app/shared/components/services/service-item/service-item.component.html?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-row class=\"serviceItemList\" *ngIf=\"!maintenance\">\n  <ion-col size=\"1\" class=\"ion-text-center ion-text-capitalize\">\n    <ion-thumbnail>\n      <img [src]=\"service.photo ? '../../../../../'+service.photo : defaultService\">\n    </ion-thumbnail>\n  </ion-col>\n  <ion-col size=\"4\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">{{service.serviceType}}</ion-col>\n  <ion-col size=\"4\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">{{service.name}}</ion-col>\n  <ion-col size=\"3\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">\n    {{service.cost}}$\n    <ion-icon class=\"ion-float-right\" name=\"chevron-forward-outline\"></ion-icon>\n  </ion-col>\n</ion-row>\n\n\n\n<ion-row class=\"serviceItemList\" *ngIf=\"maintenance\">\n  <ion-col size=\"2\" class=\"ion-text-center ion-text-capitalize\">\n    <ion-thumbnail class=\"ion-margin-start\">\n      <img [src]=\"service.photo ? '../../../../../'+service.photo : defaultService\">\n    </ion-thumbnail>\n  </ion-col>\n  <ion-col size=\"5\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">{{service.serviceType}}</ion-col>\n  <ion-col size=\"5\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">\n    {{service.name}}\n    <ion-icon class=\"ion-float-right\" name=\"chevron-forward-outline\"></ion-icon>\n  </ion-col>\n</ion-row>";

/***/ }),

/***/ 95837:
/*!********************************************************************************************!*\
  !*** ./src/app/shared/components/services/solve-task/solve-task.component.html?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-card class=\"ion-padding\">\n  <ion-list>\n    <ion-item lines=\"none\">\n      <ion-label>{{request.status === 'Agendado' ? 'Iniciar':'Finalizar'}} Tarea:</ion-label>\n    </ion-item>\n    <ion-row>\n      <ion-col>Inicio: <ion-text color=\"dark\">{{request.startDate| timeFormat:'h:mm A'}}</ion-text></ion-col>\n      <ion-col>Fin: <ion-text color=\"dark\">{{request.endDate| timeFormat:'h:mm A'}}</ion-text></ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col class=\"ion-text-center\">Notas del Residente: <ion-text color=\"dark\">{{request.service.notes}}</ion-text></ion-col>\n    </ion-row>\n    <ion-item *ngIf=\"request.status === 'Agendado'\">\n      <ion-label>Estado Inicial:</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"initialStatus\" (ionChange)=\"statusListener($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let status of statusList\" [value]=\"status\">{{status}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-thumbnail slot=\"start\" *ngIf=\"!newImage\" (click)=\"addPhoto()\">\n        <ion-icon size=\"large\" name=\"image-outline\"></ion-icon>\n      </ion-thumbnail>\n      <ion-thumbnail slot=\"start\" *ngIf=\"newImage\" (click)=\"addPhoto()\">\n        <img src=\"{{newImage.webPath}}\">\n      </ion-thumbnail>\n      <ion-label position=\"stacked\">Notas:</ion-label>\n      <ion-textarea rows=\"3\" [value]=\"noteService.text\" (ionChange)=\"noteListener($event)\"></ion-textarea>\n    </ion-item>\n    <ion-item *ngFor=\"let item of request.notes \">\n      <ion-thumbnail slot=\"start\">\n        <img [src]=\"item.photo\">\n      </ion-thumbnail>\n      <ion-label>{{item.text}}</ion-label>\n    </ion-item>\n    \n  </ion-list>\n  <app-big-button *ngIf=\"request.status === 'Agendado'\" class=\"ion-padding-top\" \n    LABEL=\"INICIAR\" buttonType=\"SECONDARY\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"changeStatus('En Progreso')\"></app-big-button>\n  <app-big-button *ngIf=\"request.status === 'En Progreso'\" class=\"ion-padding-top\" \n    LABEL=\"FINALIZAR\" buttonType=\"SUCCESS\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"changeStatus('Terminado')\"></app-big-button>\n</ion-card>\n\n";

/***/ }),

/***/ 50610:
/*!**********************************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/detail-reservation/detail-reservation.component.html?ngResource ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-card>\n  <ion-row>\n    <ion-col size=\"3\">\n      <ion-thumbnail class=\"spaceView\">\n        <ion-img [src]=\"request.reservation.photo ? request.reservation.photo : defaultSpace\"></ion-img>\n      </ion-thumbnail>\n    </ion-col>\n    <ion-col size=\"9\">\n      <ion-item>\n        <ion-label>\n          <ion-text class=\"ion-text-capitalize\">\n            <h2>{{request.reservation.unitNumber}} </h2>\n            <app-status-request [status]=\"request.status\"></app-status-request>\n          </ion-text>\n        </ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n</ion-card>\n\n\n<ion-list>\n  <ion-list-header>\n    <ion-label>Información:</ion-label>\n  </ion-list-header>\n  <ion-row>\n    <ion-col>\n      <ion-item>\n        <ion-thumbnail slot=\"start\">\n          <ion-icon size=\"large\" name=\"calendar-outline\"></ion-icon>\n        </ion-thumbnail>\n        <ion-label class=\"ion-text-capitalize\">\n          Fecha: {{request.startDate | timeFormat: 'displayDateUTC'}}\n        </ion-label>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item>\n        <ion-thumbnail slot=\"start\">\n          <ion-icon size=\"large\" name=\"time-outline\"></ion-icon>\n        </ion-thumbnail>\n        <ion-label>\n          Reserva: {{request.startDate | timeFormat: 'TimeUTC'}} - {{request.endDate | timeFormat: 'TimeUTC'}}\n        </ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col>\n      <ion-item>\n        <ion-thumbnail slot=\"start\">\n          <ion-icon size=\"large\" name=\"calendar-outline\"></ion-icon>\n        </ion-thumbnail>\n        <ion-label class=\"ion-text-capitalize\">\n          Grupo: {{request.reservation.guests}}\n        </ion-label>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item>\n        <ion-thumbnail slot=\"start\">\n          <ion-icon size=\"large\" name=\"time-outline\"></ion-icon>\n        </ion-thumbnail>\n        <ion-label>\n          Horas: {{request.startDate | timeFormat: 'TimeUTC'}} - {{request.endDate | timeFormat: 'TimeUTC'}}\n        </ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n  <ion-item>\n    <ion-label>Solicitado por:</ion-label>\n    <app-user-profile [shortUser]=\"request.requestBy\"></app-user-profile>\n  </ion-item>\n</ion-list>";

/***/ }),

/***/ 90290:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/detail-space/detail-space.component.html?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = "\n<ion-card>\n  <ion-row>\n    <ion-col size=\"3\">\n      <ion-thumbnail class=\"spaceView\" (click)=\"openPreview(space.photo ? space.photo : defaultSpace)\">\n        <ion-img [src]=\"space.photo ? space.photo : defaultSpace\"></ion-img>\n      </ion-thumbnail>\n    </ion-col>\n    <ion-col size=\"9\">\n      <ion-item>\n        <ion-label>\n          <ion-text class=\"ion-text-capitalize\">\n            <h2>{{space.type}} {{space.unitNumber}} </h2>\n            <h3>Tipo: {{space.spaceType}}</h3>\n          </ion-text>\n        </ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n</ion-card>\n\n<ion-list>\n  <ion-list-header>\n    <ion-label>Información:</ion-label>\n  </ion-list-header>\n  <ion-row>\n    <p class=\"ion-padding\">{{space.description}}</p>\n  </ion-row>\n  <ion-row *ngIf=\"!reserve\">\n    <ion-col>\n      <ion-item>\n        <ion-thumbnail slot=\"start\">\n          <ion-icon size=\"large\" name=\"map-outline\"></ion-icon>\n        </ion-thumbnail>\n        <ion-label>\n          Ubicación: {{space.floor}}\n        </ion-label>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item>\n        <ion-thumbnail slot=\"start\">\n          <ion-icon size=\"large\" name=\"crop-outline\"></ion-icon>\n        </ion-thumbnail>\n        <ion-label>\n          Metros2: {{space.squareMeters}}\n        </ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col>\n      <ion-item>\n        <ion-thumbnail slot=\"start\">\n          <ion-icon size=\"large\" name=\"grid-outline\"></ion-icon>\n        </ion-thumbnail>\n        <ion-label>\n          Ambientes: {{space.rooms}}\n        </ion-label>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item>\n        <ion-thumbnail slot=\"start\">\n          <ion-icon size=\"large\" name=\"download-outline\"></ion-icon>\n        </ion-thumbnail>\n        <ion-label>\n          Baños: {{space.bathrooms}}\n        </ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <div *ngIf=\"space.lease\">\n    \n    <ion-list-header>\n      <ion-label>Información de Contrato:</ion-label>\n    </ion-list-header>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label>\n            Inicio Contrato: {{space.lease.leaseStart | timeFormat: 'shortDateUTC'}}\n          </ion-label>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label>\n            Fin Contrato: {{space.lease.leaseEnd | timeFormat: 'shortDateUTC'}}\n          </ion-label>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label>\n            Costo Mensual: {{space.lease.monthlyCost.toFixed(2)}}$\n          </ion-label>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label>Espacio de:</ion-label>\n          <app-user-profile [shortUser]=\"space.lease.userLease\"></app-user-profile>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </div>\n\n\n  <div *ngIf=\"space.rent\">\n    <ion-list-header>\n      <ion-label>Información de Renta:</ion-label>\n    </ion-list-header>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-thumbnail slot=\"start\">\n            <ion-icon size=\"large\" name=\"cash-outline\"></ion-icon>\n          </ion-thumbnail>\n          <ion-label>\n            Precio de Renta: {{space.rentData.cost}}$\n          </ion-label>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-thumbnail slot=\"start\">\n            <ion-icon size=\"large\" name=\"calendar-outline\"></ion-icon>\n          </ion-thumbnail>\n          <ion-label>\n            <h2>Días Abierto: </h2>\n            <h2>\n              {{space.rentData.weekdays[0]?'Dom. ':''}}\n              {{space.rentData.weekdays[1]?'Lun. ':''}}\n              {{space.rentData.weekdays[2]?'Mar. ':''}}\n              {{space.rentData.weekdays[3]?'Mie. ':''}}\n              {{space.rentData.weekdays[4]?'Jue. ':''}}\n              {{space.rentData.weekdays[5]?'Vie. ':''}}\n              {{space.rentData.weekdays[6]?'Sab. ':''}}\n            </h2>\n          </ion-label>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-thumbnail slot=\"start\">\n            <ion-icon size=\"large\" name=\"sunny-outline\"></ion-icon>\n          </ion-thumbnail>\n          <ion-label>\n            Hora de Inicio: {{space.rentData.starTime | timeFormat: 'h:mm A'}}\n          </ion-label>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-thumbnail slot=\"start\">\n            <ion-icon size=\"large\" name=\"moon\"></ion-icon>\n          </ion-thumbnail>\n          <ion-label>\n            Hora de Cierre: {{space.rentData.endTime | timeFormat: 'h:mm A'}}\n          </ion-label>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngIf=\"!reserve\">\n      <ion-col>\n        <ion-item>\n          <ion-thumbnail slot=\"start\">\n            <ion-icon size=\"large\" name=\"time-outline\"></ion-icon>\n          </ion-thumbnail>\n          <ion-label>\n            Tiempo Míximo: {{(space.rentData.minTime < 60)? '30 minutos' :space.rentData.minTime === 120?'2 horas':'1 hora'}}\n          </ion-label>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-thumbnail slot=\"start\">\n            <ion-icon size=\"large\" name=\"time\"></ion-icon>\n          </ion-thumbnail>\n          <ion-label>\n            Tiempo Máximo: {{(space.rentData.minTime < 60)? '30 minutos' : (space.rentData.maxTime/60)+' horas'}} \n          </ion-label>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </div>\n</ion-list>";

/***/ }),

/***/ 46719:
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/item-reservation/item-reservation.component.html?ngResource ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-item detail>\n  <ion-thumbnail slot=\"start\">\n    <img [src]=\"request.reservation.photo ? request.reservation.photo : defaultSpace\">\n  </ion-thumbnail>\n  <ion-label class=\"ion-text-wrap\">\n    <ion-text color=\"dark\">\n      <h2 class=\"ion-text-capitalize\"> {{request.reservation.unitNumber}} </h2>\n    </ion-text>\n    <app-status-request [status]=\"request.status\"></app-status-request>\n  </ion-label>\n  <ion-note slot=\"end\" style=\"width: 27vw;\">\n    <ion-text color=\"medium\" class=\"ion-text-capitalize\">\n      <h5>{{request.startDate | timeFormat: 'fullDateUTC'}}</h5>\n    </ion-text>\n  </ion-note>\n</ion-item>";

/***/ }),

/***/ 78253:
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/item-space/item-space.component.html?ngResource ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-row class=\"spaceItemList\" *ngIf=\"!profileView\">\n  <ion-col size=\"2\" class=\"ion-text-center ion-text-capitalize\">\n    <ion-thumbnail>\n      <img [src]=\"space.photo ? space.photo : defaultSpace\">\n    </ion-thumbnail>\n  </ion-col>\n  <ion-col size=\"4\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">{{space.type}} {{space.unitNumber}}</ion-col>\n  <ion-col size=\"2\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">{{space.spaceType}}</ion-col>\n  <ion-col size=\"4\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">\n    {{showOccupant()}}\n    <ion-icon class=\"ion-float-right\" name=\"chevron-forward-outline\"></ion-icon>\n  </ion-col>\n</ion-row>\n\n<ion-row class=\"spaceItemList\" *ngIf=\"profileView\">\n  <ion-col size=\"2\" class=\"ion-text-center ion-text-capitalize\">\n    <ion-thumbnail>\n      <img [src]=\"space.photo ? space.photo : defaultSpace\">\n    </ion-thumbnail>\n  </ion-col>\n  <ion-col size=\"10\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">{{space.type}} {{space.unitNumber}}\n    <ion-icon class=\"ion-float-right\" name=\"chevron-forward-outline\"></ion-icon>\n  </ion-col>\n</ion-row>\n\n\n    ";

/***/ }),

/***/ 44323:
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/new-reservation/new-reservation.component.html?ngResource ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button *ngIf=\"!reservation\" color=\"danger\" [disabled]=\"loading\" (click)=\"cancelReservation()\">\n        Cancelar\n      </ion-button>\n      <ion-button *ngIf=\"editReservationForm\" color=\"danger\" [disabled]=\"loading\" (click)=\"cancelReservation()\">\n        Cancelar\n      </ion-button>\n      <ion-button *ngIf=\"reservation && !editReservationForm\" color=\"primary\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Atrás\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">{{reservation ? reservation.reservation.unitNumber: 'Nueva Reserva'}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"reservation && currentUser.type === 'administrador' && !showReservationForm\" color=\"dark\" (click)=\"enableForm()\">\n          Editar\n      </ion-button>\n      <ion-button *ngIf=\"reservation && currentUser.type === 'administrador' && showReservationForm\" color=\"dark\" (click)=\"createReservation()\">\n          Enviar\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\" *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<ion-content *ngIf=\"!loading && space && !showReservationForm\">\n  <app-detail-space style=\"height: 100%;\" [user]=\"currentUser\" [space]=\"space\" [reserve]=\"true\"></app-detail-space>\n</ion-content>\n\n<ion-content *ngIf=\"!loading && reservation && !showReservationForm\">\n  <app-detail-reservation style=\"height: 100%;\" [user]=\"currentUser\" [request]=\"reservation\"></app-detail-reservation>\n</ion-content>\n\n<ion-content *ngIf=\"!loading && space && showReservationForm\">\n  <ion-card>\n    <ion-row>\n      <ion-col size=\"3\">\n        <ion-thumbnail class=\"spaceView\">\n          <ion-img [src]=\"space.photo ? space.photo : defaultSpace\"></ion-img>\n        </ion-thumbnail>\n      </ion-col>\n      <ion-col size=\"9\">\n        <ion-item>\n          <ion-label>\n            <ion-text class=\"ion-text-capitalize\">\n              <h2>{{space.type}} {{space.unitNumber}} </h2>\n              <h3>Tipo: {{space.spaceType}}</h3>\n            </ion-text>\n          </ion-label>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n  <ion-list>\n\n    <ion-item *ngIf=\"users?.length > 1\">\n      <ion-label position=\"stacked\">Usuario Solicitante:</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"selectedUserUID\" (ionChange)=\"userChange($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let user of users\" [value]=\"user.uid\">{{user.name}} {{user.lastName}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n    \n    <ion-item (click)=\"showCalendar1()\" *ngIf=\"!showCalendar\">\n      <ion-label>Fecha de Evento: </ion-label>\n      <ion-label> \n        <ion-text *ngIf=\"myReservation.scheduleDate\" class=\"dateStyle\">\n          {{myReservation.scheduleDate | timeFormat: 'DD/MM/YYYY'}}\n        </ion-text>\n        <ion-text *ngIf=\"!myReservation.scheduleDate\" class=\"dateStyle noDateStyle\">\n          (Selección fecha)\n        </ion-text>\n      </ion-label>\n      <ion-button class=\"downArrow\" slot=\"end\" size=\"small\">\n        <ion-icon style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit;\" name=\"caret-down-outline\"></ion-icon>\n      </ion-button>\n    </ion-item>\n    <ion-row *ngIf=\"showCalendar\">\n      <ion-col>\n        <ion-label>Fecha de Evento: </ion-label>\n        <ion-datetime #datetime style=\"margin: 0 auto;\" [min]=\"min\" [isDateEnabled]=\"availableDays\" presentation=\"date\" \n              [(ngModel)]=\"myReservation.scheduleDate\" (ionChange)=\"changeScheduleTime(datetime.value)\">\n          <ion-buttons slot=\"buttons\">\n            <ion-button color=\"danger\" (click)=\"showCalendar1()\">Cancelar</ion-button>\n            <ion-button color=\"success\" (click)=\"datetime.confirm()\">OK</ion-button>\n          </ion-buttons>\n        </ion-datetime>\n      </ion-col>\n    </ion-row>\n\n    <ion-grid class=\"item_grid\" *ngIf=\"myReservation.scheduleDate\">\n      <ion-row class=\"ion-align-items-center\">\n        <ion-col>\n          <p class=\"ion-no-margin item_text required ion-text-center\" position=\"stacked\">Disponibilidad:</p>\n          <p class=\"ion-no-margin item_text required ion-text-center\" position=\"stacked\">(Tiempo máximo - {{time.maxTimeString(space.rentData.maxTime)}})</p>\n        </ion-col>\n      </ion-row>\n      <ion-row class=\"ion-align-items-center\" *ngIf=\"scheduleTimes?.length === 1\">\n        <ion-col *ngFor=\"let timeSlot of scheduleTimes; index as i\">\n          <div class=\"time_box {{timeSlot.disabled?'disabled':(timeSlot.selected?'selected':'')}}\"\n          (click)=\"timeSlotClicked(i,timeSlot)\"\n          >{{timeSlot.time}}</div>\n        </ion-col>\n      </ion-row>\n      <ion-row class=\"ion-align-items-center\" *ngIf=\"scheduleTimes?.length > 1\">\n        <ion-col size=\"6\" *ngFor=\"let timeSlot of scheduleTimes; index as i\">\n          <div class=\"time_box {{timeSlot.disabled?'disabled':(timeSlot.selected?'selected':'')}}\"\n          (click)=\"timeSlotClicked(i,timeSlot)\"\n          >{{timeSlot.time}}</div>\n        </ion-col>\n      </ion-row>\n\n      <ion-row class=\"ion-align-items-center\" *ngIf=\"timeSlotStart.date\">\n        <ion-col>\n          <p class=\"ion-no-margin ion-text-center\">{{!timeSlotStart.date?'Seleccione tiempo':'Hora de Reserva'}}</p>\n        </ion-col>\n      </ion-row>\n      <ion-row class=\"ion-align-items-center\" *ngIf=\"timeSlotStart.date\">\n        <ion-col class=\"ion-no-margin ion-text-center\">\n          <p class=\"ion-no-margin item_text ion-text-center ion-text-capitalize\">{{timeSlotStart.date | timeFormat: 'displayDateUTC'}}</p>\n          <p class=\"ion-no-margin item_text ion-text-center ion-text-capitalize\">{{timeSlotStart.hour}} - {{timeSlotEnd.hour}}</p>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-grid *ngIf=\"timeSlotStart.date\">\n      <ion-row class=\"ion-align-items-center\">\n        <ion-col size=\"7\">\n          <p class=\"ion-no-margin item_text\">¿Cuantos acompañantes traerá con usted?</p>\n        </ion-col>\n        <ion-col size=\"5\">\n          <ion-row class=\"input_bg\">\n            <ion-col class=\"ion-text-center guest_size\" (click)=\"guestCounterButton('minus')\">\n              <ion-icon style=\"padding-top: 5pt;\" name=\"remove-circle-outline\"></ion-icon>\n            </ion-col>\n            <ion-col class=\"ion-text-center guest_size\">\n              {{guestCounter}}\n            </ion-col>\n            <ion-col class=\"ion-text-center guest_size\" (click)=\"guestCounterButton('plus')\">\n              <ion-icon style=\"padding-top: 5pt;\" name=\"add-circle-outline\"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-col>\n      </ion-row>\n      <ion-row class=\"ion-align-items-center\">\n        <ion-col>\n          <p class=\"ion-no-margin item_text ion-text-center\">Grupo: {{guestCounter}}/{{space.rentData.capacity}}</p>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n  </ion-list>\n</ion-content>\n<ion-footer *ngIf=\"!loading && ((space && !reservation) || \n    reservation.status === 'Solicitado' && (currentUser.type === 'administrador' || reservation?.requestBy.uid === currentUser.uid))\">\n  <ion-toolbar>\n    <app-big-button *ngIf=\"(!reservation || editReservationForm) && showReservationForm\" class=\"ion-padding-top\" LABEL=\"Enviar\" buttonType=\"SECONDARY\" [loading]=\"loading\" [disabled]=\"loading || !myReservation.scheduleDate || !timeSlotStart.date\" (click)=\"createReservation()\"></app-big-button>\n    <app-big-button *ngIf=\"space && !showReservationForm\" class=\"ion-padding-top\" LABEL=\"SOLICITAR\" buttonType=\"SECONDARY\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"enableForm()\"></app-big-button>\n    <ion-row>\n      <ion-col>\n        <app-big-button *ngIf=\"reservation && currentUser.type === 'administrador'\" class=\"ion-padding-top\" LABEL=\"APROBAR\" buttonType=\"SUCCESS\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"changeStateReserve('Aprobado')\"></app-big-button>\n      </ion-col>\n      <ion-col>\n        <app-big-button *ngIf=\"reservation && (currentUser.type === 'administrador' || reservation.requestBy.uid === currentUser.uid)\" class=\"ion-padding-top\" LABEL=\"CANCELAR\" buttonType=\"RED\" [loading]=\"loading\" [disabled]=\"loading\" (click)=\"changeStateReserve('Cancelado')\"></app-big-button>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n</ion-footer>";

/***/ }),

/***/ 21497:
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/new-space/new-space.component.html?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button *ngIf=\"!space\" color=\"danger\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Cancelar\n      </ion-button>\n      <ion-button *ngIf=\"editSpaceForm\" color=\"danger\" [disabled]=\"loading\" (click)=\"editspace()\">\n        Cancelar\n      </ion-button>\n      <ion-button *ngIf=\"space && !editSpaceForm\" color=\"primary\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Atrás\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">{{space ? space.type+' '+space.unitNumber: 'Nuevo Espacio'}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"!space || editSpaceForm\" color=\"success\" (click)=\"createSpace()\" \n        [disabled]=\"loading && !mySpace?.unitNumber && !mySpace?.spaceType && !mySpace?.type\">\n          Enviar\n      </ion-button>\n      <ion-button *ngIf=\"this.space && this.user.type === 'administrador' && !editSpaceForm\" color=\"dark\" (click)=\"editspace()\">\n          Editar\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\" *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<ion-content *ngIf=\"!loading && space && !editSpaceForm\">\n  <app-detail-space style=\"height: 100%;\" [user]=\"user\" [space]=\"space\" [reserve]=\"false\"></app-detail-space>\n</ion-content>\n\n<ion-content class=\"ion-padding\" *ngIf=\"!loading && (!space || editSpaceForm)\">\n  <ion-list>\n    <ion-item *ngIf=\"communitiesList.length > 0\">\n      <ion-thumbnail slot=\"start\">\n        <img [src]=\"communitiesList[0]?.photo\">\n      </ion-thumbnail>\n      <ion-label>\n        <h3>{{communitiesList[0].propertyType}} {{communitiesList[0].name}}</h3>\n        <p>{{communitiesList[0].address}}</p>\n      </ion-label>\n    </ion-item>\n  \n    <ion-item>\n      <ion-thumbnail slot=\"start\" *ngIf=\"space\" (click)=\"addPhoto()\">\n        <img src=\"{{space?.photo?space.photo :defaultSpace}}\">\n      </ion-thumbnail>\n      <ion-thumbnail slot=\"start\" *ngIf=\"newImage\" (click)=\"addPhoto()\">\n        <img src=\"{{newImage.webPath}}\">\n      </ion-thumbnail>\n      <ion-label position=\"stacked\">Alias:</ion-label>\n      <ion-input type=\"text\" placeholder=\"número o designación\" [value]=\"mySpace.unitNumber\" (ionChange)=\"unitListener($event)\"></ion-input>\n    </ion-item>\n    <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"!mySpace?.unitNumber\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>\n      Ingresa el número del espacio o el título del area\n    </ion-text>\n  \n    <ion-item *ngIf=\"!newImage && !space?.photo\" (click)=\"addPhoto()\">\n      <ion-label>Agregue una imagen:</ion-label>\n      <ion-button color=\"secondary\"><ion-icon name=\"camera-outline\" color=\"light\"></ion-icon></ion-button>\n    </ion-item>\n    <ion-row *ngIf=\"progress > 0\">\n      <ion-progress-bar color=\"secondary\" [value]=\"progress\"></ion-progress-bar>\n    </ion-row>\n  \n    <ion-item>\n      <ion-label position=\"stacked\">Tipo de Espacio:</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"mySpace.spaceType\" (ionChange)=\"spaceType($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let type of spaceTypeList\" [value]=\"type\"> {{type}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n    <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"!mySpace.spaceType\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Seleccione una  tipo de Espacio\n    </ion-text>\n  \n    <ion-item>\n      <ion-label position=\"stacked\">Asignación de espacio:</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"mySpace.type\" (ionChange)=\"handleType($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let type of typeList\" [value]=\"type\"> {{type}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n    <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"!mySpace.type\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Seleccione una asignación\n    </ion-text>\n  \n    <ion-item *ngIf=\"communitiesList.length>0\">\n      <ion-label position=\"stacked\">Ubicación:</ion-label>\n      <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"mySpace.floor\" (ionChange)=\"handleArea($event)\">\n        <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let area of communitiesList[0].areas\" [value]=\"area.name\"> {{area.name}} ({{area.description}})</ion-select-option>\n      </ion-select>\n    </ion-item>\n    <ion-text class=\"ion-padding-start\" color=\"danger\" *ngIf=\"!mySpace.floor\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon> Seleccione una ubicación\n    </ion-text>\n  \n    <ion-item>\n      <ion-label position=\"stacked\">Descripción del area:</ion-label>\n      <ion-textarea rows=\"3\" placeholder=\"(opcional) Ingrese los usos o resumen del inmueble...\" [value]=\"mySpace.description\" (ionChange)=\"descriptionListener($event)\"></ion-textarea>\n    </ion-item>\n  \n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label position=\"stacked\">Metros2:</ion-label>\n          <ion-input class=\"ion-text-center\" type=\"number\" placeholder=\"(opcional)\" [value]=\"mySpace.squareMeters\" (ionChange)=\"metersListener($event)\"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label position=\"stacked\">Baños:</ion-label>\n          <ion-input class=\"ion-text-center\" type=\"number\" placeholder=\"(opcional)\" [value]=\"mySpace.bathrooms\" (ionChange)=\"bathroomsListener($event)\"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label position=\"stacked\">Ambientes:</ion-label>\n          <ion-input class=\"ion-text-center\" type=\"number\" placeholder=\"(opcional)\" [value]=\"mySpace.rooms\" (ionChange)=\"roomsListener($event)\"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-item *ngIf=\"this.mySpace.spaceType === 'comunal'\">\n      <ion-label>Se puede reservar?</ion-label>\n      <ion-checkbox slot=\"end\" mode='md' (ionChange)=\"checkBoxListener($event)\" [checked]=\"mySpace.rent\" color=\"primary\"></ion-checkbox>\n    </ion-item>\n    <ion-row *ngIf=\"mySpace.rent\">\n      <ion-col>\n        <ion-item>\n          <ion-label position=\"stacked\">Tiempo Mínimo:</ion-label>\n          <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"mySpace.rentData.minTime\" (ionChange)=\"handleMinTime($event)\">\n            <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let time of minTimeList\" [value]=\"time.unit\"> {{time.text}}</ion-select-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label position=\"stacked\">Tiempo Máximo:</ion-label>\n          <ion-select class=\"ion-text-capitalize\" mode='ios' [value]=\"mySpace.rentData.maxTime\" (ionChange)=\"handleMaxTime($event)\" [disabled]=\"!mySpace.rentData.minTime\">\n            <ion-select-option class=\"ion-text-capitalize\" *ngFor=\"let time of maxTimeList\" [value]=\"time.unit\"> {{time.text}}</ion-select-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row *ngIf=\"mySpace.rent\">\n      <ion-col>\n        <ion-item>\n          <ion-label position=\"stacked\">Costo de Reservación:</ion-label>\n          <ion-input class=\"ion-text-center\" type=\"number\" [value]=\"this.mySpace.rentData.cost\" (ionChange)=\"rentListener($event)\"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label position=\"stacked\">Aforo Máximo</ion-label>\n          <ion-input class=\"ion-text-center\" type=\"number\" [value]=\"this.mySpace.rentData.capacity\" (ionChange)=\"capacityListener($event)\"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngIf=\"mySpace.rent\">\n      <ion-col class=\"ion-text-center\">\n        <p> Dom </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener0($event)\" [checked]=\"dom\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Lun </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener1($event)\" [checked]=\"lun\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Mar </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener2($event)\" [checked]=\"mar\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Mie </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener3($event)\" [checked]=\"mie\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Jue </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener4($event)\" [checked]=\"jue\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Vie </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener5($event)\" [checked]=\"vie\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n      <ion-col class=\"ion-text-center\">\n        <p> Sab </p>\n        <ion-checkbox mode='ios' (ionChange)=\"Listener6($event)\" [checked]=\"sab\" color=\"primary\"></ion-checkbox>\n      </ion-col>\n    </ion-row>\n  \n    <ion-row *ngIf=\"mySpace.rent\">\n      <ion-col>\n        <ion-item (click)=\"selectTime1()\" *ngIf=\"!startTimeSelector1\">\n          <ion-label>Hora Inicio: </ion-label>\n          <ion-label> \n            <ion-text *ngIf=\"mySpace.rentData.starTime\" style=\"font-size: inherit; float: right;\">{{mySpace.rentData.starTime | timeFormat: 'h:mm A'}}</ion-text>\n            <ion-text *ngIf=\"!mySpace.rentData.starTime\" style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit; float: right;\">(Hora Apertura)</ion-text>\n          </ion-label>\n          <ion-button class=\"downArrow\" slot=\"end\" size=\"small\"><ion-icon style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit;\" name=\"caret-down-outline\"></ion-icon></ion-button>\n        </ion-item>\n        <ion-row *ngIf=\"startTimeSelector1\">\n          <ion-col>\n            <ion-label slot=\"start\">Hora Inicio: </ion-label>\n            <ion-datetime #datetime1 style=\"margin: 0 auto;\" presentation=\"time\" [(ngModel)]=\"mySpace.rentData.starTime\" (ionChange)=\"changeStartTime(datetime1.value)\">\n              <ion-buttons slot=\"buttons\">\n                <ion-button color=\"danger\" (click)=\"selectTime1()\">Cancel</ion-button>\n                <ion-button color=\"success\" (click)=\"datetime1.confirm()\">OK</ion-button>\n              </ion-buttons>\n            </ion-datetime>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n      <ion-col>\n        <ion-item (click)=\"selectTime2()\" *ngIf=\"!startTimeSelector2\">\n          <ion-label>Hora Cierre: </ion-label>\n          <ion-label> \n            <ion-text *ngIf=\"mySpace.rentData.endTime\" style=\"font-size: inherit; float: right;\">{{mySpace.rentData.endTime | timeFormat: 'h:mm A'}}</ion-text>\n            <ion-text *ngIf=\"!mySpace.rentData.endTime\" style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit; float: right;\">(Hora Cierre)</ion-text>\n          </ion-label>\n          <ion-button class=\"downArrow\" slot=\"end\" size=\"small\"><ion-icon style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit;\" name=\"caret-down-outline\"></ion-icon></ion-button>\n        </ion-item>\n        <ion-row *ngIf=\"startTimeSelector2\">\n          <ion-col>\n            <ion-label slot=\"start\">Hora Cierre: </ion-label>\n            <ion-datetime #datetime2 style=\"margin: 0 auto;\" presentation=\"time\" [(ngModel)]=\"mySpace.rentData.endTime\" (ionChange)=\"changeEndTime(datetime2.value)\">\n              <ion-buttons slot=\"buttons\">\n                <ion-button color=\"danger\" (click)=\"selectTime2()\">Cancel</ion-button>\n                <ion-button color=\"success\" (click)=\"datetime2.confirm()\">OK</ion-button>\n              </ion-buttons>\n            </ion-datetime>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </ion-list>\n</ion-content>";

/***/ }),

/***/ 94100:
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/spaces/pick-rent-space/pick-rent-space.component.html?ngResource ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button color=\"danger\" [disabled]=\"loading\" (click)=\"modal.dismiss(false)\">\n        Cancelar\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">Nueva Reservación</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\" *ngIf=\"loading\">\n  <app-loading-view></app-loading-view>\n</ion-content>\n\n<app-not-data-yet-message \n  *ngIf=\"rentSpacesList.length == 0 && !loading\"\n  text=\"No tiene espacios aún\" icon=\"alert-circle-outline\"\n></app-not-data-yet-message>\n\n\n<ion-content class=\"ion-padding\"  *ngIf=\"rentSpacesList.length > 0 && !loading\">\n  <ion-list>\n    <ion-row class=\"headerSpaceList\">\n      <ion-col size=\"2\" class=\"ion-text-center\"></ion-col>\n      <ion-col size=\"4\" class=\"ion-text-center\">Espacio</ion-col>\n      <ion-col size=\"3\" class=\"ion-text-center\">Aforo</ion-col>\n      <ion-col size=\"3\" class=\"ion-text-center\">Renta</ion-col>\n    </ion-row>\n    <ion-row class=\"spaceItemList\" *ngFor=\"let space of rentSpacesList\" (click)=\"pickSpace(space)\">\n      <ion-col size=\"2\" class=\"ion-text-center ion-text-capitalize\">\n        <ion-thumbnail>\n          <img [src]=\"space.photo ? space.photo : defaultSpace\">\n        </ion-thumbnail>\n      </ion-col>\n      <ion-col size=\"4\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">{{space.type}} {{space.unitNumber}}</ion-col>\n      <ion-col size=\"3\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">{{space.rentData.capacity}}</ion-col>\n      <ion-col size=\"3\" class=\"ion-text-center ion-padding-top ion-text-capitalize\">\n        {{showCost(space)}}\n        <ion-icon class=\"ion-float-right\" name=\"chevron-forward-outline\"></ion-icon>\n      </ion-col>\n    </ion-row>\n  </ion-list>\n</ion-content>\n";

/***/ }),

/***/ 41809:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/users/edit-user/edit-user.component.html?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-list>\n  <ion-item>\n    <ion-thumbnail *ngIf=\"!newImage\" slot=\"start\" class=\"profileCircle\" (click)=\"addPhoto()\">\n      <img class=\"imageProfile\" src=\"{{user?.photoURL ? user?.photoURL : defaultUser}}\">\n      <div class=\"cameraButton\">\n        <ion-icon name=\"camera-outline\" color=\"light\"></ion-icon>\n      </div>\n    </ion-thumbnail>\n    <ion-thumbnail *ngIf=\"newImage\" slot=\"start\" class=\"profileCircle\">\n      <img src=\"{{newImage.webPath}}\">\n      <ion-spinner class=\"uploadingImage\" size=\"large\" name=\"circles\"></ion-spinner>\n      <ion-progress-bar class=\"loadingImage\" color=\"primary\" [value]=\"progress\"></ion-progress-bar>\n    </ion-thumbnail>\n    <ion-label class=\"ion-text-wrap\">\n      <ion-text color=\"dark\">\n        <ion-card-title>{{userData ? userData.name + ' ' + userData.lastName : 'Cargando'}} <ion-spinner *ngIf=\"!userData\" name=\"dots\"></ion-spinner></ion-card-title>\n      </ion-text>\n      <p>{{user?.email ? user?.email : '_'}}</p>\n      <ion-text color=\"primary\">\n        <p class=\"ion-text-capitalize\">Tipo: {{user?.displayName ? user?.displayName : '_'}}</p>\n      </ion-text>\n    </ion-label>\n    <ion-button slot=\"end\" size=\"small\" color=\"primary\" [disabled]=\"loading\" (click)=\"editForm()\">Guardar</ion-button>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Identificación:</ion-label>\n    <ion-input class=\"ion-text-center\" placeholder=\"Cédula o Pasaporte\" type=\"number\" maxlength=\"10\" (ionChange)=\"CIListener($event)\" [value]=\"myCurrentUser.CI\"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Email:</ion-label>\n    <ion-input class=\"ion-text-center\" type=\"text\" (ionChange)=\"emailListener($event)\" [value]=\"myCurrentUser.email\"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Nombre:</ion-label>\n    <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"Primer Nombre\" (ionChange)=\"nameListener($event)\" [value]=\"myCurrentUser.name\"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>2º Nombre:</ion-label>\n    <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"\" (ionChange)=\"secondNameListener($event)\" [value]=\"myCurrentUser.secondName\"></ion-input>\n  </ion-item>\n  <div class=\"error-message\" *ngIf=\"!myCurrentUser.secondName\">\n    <ion-text class=\"ion-padding-start\" color=\"danger\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  Segundo Nombre Requerido\n    </ion-text>\n  </div>\n\n  <ion-item>\n    <ion-label>Apellido:</ion-label>\n    <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"Primer Apellido\" (ionChange)=\"lastNameListener($event)\" [value]=\"myCurrentUser.lastName\"></ion-input>\n  </ion-item>\n  <div class=\"error-message\" *ngIf=\"!myCurrentUser.lastName\">\n    <ion-text class=\"ion-padding-start\" color=\"danger\"> \n      <ion-icon class=\"vertical-align\" color=\"danger\" name=\"alert-circle-outline\"> </ion-icon>  Nombre Requerido\n    </ion-text>\n  </div>\n\n  <ion-item>\n    <ion-label>2º Apellido:</ion-label>\n    <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"(Opcional)\" (ionChange)=\"secondLastNameListener($event)\" [value]=\"myCurrentUser.secondLastName\"></ion-input>\n  </ion-item>\n\n  <ion-item (click)=\"showCalendar1()\">\n    <ion-label>Fecha de Nacimiento: </ion-label>\n    <ion-label class=\"ion-text-center\"> \n      <ion-text *ngIf=\"myCurrentUser.birthDate\" style=\"font-size: inherit; float: inherit;\">{{myCurrentUser.birthDate | timeFormat: 'DD/MM/YYYY'}}</ion-text>\n      <ion-text *ngIf=\"!myCurrentUser.birthDate\" style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit; float: right;\">(Selección fecha)</ion-text>\n    </ion-label>\n    <ion-button class=\"downArrow\" slot=\"end\" size=\"small\"><ion-icon style=\"--color: #b4b4b4;color: #b4b4b4;font-size: inherit;\" name=\"caret-down-outline\"></ion-icon></ion-button>\n  </ion-item>\n  <ion-row *ngIf=\"showCalendar\">\n    <ion-col>\n      <ion-item>\n        <ion-datetime #datetime style=\"margin: 0 auto;\" (ionChange)=\"changeScheduleTime(datetime.value)\" presentation=\"date\" \n              [(ngModel)]=\"myCurrentUser.birthDate\" >\n          <ion-buttons slot=\"buttons\">\n            <ion-button color=\"danger\" (click)=\"showCalendar1()\">Cancelar</ion-button>\n            <ion-button color=\"success\" (click)=\"datetime.confirm()\">OK</ion-button>\n          </ion-buttons>\n        </ion-datetime>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <ion-item>\n    <ion-label>Teléfono Principal:</ion-label>\n    <ion-input class=\"ion-text-center\" type=\"number\" placeholder=\"Para Emergencias\" (ionChange)=\"phonePersonalListener($event)\" [value]=\"myCurrentUser.phonePersonal\"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Teléfono Secundario:</ion-label>\n    <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"Fijo o Trabajo\" (ionChange)=\"phoneHomeListener($event)\" [value]=\"myCurrentUser.phoneHome\"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Teléfono Contacto:</ion-label>\n    <ion-input class=\"ion-text-center\" type=\"text\" placeholder=\"En caso de que no esté disponible\" (ionChange)=\"phoneWorkListener($event)\" [value]=\"myCurrentUser.phoneWork\"></ion-input>\n  </ion-item>\n\n</ion-list>";

/***/ }),

/***/ 14372:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/users/item-user/item-user.component.html?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-row class=\"userItemList\">\n  <ion-col size=\"3\" class=\"ion-text-center ion-text-capitalize\">{{user.name}} {{user.lastName}}</ion-col>\n  <ion-col size=\"3\" class=\"ion-text-center ion-text-capitalize\">{{ this.user.leases?.length>0 ?\n    this.user.leases[0].spaceLease.type+' '+this.user.leases[0].spaceLease.unitNumber: '_'}} \n    {{ this.user.leases?.length>1?'(+'+(this.user.leases.length-1)+')':''}}</ion-col>\n  <ion-col size=\"4\" class=\"ion-text-center\">{{user.email}}</ion-col>\n  <ion-col size=\"2\" class=\"ion-text-center ion-text-capitalize\">\n    <ion-text *ngIf=\"user.type == 'residente'\" color=\"success\">{{user.type}}</ion-text>\n    <ion-text *ngIf=\"user.type == 'empleado'\" color=\"tertiary\">Staff</ion-text>\n    <ion-text *ngIf=\"user.type == 'administrador'\" color=\"secondary\">Admin</ion-text>\n    <ion-icon class=\"ion-float-right\" name=\"chevron-forward-outline\"></ion-icon>\n  </ion-col>\n</ion-row>";

/***/ }),

/***/ 97718:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/users/user-detail/user-detail.component.html?ngResource ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-list>\n  <ion-item>\n    <ion-thumbnail *ngIf=\"!newImage\" slot=\"start\" class=\"profileCircle\" (click)=\"addPhoto()\">\n      <img class=\"imageProfile\" src=\"{{userData?.photo ? userData?.photo : defaultUser}}\">\n      <div class=\"cameraButton\" *ngIf=\"user\">\n        <ion-icon name=\"camera-outline\" color=\"light\"></ion-icon>\n      </div>\n    </ion-thumbnail>\n    <ion-thumbnail *ngIf=\"newImage\" slot=\"start\" class=\"profileCircle\">\n      <img src=\"{{newImage.webPath}}\">\n      <ion-spinner class=\"uploadingImage\" size=\"large\" name=\"circles\"></ion-spinner>\n      <ion-progress-bar class=\"loadingImage\" color=\"primary\" [value]=\"progress\"></ion-progress-bar>\n    </ion-thumbnail>\n    <ion-label class=\"ion-text-wrap\">\n      <ion-text color=\"dark\">\n        <ion-card-title>{{userData ? userData.name + ' ' + userData.lastName : 'Cargando'}} <ion-spinner *ngIf=\"!userData\" name=\"dots\"></ion-spinner></ion-card-title>\n      </ion-text>\n      <p>{{userData?.email ? userData.email : '_'}}</p>\n      <ion-text color=\"primary\">\n        <p class=\"ion-text-capitalize\">Tipo: {{userData?.type ? userData.type : '_'}}</p>\n      </ion-text>\n    </ion-label>\n    <ion-button size=\"small\" color=\"secondary\"  *ngIf=\"!edit && editDataForm\"\n    [disabled]=\"loading\" (click)=\"userCtrl.editUser()\">Editar</ion-button>\n  </ion-item>\n  <ion-row>\n    <ion-col>\n      <ion-item>\n        <ion-label> <ion-text class=\"title\">Identificación:</ion-text> {{userData?.CI}}</ion-label>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item>\n        <ion-label> <ion-text class=\"title\">Fecha de Nacimiento:</ion-text> {{userData?.birthDate | timeFormat: 'DD/MM/YYYY'}}</ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col>\n      <ion-item>\n        <ion-label> <ion-text class=\"title\">Nombre:</ion-text> {{userData?.name}}</ion-label>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item>\n        <ion-label> <ion-text class=\"title\">Segundo Nombre:</ion-text> {{userData?.secondName}}</ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col>\n      <ion-item>\n        <ion-label> <ion-text class=\"title\">Apellido:</ion-text> {{userData?.lastName}}</ion-label>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item>\n        <ion-label> <ion-text class=\"title\">Segundo Apellido:</ion-text> {{userData?.secondLastName}}</ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col>\n      <ion-item>\n        <ion-label> <ion-text class=\"title\">Email:</ion-text> {{userData?.email}}</ion-label>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item>\n        <ion-label> <ion-text class=\"title\">Teléfono Principal:</ion-text> {{userData?.phonePersonal}}</ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col>\n      <ion-item>\n        <ion-label> <ion-text class=\"title\">Teléfono Secundario:</ion-text> {{userData?.phoneHome?userData?.phoneHome:'N/D'}}</ion-label>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item>\n        <ion-label> <ion-text class=\"title\">Teléfono Contacto:</ion-text> {{userData?.phoneWork?userData?.phoneWork:'N/D'}}</ion-label>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <div *ngIf=\"userData.leases?.length > 0\">\n    <ion-list-header>\n      <ion-label>Espacios Asignados:</ion-label>\n    </ion-list-header>\n    <app-item-space *ngFor=\"let space of userData.leases\" [space]=\"space.spaceLease\" [profileView]=\"true\" (click)=\"detailSpace(space)\">\n    </app-item-space>\n  </div>\n</ion-list>";

/***/ }),

/***/ 6050:
/*!*********************************************************************************************!*\
  !*** ./src/app/shared/components/users/user-profile/user-profile.component.html?ngResource ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-card *ngIf=\"user\">\n  <ion-item>\n    <ion-avatar slot=\"start\" class=\"profileCircle\">\n      <img src=\"{{user?.photo ? user?.photo : defaultUser}}\">\n    </ion-avatar>\n    <ion-label>\n      <h2>{{user.name}} {{user.lastName}}</h2>\n      <ion-text color=\"secondary\"><p>{{user.email}}</p></ion-text>\n    </ion-label>\n  </ion-item>\n</ion-card>\n\n<ion-card *ngIf=\"shortUser\">\n  <ion-item>\n    <ion-avatar slot=\"start\" class=\"profileCircle\">\n      <img src=\"{{shortUser?.photo ? shortUser.photo : defaultUser}}\">\n    </ion-avatar>\n    <ion-label>\n      <h2>{{shortUser.name}}</h2>\n      <ion-text color=\"secondary\"><p>{{shortUser.email}}</p></ion-text>\n    </ion-label>\n  </ion-item>\n</ion-card>";

/***/ }),

/***/ 14557:
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/view/big-button/big-button.component.html?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-row [ngSwitch]=\"buttonType\" class=\"rowStyle\">\n  <ion-button *ngSwitchDefault class='buttonStyle' color=\"primary\" [disabled]=\"disabled\">\n    <ion-label>\n      <ion-spinner *ngIf=\"loading\" style=\"margin-left: 10px;\" color=\"light\" name=\"dots\"></ion-spinner>\n      <ion-text *ngIf=\"!loading\" class=\"ion-text-uppercase\" color=\"light\">{{LABEL}}</ion-text>\n    </ion-label>\n  </ion-button>\n  \n  <ion-button *ngSwitchCase=\"'SECONDARY'\" class='buttonStyle' color=\"secondary\" [disabled]=\"disabled\">\n    <ion-label>\n      <ion-spinner *ngIf=\"loading\" style=\"margin-left: 10px;\" color=\"light\" name=\"dots\"></ion-spinner>\n      <ion-text *ngIf=\"!loading\" class=\"ion-text-uppercase\" color=\"light\">{{LABEL}}</ion-text>\n    </ion-label>\n  </ion-button> \n\n  <ion-button *ngSwitchCase=\"'RED'\" class='buttonStyle' color=\"danger\" [disabled]=\"disabled\">\n    <ion-label>\n      <ion-spinner *ngIf=\"loading\" style=\"margin-left: 10px;\" color=\"light\" name=\"dots\"></ion-spinner>\n      <ion-text *ngIf=\"!loading\" class=\"ion-text-uppercase\" color=\"light\">{{LABEL}}</ion-text>\n    </ion-label>\n  </ion-button> \n\n  <ion-button *ngSwitchCase=\"'GRAY'\" class='buttonStyle' color=\"medium\" [disabled]=\"disabled\">\n    <ion-label>\n      <ion-spinner *ngIf=\"loading\" style=\"margin-left: 10px;\" color=\"dark\" name=\"dots\"></ion-spinner>\n      <ion-text *ngIf=\"!loading\" class=\"ion-text-uppercase\" color=\"dark\">{{LABEL}}</ion-text>\n    </ion-label>\n  </ion-button> \n\n  <ion-button *ngSwitchCase=\"'SUCCESS'\" class='buttonStyle' color=\"success\" [disabled]=\"disabled\">\n    <ion-label>\n      <ion-spinner *ngIf=\"loading\" style=\"margin-left: 10px;\" color=\"light\" name=\"dots\"></ion-spinner>\n      <ion-text *ngIf=\"!loading\" class=\"ion-text-uppercase\" color=\"light\">{{LABEL}}</ion-text>\n    </ion-label>\n  </ion-button> \n</ion-row>";

/***/ }),

/***/ 14659:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/view/detail-header/detail-header.component.html?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-toolbar mode=\"ios\">\n  <ion-buttons slot=\"start\" (click)=\"goBack()\" *ngIf=\"!backButton.modal\">\n    <ion-icon *ngIf=\"backButton.icon\" style=\"font-size: 16pt;\" name=\"{{backButton.icon?backButton.icon:'chevron-back-outline'}}\"></ion-icon> {{endButton.text}}\n    <ion-text class=\"ion-text-capitalize\">{{backButton.text ? backButton.text : 'Regresar'}}</ion-text>\n  </ion-buttons>\n  <ion-buttons slot=\"start\" *ngIf=\"backButton.modal\" (click)=\"modal.dismiss()\">\n    <ion-button>\n      <ion-text class=\"ion-text-capitalize\">{{backButton.text ? backButton.text : 'Atrás'}}</ion-text>\n    </ion-button>\n  </ion-buttons>\n  <ion-title class=\"ion-text-uppercase\">{{title}}</ion-title>\n  <ion-buttons slot=\"end\" *ngIf=\"endButton.show\">\n    <ion-button>\n      <ion-icon *ngIf=\"endButton.icon\" style=\"font-size: 16pt;\" name=\"{{endButton.icon}}\"></ion-icon> {{endButton.text}}\n    </ion-button>\n  </ion-buttons>\n</ion-toolbar>";

/***/ }),

/***/ 7621:
/*!********************************************************************************************!*\
  !*** ./src/app/shared/components/view/image-loader/image-loader.component.html?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-card *ngIf=\"platform !== 'web'\">\n  <ion-row>\n      <ion-col size=\"5\">\n          <div class=\"rect-img-container\">\n              <img class=\"rect-img\" [src]=\"notice.photo\" alt=\"\">\n          </div>\n      </ion-col>\n      <ion-col size=\"7\" class=\"ion-text-center\">\n          <ion-text class=\"ion-text-uppercase\" color=\"tertiary\">\n              <p>{{notice.type.name}}<ion-icon color=\"tertiary\" [name]=\"notice.type.icon\"></ion-icon></p>\n          </ion-text>\n          <ion-text class=\"ion-text-capitalized\" color=\"dark\">\n              <h3>{{notice.title}}</h3>\n          </ion-text>\n      </ion-col>\n  </ion-row>\n  <app-notice-bottom-bar [likes]=\"notice.likes.length\" [comments]=\"notice.comments.length\" [notice]=\"notice\" [userUID]=\"user.uid\"></app-notice-bottom-bar>\n</ion-card>\n<ion-item detail  *ngIf=\"platform === 'web'\">\n  <ion-thumbnail slot=\"start\">\n    <img [src]=\"notice.photo\" />\n  </ion-thumbnail>\n  <ion-label>\n    <ion-text class=\"ion-text-uppercase\" color=\"tertiary\">\n        <p>{{notice.type.name}}<ion-icon color=\"tertiary\" [name]=\"notice.type.icon\"></ion-icon></p>\n    </ion-text>\n    <h3>{{notice.title}}</h3>\n  </ion-label>\n</ion-item>";

/***/ }),

/***/ 70404:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/view/image-preview/image-preview.component.html?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = "<p>\n  image-preview works!\n</p>\n";

/***/ }),

/***/ 93372:
/*!********************************************************************************************!*\
  !*** ./src/app/shared/components/view/loading-view/loading-view.component.html?ngResource ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-grid>\n  <ion-row>\n    <ion-col>\n      <div class=\"ion-text-center\">\n        <ion-spinner name=\"circles\" color=\"primary\"></ion-spinner>\n        <h3>Cargando...</h3>\n      </div>\n    </ion-col>\n  </ion-row>\n</ion-grid>";

/***/ }),

/***/ 55229:
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/view/main-header/main-header.component.html?ngResource ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\" *ngIf=\"title === 'Mi Perfil' && userCtrl.edit\">\n      <ion-button color=\"danger\" (click)=\"userCtrl.editUser()\">\n        Cancelar\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-uppercase\">{{title}}</ion-title>\n    <ion-buttons [ngSwitch]=\"title\" slot=\"end\">\n      <div *ngSwitchCase=\"'Mi Perfil'\" >\n        <ion-button *ngIf=\"!userCtrl.edit\" color=\"danger\" (click)=\"cerrarSesion()\">\n          Cerrar Sesión\n        </ion-button>\n      </div>\n      <ion-button *ngSwitchCase=\"'Usuarios'\" (click)=\"goProfile()\">\n        Mi Perfil\n      </ion-button>\n      <ion-button *ngSwitchCase=\"'Anuncios'\" (click)=\"createNotice()\">\n        Nuevo Anuncio\n      </ion-button>\n      <ion-button *ngSwitchCase=\"'Servicios'\" (click)=\"goProfile()\">\n        Agenda\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>";

/***/ }),

/***/ 95095:
/*!************************************************************************************************************!*\
  !*** ./src/app/shared/components/view/not-data-yet-message/not-data-yet-message.component.html?ngResource ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"positionTop\">\n  <ion-row>\n    <div class=\"ion-text-center positionTop\">\n      <ion-icon name=\"{{icon ? icon:'information-circle-outline'}}\"></ion-icon>\n    </div>\n  </ion-row>\n  <ion-row>\n    <div class=\"ion-text-center ion-text-uppercase positionTop\">{{text}}</div>\n  </ion-row>\n</div>";

/***/ }),

/***/ 63152:
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/view/notice-bottom-bar/notice-bottom-bar.component.html?ngResource ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-row>\n  <ion-col class=\"ion-text-center\">\n    <div (click)=\"addLike()\">\n      <ion-icon *ngIf=\"!this.myLike\" name=\"bulb-outline\"></ion-icon>\n      <ion-icon *ngIf=\"this.myLike\" color=\"primary\" name=\"bulb\"></ion-icon>\n      Me Importa {{notice.likes.length}}\n    </div>\n  </ion-col>\n  <ion-col class=\"ion-text-center\">\n    <ion-icon name=\"chatbubble-ellipses-outline\"></ion-icon> Comentarios {{notice.comments.length}}\n  </ion-col>\n</ion-row>";

/***/ }),

/***/ 47354:
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/view/sign-modal/sign-modal.component.html?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-toolbar>\n  <ion-title class=\"selector-title\">Recibo {{myReceipt.receiptNumber}}</ion-title>\n  <ion-buttons slot=\"end\" *ngIf=\"!loading\">\n    <ion-button slot=\"end\" fill=\"clear\" (click)=\"dismiss()\">\n      <ion-icon color=\"dark\" class=\"selector-title\" slot=\"icon-only\" name=\"close-outline\"></ion-icon>\n    </ion-button>\n  </ion-buttons>\n</ion-toolbar>\n<ion-content>\n  <div class=\"body\">\n    <canvas #sPad class=\"separator\"></canvas>\n    <ion-row><ion-col class=\"ion-text-center\">Firme aquí</ion-col></ion-row>\n    <ion-item class=\"separator\">\n      <ion-label>Recibo de:</ion-label>\n      <ion-input type=\"text\" placeholder=\"(Obligatorio) Persona que paga\" [value]=\"myReceipt.payerName\" (ionChange)=\"nameListener($event)\"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Total: {{myReceipt.total}}$</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>Residente: {{myReceipt.userName}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>Recibo del Mes: {{myReceipt.receiptDate | timeFormat: 'MonthDisplay'}}</ion-label>\n    </ion-item>\n    <ion-progress-bar  *ngIf=\"progress>0\" [value]=\"progress\"></ion-progress-bar>\n    <app-loading-view *ngIf=\"loading\"></app-loading-view>\n    <div class=\"ion-text-center\" *ngIf=\"!loading\">\n      <ion-button (click)=\"cancel()\" color=\"danger\">\n        <ion-text color=\"light\">Cancelar</ion-text>\n      </ion-button>\n  \n      <ion-button (click)=\"saveData()\" [disabled]=\"!myReceipt.payerName || this.signaturePad.isEmpty()\" class=\"ion-margin-start\">\n        <ion-text color=\"light\">Enviar</ion-text>\n      </ion-button>\n    </div>\n  </div>\n</ion-content>";

/***/ }),

/***/ 59585:
/*!************************************************************************************************!*\
  !*** ./src/app/shared/components/view/status-request/status-request.component.html?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = "<p>Status: \n  <ion-text *ngIf=\"status == 'Solicitado'\" color=\"secondary\">Solicitado</ion-text>\n  <ion-text *ngIf=\"status == 'Agendado'\" color=\"tertiary\">Agendado</ion-text>\n  <ion-text *ngIf=\"status == 'En Progreso'\" color=\"warning\">En Progreso</ion-text>\n  <ion-text *ngIf=\"status == 'Aprobado'\" color=\"success\">Aprobado</ion-text>\n  <ion-text *ngIf=\"status == 'Cancelado'\" color=\"danger\">Cancelado</ion-text>\n  <ion-text *ngIf=\"status == 'Terminado'\" color=\"primary\">Terminado</ion-text>\n</p>";

/***/ }),

/***/ 46123:
/*!***************************************!*\
  !*** ./node_modules/dom7/dom7.esm.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "addClass": () => (/* binding */ addClass),
/* harmony export */   "animate": () => (/* binding */ animate),
/* harmony export */   "animationEnd": () => (/* binding */ animationEnd),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "appendTo": () => (/* binding */ appendTo),
/* harmony export */   "attr": () => (/* binding */ attr),
/* harmony export */   "blur": () => (/* binding */ blur),
/* harmony export */   "change": () => (/* binding */ change),
/* harmony export */   "children": () => (/* binding */ children),
/* harmony export */   "click": () => (/* binding */ click),
/* harmony export */   "closest": () => (/* binding */ closest),
/* harmony export */   "css": () => (/* binding */ css),
/* harmony export */   "data": () => (/* binding */ data),
/* harmony export */   "dataset": () => (/* binding */ dataset),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "detach": () => (/* binding */ detach),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "eq": () => (/* binding */ eq),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "focus": () => (/* binding */ focus),
/* harmony export */   "focusin": () => (/* binding */ focusin),
/* harmony export */   "focusout": () => (/* binding */ focusout),
/* harmony export */   "hasClass": () => (/* binding */ hasClass),
/* harmony export */   "height": () => (/* binding */ height),
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "html": () => (/* binding */ html),
/* harmony export */   "index": () => (/* binding */ index),
/* harmony export */   "insertAfter": () => (/* binding */ insertAfter),
/* harmony export */   "insertBefore": () => (/* binding */ insertBefore),
/* harmony export */   "is": () => (/* binding */ is),
/* harmony export */   "keydown": () => (/* binding */ keydown),
/* harmony export */   "keypress": () => (/* binding */ keypress),
/* harmony export */   "keyup": () => (/* binding */ keyup),
/* harmony export */   "mousedown": () => (/* binding */ mousedown),
/* harmony export */   "mouseenter": () => (/* binding */ mouseenter),
/* harmony export */   "mouseleave": () => (/* binding */ mouseleave),
/* harmony export */   "mousemove": () => (/* binding */ mousemove),
/* harmony export */   "mouseout": () => (/* binding */ mouseout),
/* harmony export */   "mouseover": () => (/* binding */ mouseover),
/* harmony export */   "mouseup": () => (/* binding */ mouseup),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "nextAll": () => (/* binding */ nextAll),
/* harmony export */   "off": () => (/* binding */ off),
/* harmony export */   "offset": () => (/* binding */ offset),
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "outerHeight": () => (/* binding */ outerHeight),
/* harmony export */   "outerWidth": () => (/* binding */ outerWidth),
/* harmony export */   "parent": () => (/* binding */ parent),
/* harmony export */   "parents": () => (/* binding */ parents),
/* harmony export */   "prepend": () => (/* binding */ prepend),
/* harmony export */   "prependTo": () => (/* binding */ prependTo),
/* harmony export */   "prev": () => (/* binding */ prev),
/* harmony export */   "prevAll": () => (/* binding */ prevAll),
/* harmony export */   "prop": () => (/* binding */ prop),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "removeAttr": () => (/* binding */ removeAttr),
/* harmony export */   "removeClass": () => (/* binding */ removeClass),
/* harmony export */   "removeData": () => (/* binding */ removeData),
/* harmony export */   "resize": () => (/* binding */ resize),
/* harmony export */   "scroll": () => (/* binding */ scroll),
/* harmony export */   "scrollLeft": () => (/* binding */ scrollLeft),
/* harmony export */   "scrollTo": () => (/* binding */ scrollTo),
/* harmony export */   "scrollTop": () => (/* binding */ scrollTop),
/* harmony export */   "show": () => (/* binding */ show),
/* harmony export */   "siblings": () => (/* binding */ siblings),
/* harmony export */   "stop": () => (/* binding */ stop),
/* harmony export */   "styles": () => (/* binding */ styles),
/* harmony export */   "submit": () => (/* binding */ submit),
/* harmony export */   "text": () => (/* binding */ text),
/* harmony export */   "toggleClass": () => (/* binding */ toggleClass),
/* harmony export */   "touchend": () => (/* binding */ touchend),
/* harmony export */   "touchmove": () => (/* binding */ touchmove),
/* harmony export */   "touchstart": () => (/* binding */ touchstart),
/* harmony export */   "transform": () => (/* binding */ transform),
/* harmony export */   "transition": () => (/* binding */ transition),
/* harmony export */   "transitionEnd": () => (/* binding */ transitionEnd),
/* harmony export */   "trigger": () => (/* binding */ trigger),
/* harmony export */   "val": () => (/* binding */ val),
/* harmony export */   "value": () => (/* binding */ value),
/* harmony export */   "width": () => (/* binding */ width)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/**
 * Dom7 4.0.4
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * https://framework7.io/docs/dom7.html
 *
 * Copyright 2022, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: January 11, 2022
 */

/* eslint-disable no-proto */

function makeReactive(obj) {
  const proto = obj.__proto__;
  Object.defineProperty(obj, '__proto__', {
    get() {
      return proto;
    },

    set(value) {
      proto.__proto__ = value;
    }

  });
}

class Dom7 extends Array {
  constructor(items) {
    if (typeof items === 'number') {
      super(items);
    } else {
      super(...(items || []));
      makeReactive(this);
    }
  }

}

function arrayFlat(arr = []) {
  const res = [];
  arr.forEach(el => {
    if (Array.isArray(el)) {
      res.push(...arrayFlat(el));
    } else {
      res.push(el);
    }
  });
  return res;
}

function arrayFilter(arr, callback) {
  return Array.prototype.filter.call(arr, callback);
}

function arrayUnique(arr) {
  const uniqueArray = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
  }

  return uniqueArray;
}

function toCamelCase(string) {
  return string.toLowerCase().replace(/-(.)/g, (match, group) => group.toUpperCase());
} // eslint-disable-next-line


function qsa(selector, context) {
  if (typeof selector !== 'string') {
    return [selector];
  }

  const a = [];
  const res = context.querySelectorAll(selector);

  for (let i = 0; i < res.length; i += 1) {
    a.push(res[i]);
  }

  return a;
}

function $(selector, context) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  let arr = [];

  if (!context && selector instanceof Dom7) {
    return selector;
  }

  if (!selector) {
    return new Dom7(arr);
  }

  if (typeof selector === 'string') {
    const html = selector.trim();

    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
      let toCreate = 'div';
      if (html.indexOf('<li') === 0) toCreate = 'ul';
      if (html.indexOf('<tr') === 0) toCreate = 'tbody';
      if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
      if (html.indexOf('<tbody') === 0) toCreate = 'table';
      if (html.indexOf('<option') === 0) toCreate = 'select';
      const tempParent = document.createElement(toCreate);
      tempParent.innerHTML = html;

      for (let i = 0; i < tempParent.childNodes.length; i += 1) {
        arr.push(tempParent.childNodes[i]);
      }
    } else {
      arr = qsa(selector.trim(), context || document);
    } // arr = qsa(selector, document);

  } else if (selector.nodeType || selector === window || selector === document) {
    arr.push(selector);
  } else if (Array.isArray(selector)) {
    if (selector instanceof Dom7) return selector;
    arr = selector;
  }

  return new Dom7(arrayUnique(arr));
}

$.fn = Dom7.prototype; // eslint-disable-next-line

function addClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  this.forEach(el => {
    el.classList.add(...classNames);
  });
  return this;
}

function removeClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  this.forEach(el => {
    el.classList.remove(...classNames);
  });
  return this;
}

function toggleClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  this.forEach(el => {
    classNames.forEach(className => {
      el.classList.toggle(className);
    });
  });
}

function hasClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  return arrayFilter(this, el => {
    return classNames.filter(className => el.classList.contains(className)).length > 0;
  }).length > 0;
}

function attr(attrs, value) {
  if (arguments.length === 1 && typeof attrs === 'string') {
    // Get attr
    if (this[0]) return this[0].getAttribute(attrs);
    return undefined;
  } // Set attrs


  for (let i = 0; i < this.length; i += 1) {
    if (arguments.length === 2) {
      // String
      this[i].setAttribute(attrs, value);
    } else {
      // Object
      for (const attrName in attrs) {
        this[i][attrName] = attrs[attrName];
        this[i].setAttribute(attrName, attrs[attrName]);
      }
    }
  }

  return this;
}

function removeAttr(attr) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].removeAttribute(attr);
  }

  return this;
}

function prop(props, value) {
  if (arguments.length === 1 && typeof props === 'string') {
    // Get prop
    if (this[0]) return this[0][props];
  } else {
    // Set props
    for (let i = 0; i < this.length; i += 1) {
      if (arguments.length === 2) {
        // String
        this[i][props] = value;
      } else {
        // Object
        for (const propName in props) {
          this[i][propName] = props[propName];
        }
      }
    }

    return this;
  }

  return this;
}

function data(key, value) {
  let el;

  if (typeof value === 'undefined') {
    el = this[0];
    if (!el) return undefined; // Get value

    if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
      return el.dom7ElementDataStorage[key];
    }

    const dataKey = el.getAttribute(`data-${key}`);

    if (dataKey) {
      return dataKey;
    }

    return undefined;
  } // Set value


  for (let i = 0; i < this.length; i += 1) {
    el = this[i];
    if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
    el.dom7ElementDataStorage[key] = value;
  }

  return this;
}

function removeData(key) {
  for (let i = 0; i < this.length; i += 1) {
    const el = this[i];

    if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
      el.dom7ElementDataStorage[key] = null;
      delete el.dom7ElementDataStorage[key];
    }
  }
}

function dataset() {
  const el = this[0];
  if (!el) return undefined;
  const dataset = {}; // eslint-disable-line

  if (el.dataset) {
    for (const dataKey in el.dataset) {
      dataset[dataKey] = el.dataset[dataKey];
    }
  } else {
    for (let i = 0; i < el.attributes.length; i += 1) {
      const attr = el.attributes[i];

      if (attr.name.indexOf('data-') >= 0) {
        dataset[toCamelCase(attr.name.split('data-')[1])] = attr.value;
      }
    }
  }

  for (const key in dataset) {
    if (dataset[key] === 'false') dataset[key] = false;else if (dataset[key] === 'true') dataset[key] = true;else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] *= 1;
  }

  return dataset;
}

function val(value) {
  if (typeof value === 'undefined') {
    // get value
    const el = this[0];
    if (!el) return undefined;

    if (el.multiple && el.nodeName.toLowerCase() === 'select') {
      const values = [];

      for (let i = 0; i < el.selectedOptions.length; i += 1) {
        values.push(el.selectedOptions[i].value);
      }

      return values;
    }

    return el.value;
  } // set value


  for (let i = 0; i < this.length; i += 1) {
    const el = this[i];

    if (Array.isArray(value) && el.multiple && el.nodeName.toLowerCase() === 'select') {
      for (let j = 0; j < el.options.length; j += 1) {
        el.options[j].selected = value.indexOf(el.options[j].value) >= 0;
      }
    } else {
      el.value = value;
    }
  }

  return this;
}

function value(value) {
  return this.val(value);
}

function transform(transform) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].style.transform = transform;
  }

  return this;
}

function transition(duration) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].style.transitionDuration = typeof duration !== 'string' ? `${duration}ms` : duration;
  }

  return this;
}

function on(...args) {
  let [eventType, targetSelector, listener, capture] = args;

  if (typeof args[1] === 'function') {
    [eventType, listener, capture] = args;
    targetSelector = undefined;
  }

  if (!capture) capture = false;

  function handleLiveEvent(e) {
    const target = e.target;
    if (!target) return;
    const eventData = e.target.dom7EventData || [];

    if (eventData.indexOf(e) < 0) {
      eventData.unshift(e);
    }

    if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
      const parents = $(target).parents(); // eslint-disable-line

      for (let k = 0; k < parents.length; k += 1) {
        if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
      }
    }
  }

  function handleEvent(e) {
    const eventData = e && e.target ? e.target.dom7EventData || [] : [];

    if (eventData.indexOf(e) < 0) {
      eventData.unshift(e);
    }

    listener.apply(this, eventData);
  }

  const events = eventType.split(' ');
  let j;

  for (let i = 0; i < this.length; i += 1) {
    const el = this[i];

    if (!targetSelector) {
      for (j = 0; j < events.length; j += 1) {
        const event = events[j];
        if (!el.dom7Listeners) el.dom7Listeners = {};
        if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
        el.dom7Listeners[event].push({
          listener,
          proxyListener: handleEvent
        });
        el.addEventListener(event, handleEvent, capture);
      }
    } else {
      // Live events
      for (j = 0; j < events.length; j += 1) {
        const event = events[j];
        if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
        if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
        el.dom7LiveListeners[event].push({
          listener,
          proxyListener: handleLiveEvent
        });
        el.addEventListener(event, handleLiveEvent, capture);
      }
    }
  }

  return this;
}

function off(...args) {
  let [eventType, targetSelector, listener, capture] = args;

  if (typeof args[1] === 'function') {
    [eventType, listener, capture] = args;
    targetSelector = undefined;
  }

  if (!capture) capture = false;
  const events = eventType.split(' ');

  for (let i = 0; i < events.length; i += 1) {
    const event = events[i];

    for (let j = 0; j < this.length; j += 1) {
      const el = this[j];
      let handlers;

      if (!targetSelector && el.dom7Listeners) {
        handlers = el.dom7Listeners[event];
      } else if (targetSelector && el.dom7LiveListeners) {
        handlers = el.dom7LiveListeners[event];
      }

      if (handlers && handlers.length) {
        for (let k = handlers.length - 1; k >= 0; k -= 1) {
          const handler = handlers[k];

          if (listener && handler.listener === listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          } else if (!listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          }
        }
      }
    }
  }

  return this;
}

function once(...args) {
  const dom = this;
  let [eventName, targetSelector, listener, capture] = args;

  if (typeof args[1] === 'function') {
    [eventName, listener, capture] = args;
    targetSelector = undefined;
  }

  function onceHandler(...eventArgs) {
    listener.apply(this, eventArgs);
    dom.off(eventName, targetSelector, onceHandler, capture);

    if (onceHandler.dom7proxy) {
      delete onceHandler.dom7proxy;
    }
  }

  onceHandler.dom7proxy = listener;
  return dom.on(eventName, targetSelector, onceHandler, capture);
}

function trigger(...args) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  const events = args[0].split(' ');
  const eventData = args[1];

  for (let i = 0; i < events.length; i += 1) {
    const event = events[i];

    for (let j = 0; j < this.length; j += 1) {
      const el = this[j];

      if (window.CustomEvent) {
        const evt = new window.CustomEvent(event, {
          detail: eventData,
          bubbles: true,
          cancelable: true
        });
        el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
  }

  return this;
}

function transitionEnd(callback) {
  const dom = this;

  function fireCallBack(e) {
    if (e.target !== this) return;
    callback.call(this, e);
    dom.off('transitionend', fireCallBack);
  }

  if (callback) {
    dom.on('transitionend', fireCallBack);
  }

  return this;
}

function animationEnd(callback) {
  const dom = this;

  function fireCallBack(e) {
    if (e.target !== this) return;
    callback.call(this, e);
    dom.off('animationend', fireCallBack);
  }

  if (callback) {
    dom.on('animationend', fireCallBack);
  }

  return this;
}

function width() {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();

  if (this[0] === window) {
    return window.innerWidth;
  }

  if (this.length > 0) {
    return parseFloat(this.css('width'));
  }

  return null;
}

function outerWidth(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      const styles = this.styles();
      return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
    }

    return this[0].offsetWidth;
  }

  return null;
}

function height() {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();

  if (this[0] === window) {
    return window.innerHeight;
  }

  if (this.length > 0) {
    return parseFloat(this.css('height'));
  }

  return null;
}

function outerHeight(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      const styles = this.styles();
      return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
    }

    return this[0].offsetHeight;
  }

  return null;
}

function offset() {
  if (this.length > 0) {
    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
    const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
    const el = this[0];
    const box = el.getBoundingClientRect();
    const body = document.body;
    const clientTop = el.clientTop || body.clientTop || 0;
    const clientLeft = el.clientLeft || body.clientLeft || 0;
    const scrollTop = el === window ? window.scrollY : el.scrollTop;
    const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  }

  return null;
}

function hide() {
  for (let i = 0; i < this.length; i += 1) {
    this[i].style.display = 'none';
  }

  return this;
}

function show() {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();

  for (let i = 0; i < this.length; i += 1) {
    const el = this[i];

    if (el.style.display === 'none') {
      el.style.display = '';
    }

    if (window.getComputedStyle(el, null).getPropertyValue('display') === 'none') {
      // Still not visible
      el.style.display = 'block';
    }
  }

  return this;
}

function styles() {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  if (this[0]) return window.getComputedStyle(this[0], null);
  return {};
}

function css(props, value) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  let i;

  if (arguments.length === 1) {
    if (typeof props === 'string') {
      // .css('width')
      if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
    } else {
      // .css({ width: '100px' })
      for (i = 0; i < this.length; i += 1) {
        for (const prop in props) {
          this[i].style[prop] = props[prop];
        }
      }

      return this;
    }
  }

  if (arguments.length === 2 && typeof props === 'string') {
    // .css('width', '100px')
    for (i = 0; i < this.length; i += 1) {
      this[i].style[props] = value;
    }

    return this;
  }

  return this;
}

function each(callback) {
  if (!callback) return this;
  this.forEach((el, index) => {
    callback.apply(el, [el, index]);
  });
  return this;
}

function filter(callback) {
  const result = arrayFilter(this, callback);
  return $(result);
}

function html(html) {
  if (typeof html === 'undefined') {
    return this[0] ? this[0].innerHTML : null;
  }

  for (let i = 0; i < this.length; i += 1) {
    this[i].innerHTML = html;
  }

  return this;
}

function text(text) {
  if (typeof text === 'undefined') {
    return this[0] ? this[0].textContent.trim() : null;
  }

  for (let i = 0; i < this.length; i += 1) {
    this[i].textContent = text;
  }

  return this;
}

function is(selector) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  const el = this[0];
  let compareWith;
  let i;
  if (!el || typeof selector === 'undefined') return false;

  if (typeof selector === 'string') {
    if (el.matches) return el.matches(selector);
    if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
    if (el.msMatchesSelector) return el.msMatchesSelector(selector);
    compareWith = $(selector);

    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) return true;
    }

    return false;
  }

  if (selector === document) {
    return el === document;
  }

  if (selector === window) {
    return el === window;
  }

  if (selector.nodeType || selector instanceof Dom7) {
    compareWith = selector.nodeType ? [selector] : selector;

    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) return true;
    }

    return false;
  }

  return false;
}

function index() {
  let child = this[0];
  let i;

  if (child) {
    i = 0; // eslint-disable-next-line

    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }

    return i;
  }

  return undefined;
}

function eq(index) {
  if (typeof index === 'undefined') return this;
  const length = this.length;

  if (index > length - 1) {
    return $([]);
  }

  if (index < 0) {
    const returnIndex = length + index;
    if (returnIndex < 0) return $([]);
    return $([this[returnIndex]]);
  }

  return $([this[index]]);
}

function append(...els) {
  let newChild;
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();

  for (let k = 0; k < els.length; k += 1) {
    newChild = els[k];

    for (let i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;

        while (tempDiv.firstChild) {
          this[i].appendChild(tempDiv.firstChild);
        }
      } else if (newChild instanceof Dom7) {
        for (let j = 0; j < newChild.length; j += 1) {
          this[i].appendChild(newChild[j]);
        }
      } else {
        this[i].appendChild(newChild);
      }
    }
  }

  return this;
}

function appendTo(parent) {
  $(parent).append(this);
  return this;
}

function prepend(newChild) {
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  let i;
  let j;

  for (i = 0; i < this.length; i += 1) {
    if (typeof newChild === 'string') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = newChild;

      for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
        this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
      }
    } else if (newChild instanceof Dom7) {
      for (j = 0; j < newChild.length; j += 1) {
        this[i].insertBefore(newChild[j], this[i].childNodes[0]);
      }
    } else {
      this[i].insertBefore(newChild, this[i].childNodes[0]);
    }
  }

  return this;
}

function prependTo(parent) {
  $(parent).prepend(this);
  return this;
}

function insertBefore(selector) {
  const before = $(selector);

  for (let i = 0; i < this.length; i += 1) {
    if (before.length === 1) {
      before[0].parentNode.insertBefore(this[i], before[0]);
    } else if (before.length > 1) {
      for (let j = 0; j < before.length; j += 1) {
        before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
      }
    }
  }
}

function insertAfter(selector) {
  const after = $(selector);

  for (let i = 0; i < this.length; i += 1) {
    if (after.length === 1) {
      after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
    } else if (after.length > 1) {
      for (let j = 0; j < after.length; j += 1) {
        after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
      }
    }
  }
}

function next(selector) {
  if (this.length > 0) {
    if (selector) {
      if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
        return $([this[0].nextElementSibling]);
      }

      return $([]);
    }

    if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
    return $([]);
  }

  return $([]);
}

function nextAll(selector) {
  const nextEls = [];
  let el = this[0];
  if (!el) return $([]);

  while (el.nextElementSibling) {
    const next = el.nextElementSibling; // eslint-disable-line

    if (selector) {
      if ($(next).is(selector)) nextEls.push(next);
    } else nextEls.push(next);

    el = next;
  }

  return $(nextEls);
}

function prev(selector) {
  if (this.length > 0) {
    const el = this[0];

    if (selector) {
      if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
        return $([el.previousElementSibling]);
      }

      return $([]);
    }

    if (el.previousElementSibling) return $([el.previousElementSibling]);
    return $([]);
  }

  return $([]);
}

function prevAll(selector) {
  const prevEls = [];
  let el = this[0];
  if (!el) return $([]);

  while (el.previousElementSibling) {
    const prev = el.previousElementSibling; // eslint-disable-line

    if (selector) {
      if ($(prev).is(selector)) prevEls.push(prev);
    } else prevEls.push(prev);

    el = prev;
  }

  return $(prevEls);
}

function siblings(selector) {
  return this.nextAll(selector).add(this.prevAll(selector));
}

function parent(selector) {
  const parents = []; // eslint-disable-line

  for (let i = 0; i < this.length; i += 1) {
    if (this[i].parentNode !== null) {
      if (selector) {
        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
      } else {
        parents.push(this[i].parentNode);
      }
    }
  }

  return $(parents);
}

function parents(selector) {
  const parents = []; // eslint-disable-line

  for (let i = 0; i < this.length; i += 1) {
    let parent = this[i].parentNode; // eslint-disable-line

    while (parent) {
      if (selector) {
        if ($(parent).is(selector)) parents.push(parent);
      } else {
        parents.push(parent);
      }

      parent = parent.parentNode;
    }
  }

  return $(parents);
}

function closest(selector) {
  let closest = this; // eslint-disable-line

  if (typeof selector === 'undefined') {
    return $([]);
  }

  if (!closest.is(selector)) {
    closest = closest.parents(selector).eq(0);
  }

  return closest;
}

function find(selector) {
  const foundElements = [];

  for (let i = 0; i < this.length; i += 1) {
    const found = this[i].querySelectorAll(selector);

    for (let j = 0; j < found.length; j += 1) {
      foundElements.push(found[j]);
    }
  }

  return $(foundElements);
}

function children(selector) {
  const children = []; // eslint-disable-line

  for (let i = 0; i < this.length; i += 1) {
    const childNodes = this[i].children;

    for (let j = 0; j < childNodes.length; j += 1) {
      if (!selector || $(childNodes[j]).is(selector)) {
        children.push(childNodes[j]);
      }
    }
  }

  return $(children);
}

function remove() {
  for (let i = 0; i < this.length; i += 1) {
    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
  }

  return this;
}

function detach() {
  return this.remove();
}

function add(...els) {
  const dom = this;
  let i;
  let j;

  for (i = 0; i < els.length; i += 1) {
    const toAdd = $(els[i]);

    for (j = 0; j < toAdd.length; j += 1) {
      dom.push(toAdd[j]);
    }
  }

  return dom;
}

function empty() {
  for (let i = 0; i < this.length; i += 1) {
    const el = this[i];

    if (el.nodeType === 1) {
      for (let j = 0; j < el.childNodes.length; j += 1) {
        if (el.childNodes[j].parentNode) {
          el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
        }
      }

      el.textContent = '';
    }
  }

  return this;
} // eslint-disable-next-line


function scrollTo(...args) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  let [left, top, duration, easing, callback] = args;

  if (args.length === 4 && typeof easing === 'function') {
    callback = easing;
    [left, top, duration, callback, easing] = args;
  }

  if (typeof easing === 'undefined') easing = 'swing';
  return this.each(function animate() {
    const el = this;
    let currentTop;
    let currentLeft;
    let maxTop;
    let maxLeft;
    let newTop;
    let newLeft;
    let scrollTop; // eslint-disable-line

    let scrollLeft; // eslint-disable-line

    let animateTop = top > 0 || top === 0;
    let animateLeft = left > 0 || left === 0;

    if (typeof easing === 'undefined') {
      easing = 'swing';
    }

    if (animateTop) {
      currentTop = el.scrollTop;

      if (!duration) {
        el.scrollTop = top;
      }
    }

    if (animateLeft) {
      currentLeft = el.scrollLeft;

      if (!duration) {
        el.scrollLeft = left;
      }
    }

    if (!duration) return;

    if (animateTop) {
      maxTop = el.scrollHeight - el.offsetHeight;
      newTop = Math.max(Math.min(top, maxTop), 0);
    }

    if (animateLeft) {
      maxLeft = el.scrollWidth - el.offsetWidth;
      newLeft = Math.max(Math.min(left, maxLeft), 0);
    }

    let startTime = null;
    if (animateTop && newTop === currentTop) animateTop = false;
    if (animateLeft && newLeft === currentLeft) animateLeft = false;

    function render(time = new Date().getTime()) {
      if (startTime === null) {
        startTime = time;
      }

      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = easing === 'linear' ? progress : 0.5 - Math.cos(progress * Math.PI) / 2;
      let done;
      if (animateTop) scrollTop = currentTop + easeProgress * (newTop - currentTop);
      if (animateLeft) scrollLeft = currentLeft + easeProgress * (newLeft - currentLeft);

      if (animateTop && newTop > currentTop && scrollTop >= newTop) {
        el.scrollTop = newTop;
        done = true;
      }

      if (animateTop && newTop < currentTop && scrollTop <= newTop) {
        el.scrollTop = newTop;
        done = true;
      }

      if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
        el.scrollLeft = newLeft;
        done = true;
      }

      if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
        el.scrollLeft = newLeft;
        done = true;
      }

      if (done) {
        if (callback) callback();
        return;
      }

      if (animateTop) el.scrollTop = scrollTop;
      if (animateLeft) el.scrollLeft = scrollLeft;
      window.requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);
  });
} // scrollTop(top, duration, easing, callback) {


function scrollTop(...args) {
  let [top, duration, easing, callback] = args;

  if (args.length === 3 && typeof easing === 'function') {
    [top, duration, callback, easing] = args;
  }

  const dom = this;

  if (typeof top === 'undefined') {
    if (dom.length > 0) return dom[0].scrollTop;
    return null;
  }

  return dom.scrollTo(undefined, top, duration, easing, callback);
}

function scrollLeft(...args) {
  let [left, duration, easing, callback] = args;

  if (args.length === 3 && typeof easing === 'function') {
    [left, duration, callback, easing] = args;
  }

  const dom = this;

  if (typeof left === 'undefined') {
    if (dom.length > 0) return dom[0].scrollLeft;
    return null;
  }

  return dom.scrollTo(left, undefined, duration, easing, callback);
} // eslint-disable-next-line


function animate(initialProps, initialParams) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  const els = this;
  const a = {
    props: Object.assign({}, initialProps),
    params: Object.assign({
      duration: 300,
      easing: 'swing' // or 'linear'

      /* Callbacks
      begin(elements)
      complete(elements)
      progress(elements, complete, remaining, start, tweenValue)
      */

    }, initialParams),
    elements: els,
    animating: false,
    que: [],

    easingProgress(easing, progress) {
      if (easing === 'swing') {
        return 0.5 - Math.cos(progress * Math.PI) / 2;
      }

      if (typeof easing === 'function') {
        return easing(progress);
      }

      return progress;
    },

    stop() {
      if (a.frameId) {
        window.cancelAnimationFrame(a.frameId);
      }

      a.animating = false;
      a.elements.each(el => {
        const element = el;
        delete element.dom7AnimateInstance;
      });
      a.que = [];
    },

    done(complete) {
      a.animating = false;
      a.elements.each(el => {
        const element = el;
        delete element.dom7AnimateInstance;
      });
      if (complete) complete(els);

      if (a.que.length > 0) {
        const que = a.que.shift();
        a.animate(que[0], que[1]);
      }
    },

    animate(props, params) {
      if (a.animating) {
        a.que.push([props, params]);
        return a;
      }

      const elements = []; // Define & Cache Initials & Units

      a.elements.each((el, index) => {
        let initialFullValue;
        let initialValue;
        let unit;
        let finalValue;
        let finalFullValue;
        if (!el.dom7AnimateInstance) a.elements[index].dom7AnimateInstance = a;
        elements[index] = {
          container: el
        };
        Object.keys(props).forEach(prop => {
          initialFullValue = window.getComputedStyle(el, null).getPropertyValue(prop).replace(',', '.');
          initialValue = parseFloat(initialFullValue);
          unit = initialFullValue.replace(initialValue, '');
          finalValue = parseFloat(props[prop]);
          finalFullValue = props[prop] + unit;
          elements[index][prop] = {
            initialFullValue,
            initialValue,
            unit,
            finalValue,
            finalFullValue,
            currentValue: initialValue
          };
        });
      });
      let startTime = null;
      let time;
      let elementsDone = 0;
      let propsDone = 0;
      let done;
      let began = false;
      a.animating = true;

      function render() {
        time = new Date().getTime();
        let progress;
        let easeProgress; // let el;

        if (!began) {
          began = true;
          if (params.begin) params.begin(els);
        }

        if (startTime === null) {
          startTime = time;
        }

        if (params.progress) {
          // eslint-disable-next-line
          params.progress(els, Math.max(Math.min((time - startTime) / params.duration, 1), 0), startTime + params.duration - time < 0 ? 0 : startTime + params.duration - time, startTime);
        }

        elements.forEach(element => {
          const el = element;
          if (done || el.done) return;
          Object.keys(props).forEach(prop => {
            if (done || el.done) return;
            progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);
            easeProgress = a.easingProgress(params.easing, progress);
            const {
              initialValue,
              finalValue,
              unit
            } = el[prop];
            el[prop].currentValue = initialValue + easeProgress * (finalValue - initialValue);
            const currentValue = el[prop].currentValue;

            if (finalValue > initialValue && currentValue >= finalValue || finalValue < initialValue && currentValue <= finalValue) {
              el.container.style[prop] = finalValue + unit;
              propsDone += 1;

              if (propsDone === Object.keys(props).length) {
                el.done = true;
                elementsDone += 1;
              }

              if (elementsDone === elements.length) {
                done = true;
              }
            }

            if (done) {
              a.done(params.complete);
              return;
            }

            el.container.style[prop] = currentValue + unit;
          });
        });
        if (done) return; // Then call

        a.frameId = window.requestAnimationFrame(render);
      }

      a.frameId = window.requestAnimationFrame(render);
      return a;
    }

  };

  if (a.elements.length === 0) {
    return els;
  }

  let animateInstance;

  for (let i = 0; i < a.elements.length; i += 1) {
    if (a.elements[i].dom7AnimateInstance) {
      animateInstance = a.elements[i].dom7AnimateInstance;
    } else a.elements[i].dom7AnimateInstance = a;
  }

  if (!animateInstance) {
    animateInstance = a;
  }

  if (initialProps === 'stop') {
    animateInstance.stop();
  } else {
    animateInstance.animate(a.props, a.params);
  }

  return els;
}

function stop() {
  const els = this;

  for (let i = 0; i < els.length; i += 1) {
    if (els[i].dom7AnimateInstance) {
      els[i].dom7AnimateInstance.stop();
    }
  }
}

const noTrigger = 'resize scroll'.split(' ');

function shortcut(name) {
  function eventHandler(...args) {
    if (typeof args[0] === 'undefined') {
      for (let i = 0; i < this.length; i += 1) {
        if (noTrigger.indexOf(name) < 0) {
          if (name in this[i]) this[i][name]();else {
            $(this[i]).trigger(name);
          }
        }
      }

      return this;
    }

    return this.on(name, ...args);
  }

  return eventHandler;
}

const click = shortcut('click');
const blur = shortcut('blur');
const focus = shortcut('focus');
const focusin = shortcut('focusin');
const focusout = shortcut('focusout');
const keyup = shortcut('keyup');
const keydown = shortcut('keydown');
const keypress = shortcut('keypress');
const submit = shortcut('submit');
const change = shortcut('change');
const mousedown = shortcut('mousedown');
const mousemove = shortcut('mousemove');
const mouseup = shortcut('mouseup');
const mouseenter = shortcut('mouseenter');
const mouseleave = shortcut('mouseleave');
const mouseout = shortcut('mouseout');
const mouseover = shortcut('mouseover');
const touchstart = shortcut('touchstart');
const touchend = shortcut('touchend');
const touchmove = shortcut('touchmove');
const resize = shortcut('resize');
const scroll = shortcut('scroll');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($);


/***/ }),

/***/ 2864:
/*!***************************************************!*\
  !*** ./node_modules/ssr-window/ssr-window.esm.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "getDocument": () => (/* binding */ getDocument),
/* harmony export */   "getWindow": () => (/* binding */ getWindow),
/* harmony export */   "ssrDocument": () => (/* binding */ ssrDocument),
/* harmony export */   "ssrWindow": () => (/* binding */ ssrWindow)
/* harmony export */ });
/**
 * SSR Window 4.0.2
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2021, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: December 13, 2021
 */

/* eslint-disable no-param-reassign */
function isObject(obj) {
  return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
}

function extend(target = {}, src = {}) {
  Object.keys(src).forEach(key => {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    }
  });
}

const ssrDocument = {
  body: {},

  addEventListener() {},

  removeEventListener() {},

  activeElement: {
    blur() {},

    nodeName: ''
  },

  querySelector() {
    return null;
  },

  querySelectorAll() {
    return [];
  },

  getElementById() {
    return null;
  },

  createEvent() {
    return {
      initEvent() {}

    };
  },

  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},

      setAttribute() {},

      getElementsByTagName() {
        return [];
      }

    };
  },

  createElementNS() {
    return {};
  },

  importNode() {
    return null;
  },

  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  }
};

function getDocument() {
  const doc = typeof document !== 'undefined' ? document : {};
  extend(doc, ssrDocument);
  return doc;
}

const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ''
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  },
  history: {
    replaceState() {},

    pushState() {},

    go() {},

    back() {}

  },
  CustomEvent: function CustomEvent() {
    return this;
  },

  addEventListener() {},

  removeEventListener() {},

  getComputedStyle() {
    return {
      getPropertyValue() {
        return '';
      }

    };
  },

  Image() {},

  Date() {},

  screen: {},

  setTimeout() {},

  clearTimeout() {},

  matchMedia() {
    return {};
  },

  requestAnimationFrame(callback) {
    if (typeof setTimeout === 'undefined') {
      callback();
      return null;
    }

    return setTimeout(callback, 0);
  },

  cancelAnimationFrame(id) {
    if (typeof setTimeout === 'undefined') {
      return;
    }

    clearTimeout(id);
  }

};

function getWindow() {
  const win = typeof window !== 'undefined' ? window : {};
  extend(win, ssrWindow);
  return win;
}



/***/ }),

/***/ 341:
/*!*****************************************************************!*\
  !*** ./node_modules/swiper/angular/fesm2015/swiper_angular.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SwiperComponent": () => (/* binding */ SwiperComponent),
/* harmony export */   "SwiperModule": () => (/* binding */ SwiperModule),
/* harmony export */   "SwiperSlideDirective": () => (/* binding */ SwiperSlideDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ 63587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 64139);






/* underscore in name -> watch for changes */

const _c0 = ["prevElRef"];
const _c1 = ["nextElRef"];
const _c2 = ["scrollbarElRef"];
const _c3 = ["paginationElRef"];

function SwiperComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div", 6, 7)(3, "div", 8, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
}

function SwiperComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 10, 11);
  }
}

function SwiperComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 12, 13);
  }
}

function SwiperComponent_6_ng_template_0_Template(rf, ctx) {}

function SwiperComponent_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, SwiperComponent_6_ng_template_0_Template, 0, 0, "ng-template");
  }
}

function SwiperComponent_7_ng_template_0_Template(rf, ctx) {}

function SwiperComponent_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, SwiperComponent_7_ng_template_0_Template, 0, 0, "ng-template");
  }
}

function SwiperComponent_8_ng_template_0_Template(rf, ctx) {}

function SwiperComponent_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, SwiperComponent_8_ng_template_0_Template, 0, 0, "ng-template");
  }
}

function SwiperComponent_ng_template_11_div_0_div_1_ng_template_1_Template(rf, ctx) {}

const _c4 = function (a0) {
  return {
    $implicit: a0
  };
};

function SwiperComponent_ng_template_11_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SwiperComponent_ng_template_11_div_0_div_1_ng_template_1_Template, 0, 0, "ng-template", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const slide_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx_r19.zoomContainerClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", slide_r18.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c4, slide_r18.slideData));
  }
}

function SwiperComponent_ng_template_11_div_0_ng_container_2_ng_template_1_Template(rf, ctx) {}

function SwiperComponent_ng_template_11_div_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SwiperComponent_ng_template_11_div_0_ng_container_2_ng_template_1_Template, 0, 0, "ng-template", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const slide_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", slide_r18.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c4, slide_r18.slideData));
  }
}

function SwiperComponent_ng_template_11_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SwiperComponent_ng_template_11_div_0_div_1_Template, 2, 5, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SwiperComponent_ng_template_11_div_0_ng_container_2_Template, 2, 4, "ng-container", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const slide_r18 = ctx.$implicit;
    const slideKey_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().key;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleMap"](ctx_r17.style);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", (slide_r18.class ? slide_r18.class + " " : "") + ctx_r17.slideClass + (slideKey_r16 !== "" ? " " + ctx_r17.slideDuplicateClass : ""))("ngSwitch", slide_r18.zoom);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-swiper-slide-index", slide_r18.virtualIndex ? slide_r18.virtualIndex : slide_r18.slideIndex)("data-swiper-autoplay", slide_r18.autoplayDelay);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngSwitchCase", true);
  }
}

function SwiperComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, SwiperComponent_ng_template_11_div_0_Template, 3, 7, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "async");
  }

  if (rf & 2) {
    const loopSlides_r15 = ctx.loopSlides;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 1, loopSlides_r15));
  }
}

const _c5 = [[["", "slot", "container-start"]], [["", "slot", "wrapper-start"]], [["", "slot", "wrapper-end"]], [["", "slot", "container-end"]]];

const _c6 = function (a0) {
  return {
    loopSlides: a0,
    key: "prepend"
  };
};

const _c7 = function (a0) {
  return {
    loopSlides: a0,
    key: ""
  };
};

const _c8 = function (a0) {
  return {
    loopSlides: a0,
    key: "append"
  };
};

const _c9 = ["[slot=container-start]", "[slot=wrapper-start]", "[slot=wrapper-end]", "[slot=container-end]"];
const paramsList = ['init', 'enabled', '_direction', 'touchEventsTarget', 'initialSlide', '_speed', 'cssMode', 'updateOnWindowResize', 'resizeObserver', 'nested', 'focusableElements', '_width', '_height', 'preventInteractionOnTransition', 'userAgent', 'url', '_edgeSwipeDetection', '_edgeSwipeThreshold', '_freeMode', '_autoHeight', 'setWrapperSize', 'virtualTranslate', '_effect', 'breakpoints', '_spaceBetween', '_slidesPerView', 'maxBackfaceHiddenSlides', '_grid', '_slidesPerGroup', '_slidesPerGroupSkip', '_slidesPerGroupAuto', '_centeredSlides', '_centeredSlidesBounds', '_slidesOffsetBefore', '_slidesOffsetAfter', 'normalizeSlideIndex', '_centerInsufficientSlides', '_watchOverflow', 'roundLengths', 'touchRatio', 'touchAngle', 'simulateTouch', '_shortSwipes', '_longSwipes', 'longSwipesRatio', 'longSwipesMs', '_followFinger', 'allowTouchMove', '_threshold', 'touchMoveStopPropagation', 'touchStartPreventDefault', 'touchStartForcePreventDefault', 'touchReleaseOnEdges', 'uniqueNavElements', '_resistance', '_resistanceRatio', '_watchSlidesProgress', '_grabCursor', 'preventClicks', 'preventClicksPropagation', '_slideToClickedSlide', '_preloadImages', 'updateOnImagesReady', '_loop', '_loopAdditionalSlides', '_loopedSlides', '_loopedSlidesLimit', '_loopFillGroupWithBlank', 'loopPreventsSlide', '_rewind', '_allowSlidePrev', '_allowSlideNext', '_swipeHandler', '_noSwiping', 'noSwipingClass', 'noSwipingSelector', 'passiveListeners', 'containerModifierClass', 'slideClass', 'slideBlankClass', 'slideActiveClass', 'slideDuplicateActiveClass', 'slideVisibleClass', 'slideDuplicateClass', 'slideNextClass', 'slideDuplicateNextClass', 'slidePrevClass', 'slideDuplicatePrevClass', 'wrapperClass', 'runCallbacksOnInit', 'observer', 'observeParents', 'observeSlideChildren', // modules
'a11y', 'autoplay', '_controller', 'coverflowEffect', 'cubeEffect', 'fadeEffect', 'flipEffect', 'creativeEffect', 'cardsEffect', 'hashNavigation', 'history', 'keyboard', 'lazy', 'mousewheel', '_navigation', '_pagination', 'parallax', '_scrollbar', '_thumbs', 'virtual', 'zoom', 'on'];

function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}

function isEnabled(val) {
  return typeof val !== 'undefined' && typeof val !== 'boolean' && val.enabled === true;
}

function isShowEl(val, obj, el) {
  return coerceBooleanProperty(val) === true && obj && !obj.el || !(typeof obj !== 'boolean' && obj.el !== (el === null || el === void 0 ? void 0 : el.nativeElement) && (typeof obj.el === 'string' || typeof obj.el === 'object'));
}

function extend(target, src) {
  const noExtend = ['__proto__', 'constructor', 'prototype'];
  Object.keys(src).filter(key => noExtend.indexOf(key) < 0).forEach(key => {
    if (typeof target[key] === 'undefined') {
      target[key] = src[key];
      return;
    }

    if (target[key] && !src[key]) {
      return;
    }

    if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__) target[key] = src[key];else extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}

function coerceBooleanProperty(value) {
  return value != null && `${value}` !== 'false';
}

const ignoreNgOnChanges = ['pagination', 'navigation', 'scrollbar', 'virtual'];

function setProperty(val, obj = {}) {
  if (isObject(val)) {
    return val;
  }

  if (coerceBooleanProperty(val) === true) {
    return obj;
  }

  return false;
} // @ts-ignore


const allowedParams = paramsList.map(key => key.replace(/_/, ''));

function getParams(obj = {}) {
  const params = {
    on: {}
  }; // const events = {};

  const passedParams = {};
  extend(params, swiper__WEBPACK_IMPORTED_MODULE_0__["default"].defaults);
  extend(params, swiper__WEBPACK_IMPORTED_MODULE_0__["default"].extendedDefaults);
  params._emitClasses = true;
  params.init = false;
  const rest = {};
  const allowedParams = paramsList.map(key => key.replace(/_/, ''));
  Object.keys(obj).forEach(key => {
    const _key = key.replace(/^_/, '');

    if (allowedParams.indexOf(_key) >= 0) {
      if (isObject(obj[key])) {
        params[_key] = {};
        passedParams[_key] = {};
        extend(params[_key], obj[key]);
        extend(passedParams[_key], obj[key]);
      } else {
        params[_key] = obj[key];
        passedParams[_key] = obj[key];
      }
    } // else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
    //   events[`${_key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
    // }
    else {
      rest[_key] = obj[key];
    }
  });
  ['navigation', 'pagination', 'scrollbar'].forEach(key => {
    if (params[key] === true) params[key] = {};
    if (params[key] === false) delete params[key];
  });
  return {
    params,
    passedParams,
    rest
  };
}

class SwiperSlideDirective {
  constructor(template) {
    this.template = template;
    this.class = '';
    this.autoplayDelay = null;
    this.slideData = {
      isActive: false,
      isPrev: false,
      isNext: false,
      isVisible: false,
      isDuplicate: false
    };
  }

  set ngClass(val) {
    this.class = [this.class || '', val].join(' ');
  }

  set zoom(val) {
    this._zoom = coerceBooleanProperty(val);
  }

  get zoom() {
    return this._zoom;
  }

  get classNames() {
    return this._classNames;
  }

  set classNames(val) {
    if (this._classNames === val) {
      return;
    }

    this._classNames = val;
    this.slideData = {
      isActive: this._hasClass(['swiper-slide-active', 'swiper-slide-duplicate-active']),
      isVisible: this._hasClass(['swiper-slide-visible']),
      isDuplicate: this._hasClass(['swiper-slide-duplicate']),
      isPrev: this._hasClass(['swiper-slide-prev', 'swiper-slide-duplicate-prev']),
      isNext: this._hasClass(['swiper-slide-next', 'swiper-slide-duplicate-next'])
    };
  }

  _hasClass(classNames) {
    return classNames.some(className => this._classNames.indexOf(className) >= 0);
  }

}

SwiperSlideDirective.ɵfac = function SwiperSlideDirective_Factory(t) {
  return new (t || SwiperSlideDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.TemplateRef));
};

SwiperSlideDirective.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: SwiperSlideDirective,
  selectors: [["ng-template", "swiperSlide", ""]],
  inputs: {
    virtualIndex: "virtualIndex",
    class: "class",
    ngClass: "ngClass",
    autoplayDelay: ["data-swiper-autoplay", "autoplayDelay"],
    zoom: "zoom"
  }
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](SwiperSlideDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
    args: [{
      selector: 'ng-template[swiperSlide]'
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.TemplateRef
    }];
  }, {
    virtualIndex: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    class: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    ngClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    autoplayDelay: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input,
      args: ['data-swiper-autoplay']
    }],
    zoom: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }]
  });
})();

class SwiperComponent {
  constructor(_ngZone, elementRef, _changeDetectorRef, _platformId) {
    this._ngZone = _ngZone;
    this.elementRef = elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._platformId = _platformId;
    this.slideClass = 'swiper-slide';
    this.wrapperClass = 'swiper-wrapper';
    this.showNavigation = true;
    this.showPagination = true;
    this.showScrollbar = true;
    this.s__beforeBreakpoint = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s__containerClasses = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s__slideClass = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s__swiper = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_activeIndexChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_afterInit = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_autoplay = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_autoplayStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_autoplayStop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_autoplayPause = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_autoplayResume = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_beforeDestroy = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_beforeInit = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_beforeLoopFix = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_beforeResize = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_beforeSlideChangeStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_beforeTransitionStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_breakpoint = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_changeDirection = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_click = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_doubleTap = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_doubleClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_destroy = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_fromEdge = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_hashChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_hashSet = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_imagesReady = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_init = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_keyPress = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_lazyImageLoad = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_lazyImageReady = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_loopFix = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_momentumBounce = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_navigationHide = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_navigationShow = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_navigationPrev = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_navigationNext = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_observerUpdate = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_orientationchange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_paginationHide = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_paginationRender = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_paginationShow = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_paginationUpdate = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_progress = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_reachBeginning = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_reachEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_realIndexChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_resize = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_scroll = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_scrollbarDragEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_scrollbarDragMove = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_scrollbarDragStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_setTransition = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_setTranslate = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slideChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slideChangeTransitionEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slideChangeTransitionStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slideNextTransitionEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slideNextTransitionStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slidePrevTransitionEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slidePrevTransitionStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slideResetTransitionStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slideResetTransitionEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_sliderMove = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_sliderFirstMove = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slidesLengthChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_slidesGridLengthChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_snapGridLengthChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_snapIndexChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_tap = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_toEdge = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_touchEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_touchMove = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_touchMoveOpposite = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_touchStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_transitionEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_transitionStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_update = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_zoomChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_swiper = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_lock = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.s_unlock = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this._activeSlides = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.containerClasses = 'swiper';

    this.slidesChanges = val => {
      this.slides = val.map((slide, index) => {
        slide.slideIndex = index;
        slide.classNames = this.slideClass || '';
        return slide;
      });

      if (this.loop && !this.loopedSlides) {
        this.calcLoopedSlides();
      }

      if (!this.virtual) {
        if (this.loopedSlides) {
          this.prependSlides = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(this.slides.slice(this.slides.length - this.loopedSlides));
          this.appendSlides = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(this.slides.slice(0, this.loopedSlides));
        }
      } else if (this.swiperRef && this.swiperRef.virtual) {
        this._ngZone.runOutsideAngular(() => {
          this.swiperRef.virtual.slides = this.slides;
          this.swiperRef.virtual.update(true);
        });
      }

      this._changeDetectorRef.detectChanges();
    };

    this.style = null;

    this.updateVirtualSlides = virtualData => {
      // TODO: type virtualData
      if (!this.swiperRef || this.currentVirtualData && this.currentVirtualData.from === virtualData.from && this.currentVirtualData.to === virtualData.to && this.currentVirtualData.offset === virtualData.offset) {
        return;
      }

      this.style = this.swiperRef.isHorizontal() ? {
        [this.swiperRef.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`
      } : {
        top: `${virtualData.offset}px`
      };
      this.currentVirtualData = virtualData;

      this._activeSlides.next(virtualData.slides);

      this._ngZone.run(() => {
        this._changeDetectorRef.detectChanges();
      });

      this._ngZone.runOutsideAngular(() => {
        this.swiperRef.updateSlides();
        this.swiperRef.updateProgress();
        this.swiperRef.updateSlidesClasses();

        if (isEnabled(this.swiperRef.params.lazy)) {
          this.swiperRef.lazy.load();
        }

        this.swiperRef.virtual.update(true);
      });

      return;
    };
  }

  set navigation(val) {
    var _a, _b, _c;

    const currentNext = typeof this._navigation !== 'boolean' && this._navigation !== '' ? (_a = this._navigation) === null || _a === void 0 ? void 0 : _a.nextEl : null;
    const currentPrev = typeof this._navigation !== 'boolean' && this._navigation !== '' ? (_b = this._navigation) === null || _b === void 0 ? void 0 : _b.prevEl : null;
    this._navigation = setProperty(val, {
      nextEl: currentNext || null,
      prevEl: currentPrev || null
    });
    this.showNavigation = !(coerceBooleanProperty(val) !== true || this._navigation && typeof this._navigation !== 'boolean' && this._navigation.prevEl !== ((_c = this._prevElRef) === null || _c === void 0 ? void 0 : _c.nativeElement) && (this._navigation.prevEl !== null || this._navigation.nextEl !== null) && (typeof this._navigation.nextEl === 'string' || typeof this._navigation.prevEl === 'string' || typeof this._navigation.nextEl === 'object' || typeof this._navigation.prevEl === 'object'));
  }

  get navigation() {
    return this._navigation;
  }

  set pagination(val) {
    var _a;

    const current = typeof this._pagination !== 'boolean' && this._pagination !== '' ? (_a = this._pagination) === null || _a === void 0 ? void 0 : _a.el : null;
    this._pagination = setProperty(val, {
      el: current || null
    });
    this.showPagination = isShowEl(val, this._pagination, this._paginationElRef);
  }

  get pagination() {
    return this._pagination;
  }

  set scrollbar(val) {
    var _a;

    const current = typeof this._scrollbar !== 'boolean' && this._scrollbar !== '' ? (_a = this._scrollbar) === null || _a === void 0 ? void 0 : _a.el : null;
    this._scrollbar = setProperty(val, {
      el: current || null
    });
    this.showScrollbar = isShowEl(val, this._scrollbar, this._scrollbarElRef);
  }

  get scrollbar() {
    return this._scrollbar;
  }

  set virtual(val) {
    this._virtual = setProperty(val);
  }

  get virtual() {
    return this._virtual;
  }

  set config(val) {
    this.updateSwiper(val);
    const {
      params
    } = getParams(val);
    Object.assign(this, params);
  }

  set prevElRef(el) {
    this._prevElRef = el;

    this._setElement(el, this.navigation, 'navigation', 'prevEl');
  }

  set nextElRef(el) {
    this._nextElRef = el;

    this._setElement(el, this.navigation, 'navigation', 'nextEl');
  }

  set scrollbarElRef(el) {
    this._scrollbarElRef = el;

    this._setElement(el, this.scrollbar, 'scrollbar');
  }

  set paginationElRef(el) {
    this._paginationElRef = el;

    this._setElement(el, this.pagination, 'pagination');
  }

  get activeSlides() {
    if (this.virtual) {
      return this._activeSlides;
    }

    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(this.slides);
  }

  get zoomContainerClass() {
    return this.zoom && typeof this.zoom !== 'boolean' ? this.zoom.containerClass : 'swiper-zoom-container';
  }

  _setElement(el, ref, update, key = 'el') {
    if (!ref || !el) return;

    if (el.nativeElement) {
      if (ref[key] === el.nativeElement) {
        return;
      }

      ref[key] = el.nativeElement;
    }

    const updateObj = {};
    updateObj[update] = true;
    this.updateInitSwiper(updateObj);
  }

  ngOnInit() {
    const {
      params
    } = getParams(this);
    Object.assign(this, params);
  }

  ngAfterViewInit() {
    this.childrenSlidesInit();
    this.initSwiper();

    this._changeDetectorRef.detectChanges();

    setTimeout(() => {
      this.s_swiper.emit(this.swiperRef);
    });
  }

  childrenSlidesInit() {
    this.slidesChanges(this.slidesEl);
    this.slidesEl.changes.subscribe(this.slidesChanges);
  }

  get isSwiperActive() {
    return this.swiperRef && !this.swiperRef.destroyed;
  }

  initSwiper() {
    const {
      params: swiperParams,
      passedParams
    } = getParams(this);
    Object.assign(this, swiperParams);

    this._ngZone.runOutsideAngular(() => {
      swiperParams.init = false;

      if (!swiperParams.virtual) {
        swiperParams.observer = true;
      }

      swiperParams.onAny = (eventName, ...args) => {
        const emitter = this['s_' + eventName];

        if (emitter) {
          emitter.emit([...args]);
        }
      };

      const _slideClasses = (_, updated) => {
        updated.forEach(({
          slideEl,
          classNames
        }, index) => {
          const dataIndex = slideEl.getAttribute('data-swiper-slide-index');
          const slideIndex = dataIndex ? parseInt(dataIndex) : index;

          if (this.virtual) {
            const virtualSlide = this.slides.find(item => {
              return item.virtualIndex && item.virtualIndex === slideIndex;
            });

            if (virtualSlide) {
              virtualSlide.classNames = classNames;
              return;
            }
          }

          if (this.slides[slideIndex]) {
            this.slides[slideIndex].classNames = classNames;
          }
        });

        this._changeDetectorRef.detectChanges();
      };

      const _containerClasses = (_, classes) => {
        setTimeout(() => {
          this.containerClasses = classes;
        });
      };

      Object.assign(swiperParams.on, {
        _containerClasses,
        _slideClasses
      });
      const swiperRef = new swiper__WEBPACK_IMPORTED_MODULE_0__["default"](swiperParams);

      swiperRef.loopCreate = () => {};

      swiperRef.loopDestroy = () => {};

      if (swiperParams.loop) {
        swiperRef.loopedSlides = this.loopedSlides;
      }

      const isVirtualEnabled = isEnabled(swiperRef.params.virtual);

      if (swiperRef.virtual && isVirtualEnabled) {
        swiperRef.virtual.slides = this.slides;
        const extendWith = {
          cache: false,
          slides: this.slides,
          renderExternal: this.updateVirtualSlides,
          renderExternalUpdate: false
        };
        extend(swiperRef.params.virtual, extendWith);
        extend(swiperRef.originalParams.virtual, extendWith);
      }

      if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_4__.isPlatformBrowser)(this._platformId)) {
        this.swiperRef = swiperRef.init(this.elementRef.nativeElement);
        const isVirtualEnabled = isEnabled(this.swiperRef.params.virtual);

        if (this.swiperRef.virtual && isVirtualEnabled) {
          this.swiperRef.virtual.update(true);
        }

        this._changeDetectorRef.detectChanges();
      }
    });
  }

  ngOnChanges(changedParams) {
    this.updateSwiper(changedParams);

    this._changeDetectorRef.detectChanges();
  }

  updateInitSwiper(changedParams) {
    if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
      return;
    }

    this._ngZone.runOutsideAngular(() => {
      const {
        params: currentParams,
        pagination,
        navigation,
        scrollbar,
        virtual,
        thumbs
      } = this.swiperRef;

      if (changedParams.pagination) {
        if (this.pagination && typeof this.pagination !== 'boolean' && this.pagination.el && pagination && !pagination.el) {
          this.updateParameter('pagination', this.pagination);
          pagination.init();
          pagination.render();
          pagination.update();
        } else {
          pagination.destroy();
          pagination.el = null;
        }
      }

      if (changedParams.scrollbar) {
        if (this.scrollbar && typeof this.scrollbar !== 'boolean' && this.scrollbar.el && scrollbar && !scrollbar.el) {
          this.updateParameter('scrollbar', this.scrollbar);
          scrollbar.init();
          scrollbar.updateSize();
          scrollbar.setTranslate();
        } else {
          scrollbar.destroy();
          scrollbar.el = null;
        }
      }

      if (changedParams.navigation) {
        if (this.navigation && typeof this.navigation !== 'boolean' && this.navigation.prevEl && this.navigation.nextEl && navigation && !navigation.prevEl && !navigation.nextEl) {
          this.updateParameter('navigation', this.navigation);
          navigation.init();
          navigation.update();
        } else if (navigation.prevEl && navigation.nextEl) {
          navigation.destroy();
          navigation.nextEl = null;
          navigation.prevEl = null;
        }
      }

      if (changedParams.thumbs && this.thumbs && this.thumbs.swiper) {
        this.updateParameter('thumbs', this.thumbs);
        const initialized = thumbs.init();
        if (initialized) thumbs.update(true);
      }

      if (changedParams.controller && this.controller && this.controller.control) {
        this.swiperRef.controller.control = this.controller.control;
      }

      this.swiperRef.update();
    });
  }

  updateSwiper(changedParams) {
    this._ngZone.runOutsideAngular(() => {
      var _a, _b;

      if (changedParams.config) {
        return;
      }

      if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
        return;
      }

      for (const key in changedParams) {
        if (ignoreNgOnChanges.indexOf(key) >= 0) {
          continue;
        }

        const newValue = (_b = (_a = changedParams[key]) === null || _a === void 0 ? void 0 : _a.currentValue) !== null && _b !== void 0 ? _b : changedParams[key];
        this.updateParameter(key, newValue);
      }

      if (changedParams.allowSlideNext) {
        this.swiperRef.allowSlideNext = this.allowSlideNext;
      }

      if (changedParams.allowSlidePrev) {
        this.swiperRef.allowSlidePrev = this.allowSlidePrev;
      }

      if (changedParams.direction) {
        this.swiperRef.changeDirection(this.direction, false);
      }

      if (changedParams.breakpoints) {
        if (this.loop && !this.loopedSlides) {
          this.calcLoopedSlides();
        }

        this.swiperRef.currentBreakpoint = null;
        this.swiperRef.setBreakpoint();
      }

      if (changedParams.thumbs || changedParams.controller) {
        this.updateInitSwiper(changedParams);
      }

      this.swiperRef.update();
    });
  }

  calcLoopedSlides() {
    if (!this.loop) {
      return false;
    }

    let slidesPerViewParams = this.slidesPerView;

    if (this.breakpoints) {
      const breakpoint = swiper__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.getBreakpoint(this.breakpoints);
      const breakpointOnlyParams = breakpoint in this.breakpoints ? this.breakpoints[breakpoint] : undefined;

      if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
        slidesPerViewParams = breakpointOnlyParams.slidesPerView;
      }
    }

    if (slidesPerViewParams === 'auto') {
      this.loopedSlides = this.slides.length;
      return this.slides.length;
    }

    let loopedSlides = this.loopedSlides || slidesPerViewParams;

    if (!loopedSlides) {
      // ?
      return false;
    }

    if (this.loopAdditionalSlides) {
      loopedSlides += this.loopAdditionalSlides;
    }

    if (loopedSlides > this.slides.length) {
      loopedSlides = this.slides.length;
    }

    this.loopedSlides = loopedSlides;
    return true;
  }

  updateParameter(key, value) {
    if (!(this.swiperRef && !this.swiperRef.destroyed)) {
      return;
    }

    const _key = key.replace(/^_/, '');

    const isCurrentParamObj = isObject(this.swiperRef.params[_key]);

    if (_key === 'enabled') {
      if (value === true) {
        this.swiperRef.enable();
      } else if (value === false) {
        this.swiperRef.disable();
      }

      return;
    }

    if (isCurrentParamObj && isObject(value)) {
      extend(this.swiperRef.params[_key], value);
    } else {
      this.swiperRef.params[_key] = value;
    }
  }

  ngOnDestroy() {
    this._ngZone.runOutsideAngular(() => {
      var _a;

      (_a = this.swiperRef) === null || _a === void 0 ? void 0 : _a.destroy(true, false);
    });
  }

}

SwiperComponent.ɵfac = function SwiperComponent_Factory(t) {
  return new (t || SwiperComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID));
};

SwiperComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: SwiperComponent,
  selectors: [["swiper"], ["", "swiper", ""]],
  contentQueries: function SwiperComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵcontentQuery"](dirIndex, SwiperSlideDirective, 4);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.slidesEl = _t);
    }
  },
  viewQuery: function SwiperComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c3, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.prevElRef = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.nextElRef = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.scrollbarElRef = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.paginationElRef = _t.first);
    }
  },
  hostVars: 2,
  hostBindings: function SwiperComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx.containerClasses);
    }
  },
  inputs: {
    enabled: "enabled",
    on: "on",
    direction: "direction",
    touchEventsTarget: "touchEventsTarget",
    initialSlide: "initialSlide",
    speed: "speed",
    cssMode: "cssMode",
    updateOnWindowResize: "updateOnWindowResize",
    resizeObserver: "resizeObserver",
    nested: "nested",
    focusableElements: "focusableElements",
    width: "width",
    height: "height",
    preventInteractionOnTransition: "preventInteractionOnTransition",
    userAgent: "userAgent",
    url: "url",
    edgeSwipeDetection: "edgeSwipeDetection",
    edgeSwipeThreshold: "edgeSwipeThreshold",
    freeMode: "freeMode",
    autoHeight: "autoHeight",
    setWrapperSize: "setWrapperSize",
    virtualTranslate: "virtualTranslate",
    effect: "effect",
    breakpoints: "breakpoints",
    spaceBetween: "spaceBetween",
    slidesPerView: "slidesPerView",
    maxBackfaceHiddenSlides: "maxBackfaceHiddenSlides",
    grid: "grid",
    slidesPerGroup: "slidesPerGroup",
    slidesPerGroupSkip: "slidesPerGroupSkip",
    centeredSlides: "centeredSlides",
    centeredSlidesBounds: "centeredSlidesBounds",
    slidesOffsetBefore: "slidesOffsetBefore",
    slidesOffsetAfter: "slidesOffsetAfter",
    normalizeSlideIndex: "normalizeSlideIndex",
    centerInsufficientSlides: "centerInsufficientSlides",
    watchOverflow: "watchOverflow",
    roundLengths: "roundLengths",
    touchRatio: "touchRatio",
    touchAngle: "touchAngle",
    simulateTouch: "simulateTouch",
    shortSwipes: "shortSwipes",
    longSwipes: "longSwipes",
    longSwipesRatio: "longSwipesRatio",
    longSwipesMs: "longSwipesMs",
    followFinger: "followFinger",
    allowTouchMove: "allowTouchMove",
    threshold: "threshold",
    touchMoveStopPropagation: "touchMoveStopPropagation",
    touchStartPreventDefault: "touchStartPreventDefault",
    touchStartForcePreventDefault: "touchStartForcePreventDefault",
    touchReleaseOnEdges: "touchReleaseOnEdges",
    uniqueNavElements: "uniqueNavElements",
    resistance: "resistance",
    resistanceRatio: "resistanceRatio",
    watchSlidesProgress: "watchSlidesProgress",
    grabCursor: "grabCursor",
    preventClicks: "preventClicks",
    preventClicksPropagation: "preventClicksPropagation",
    slideToClickedSlide: "slideToClickedSlide",
    preloadImages: "preloadImages",
    updateOnImagesReady: "updateOnImagesReady",
    loop: "loop",
    loopAdditionalSlides: "loopAdditionalSlides",
    loopedSlides: "loopedSlides",
    loopedSlidesLimit: "loopedSlidesLimit",
    loopFillGroupWithBlank: "loopFillGroupWithBlank",
    loopPreventsSlide: "loopPreventsSlide",
    rewind: "rewind",
    allowSlidePrev: "allowSlidePrev",
    allowSlideNext: "allowSlideNext",
    swipeHandler: "swipeHandler",
    noSwiping: "noSwiping",
    noSwipingClass: "noSwipingClass",
    noSwipingSelector: "noSwipingSelector",
    passiveListeners: "passiveListeners",
    containerModifierClass: "containerModifierClass",
    slideClass: "slideClass",
    slideBlankClass: "slideBlankClass",
    slideActiveClass: "slideActiveClass",
    slideDuplicateActiveClass: "slideDuplicateActiveClass",
    slideVisibleClass: "slideVisibleClass",
    slideDuplicateClass: "slideDuplicateClass",
    slideNextClass: "slideNextClass",
    slideDuplicateNextClass: "slideDuplicateNextClass",
    slidePrevClass: "slidePrevClass",
    slideDuplicatePrevClass: "slideDuplicatePrevClass",
    wrapperClass: "wrapperClass",
    runCallbacksOnInit: "runCallbacksOnInit",
    observeParents: "observeParents",
    observeSlideChildren: "observeSlideChildren",
    a11y: "a11y",
    autoplay: "autoplay",
    controller: "controller",
    coverflowEffect: "coverflowEffect",
    cubeEffect: "cubeEffect",
    fadeEffect: "fadeEffect",
    flipEffect: "flipEffect",
    creativeEffect: "creativeEffect",
    cardsEffect: "cardsEffect",
    hashNavigation: "hashNavigation",
    history: "history",
    keyboard: "keyboard",
    lazy: "lazy",
    mousewheel: "mousewheel",
    parallax: "parallax",
    thumbs: "thumbs",
    zoom: "zoom",
    class: "class",
    id: "id",
    navigation: "navigation",
    pagination: "pagination",
    scrollbar: "scrollbar",
    virtual: "virtual",
    config: "config"
  },
  outputs: {
    s__beforeBreakpoint: "_beforeBreakpoint",
    s__containerClasses: "_containerClasses",
    s__slideClass: "_slideClass",
    s__swiper: "_swiper",
    s_activeIndexChange: "activeIndexChange",
    s_afterInit: "afterInit",
    s_autoplay: "autoplay",
    s_autoplayStart: "autoplayStart",
    s_autoplayStop: "autoplayStop",
    s_autoplayPause: "autoplayPause",
    s_autoplayResume: "autoplayResume",
    s_beforeDestroy: "beforeDestroy",
    s_beforeInit: "beforeInit",
    s_beforeLoopFix: "beforeLoopFix",
    s_beforeResize: "beforeResize",
    s_beforeSlideChangeStart: "beforeSlideChangeStart",
    s_beforeTransitionStart: "beforeTransitionStart",
    s_breakpoint: "breakpoint",
    s_changeDirection: "changeDirection",
    s_click: "click",
    s_doubleTap: "doubleTap",
    s_doubleClick: "doubleClick",
    s_destroy: "destroy",
    s_fromEdge: "fromEdge",
    s_hashChange: "hashChange",
    s_hashSet: "hashSet",
    s_imagesReady: "imagesReady",
    s_init: "init",
    s_keyPress: "keyPress",
    s_lazyImageLoad: "lazyImageLoad",
    s_lazyImageReady: "lazyImageReady",
    s_loopFix: "loopFix",
    s_momentumBounce: "momentumBounce",
    s_navigationHide: "navigationHide",
    s_navigationShow: "navigationShow",
    s_navigationPrev: "navigationPrev",
    s_navigationNext: "navigationNext",
    s_observerUpdate: "observerUpdate",
    s_orientationchange: "orientationchange",
    s_paginationHide: "paginationHide",
    s_paginationRender: "paginationRender",
    s_paginationShow: "paginationShow",
    s_paginationUpdate: "paginationUpdate",
    s_progress: "progress",
    s_reachBeginning: "reachBeginning",
    s_reachEnd: "reachEnd",
    s_realIndexChange: "realIndexChange",
    s_resize: "resize",
    s_scroll: "scroll",
    s_scrollbarDragEnd: "scrollbarDragEnd",
    s_scrollbarDragMove: "scrollbarDragMove",
    s_scrollbarDragStart: "scrollbarDragStart",
    s_setTransition: "setTransition",
    s_setTranslate: "setTranslate",
    s_slideChange: "slideChange",
    s_slideChangeTransitionEnd: "slideChangeTransitionEnd",
    s_slideChangeTransitionStart: "slideChangeTransitionStart",
    s_slideNextTransitionEnd: "slideNextTransitionEnd",
    s_slideNextTransitionStart: "slideNextTransitionStart",
    s_slidePrevTransitionEnd: "slidePrevTransitionEnd",
    s_slidePrevTransitionStart: "slidePrevTransitionStart",
    s_slideResetTransitionStart: "slideResetTransitionStart",
    s_slideResetTransitionEnd: "slideResetTransitionEnd",
    s_sliderMove: "sliderMove",
    s_sliderFirstMove: "sliderFirstMove",
    s_slidesLengthChange: "slidesLengthChange",
    s_slidesGridLengthChange: "slidesGridLengthChange",
    s_snapGridLengthChange: "snapGridLengthChange",
    s_snapIndexChange: "snapIndexChange",
    s_tap: "tap",
    s_toEdge: "toEdge",
    s_touchEnd: "touchEnd",
    s_touchMove: "touchMove",
    s_touchMoveOpposite: "touchMoveOpposite",
    s_touchStart: "touchStart",
    s_transitionEnd: "transitionEnd",
    s_transitionStart: "transitionStart",
    s_update: "update",
    s_zoomChange: "zoomChange",
    s_swiper: "swiper",
    s_lock: "lock",
    s_unlock: "unlock"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
  ngContentSelectors: _c9,
  decls: 13,
  vars: 17,
  consts: [[4, "ngIf"], ["class", "swiper-scrollbar", 4, "ngIf"], ["class", "swiper-pagination", 4, "ngIf"], [3, "ngClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["slidesTemplate", ""], [1, "swiper-button-prev"], ["prevElRef", ""], [1, "swiper-button-next"], ["nextElRef", ""], [1, "swiper-scrollbar"], ["scrollbarElRef", ""], [1, "swiper-pagination"], ["paginationElRef", ""], [3, "ngClass", "style", "ngSwitch", 4, "ngFor", "ngForOf"], [3, "ngClass", "ngSwitch"], [3, "ngClass", 4, "ngSwitchCase"], [4, "ngSwitchDefault"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function SwiperComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SwiperComponent_ng_container_1_Template, 5, 0, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SwiperComponent_div_2_Template, 2, 0, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, SwiperComponent_div_3_Template, 2, 0, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](5, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, SwiperComponent_6_Template, 1, 0, null, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, SwiperComponent_7_Template, 1, 0, null, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, SwiperComponent_8_Template, 1, 0, null, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](9, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](10, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, SwiperComponent_ng_template_11_Template, 2, 3, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    }

    if (rf & 2) {
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](12);

      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.navigation && ctx.showNavigation);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.scrollbar && ctx.showScrollbar);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.pagination && ctx.showPagination);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx.wrapperClass);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("id", ctx.id);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", _r6)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](11, _c6, ctx.prependSlides));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", _r6)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](13, _c7, ctx.activeSlides));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", _r6)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](15, _c8, ctx.appendSlides));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgSwitchCase, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgSwitchDefault, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
  styles: ["swiper{display:block}\n"],
  encapsulation: 2,
  changeDetection: 0
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](SwiperComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'swiper, [swiper]',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewEncapsulation.None,
      styles: [`
      swiper {
        display: block;
      }
    `],
      template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation && showNavigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar && showScrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination && showPagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\" [attr.id]=\"id\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slot=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"\n      (slide.class ? slide.class + ' ' : '') +\n      slideClass +\n      (slideKey !== '' ? ' ' + slideDuplicateClass : '')\n    \"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [attr.data-swiper-autoplay]=\"slide.autoplayDelay\"\n    [style]=\"style\"\n    [ngSwitch]=\"slide.zoom\"\n  >\n    <div *ngSwitchCase=\"true\" [ngClass]=\"zoomContainerClass\">\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </div>\n    <ng-container *ngSwitchDefault>\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </ng-container>\n  </div>\n</ng-template>\n"
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef
    }, {
      type: Object,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID]
      }]
    }];
  }, {
    enabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    on: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    direction: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    touchEventsTarget: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    initialSlide: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    speed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cssMode: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    updateOnWindowResize: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    resizeObserver: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    nested: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    focusableElements: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    width: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    height: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    preventInteractionOnTransition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    userAgent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    url: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    edgeSwipeDetection: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    edgeSwipeThreshold: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    freeMode: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    autoHeight: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    setWrapperSize: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    virtualTranslate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    effect: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    breakpoints: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    spaceBetween: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slidesPerView: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    maxBackfaceHiddenSlides: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    grid: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slidesPerGroup: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slidesPerGroupSkip: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    centeredSlides: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    centeredSlidesBounds: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slidesOffsetBefore: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slidesOffsetAfter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    normalizeSlideIndex: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    centerInsufficientSlides: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    watchOverflow: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    roundLengths: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    touchRatio: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    touchAngle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    simulateTouch: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    shortSwipes: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    longSwipes: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    longSwipesRatio: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    longSwipesMs: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    followFinger: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    allowTouchMove: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    threshold: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    touchMoveStopPropagation: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    touchStartPreventDefault: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    touchStartForcePreventDefault: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    touchReleaseOnEdges: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    uniqueNavElements: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    resistance: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    resistanceRatio: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    watchSlidesProgress: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    grabCursor: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    preventClicks: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    preventClicksPropagation: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slideToClickedSlide: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    preloadImages: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    updateOnImagesReady: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    loop: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    loopAdditionalSlides: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    loopedSlides: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    loopedSlidesLimit: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    loopFillGroupWithBlank: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    loopPreventsSlide: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    rewind: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    allowSlidePrev: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    allowSlideNext: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    swipeHandler: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    noSwiping: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    noSwipingClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    noSwipingSelector: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    passiveListeners: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    containerModifierClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slideClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slideBlankClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slideActiveClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slideDuplicateActiveClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slideVisibleClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slideDuplicateClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slideNextClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slideDuplicateNextClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slidePrevClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    slideDuplicatePrevClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    wrapperClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    runCallbacksOnInit: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    observeParents: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    observeSlideChildren: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    a11y: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    autoplay: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    controller: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    coverflowEffect: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cubeEffect: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    fadeEffect: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    flipEffect: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    creativeEffect: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cardsEffect: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    hashNavigation: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    history: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    keyboard: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    lazy: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    mousewheel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    parallax: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    thumbs: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    zoom: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    class: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    id: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    navigation: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    pagination: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    scrollbar: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    virtual: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    config: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    s__beforeBreakpoint: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['_beforeBreakpoint']
    }],
    s__containerClasses: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['_containerClasses']
    }],
    s__slideClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['_slideClass']
    }],
    s__swiper: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['_swiper']
    }],
    s_activeIndexChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['activeIndexChange']
    }],
    s_afterInit: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['afterInit']
    }],
    s_autoplay: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['autoplay']
    }],
    s_autoplayStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['autoplayStart']
    }],
    s_autoplayStop: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['autoplayStop']
    }],
    s_autoplayPause: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['autoplayPause']
    }],
    s_autoplayResume: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['autoplayResume']
    }],
    s_beforeDestroy: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['beforeDestroy']
    }],
    s_beforeInit: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['beforeInit']
    }],
    s_beforeLoopFix: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['beforeLoopFix']
    }],
    s_beforeResize: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['beforeResize']
    }],
    s_beforeSlideChangeStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['beforeSlideChangeStart']
    }],
    s_beforeTransitionStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['beforeTransitionStart']
    }],
    s_breakpoint: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['breakpoint']
    }],
    s_changeDirection: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['changeDirection']
    }],
    s_click: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['click']
    }],
    s_doubleTap: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['doubleTap']
    }],
    s_doubleClick: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['doubleClick']
    }],
    s_destroy: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['destroy']
    }],
    s_fromEdge: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['fromEdge']
    }],
    s_hashChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['hashChange']
    }],
    s_hashSet: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['hashSet']
    }],
    s_imagesReady: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['imagesReady']
    }],
    s_init: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['init']
    }],
    s_keyPress: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['keyPress']
    }],
    s_lazyImageLoad: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['lazyImageLoad']
    }],
    s_lazyImageReady: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['lazyImageReady']
    }],
    s_loopFix: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['loopFix']
    }],
    s_momentumBounce: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['momentumBounce']
    }],
    s_navigationHide: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['navigationHide']
    }],
    s_navigationShow: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['navigationShow']
    }],
    s_navigationPrev: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['navigationPrev']
    }],
    s_navigationNext: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['navigationNext']
    }],
    s_observerUpdate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['observerUpdate']
    }],
    s_orientationchange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['orientationchange']
    }],
    s_paginationHide: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['paginationHide']
    }],
    s_paginationRender: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['paginationRender']
    }],
    s_paginationShow: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['paginationShow']
    }],
    s_paginationUpdate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['paginationUpdate']
    }],
    s_progress: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['progress']
    }],
    s_reachBeginning: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['reachBeginning']
    }],
    s_reachEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['reachEnd']
    }],
    s_realIndexChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['realIndexChange']
    }],
    s_resize: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['resize']
    }],
    s_scroll: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['scroll']
    }],
    s_scrollbarDragEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['scrollbarDragEnd']
    }],
    s_scrollbarDragMove: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['scrollbarDragMove']
    }],
    s_scrollbarDragStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['scrollbarDragStart']
    }],
    s_setTransition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['setTransition']
    }],
    s_setTranslate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['setTranslate']
    }],
    s_slideChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slideChange']
    }],
    s_slideChangeTransitionEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slideChangeTransitionEnd']
    }],
    s_slideChangeTransitionStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slideChangeTransitionStart']
    }],
    s_slideNextTransitionEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slideNextTransitionEnd']
    }],
    s_slideNextTransitionStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slideNextTransitionStart']
    }],
    s_slidePrevTransitionEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slidePrevTransitionEnd']
    }],
    s_slidePrevTransitionStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slidePrevTransitionStart']
    }],
    s_slideResetTransitionStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slideResetTransitionStart']
    }],
    s_slideResetTransitionEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slideResetTransitionEnd']
    }],
    s_sliderMove: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['sliderMove']
    }],
    s_sliderFirstMove: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['sliderFirstMove']
    }],
    s_slidesLengthChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slidesLengthChange']
    }],
    s_slidesGridLengthChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['slidesGridLengthChange']
    }],
    s_snapGridLengthChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['snapGridLengthChange']
    }],
    s_snapIndexChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['snapIndexChange']
    }],
    s_tap: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['tap']
    }],
    s_toEdge: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['toEdge']
    }],
    s_touchEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['touchEnd']
    }],
    s_touchMove: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['touchMove']
    }],
    s_touchMoveOpposite: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['touchMoveOpposite']
    }],
    s_touchStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['touchStart']
    }],
    s_transitionEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['transitionEnd']
    }],
    s_transitionStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['transitionStart']
    }],
    s_update: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['update']
    }],
    s_zoomChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['zoomChange']
    }],
    s_swiper: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['swiper']
    }],
    s_lock: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['lock']
    }],
    s_unlock: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output,
      args: ['unlock']
    }],
    prevElRef: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['prevElRef', {
        static: false
      }]
    }],
    nextElRef: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['nextElRef', {
        static: false
      }]
    }],
    scrollbarElRef: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['scrollbarElRef', {
        static: false
      }]
    }],
    paginationElRef: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['paginationElRef', {
        static: false
      }]
    }],
    slidesEl: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ContentChildren,
      args: [SwiperSlideDirective, {
        descendants: false,
        emitDistinctChangesOnly: true
      }]
    }],
    containerClasses: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.HostBinding,
      args: ['class']
    }]
  });
})();

class SwiperModule {}

SwiperModule.ɵfac = function SwiperModule_Factory(t) {
  return new (t || SwiperModule)();
};

SwiperModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: SwiperModule,
  declarations: [SwiperComponent, SwiperSlideDirective],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule],
  exports: [SwiperComponent, SwiperSlideDirective]
});
SwiperModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](SwiperModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      declarations: [SwiperComponent, SwiperSlideDirective],
      exports: [SwiperComponent, SwiperSlideDirective],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule]
    }]
  }], null, null);
})();
/*
 * Public API Surface of angular
 */

/**
 * Generated bundle index. Do not edit.
 */




/***/ }),

/***/ 41802:
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/breakpoints/getBreakpoint.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBreakpoint)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);

function getBreakpoint(breakpoints, base = 'window', containerEl) {
  if (!breakpoints || base === 'container' && !containerEl) return undefined;
  let breakpoint = false;
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints).map(point => {
    if (typeof point === 'string' && point.indexOf('@') === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }

    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));

  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];

    if (base === 'window') {
      if (window.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }

  return breakpoint || 'max';
}

/***/ }),

/***/ 75458:
/*!*******************************************************!*\
  !*** ./node_modules/swiper/core/breakpoints/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _setBreakpoint_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setBreakpoint.js */ 36064);
/* harmony import */ var _getBreakpoint_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getBreakpoint.js */ 41802);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  setBreakpoint: _setBreakpoint_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  getBreakpoint: _getBreakpoint_js__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ 36064:
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/breakpoints/setBreakpoint.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setBreakpoint)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);


const isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};

function setBreakpoint() {
  const swiper = this;
  const {
    activeIndex,
    initialized,
    loopedSlides = 0,
    params,
    $el
  } = swiper;
  const breakpoints = params.breakpoints;
  if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return; // Get breakpoint for window width and update parameters

  const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
  const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasEnabled = params.enabled;

  if (wasMultiRow && !isMultiRow) {
    $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    $el.addClass(`${params.containerModifierClass}grid`);

    if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
      $el.addClass(`${params.containerModifierClass}grid-column`);
    }

    swiper.emitContainerClasses();
  } // Toggle navigation, pagination, scrollbar


  ['navigation', 'pagination', 'scrollbar'].forEach(prop => {
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;

    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }

    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

  if (directionChanged && initialized) {
    swiper.changeDirection();
  }

  (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.extend)(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });

  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }

  swiper.currentBreakpoint = breakpoint;
  swiper.emit('_beforeBreakpoint', breakpointParams);

  if (needsReLoop && initialized) {
    swiper.loopDestroy();
    swiper.loopCreate();
    swiper.updateSlides();
    swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
  }

  swiper.emit('breakpoint', breakpointParams);
}

/***/ }),

/***/ 24511:
/*!**********************************************************!*\
  !*** ./node_modules/swiper/core/check-overflow/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;

  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }

  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }

  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }

  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }

  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  checkOverflow
});

/***/ }),

/***/ 12818:
/*!********************************************************!*\
  !*** ./node_modules/swiper/core/classes/addClasses.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addClasses)
/* harmony export */ });
function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach(item => {
    if (typeof item === 'object') {
      Object.keys(item).forEach(classNames => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === 'string') {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}

function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl,
    $el,
    device,
    support
  } = swiper; // prettier-ignore

  const suffixes = prepareClasses(['initialized', params.direction, {
    'pointer-events': !support.touch
  }, {
    'free-mode': swiper.params.freeMode && params.freeMode.enabled
  }, {
    'autoheight': params.autoHeight
  }, {
    'rtl': rtl
  }, {
    'grid': params.grid && params.grid.rows > 1
  }, {
    'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
  }, {
    'android': device.android
  }, {
    'ios': device.ios
  }, {
    'css-mode': params.cssMode
  }, {
    'centered': params.cssMode && params.centeredSlides
  }, {
    'watch-progress': params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  $el.addClass([...classNames].join(' '));
  swiper.emitContainerClasses();
}

/***/ }),

/***/ 38630:
/*!***************************************************!*\
  !*** ./node_modules/swiper/core/classes/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addClasses_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addClasses.js */ 12818);
/* harmony import */ var _removeClasses_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./removeClasses.js */ 42411);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  addClasses: _addClasses_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  removeClasses: _removeClasses_js__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ 42411:
/*!***********************************************************!*\
  !*** ./node_modules/swiper/core/classes/removeClasses.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeClasses)
/* harmony export */ });
function removeClasses() {
  const swiper = this;
  const {
    $el,
    classNames
  } = swiper;
  $el.removeClass(classNames.join(' '));
  swiper.emitContainerClasses();
}

/***/ }),

/***/ 33606:
/*!******************************************!*\
  !*** ./node_modules/swiper/core/core.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/dom.js */ 16007);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utils.js */ 73809);
/* harmony import */ var _shared_get_support_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/get-support.js */ 14558);
/* harmony import */ var _shared_get_device_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/get-device.js */ 8607);
/* harmony import */ var _shared_get_browser_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/get-browser.js */ 57274);
/* harmony import */ var _modules_resize_resize_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/resize/resize.js */ 96526);
/* harmony import */ var _modules_observer_observer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/observer/observer.js */ 38833);
/* harmony import */ var _events_emitter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events-emitter.js */ 64818);
/* harmony import */ var _update_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./update/index.js */ 71009);
/* harmony import */ var _translate_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./translate/index.js */ 90444);
/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./transition/index.js */ 5026);
/* harmony import */ var _slide_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./slide/index.js */ 97190);
/* harmony import */ var _loop_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./loop/index.js */ 69355);
/* harmony import */ var _grab_cursor_index_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./grab-cursor/index.js */ 56818);
/* harmony import */ var _events_index_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./events/index.js */ 19123);
/* harmony import */ var _breakpoints_index_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./breakpoints/index.js */ 75458);
/* harmony import */ var _classes_index_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./classes/index.js */ 38630);
/* harmony import */ var _images_index_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./images/index.js */ 35032);
/* harmony import */ var _check_overflow_index_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./check-overflow/index.js */ 24511);
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./defaults.js */ 80341);
/* harmony import */ var _moduleExtendParams_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./moduleExtendParams.js */ 58220);
/* eslint no-param-reassign: "off" */






















const prototypes = {
  eventsEmitter: _events_emitter_js__WEBPACK_IMPORTED_MODULE_8__["default"],
  update: _update_index_js__WEBPACK_IMPORTED_MODULE_9__["default"],
  translate: _translate_index_js__WEBPACK_IMPORTED_MODULE_10__["default"],
  transition: _transition_index_js__WEBPACK_IMPORTED_MODULE_11__["default"],
  slide: _slide_index_js__WEBPACK_IMPORTED_MODULE_12__["default"],
  loop: _loop_index_js__WEBPACK_IMPORTED_MODULE_13__["default"],
  grabCursor: _grab_cursor_index_js__WEBPACK_IMPORTED_MODULE_14__["default"],
  events: _events_index_js__WEBPACK_IMPORTED_MODULE_15__["default"],
  breakpoints: _breakpoints_index_js__WEBPACK_IMPORTED_MODULE_16__["default"],
  checkOverflow: _check_overflow_index_js__WEBPACK_IMPORTED_MODULE_19__["default"],
  classes: _classes_index_js__WEBPACK_IMPORTED_MODULE_17__["default"],
  images: _images_index_js__WEBPACK_IMPORTED_MODULE_18__["default"]
};
const extendedDefaults = {};

class Swiper {
  constructor(...args) {
    let el;
    let params;

    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      params = args[0];
    } else {
      [el, params] = args;
    }

    if (!params) params = {};
    params = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, params);
    if (el && !params.el) params.el = el;

    if (params.el && (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.el).length > 1) {
      const swipers = [];
      (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.el).each(containerEl => {
        const newParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      }); // eslint-disable-next-line no-constructor-return

      return swipers;
    } // Swiper Instance


    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = (0,_shared_get_support_js__WEBPACK_IMPORTED_MODULE_3__.getSupport)();
    swiper.device = (0,_shared_get_device_js__WEBPACK_IMPORTED_MODULE_4__.getDevice)({
      userAgent: params.userAgent
    });
    swiper.browser = (0,_shared_get_browser_js__WEBPACK_IMPORTED_MODULE_5__.getBrowser)();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];

    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }

    const allModulesParams = {};
    swiper.modules.forEach(mod => {
      mod({
        swiper,
        extendParams: (0,_moduleExtendParams_js__WEBPACK_IMPORTED_MODULE_21__["default"])(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    }); // Extend defaults with modules params

    const swiperParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, _defaults_js__WEBPACK_IMPORTED_MODULE_20__["default"], allModulesParams); // Extend defaults with passed params

    swiper.params = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, swiper.params);
    swiper.passedParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, params); // add event listeners

    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach(eventName => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }

    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    } // Save Dom lib


    swiper.$ = _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"]; // Extend Swiper

    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el,
      // Classes
      classNames: [],
      // Slides
      slides: (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(),
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],

      // isDirection
      isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },

      isVertical() {
        return swiper.params.direction === 'vertical';
      },

      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEvents: function touchEvents() {
        const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
        const desktop = ['pointerdown', 'pointermove', 'pointerup'];
        swiper.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2],
          cancel: touch[3]
        };
        swiper.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2]
        };
        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
      }(),
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)(),
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit('_swiper'); // Init

    if (swiper.params.init) {
      swiper.init();
    } // Return app instance
    // eslint-disable-next-line no-constructor-return


    return swiper;
  }

  enable() {
    const swiper = this;
    if (swiper.enabled) return;
    swiper.enabled = true;

    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }

    swiper.emit('enable');
  }

  disable() {
    const swiper = this;
    if (!swiper.enabled) return;
    swiper.enabled = false;

    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }

    swiper.emit('disable');
  }

  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper.minTranslate();
    const max = swiper.maxTranslate();
    const current = (max - min) * progress + min;
    swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }

  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const cls = swiper.el.className.split(' ').filter(className => {
      return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit('_containerClasses', cls.join(' '));
  }

  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed) return '';
    return slideEl.className.split(' ').filter(className => {
      return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(' ');
  }

  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const updates = [];
    swiper.slides.each(slideEl => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit('_slideClass', slideEl, classNames);
    });
    swiper.emit('_slideClasses', updates);
  }

  slidesPerViewDynamic(view = 'current', exact = false) {
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;

    if (params.centeredSlides) {
      let slideSize = slides[activeIndex].swiperSlideSize;
      let breakLoop;

      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }

      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
    } else {
      // eslint-disable-next-line
      if (view === 'current') {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;

          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        // previous
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;

          if (slideInView) {
            spv += 1;
          }
        }
      }
    }

    return spv;
  }

  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed) return;
    const {
      snapGrid,
      params
    } = swiper; // Breakpoints

    if (params.breakpoints) {
      swiper.setBreakpoint();
    }

    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();

    function setTranslate() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }

    let translated;

    if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
      setTranslate();

      if (swiper.params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }

      if (!translated) {
        setTranslate();
      }
    }

    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }

    swiper.emit('update');
  }

  changeDirection(newDirection, needUpdate = true) {
    const swiper = this;
    const currentDirection = swiper.params.direction;

    if (!newDirection) {
      // eslint-disable-next-line
      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
    }

    if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
      return swiper;
    }

    swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.each(slideEl => {
      if (newDirection === 'vertical') {
        slideEl.style.width = '';
      } else {
        slideEl.style.height = '';
      }
    });
    swiper.emit('changeDirection');
    if (needUpdate) swiper.update();
    return swiper;
  }

  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;
    swiper.rtl = direction === 'rtl';
    swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;

    if (swiper.rtl) {
      swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = 'rtl';
    } else {
      swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = 'ltr';
    }

    swiper.update();
  }

  mount(el) {
    const swiper = this;
    if (swiper.mounted) return true; // Find el

    const $el = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(el || swiper.params.el);
    el = $el[0];

    if (!el) {
      return false;
    }

    el.swiper = swiper;

    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
    };

    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(el.shadowRoot.querySelector(getWrapperSelector())); // Children needs to return slot items

        res.children = options => $el.children(options);

        return res;
      }

      if (!$el.children) {
        return (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])($el).children(getWrapperSelector());
      }

      return $el.children(getWrapperSelector());
    }; // Find Wrapper


    let $wrapperEl = getWrapper();

    if ($wrapperEl.length === 0 && swiper.params.createElements) {
      const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
      const wrapper = document.createElement('div');
      $wrapperEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(wrapper);
      wrapper.className = swiper.params.wrapperClass;
      $el.append(wrapper);
      $el.children(`.${swiper.params.slideClass}`).each(slideEl => {
        $wrapperEl.append(slideEl);
      });
    }

    Object.assign(swiper, {
      $el,
      el,
      $wrapperEl,
      wrapperEl: $wrapperEl[0],
      mounted: true,
      // RTL
      rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
      rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box'
    });
    return true;
  }

  init(el) {
    const swiper = this;
    if (swiper.initialized) return swiper;
    const mounted = swiper.mount(el);
    if (mounted === false) return swiper;
    swiper.emit('beforeInit'); // Set breakpoint

    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    } // Add Classes


    swiper.addClasses(); // Create loop

    if (swiper.params.loop) {
      swiper.loopCreate();
    } // Update size


    swiper.updateSize(); // Update slides

    swiper.updateSlides();

    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    } // Set Grab Cursor


    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }

    if (swiper.params.preloadImages) {
      swiper.preloadImages();
    } // Slide To Initial Slide


    if (swiper.params.loop) {
      swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    } // Attach events


    swiper.attachEvents(); // Init Flag

    swiper.initialized = true; // Emit

    swiper.emit('init');
    swiper.emit('afterInit');
    return swiper;
  }

  destroy(deleteInstance = true, cleanStyles = true) {
    const swiper = this;
    const {
      params,
      $el,
      $wrapperEl,
      slides
    } = swiper;

    if (typeof swiper.params === 'undefined' || swiper.destroyed) {
      return null;
    }

    swiper.emit('beforeDestroy'); // Init Flag

    swiper.initialized = false; // Detach events

    swiper.detachEvents(); // Destroy loop

    if (params.loop) {
      swiper.loopDestroy();
    } // Cleanup styles


    if (cleanStyles) {
      swiper.removeClasses();
      $el.removeAttr('style');
      $wrapperEl.removeAttr('style');

      if (slides && slides.length) {
        slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index');
      }
    }

    swiper.emit('destroy'); // Detach emitter events

    Object.keys(swiper.eventsListeners).forEach(eventName => {
      swiper.off(eventName);
    });

    if (deleteInstance !== false) {
      swiper.$el[0].swiper = null;
      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.deleteProps)(swiper);
    }

    swiper.destroyed = true;
    return null;
  }

  static extendDefaults(newDefaults) {
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)(extendedDefaults, newDefaults);
  }

  static get extendedDefaults() {
    return extendedDefaults;
  }

  static get defaults() {
    return _defaults_js__WEBPACK_IMPORTED_MODULE_20__["default"];
  }

  static installModule(mod) {
    if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
    const modules = Swiper.prototype.__modules__;

    if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }

  static use(module) {
    if (Array.isArray(module)) {
      module.forEach(m => Swiper.installModule(m));
      return Swiper;
    }

    Swiper.installModule(module);
    return Swiper;
  }

}

Object.keys(prototypes).forEach(prototypeGroup => {
  Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([_modules_resize_resize_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modules_observer_observer_js__WEBPACK_IMPORTED_MODULE_7__["default"]]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Swiper);

/***/ }),

/***/ 80341:
/*!**********************************************!*\
  !*** ./node_modules/swiper/core/defaults.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: true,
  direction: 'horizontal',
  touchEventsTarget: 'wrapper',
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: 'input, select, option, textarea, button, video, label',
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: 'slide',
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: undefined,
  breakpointsBase: 'window',
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 0,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // Images
  preloadImages: true,
  updateOnImagesReady: true,
  // loop
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopedSlidesLimit: true,
  loopFillGroupWithBlank: false,
  loopPreventsSlide: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: 'swiper-',
  // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-invisible-blank',
  slideActiveClass: 'swiper-slide-active',
  slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideDuplicateClass: 'swiper-slide-duplicate',
  slideNextClass: 'swiper-slide-next',
  slideDuplicateNextClass: 'swiper-slide-duplicate-next',
  slidePrevClass: 'swiper-slide-prev',
  slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
  wrapperClass: 'swiper-wrapper',
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
});

/***/ }),

/***/ 64818:
/*!****************************************************!*\
  !*** ./node_modules/swiper/core/events-emitter.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-underscore-dangle */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  on(events, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(event => {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },

  once(events, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;

    function onceHandler(...args) {
      self.off(events, onceHandler);

      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }

      handler.apply(self, args);
    }

    onceHandler.__emitterProxy = handler;
    return self.on(events, onceHandler, priority);
  },

  onAny(handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';

    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }

    return self;
  },

  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsAnyListeners) return self;
    const index = self.eventsAnyListeners.indexOf(handler);

    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }

    return self;
  },

  off(events, handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    events.split(' ').forEach(event => {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },

  emit(...args) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    let events;
    let data;
    let context;

    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }

    data.unshift(context);
    const eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(event => {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach(eventHandler => {
          eventHandler.apply(context, [event, ...data]);
        });
      }

      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(eventHandler => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }

});

/***/ }),

/***/ 19123:
/*!**************************************************!*\
  !*** ./node_modules/swiper/core/events/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _onTouchStart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onTouchStart.js */ 28163);
/* harmony import */ var _onTouchMove_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./onTouchMove.js */ 40540);
/* harmony import */ var _onTouchEnd_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onTouchEnd.js */ 81638);
/* harmony import */ var _onResize_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./onResize.js */ 46280);
/* harmony import */ var _onClick_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./onClick.js */ 17235);
/* harmony import */ var _onScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./onScroll.js */ 73826);







let dummyEventAttached = false;

function dummyEventListener() {}

const events = (swiper, method) => {
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  const {
    params,
    touchEvents,
    el,
    wrapperEl,
    device,
    support
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
  const swiperMethod = method; // Touch Events

  if (!support.touch) {
    el[domMethod](touchEvents.start, swiper.onTouchStart, false);
    document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
    document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
  } else {
    const passiveListener = touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
    el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
      passive: false,
      capture
    } : capture);
    el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);

    if (touchEvents.cancel) {
      el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
    }
  } // Prevent Links Clicks


  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]('click', swiper.onClick, true);
  }

  if (params.cssMode) {
    wrapperEl[domMethod]('scroll', swiper.onScroll);
  } // Resize handler


  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', _onResize_js__WEBPACK_IMPORTED_MODULE_4__["default"], true);
  } else {
    swiper[swiperMethod]('observerUpdate', _onResize_js__WEBPACK_IMPORTED_MODULE_4__["default"], true);
  }
};

function attachEvents() {
  const swiper = this;
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  const {
    params,
    support
  } = swiper;
  swiper.onTouchStart = _onTouchStart_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(swiper);
  swiper.onTouchMove = _onTouchMove_js__WEBPACK_IMPORTED_MODULE_2__["default"].bind(swiper);
  swiper.onTouchEnd = _onTouchEnd_js__WEBPACK_IMPORTED_MODULE_3__["default"].bind(swiper);

  if (params.cssMode) {
    swiper.onScroll = _onScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"].bind(swiper);
  }

  swiper.onClick = _onClick_js__WEBPACK_IMPORTED_MODULE_5__["default"].bind(swiper);

  if (support.touch && !dummyEventAttached) {
    document.addEventListener('touchstart', dummyEventListener);
    dummyEventAttached = true;
  }

  events(swiper, 'on');
}

function detachEvents() {
  const swiper = this;
  events(swiper, 'off');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  attachEvents,
  detachEvents
});

/***/ }),

/***/ 17235:
/*!****************************************************!*\
  !*** ./node_modules/swiper/core/events/onClick.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onClick)
/* harmony export */ });
function onClick(e) {
  const swiper = this;
  if (!swiper.enabled) return;

  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();

    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}

/***/ }),

/***/ 46280:
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/events/onResize.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onResize)
/* harmony export */ });
function onResize() {
  const swiper = this;
  const {
    params,
    el
  } = swiper;
  if (el && el.offsetWidth === 0) return; // Breakpoints

  if (params.breakpoints) {
    swiper.setBreakpoint();
  } // Save locks


  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper; // Disable locks on resize

  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();

  if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    swiper.slideTo(swiper.activeIndex, 0, false, true);
  }

  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    swiper.autoplay.run();
  } // Return locks after resize


  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;

  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}

/***/ }),

/***/ 73826:
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/events/onScroll.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onScroll)
/* harmony export */ });
function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;

  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  } // eslint-disable-next-line


  if (swiper.translate === 0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }

  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }

  swiper.emit('setTranslate', swiper.translate, false);
}

/***/ }),

/***/ 81638:
/*!*******************************************************!*\
  !*** ./node_modules/swiper/core/events/onTouchEnd.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onTouchEnd)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);

function onTouchEnd(event) {
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled) return;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;

  if (data.allowTouchCallbacks) {
    swiper.emit('touchEnd', e);
  }

  data.allowTouchCallbacks = false;

  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }

    data.isMoved = false;
    data.startMoving = false;
    return;
  } // Return Grab Cursor


  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  } // Time diff


  const touchEndTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)();
  const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

  if (swiper.allowClick) {
    const pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
    swiper.emit('tap click', e);

    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit('doubleTap doubleClick', e);
    }
  }

  data.lastClickTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)();
  (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
    if (!swiper.destroyed) swiper.allowClick = true;
  });

  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }

  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;

  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }

  if (params.cssMode) {
    return;
  }

  if (swiper.params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  } // Find current slide


  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];

  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

    if (typeof slidesGrid[i + increment] !== 'undefined') {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }

  let rewindFirstIndex = null;
  let rewindLastIndex = null;

  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  } // Find current slide size


  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }

    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
    }

    if (swiper.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }

    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }

      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}

/***/ }),

/***/ 40540:
/*!********************************************************!*\
  !*** ./node_modules/swiper/core/events/onTouchMove.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onTouchMove)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);



function onTouchMove(event) {
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled) return;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;

  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }

    return;
  }

  if (data.isTouchEvent && e.type !== 'touchmove') return;
  const targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
  const pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
  const pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;

  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }

  if (!swiper.allowTouchMove) {
    if (!(0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).is(data.focusableElements)) {
      swiper.allowClick = false;
    }

    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)();
    }

    return;
  }

  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }

  if (data.isTouchEvent && document.activeElement) {
    if (e.target === document.activeElement && (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).is(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }

  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }

  if (e.targetTouches && e.targetTouches.length > 1) return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;

  if (typeof data.isScrolling === 'undefined') {
    let touchAngle;

    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }

  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }

  if (typeof data.startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }

  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }

  if (!data.startMoving) {
    return;
  }

  swiper.allowClick = false;

  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }

  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }

  if (!data.isMoved) {
    if (params.loop && !params.cssMode) {
      swiper.loopFix();
    }

    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);

    if (swiper.animating) {
      swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
    }

    data.allowMomentumBounce = false; // Grab Cursor

    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }

    swiper.emit('sliderFirstMove', e);
  }

  swiper.emit('sliderMove', e);
  data.isMoved = true;
  let diff = swiper.isHorizontal() ? diffX : diffY;
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) diff = -diff;
  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;

  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }

  if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
  }

  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  } // Directions locks


  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }

  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }

  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  } // Threshold


  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }

  if (!params.followFinger || params.cssMode) return; // Update active index in free mode

  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }

  if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  } // Update progress


  swiper.updateProgress(data.currentTranslate); // Update translate

  swiper.setTranslate(data.currentTranslate);
}

/***/ }),

/***/ 28163:
/*!*********************************************************!*\
  !*** ./node_modules/swiper/core/events/onTouchStart.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onTouchStart)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);


 // Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd

function closestElement(selector, base = this) {
  function __closestFrom(el) {
    if (!el || el === (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)() || el === (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)()) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    const found = el.closest(selector);

    if (!found && !el.getRootNode) {
      return null;
    }

    return found || __closestFrom(el.getRootNode().host);
  }

  return __closestFrom(base);
}

function onTouchStart(event) {
  const swiper = this;
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled) return;

  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }

  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }

  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  let $targetEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target);

  if (params.touchEventsTarget === 'wrapper') {
    if (!$targetEl.closest(swiper.wrapperEl).length) return;
  }

  data.isTouchEvent = e.type === 'touchstart';
  if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
  if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return; // change target el for shadow root component

  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== ''; // eslint-disable-next-line

  const eventPath = event.composedPath ? event.composedPath() : event.path;

  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    $targetEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(eventPath[0]);
  }

  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element

  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
    swiper.allowClick = true;
    return;
  }

  if (params.swipeHandler) {
    if (!$targetEl.closest(params.swipeHandler)[0]) return;
  }

  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

  const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === 'prevent') {
      event.preventDefault();
    } else {
      return;
    }
  }

  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;

  if (e.type !== 'touchstart') {
    let preventDefault = true;

    if ($targetEl.is(data.focusableElements)) {
      preventDefault = false;

      if ($targetEl[0].nodeName === 'SELECT') {
        data.isTouched = false;
      }
    }

    if (document.activeElement && (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) {
      document.activeElement.blur();
    }

    const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
      e.preventDefault();
    }
  }

  if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }

  swiper.emit('touchStart', e);
}

/***/ }),

/***/ 56818:
/*!*******************************************************!*\
  !*** ./node_modules/swiper/core/grab-cursor/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _setGrabCursor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setGrabCursor.js */ 45115);
/* harmony import */ var _unsetGrabCursor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unsetGrabCursor.js */ 25884);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  setGrabCursor: _setGrabCursor_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  unsetGrabCursor: _unsetGrabCursor_js__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ 45115:
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/grab-cursor/setGrabCursor.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setGrabCursor)
/* harmony export */ });
function setGrabCursor(moving) {
  const swiper = this;
  if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
  el.style.cursor = 'move';
  el.style.cursor = moving ? 'grabbing' : 'grab';
}

/***/ }),

/***/ 25884:
/*!*****************************************************************!*\
  !*** ./node_modules/swiper/core/grab-cursor/unsetGrabCursor.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ unsetGrabCursor)
/* harmony export */ });
function unsetGrabCursor() {
  const swiper = this;

  if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }

  swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
}

/***/ }),

/***/ 35032:
/*!**************************************************!*\
  !*** ./node_modules/swiper/core/images/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _loadImage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadImage.js */ 68625);
/* harmony import */ var _preloadImages_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preloadImages.js */ 23495);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  loadImage: _loadImage_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  preloadImages: _preloadImages_js__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ 68625:
/*!******************************************************!*\
  !*** ./node_modules/swiper/core/images/loadImage.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadImage)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);


function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  let image;

  function onReady() {
    if (callback) callback();
  }

  const isPicture = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(imageEl).parent('picture')[0];

  if (!isPicture && (!imageEl.complete || !checkForComplete)) {
    if (src) {
      image = new window.Image();
      image.onload = onReady;
      image.onerror = onReady;

      if (sizes) {
        image.sizes = sizes;
      }

      if (srcset) {
        image.srcset = srcset;
      }

      if (src) {
        image.src = src;
      }
    } else {
      onReady();
    }
  } else {
    // image already loaded...
    onReady();
  }
}

/***/ }),

/***/ 23495:
/*!**********************************************************!*\
  !*** ./node_modules/swiper/core/images/preloadImages.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ preloadImages)
/* harmony export */ });
function preloadImages() {
  const swiper = this;
  swiper.imagesToLoad = swiper.$el.find('img');

  function onReady() {
    if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
    if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

    if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
      if (swiper.params.updateOnImagesReady) swiper.update();
      swiper.emit('imagesReady');
    }
  }

  for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
    const imageEl = swiper.imagesToLoad[i];
    swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
  }
}

/***/ }),

/***/ 69355:
/*!************************************************!*\
  !*** ./node_modules/swiper/core/loop/index.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _loopCreate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loopCreate.js */ 81807);
/* harmony import */ var _loopFix_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loopFix.js */ 20492);
/* harmony import */ var _loopDestroy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loopDestroy.js */ 4564);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  loopCreate: _loopCreate_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  loopFix: _loopFix_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  loopDestroy: _loopDestroy_js__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ 81807:
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/loop/loopCreate.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loopCreate)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);


function loopCreate() {
  const swiper = this;
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  const {
    params,
    $wrapperEl
  } = swiper; // Remove duplicated slides

  const $selector = $wrapperEl.children().length > 0 ? (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])($wrapperEl.children()[0].parentNode) : $wrapperEl;
  $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
  let slides = $selector.children(`.${params.slideClass}`);

  if (params.loopFillGroupWithBlank) {
    const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;

    if (blankSlidesNum !== params.slidesPerGroup) {
      for (let i = 0; i < blankSlidesNum; i += 1) {
        const blankNode = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(document.createElement('div')).addClass(`${params.slideClass} ${params.slideBlankClass}`);
        $selector.append(blankNode);
      }

      slides = $selector.children(`.${params.slideClass}`);
    }
  }

  if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
  swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
  swiper.loopedSlides += params.loopAdditionalSlides;

  if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) {
    swiper.loopedSlides = slides.length;
  }

  const prependSlides = [];
  const appendSlides = [];
  slides.each((el, index) => {
    const slide = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(el);
    slide.attr('data-swiper-slide-index', index);
  });

  for (let i = 0; i < swiper.loopedSlides; i += 1) {
    const index = i - Math.floor(i / slides.length) * slides.length;
    appendSlides.push(slides.eq(index)[0]);
    prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
  }

  for (let i = 0; i < appendSlides.length; i += 1) {
    $selector.append((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
  }

  for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
    $selector.prepend((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
}

/***/ }),

/***/ 4564:
/*!******************************************************!*\
  !*** ./node_modules/swiper/core/loop/loopDestroy.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loopDestroy)
/* harmony export */ });
function loopDestroy() {
  const swiper = this;
  const {
    $wrapperEl,
    params,
    slides
  } = swiper;
  $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
  slides.removeAttr('data-swiper-slide-index');
}

/***/ }),

/***/ 20492:
/*!**************************************************!*\
  !*** ./node_modules/swiper/core/loop/loopFix.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loopFix)
/* harmony export */ });
function loopFix() {
  const swiper = this;
  swiper.emit('beforeLoopFix');
  const {
    activeIndex,
    slides,
    loopedSlides,
    allowSlidePrev,
    allowSlideNext,
    snapGrid,
    rtlTranslate: rtl
  } = swiper;
  let newIndex;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  const snapTranslate = -snapGrid[activeIndex];
  const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

  if (activeIndex < loopedSlides) {
    newIndex = slides.length - loopedSlides * 3 + activeIndex;
    newIndex += loopedSlides;
    const slideChanged = swiper.slideTo(newIndex, 0, false, true);

    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  } else if (activeIndex >= slides.length - loopedSlides) {
    // Fix For Positive Oversliding
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    const slideChanged = swiper.slideTo(newIndex, 0, false, true);

    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  }

  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  swiper.emit('loopFix');
}

/***/ }),

/***/ 58220:
/*!********************************************************!*\
  !*** ./node_modules/swiper/core/moduleExtendParams.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ moduleExtendParams)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.js */ 73809);

function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj = {}) {
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];

    if (typeof moduleParams !== 'object' || moduleParams === null) {
      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.extend)(allModulesParams, obj);
      return;
    }

    if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
      params[moduleParamName] = {
        auto: true
      };
    }

    if (!(moduleParamName in params && 'enabled' in moduleParams)) {
      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.extend)(allModulesParams, obj);
      return;
    }

    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }

    if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }

    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.extend)(allModulesParams, obj);
  };
}

/***/ }),

/***/ 38833:
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/modules/observer/observer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Observer)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);

function Observer({
  swiper,
  extendParams,
  on,
  emit
}) {
  const observers = [];
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();

  const attach = (target, options = {}) => {
    const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
    const observer = new ObserverFunc(mutations => {
      // The observerUpdate event should only be triggered
      // once despite the number of mutations.  Additional
      // triggers are redundant and are very costly
      if (mutations.length === 1) {
        emit('observerUpdate', mutations[0]);
        return;
      }

      const observerUpdate = function observerUpdate() {
        emit('observerUpdate', mutations[0]);
      };

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(observerUpdate);
      } else {
        window.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: typeof options.childList === 'undefined' ? true : options.childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData
    });
    observers.push(observer);
  };

  const init = () => {
    if (!swiper.params.observer) return;

    if (swiper.params.observeParents) {
      const containerParents = swiper.$el.parents();

      for (let i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    } // Observe container


    attach(swiper.$el[0], {
      childList: swiper.params.observeSlideChildren
    }); // Observe wrapper

    attach(swiper.$wrapperEl[0], {
      attributes: false
    });
  };

  const destroy = () => {
    observers.forEach(observer => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };

  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on('init', init);
  on('destroy', destroy);
}

/***/ }),

/***/ 96526:
/*!***********************************************************!*\
  !*** ./node_modules/swiper/core/modules/resize/resize.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Resize)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);

function Resize({
  swiper,
  on,
  emit
}) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  let observer = null;
  let animationFrame = null;

  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('beforeResize');
    emit('resize');
  };

  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    observer = new ResizeObserver(entries => {
      animationFrame = window.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(({
          contentBoxSize,
          contentRect,
          target
        }) => {
          if (target && target !== swiper.el) return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });

        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };

  const removeObserver = () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }

    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };

  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('orientationchange');
  };

  on('init', () => {
    if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
      createObserver();
      return;
    }

    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', orientationChangeHandler);
  });
  on('destroy', () => {
    removeObserver();
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('orientationchange', orientationChangeHandler);
  });
}

/***/ }),

/***/ 97190:
/*!*************************************************!*\
  !*** ./node_modules/swiper/core/slide/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slideTo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slideTo.js */ 67814);
/* harmony import */ var _slideToLoop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slideToLoop.js */ 85642);
/* harmony import */ var _slideNext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slideNext.js */ 19361);
/* harmony import */ var _slidePrev_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slidePrev.js */ 3866);
/* harmony import */ var _slideReset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slideReset.js */ 96656);
/* harmony import */ var _slideToClosest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./slideToClosest.js */ 74397);
/* harmony import */ var _slideToClickedSlide_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./slideToClickedSlide.js */ 26854);







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  slideTo: _slideTo_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  slideToLoop: _slideToLoop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  slideNext: _slideNext_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  slidePrev: _slidePrev_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  slideReset: _slideReset_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  slideToClosest: _slideToClosest_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  slideToClickedSlide: _slideToClickedSlide_js__WEBPACK_IMPORTED_MODULE_6__["default"]
});

/***/ }),

/***/ 19361:
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideNext.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slideNext)
/* harmony export */ });
/* eslint no-unused-vars: "off" */
function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    animating,
    enabled,
    params
  } = swiper;
  if (!enabled) return swiper;
  let perGroup = params.slidesPerGroup;

  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
  }

  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;

  if (params.loop) {
    if (animating && params.loopPreventsSlide) return false;
    swiper.loopFix(); // eslint-disable-next-line

    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
  }

  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }

  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}

/***/ }),

/***/ 3866:
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/slide/slidePrev.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slidePrev)
/* harmony export */ });
/* eslint no-unused-vars: "off" */
function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    params,
    animating,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled) return swiper;

  if (params.loop) {
    if (animating && params.loopPreventsSlide) return false;
    swiper.loopFix(); // eslint-disable-next-line

    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
  }

  const translate = rtlTranslate ? swiper.translate : -swiper.translate;

  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }

  const normalizedTranslate = normalize(translate);
  const normalizedSnapGrid = snapGrid.map(val => normalize(val));
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

  if (typeof prevSnap === 'undefined' && params.cssMode) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        // prevSnap = snap;
        prevSnapIndex = snapIndex;
      }
    });

    if (typeof prevSnapIndex !== 'undefined') {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }

  let prevIndex = 0;

  if (typeof prevSnap !== 'undefined') {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;

    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }

  if (params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  }

  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}

/***/ }),

/***/ 96656:
/*!******************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideReset.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slideReset)
/* harmony export */ });
/* eslint no-unused-vars: "off" */
function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}

/***/ }),

/***/ 67814:
/*!***************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideTo.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slideTo)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);

function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
  if (typeof index !== 'number' && typeof index !== 'string') {
    throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
  }

  if (typeof index === 'string') {
    /**
     * The `index` argument converted from `string` to `number`.
     * @type {number}
     */
    const indexAsNumber = parseInt(index, 10);
    /**
     * Determines whether the `index` argument is a valid `number`
     * after being converted from the `string` type.
     * @type {boolean}
     */

    const isValidNumber = isFinite(indexAsNumber);

    if (!isValidNumber) {
      throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
    } // Knowing that the converted `index` is a valid number,
    // we can update the original argument's value.


    index = indexAsNumber;
  }

  const swiper = this;
  let slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;

  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }

  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  const translate = -snapGrid[snapIndex]; // Normalize slideIndex

  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);

      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  } // Directions locks


  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
      return false;
    }

    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) return false;
    }
  }

  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  } // Update progress


  swiper.updateProgress(translate);
  let direction;
  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

  if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
    swiper.updateActiveIndex(slideIndex); // Update Height

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    swiper.updateSlidesClasses();

    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }

    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }

    return false;
  }

  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t = rtl ? translate : -translate;

    if (speed === 0) {
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = 'none';
        swiper._immediateVirtual = true;
      }

      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;

      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = '';
          swiper._swiperImmediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.animateCSSModeScroll)({
          swiper,
          targetPosition: t,
          side: isH ? 'left' : 'top'
        });
        return true;
      }

      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: t,
        behavior: 'smooth'
      });
    }

    return true;
  }

  swiper.setTransition(speed);
  swiper.setTranslate(translate);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit('beforeTransitionStart', speed, internal);
  swiper.transitionStart(runCallbacks, direction);

  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;

    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
        if (!swiper || swiper.destroyed) return;
        if (e.target !== this) return;
        swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }

    swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
    swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
  }

  return true;
}

/***/ }),

/***/ 26854:
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideToClickedSlide.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slideToClickedSlide)
/* harmony export */ });
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);


function slideToClickedSlide() {
  const swiper = this;
  const {
    params,
    $wrapperEl
  } = swiper;
  const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;

  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
        (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}

/***/ }),

/***/ 74397:
/*!**********************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideToClosest.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slideToClosest)
/* harmony export */ });
/* eslint no-unused-vars: "off" */
function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
  const swiper = this;
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

  if (translate >= swiper.snapGrid[snapIndex]) {
    // The current translate is on or after the current snap index, so the choice
    // is between the current index and the one after it.
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];

    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    // The current translate is before the current snap index, so the choice
    // is between the current index and the one before it.
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];

    if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }

  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}

/***/ }),

/***/ 85642:
/*!*******************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideToLoop.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slideToLoop)
/* harmony export */ });
function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
  if (typeof index === 'string') {
    /**
     * The `index` argument converted from `string` to `number`.
     * @type {number}
     */
    const indexAsNumber = parseInt(index, 10);
    /**
     * Determines whether the `index` argument is a valid `number`
     * after being converted from the `string` type.
     * @type {boolean}
     */

    const isValidNumber = isFinite(indexAsNumber);

    if (!isValidNumber) {
      throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
    } // Knowing that the converted `index` is a valid number,
    // we can update the original argument's value.


    index = indexAsNumber;
  }

  const swiper = this;
  let newIndex = index;

  if (swiper.params.loop) {
    newIndex += swiper.loopedSlides;
  }

  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}

/***/ }),

/***/ 5026:
/*!******************************************************!*\
  !*** ./node_modules/swiper/core/transition/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _setTransition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setTransition.js */ 97000);
/* harmony import */ var _transitionStart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitionStart.js */ 51855);
/* harmony import */ var _transitionEnd_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transitionEnd.js */ 96982);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  setTransition: _setTransition_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  transitionStart: _transitionStart_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  transitionEnd: _transitionEnd_js__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ 97000:
/*!**************************************************************!*\
  !*** ./node_modules/swiper/core/transition/setTransition.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setTransition)
/* harmony export */ });
function setTransition(duration, byController) {
  const swiper = this;

  if (!swiper.params.cssMode) {
    swiper.$wrapperEl.transition(duration);
  }

  swiper.emit('setTransition', duration, byController);
}

/***/ }),

/***/ 15904:
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/transition/transitionEmit.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transitionEmit)
/* harmony export */ });
function transitionEmit({
  swiper,
  runCallbacks,
  direction,
  step
}) {
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;

  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
  }

  swiper.emit(`transition${step}`);

  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      swiper.emit(`slideResetTransition${step}`);
      return;
    }

    swiper.emit(`slideChangeTransition${step}`);

    if (dir === 'next') {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}

/***/ }),

/***/ 96982:
/*!**************************************************************!*\
  !*** ./node_modules/swiper/core/transition/transitionEnd.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transitionEnd)
/* harmony export */ });
/* harmony import */ var _transitionEmit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transitionEmit.js */ 15904);

function transitionEnd(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  (0,_transitionEmit_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    swiper,
    runCallbacks,
    direction,
    step: 'End'
  });
}

/***/ }),

/***/ 51855:
/*!****************************************************************!*\
  !*** ./node_modules/swiper/core/transition/transitionStart.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transitionStart)
/* harmony export */ });
/* harmony import */ var _transitionEmit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transitionEmit.js */ 15904);

function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode) return;

  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }

  (0,_transitionEmit_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    swiper,
    runCallbacks,
    direction,
    step: 'Start'
  });
}

/***/ }),

/***/ 10286:
/*!************************************************************!*\
  !*** ./node_modules/swiper/core/translate/getTranslate.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSwiperTranslate)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);

function getSwiperTranslate(axis = this.isHorizontal() ? 'x' : 'y') {
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate,
    $wrapperEl
  } = swiper;

  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }

  if (params.cssMode) {
    return translate;
  }

  let currentTranslate = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.getTranslate)($wrapperEl[0], axis);
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}

/***/ }),

/***/ 90444:
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/translate/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getTranslate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getTranslate.js */ 10286);
/* harmony import */ var _setTranslate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setTranslate.js */ 25179);
/* harmony import */ var _minTranslate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minTranslate.js */ 22889);
/* harmony import */ var _maxTranslate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maxTranslate.js */ 51833);
/* harmony import */ var _translateTo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./translateTo.js */ 2953);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getTranslate: _getTranslate_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  setTranslate: _setTranslate_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  minTranslate: _minTranslate_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  maxTranslate: _maxTranslate_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  translateTo: _translateTo_js__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ 51833:
/*!************************************************************!*\
  !*** ./node_modules/swiper/core/translate/maxTranslate.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ maxTranslate)
/* harmony export */ });
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}

/***/ }),

/***/ 22889:
/*!************************************************************!*\
  !*** ./node_modules/swiper/core/translate/minTranslate.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ minTranslate)
/* harmony export */ });
function minTranslate() {
  return -this.snapGrid[0];
}

/***/ }),

/***/ 25179:
/*!************************************************************!*\
  !*** ./node_modules/swiper/core/translate/setTranslate.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setTranslate)
/* harmony export */ });
function setTranslate(translate, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    $wrapperEl,
    wrapperEl,
    progress
  } = swiper;
  let x = 0;
  let y = 0;
  const z = 0;

  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }

  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }

  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
  }

  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
  }

  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }

  swiper.emit('setTranslate', swiper.translate, byController);
}

/***/ }),

/***/ 2953:
/*!***********************************************************!*\
  !*** ./node_modules/swiper/core/translate/translateTo.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ translateTo)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);

function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;

  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }

  const minTranslate = swiper.minTranslate();
  const maxTranslate = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress

  swiper.updateProgress(newTranslate);

  if (params.cssMode) {
    const isH = swiper.isHorizontal();

    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.animateCSSModeScroll)({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? 'left' : 'top'
        });
        return true;
      }

      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: -newTranslate,
        behavior: 'smooth'
      });
    }

    return true;
  }

  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);

    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionEnd');
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);

    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionStart');
    }

    if (!swiper.animating) {
      swiper.animating = true;

      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;

          if (runCallbacks) {
            swiper.emit('transitionEnd');
          }
        };
      }

      swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
      swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
    }
  }

  return true;
}

/***/ }),

/***/ 71009:
/*!**************************************************!*\
  !*** ./node_modules/swiper/core/update/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _updateSize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateSize.js */ 2114);
/* harmony import */ var _updateSlides_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateSlides.js */ 28109);
/* harmony import */ var _updateAutoHeight_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateAutoHeight.js */ 71757);
/* harmony import */ var _updateSlidesOffset_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateSlidesOffset.js */ 94129);
/* harmony import */ var _updateSlidesProgress_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./updateSlidesProgress.js */ 3625);
/* harmony import */ var _updateProgress_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./updateProgress.js */ 55005);
/* harmony import */ var _updateSlidesClasses_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./updateSlidesClasses.js */ 95431);
/* harmony import */ var _updateActiveIndex_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./updateActiveIndex.js */ 37271);
/* harmony import */ var _updateClickedSlide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./updateClickedSlide.js */ 46387);









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  updateSize: _updateSize_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  updateSlides: _updateSlides_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  updateAutoHeight: _updateAutoHeight_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  updateSlidesOffset: _updateSlidesOffset_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  updateSlidesProgress: _updateSlidesProgress_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  updateProgress: _updateProgress_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  updateSlidesClasses: _updateSlidesClasses_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  updateActiveIndex: _updateActiveIndex_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  updateClickedSlide: _updateClickedSlide_js__WEBPACK_IMPORTED_MODULE_8__["default"]
});

/***/ }),

/***/ 37271:
/*!**************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateActiveIndex.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateActiveIndex)
/* harmony export */ });
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    slidesGrid,
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;

  if (typeof activeIndex === 'undefined') {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate >= slidesGrid[i]) {
        activeIndex = i;
      }
    } // Normalize slideIndex


    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
    }
  }

  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }

  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }

    return;
  } // Get real index


  const realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
  Object.assign(swiper, {
    snapIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');

  if (previousRealIndex !== realIndex) {
    swiper.emit('realIndexChange');
  }

  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    swiper.emit('slideChange');
  }
}

/***/ }),

/***/ 71757:
/*!*************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateAutoHeight.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateAutoHeight)
/* harmony export */ });
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);

function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i;

  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }

  const getSlideByIndex = index => {
    if (isVirtual) {
      return swiper.slides.filter(el => parseInt(el.getAttribute('data-swiper-slide-index'), 10) === index)[0];
    }

    return swiper.slides.eq(index)[0];
  }; // Find slides currently in view


  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])([])).each(slide => {
        activeSlides.push(slide);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  } // Find new height from highest slide in view


  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  } // Update Height


  if (newHeight || newHeight === 0) swiper.$wrapperEl.css('height', `${newHeight}px`);
}

/***/ }),

/***/ 46387:
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateClickedSlide.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateClickedSlide)
/* harmony export */ });
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);

function updateClickedSlide(e) {
  const swiper = this;
  const params = swiper.params;
  const slide = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e).closest(`.${params.slideClass}`)[0];
  let slideFound = false;
  let slideIndex;

  if (slide) {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }

  if (slide && slideFound) {
    swiper.clickedSlide = slide;

    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(slide).attr('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }

  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}

/***/ }),

/***/ 55005:
/*!***********************************************************!*\
  !*** ./node_modules/swiper/core/update/updateProgress.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateProgress)
/* harmony export */ });
function updateProgress(translate) {
  const swiper = this;

  if (typeof translate === 'undefined') {
    const multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }

  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;

  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / translatesDiff;
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }

  Object.assign(swiper, {
    progress,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);

  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }

  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }

  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit('fromEdge');
  }

  swiper.emit('progress', progress);
}

/***/ }),

/***/ 2114:
/*!*******************************************************!*\
  !*** ./node_modules/swiper/core/update/updateSize.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateSize)
/* harmony export */ });
function updateSize() {
  const swiper = this;
  let width;
  let height;
  const $el = swiper.$el;

  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = $el[0].clientWidth;
  }

  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = $el[0].clientHeight;
  }

  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  } // Subtract paddings


  width = width - parseInt($el.css('padding-left') || 0, 10) - parseInt($el.css('padding-right') || 0, 10);
  height = height - parseInt($el.css('padding-top') || 0, 10) - parseInt($el.css('padding-bottom') || 0, 10);
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}

/***/ }),

/***/ 28109:
/*!*********************************************************!*\
  !*** ./node_modules/swiper/core/update/updateSlides.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateSlides)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);

function updateSlides() {
  const swiper = this;

  function getDirectionLabel(property) {
    if (swiper.isHorizontal()) {
      return property;
    } // prettier-ignore


    return {
      'width': 'height',
      'margin-top': 'margin-left',
      'margin-bottom ': 'margin-right',
      'margin-left': 'margin-top',
      'margin-right': 'margin-bottom',
      'padding-left': 'padding-top',
      'padding-right': 'padding-bottom',
      'marginRight': 'marginBottom'
    }[property];
  }

  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
  }

  const params = swiper.params;
  const {
    $wrapperEl,
    size: swiperSize,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;

  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }

  let offsetAfter = params.slidesOffsetAfter;

  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }

  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;

  if (typeof swiperSize === 'undefined') {
    return;
  }

  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
  }

  swiper.virtualSize = -spaceBetween; // reset margins

  if (rtl) slides.css({
    marginLeft: '',
    marginBottom: '',
    marginTop: ''
  });else slides.css({
    marginRight: '',
    marginBottom: '',
    marginTop: ''
  }); // reset cssMode offsets

  if (params.centeredSlides && params.cssMode) {
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-before', '');
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-after', '');
  }

  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;

  if (gridEnabled) {
    swiper.grid.initSlides(slidesLength);
  } // Calc slides


  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {
    return typeof params.breakpoints[key].slidesPerView !== 'undefined';
  }).length > 0;

  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    const slide = slides.eq(i);

    if (gridEnabled) {
      swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
    }

    if (slide.css('display') === 'none') continue; // eslint-disable-line

    if (params.slidesPerView === 'auto') {
      if (shouldResetSlideSize) {
        slides[i].style[getDirectionLabel('width')] = ``;
      }

      const slideStyles = getComputedStyle(slide[0]);
      const currentTransform = slide[0].style.transform;
      const currentWebKitTransform = slide[0].style.webkitTransform;

      if (currentTransform) {
        slide[0].style.transform = 'none';
      }

      if (currentWebKitTransform) {
        slide[0].style.webkitTransform = 'none';
      }

      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
      } else {
        // eslint-disable-next-line
        const width = getDirectionPropertyValue(slideStyles, 'width');
        const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
        const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
        const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
        const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
        const boxSizing = slideStyles.getPropertyValue('box-sizing');

        if (boxSizing && boxSizing === 'border-box') {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide[0];
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }

      if (currentTransform) {
        slide[0].style.transform = currentTransform;
      }

      if (currentWebKitTransform) {
        slide[0].style.webkitTransform = currentWebKitTransform;
      }

      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);

      if (slides[i]) {
        slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;
      }
    }

    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }

    slidesSizesGrid.push(slideSize);

    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }

    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }

  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;

  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    $wrapperEl.css({
      width: `${swiper.virtualSize + params.spaceBetween}px`
    });
  }

  if (params.setWrapperSize) {
    $wrapperEl.css({
      [getDirectionLabel('width')]: `${swiper.virtualSize + params.spaceBetween}px`
    });
  }

  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  } // Remove last grid elements depending on width


  if (!params.centeredSlides) {
    const newSlidesGrid = [];

    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);

      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }

    snapGrid = newSlidesGrid;

    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }

  if (snapGrid.length === 0) snapGrid = [0];

  if (params.spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
    slides.filter((_, slideIndex) => {
      if (!params.cssMode) return true;

      if (slideIndex === slides.length - 1) {
        return false;
      }

      return true;
    }).css({
      [key]: `${spaceBetween}px`
    });
  }

  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach(slideSizeValue => {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    const maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map(snap => {
      if (snap < 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }

  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach(slideSizeValue => {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;

    if (allSlidesSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }

  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });

  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
  }

  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }

  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit('snapGridLengthChange');
  }

  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }

  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }

  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);

    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.$el.removeClass(backFaceHiddenClass);
    }
  }
}

/***/ }),

/***/ 95431:
/*!****************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateSlidesClasses.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateSlidesClasses)
/* harmony export */ });
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    $wrapperEl,
    activeIndex,
    realIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
  let activeSlide;

  if (isVirtual) {
    activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
  } else {
    activeSlide = slides.eq(activeIndex);
  } // Active classes


  activeSlide.addClass(params.slideActiveClass);

  if (params.loop) {
    // Duplicate to all looped slides
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
    } else {
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
    }
  } // Next Slide


  let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);

  if (params.loop && nextSlide.length === 0) {
    nextSlide = slides.eq(0);
    nextSlide.addClass(params.slideNextClass);
  } // Prev Slide


  let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);

  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides.eq(-1);
    prevSlide.addClass(params.slidePrevClass);
  }

  if (params.loop) {
    // Duplicate to all looped slides
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
    } else {
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
    }

    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
    } else {
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
    }
  }

  swiper.emitSlidesClasses();
}

/***/ }),

/***/ 94129:
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateSlidesOffset.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateSlidesOffset)
/* harmony export */ });
function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;

  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
  }
}

/***/ }),

/***/ 3625:
/*!*****************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateSlidesProgress.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateSlidesProgress)
/* harmony export */ });
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);

function updateSlidesProgress(translate = this && this.translate || 0) {
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
  let offsetCenter = -translate;
  if (rtl) offsetCenter = translate; // Visible Slides

  slides.removeClass(params.slideVisibleClass);
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];

  for (let i = 0; i < slides.length; i += 1) {
    const slide = slides[i];
    let slideOffset = slide.swiperSlideOffset;

    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }

    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

    if (isVisible) {
      swiper.visibleSlides.push(slide);
      swiper.visibleSlidesIndexes.push(i);
      slides.eq(i).addClass(params.slideVisibleClass);
    }

    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }

  swiper.visibleSlides = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(swiper.visibleSlides);
}

/***/ }),

/***/ 66525:
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/a11y/a11y.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ A11y)
/* harmony export */ });
/* harmony import */ var _shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/classes-to-selector.js */ 31472);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);


function A11y({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    a11y: {
      enabled: true,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      itemRoleDescriptionMessage: null,
      slideRole: 'group',
      id: null
    }
  });
  swiper.a11y = {
    clicked: false
  };
  let liveRegion = null;

  function notify(message) {
    const notification = liveRegion;
    if (notification.length === 0) return;
    notification.html('');
    notification.html(message);
  }

  function getRandomNumber(size = 16) {
    const randomChar = () => Math.round(16 * Math.random()).toString(16);

    return 'x'.repeat(size).replace(/x/g, randomChar);
  }

  function makeElFocusable($el) {
    $el.attr('tabIndex', '0');
  }

  function makeElNotFocusable($el) {
    $el.attr('tabIndex', '-1');
  }

  function addElRole($el, role) {
    $el.attr('role', role);
  }

  function addElRoleDescription($el, description) {
    $el.attr('aria-roledescription', description);
  }

  function addElControls($el, controls) {
    $el.attr('aria-controls', controls);
  }

  function addElLabel($el, label) {
    $el.attr('aria-label', label);
  }

  function addElId($el, id) {
    $el.attr('id', id);
  }

  function addElLive($el, live) {
    $el.attr('aria-live', live);
  }

  function disableEl($el) {
    $el.attr('aria-disabled', true);
  }

  function enableEl($el) {
    $el.attr('aria-disabled', false);
  }

  function onEnterOrSpaceKey(e) {
    if (e.keyCode !== 13 && e.keyCode !== 32) return;
    const params = swiper.params.a11y;
    const $targetEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target);

    if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
      if (!(swiper.isEnd && !swiper.params.loop)) {
        swiper.slideNext();
      }

      if (swiper.isEnd) {
        notify(params.lastSlideMessage);
      } else {
        notify(params.nextSlideMessage);
      }
    }

    if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
      if (!(swiper.isBeginning && !swiper.params.loop)) {
        swiper.slidePrev();
      }

      if (swiper.isBeginning) {
        notify(params.firstSlideMessage);
      } else {
        notify(params.prevSlideMessage);
      }
    }

    if (swiper.pagination && $targetEl.is((0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(swiper.params.pagination.bulletClass))) {
      $targetEl[0].click();
    }
  }

  function updateNavigation() {
    if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;

    if ($prevEl && $prevEl.length > 0) {
      if (swiper.isBeginning) {
        disableEl($prevEl);
        makeElNotFocusable($prevEl);
      } else {
        enableEl($prevEl);
        makeElFocusable($prevEl);
      }
    }

    if ($nextEl && $nextEl.length > 0) {
      if (swiper.isEnd) {
        disableEl($nextEl);
        makeElNotFocusable($nextEl);
      } else {
        enableEl($nextEl);
        makeElFocusable($nextEl);
      }
    }
  }

  function hasPagination() {
    return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
  }

  function hasClickablePagination() {
    return hasPagination() && swiper.params.pagination.clickable;
  }

  function updatePagination() {
    const params = swiper.params.a11y;
    if (!hasPagination()) return;
    swiper.pagination.bullets.each(bulletEl => {
      const $bulletEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(bulletEl);

      if (swiper.params.pagination.clickable) {
        makeElFocusable($bulletEl);

        if (!swiper.params.pagination.renderBullet) {
          addElRole($bulletEl, 'button');
          addElLabel($bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1));
        }
      }

      if ($bulletEl.is(`.${swiper.params.pagination.bulletActiveClass}`)) {
        $bulletEl.attr('aria-current', 'true');
      } else {
        $bulletEl.removeAttr('aria-current');
      }
    });
  }

  const initNavEl = ($el, wrapperId, message) => {
    makeElFocusable($el);

    if ($el[0].tagName !== 'BUTTON') {
      addElRole($el, 'button');
      $el.on('keydown', onEnterOrSpaceKey);
    }

    addElLabel($el, message);
    addElControls($el, wrapperId);
  };

  const handlePointerDown = () => {
    swiper.a11y.clicked = true;
  };

  const handlePointerUp = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!swiper.destroyed) {
          swiper.a11y.clicked = false;
        }
      });
    });
  };

  const handleFocus = e => {
    if (swiper.a11y.clicked) return;
    const slideEl = e.target.closest(`.${swiper.params.slideClass}`);
    if (!slideEl || !swiper.slides.includes(slideEl)) return;
    const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
    const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
    if (isActive || isVisible) return;
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;

    if (swiper.isHorizontal()) {
      swiper.el.scrollLeft = 0;
    } else {
      swiper.el.scrollTop = 0;
    }

    swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
  };

  const initSlides = () => {
    const params = swiper.params.a11y;

    if (params.itemRoleDescriptionMessage) {
      addElRoleDescription((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(swiper.slides), params.itemRoleDescriptionMessage);
    }

    if (params.slideRole) {
      addElRole((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(swiper.slides), params.slideRole);
    }

    const slidesLength = swiper.params.loop ? swiper.slides.filter(el => !el.classList.contains(swiper.params.slideDuplicateClass)).length : swiper.slides.length;

    if (params.slideLabelMessage) {
      swiper.slides.each((slideEl, index) => {
        const $slideEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(slideEl);
        const slideIndex = swiper.params.loop ? parseInt($slideEl.attr('data-swiper-slide-index'), 10) : index;
        const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
        addElLabel($slideEl, ariaLabelMessage);
      });
    }
  };

  const init = () => {
    const params = swiper.params.a11y;
    swiper.$el.append(liveRegion); // Container

    const $containerEl = swiper.$el;

    if (params.containerRoleDescriptionMessage) {
      addElRoleDescription($containerEl, params.containerRoleDescriptionMessage);
    }

    if (params.containerMessage) {
      addElLabel($containerEl, params.containerMessage);
    } // Wrapper


    const $wrapperEl = swiper.$wrapperEl;
    const wrapperId = params.id || $wrapperEl.attr('id') || `swiper-wrapper-${getRandomNumber(16)}`;
    const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
    addElId($wrapperEl, wrapperId);
    addElLive($wrapperEl, live); // Slide

    initSlides(); // Navigation

    let $nextEl;
    let $prevEl;

    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }

    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }

    if ($nextEl && $nextEl.length) {
      initNavEl($nextEl, wrapperId, params.nextSlideMessage);
    }

    if ($prevEl && $prevEl.length) {
      initNavEl($prevEl, wrapperId, params.prevSlideMessage);
    } // Pagination


    if (hasClickablePagination()) {
      swiper.pagination.$el.on('keydown', (0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(swiper.params.pagination.bulletClass), onEnterOrSpaceKey);
    } // Tab focus


    swiper.$el.on('focus', handleFocus, true);
    swiper.$el.on('pointerdown', handlePointerDown, true);
    swiper.$el.on('pointerup', handlePointerUp, true);
  };

  function destroy() {
    if (liveRegion && liveRegion.length > 0) liveRegion.remove();
    let $nextEl;
    let $prevEl;

    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }

    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }

    if ($nextEl) {
      $nextEl.off('keydown', onEnterOrSpaceKey);
    }

    if ($prevEl) {
      $prevEl.off('keydown', onEnterOrSpaceKey);
    } // Pagination


    if (hasClickablePagination()) {
      swiper.pagination.$el.off('keydown', (0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(swiper.params.pagination.bulletClass), onEnterOrSpaceKey);
    } // Tab focus


    swiper.$el.off('focus', handleFocus, true);
    swiper.$el.off('pointerdown', handlePointerDown, true);
    swiper.$el.off('pointerup', handlePointerUp, true);
  }

  on('beforeInit', () => {
    liveRegion = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(`<span class="${swiper.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`);
  });
  on('afterInit', () => {
    if (!swiper.params.a11y.enabled) return;
    init();
  });
  on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
    if (!swiper.params.a11y.enabled) return;
    initSlides();
  });
  on('fromEdge toEdge afterInit lock unlock', () => {
    if (!swiper.params.a11y.enabled) return;
    updateNavigation();
  });
  on('paginationUpdate', () => {
    if (!swiper.params.a11y.enabled) return;
    updatePagination();
  });
  on('destroy', () => {
    if (!swiper.params.a11y.enabled) return;
    destroy();
  });
}

/***/ }),

/***/ 64370:
/*!**********************************************************!*\
  !*** ./node_modules/swiper/modules/autoplay/autoplay.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Autoplay)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);
/* eslint no-underscore-dangle: "off" */

/* eslint no-use-before-define: "off" */


function Autoplay({
  swiper,
  extendParams,
  on,
  emit
}) {
  let timeout;
  swiper.autoplay = {
    running: false,
    paused: false
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });

  function run() {
    if (!swiper.size) {
      swiper.autoplay.running = false;
      swiper.autoplay.paused = false;
      return;
    }

    const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
    let delay = swiper.params.autoplay.delay;

    if ($activeSlideEl.attr('data-swiper-autoplay')) {
      delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
    }

    clearTimeout(timeout);
    timeout = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {
      let autoplayResult;

      if (swiper.params.autoplay.reverseDirection) {
        if (swiper.params.loop) {
          swiper.loopFix();
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit('autoplay');
        } else if (!swiper.isBeginning) {
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
          emit('autoplay');
        } else {
          stop();
        }
      } else if (swiper.params.loop) {
        swiper.loopFix();
        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        emit('autoplay');
      } else if (!swiper.isEnd) {
        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        emit('autoplay');
      } else if (!swiper.params.autoplay.stopOnLastSlide) {
        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
        emit('autoplay');
      } else {
        stop();
      }

      if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {
        run();
      }
    }, delay);
  }

  function start() {
    if (typeof timeout !== 'undefined') return false;
    if (swiper.autoplay.running) return false;
    swiper.autoplay.running = true;
    emit('autoplayStart');
    run();
    return true;
  }

  function stop() {
    if (!swiper.autoplay.running) return false;
    if (typeof timeout === 'undefined') return false;

    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }

    swiper.autoplay.running = false;
    emit('autoplayStop');
    return true;
  }

  function pause(speed) {
    if (!swiper.autoplay.running) return;
    if (swiper.autoplay.paused) return;
    if (timeout) clearTimeout(timeout);
    swiper.autoplay.paused = true;

    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
      swiper.autoplay.paused = false;
      run();
    } else {
      ['transitionend', 'webkitTransitionEnd'].forEach(event => {
        swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
      });
    }
  }

  function onVisibilityChange() {
    const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();

    if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
      pause();
    }

    if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
      run();
      swiper.autoplay.paused = false;
    }
  }

  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
    if (e.target !== swiper.$wrapperEl[0]) return;
    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
      swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
    swiper.autoplay.paused = false;

    if (!swiper.autoplay.running) {
      stop();
    } else {
      run();
    }
  }

  function onMouseEnter() {
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
    } else {
      emit('autoplayPause');
      pause();
    }

    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
      swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
  }

  function onMouseLeave() {
    if (swiper.params.autoplay.disableOnInteraction) {
      return;
    }

    swiper.autoplay.paused = false;
    emit('autoplayResume');
    run();
  }

  function attachMouseEvents() {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.$el.on('mouseenter', onMouseEnter);
      swiper.$el.on('mouseleave', onMouseLeave);
    }
  }

  function detachMouseEvents() {
    swiper.$el.off('mouseenter', onMouseEnter);
    swiper.$el.off('mouseleave', onMouseLeave);
  }

  on('init', () => {
    if (swiper.params.autoplay.enabled) {
      start();
      const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
      document.addEventListener('visibilitychange', onVisibilityChange);
      attachMouseEvents();
    }
  });
  on('beforeTransitionStart', (_s, speed, internal) => {
    if (swiper.autoplay.running) {
      if (internal || !swiper.params.autoplay.disableOnInteraction) {
        swiper.autoplay.pause(speed);
      } else {
        stop();
      }
    }
  });
  on('sliderFirstMove', () => {
    if (swiper.autoplay.running) {
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        pause();
      }
    }
  });
  on('touchEnd', () => {
    if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
      run();
    }
  });
  on('destroy', () => {
    detachMouseEvents();

    if (swiper.autoplay.running) {
      stop();
    }

    const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });
  Object.assign(swiper.autoplay, {
    pause,
    run,
    start,
    stop
  });
}

/***/ }),

/***/ 13511:
/*!**************************************************************!*\
  !*** ./node_modules/swiper/modules/controller/controller.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);
/* eslint no-bitwise: ["error", { "allow": [">>"] }] */

function Controller({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide' // or 'container'

    }
  });
  swiper.controller = {
    control: undefined
  };

  function LinearSpline(x, y) {
    const binarySearch = function search() {
      let maxIndex;
      let minIndex;
      let guess;
      return (array, val) => {
        minIndex = -1;
        maxIndex = array.length;

        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;

          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }

        return maxIndex;
      };
    }();

    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.

    let i1;
    let i3;

    this.interpolate = function interpolate(x2) {
      if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):

      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

      return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
    };

    return this;
  } // xxx: for now i will just save one spline function to to


  function getInterpolateFunction(c) {
    if (!swiper.controller.spline) {
      swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
    }
  }

  function setTranslate(_t, byController) {
    const controlled = swiper.controller.control;
    let multiplier;
    let controlledTranslate;
    const Swiper = swiper.constructor;

    function setControlledTranslate(c) {
      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;

      if (swiper.params.controller.by === 'slide') {
        getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out

        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }

      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
      }

      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }

      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }

    if (Array.isArray(controlled)) {
      for (let i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  }

  function setTransition(duration, byController) {
    const Swiper = swiper.constructor;
    const controlled = swiper.controller.control;
    let i;

    function setControlledTransition(c) {
      c.setTransition(duration, swiper);

      if (duration !== 0) {
        c.transitionStart();

        if (c.params.autoHeight) {
          (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
            c.updateAutoHeight();
          });
        }

        c.$wrapperEl.transitionEnd(() => {
          if (!controlled) return;

          if (c.params.loop && swiper.params.controller.by === 'slide') {
            c.loopFix();
          }

          c.transitionEnd();
        });
      }
    }

    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }

  function removeSpline() {
    if (!swiper.controller.control) return;

    if (swiper.controller.spline) {
      swiper.controller.spline = undefined;
      delete swiper.controller.spline;
    }
  }

  on('beforeInit', () => {
    swiper.controller.control = swiper.params.controller.control;
  });
  on('update', () => {
    removeSpline();
  });
  on('resize', () => {
    removeSpline();
  });
  on('observerUpdate', () => {
    removeSpline();
  });
  on('setTranslate', (_s, translate, byController) => {
    if (!swiper.controller.control) return;
    swiper.controller.setTranslate(translate, byController);
  });
  on('setTransition', (_s, duration, byController) => {
    if (!swiper.controller.control) return;
    swiper.controller.setTransition(duration, byController);
  });
  Object.assign(swiper.controller, {
    setTranslate,
    setTransition
  });
}

/***/ }),

/***/ 60219:
/*!******************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-cards/effect-cards.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCards)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/create-shadow.js */ 25998);
/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effect-init.js */ 89716);
/* harmony import */ var _shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effect-target.js */ 58538);
/* harmony import */ var _shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 90814);




function EffectCards({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    cardsEffect: {
      slideShadows: true,
      transformEl: null,
      rotate: true,
      perSlideRotate: 2,
      perSlideOffset: 8
    }
  });

  const setTranslate = () => {
    const {
      slides,
      activeIndex
    } = swiper;
    const params = swiper.params.cardsEffect;
    const {
      startTranslate,
      isTouched
    } = swiper.touchEventsData;
    const currentTranslate = swiper.translate;

    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      const slideProgress = $slideEl[0].progress;
      const progress = Math.min(Math.max(slideProgress, -4), 4);
      let offset = $slideEl[0].swiperSlideOffset;

      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);
      }

      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides[0].swiperSlideOffset;
      }

      let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let tY = 0;
      const tZ = -100 * Math.abs(progress);
      let scale = 1;
      let rotate = -params.perSlideRotate * progress;
      let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
      const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
      const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
      const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;

      if (isSwipeToNext || isSwipeToPrev) {
        const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = `${-25 * subProgress * Math.abs(progress)}%`;
      }

      if (progress < 0) {
        // next
        tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
      } else if (progress > 0) {
        // prev
        tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
      } else {
        tX = `${tX}px`;
      }

      if (!swiper.isHorizontal()) {
        const prevY = tY;
        tY = tX;
        tX = prevY;
      }

      const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
      const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rotate : 0}deg)
        scale(${scaleString})
      `;

      if (params.slideShadows) {
        // Set shadows
        let $shadowEl = $slideEl.find('.swiper-slide-shadow');

        if ($shadowEl.length === 0) {
          $shadowEl = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, $slideEl);
        }

        if ($shadowEl.length) $shadowEl[0].style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
      }

      $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const $targetEl = (0,_shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__["default"])(params, $slideEl);
      $targetEl.transform(transform);
    }
  };

  const setTransition = duration => {
    const {
      transformEl
    } = swiper.params.cardsEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);
    (0,_shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      swiper,
      duration,
      transformEl
    });
  };

  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    effect: 'cards',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}

/***/ }),

/***/ 88003:
/*!**************************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-coverflow/effect-coverflow.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCoverflow)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/create-shadow.js */ 25998);
/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effect-init.js */ 89716);
/* harmony import */ var _shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effect-target.js */ 58538);



function EffectCoverflow({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true,
      transformEl: null
    }
  });

  const setTranslate = () => {
    const {
      width: swiperWidth,
      height: swiperHeight,
      slides,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.coverflowEffect;
    const isHorizontal = swiper.isHorizontal();
    const transform = swiper.translate;
    const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    const rotate = isHorizontal ? params.rotate : -params.rotate;
    const translate = params.depth; // Each slide offset from center

    for (let i = 0, length = slides.length; i < length; i += 1) {
      const $slideEl = slides.eq(i);
      const slideSize = slidesSizesGrid[i];
      const slideOffset = $slideEl[0].swiperSlideOffset;
      const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
      const offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;
      let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

      let translateZ = -translate * Math.abs(offsetMultiplier);
      let stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders

      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
        stretch = parseFloat(params.stretch) / 100 * slideSize;
      }

      let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values

      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;
      if (Math.abs(scale) < 0.001) scale = 0;
      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      const $targetEl = (0,_shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__["default"])(params, $slideEl);
      $targetEl.transform(slideTransform);
      $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

      if (params.slideShadows) {
        // Set shadows
        let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

        if ($shadowBeforeEl.length === 0) {
          $shadowBeforeEl = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, $slideEl, isHorizontal ? 'left' : 'top');
        }

        if ($shadowAfterEl.length === 0) {
          $shadowAfterEl = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, $slideEl, isHorizontal ? 'right' : 'bottom');
        }

        if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      }
    }
  };

  const setTransition = duration => {
    const {
      transformEl
    } = swiper.params.coverflowEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    $transitionElements.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
  };

  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    effect: 'coverflow',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true
    })
  });
}

/***/ }),

/***/ 81609:
/*!************************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-creative/effect-creative.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCreative)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/create-shadow.js */ 25998);
/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effect-init.js */ 89716);
/* harmony import */ var _shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effect-target.js */ 58538);
/* harmony import */ var _shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 90814);




function EffectCreative({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    creativeEffect: {
      transformEl: null,
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });

  const getTranslateValue = value => {
    if (typeof value === 'string') return value;
    return `${value}px`;
  };

  const setTranslate = () => {
    const {
      slides,
      $wrapperEl,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.creativeEffect;
    const {
      progressMultiplier: multiplier
    } = params;
    const isCenteredSlides = swiper.params.centeredSlides;

    if (isCenteredSlides) {
      const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      $wrapperEl.transform(`translateX(calc(50% - ${margin}px))`);
    }

    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      const slideProgress = $slideEl[0].progress;
      const progress = Math.min(Math.max($slideEl[0].progress, -params.limitProgress), params.limitProgress);
      let originalProgress = progress;

      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max($slideEl[0].originalProgress, -params.limitProgress), params.limitProgress);
      }

      const offset = $slideEl[0].swiperSlideOffset;
      const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      const r = [0, 0, 0];
      let custom = false;

      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }

      let data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };

      if (progress < 0) {
        data = params.next;
        custom = true;
      } else if (progress > 0) {
        data = params.prev;
        custom = true;
      } // set translate


      t.forEach((value, index) => {
        t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
      }); // set rotates

      r.forEach((value, index) => {
        r[index] = data.rotate[index] * Math.abs(progress * multiplier);
      });
      $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const translateString = t.join(', ');
      const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
      const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
      const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
      const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`; // Set shadows

      if (custom && data.shadow || !custom) {
        let $shadowEl = $slideEl.children('.swiper-slide-shadow');

        if ($shadowEl.length === 0 && data.shadow) {
          $shadowEl = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, $slideEl);
        }

        if ($shadowEl.length) {
          const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
          $shadowEl[0].style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
        }
      }

      const $targetEl = (0,_shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__["default"])(params, $slideEl);
      $targetEl.transform(transform).css({
        opacity: opacityString
      });

      if (data.origin) {
        $targetEl.css('transform-origin', data.origin);
      }
    }
  };

  const setTransition = duration => {
    const {
      transformEl
    } = swiper.params.creativeEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);
    (0,_shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      swiper,
      duration,
      transformEl,
      allSlides: true
    });
  };

  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    effect: 'creative',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => swiper.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}

/***/ }),

/***/ 84944:
/*!****************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-cube/effect-cube.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCube)
/* harmony export */ });
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effect-init.js */ 89716);


function EffectCube({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });

  const createSlideShadows = ($slideEl, progress, isHorizontal) => {
    let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
    let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

    if (shadowBefore.length === 0) {
      shadowBefore = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
      $slideEl.append(shadowBefore);
    }

    if (shadowAfter.length === 0) {
      shadowAfter = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
      $slideEl.append(shadowAfter);
    }

    if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
    if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
  };

  const recreateShadows = () => {
    // create new ones
    const isHorizontal = swiper.isHorizontal();
    swiper.slides.each(slideEl => {
      const progress = Math.max(Math.min(slideEl.progress, 1), -1);
      createSlideShadows((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(slideEl), progress, isHorizontal);
    });
  };

  const setTranslate = () => {
    const {
      $el,
      $wrapperEl,
      slides,
      width: swiperWidth,
      height: swiperHeight,
      rtlTranslate: rtl,
      size: swiperSize,
      browser
    } = swiper;
    const params = swiper.params.cubeEffect;
    const isHorizontal = swiper.isHorizontal();
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let wrapperRotate = 0;
    let $cubeShadowEl;

    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');

        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])('<div class="swiper-cube-shadow"></div>');
          $wrapperEl.append($cubeShadowEl);
        }

        $cubeShadowEl.css({
          height: `${swiperWidth}px`
        });
      } else {
        $cubeShadowEl = $el.find('.swiper-cube-shadow');

        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])('<div class="swiper-cube-shadow"></div>');
          $el.append($cubeShadowEl);
        }
      }
    }

    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      let slideIndex = i;

      if (isVirtual) {
        slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
      }

      let slideAngle = slideIndex * 90;
      let round = Math.floor(slideAngle / 360);

      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }

      const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      let tx = 0;
      let ty = 0;
      let tz = 0;

      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }

      if (rtl) {
        tx = -tx;
      }

      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }

      const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;

      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }

      $slideEl.transform(transform);

      if (params.slideShadows) {
        createSlideShadows($slideEl, progress, isHorizontal);
      }
    }

    $wrapperEl.css({
      '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
      'transform-origin': `50% 50% -${swiperSize / 2}px`
    });

    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl.transform(`translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
      } else {
        const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        const scale1 = params.shadowScale;
        const scale2 = params.shadowScale / multiplier;
        const offset = params.shadowOffset;
        $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
      }
    }

    const zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
    $wrapperEl.transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
    $wrapperEl[0].style.setProperty('--swiper-cube-translate-z', `${zFactor}px`);
  };

  const setTransition = duration => {
    const {
      $el,
      slides
    } = swiper;
    slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      $el.find('.swiper-cube-shadow').transition(duration);
    }
  };

  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    effect: 'cube',
    swiper,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => swiper.params.cubeEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: false,
      virtualTranslate: true
    })
  });
}

/***/ }),

/***/ 19366:
/*!****************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-fade/effect-fade.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectFade)
/* harmony export */ });
/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/effect-init.js */ 89716);
/* harmony import */ var _shared_effect_target_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effect-target.js */ 58538);
/* harmony import */ var _shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 90814);



function EffectFade({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    fadeEffect: {
      crossFade: false,
      transformEl: null
    }
  });

  const setTranslate = () => {
    const {
      slides
    } = swiper;
    const params = swiper.params.fadeEffect;

    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = swiper.slides.eq(i);
      const offset = $slideEl[0].swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      let ty = 0;

      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }

      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
      const $targetEl = (0,_shared_effect_target_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params, $slideEl);
      $targetEl.css({
        opacity: slideOpacity
      }).transform(`translate3d(${tx}px, ${ty}px, 0px)`);
    }
  };

  const setTransition = duration => {
    const {
      transformEl
    } = swiper.params.fadeEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    $transitionElements.transition(duration);
    (0,_shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
      swiper,
      duration,
      transformEl,
      allSlides: true
    });
  };

  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    effect: 'fade',
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}

/***/ }),

/***/ 73788:
/*!****************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-flip/effect-flip.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectFlip)
/* harmony export */ });
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* harmony import */ var _shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/create-shadow.js */ 25998);
/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effect-init.js */ 89716);
/* harmony import */ var _shared_effect_target_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/effect-target.js */ 58538);
/* harmony import */ var _shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 90814);





function EffectFlip({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
      transformEl: null
    }
  });

  const createSlideShadows = ($slideEl, progress, params) => {
    let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
    let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

    if (shadowBefore.length === 0) {
      shadowBefore = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params, $slideEl, swiper.isHorizontal() ? 'left' : 'top');
    }

    if (shadowAfter.length === 0) {
      shadowAfter = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params, $slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
    }

    if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
    if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
  };

  const recreateShadows = () => {
    // Set shadows
    const params = swiper.params.flipEffect;
    swiper.slides.each(slideEl => {
      const $slideEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(slideEl);
      let progress = $slideEl[0].progress;

      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }

      createSlideShadows($slideEl, progress, params);
    });
  };

  const setTranslate = () => {
    const {
      slides,
      rtlTranslate: rtl
    } = swiper;
    const params = swiper.params.flipEffect;

    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      let progress = $slideEl[0].progress;

      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      }

      const offset = $slideEl[0].swiperSlideOffset;
      const rotate = -180 * progress;
      let rotateY = rotate;
      let rotateX = 0;
      let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let ty = 0;

      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }

      $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

      if (params.slideShadows) {
        createSlideShadows($slideEl, progress, params);
      }

      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const $targetEl = (0,_shared_effect_target_js__WEBPACK_IMPORTED_MODULE_3__["default"])(params, $slideEl);
      $targetEl.transform(transform);
    }
  };

  const setTransition = duration => {
    const {
      transformEl
    } = swiper.params.flipEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    $transitionElements.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
    (0,_shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
      swiper,
      duration,
      transformEl
    });
  };

  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    effect: 'flip',
    swiper,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => swiper.params.flipEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}

/***/ }),

/***/ 70192:
/*!************************************************************!*\
  !*** ./node_modules/swiper/modules/free-mode/free-mode.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ freeMode)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);

function freeMode({
  swiper,
  extendParams,
  emit,
  once
}) {
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02
    }
  });

  function onTouchStart() {
    const translate = swiper.getTranslate();
    swiper.setTranslate(translate);
    swiper.setTransition(0);
    swiper.touchEventsData.velocities.length = 0;
    swiper.freeMode.onTouchEnd({
      currentPos: swiper.rtl ? swiper.translate : -swiper.translate
    });
  }

  function onTouchMove() {
    const {
      touchEventsData: data,
      touches
    } = swiper; // Velocity

    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime
      });
    }

    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)()
    });
  }

  function onTouchEnd({
    currentPos
  }) {
    const {
      params,
      $wrapperEl,
      rtlTranslate: rtl,
      snapGrid,
      touchEventsData: data
    } = swiper; // Time diff

    const touchEndTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)();
    const timeDiff = touchEndTime - data.touchStartTime;

    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }

    if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }

      return;
    }

    if (params.freeMode.momentum) {
      if (data.velocities.length > 1) {
        const lastMoveEvent = data.velocities.pop();
        const velocityEvent = data.velocities.pop();
        const distance = lastMoveEvent.position - velocityEvent.position;
        const time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;

        if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
          swiper.velocity = 0;
        } // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.


        if (time > 150 || (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)() - lastMoveEvent.time > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }

      swiper.velocity *= params.freeMode.momentumVelocityRatio;
      data.velocities.length = 0;
      let momentumDuration = 1000 * params.freeMode.momentumRatio;
      const momentumDistance = swiper.velocity * momentumDuration;
      let newPosition = swiper.translate + momentumDistance;
      if (rtl) newPosition = -newPosition;
      let doBounce = false;
      let afterBouncePosition;
      const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
      let needsLoopFix;

      if (newPosition < swiper.maxTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }

          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }

        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }

          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }

        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (params.freeMode.sticky) {
        let nextSlide;

        for (let j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }

        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }

        newPosition = -newPosition;
      }

      if (needsLoopFix) {
        once('transitionEnd', () => {
          swiper.loopFix();
        });
      } // Fix duration


      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }

        if (params.freeMode.sticky) {
          // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
          // event, then durations can be 20+ seconds to slide one (or zero!) slides.
          // It's easy to see this when simulating touch with mouse events. To fix this,
          // limit single-slide swipes to the default slide duration. This also has the
          // nice side effect of matching slide speed if the user stopped moving before
          // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
          // For faster swipes, also apply limits (albeit higher ones).
          const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
          const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];

          if (moveDistance < currentSlideSize) {
            momentumDuration = params.speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = params.speed * 1.5;
          } else {
            momentumDuration = params.speed * 2.5;
          }
        }
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      }

      if (params.freeMode.momentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        $wrapperEl.transitionEnd(() => {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
          emit('momentumBounce');
          swiper.setTransition(params.speed);
          setTimeout(() => {
            swiper.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(() => {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }, 0);
        });
      } else if (swiper.velocity) {
        emit('_freeModeNoMomentumRelease');
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);

        if (!swiper.animating) {
          swiper.animating = true;
          $wrapperEl.transitionEnd(() => {
            if (!swiper || swiper.destroyed) return;
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }

      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    } else if (params.freeMode.sticky) {
      swiper.slideToClosest();
      return;
    } else if (params.freeMode) {
      emit('_freeModeNoMomentumRelease');
    }

    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }

  Object.assign(swiper, {
    freeMode: {
      onTouchStart,
      onTouchMove,
      onTouchEnd
    }
  });
}

/***/ }),

/***/ 67019:
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/grid/grid.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Grid)
/* harmony export */ });
function Grid({
  swiper,
  extendParams
}) {
  extendParams({
    grid: {
      rows: 1,
      fill: 'column'
    }
  });
  let slidesNumberEvenToRows;
  let slidesPerRow;
  let numFullColumns;

  const initSlides = slidesLength => {
    const {
      slidesPerView
    } = swiper.params;
    const {
      rows,
      fill
    } = swiper.params.grid;
    slidesPerRow = slidesNumberEvenToRows / rows;
    numFullColumns = Math.floor(slidesLength / rows);

    if (Math.floor(slidesLength / rows) === slidesLength / rows) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
    }

    if (slidesPerView !== 'auto' && fill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
    }
  };

  const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
    const {
      slidesPerGroup,
      spaceBetween
    } = swiper.params;
    const {
      rows,
      fill
    } = swiper.params.grid; // Set slides order

    let newSlideOrderIndex;
    let column;
    let row;

    if (fill === 'row' && slidesPerGroup > 1) {
      const groupIndex = Math.floor(i / (slidesPerGroup * rows));
      const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
      const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
      newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
      slide.css({
        '-webkit-order': newSlideOrderIndex,
        order: newSlideOrderIndex
      });
    } else if (fill === 'column') {
      column = Math.floor(i / rows);
      row = i - column * rows;

      if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
        row += 1;

        if (row >= rows) {
          row = 0;
          column += 1;
        }
      }
    } else {
      row = Math.floor(i / slidesPerRow);
      column = i - row * slidesPerRow;
    }

    slide.css(getDirectionLabel('margin-top'), row !== 0 ? spaceBetween && `${spaceBetween}px` : '');
  };

  const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
    const {
      spaceBetween,
      centeredSlides,
      roundLengths
    } = swiper.params;
    const {
      rows
    } = swiper.params.grid;
    swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
    swiper.$wrapperEl.css({
      [getDirectionLabel('width')]: `${swiper.virtualSize + spaceBetween}px`
    });

    if (centeredSlides) {
      snapGrid.splice(0, snapGrid.length);
      const newSlidesGrid = [];

      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }

      snapGrid.push(...newSlidesGrid);
    }
  };

  swiper.grid = {
    initSlides,
    updateSlide,
    updateWrapperSize
  };
}

/***/ }),

/***/ 93726:
/*!************************************************************************!*\
  !*** ./node_modules/swiper/modules/hash-navigation/hash-navigation.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HashNavigation)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);


function HashNavigation({
  swiper,
  extendParams,
  emit,
  on
}) {
  let initialized = false;
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  extendParams({
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false
    }
  });

  const onHashChange = () => {
    emit('hashChange');
    const newHash = document.location.hash.replace('#', '');
    const activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');

    if (newHash !== activeSlideHash) {
      const newIndex = swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-hash="${newHash}"]`).index();
      if (typeof newIndex === 'undefined') return;
      swiper.slideTo(newIndex);
    }
  };

  const setHash = () => {
    if (!initialized || !swiper.params.hashNavigation.enabled) return;

    if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
      window.history.replaceState(null, null, `#${swiper.slides.eq(swiper.activeIndex).attr('data-hash')}` || '');
      emit('hashSet');
    } else {
      const slide = swiper.slides.eq(swiper.activeIndex);
      const hash = slide.attr('data-hash') || slide.attr('data-history');
      document.location.hash = hash || '';
      emit('hashSet');
    }
  };

  const init = () => {
    if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
    initialized = true;
    const hash = document.location.hash.replace('#', '');

    if (hash) {
      const speed = 0;

      for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
        const slide = swiper.slides.eq(i);
        const slideHash = slide.attr('data-hash') || slide.attr('data-history');

        if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
          const index = slide.index();
          swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
        }
      }
    }

    if (swiper.params.hashNavigation.watchState) {
      (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(window).on('hashchange', onHashChange);
    }
  };

  const destroy = () => {
    if (swiper.params.hashNavigation.watchState) {
      (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(window).off('hashchange', onHashChange);
    }
  };

  on('init', () => {
    if (swiper.params.hashNavigation.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (swiper.params.hashNavigation.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHash();
    }
  });
  on('slideChange', () => {
    if (initialized && swiper.params.cssMode) {
      setHash();
    }
  });
}

/***/ }),

/***/ 8338:
/*!********************************************************!*\
  !*** ./node_modules/swiper/modules/history/history.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ History)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);

function History({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    history: {
      enabled: false,
      root: '',
      replaceState: false,
      key: 'slides',
      keepQuery: false
    }
  });
  let initialized = false;
  let paths = {};

  const slugify = text => {
    return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };

  const getPathValues = urlOverride => {
    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
    let location;

    if (urlOverride) {
      location = new URL(urlOverride);
    } else {
      location = window.location;
    }

    const pathArray = location.pathname.slice(1).split('/').filter(part => part !== '');
    const total = pathArray.length;
    const key = pathArray[total - 2];
    const value = pathArray[total - 1];
    return {
      key,
      value
    };
  };

  const setHistory = (key, index) => {
    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
    if (!initialized || !swiper.params.history.enabled) return;
    let location;

    if (swiper.params.url) {
      location = new URL(swiper.params.url);
    } else {
      location = window.location;
    }

    const slide = swiper.slides.eq(index);
    let value = slugify(slide.attr('data-history'));

    if (swiper.params.history.root.length > 0) {
      let root = swiper.params.history.root;
      if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
      value = `${root}/${key}/${value}`;
    } else if (!location.pathname.includes(key)) {
      value = `${key}/${value}`;
    }

    if (swiper.params.history.keepQuery) {
      value += location.search;
    }

    const currentState = window.history.state;

    if (currentState && currentState.value === value) {
      return;
    }

    if (swiper.params.history.replaceState) {
      window.history.replaceState({
        value
      }, null, value);
    } else {
      window.history.pushState({
        value
      }, null, value);
    }
  };

  const scrollToSlide = (speed, value, runCallbacks) => {
    if (value) {
      for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
        const slide = swiper.slides.eq(i);
        const slideHistory = slugify(slide.attr('data-history'));

        if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
          const index = slide.index();
          swiper.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  };

  const setHistoryPopState = () => {
    paths = getPathValues(swiper.params.url);
    scrollToSlide(swiper.params.speed, paths.value, false);
  };

  const init = () => {
    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
    if (!swiper.params.history) return;

    if (!window.history || !window.history.pushState) {
      swiper.params.history.enabled = false;
      swiper.params.hashNavigation.enabled = true;
      return;
    }

    initialized = true;
    paths = getPathValues(swiper.params.url);
    if (!paths.key && !paths.value) return;
    scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);

    if (!swiper.params.history.replaceState) {
      window.addEventListener('popstate', setHistoryPopState);
    }
  };

  const destroy = () => {
    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();

    if (!swiper.params.history.replaceState) {
      window.removeEventListener('popstate', setHistoryPopState);
    }
  };

  on('init', () => {
    if (swiper.params.history.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (swiper.params.history.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
  on('slideChange', () => {
    if (initialized && swiper.params.cssMode) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
}

/***/ }),

/***/ 10912:
/*!**********************************************************!*\
  !*** ./node_modules/swiper/modules/keyboard/keyboard.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* eslint-disable consistent-return */


function Keyboard({
  swiper,
  extendParams,
  on,
  emit
}) {
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  swiper.keyboard = {
    enabled: false
  };
  extendParams({
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true
    }
  });

  function handle(event) {
    if (!swiper.enabled) return;
    const {
      rtlTranslate: rtl
    } = swiper;
    let e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix

    const kc = e.keyCode || e.charCode;
    const pageUpDown = swiper.params.keyboard.pageUpDown;
    const isPageUp = pageUpDown && kc === 33;
    const isPageDown = pageUpDown && kc === 34;
    const isArrowLeft = kc === 37;
    const isArrowRight = kc === 39;
    const isArrowUp = kc === 38;
    const isArrowDown = kc === 40; // Directions locks

    if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
      return false;
    }

    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
      return false;
    }

    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }

    if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
      return undefined;
    }

    if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
      let inView = false; // Check that swiper should be inside of visible area of window

      if (swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 && swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length === 0) {
        return undefined;
      }

      const $el = swiper.$el;
      const swiperWidth = $el[0].clientWidth;
      const swiperHeight = $el[0].clientHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const swiperOffset = swiper.$el.offset();
      if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
      const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];

      for (let i = 0; i < swiperCoord.length; i += 1) {
        const point = swiperCoord[i];

        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

          inView = true;
        }
      }

      if (!inView) return undefined;
    }

    if (swiper.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }

      if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
      if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }

      if (isPageDown || isArrowDown) swiper.slideNext();
      if (isPageUp || isArrowUp) swiper.slidePrev();
    }

    emit('keyPress', kc);
    return undefined;
  }

  function enable() {
    if (swiper.keyboard.enabled) return;
    (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(document).on('keydown', handle);
    swiper.keyboard.enabled = true;
  }

  function disable() {
    if (!swiper.keyboard.enabled) return;
    (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(document).off('keydown', handle);
    swiper.keyboard.enabled = false;
  }

  on('init', () => {
    if (swiper.params.keyboard.enabled) {
      enable();
    }
  });
  on('destroy', () => {
    if (swiper.keyboard.enabled) {
      disable();
    }
  });
  Object.assign(swiper.keyboard, {
    enable,
    disable
  });
}

/***/ }),

/***/ 3553:
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/lazy/lazy.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Lazy)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);


function Lazy({
  swiper,
  extendParams,
  on,
  emit
}) {
  extendParams({
    lazy: {
      checkInView: false,
      enabled: false,
      loadPrevNext: false,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: false,
      scrollingElement: '',
      elementClass: 'swiper-lazy',
      loadingClass: 'swiper-lazy-loading',
      loadedClass: 'swiper-lazy-loaded',
      preloaderClass: 'swiper-lazy-preloader'
    }
  });
  swiper.lazy = {};
  let scrollHandlerAttached = false;
  let initialImageLoaded = false;

  function loadInSlide(index, loadInDuplicate = true) {
    const params = swiper.params.lazy;
    if (typeof index === 'undefined') return;
    if (swiper.slides.length === 0) return;
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    const $slideEl = isVirtual ? swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-swiper-slide-index="${index}"]`) : swiper.slides.eq(index);
    const $images = $slideEl.find(`.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`);

    if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
      $images.push($slideEl[0]);
    }

    if ($images.length === 0) return;
    $images.each(imageEl => {
      const $imageEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(imageEl);
      $imageEl.addClass(params.loadingClass);
      const background = $imageEl.attr('data-background');
      const src = $imageEl.attr('data-src');
      const srcset = $imageEl.attr('data-srcset');
      const sizes = $imageEl.attr('data-sizes');
      const $pictureEl = $imageEl.parent('picture');
      swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, () => {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) return;

        if (background) {
          $imageEl.css('background-image', `url("${background}")`);
          $imageEl.removeAttr('data-background');
        } else {
          if (srcset) {
            $imageEl.attr('srcset', srcset);
            $imageEl.removeAttr('data-srcset');
          }

          if (sizes) {
            $imageEl.attr('sizes', sizes);
            $imageEl.removeAttr('data-sizes');
          }

          if ($pictureEl.length) {
            $pictureEl.children('source').each(sourceEl => {
              const $source = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(sourceEl);

              if ($source.attr('data-srcset')) {
                $source.attr('srcset', $source.attr('data-srcset'));
                $source.removeAttr('data-srcset');
              }
            });
          }

          if (src) {
            $imageEl.attr('src', src);
            $imageEl.removeAttr('data-src');
          }
        }

        $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
        $slideEl.find(`.${params.preloaderClass}`).remove();

        if (swiper.params.loop && loadInDuplicate) {
          const slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');

          if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
            const originalSlide = swiper.$wrapperEl.children(`[data-swiper-slide-index="${slideOriginalIndex}"]:not(.${swiper.params.slideDuplicateClass})`);
            loadInSlide(originalSlide.index(), false);
          } else {
            const duplicatedSlide = swiper.$wrapperEl.children(`.${swiper.params.slideDuplicateClass}[data-swiper-slide-index="${slideOriginalIndex}"]`);
            loadInSlide(duplicatedSlide.index(), false);
          }
        }

        emit('lazyImageReady', $slideEl[0], $imageEl[0]);

        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      });
      emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
    });
  }

  function load() {
    const {
      $wrapperEl,
      params: swiperParams,
      slides,
      activeIndex
    } = swiper;
    const isVirtual = swiper.virtual && swiperParams.virtual.enabled;
    const params = swiperParams.lazy;
    let slidesPerView = swiperParams.slidesPerView;

    if (slidesPerView === 'auto') {
      slidesPerView = 0;
    }

    function slideExist(index) {
      if (isVirtual) {
        if ($wrapperEl.children(`.${swiperParams.slideClass}[data-swiper-slide-index="${index}"]`).length) {
          return true;
        }
      } else if (slides[index]) return true;

      return false;
    }

    function slideIndex(slideEl) {
      if (isVirtual) {
        return (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(slideEl).attr('data-swiper-slide-index');
      }

      return (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(slideEl).index();
    }

    if (!initialImageLoaded) initialImageLoaded = true;

    if (swiper.params.watchSlidesProgress) {
      $wrapperEl.children(`.${swiperParams.slideVisibleClass}`).each(slideEl => {
        const index = isVirtual ? (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(slideEl).attr('data-swiper-slide-index') : (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(slideEl).index();
        loadInSlide(index);
      });
    } else if (slidesPerView > 1) {
      for (let i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
        if (slideExist(i)) loadInSlide(i);
      }
    } else {
      loadInSlide(activeIndex);
    }

    if (params.loadPrevNext) {
      if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
        const amount = params.loadPrevNextAmount;
        const spv = Math.ceil(slidesPerView);
        const maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
        const minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

        for (let i = activeIndex + spv; i < maxIndex; i += 1) {
          if (slideExist(i)) loadInSlide(i);
        } // Prev Slides


        for (let i = minIndex; i < activeIndex; i += 1) {
          if (slideExist(i)) loadInSlide(i);
        }
      } else {
        const nextSlide = $wrapperEl.children(`.${swiperParams.slideNextClass}`);
        if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));
        const prevSlide = $wrapperEl.children(`.${swiperParams.slidePrevClass}`);
        if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));
      }
    }
  }

  function checkInViewOnLoad() {
    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
    if (!swiper || swiper.destroyed) return;
    const $scrollElement = swiper.params.lazy.scrollingElement ? (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(swiper.params.lazy.scrollingElement) : (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(window);
    const isWindow = $scrollElement[0] === window;
    const scrollElementWidth = isWindow ? window.innerWidth : $scrollElement[0].offsetWidth;
    const scrollElementHeight = isWindow ? window.innerHeight : $scrollElement[0].offsetHeight;
    const swiperOffset = swiper.$el.offset();
    const {
      rtlTranslate: rtl
    } = swiper;
    let inView = false;
    if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
    const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];

    for (let i = 0; i < swiperCoord.length; i += 1) {
      const point = swiperCoord[i];

      if (point[0] >= 0 && point[0] <= scrollElementWidth && point[1] >= 0 && point[1] <= scrollElementHeight) {
        if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

        inView = true;
      }
    }

    const passiveListener = swiper.touchEvents.start === 'touchstart' && swiper.support.passiveListener && swiper.params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;

    if (inView) {
      load();
      $scrollElement.off('scroll', checkInViewOnLoad, passiveListener);
    } else if (!scrollHandlerAttached) {
      scrollHandlerAttached = true;
      $scrollElement.on('scroll', checkInViewOnLoad, passiveListener);
    }
  }

  on('beforeInit', () => {
    if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
      swiper.params.preloadImages = false;
    }
  });
  on('init', () => {
    if (swiper.params.lazy.enabled) {
      if (swiper.params.lazy.checkInView) {
        checkInViewOnLoad();
      } else {
        load();
      }
    }
  });
  on('scroll', () => {
    if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.freeMode.sticky) {
      load();
    }
  });
  on('scrollbarDragMove resize _freeModeNoMomentumRelease', () => {
    if (swiper.params.lazy.enabled) {
      if (swiper.params.lazy.checkInView) {
        checkInViewOnLoad();
      } else {
        load();
      }
    }
  });
  on('transitionStart', () => {
    if (swiper.params.lazy.enabled) {
      if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !initialImageLoaded) {
        if (swiper.params.lazy.checkInView) {
          checkInViewOnLoad();
        } else {
          load();
        }
      }
    }
  });
  on('transitionEnd', () => {
    if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
      if (swiper.params.lazy.checkInView) {
        checkInViewOnLoad();
      } else {
        load();
      }
    }
  });
  on('slideChange', () => {
    const {
      lazy,
      cssMode,
      watchSlidesProgress,
      touchReleaseOnEdges,
      resistanceRatio
    } = swiper.params;

    if (lazy.enabled && (cssMode || watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0))) {
      load();
    }
  });
  on('destroy', () => {
    if (!swiper.$el) return;
    swiper.$el.find(`.${swiper.params.lazy.loadingClass}`).removeClass(swiper.params.lazy.loadingClass);
  });
  Object.assign(swiper.lazy, {
    load,
    loadInSlide
  });
}

/***/ }),

/***/ 96642:
/*!******************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/manipulation.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Manipulation)
/* harmony export */ });
/* harmony import */ var _methods_appendSlide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/appendSlide.js */ 58);
/* harmony import */ var _methods_prependSlide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methods/prependSlide.js */ 8940);
/* harmony import */ var _methods_addSlide_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methods/addSlide.js */ 21791);
/* harmony import */ var _methods_removeSlide_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methods/removeSlide.js */ 31757);
/* harmony import */ var _methods_removeAllSlides_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./methods/removeAllSlides.js */ 59281);





function Manipulation({
  swiper
}) {
  Object.assign(swiper, {
    appendSlide: _methods_appendSlide_js__WEBPACK_IMPORTED_MODULE_0__["default"].bind(swiper),
    prependSlide: _methods_prependSlide_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(swiper),
    addSlide: _methods_addSlide_js__WEBPACK_IMPORTED_MODULE_2__["default"].bind(swiper),
    removeSlide: _methods_removeSlide_js__WEBPACK_IMPORTED_MODULE_3__["default"].bind(swiper),
    removeAllSlides: _methods_removeAllSlides_js__WEBPACK_IMPORTED_MODULE_4__["default"].bind(swiper)
  });
}

/***/ }),

/***/ 21791:
/*!**********************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/methods/addSlide.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addSlide)
/* harmony export */ });
function addSlide(index, slides) {
  const swiper = this;
  const {
    $wrapperEl,
    params,
    activeIndex
  } = swiper;
  let activeIndexBuffer = activeIndex;

  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
    swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
  }

  const baseLength = swiper.slides.length;

  if (index <= 0) {
    swiper.prependSlide(slides);
    return;
  }

  if (index >= baseLength) {
    swiper.appendSlide(slides);
    return;
  }

  let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
  const slidesBuffer = [];

  for (let i = baseLength - 1; i >= index; i -= 1) {
    const currentSlide = swiper.slides.eq(i);
    currentSlide.remove();
    slidesBuffer.unshift(currentSlide);
  }

  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) $wrapperEl.append(slides[i]);
    }

    newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
  } else {
    $wrapperEl.append(slides);
  }

  for (let i = 0; i < slidesBuffer.length; i += 1) {
    $wrapperEl.append(slidesBuffer[i]);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!params.observer) {
    swiper.update();
  }

  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

/***/ }),

/***/ 58:
/*!*************************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/methods/appendSlide.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ appendSlide)
/* harmony export */ });
function appendSlide(slides) {
  const swiper = this;
  const {
    $wrapperEl,
    params
  } = swiper;

  if (params.loop) {
    swiper.loopDestroy();
  }

  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) $wrapperEl.append(slides[i]);
    }
  } else {
    $wrapperEl.append(slides);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!params.observer) {
    swiper.update();
  }
}

/***/ }),

/***/ 8940:
/*!**************************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/methods/prependSlide.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ prependSlide)
/* harmony export */ });
function prependSlide(slides) {
  const swiper = this;
  const {
    params,
    $wrapperEl,
    activeIndex
  } = swiper;

  if (params.loop) {
    swiper.loopDestroy();
  }

  let newActiveIndex = activeIndex + 1;

  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) $wrapperEl.prepend(slides[i]);
    }

    newActiveIndex = activeIndex + slides.length;
  } else {
    $wrapperEl.prepend(slides);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!params.observer) {
    swiper.update();
  }

  swiper.slideTo(newActiveIndex, 0, false);
}

/***/ }),

/***/ 59281:
/*!*****************************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/methods/removeAllSlides.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeAllSlides)
/* harmony export */ });
function removeAllSlides() {
  const swiper = this;
  const slidesIndexes = [];

  for (let i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }

  swiper.removeSlide(slidesIndexes);
}

/***/ }),

/***/ 31757:
/*!*************************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/methods/removeSlide.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeSlide)
/* harmony export */ });
function removeSlide(slidesIndexes) {
  const swiper = this;
  const {
    params,
    $wrapperEl,
    activeIndex
  } = swiper;
  let activeIndexBuffer = activeIndex;

  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
    swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
  }

  let newActiveIndex = activeIndexBuffer;
  let indexToRemove;

  if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
    for (let i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    }

    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    newActiveIndex = Math.max(newActiveIndex, 0);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!params.observer) {
    swiper.update();
  }

  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

/***/ }),

/***/ 1226:
/*!**************************************************************!*\
  !*** ./node_modules/swiper/modules/mousewheel/mousewheel.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mousewheel)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);
/* eslint-disable consistent-return */



function Mousewheel({
  swiper,
  extendParams,
  on,
  emit
}) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  extendParams({
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarget: 'container',
      thresholdDelta: null,
      thresholdTime: null
    }
  });
  swiper.mousewheel = {
    enabled: false
  };
  let timeout;
  let lastScrollTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)();
  let lastEventBeforeSnap;
  const recentWheelEvents = [];

  function normalize(e) {
    // Reasonable defaults
    const PIXEL_STEP = 10;
    const LINE_HEIGHT = 40;
    const PAGE_HEIGHT = 800;
    let sX = 0;
    let sY = 0; // spinX, spinY

    let pX = 0;
    let pY = 0; // pixelX, pixelY
    // Legacy

    if ('detail' in e) {
      sY = e.detail;
    }

    if ('wheelDelta' in e) {
      sY = -e.wheelDelta / 120;
    }

    if ('wheelDeltaY' in e) {
      sY = -e.wheelDeltaY / 120;
    }

    if ('wheelDeltaX' in e) {
      sX = -e.wheelDeltaX / 120;
    } // side scrolling on FF with DOMMouseScroll


    if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }

    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;

    if ('deltaY' in e) {
      pY = e.deltaY;
    }

    if ('deltaX' in e) {
      pX = e.deltaX;
    }

    if (e.shiftKey && !pX) {
      // if user scrolls with shift he wants horizontal scroll
      pX = pY;
      pY = 0;
    }

    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) {
        // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    } // Fall-back if spin cannot be determined


    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }

    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }

    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  }

  function handleMouseEnter() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = true;
  }

  function handleMouseLeave() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = false;
  }

  function animateSlider(newEvent) {
    if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
      // Prevent if delta of wheel scroll delta is below configured threshold
      return false;
    }

    if (swiper.params.mousewheel.thresholdTime && (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
      // Prevent if time between scrolls is below configured threshold
      return false;
    } // If the movement is NOT big enough and
    // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
    //   Don't go any further (avoid insignificant scroll movement).


    if (newEvent.delta >= 6 && (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)() - lastScrollTime < 60) {
      // Return false as a default
      return true;
    } // If user is scrolling towards the end:
    //   If the slider hasn't hit the latest slide or
    //   if the slider is a loop and
    //   if the slider isn't moving right now:
    //     Go to next slide and
    //     emit a scroll event.
    // Else (the user is scrolling towards the beginning) and
    // if the slider hasn't hit the first slide or
    // if the slider is a loop and
    // if the slider isn't moving right now:
    //   Go to prev slide and
    //   emit a scroll event.


    if (newEvent.direction < 0) {
      if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
        swiper.slideNext();
        emit('scroll', newEvent.raw);
      }
    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
      swiper.slidePrev();
      emit('scroll', newEvent.raw);
    } // If you got here is because an animation has been triggered so store the current time


    lastScrollTime = new window.Date().getTime(); // Return false as a default

    return false;
  }

  function releaseScroll(newEvent) {
    const params = swiper.params.mousewheel;

    if (newEvent.direction < 0) {
      if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
        // Return true to animate scroll on edges
        return true;
      }
    } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
      // Return true to animate scroll on edges
      return true;
    }

    return false;
  }

  function handle(event) {
    let e = event;
    let disableParentSwiper = true;
    if (!swiper.enabled) return;
    const params = swiper.params.mousewheel;

    if (swiper.params.cssMode) {
      e.preventDefault();
    }

    let target = swiper.$el;

    if (swiper.params.mousewheel.eventsTarget !== 'container') {
      target = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(swiper.params.mousewheel.eventsTarget);
    }

    if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) return true;
    if (e.originalEvent) e = e.originalEvent; // jquery fix

    let delta = 0;
    const rtlFactor = swiper.rtlTranslate ? -1 : 1;
    const data = normalize(e);

    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }

    if (delta === 0) return true;
    if (params.invert) delta = -delta; // Get the scroll positions

    let positions = swiper.getTranslate() + delta * params.sensitivity;
    if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
    if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate(); // When loop is true:
    //     the disableParentSwiper will be true.
    // When loop is false:
    //     if the scroll positions is not on edge,
    //     then the disableParentSwiper will be true.
    //     if the scroll on edge positions,
    //     then the disableParentSwiper will be false.

    disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
    if (disableParentSwiper && swiper.params.nested) e.stopPropagation();

    if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
      // Register the new event in a variable which stores the relevant data
      const newEvent = {
        time: (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)(),
        delta: Math.abs(delta),
        direction: Math.sign(delta),
        raw: event
      }; // Keep the most recent events

      if (recentWheelEvents.length >= 2) {
        recentWheelEvents.shift(); // only store the last N events
      }

      const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
      recentWheelEvents.push(newEvent); // If there is at least one previous recorded event:
      //   If direction has changed or
      //   if the scroll is quicker than the previous one:
      //     Animate the slider.
      // Else (this is the first time the wheel is moved):
      //     Animate the slider.

      if (prevEvent) {
        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
          animateSlider(newEvent);
        }
      } else {
        animateSlider(newEvent);
      } // If it's time to release the scroll:
      //   Return now so you don't hit the preventDefault.


      if (releaseScroll(newEvent)) {
        return true;
      }
    } else {
      // Freemode or scrollContainer:
      // If we recently snapped after a momentum scroll, then ignore wheel events
      // to give time for the deceleration to finish. Stop ignoring after 500 msecs
      // or if it's a new scroll (larger delta or inverse sign as last event before
      // an end-of-momentum snap).
      const newEvent = {
        time: (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)(),
        delta: Math.abs(delta),
        direction: Math.sign(delta)
      };
      const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;

      if (!ignoreWheelEvents) {
        lastEventBeforeSnap = undefined;

        if (swiper.params.loop) {
          swiper.loopFix();
        }

        let position = swiper.getTranslate() + delta * params.sensitivity;
        const wasBeginning = swiper.isBeginning;
        const wasEnd = swiper.isEnd;
        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();

        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }

        if (swiper.params.freeMode.sticky) {
          // When wheel scrolling starts with sticky (aka snap) enabled, then detect
          // the end of a momentum scroll by storing recent (N=15?) wheel events.
          // 1. do all N events have decreasing or same (absolute value) delta?
          // 2. did all N events arrive in the last M (M=500?) msecs?
          // 3. does the earliest event have an (absolute value) delta that's
          //    at least P (P=1?) larger than the most recent event's delta?
          // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
          // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
          // Snap immediately and ignore remaining wheel events in this scroll.
          // See comment above for "remaining wheel events in this scroll" determination.
          // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
          clearTimeout(timeout);
          timeout = undefined;

          if (recentWheelEvents.length >= 15) {
            recentWheelEvents.shift(); // only store the last N events
          }

          const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
          const firstEvent = recentWheelEvents[0];
          recentWheelEvents.push(newEvent);

          if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
            // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
            recentWheelEvents.splice(0);
          } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
            // We're at the end of the deceleration of a momentum scroll, so there's no need
            // to wait for more events. Snap ASAP on the next tick.
            // Also, because there's some remaining momentum we'll bias the snap in the
            // direction of the ongoing scroll because it's better UX for the scroll to snap
            // in the same direction as the scroll instead of reversing to snap.  Therefore,
            // if it's already scrolled more than 20% in the current direction, keep going.
            const snapToThreshold = delta > 0 ? 0.8 : 0.2;
            lastEventBeforeSnap = newEvent;
            recentWheelEvents.splice(0);
            timeout = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.nextTick)(() => {
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 0); // no delay; move on next tick
          }

          if (!timeout) {
            // if we get here, then we haven't detected the end of a momentum scroll, so
            // we'll consider a scroll "complete" when there haven't been any wheel events
            // for 500ms.
            timeout = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.nextTick)(() => {
              const snapToThreshold = 0.5;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 500);
          }
        } // Emit event


        if (!ignoreWheelEvents) emit('scroll', e); // Stop autoplay

        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop(); // Return page scroll on edge positions

        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
      }
    }

    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
    return false;
  }

  function events(method) {
    let target = swiper.$el;

    if (swiper.params.mousewheel.eventsTarget !== 'container') {
      target = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(swiper.params.mousewheel.eventsTarget);
    }

    target[method]('mouseenter', handleMouseEnter);
    target[method]('mouseleave', handleMouseLeave);
    target[method]('wheel', handle);
  }

  function enable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.removeEventListener('wheel', handle);
      return true;
    }

    if (swiper.mousewheel.enabled) return false;
    events('on');
    swiper.mousewheel.enabled = true;
    return true;
  }

  function disable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.addEventListener(event, handle);
      return true;
    }

    if (!swiper.mousewheel.enabled) return false;
    events('off');
    swiper.mousewheel.enabled = false;
    return true;
  }

  on('init', () => {
    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
      disable();
    }

    if (swiper.params.mousewheel.enabled) enable();
  });
  on('destroy', () => {
    if (swiper.params.cssMode) {
      enable();
    }

    if (swiper.mousewheel.enabled) disable();
  });
  Object.assign(swiper.mousewheel, {
    enable,
    disable
  });
}

/***/ }),

/***/ 84502:
/*!**************************************************************!*\
  !*** ./node_modules/swiper/modules/navigation/navigation.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var _shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/create-element-if-not-defined.js */ 79358);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);


function Navigation({
  swiper,
  extendParams,
  on,
  emit
}) {
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled'
    }
  });
  swiper.navigation = {
    nextEl: null,
    $nextEl: null,
    prevEl: null,
    $prevEl: null
  };

  function getEl(el) {
    let $el;

    if (el) {
      $el = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(el);

      if (swiper.params.uniqueNavElements && typeof el === 'string' && $el.length > 1 && swiper.$el.find(el).length === 1) {
        $el = swiper.$el.find(el);
      }
    }

    return $el;
  }

  function toggleEl($el, disabled) {
    const params = swiper.params.navigation;

    if ($el && $el.length > 0) {
      $el[disabled ? 'addClass' : 'removeClass'](params.disabledClass);
      if ($el[0] && $el[0].tagName === 'BUTTON') $el[0].disabled = disabled;

      if (swiper.params.watchOverflow && swiper.enabled) {
        $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    }
  }

  function update() {
    // Update Navigation Buttons
    if (swiper.params.loop) return;
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;
    toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
  }

  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit('navigationPrev');
  }

  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit('navigationNext');
  }

  function init() {
    const params = swiper.params.navigation;
    swiper.params.navigation = (0,_shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: 'swiper-button-next',
      prevEl: 'swiper-button-prev'
    });
    if (!(params.nextEl || params.prevEl)) return;
    const $nextEl = getEl(params.nextEl);
    const $prevEl = getEl(params.prevEl);

    if ($nextEl && $nextEl.length > 0) {
      $nextEl.on('click', onNextClick);
    }

    if ($prevEl && $prevEl.length > 0) {
      $prevEl.on('click', onPrevClick);
    }

    Object.assign(swiper.navigation, {
      $nextEl,
      nextEl: $nextEl && $nextEl[0],
      $prevEl,
      prevEl: $prevEl && $prevEl[0]
    });

    if (!swiper.enabled) {
      if ($nextEl) $nextEl.addClass(params.lockClass);
      if ($prevEl) $prevEl.addClass(params.lockClass);
    }
  }

  function destroy() {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;

    if ($nextEl && $nextEl.length) {
      $nextEl.off('click', onNextClick);
      $nextEl.removeClass(swiper.params.navigation.disabledClass);
    }

    if ($prevEl && $prevEl.length) {
      $prevEl.off('click', onPrevClick);
      $prevEl.removeClass(swiper.params.navigation.disabledClass);
    }
  }

  on('init', () => {
    if (swiper.params.navigation.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      update();
    }
  });
  on('toEdge fromEdge lock unlock', () => {
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;

    if ($nextEl) {
      $nextEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
    }

    if ($prevEl) {
      $prevEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
    }
  });
  on('click', (_s, e) => {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;
    const targetEl = e.target;

    if (swiper.params.navigation.hideOnClick && !(0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(targetEl).is($prevEl) && !(0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(targetEl).is($nextEl)) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      let isHidden;

      if ($nextEl) {
        isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
      } else if ($prevEl) {
        isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
      }

      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }

      if ($nextEl) {
        $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
      }

      if ($prevEl) {
        $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
      }
    }
  });

  const enable = () => {
    swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
    init();
    update();
  };

  const disable = () => {
    swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
    destroy();
  };

  Object.assign(swiper.navigation, {
    enable,
    disable,
    update,
    init,
    destroy
  });
}

/***/ }),

/***/ 24240:
/*!**************************************************************!*\
  !*** ./node_modules/swiper/modules/pagination/pagination.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pagination)
/* harmony export */ });
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* harmony import */ var _shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/classes-to-selector.js */ 31472);
/* harmony import */ var _shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/create-element-if-not-defined.js */ 79358);



function Pagination({
  swiper,
  extendParams,
  on,
  emit
}) {
  const pfx = 'swiper-pagination';
  extendParams({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets',
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: number => number,
      formatFractionTotal: number => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  });
  swiper.pagination = {
    el: null,
    $el: null,
    bullets: []
  };
  let bulletSize;
  let dynamicBulletIndex = 0;

  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0;
  }

  function setSideBullets($bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper.params.pagination;
    $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
  }

  function update() {
    // Render || Update Pagination bullets/items
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    const $el = swiper.pagination.$el; // Current/Total

    let current;
    const total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

    if (swiper.params.loop) {
      current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

      if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
        current -= slidesLength - swiper.loopedSlides * 2;
      }

      if (current > total - 1) current -= total;
      if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
    } else {
      current = swiper.activeIndex || 0;
    } // Types


    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const bullets = swiper.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;

      if (params.dynamicBullets) {
        bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
        $el.css(swiper.isHorizontal() ? 'width' : 'height', `${bulletSize * (params.dynamicMainBullets + 4)}px`);

        if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
          dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);

          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }

        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }

      bullets.removeClass(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`).join(' '));

      if ($el.length > 1) {
        bullets.each(bullet => {
          const $bullet = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bullet);
          const bulletIndex = $bullet.index();

          if (bulletIndex === current) {
            $bullet.addClass(params.bulletActiveClass);
          }

          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              $bullet.addClass(`${params.bulletActiveClass}-main`);
            }

            if (bulletIndex === firstIndex) {
              setSideBullets($bullet, 'prev');
            }

            if (bulletIndex === lastIndex) {
              setSideBullets($bullet, 'next');
            }
          }
        });
      } else {
        const $bullet = bullets.eq(current);
        const bulletIndex = $bullet.index();
        $bullet.addClass(params.bulletActiveClass);

        if (params.dynamicBullets) {
          const $firstDisplayedBullet = bullets.eq(firstIndex);
          const $lastDisplayedBullet = bullets.eq(lastIndex);

          for (let i = firstIndex; i <= lastIndex; i += 1) {
            bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
          }

          if (swiper.params.loop) {
            if (bulletIndex >= bullets.length) {
              for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
                bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
              }

              bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
            } else {
              setSideBullets($firstDisplayedBullet, 'prev');
              setSideBullets($lastDisplayedBullet, 'next');
            }
          } else {
            setSideBullets($firstDisplayedBullet, 'prev');
            setSideBullets($lastDisplayedBullet, 'next');
          }
        }
      }

      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl ? 'right' : 'left';
        bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
      }
    }

    if (params.type === 'fraction') {
      $el.find((0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.currentClass)).text(params.formatFractionCurrent(current + 1));
      $el.find((0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.totalClass)).text(params.formatFractionTotal(total));
    }

    if (params.type === 'progressbar') {
      let progressbarDirection;

      if (params.progressbarOpposite) {
        progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
      } else {
        progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
      }

      const scale = (current + 1) / total;
      let scaleX = 1;
      let scaleY = 1;

      if (progressbarDirection === 'horizontal') {
        scaleX = scale;
      } else {
        scaleY = scale;
      }

      $el.find((0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
    }

    if (params.type === 'custom' && params.renderCustom) {
      $el.html(params.renderCustom(swiper, current + 1, total));
      emit('paginationRender', $el[0]);
    } else {
      emit('paginationUpdate', $el[0]);
    }

    if (swiper.params.watchOverflow && swiper.enabled) {
      $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    }
  }

  function render() {
    // Render Container
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    const $el = swiper.pagination.$el;
    let paginationHTML = '';

    if (params.type === 'bullets') {
      let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

      if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }

      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }

      $el.html(paginationHTML);
      swiper.pagination.bullets = $el.find((0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.bulletClass));
    }

    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
      }

      $el.html(paginationHTML);
    }

    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }

      $el.html(paginationHTML);
    }

    if (params.type !== 'custom') {
      emit('paginationRender', swiper.pagination.$el[0]);
    }
  }

  function init() {
    swiper.params.pagination = (0,_shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: 'swiper-pagination'
    });
    const params = swiper.params.pagination;
    if (!params.el) return;
    let $el = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params.el);
    if ($el.length === 0) return;

    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {
      $el = swiper.$el.find(params.el); // check if it belongs to another nested Swiper

      if ($el.length > 1) {
        $el = $el.filter(el => {
          if ((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(el).parents('.swiper')[0] !== swiper.el) return false;
          return true;
        });
      }
    }

    if (params.type === 'bullets' && params.clickable) {
      $el.addClass(params.clickableClass);
    }

    $el.addClass(params.modifierClass + params.type);
    $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);

    if (params.type === 'bullets' && params.dynamicBullets) {
      $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
      dynamicBulletIndex = 0;

      if (params.dynamicMainBullets < 1) {
        params.dynamicMainBullets = 1;
      }
    }

    if (params.type === 'progressbar' && params.progressbarOpposite) {
      $el.addClass(params.progressbarOppositeClass);
    }

    if (params.clickable) {
      $el.on('click', (0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.bulletClass), function onClick(e) {
        e.preventDefault();
        let index = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this).index() * swiper.params.slidesPerGroup;
        if (swiper.params.loop) index += swiper.loopedSlides;
        swiper.slideTo(index);
      });
    }

    Object.assign(swiper.pagination, {
      $el,
      el: $el[0]
    });

    if (!swiper.enabled) {
      $el.addClass(params.lockClass);
    }
  }

  function destroy() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    const $el = swiper.pagination.$el;
    $el.removeClass(params.hiddenClass);
    $el.removeClass(params.modifierClass + params.type);
    $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);

    if (params.clickable) {
      $el.off('click', (0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.bulletClass));
    }
  }

  on('init', () => {
    if (swiper.params.pagination.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      render();
      update();
    }
  });
  on('activeIndexChange', () => {
    if (swiper.params.loop) {
      update();
    } else if (typeof swiper.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', () => {
    if (!swiper.params.loop) {
      update();
    }
  });
  on('slidesLengthChange', () => {
    if (swiper.params.loop) {
      render();
      update();
    }
  });
  on('snapGridLengthChange', () => {
    if (!swiper.params.loop) {
      render();
      update();
    }
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    const {
      $el
    } = swiper.pagination;

    if ($el) {
      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.pagination.lockClass);
    }
  });
  on('lock unlock', () => {
    update();
  });
  on('click', (_s, e) => {
    const targetEl = e.target;
    const {
      $el
    } = swiper.pagination;

    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el && $el.length > 0 && !(0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);

      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }

      $el.toggleClass(swiper.params.pagination.hiddenClass);
    }
  });

  const enable = () => {
    swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);

    if (swiper.pagination.$el) {
      swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
    }

    init();
    render();
    update();
  };

  const disable = () => {
    swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);

    if (swiper.pagination.$el) {
      swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);
    }

    destroy();
  };

  Object.assign(swiper.pagination, {
    enable,
    disable,
    render,
    update,
    init,
    destroy
  });
}

/***/ }),

/***/ 39935:
/*!**********************************************************!*\
  !*** ./node_modules/swiper/modules/parallax/parallax.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Parallax)
/* harmony export */ });
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);

function Parallax({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    parallax: {
      enabled: false
    }
  });

  const setTransform = (el, progress) => {
    const {
      rtl
    } = swiper;
    const $el = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(el);
    const rtlFactor = rtl ? -1 : 1;
    const p = $el.attr('data-swiper-parallax') || '0';
    let x = $el.attr('data-swiper-parallax-x');
    let y = $el.attr('data-swiper-parallax-y');
    const scale = $el.attr('data-swiper-parallax-scale');
    const opacity = $el.attr('data-swiper-parallax-opacity');

    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (swiper.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }

    if (x.indexOf('%') >= 0) {
      x = `${parseInt(x, 10) * progress * rtlFactor}%`;
    } else {
      x = `${x * progress * rtlFactor}px`;
    }

    if (y.indexOf('%') >= 0) {
      y = `${parseInt(y, 10) * progress}%`;
    } else {
      y = `${y * progress}px`;
    }

    if (typeof opacity !== 'undefined' && opacity !== null) {
      const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
      $el[0].style.opacity = currentOpacity;
    }

    if (typeof scale === 'undefined' || scale === null) {
      $el.transform(`translate3d(${x}, ${y}, 0px)`);
    } else {
      const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
      $el.transform(`translate3d(${x}, ${y}, 0px) scale(${currentScale})`);
    }
  };

  const setTranslate = () => {
    const {
      $el,
      slides,
      progress,
      snapGrid
    } = swiper;
    $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(el => {
      setTransform(el, progress);
    });
    slides.each((slideEl, slideIndex) => {
      let slideProgress = slideEl.progress;

      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
      }

      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(el => {
        setTransform(el, slideProgress);
      });
    });
  };

  const setTransition = (duration = swiper.params.speed) => {
    const {
      $el
    } = swiper;
    $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(parallaxEl => {
      const $parallaxEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(parallaxEl);
      let parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
      if (duration === 0) parallaxDuration = 0;
      $parallaxEl.transition(parallaxDuration);
    });
  };

  on('beforeInit', () => {
    if (!swiper.params.parallax.enabled) return;
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
  });
  on('init', () => {
    if (!swiper.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTranslate', () => {
    if (!swiper.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTransition', (_swiper, duration) => {
    if (!swiper.params.parallax.enabled) return;
    setTransition(duration);
  });
}

/***/ }),

/***/ 92465:
/*!************************************************************!*\
  !*** ./node_modules/swiper/modules/scrollbar/scrollbar.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Scrollbar)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);
/* harmony import */ var _shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/create-element-if-not-defined.js */ 79358);




function Scrollbar({
  swiper,
  extendParams,
  on,
  emit
}) {
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  let isTouched = false;
  let timeout = null;
  let dragTimeout = null;
  let dragStartPos;
  let dragSize;
  let trackSize;
  let divider;
  extendParams({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
      scrollbarDisabledClass: 'swiper-scrollbar-disabled',
      horizontalClass: `swiper-scrollbar-horizontal`,
      verticalClass: `swiper-scrollbar-vertical`
    }
  });
  swiper.scrollbar = {
    el: null,
    dragEl: null,
    $el: null,
    $dragEl: null
  };

  function setTranslate() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const {
      scrollbar,
      rtlTranslate: rtl,
      progress
    } = swiper;
    const {
      $dragEl,
      $el
    } = scrollbar;
    const params = swiper.params.scrollbar;
    let newSize = dragSize;
    let newPos = (trackSize - dragSize) * progress;

    if (rtl) {
      newPos = -newPos;

      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }

    if (swiper.isHorizontal()) {
      $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
      $dragEl[0].style.width = `${newSize}px`;
    } else {
      $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
      $dragEl[0].style.height = `${newSize}px`;
    }

    if (params.hide) {
      clearTimeout(timeout);
      $el[0].style.opacity = 1;
      timeout = setTimeout(() => {
        $el[0].style.opacity = 0;
        $el.transition(400);
      }, 1000);
    }
  }

  function setTransition(duration) {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    swiper.scrollbar.$dragEl.transition(duration);
  }

  function updateSize() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const {
      scrollbar
    } = swiper;
    const {
      $dragEl,
      $el
    } = scrollbar;
    $dragEl[0].style.width = '';
    $dragEl[0].style.height = '';
    trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
    divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));

    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }

    if (swiper.isHorizontal()) {
      $dragEl[0].style.width = `${dragSize}px`;
    } else {
      $dragEl[0].style.height = `${dragSize}px`;
    }

    if (divider >= 1) {
      $el[0].style.display = 'none';
    } else {
      $el[0].style.display = '';
    }

    if (swiper.params.scrollbar.hide) {
      $el[0].style.opacity = 0;
    }

    if (swiper.params.watchOverflow && swiper.enabled) {
      scrollbar.$el[swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
    }
  }

  function getPointerPosition(e) {
    if (swiper.isHorizontal()) {
      return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientX : e.clientX;
    }

    return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientY : e.clientY;
  }

  function setDragPosition(e) {
    const {
      scrollbar,
      rtlTranslate: rtl
    } = swiper;
    const {
      $el
    } = scrollbar;
    let positionRatio;
    positionRatio = (getPointerPosition(e) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);

    if (rtl) {
      positionRatio = 1 - positionRatio;
    }

    const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }

  function onDragStart(e) {
    const params = swiper.params.scrollbar;
    const {
      scrollbar,
      $wrapperEl
    } = swiper;
    const {
      $el,
      $dragEl
    } = scrollbar;
    isTouched = true;
    dragStartPos = e.target === $dragEl[0] || e.target === $dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
    e.preventDefault();
    e.stopPropagation();
    $wrapperEl.transition(100);
    $dragEl.transition(100);
    setDragPosition(e);
    clearTimeout(dragTimeout);
    $el.transition(0);

    if (params.hide) {
      $el.css('opacity', 1);
    }

    if (swiper.params.cssMode) {
      swiper.$wrapperEl.css('scroll-snap-type', 'none');
    }

    emit('scrollbarDragStart', e);
  }

  function onDragMove(e) {
    const {
      scrollbar,
      $wrapperEl
    } = swiper;
    const {
      $el,
      $dragEl
    } = scrollbar;
    if (!isTouched) return;
    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
    setDragPosition(e);
    $wrapperEl.transition(0);
    $el.transition(0);
    $dragEl.transition(0);
    emit('scrollbarDragMove', e);
  }

  function onDragEnd(e) {
    const params = swiper.params.scrollbar;
    const {
      scrollbar,
      $wrapperEl
    } = swiper;
    const {
      $el
    } = scrollbar;
    if (!isTouched) return;
    isTouched = false;

    if (swiper.params.cssMode) {
      swiper.$wrapperEl.css('scroll-snap-type', '');
      $wrapperEl.transition('');
    }

    if (params.hide) {
      clearTimeout(dragTimeout);
      dragTimeout = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.nextTick)(() => {
        $el.css('opacity', 0);
        $el.transition(400);
      }, 1000);
    }

    emit('scrollbarDragEnd', e);

    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  }

  function events(method) {
    const {
      scrollbar,
      touchEventsTouch,
      touchEventsDesktop,
      params,
      support
    } = swiper;
    const $el = scrollbar.$el;
    if (!$el) return;
    const target = $el[0];
    const activeListener = support.passiveListener && params.passiveListeners ? {
      passive: false,
      capture: false
    } : false;
    const passiveListener = support.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    if (!target) return;
    const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';

    if (!support.touch) {
      target[eventMethod](touchEventsDesktop.start, onDragStart, activeListener);
      document[eventMethod](touchEventsDesktop.move, onDragMove, activeListener);
      document[eventMethod](touchEventsDesktop.end, onDragEnd, passiveListener);
    } else {
      target[eventMethod](touchEventsTouch.start, onDragStart, activeListener);
      target[eventMethod](touchEventsTouch.move, onDragMove, activeListener);
      target[eventMethod](touchEventsTouch.end, onDragEnd, passiveListener);
    }
  }

  function enableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events('on');
  }

  function disableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events('off');
  }

  function init() {
    const {
      scrollbar,
      $el: $swiperEl
    } = swiper;
    swiper.params.scrollbar = (0,_shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_3__["default"])(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
      el: 'swiper-scrollbar'
    });
    const params = swiper.params.scrollbar;
    if (!params.el) return;
    let $el = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.el);

    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
      $el = $swiperEl.find(params.el);
    }

    $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);

    if ($dragEl.length === 0) {
      $dragEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(`<div class="${swiper.params.scrollbar.dragClass}"></div>`);
      $el.append($dragEl);
    }

    Object.assign(scrollbar, {
      $el,
      el: $el[0],
      $dragEl,
      dragEl: $dragEl[0]
    });

    if (params.draggable) {
      enableDraggable();
    }

    if ($el) {
      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
    }
  }

  function destroy() {
    const params = swiper.params.scrollbar;
    const $el = swiper.scrollbar.$el;

    if ($el) {
      $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    }

    disableDraggable();
  }

  on('init', () => {
    if (swiper.params.scrollbar.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      updateSize();
      setTranslate();
    }
  });
  on('update resize observerUpdate lock unlock', () => {
    updateSize();
  });
  on('setTranslate', () => {
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    setTransition(duration);
  });
  on('enable disable', () => {
    const {
      $el
    } = swiper.scrollbar;

    if ($el) {
      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
    }
  });
  on('destroy', () => {
    destroy();
  });

  const enable = () => {
    swiper.$el.removeClass(swiper.params.scrollbar.scrollbarDisabledClass);

    if (swiper.scrollbar.$el) {
      swiper.scrollbar.$el.removeClass(swiper.params.scrollbar.scrollbarDisabledClass);
    }

    init();
    updateSize();
    setTranslate();
  };

  const disable = () => {
    swiper.$el.addClass(swiper.params.scrollbar.scrollbarDisabledClass);

    if (swiper.scrollbar.$el) {
      swiper.scrollbar.$el.addClass(swiper.params.scrollbar.scrollbarDisabledClass);
    }

    destroy();
  };

  Object.assign(swiper.scrollbar, {
    enable,
    disable,
    updateSize,
    setTranslate,
    init,
    destroy
  });
}

/***/ }),

/***/ 22372:
/*!******************************************************!*\
  !*** ./node_modules/swiper/modules/thumbs/thumbs.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Thumb)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);


function Thumb({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs'
    }
  });
  let initialized = false;
  let swiperCreated = false;
  swiper.thumbs = {
    swiper: null
  };

  function onThumbClick() {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    const clickedIndex = thumbsSwiper.clickedIndex;
    const clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    let slideToIndex;

    if (thumbsSwiper.params.loop) {
      slideToIndex = parseInt((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    } else {
      slideToIndex = clickedIndex;
    }

    if (swiper.params.loop) {
      let currentIndex = swiper.activeIndex;

      if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
        swiper.loopFix(); // eslint-disable-next-line

        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        currentIndex = swiper.activeIndex;
      }

      const prevIndex = swiper.slides.eq(currentIndex).prevAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
      const nextIndex = swiper.slides.eq(currentIndex).nextAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
      if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;else slideToIndex = prevIndex;
    }

    swiper.slideTo(slideToIndex);
  }

  function init() {
    const {
      thumbs: thumbsParams
    } = swiper.params;
    if (initialized) return false;
    initialized = true;
    const SwiperClass = swiper.constructor;

    if (thumbsParams.swiper instanceof SwiperClass) {
      swiper.thumbs.swiper = thumbsParams.swiper;
      Object.assign(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Object.assign(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
    } else if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(thumbsParams.swiper)) {
      const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
      Object.assign(thumbsSwiperParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
      swiperCreated = true;
    }

    swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on('tap', onThumbClick);
    return true;
  }

  function update(initial) {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    const slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView; // Activate thumbs

    let thumbsToActivate = 1;
    const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }

    if (!swiper.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }

    thumbsToActivate = Math.floor(thumbsToActivate);
    thumbsSwiper.slides.removeClass(thumbActiveClass);

    if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        thumbsSwiper.$wrapperEl.children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`).addClass(thumbActiveClass);
      }
    } else {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
      }
    }

    const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
    const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;

    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
      let currentThumbsIndex = thumbsSwiper.activeIndex;
      let newThumbsIndex;
      let direction;

      if (thumbsSwiper.params.loop) {
        if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
          thumbsSwiper.loopFix(); // eslint-disable-next-line

          thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
          currentThumbsIndex = thumbsSwiper.activeIndex;
        } // Find actual thumbs index to slide to


        const prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
        const nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();

        if (typeof prevThumbsIndex === 'undefined') {
          newThumbsIndex = nextThumbsIndex;
        } else if (typeof nextThumbsIndex === 'undefined') {
          newThumbsIndex = prevThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex = nextThumbsIndex;
        } else {
          newThumbsIndex = prevThumbsIndex;
        }

        direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
      } else {
        newThumbsIndex = swiper.realIndex;
        direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
      }

      if (useOffset) {
        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
      }

      if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
        if (thumbsSwiper.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) {// newThumbsIndex = newThumbsIndex - slidesPerView + 1;
        }

        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
      }
    }
  }

  on('beforeInit', () => {
    const {
      thumbs
    } = swiper.params;
    if (!thumbs || !thumbs.swiper) return;
    init();
    update(true);
  });
  on('slideChange update resize observerUpdate', () => {
    update();
  });
  on('setTransition', (_s, duration) => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    thumbsSwiper.setTransition(duration);
  });
  on('beforeDestroy', () => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;

    if (swiperCreated) {
      thumbsSwiper.destroy();
    }
  });
  Object.assign(swiper.thumbs, {
    init,
    update
  });
}

/***/ }),

/***/ 37887:
/*!********************************************************!*\
  !*** ./node_modules/swiper/modules/virtual/virtual.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Virtual)
/* harmony export */ });
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);


function Virtual({
  swiper,
  extendParams,
  on,
  emit
}) {
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  });
  let cssModeTimeout;
  swiper.virtual = {
    cache: {},
    from: undefined,
    to: undefined,
    slides: [],
    offset: 0,
    slidesGrid: []
  };

  function renderSlide(slide, index) {
    const params = swiper.params.virtual;

    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }

    const $slideEl = params.renderSlide ? (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params.renderSlide.call(swiper, slide, index)) : (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`);
    if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
    if (params.cache) swiper.virtual.cache[index] = $slideEl;
    return $slideEl;
  }

  function update(force) {
    const {
      slidesPerView,
      slidesPerGroup,
      centeredSlides
    } = swiper.params;
    const {
      addSlidesBefore,
      addSlidesAfter
    } = swiper.params.virtual;
    const {
      from: previousFrom,
      to: previousTo,
      slides,
      slidesGrid: previousSlidesGrid,
      offset: previousOffset
    } = swiper.virtual;

    if (!swiper.params.cssMode) {
      swiper.updateActiveIndex();
    }

    const activeIndex = swiper.activeIndex || 0;
    let offsetProp;
    if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
    let slidesAfter;
    let slidesBefore;

    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
    } else {
      slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
      slidesBefore = slidesPerGroup + addSlidesBefore;
    }

    const from = Math.max((activeIndex || 0) - slidesBefore, 0);
    const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
    const offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
    Object.assign(swiper.virtual, {
      from,
      to,
      offset,
      slidesGrid: swiper.slidesGrid
    });

    function onRendered() {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      if (swiper.lazy && swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }

      emit('virtualUpdate');
    }

    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.css(offsetProp, `${offset}px`);
      }

      swiper.updateProgress();
      emit('virtualUpdate');
      return;
    }

    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset,
        from,
        to,
        slides: function getSlides() {
          const slidesToRender = [];

          for (let i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }

          return slidesToRender;
        }()
      });

      if (swiper.params.virtual.renderExternalUpdate) {
        onRendered();
      } else {
        emit('virtualUpdate');
      }

      return;
    }

    const prependIndexes = [];
    const appendIndexes = [];

    if (force) {
      swiper.$wrapperEl.find(`.${swiper.params.slideClass}`).remove();
    } else {
      for (let i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          swiper.$wrapperEl.find(`.${swiper.params.slideClass}[data-swiper-slide-index="${i}"]`).remove();
        }
      }
    }

    for (let i = 0; i < slides.length; i += 1) {
      if (i >= from && i <= to) {
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(i);
        } else {
          if (i > previousTo) appendIndexes.push(i);
          if (i < previousFrom) prependIndexes.push(i);
        }
      }
    }

    appendIndexes.forEach(index => {
      swiper.$wrapperEl.append(renderSlide(slides[index], index));
    });
    prependIndexes.sort((a, b) => b - a).forEach(index => {
      swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
    });
    swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, `${offset}px`);
    onRendered();
  }

  function appendSlide(slides) {
    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.push(slides[i]);
      }
    } else {
      swiper.virtual.slides.push(slides);
    }

    update(true);
  }

  function prependSlide(slides) {
    const activeIndex = swiper.activeIndex;
    let newActiveIndex = activeIndex + 1;
    let numberOfNewSlides = 1;

    if (Array.isArray(slides)) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
      }

      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      swiper.virtual.slides.unshift(slides);
    }

    if (swiper.params.virtual.cache) {
      const cache = swiper.virtual.cache;
      const newCache = {};
      Object.keys(cache).forEach(cachedIndex => {
        const $cachedEl = cache[cachedIndex];
        const cachedElIndex = $cachedEl.attr('data-swiper-slide-index');

        if (cachedElIndex) {
          $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
        }

        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
      });
      swiper.virtual.cache = newCache;
    }

    update(true);
    swiper.slideTo(newActiveIndex, 0);
  }

  function removeSlide(slidesIndexes) {
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    let activeIndex = swiper.activeIndex;

    if (Array.isArray(slidesIndexes)) {
      for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        swiper.virtual.slides.splice(slidesIndexes[i], 1);

        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes[i]];
        }

        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      swiper.virtual.slides.splice(slidesIndexes, 1);

      if (swiper.params.virtual.cache) {
        delete swiper.virtual.cache[slidesIndexes];
      }

      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }

    update(true);
    swiper.slideTo(activeIndex, 0);
  }

  function removeAllSlides() {
    swiper.virtual.slides = [];

    if (swiper.params.virtual.cache) {
      swiper.virtual.cache = {};
    }

    update(true);
    swiper.slideTo(0, 0);
  }

  on('beforeInit', () => {
    if (!swiper.params.virtual.enabled) return;
    swiper.virtual.slides = swiper.params.virtual.slides;
    swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;

    if (!swiper.params.initialSlide) {
      update();
    }
  });
  on('setTranslate', () => {
    if (!swiper.params.virtual.enabled) return;

    if (swiper.params.cssMode && !swiper._immediateVirtual) {
      clearTimeout(cssModeTimeout);
      cssModeTimeout = setTimeout(() => {
        update();
      }, 100);
    } else {
      update();
    }
  });
  on('init update resize', () => {
    if (!swiper.params.virtual.enabled) return;

    if (swiper.params.cssMode) {
      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.setCSSProperty)(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
    }
  });
  Object.assign(swiper.virtual, {
    appendSlide,
    prependSlide,
    removeSlide,
    removeAllSlides,
    update
  });
}

/***/ }),

/***/ 88221:
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/zoom/zoom.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Zoom)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ 16007);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ 73809);



function Zoom({
  swiper,
  extendParams,
  on,
  emit
}) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  extendParams({
    zoom: {
      enabled: false,
      maxRatio: 3,
      minRatio: 1,
      toggle: true,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed'
    }
  });
  swiper.zoom = {
    enabled: false
  };
  let currentScale = 1;
  let isScaling = false;
  let gesturesEnabled;
  let fakeGestureTouched;
  let fakeGestureMoved;
  const gesture = {
    $slideEl: undefined,
    slideWidth: undefined,
    slideHeight: undefined,
    $imageEl: undefined,
    $imageWrapEl: undefined,
    maxRatio: 3
  };
  const image = {
    isTouched: undefined,
    isMoved: undefined,
    currentX: undefined,
    currentY: undefined,
    minX: undefined,
    minY: undefined,
    maxX: undefined,
    maxY: undefined,
    width: undefined,
    height: undefined,
    startX: undefined,
    startY: undefined,
    touchesStart: {},
    touchesCurrent: {}
  };
  const velocity = {
    x: undefined,
    y: undefined,
    prevPositionX: undefined,
    prevPositionY: undefined,
    prevTime: undefined
  };
  let scale = 1;
  Object.defineProperty(swiper.zoom, 'scale', {
    get() {
      return scale;
    },

    set(value) {
      if (scale !== value) {
        const imageEl = gesture.$imageEl ? gesture.$imageEl[0] : undefined;
        const slideEl = gesture.$slideEl ? gesture.$slideEl[0] : undefined;
        emit('zoomChange', value, imageEl, slideEl);
      }

      scale = value;
    }

  });

  function getDistanceBetweenTouches(e) {
    if (e.targetTouches.length < 2) return 1;
    const x1 = e.targetTouches[0].pageX;
    const y1 = e.targetTouches[0].pageY;
    const x2 = e.targetTouches[1].pageX;
    const y2 = e.targetTouches[1].pageY;
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance;
  } // Events


  function onGestureStart(e) {
    const support = swiper.support;
    const params = swiper.params.zoom;
    fakeGestureTouched = false;
    fakeGestureMoved = false;

    if (!support.gestures) {
      if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
        return;
      }

      fakeGestureTouched = true;
      gesture.scaleStart = getDistanceBetweenTouches(e);
    }

    if (!gesture.$slideEl || !gesture.$slideEl.length) {
      gesture.$slideEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).closest(`.${swiper.params.slideClass}`);
      if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
      gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
      gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

      if (gesture.$imageWrapEl.length === 0) {
        gesture.$imageEl = undefined;
        return;
      }
    }

    if (gesture.$imageEl) {
      gesture.$imageEl.transition(0);
    }

    isScaling = true;
  }

  function onGestureChange(e) {
    const support = swiper.support;
    const params = swiper.params.zoom;
    const zoom = swiper.zoom;

    if (!support.gestures) {
      if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
        return;
      }

      fakeGestureMoved = true;
      gesture.scaleMove = getDistanceBetweenTouches(e);
    }

    if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
      if (e.type === 'gesturechange') onGestureStart(e);
      return;
    }

    if (support.gestures) {
      zoom.scale = e.scale * currentScale;
    } else {
      zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
    }

    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
    }

    if (zoom.scale < params.minRatio) {
      zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
    }

    gesture.$imageEl.transform(`translate3d(0,0,0) scale(${zoom.scale})`);
  }

  function onGestureEnd(e) {
    const device = swiper.device;
    const support = swiper.support;
    const params = swiper.params.zoom;
    const zoom = swiper.zoom;

    if (!support.gestures) {
      if (!fakeGestureTouched || !fakeGestureMoved) {
        return;
      }

      if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !device.android) {
        return;
      }

      fakeGestureTouched = false;
      fakeGestureMoved = false;
    }

    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.$imageEl.transition(swiper.params.speed).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
    currentScale = zoom.scale;
    isScaling = false;
    if (zoom.scale === 1) gesture.$slideEl = undefined;
  }

  function onTouchStart(e) {
    const device = swiper.device;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    if (image.isTouched) return;
    if (device.android && e.cancelable) e.preventDefault();
    image.isTouched = true;
    image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  }

  function onTouchMove(e) {
    const zoom = swiper.zoom;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    swiper.allowClick = false;
    if (!image.isTouched || !gesture.$slideEl) return;

    if (!image.isMoved) {
      image.width = gesture.$imageEl[0].offsetWidth;
      image.height = gesture.$imageEl[0].offsetHeight;
      image.startX = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.getTranslate)(gesture.$imageWrapEl[0], 'x') || 0;
      image.startY = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.getTranslate)(gesture.$imageWrapEl[0], 'y') || 0;
      gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
      gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
      gesture.$imageWrapEl.transition(0);
    } // Define if we need image drag


    const scaledWidth = image.width * zoom.scale;
    const scaledHeight = image.height * zoom.scale;
    if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (!image.isMoved && !isScaling) {
      if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
        image.isTouched = false;
        return;
      }

      if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
        image.isTouched = false;
        return;
      }
    }

    if (e.cancelable) {
      e.preventDefault();
    }

    e.stopPropagation();
    image.isMoved = true;
    image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
    image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

    if (image.currentX < image.minX) {
      image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
    }

    if (image.currentX > image.maxX) {
      image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
    }

    if (image.currentY < image.minY) {
      image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
    }

    if (image.currentY > image.maxY) {
      image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
    } // Velocity


    if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
    if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
    if (!velocity.prevTime) velocity.prevTime = Date.now();
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();
    gesture.$imageWrapEl.transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
  }

  function onTouchEnd() {
    const zoom = swiper.zoom;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }

    image.isTouched = false;
    image.isMoved = false;
    let momentumDurationX = 300;
    let momentumDurationY = 300;
    const momentumDistanceX = velocity.x * momentumDurationX;
    const newPositionX = image.currentX + momentumDistanceX;
    const momentumDistanceY = velocity.y * momentumDurationY;
    const newPositionY = image.currentY + momentumDistanceY; // Fix duration

    if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
    if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
    const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
    image.currentX = newPositionX;
    image.currentY = newPositionY; // Define if we need image drag

    const scaledWidth = image.width * zoom.scale;
    const scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
    gesture.$imageWrapEl.transition(momentumDuration).transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
  }

  function onTransitionEnd() {
    const zoom = swiper.zoom;

    if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
      if (gesture.$imageEl) {
        gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
      }

      if (gesture.$imageWrapEl) {
        gesture.$imageWrapEl.transform('translate3d(0,0,0)');
      }

      zoom.scale = 1;
      currentScale = 1;
      gesture.$slideEl = undefined;
      gesture.$imageEl = undefined;
      gesture.$imageWrapEl = undefined;
    }
  }

  function zoomIn(e) {
    const zoom = swiper.zoom;
    const params = swiper.params.zoom;

    if (!gesture.$slideEl) {
      if (e && e.target) {
        gesture.$slideEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).closest(`.${swiper.params.slideClass}`);
      }

      if (!gesture.$slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
        } else {
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        }
      }

      gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
      gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
    }

    if (!gesture.$imageEl || gesture.$imageEl.length === 0 || !gesture.$imageWrapEl || gesture.$imageWrapEl.length === 0) return;

    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.touchAction = 'none';
    }

    gesture.$slideEl.addClass(`${params.zoomedSlideClass}`);
    let touchX;
    let touchY;
    let offsetX;
    let offsetY;
    let diffX;
    let diffY;
    let translateX;
    let translateY;
    let imageWidth;
    let imageHeight;
    let scaledWidth;
    let scaledHeight;
    let translateMinX;
    let translateMinY;
    let translateMaxX;
    let translateMaxY;
    let slideWidth;
    let slideHeight;

    if (typeof image.touchesStart.x === 'undefined' && e) {
      touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
      touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }

    zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
    currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

    if (e) {
      slideWidth = gesture.$slideEl[0].offsetWidth;
      slideHeight = gesture.$slideEl[0].offsetHeight;
      offsetX = gesture.$slideEl.offset().left + window.scrollX;
      offsetY = gesture.$slideEl.offset().top + window.scrollY;
      diffX = offsetX + slideWidth / 2 - touchX;
      diffY = offsetY + slideHeight / 2 - touchY;
      imageWidth = gesture.$imageEl[0].offsetWidth;
      imageHeight = gesture.$imageEl[0].offsetHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;
      translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
      translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;
      translateX = diffX * zoom.scale;
      translateY = diffY * zoom.scale;

      if (translateX < translateMinX) {
        translateX = translateMinX;
      }

      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }

      if (translateY < translateMinY) {
        translateY = translateMinY;
      }

      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }

    gesture.$imageWrapEl.transition(300).transform(`translate3d(${translateX}px, ${translateY}px,0)`);
    gesture.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
  }

  function zoomOut() {
    const zoom = swiper.zoom;
    const params = swiper.params.zoom;

    if (!gesture.$slideEl) {
      if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
        gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
      } else {
        gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
      }

      gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
      gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
    }

    if (!gesture.$imageEl || gesture.$imageEl.length === 0 || !gesture.$imageWrapEl || gesture.$imageWrapEl.length === 0) return;

    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = '';
      swiper.wrapperEl.style.touchAction = '';
    }

    zoom.scale = 1;
    currentScale = 1;
    gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
    gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
    gesture.$slideEl.removeClass(`${params.zoomedSlideClass}`);
    gesture.$slideEl = undefined;
  } // Toggle Zoom


  function zoomToggle(e) {
    const zoom = swiper.zoom;

    if (zoom.scale && zoom.scale !== 1) {
      // Zoom Out
      zoomOut();
    } else {
      // Zoom In
      zoomIn(e);
    }
  }

  function getListeners() {
    const support = swiper.support;
    const passiveListener = swiper.touchEvents.start === 'touchstart' && support.passiveListener && swiper.params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    const activeListenerWithCapture = support.passiveListener ? {
      passive: false,
      capture: true
    } : true;
    return {
      passiveListener,
      activeListenerWithCapture
    };
  }

  function getSlideSelector() {
    return `.${swiper.params.slideClass}`;
  }

  function toggleGestures(method) {
    const {
      passiveListener
    } = getListeners();
    const slideSelector = getSlideSelector();
    swiper.$wrapperEl[method]('gesturestart', slideSelector, onGestureStart, passiveListener);
    swiper.$wrapperEl[method]('gesturechange', slideSelector, onGestureChange, passiveListener);
    swiper.$wrapperEl[method]('gestureend', slideSelector, onGestureEnd, passiveListener);
  }

  function enableGestures() {
    if (gesturesEnabled) return;
    gesturesEnabled = true;
    toggleGestures('on');
  }

  function disableGestures() {
    if (!gesturesEnabled) return;
    gesturesEnabled = false;
    toggleGestures('off');
  } // Attach/Detach Events


  function enable() {
    const zoom = swiper.zoom;
    if (zoom.enabled) return;
    zoom.enabled = true;
    const support = swiper.support;
    const {
      passiveListener,
      activeListenerWithCapture
    } = getListeners();
    const slideSelector = getSlideSelector(); // Scale image

    if (support.gestures) {
      swiper.$wrapperEl.on(swiper.touchEvents.start, enableGestures, passiveListener);
      swiper.$wrapperEl.on(swiper.touchEvents.end, disableGestures, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
      swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);
      swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);

      if (swiper.touchEvents.cancel) {
        swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
      }
    } // Move image


    swiper.$wrapperEl.on(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, onTouchMove, activeListenerWithCapture);
  }

  function disable() {
    const zoom = swiper.zoom;
    if (!zoom.enabled) return;
    const support = swiper.support;
    zoom.enabled = false;
    const {
      passiveListener,
      activeListenerWithCapture
    } = getListeners();
    const slideSelector = getSlideSelector(); // Scale image

    if (support.gestures) {
      swiper.$wrapperEl.off(swiper.touchEvents.start, enableGestures, passiveListener);
      swiper.$wrapperEl.off(swiper.touchEvents.end, disableGestures, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
      swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);
      swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);

      if (swiper.touchEvents.cancel) {
        swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
      }
    } // Move image


    swiper.$wrapperEl.off(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, onTouchMove, activeListenerWithCapture);
  }

  on('init', () => {
    if (swiper.params.zoom.enabled) {
      enable();
    }
  });
  on('destroy', () => {
    disable();
  });
  on('touchStart', (_s, e) => {
    if (!swiper.zoom.enabled) return;
    onTouchStart(e);
  });
  on('touchEnd', (_s, e) => {
    if (!swiper.zoom.enabled) return;
    onTouchEnd(e);
  });
  on('doubleTap', (_s, e) => {
    if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
      zoomToggle(e);
    }
  });
  on('transitionEnd', () => {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
      onTransitionEnd();
    }
  });
  on('slideChange', () => {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
      onTransitionEnd();
    }
  });
  Object.assign(swiper.zoom, {
    enable,
    disable,
    in: zoomIn,
    out: zoomOut,
    toggle: zoomToggle
  });
}

/***/ }),

/***/ 31472:
/*!***********************************************************!*\
  !*** ./node_modules/swiper/shared/classes-to-selector.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ classesToSelector)
/* harmony export */ });
function classesToSelector(classes = '') {
  return `.${classes.trim().replace(/([\.:!\/])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.')}`;
}

/***/ }),

/***/ 79358:
/*!*********************************************************************!*\
  !*** ./node_modules/swiper/shared/create-element-if-not-defined.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createElementIfNotDefined)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);

function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();

  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach(key => {
      if (!params[key] && params.auto === true) {
        let element = swiper.$el.children(`.${checkProps[key]}`)[0];

        if (!element) {
          element = document.createElement('div');
          element.className = checkProps[key];
          swiper.$el.append(element);
        }

        params[key] = element;
        originalParams[key] = element;
      }
    });
  }

  return params;
}

/***/ }),

/***/ 25998:
/*!*****************************************************!*\
  !*** ./node_modules/swiper/shared/create-shadow.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createShadow)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ 16007);

function createShadow(params, $slideEl, side) {
  const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}`;
  const $shadowContainer = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;
  let $shadowEl = $shadowContainer.children(`.${shadowClass}`);

  if (!$shadowEl.length) {
    $shadowEl = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__["default"])(`<div class="swiper-slide-shadow${side ? `-${side}` : ''}"></div>`);
    $shadowContainer.append($shadowEl);
  }

  return $shadowEl;
}

/***/ }),

/***/ 16007:
/*!*******************************************!*\
  !*** ./node_modules/swiper/shared/dom.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dom7__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom7 */ 46123);

const Methods = {
  addClass: dom7__WEBPACK_IMPORTED_MODULE_0__.addClass,
  removeClass: dom7__WEBPACK_IMPORTED_MODULE_0__.removeClass,
  hasClass: dom7__WEBPACK_IMPORTED_MODULE_0__.hasClass,
  toggleClass: dom7__WEBPACK_IMPORTED_MODULE_0__.toggleClass,
  attr: dom7__WEBPACK_IMPORTED_MODULE_0__.attr,
  removeAttr: dom7__WEBPACK_IMPORTED_MODULE_0__.removeAttr,
  transform: dom7__WEBPACK_IMPORTED_MODULE_0__.transform,
  transition: dom7__WEBPACK_IMPORTED_MODULE_0__.transition,
  on: dom7__WEBPACK_IMPORTED_MODULE_0__.on,
  off: dom7__WEBPACK_IMPORTED_MODULE_0__.off,
  trigger: dom7__WEBPACK_IMPORTED_MODULE_0__.trigger,
  transitionEnd: dom7__WEBPACK_IMPORTED_MODULE_0__.transitionEnd,
  outerWidth: dom7__WEBPACK_IMPORTED_MODULE_0__.outerWidth,
  outerHeight: dom7__WEBPACK_IMPORTED_MODULE_0__.outerHeight,
  styles: dom7__WEBPACK_IMPORTED_MODULE_0__.styles,
  offset: dom7__WEBPACK_IMPORTED_MODULE_0__.offset,
  css: dom7__WEBPACK_IMPORTED_MODULE_0__.css,
  each: dom7__WEBPACK_IMPORTED_MODULE_0__.each,
  html: dom7__WEBPACK_IMPORTED_MODULE_0__.html,
  text: dom7__WEBPACK_IMPORTED_MODULE_0__.text,
  is: dom7__WEBPACK_IMPORTED_MODULE_0__.is,
  index: dom7__WEBPACK_IMPORTED_MODULE_0__.index,
  eq: dom7__WEBPACK_IMPORTED_MODULE_0__.eq,
  append: dom7__WEBPACK_IMPORTED_MODULE_0__.append,
  prepend: dom7__WEBPACK_IMPORTED_MODULE_0__.prepend,
  next: dom7__WEBPACK_IMPORTED_MODULE_0__.next,
  nextAll: dom7__WEBPACK_IMPORTED_MODULE_0__.nextAll,
  prev: dom7__WEBPACK_IMPORTED_MODULE_0__.prev,
  prevAll: dom7__WEBPACK_IMPORTED_MODULE_0__.prevAll,
  parent: dom7__WEBPACK_IMPORTED_MODULE_0__.parent,
  parents: dom7__WEBPACK_IMPORTED_MODULE_0__.parents,
  closest: dom7__WEBPACK_IMPORTED_MODULE_0__.closest,
  find: dom7__WEBPACK_IMPORTED_MODULE_0__.find,
  children: dom7__WEBPACK_IMPORTED_MODULE_0__.children,
  filter: dom7__WEBPACK_IMPORTED_MODULE_0__.filter,
  remove: dom7__WEBPACK_IMPORTED_MODULE_0__.remove
};
Object.keys(Methods).forEach(methodName => {
  Object.defineProperty(dom7__WEBPACK_IMPORTED_MODULE_0__.$.fn, methodName, {
    value: Methods[methodName],
    writable: true
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom7__WEBPACK_IMPORTED_MODULE_0__.$);

/***/ }),

/***/ 89716:
/*!***************************************************!*\
  !*** ./node_modules/swiper/shared/effect-init.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ effectInit)
/* harmony export */ });
function effectInit(params) {
  const {
    effect,
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on('beforeInit', () => {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);

    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }

    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on('setTranslate', () => {
    if (swiper.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (swiper.params.effect !== effect) return;
    setTransition(duration);
  });
  on('transitionEnd', () => {
    if (swiper.params.effect !== effect) return;

    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return; // remove shadows

      swiper.slides.each(slideEl => {
        const $slideEl = swiper.$(slideEl);
        $slideEl.find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').remove();
      }); // create new one

      recreateShadows();
    }
  });
  let requireUpdateOnVirtual;
  on('virtualUpdate', () => {
    if (swiper.params.effect !== effect) return;

    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }

    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate();
        requireUpdateOnVirtual = false;
      }
    });
  });
}

/***/ }),

/***/ 58538:
/*!*****************************************************!*\
  !*** ./node_modules/swiper/shared/effect-target.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ effectTarget)
/* harmony export */ });
function effectTarget(effectParams, $slideEl) {
  if (effectParams.transformEl) {
    return $slideEl.find(effectParams.transformEl).css({
      'backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden'
    });
  }

  return $slideEl;
}

/***/ }),

/***/ 90814:
/*!*********************************************************************!*\
  !*** ./node_modules/swiper/shared/effect-virtual-transition-end.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ effectVirtualTransitionEnd)
/* harmony export */ });
function effectVirtualTransitionEnd({
  swiper,
  duration,
  transformEl,
  allSlides
}) {
  const {
    slides,
    activeIndex,
    $wrapperEl
  } = swiper;

  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let $transitionEndTarget;

    if (allSlides) {
      $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
    } else {
      $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);
    }

    $transitionEndTarget.transitionEnd(() => {
      if (eventTriggered) return;
      if (!swiper || swiper.destroyed) return;
      eventTriggered = true;
      swiper.animating = false;
      const triggerEvents = ['webkitTransitionEnd', 'transitionend'];

      for (let i = 0; i < triggerEvents.length; i += 1) {
        $wrapperEl.trigger(triggerEvents[i]);
      }
    });
  }
}

/***/ }),

/***/ 57274:
/*!***************************************************!*\
  !*** ./node_modules/swiper/shared/get-browser.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBrowser": () => (/* binding */ getBrowser)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);

let browser;

function calcBrowser() {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();

  function isSafari() {
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
  }

  return {
    isSafari: isSafari(),
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
  };
}

function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }

  return browser;
}



/***/ }),

/***/ 8607:
/*!**************************************************!*\
  !*** ./node_modules/swiper/shared/get-device.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDevice": () => (/* binding */ getDevice)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);
/* harmony import */ var _get_support_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-support.js */ 14558);


let deviceCached;

function calcDevice({
  userAgent
} = {}) {
  const support = (0,_get_support_js__WEBPACK_IMPORTED_MODULE_1__.getSupport)();
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  const platform = window.navigator.platform;
  const ua = userAgent || window.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === 'Win32';
  let macos = platform === 'MacIntel'; // iPadOs 13 fix

  const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];

  if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad) ipad = [0, 1, '13_0_0'];
    macos = false;
  } // Android


  if (android && !windows) {
    device.os = 'android';
    device.android = true;
  }

  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  } // Export object


  return device;
}

function getDevice(overrides = {}) {
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }

  return deviceCached;
}



/***/ }),

/***/ 14558:
/*!***************************************************!*\
  !*** ./node_modules/swiper/shared/get-support.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSupport": () => (/* binding */ getSupport)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);

let support;

function calcSupport() {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
  return {
    smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,
    touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),
    passiveListener: function checkPassiveListener() {
      let supportsPassive = false;

      try {
        const opts = Object.defineProperty({}, 'passive', {
          // eslint-disable-next-line
          get() {
            supportsPassive = true;
          }

        });
        window.addEventListener('testPassiveListener', null, opts);
      } catch (e) {// No support
      }

      return supportsPassive;
    }(),
    gestures: function checkGestures() {
      return 'ongesturestart' in window;
    }()
  };
}

function getSupport() {
  if (!support) {
    support = calcSupport();
  }

  return support;
}



/***/ }),

/***/ 73809:
/*!*********************************************!*\
  !*** ./node_modules/swiper/shared/utils.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animateCSSModeScroll": () => (/* binding */ animateCSSModeScroll),
/* harmony export */   "deleteProps": () => (/* binding */ deleteProps),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "getComputedStyle": () => (/* binding */ getComputedStyle),
/* harmony export */   "getTranslate": () => (/* binding */ getTranslate),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "nextTick": () => (/* binding */ nextTick),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "setCSSProperty": () => (/* binding */ setCSSProperty)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ 2864);


function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach(key => {
    try {
      object[key] = null;
    } catch (e) {// no getter for object
    }

    try {
      delete object[key];
    } catch (e) {// something got wrong
    }
  });
}

function nextTick(callback, delay = 0) {
  return setTimeout(callback, delay);
}

function now() {
  return Date.now();
}

function getComputedStyle(el) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  let style;

  if (window.getComputedStyle) {
    style = window.getComputedStyle(el, null);
  }

  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }

  if (!style) {
    style = el.style;
  }

  return style;
}

function getTranslate(el, axis = 'x') {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle(el, null);

  if (window.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;

    if (curTransform.split(',').length > 6) {
      curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
    } // Some old versions of Webkit choke when 'none' is passed; pass
    // empty string instead in this case


    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
    matrix = transformMatrix.toString().split(',');
  }

  if (axis === 'x') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
    else curTransform = parseFloat(matrix[4]);
  }

  if (axis === 'y') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
    else curTransform = parseFloat(matrix[5]);
  }

  return curTransform || 0;
}

function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}

function isNode(node) {
  // eslint-disable-next-line
  if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
    return node instanceof HTMLElement;
  }

  return node && (node.nodeType === 1 || node.nodeType === 11);
}

function extend(...args) {
  const to = Object(args[0]);
  const noExtend = ['__proto__', 'constructor', 'prototype'];

  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];

    if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);

      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};

            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }

  return to;
}

function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}

function animateCSSModeScroll({
  swiper,
  targetPosition,
  side
}) {
  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
  const startPosition = -swiper.translate;
  let startTime = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = 'none';
  window.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? 'next' : 'prev';

  const isOutOfBound = (current, target) => {
    return dir === 'next' && current >= target || dir === 'prev' && current <= target;
  };

  const animate = () => {
    time = new Date().getTime();

    if (startTime === null) {
      startTime = time;
    }

    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);

    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }

    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });

    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.scrollSnapType = '';
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = '';
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }

    swiper.cssModeFrameID = window.requestAnimationFrame(animate);
  };

  animate();
}



/***/ }),

/***/ 63587:
/*!*******************************************!*\
  !*** ./node_modules/swiper/swiper.esm.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A11y": () => (/* reexport safe */ _modules_a11y_a11y_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   "Autoplay": () => (/* reexport safe */ _modules_autoplay_autoplay_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   "Controller": () => (/* reexport safe */ _modules_controller_controller_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "EffectCards": () => (/* reexport safe */ _modules_effect_cards_effect_cards_js__WEBPACK_IMPORTED_MODULE_24__["default"]),
/* harmony export */   "EffectCoverflow": () => (/* reexport safe */ _modules_effect_coverflow_effect_coverflow_js__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   "EffectCreative": () => (/* reexport safe */ _modules_effect_creative_effect_creative_js__WEBPACK_IMPORTED_MODULE_23__["default"]),
/* harmony export */   "EffectCube": () => (/* reexport safe */ _modules_effect_cube_effect_cube_js__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   "EffectFade": () => (/* reexport safe */ _modules_effect_fade_effect_fade_js__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   "EffectFlip": () => (/* reexport safe */ _modules_effect_flip_effect_flip_js__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   "FreeMode": () => (/* reexport safe */ _modules_free_mode_free_mode_js__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   "Grid": () => (/* reexport safe */ _modules_grid_grid_js__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   "HashNavigation": () => (/* reexport safe */ _modules_hash_navigation_hash_navigation_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "History": () => (/* reexport safe */ _modules_history_history_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   "Keyboard": () => (/* reexport safe */ _modules_keyboard_keyboard_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Lazy": () => (/* reexport safe */ _modules_lazy_lazy_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "Manipulation": () => (/* reexport safe */ _modules_manipulation_manipulation_js__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   "Mousewheel": () => (/* reexport safe */ _modules_mousewheel_mousewheel_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Navigation": () => (/* reexport safe */ _modules_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Pagination": () => (/* reexport safe */ _modules_pagination_pagination_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "Parallax": () => (/* reexport safe */ _modules_parallax_parallax_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "Scrollbar": () => (/* reexport safe */ _modules_scrollbar_scrollbar_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "Swiper": () => (/* reexport safe */ _core_core_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Thumbs": () => (/* reexport safe */ _modules_thumbs_thumbs_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   "Virtual": () => (/* reexport safe */ _modules_virtual_virtual_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Zoom": () => (/* reexport safe */ _modules_zoom_zoom_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "default": () => (/* reexport safe */ _core_core_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _core_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/core.js */ 33606);
/* harmony import */ var _modules_virtual_virtual_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/virtual/virtual.js */ 37887);
/* harmony import */ var _modules_keyboard_keyboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/keyboard/keyboard.js */ 10912);
/* harmony import */ var _modules_mousewheel_mousewheel_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/mousewheel/mousewheel.js */ 1226);
/* harmony import */ var _modules_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/navigation/navigation.js */ 84502);
/* harmony import */ var _modules_pagination_pagination_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/pagination/pagination.js */ 24240);
/* harmony import */ var _modules_scrollbar_scrollbar_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/scrollbar/scrollbar.js */ 92465);
/* harmony import */ var _modules_parallax_parallax_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/parallax/parallax.js */ 39935);
/* harmony import */ var _modules_zoom_zoom_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/zoom/zoom.js */ 88221);
/* harmony import */ var _modules_lazy_lazy_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/lazy/lazy.js */ 3553);
/* harmony import */ var _modules_controller_controller_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/controller/controller.js */ 13511);
/* harmony import */ var _modules_a11y_a11y_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/a11y/a11y.js */ 66525);
/* harmony import */ var _modules_history_history_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/history/history.js */ 8338);
/* harmony import */ var _modules_hash_navigation_hash_navigation_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/hash-navigation/hash-navigation.js */ 93726);
/* harmony import */ var _modules_autoplay_autoplay_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/autoplay/autoplay.js */ 64370);
/* harmony import */ var _modules_thumbs_thumbs_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/thumbs/thumbs.js */ 22372);
/* harmony import */ var _modules_free_mode_free_mode_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modules/free-mode/free-mode.js */ 70192);
/* harmony import */ var _modules_grid_grid_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/grid/grid.js */ 67019);
/* harmony import */ var _modules_manipulation_manipulation_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/manipulation/manipulation.js */ 96642);
/* harmony import */ var _modules_effect_fade_effect_fade_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./modules/effect-fade/effect-fade.js */ 19366);
/* harmony import */ var _modules_effect_cube_effect_cube_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./modules/effect-cube/effect-cube.js */ 84944);
/* harmony import */ var _modules_effect_flip_effect_flip_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./modules/effect-flip/effect-flip.js */ 73788);
/* harmony import */ var _modules_effect_coverflow_effect_coverflow_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./modules/effect-coverflow/effect-coverflow.js */ 88003);
/* harmony import */ var _modules_effect_creative_effect_creative_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./modules/effect-creative/effect-creative.js */ 81609);
/* harmony import */ var _modules_effect_cards_effect_cards_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./modules/effect-cards/effect-cards.js */ 60219);
/**
 * Swiper 8.4.5
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2022 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: November 21, 2022
 */


























/***/ })

}]);
//# sourceMappingURL=default-src_app_shared_shared_module_ts.js.map