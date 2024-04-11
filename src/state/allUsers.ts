//estado para admin

import { createAction, createReducer } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  email: string;
  isAdmin: boolean;
  name: string;
  surname: string;
  profileImage: string;
}

// Definir la acción
export const setAllUsers = createAction<UserState[]>("SET-ALL-USERS");

export const setProfileImageFromAdmin = createAction<{
  id: number;
  profileImage: string;
}>("SET-PROFILE-IMAGE-ADMIN");

export const updateDriverState = createAction<{
  id: number;
}>("UPDATE-USER-STATE");

// Definir el estado inicial

const initialState: UserState[] = [];

// Crear el reducer
const allUsersReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAllUsers, (state, action) => {
    return [...state, ...action.payload];
  });
  builder.addCase(setProfileImageFromAdmin, (state, action) => {
    return state.map((user) =>
      user.id === action.payload.id
        ? { ...user, profileImage: action.payload.profileImage }
        : user
    );
  });
  builder.addCase(updateDriverState, (state, action) => {
    return state.map((user) =>
      user.id === action.payload.id ? { ...user } : user
    );
  });
});

export default allUsersReducer;
