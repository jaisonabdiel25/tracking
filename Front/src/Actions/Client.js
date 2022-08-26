import { types } from '../types/types';

export const getClient = () => {
	return {
		type: types.getClient,
		payload: true,
	};
};

export const getClientReady = (data) => {
	return {
		type: types.getClientReady,
		payload: data,
	};
};

export const getClientError = (response) => {
	return {
		type: types.getClientError,
		payload: response,
	};
};
