import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '../services/user-api.service';
import {loadUsers, deleteUser, editUser, addUser, loadUsersSuccess, loadUsersFailure} from "./users.actions";
import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import { of} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {selectUsers} from "./users.selectors";
import {LocalStorageService} from "../services/local-storage.service";
import {LOCAL_STORAGE_USERS_KEY} from "../app.config";

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions)
  private usersApiService = inject(UserApiService)
  private store = inject(Store)
  private localStorageService = inject(LocalStorageService)
  private localStorageKey = inject(LOCAL_STORAGE_USERS_KEY)



  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(this.store.pipe(select(selectUsers))),
      mergeMap(() => {
        const savedUsers = this.localStorageService.get(this.localStorageKey)
        if (savedUsers && savedUsers.length > 0) {
          return of(loadUsersSuccess({ users: savedUsers }));
        } else {
          return this.usersApiService.getUsers().pipe(
            map(responseUsers => loadUsersSuccess({ users: responseUsers })),
            catchError(error => of(loadUsersFailure({ error })))
          );
        }
      })
    )
  );


  saveDataToLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser, editUser, deleteUser),
      withLatestFrom(this.store.pipe(select(selectUsers))),
      tap(([action, users]) => {
        this.localStorageService.set(this.localStorageKey, JSON.stringify(users));
      })
    ), { dispatch: false }
  );

}
