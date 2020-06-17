import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

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

  constructor(private LoginService: LoginService) {}

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);
    this.LoginService.login(this.loginForm.value).subscribe();
  }
}
