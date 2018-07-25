import { 
	LOAD_RESTAURANT,
	REQUEST_REST_PENDING,
	REQUEST_REST_SUCCESS,
	REQUEST_REST_FAILED,
	 } from './constants.js'

const initialState = {
      restInfo: {},
      isPending: false,
    }

export const restaurantInfo = (state=initialState, action={}) => {
	switch(action.type) {
		case LOAD_RESTAURANT:
			return Object.assign({}, state, { restInfo: action.payload });
		case REQUEST_REST_PENDING:
			return Object.assign({}, state, { isPending: false })
		case REQUEST_REST_SUCCESS:
			return Object.assign({}, state, { restInfo: action.payload, isPending: false })
		case REQUEST_REST_FAILED:
			return Object.assign({}, state, { error: action.payload, isPending: false })
		default:
			return state;
	}
}