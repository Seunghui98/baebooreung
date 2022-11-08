import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    grade: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.grade = action.payload.grade;
    },
  },
});
export const {setUser} = userSlice.actions;
export default userSlice.reducer;
