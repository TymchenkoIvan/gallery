import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../gallery/service/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isExpanded = true;

  constructor(private authService: AuthenticationService, public router: Router) { }

  ngOnInit(): void {
  }

  isAuthenticated(): User {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
