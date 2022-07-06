import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup, FormControl, FormArray, AsyncValidatorFn } from '@angular/forms';

import * as moment from 'moment';
import { Observable, of, Subject } from 'rxjs';
import { joinDateTimeInISO8601 } from './time-handler';

interface RequiredIfOptionalConf {
  formRoot?: boolean;
}
interface ArrayAtLeastOneIfOptionalConf {
  formRoot?: boolean;
}

/** Validates the the string of characters contains at least 1 lowercase character */
export function min1lowercase(c: FormControl): ValidationErrors | null {
  if (c.value === null) {
    return null; // don't validate empty value
  }
  if (typeof c.value !== 'string') {
    console.warn('min1lowercase validator: value is not a string')
    return { min1lowercase: true };
  }
  const isValid = new RegExp('[a-z]').test(c.value);
  if (!isValid) {
    return { min1lowercase: true }
  }
  return null;
}

/** Validates the the string of characters contains at least 1 uppercase character */
export function min1uppercase(c: FormControl): ValidationErrors | null {
  if (c.value === null) {
    return null; // don't validate empty value
  }
  if (typeof c.value !== 'string') {
    console.warn('min1uppercase validator: value is not a string')
    return { min1uppercase: true };
  }
  const isValid = new RegExp('[A-Z]').test(c.value);
  if (!isValid) {
    return { min1uppercase: true }
  }
  return null;
}

/** Validates the the string of characters contains at least 1 number character */
export function min1digit(c: FormControl): ValidationErrors | null {
  if (c.value === null) {
    return null; // don't validate empty value
  }
  if (typeof c.value !== 'string') {
    console.warn('min1digit validator: value is not a string')
    return { min1digit: true };
  }
  const isValid = new RegExp('[0-9]').test(c.value);
  if (!isValid) {
    return { min1digit: true }
  }
  return null;
}

