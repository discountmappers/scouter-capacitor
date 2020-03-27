import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import {loginEpic} from 'epics/loginEpic'
import {loginReducer} from 'reducers/login'
//import {watchSearch} from '../sagas/searchSaga'

//const sagaMiddleware = createSagaMiddleware();
// epics are the redux-observable middleware naming convention
const epicMiddleware = createEpicMiddleware();

// hooking up redux if needed 
const store = createStore(loginReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(loginEpic);
export default store