import {Routes} from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {
    path: '', component: AppComponent, title: 'Home', pathMatch: 'full'
  },
  {
        path: 'users', component: UsersListComponent,
  }
];
