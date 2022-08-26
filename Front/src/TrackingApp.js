import React from 'react';
import { store } from './Store/Store';
import { Provider } from 'react-redux';
import { AppRouter } from './Routers//AppRouter/AppRouter';

export const TrackingApp = () => {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
};
