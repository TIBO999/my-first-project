import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-app-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.css'
})
export class AppNavComponent {

}
