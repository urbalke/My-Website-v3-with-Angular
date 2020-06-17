import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

apiUrl: string = 'http://127.0.0.1:5000/login/api';

  constructor(private http: HttpClient) { }


login(loginForm){
return this.http.post(this.apiUrl, loginForm);
}

register(loginForm){
  return this.http.put(this.apiUrl, loginForm)
}

changePassword(loginForm){
  return this.http.patch(this.apiUrl, loginForm);
} 

}
