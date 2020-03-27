import { Subject } from "rxjs";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import {
  map,
  catchError,
  debounceTime,
  switchMap
} from "rxjs/operators";
import { addError, publishErrors } from "./errorService";

// service responsible for fetching data and filtering for search
const typeService = new Subject();

// function that sends requests as you type
const fetchSelections = (endpoint: string) => {
  // switch map works nicely here because it will cancel the previous request, which would work nicely as you type
  return typeService.pipe(
    debounceTime(5000),
    // value is whatever we added to the stream (.next)
    switchMap(value => ajax({ url: endpoint, method: "GET" })),
    // you could have multiple map operators here to transform data
    map(ajaxResponse => {
      return ajaxResponse.response;
    }),
    catchError(ajaxError => {
      // handle any 500 errors or 400's
      addError({
        type: "AUTO_COMPLETE_ERROR",
        message: ajaxError.message
      });
      publishErrors();
      // needs to return an observable so 'of' does that for us
      return of({
        error: true
      });
    })
  );
};

// only expose the reactive functions
export { typeService, fetchSelections };
