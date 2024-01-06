import {Component, OnInit} from '@angular/core';
import {User} from "../../user";
import {UserApiService} from "../../services/user-api.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {UsersListComponentDialog} from "./users-list-component-dialog/users-list-component-dialog";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    UserCardComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})

export class UsersListComponent implements OnInit {
  users!: User[];


  constructor(
    private userApiService: UserApiService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userApiService.getUsers().subscribe((data: User[]) => this.users = data)
  }

  /** public deleteUser(user: User) {
   this.users.splice(this.users.indexOf(user), 1);
   }  */

  public deleteUser(userToDelete: User) {
    this.users = this.users.filter((user) =>
       userToDelete.id !== user.id
    );
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UsersListComponentDialog, {
      data: {name: null, email: null, phone: null},
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      console.log('The dialog was closed', result);
      if (result)
      {this.users.push(result);}
    });
  }
}




