import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../user";


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }
  getUsers(){

    return this.http.get('https://jsonplaceholder.typicode.com/users_start=0&_limit=5')
  }
  getUser(id: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  }
}
