
// redux/store.ts
import {  combineReducers } from '@reduxjs/toolkit';

// Import your reducers here
// import myReducer from './myReducer';
import authReducer from './reducers/authSlice';
import dayTimeReducer from './reducers/timeSlice'



const rootReducer = combineReducers({
    auth: authReducer,
    dayTime: dayTimeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof rootReducer.dispatch;

export default rootReducer;



