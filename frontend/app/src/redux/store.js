import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './user';
import gpsReducer from './gps';
import authReducer from './auth';
import userListReducer from './userList';
const rootReducer = combineReducers({
  user: userReducer,
  gps: gpsReducer,
  auth: authReducer,
  userList: userListReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
