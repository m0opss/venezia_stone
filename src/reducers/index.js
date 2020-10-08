import { combineReducers } from 'redux';

import { goodReducer } from './goodReducer'
import { authReducer } from './authReducer'
import { dataReducer } from './dataReducer';
import { materialReducer } from './materialReducer';


const rootReducer = combineReducers({
    goodArray: goodReducer,
    data: dataReducer,
    isAuth : authReducer,
    material: materialReducer,

});

export default rootReducer;
