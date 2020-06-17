
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  
  });

  constructor(private LoginService: LoginService) {}

  ngOnInit(): void {}

  changePassword() {
    console.log(this.registerForm.value);
    this.LoginService.changePassword(this.registerForm.value).subscribe();
  }
}
