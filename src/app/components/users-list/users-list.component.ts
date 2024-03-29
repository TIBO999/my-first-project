import {Component, inject, OnInit} from '@angular/core';
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
import {LocalStorageService} from "../../services/local-storage.service";

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
  private readonly userLocalStorage = inject(LocalStorageService);

  constructor(
    private userApiService: UserApiService,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    // проверка наличия массива users в local storage, если да - берем из local storage
    // else - запрос на сервер и загрузка users в local storage
    const  users = this.userLocalStorage.get("users");
    if(users !== null){
        this.users = JSON.parse(users)
    }
    else
    {
      this.userApiService.getUsers().subscribe((data: User[]) => {
        this.users = data;
        this.userLocalStorage.set("users", JSON.stringify(this.users))
      });
    }
  }

  public deleteUser(userToDelete: User) {
    this.users = this.users.filter((user) =>
       userToDelete.id !== user.id
    );
    this.userLocalStorage.set("users", JSON.stringify(this.users));
  }
  public editUser(userToEdit: User) {
    const dialogRef = this.dialog.open(UsersListComponentDialog, {
      data: {id: userToEdit.id, name: userToEdit.name, email: userToEdit.email, phone: userToEdit.phone},
    });
    dialogRef.afterClosed().subscribe((editedUser: User) => {
      console.log('The dialog was closed', editedUser);
      if (editedUser) {
        this.users = this.users.map(user =>
          user.id === editedUser.id ? editedUser : user
        )
      }
      this.userLocalStorage.set("users", JSON.stringify(this.users))
    });
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UsersListComponentDialog, {
      data: {id: new Date().getTime(), name: null, email: null, phone: null},
    });
    dialogRef.afterClosed().subscribe((result: User) => {
      console.log('The dialog was closed', result);
      if (result)
      {this.users.push(result)}
      this.userLocalStorage.set("users", JSON.stringify(this.users))
    });
  }
}
