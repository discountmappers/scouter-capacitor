import {put, call, takeEvery} from 'redux-saga/effects';

import {SEARCH_ACTION} from 'actions/searchAction'

// another way to listen for redux actions and do some async stuff 
function* searchSaga(action:any) : IterableIterator<any>{

    const arr = [
        {
          url: "https://thereportoftheweek-api.herokuapp.com/reports",
          method: "GET",
          headers: {},
          body: {}
        },
        {
          url: "tps://thereportoftheweek-api.herokuapp.com/reports",
          method: "GET",
          headers: {},
          body: {}
        }
      ];
      const responses = yield call(action.action.fetchAll(arr))
     //return responses
    yield put({type:'SEARCH_SUCCESS', data: 'wefew'})
}

export function* watchSearch() {
    // create watcher of fetchData function
    yield takeEvery(SEARCH_ACTION, searchSaga);
}