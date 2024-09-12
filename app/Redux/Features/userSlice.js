"use client";

import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isLogged:false,
  user: null,
  roles: [],
  plan:null,
  coverPhotos:[],
  photoCollections:[],
  videos:[],
  priceInformations:[],
  FAQS:[],
  preferredConnections:[],
  eventSpace:[],
  topCategory:[],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LoginSuccess: (state) => {
      state.isLogged = true;
    },
    LogoutHandler: (state) => {
      state.user = null;
      state.isLogged = false;
      state.roles = [];
      state.coverPhotos = [];
      state.photoCollections = [];
      state.plan = null;
      state.FAQS = [];
      state.preferredConnections= [];
      state.eventSpace= [];
    },
    UpdateUserHandler: (state, action) => {
      state.user = action.payload;
    },
    UpdatePlanHandler: (state, action) => {
      state.plan = action.payload;
    },
    UpdateCoverPhotosHandler: (state, action) => {
      state.coverPhotos = action.payload;
    },
    UpdatePhotoCollectionsHandler: (state, action) => {
      state.photoCollections = action.payload;
    },
    UpdateVideosHandler: (state, action) => {
      state.videos = action.payload;
    },
    UpdatePricingInfomationHandler: (state, action) => {
      state.priceInformations = action.payload;
    },     
    UpdateFAQSHandler: (state, action) => {
      state.FAQS = action.payload;
    },  
    UpdatePreferredConnectionsHandler: (state, action) => {
      state.preferredConnections = action.payload;
    },   
    UpdateEventSpaceHandler: (state, action) => {
      state.eventSpace = action.payload;
    },      
    UpdateUserRolesHandler: (state, action) => {
      state.roles = action.payload;
    },
    UpdateTopCategoryHandler: (state, action) => {
      state.topCategory = action.payload;
    },
    updateUserProfile: (state, action) => {
      if (state.user && state.user.profile) {
        state.user.profile = {
          ...state.user.profile,
          ...action.payload,
        };
      }
    },
  },
});

export const { LoginSuccess,UpdateTopCategoryHandler,UpdateEventSpaceHandler,UpdateFAQSHandler,UpdatePreferredConnectionsHandler, LogoutHandler,UpdatePricingInfomationHandler,UpdateCoverPhotosHandler,UpdateVideosHandler ,UpdatePhotoCollectionsHandler ,UpdatePlanHandler, UpdateUserHandler, UpdateUserRolesHandler, updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
