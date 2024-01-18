import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../types/user";
import {AsyncPipe, NgIf, NgStyle} from "@angular/common";
import {CardModule, CDBFreeModule} from "ng-cdbangular";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    CardModule,
    CDBFreeModule,
    NgStyle
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input({required: true})
  public user!: User;
  @Output()
  public deleteUser: EventEmitter<User> = new EventEmitter<User>();
  @Output()
  public editUser: EventEmitter<User> = new EventEmitter<User>();
  // public openEditUserDialog: EventEmitter<User> = new EventEmitter<User>();
}
