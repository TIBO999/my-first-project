import {Component, OnInit} from '@angular/core';
import { map, Observable} from "rxjs";
import {User} from "../../user";
import {UserApiService} from "../../services/user-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  users!: Observable<User[]>

  constructor( private userApiService: UserApiService,  private router: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.users = this.activatedRoute.data.pipe(map((data) => data?.['users']));
    console.log(this.users);
  }
}




