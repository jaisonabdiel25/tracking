import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../../Components/Auth/LoginScreen';

export const AuthRouter = () => {
	return (
		<div className='bg-light bg-gradient d-flex align-items-center justify-content-center vw-100 vh-100'>
			<div className='bg-white shadow p-3 mb-5 bg-body rounded p-5'>
				<Routes>
					<Route path='/' element={<LoginScreen />} />
					<Route path='login' element={<LoginScreen />} />
				</Routes>
			</div>
		</div>
	);
};
