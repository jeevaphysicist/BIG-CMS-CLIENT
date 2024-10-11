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
    LogoutHandler:(state)=>{

    },
    UpdateTemplatesHandler: (state,action) => {
      state.template = action.payload;
    },
  },
});

export const { UpdateTemplatesHandler ,LogoutHandler } = userSlice.actions;

export default userSlice.reducer;
