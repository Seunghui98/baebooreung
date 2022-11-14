import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: ""
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token
    },
  },
});
export const {setToken} = userSlice.actions;

export default userSlice.reducer;
