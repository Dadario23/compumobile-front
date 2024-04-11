import { createAction, createReducer } from "@reduxjs/toolkit";

import { UserState } from "@/types/userTypes";

// Definir la acción
export const set = createAction<UserState>("SET");

export const setProfileImage = createAction<{
  profileImage: string;
}>("SET-PROFILE-IMAGE");

export const clear = createAction<null>("CLEAR");

// Definir el estado inicial

const initialState: UserState = {
  id: -1,
  email: "",
  isAdmin: false,
  name: "",
  surname: "",
  profileImage: "",
};

// Crear el reducer
const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(set, (state, action) => {
    return { ...state, ...action.payload };
  });
  builder.addCase(setProfileImage, (state, action) => {
    return { ...state, ...action.payload };
  });
  builder.addCase(clear, () => {
    return { ...initialState };
  });
});

export default userReducer;
