import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppPages } from '../../Components/Design/AppPages';
import { NewTracking } from '../../Components/Tracking/NewTracking';
import { RecesiveTracking } from '../../Components/Tracking/RecesiveTracking';
import { TrackingFirstPage } from '../../Components/Tracking/TrackingFirstPage';
import './TrackingRouter.scss';

export const TrackingRouter = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<AppPages children={<TrackingFirstPage />} />} />
				<Route path='/newTracking' element={<AppPages children={<NewTracking />} />} />
				<Route path='/recesive' element={<AppPages children={<RecesiveTracking />} />} />
			</Routes>
		</div>
	);
};
