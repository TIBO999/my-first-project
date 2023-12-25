import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserApiService} from "../../services/user-api.service";
import {User} from "../../user";
import {Observable, map} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit{
  id!: number;
  user!: Observable<User>;
  constructor(private activatedRoute: ActivatedRoute, private userApiService: UserApiService) {
  }
  ngOnInit(): void {
    this.user = this.activatedRoute.data.pipe(map((data) => data?.['user'] ))
  }
}
