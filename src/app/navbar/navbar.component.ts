import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  active = 'top';
  constructor(private Router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
localStorage.removeItem('userToken');
this.Router.navigate(['/'])
  }

}
