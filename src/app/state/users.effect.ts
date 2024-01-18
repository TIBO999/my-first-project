import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '../services/user-api.service';
import {UsersActions} from "./users.actions";
import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import { of} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {selectUsers} from "./users.selectors";
import {LocalStorageService} from "../services/local-storage.service";

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions)
  private usersApiService = inject(UserApiService)
  private store = inject(Store)
  private localStorageService = inject(LocalStorageService)



  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      withLatestFrom(this.store.pipe(select(selectUsers))),
      mergeMap(() => {
        const savedUsers = this.localStorageService.loadDataFromLocalStorage(this.localStorageKey)
        if (savedUsers && savedUsers.length > 0) {
          return of(UsersActions.loadUsersSuccess({ users: savedUsers }));
        } else {
          return this.usersApiService.getUsers().pipe(
            map(responseUsers => UsersActions.loadUsersSuccess({ users: responseUsers })),
            catchError(error => of(UsersActions.loadUsersFailure({ error })))
          );
        }
      })
    )
  );


  saveDataToLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.addUser, UsersActions.editUser, UsersActions.deleteUser),
      withLatestFrom(this.store.pipe(select(selectUsers))),
      tap(([action, users]) => {
        this.localStorageService.saveDataToLocalStorage(this.localStorageKey ,users);
      })
    ), { dispatch: false }
  );

}
