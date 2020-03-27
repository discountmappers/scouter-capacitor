import { Subject } from "rxjs";

export type ErrorStructure = {
  type: string;
  message: string;
};

// simple class to manage errors in a global state if we need it
class ErrorManager {
  errorList: Array<ErrorStructure> = [];
  addError = (error: ErrorStructure) => {
    this.errorList.push(error);
  };
  clearErrors = () => {
    this.errorList = [];
  };
  getErrorList = () => {
    return this.errorList;
  };
}

// this obj acts as a "store" for errors
const errManager = new ErrorManager();

// allow components to respond to any errors in the application if needed
const errorSubject = new Subject();
const errorObs = errorSubject.asObservable();
const addError = (error: ErrorStructure) => {
  errManager.addError(error);
};

const publishErrors = () => {
  errorSubject.next(errManager.getErrorList());
};

const clearErrors = () => {
  errManager.clearErrors();
  errorSubject.next(errManager.getErrorList());
};

// only expose the reactive functions
export { errorObs, addError, publishErrors, clearErrors };
