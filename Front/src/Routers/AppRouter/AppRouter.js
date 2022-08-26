import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthRouter } from '../AuthRouter/AuthRouter';
import { ClientsRouter } from '../ClientsRouter/ClientsRouter';
import { TrackingRouter } from '../TrackingRouter/TrackingRouter';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/*' element={<AuthRouter />} />
				<Route path='/Tracking/*' element={<TrackingRouter />} />
				<Route path='/Clients/*' element={<ClientsRouter />} />
			</Routes>
		</BrowserRouter>
	);
};
