import { LOGIN_REQUEST } from "../actions/searchAction";
import { ajax } from "rxjs/ajax";
import { addError, publishErrors } from "services/errorService";
import { of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { RequestStructure } from "hooks/apiServiceHook";

type ActionType = {
  type: string;
  urlParams: RequestStructure;
};
// using the observable middleware for async actions.
// this seperates our data fetching concerns nicely if using redux
export const loginEpic = (action$: any) => {
  return action$.pipe(
    ofType(LOGIN_REQUEST),
    mergeMap((action: ActionType) => {
      return ajax({ ...action.urlParams }).pipe(
        map((data: any) => {
          // dispatch the action to update redux store with the response
          return { type: "LOGIN_SUCCESS", user: data.response };
        }),
        catchError(ajaxError => {
          // use the error service and dispatch a none action
          addError(ajaxError);
          publishErrors();
          return of({ type: "NO_ACTION" });
        })
      );
    })
  );
};
