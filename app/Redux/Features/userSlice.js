"use client";

import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isLogged:false, 
  template:null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    UpdateTemplatesHandler: (state) => {
      state.template = state;
    },
  },
});

export const { UpdateTemplatesHandler } = userSlice.actions;

export default userSlice.reducer;
