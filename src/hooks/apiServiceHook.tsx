import { useState } from "react";
import { addError, clearErrors, publishErrors } from "services/errorService";
import { ajax } from "rxjs/ajax";
import { forkJoin, of, Observable } from "rxjs";
import { map, catchError, retry, delay } from "rxjs/operators";

// using this hook to fetch data requires this format
export type RequestStructure = {
  url: string;
  method: string;
  headers: object;
  body: object;
};

type ResponseStructure = {
  data: object;
  error: boolean;
  errorMessage: string;
};

// A custom hook to fetch Data
// maybe accept some kind of tokens to store for all api requests?
export const useInsightsApi = () => {
  // when state is updated, it will re-render the component that invoked it
  const [isLoading, setIsLoading] = useState(false);

  // this can be used if the component wants to handle errors itself
  //const [error, setError] = useState("");

  // allow components to chain requests if needed, this just uses the basic fetch 
  const fetchData = async (request: RequestStructure, all: boolean = false) => {
    try {
      if (!all) {
        setIsLoading(true);
      }
      const resp = await fetch(request.url, { method: request.method });
      return resp.json();
    } catch (e) {
      // playing around with errors for now
      addError(e);
    } finally {
      if (!all) {
        setIsLoading(false);
        publishErrors();
      }
    }
  };

  // support batching promises together the rxjs way. This is just like promise all but more powerful 
  const fetchAll = async (requests: Array<RequestStructure>) => {
    let responses: Array<ResponseStructure> = [];
    try {
      clearErrors();
      setIsLoading(true);

      // using some rxjs features
      const observables: Array<Observable<ResponseStructure>> = requests.map(
        req => {
          return ajax({ ...req }).pipe(
            map(ajaxResponse => {
              return {
                error: false,
                data: ajaxResponse.response,
                errorMessage: ""
              };
            }),
           // retry(2),
            //delay(1000),
            catchError(ajaxError => {
              return of({
                error: true,
                data: {},
                errorMessage: ajaxError.message
              });
            })
          );
        }
      );

      // rxjs has the conecept of observables so convert it
      responses = await forkJoin(observables).toPromise();
      parseResponseErrors(responses);
    } catch (e) {
    } finally {
      // This will update state on the component using this hook & push errors to the stream if anything is listening for them
      setIsLoading(false);
      publishErrors();
      return responses;
    }
  };

  // add any errors to the errorService
  const parseResponseErrors = (responses: Array<ResponseStructure>) => {
    responses.forEach(resp => {
      if (resp.error) {
        addError({ type: "APIERROR", message: resp.errorMessage });
      }
    });
  };

  return { isLoading, fetchData, fetchAll };
};
