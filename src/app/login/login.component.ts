import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(),
  });

  isLoginError: boolean= false;
 

  constructor(private LoginService: LoginService, private Router: Router) {}

  ngOnInit(): void {
  
  }

  login() {
    console.log(this.loginForm.value);
    this.LoginService.login(this.loginForm.value).subscribe();
  }

  login2(){
    this.LoginService.userAuthentication(this.loginForm.value).subscribe((data: any)=> {
      localStorage.setItem('userToken', data.token);
      this.LoginService.isLoggedIn.next(true);
      this.Router.navigate(['/login/test']);


    },
     (err: HttpErrorResponse)=> {
       this.isLoginError = true;
     },

    )
  }
}
