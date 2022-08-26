import { types } from '../types/types';

export const newTracking = () => {
	return {
		type: types.newTracking,
		payload: true,
	};
};

export const newTrackingReady = (data) => {
	return {
		type: types.newTrackingReady,
		payload: data,
	};
};

export const newTrackingError = (response) => {
	return {
		type: types.newTrackingError,
		payload: response,
	};
};

export const getTracking = () => {
	return {
		type: types.getTracking,
		payload: true,
	};
};

export const getTrackingReady = (data) => {
	return {
		type: types.getTrackingReady,
		payload: data,
	};
};

export const getTrackingError = (response) => {
	return {
		type: types.getTrackingError,
		payload: response,
	};
};

export const receiveTracking = () => {
	return {
		type: types.receiveTracking,
		payload: true,
	};
};

export const receiveTrackingReady = (data) => {
	return {
		type: types.receiveTrackingReady,
		payload: data,
	};
};

export const receiveTrackingError = (response) => {
	return {
		type: types.receiveTrackingError,
		payload: response,
	};
};
