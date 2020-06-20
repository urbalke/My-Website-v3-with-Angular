import { Component, OnInit, OnChanges } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  active = 'top';
  isLoggedIn: Observable<boolean>;

  constructor(private Router: Router, private LoginService: LoginService) { }

  ngOnInit(): void {
this.isLoggedIn = this.LoginService.isLoggedIn
  
  }

  ngOnChanges(): void {
  }


  logOut() {
    localStorage.removeItem('userToken');
    this.Router.navigate(['/']);
    this.LoginService.isLoggedIn.next(false)
  }

}
