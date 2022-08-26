import { types } from '../types/types';

export const login = () => {
	return {
		type: types.login,
		payload: true,
	};
};

export const LoginReady = (data) => {
	return {
		type: types.loginReady,
		payload: data,
	};
};

export const LoginError = (response) => {
	return {
		type: types.loginError,
		payload: response,
	};
};

export const Logout = () => {
	return {
		type: types.logout,
		payload: {},
	};
};
