import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
    },
  },
});
export const {setUser} = userSlice.actions;
export default userSlice.reducer;
