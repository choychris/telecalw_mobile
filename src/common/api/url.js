import { baseApi , gizwitsUrl } from '../../config/env';

const apiBase = baseApi();
const gizwitsBase = gizwitsUrl();

export const api = {
	users : {
		root : apiBase+'/users',
		auth : apiBase+'/users/auth',
		logout : apiBase+'/users/logout'
	},
	tags : {
		root : apiBase+'/tags'
	},
	products : {
		root : apiBase+'/products'
	},
	machines : {
		root : apiBase+'/machines'
	},
	plays : {
		root : apiBase+'/plays'
	},
	reservations : {
		root : apiBase+'/reservations'
	},
	transactions : {
		root : apiBase+'/transactions'
	},
	exchangeRates : {
		root : apiBase+'/exchangeRates'
	},
	deliveries : {
		root : apiBase+'/deliveries'
	},
	rewards : {
		root : apiBase+'/rewards'
	},
	issues : {
		root : apiBase+'/issues'
	},
	gizwits : {
		control : gizwitsBase+'/control'	
	}
}

