import { combineReducers } from 'redux';

import { filterReducer } from './filterReducer'
import { authReducer } from './authReducer'
import { dataReducer } from './dataReducer';
import { materialReducer } from './materialReducer';


const rootReducer = combineReducers({
    filter: filterReducer,
    data: dataReducer,
    auth_data : authReducer,
    material: materialReducer,
});

export default rootReducer;