/** Validates the the string of characters contains at least 1 special character */
export function min1specialCharacter(c: FormControl): ValidationErrors | null {
  if (c.value === null) {
    return null; // don't validate empty value
  }
  if (typeof c.value !== 'string') {
    console.warn('min1specialCharacter validator: value is not a string')
    return { min1specialCharacter: true };
  }
  const isValid = new RegExp('[^((0-9)|(a-z)|(A-Z)|\s)]').test(c.value);
  if (!isValid) {
    return { min1specialCharacter: true }
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
export function compareValidator(control1Name: string, control2Name: string): ValidatorFn {
  return (c: FormGroup): ValidationErrors | null => {
    const control1: FormControl = c.get(control1Name).value;
    const control2: FormControl = c.get(control2Name).value;
    if (control1 === null || control2 === null) {
      return null; // don't validate empty value
    }
    if (control1 !== control2) {
      return { compareValidator: true };
    } else {
      return null;
    }
  };
}

/**
 * This Function is intended to validate that all files match at least one of the provided MIME types in the validator function
 * For more information check: https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 * @param fileTypes File types MIME can be an array or a single MIME type
 */
export function validFileType(fileTypes: string | string[]): ValidatorFn {
  if (!fileTypes) {
    console.error('Invalid FileType validator, please provide one, using empty string as default');
    fileTypes = '';
  }
  return (c: AbstractControl): ValidationErrors | null => {
    const files: File | FileList = c.value;
    const fileTypesArray: string[] = Array.isArray(fileTypes) ? fileTypes : [fileTypes];
    if (c.value === null || c.value.length === 0) {
      return null; // don't validate empty value
    }
    let filesArray: File[];
    if (files instanceof FileList) { filesArray = Array.from(files); }
    if (files instanceof File) { filesArray = [files]; }
    const isValid = filesArray.every((f: File) => {
      return fileTypesArray.some((t) => t === f.type);
    });
    if (isValid) {
      return null;
    } else {
      return { invalidFileType: true };
    }
  };
}

/**
 * This Function is intended to validate the maximum valid file size of a File type object
 * @param fileSize File size in Bytes
 */
export function maxFileSize(fileSize: number): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (!fileSize) {
      console.error('Invalid fileSize, please provide one, not performing validation as default');
      return null;
    }
    const files: File | FileList = c.value;
    if (c.value === null || c.value.length === 0) {
      return null; // don't validate empty value
    }
    let filesArray: File[];
    if (files instanceof FileList) { filesArray = Array.from(files); }
    if (files instanceof File) { filesArray = [files]; }
    const isValid = filesArray.every((f: File) => {
      return f.size < fileSize;
    });
    if (isValid) {
      return null;
    } else {
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
export function imageMinMaxResolution(width: number, height: number, validationMinOrMax: 'min' | 'max'): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (isNaN(width) || isNaN(height)) {
      console.error('Invalid width or height value params on validator function, please provide both values correctly');
      return of(null);
    }
    if (!validationMinOrMax) {
      console.error('Invalid validationMinOrMax value params on validator function, please provide a correct value');
      return of(null);
    }
    if (c.value === null) {
      return of(null); // don't validate empty value
    }
    const observable = new Subject<ValidationErrors | null>();
    /** here we validate if the height and width of the loaded image have values greater than the provided by the validator params */
    const validateAsMin = (image: HTMLImageElement) => {
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
    const validateAsMax = (image: HTMLImageElement) => {
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
    image.src = window.URL.createObjectURL(c.value as File);
    image.onload = () => {
      if (validationMinOrMax === 'min') { validateAsMin(image); }
      if (validationMinOrMax === 'max') { validateAsMax(image); }
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
export function customValidatorCompareDateGreaterThan(
  controlNameDate1: string,
  controlNameTime1: string,
  controlNameDate2: string,
  controlNameTime2: string,
  justEvaluateDate?: boolean,
  canExecuteThisValidator?: (s: FormGroup) => boolean,
  validatorProperty: string = 'invalidRange',
  validatorPropertyOffset: string = 'invalidOffset',
  daysOffSet?: number
) {
  return (c: FormGroup): ValidationErrors | null => {
    const controlDate1: string = c.get(controlNameDate1).value;
    const controlTime1: string = justEvaluateDate ? null : c.get(controlNameTime1).value;
    const controlDate2: string = c.get(controlNameDate2).value;
    const controlTime2: string = justEvaluateDate ? null : c.get(controlNameTime2).value;

    if (!controlDate1
      || (justEvaluateDate ? false : !controlTime1)
      || !controlDate2
      || (justEvaluateDate ? false : !controlTime2)) {
        return null;
      }

    if (canExecuteThisValidator && !canExecuteThisValidator(c)) {
      return null;
    }

    const startDate = joinDateTimeInISO8601(controlDate1, controlTime1);
    const endDate = joinDateTimeInISO8601(controlDate2, controlTime2);

    const validatorObj = {};
    validatorObj[validatorProperty] = true;
    if (moment(endDate).isBefore(moment(startDate))) {
      return validatorObj;
    }
    else if (!daysOffSet) {
      return null;
    }

    const validatorObjOffset = {};
    validatorObjOffset[validatorPropertyOffset] = true;
    return moment.duration(moment(endDate).diff(moment(startDate))).asDays() < daysOffSet ? validatorObjOffset : null;
  };
}

/**
 * This Function is intended to validate 2 date/time on the same FormGroup, checking date1 don't be greater than date2.
 * @param controlNameDate1 name of the fromControl for date1
 * @param controlNameDate2 name of the fromControl for date2
 * @param plusNDays Number of days to include / substract from the difference
 * @param validatorProperty in case need a different error property name (default: 'invalidRange')
 */
export function customValidatorCompareDateGreaterThanPlusNDays(
  controlNameDate1: string,
  controlNameDate2: string,
  startDatePlusNDays: number,
  canExecuteThisValidator?: (s: FormGroup) => boolean,
  validatorProperty: string = 'invalidRangeNDays',
) {
  return (c: FormGroup): ValidationErrors | null => {
    const controlDate1: string = c.get(controlNameDate1).value;
    const controlDate2: string = c.get(controlNameDate2).value;

    if (!controlDate1 || !controlDate2) {
      return null;
    }

    if (canExecuteThisValidator && !canExecuteThisValidator(c)) {
      return null;
    }

    const startDate = joinDateTimeInISO8601(controlDate1, null);
    const endDate = joinDateTimeInISO8601(controlDate2, null);

    const validatorObj = {};
    validatorObj[validatorProperty] = true;
    if (moment(endDate).isBefore(moment(startDate).add(startDatePlusNDays, 'day'))) {
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
export function customValidatorCompareDateBetweenStaticValues(
controlNameDate: string,
startingDateGetCallback: () => string,
endingDateGetCallback: () => string,
validatorProperty: string = 'invalidDateBetween'
) {
  return (c: FormGroup): ValidationErrors | null => {
    const controlDate0 = c.get(controlNameDate).value;
    const controlDate1 = startingDateGetCallback();
    const controlDate2 = endingDateGetCallback();

    if (!controlDate0 || !controlDate1 || !controlDate2) {
      return null;
    }

    const validatorObj = {};
    validatorObj[validatorProperty] = true;
    if (moment(controlDate0).isBetween(moment(controlDate1), moment(controlDate2), 'days', '[]')) {
      return null;
    }

    return validatorObj;
  };
}

/** Checks diff between controlNameDate and current date be between maxDaysOffSet */
export function customValidatorDateOffSetNotGreatherThan(
  controlNameDate: string,
  maxDaysOffSet: number,
  validatorPropertyDateOffset: string = 'invalidDateOffset') {
    return (c: FormGroup): ValidationErrors | null => {
      if (!c.get(controlNameDate).value) { return null; }
      const dateValue: string = moment(c.get(controlNameDate).value).format('YYYY-MM-DDT00:00:00');
      const todayValue = moment(moment().format('YYYY-MM-DDT00:00:00'));
      const offset = moment.duration(moment(dateValue).diff(todayValue)).asDays();
      if (offset > maxDaysOffSet) {
        const objReturned = {};
        objReturned[validatorPropertyDateOffset] = true;
        return objReturned;
      }

      return  null;
    };
  }

/**
 * This Function is intended to validate 2 times on the same FormGroup, checking time1 don't be greater than time2.
 * @param controlNameTime1 name of the fromControl for time1
 * @param controlNameTime2 name of the fromControl for time2
 * @param minutesOffSet max amount of minutes accepted between time1 and time2
 * @param validatorProperty in case need a different error property name (default: 'invalidRange')
 */
export function customValidatorCompareTimeGreaterThan(
  controlNameTime1: string,
  controlNameTime2: string,
  minutesOffSet?: number,
  validatorProperty: string = 'invalidRange',
  validatorPropertyOffset: string = 'invalidOffset',
  canExecuteThisValidator?: (s: FormGroup) => boolean,
) {
  return (c: FormGroup): ValidationErrors | null => {
    const controlTime1: string = c.get(controlNameTime1).value;
    const controlTime2: string = c.get(controlNameTime2).value;

    if (!controlTime1 || !controlTime2) {
      return null;
    }

    if (canExecuteThisValidator && !canExecuteThisValidator(c)) {
      return null;
    }

    const startDate = moment(controlTime1, 'HH:mm');
    const endDate = moment(controlTime2, 'HH:mm');

    const validatorObj = {};
    validatorObj[validatorProperty] = true;
    if (moment(endDate).isBefore(moment(startDate))) {
      return validatorObj;
    }
    else if (!minutesOffSet) {
      return null;
    }

    const validatorObjOffset = {};
    validatorObjOffset[validatorPropertyOffset] = true;
    return moment.duration(moment(endDate).diff(moment(startDate))).asMinutes() > minutesOffSet ? validatorObjOffset : null;
  };
}

/**
 * This Function is intended to validate 2 times on the same FormGroup, checking time1 don't be greater than time2.
 * @param controlNameTime1 name of the fromControl for time1
 * @param controlNameTime2 name of the fromControl for time2
 * @param minutesOffSet max amount of minutes accepted between time1 and time2
 * @param validatorProperty in case need a different error property name (default: 'invalidRange')
 */
export function customValidatorTimeRange(
  controlNameTime: string,
  rangeTime1: string,
  rangeTime2: string,
  validatorProperty: string = 'invalidTimeRange',
  canExecuteThisValidator?: (s: FormGroup) => boolean,
) {
  return (c: FormGroup): ValidationErrors | null => {
    const controlTime: string = c.get(controlNameTime).value;
    if (!controlTime) { return null; }

    if (canExecuteThisValidator && !canExecuteThisValidator(c)) {
      return null;
    }

    const startDate = moment(controlTime, 'HH:mm');
    const range1 = moment(rangeTime1, 'HH:mm').add(-1, 'minute');
    const range2 = moment(rangeTime2, 'HH:mm').add(1, 'minute');

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
export function requireAgeGroupToBeUnder(dateFieldName: string, monthFieldName: string, yearFieldName: string, ageValidity: number): ValidatorFn {
  return (c: FormGroup): ValidationErrors | null => {
    const dob = moment.utc();
    // doesn't guaranty a true validation due to relative date from the host machine clock
    const AgeDate = moment.utc().subtract(ageValidity, 'y');
    dob.set({
      year: parseInt(c.get(yearFieldName).value),
      month: parseInt(c.get(monthFieldName).value) - 1, // moment month is from 0 to 11 and select options goes from 1 to 12
      date: parseInt(c.get(dateFieldName).value),
      hour: 0,
      minute: 0,
      second: 0,
    });
    if (!dob.isValid()) {
      return null; // don't validate empty value
    }

    if (dob.isAfter(AgeDate) && dob.isBefore(moment.utc())) {
      return null;
    } else {
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
export function requireAgeGroupToBeOver(dateFieldName: string, monthFieldName: string, yearFieldName: string, ageValidity: number): ValidatorFn {
  return (c: FormGroup): ValidationErrors | null => {
    const dob = moment.utc();
    // doesn't guaranty a true validation due to relative date from the host machine clock
    const AgeDate = moment.utc().subtract(ageValidity, 'y');
    dob.set({
      year: parseInt(c.get(yearFieldName).value),
      month: parseInt(c.get(monthFieldName).value) - 1, // moment month is from 0 to 11 and select options goes from 1 to 12
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
    } else {
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
export function requiredIf(controlNameToEvaluate: string | string[], controlNamesToBeRequired: string[], optionalConf?: RequiredIfOptionalConf): ValidatorFn {
  const singleControlName = (c: FormGroup, controlName: string) => {
    let controlValue = c.get(controlName)?.value;
    if (optionalConf?.formRoot) {
      controlValue = c.root?.get(controlName)?.value;
    }
    const invalidControls: ValidationErrors = {};
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
  return (c: FormGroup): ValidationErrors | null => {
    if (Array.isArray(controlNameToEvaluate)) {
      const hasError = controlNameToEvaluate.some((controlName) => {
        return singleControlName(c, controlName);
      });
      return hasError ? { requiredIf: true } : null;
    } else {
      return singleControlName(c, controlNameToEvaluate);
    }
  };
}

/**
 * This Function is intended to validate a formControl as required if another formControl from the same FormGroup has a Falsy value
 * @param controlNameToEvaluate name of the fromControl of the same formGroup to validate against
 * @param controlNamesToBeRequired array name of fromControls of the same formGroup to validate against
 */
export function requiredIfNot(controlNameToEvaluate: string, controlNamesToBeRequired: string[]): ValidatorFn {
  return (c: FormGroup): ValidationErrors | null => {
    const controlValue = c.get(controlNameToEvaluate).value;
    const invalidControls: ValidationErrors = {};
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
    } else {
      return null;
    }
  };
}

/**
 * This Function is intended to validate if a FormArray contains at least 1 value that matches the given expression
 * @param expression An optional expression to handle how each value of the FormArray should be test as valid
 */
export function arrayAtLeastOneIsRequired(expression?: (control?: AbstractControl) => boolean): ValidatorFn {
  return (c: FormArray): ValidationErrors | null => {
    if (c.value === null) {
      return null;
    }
    let isValid = false;
    if (c.controls.length > 0) {
      if (expression) {
        isValid = c.controls.some(expression);
      } else {
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
export function arrayAtLeastOneIf(controlNameToEvaluate: string, expression: (control?: AbstractControl) => boolean, optionalConf?: ArrayAtLeastOneIfOptionalConf): ValidatorFn {
  return (c: FormArray): ValidationErrors | null => {
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
        } else {
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
export function arrayAtLeastOneIfNot(controlNameToEvaluate: string, expression: (control?: AbstractControl) => boolean, optionalConf?: ArrayAtLeastOneIfOptionalConf): ValidatorFn {
  return (c: FormArray): ValidationErrors | null => {
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
        } else {
          isValid = c.controls.some(control => control.value);
        }
        return isValid ? null : { arrayAtLeastOneIf: true };
      }
    }
    return null;
  };
}

/** Validate the value don't be equal to valueToCompare */
export function customValidatorNotEqualTo(valueToCompare: string, validatorProperty: string = 'valueEqualTo'): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (!valueToCompare || c.value === null || c.value.length === 0) {
      return null;
    }

    const validatorObj = {};
    validatorObj[validatorProperty] = true;
    return c.value === valueToCompare ? validatorObj : null;
  };
}

/** Validates if the value as a whole number, it access values in string and number format */
export function wholeNumberRequired(c: FormControl): ValidationErrors | null {
  if (c.value === null) {
    return null; // don't validate empty value
  }
  const validateNumber = (value: number) => {
    if (value % 1 !== 0) {
      return { wholeNumberRequired: { notAWholeNumber: true }};
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
export function customValidatorAtLeastAControlSet(
  controlsToEvaluate: string[],
  validatorProperty: string = 'AtLeastAControlSet'
) {
  return (c: FormGroup): ValidationErrors | null => {
    if (controlsToEvaluate.filter(controlName => {
      const controlValue: string = c.get(controlName).value;
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
export function requiredIf2(controlsToValidateCallback: (c: FormGroup) => string[], validatorProperty: string = 'requiredIf2'): ValidatorFn {
  return (c: FormGroup): ValidationErrors | null => {
    const controlNamesToBeRequired = controlsToValidateCallback(c);
    if (controlNamesToBeRequired && controlNamesToBeRequired.length > 0) {
      const invalidControls: ValidationErrors = {};
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
