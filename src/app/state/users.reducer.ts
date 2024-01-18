import {User} from "../types/user";
import {createFeature, createReducer, on} from "@ngrx/store";
import {UsersActions} from "./users.actions";


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
    on(UsersActions.loadUsers, state => ({ ...state, loading: true, error: null })),
    on(UsersActions.loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
    on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(UsersActions.addUser, (state, { newUser }) => ({ ...state, users: [...state.users, newUser] })),

    on(UsersActions.editUser, (state, { editedUser }) => {
      const updatedUsers = state.users.map(user =>
        user.id === editedUser.id ? { ...user, ...editedUser } : user
      );
      return { ...state, users: updatedUsers };
    }),

    on(UsersActions.deleteUser, (state, { id }) => {
      const updatedUsers = state.users.filter(user => user.id !== id);
      return { ...state, users: updatedUsers };
    })
  )
  }
)
