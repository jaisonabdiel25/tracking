import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware } from 'redux';

import { AuthReducer } from '../Reducers/AuthReducer';
import { ClientReducer } from '../Reducers/ClientReducer';
import { TrackingReducer } from '../Reducers/TrackingReducer';

const reducer = combineReducers({
	Auth: AuthReducer,
	Client: ClientReducer,
	Tracking: TrackingReducer,
});

const middlewareEnhancer = applyMiddleware(thunk);

export const store = configureStore({
	reducer,
	undefined,
	middlewareEnhancer,
});
