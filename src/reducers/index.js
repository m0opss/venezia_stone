import { combineReducers } from 'redux';

import { filterReducer } from './filterReducer'
import { authReducer } from './authReducer'
import { dataReducer } from './dataReducer';
import { materialReducer } from './materialReducer';
import { userReducer } from './userReducer';


const rootReducer = combineReducers({
    filter: filterReducer,
    data: dataReducer,
    auth_data : authReducer,
    material: materialReducer,
    user_data: userReducer,
});

export default rootReducer;
