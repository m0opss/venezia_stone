import { combineReducers } from 'redux';

import { filterReducer } from './filterReducer'
import { authReducer } from './authReducer'
import { dataReducer } from './dataReducer';
import { materialReducer } from './materialReducer';
import { userReducer } from './userReducer';
import { valuteReducer } from './valuteReducer';
import { basketReducer } from './basketReducer';
import { izbrReducer } from './izbrReducer';

const rootReducer = combineReducers({
    filter_data: filterReducer,
    data: dataReducer,
    auth_data : authReducer,
    material: materialReducer,
    user_data: userReducer,
    valute_data: valuteReducer,
    basket_data: basketReducer,
    izbr_data: izbrReducer
});

export default rootReducer;
