import { combineReducers } from 'redux';

import { goodReducer } from './goodReducer'
import { loginingReducer } from './loginingReducer'
import { dataReducer } from './dataReducer';
import { materialReducer } from './materialReducer';


const rootReducer = combineReducers({
    goodArray: goodReducer,
    data: dataReducer,
    isLogging : loginingReducer,
    material: materialReducer
});

export default rootReducer;
