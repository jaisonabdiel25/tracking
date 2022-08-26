import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ClientScreen } from '../../Components/Clients/ClientScreen';
import { NewClient } from '../../Components/Clients/NewClient';
import { AppPages } from '../../Components/Design/AppPages';
import '../TrackingRouter/TrackingRouter.scss';

export const ClientsRouter = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<AppPages children={<ClientScreen />} />} />
				<Route path='/newClient' element={<AppPages children={<NewClient />} />} />
			</Routes>
		</div>
	);
};
