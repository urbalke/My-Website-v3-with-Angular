import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Files } from '../files';
import { Router } from '@angular/router';
import { fileURLToPath } from 'url';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

cloudApi = "http://127.0.0.1:5000/cloud/obtain"

  constructor(private http: HttpClient, private Router: Router) { }


  obtainBase(){
    return  this.http.post<Array<Files>>(this.cloudApi, {"filePath": "root"})
  }


  navUp(name, path, isDir){
    return this.http.post<Array<Files>>(this.cloudApi, {
        "command": "navUp",
        "fileName": name,
        "filePath": path,
        "isDir": isDir,

    })
  }

  navDown(refFile){
    console.log(refFile)
    return this.http.post<Array<Files>>(this.cloudApi, {
        "command": "navDown",
        "fileName": refFile.fileName,
        "filePath": refFile.filePath,
        "isDir": refFile.isDir,

    })
  }





}
