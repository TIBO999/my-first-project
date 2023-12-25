import {ResolveFn, Routes} from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {AppComponent} from "./app.component";
import {UserCardComponent} from "./components/user-card/user-card.component";

export const routes: Routes = [
  {
    path: '', component: AppComponent, title: 'Home', pathMatch: 'full',
    children: [
      {
        path: 'users', component: UsersListComponent, resolve: {

        }
      },
      {
        path: 'user', component: UserCardComponent, resolve: {

        }
      }
    ]
  }
];
const resolvedUsersTitle: ResolveFn<string> = () => Promise.resolve('Users');
