import clientAxios from '../../Config/axios';
import {
	newTracking,
	newTrackingReady,
	newTrackingError,
	getTracking,
	getTrackingReady,
	getTrackingError,
	receiveTracking,
	receiveTrackingReady,
	receiveTrackingError,
} from '../Tracking';

export const newTrackingAction = (body, navigate, headers) => {
	return async (dispatch) => {
		dispatch(newTracking());
		try {
			const { data } = await clientAxios.post('/orders/', body, { headers });
			dispatch(newTrackingReady(data));
			navigate();
		} catch (error) {
			console.log(error);
			dispatch(newTrackingError(error));
		}
	};
};

export const getTrackingAction = () => {
	return async (dispatch) => {
		dispatch(getTracking());
		try {
			const { data } = await clientAxios.get('/orders/');
			dispatch(getTrackingReady(data.orders));
		} catch (error) {
			console.log(error);
			dispatch(getTrackingError(error));
		}
	};
};

export const receiveTrackingAction = (body, headers, navigate) => {
	return async (dispatch) => {
		dispatch(receiveTracking());
		try {
			const { data } = await clientAxios.post('/orders/receiveOrder', body, { headers });
			dispatch(receiveTrackingReady(data));
			console.log(data);
			navigate();
		} catch (error) {
			console.log(error);
			dispatch(receiveTrackingError(error));
		}
	};
};
