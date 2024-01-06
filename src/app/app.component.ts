import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { CommonModule } from '@angular/common';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UsersListComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-first-project';
}
