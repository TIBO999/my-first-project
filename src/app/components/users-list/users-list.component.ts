import {Component, OnInit} from '@angular/core';
import {User} from "../../user";
import {UserApiService} from "../../services/user-api.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    UserCardComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})

export class UsersListComponent implements OnInit {
  users!: User[]

  constructor(private userApiService: UserApiService) {
    // console.log(this.users)
  }

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
}


