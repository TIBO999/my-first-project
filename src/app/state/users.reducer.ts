import {User} from "../types/user";
import {createFeature, createReducer, on} from "@ngrx/store";
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  addUserSuccess, editUserSuccess, deleteUserSuccess
} from "./users.actions";


export const USERS_FEATURE_KEY = 'users'
export interface UsersState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersFeature = createFeature({
  name: USERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(loadUsers, state => ({ ...state, loading: true, error: null })),
    on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
    on(loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(addUserSuccess, (state, { newUser }) => ({ ...state, users: [...state.users, newUser] })),

    on(editUserSuccess, (state, { editedUser }) => {
      const updatedUsers = state.users.map(user =>
        user.id === editedUser.id ? { ...user, ...editedUser } : user
      );
      return { ...state, users: updatedUsers };
    }),

    on(deleteUserSuccess, (state, { id }) => {
      const updatedUsers = state.users.filter(user => user.id !== id);
      return { ...state, users: updatedUsers };
    })
  )
  }
)
