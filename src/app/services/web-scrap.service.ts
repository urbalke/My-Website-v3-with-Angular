import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllegroResults } from '../allegro-results';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebScrapService {

  constructor(private http: HttpClient) { }

allegroApi: string = "http://127.0.0.1:5000/api/allegro"

apiResponse= new BehaviorSubject(null);


  webScrap(requestForm){
    return this.http.post(this.allegroApi, requestForm);
}
}