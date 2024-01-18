import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "../types/user";

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    addUser: props<{newUser: User}>(),
    // addUserSuccess: props<{newUser: IUser}>(),
    // addUserFailure: props<{error: any}>(),

    editUser: props<{editedUser: User}>(),
    // editUserSuccess: props<{editedUser: IUser}>(),
    // editUserFailure: props<{error: any}>(),

    deleteUser: props<{id: number}>(),
    // deleteUserSuccess: props<{id: number}>(),
    // deleteUserFailure: props<{error: any}>(),

    loadUsers: emptyProps(),
    loadUsersSuccess: props<{users: User[]}>(),
    loadUsersFailure: props<{error: any}>(),
  }
})


// Add User Actions
// export const addUser = createAction('[Users] Add User');
// export const addUserSuccess = createAction('[Users] Add User Success', props<{newUser: IUser}>());
// export const addUserFailure = createAction('[Users] Add User Failure', props<{error: any}>());
//
//  Edit User Actions
// export const editUser = createAction('[Users] Edit User');
// export const editUserSuccess = createAction('[Users] Edit User Success', props<{editedUser: IUser}>());
// export const editUserFailure = createAction('[Users] Edit User Failure', props<{error: any}>());
//
//  Delete User Actions
// export const deleteUser = createAction('[Users] Delete User');
// export const deleteUserSuccess = createAction('[Users] Delete User Success', props<{id: number}>());
// export const deleteUserFailure = createAction('[Users] Delete User Failure', props<{error: any}>());
//
//  Load Users Actions
// export const loadUsers = createAction('[Users] Load Users')
// export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{users: IUser[]}>())
// export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{error: any}>())


