import { combineReducers } from 'redux';

import { filterReducer } from './filterReducer'
import { authReducer } from './authReducer'
import { dataReducer } from './dataReducer';
import { materialReducer } from './materialReducer';
import { userReducer } from './userReducer';
import { valuteReducer } from './valuteReducer';


const rootReducer = combineReducers({
    filter: filterReducer,
    data: dataReducer,
    auth_data : authReducer,
    material: materialReducer,
    user_data: userReducer,
    valute_data: valuteReducer,
});

export default rootReducer;
