import { types } from '../types/types';

const initialstate = {
	trackings: [],
	tracking: [],
	msgError: null,
	loading: false,
};

export const TrackingReducer = (state = initialstate, action) => {
	switch (action.type) {
		case types.newTracking:
			return {
				...state,
				loading: action.payload,
			};

		case types.newTrackingReady:
			return {
				...state,
				loading: false,
				tracking: action.payload,
				msgError: null,
			};

		case types.newTrackingError:
			return {
				...state,
				loading: action.payload,
			};

		case types.getTracking:
			return {
				...state,
				loading: action.payload,
			};

		case types.getTrackingReady:
			return {
				...state,
				loading: false,
				trackings: action.payload,
				msgError: null,
			};

		case types.getTrackingError:
			return {
				...state,
				loading: action.payload,
			};

		default:
			return state;
	}
};
