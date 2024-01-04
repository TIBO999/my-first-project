import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../user";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  // getUsers(): Observable<User[]>{
  //   return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users?_limit=5')
  // }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }

  // getUser(id: number) {
  //   return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  // }
}
