import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Files } from '../files';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CloudService {

cloudApi = "http://127.0.0.1:5000/cloud/obtain";
uploadUrl = 'http://127.0.0.1:5000/cloud/upload';
deleteUrl = "http://127.0.0.1:5000/cloud/delete";
downloadUrl = "http://127.0.0.1:5000/cloud/download"

  constructor(private http: HttpClient, private Router: Router) { }


  obtainBase(){
    return  this.http.post<Array<Files>>(this.cloudApi, {"filePath": "root"})
  }

  currentDirContents(refFile){
    return this.http.post<Array<Files>>(this.cloudApi, {
      "command": "obtainFiles",
      "filePath": refFile.filePath,
      "isDir": refFile.isDir,
      "fileParent": refFile.fileParent,

  })
}

  navUp(fileName, filePath, isDir, fileParent){
    return this.http.post<Array<Files>>(this.cloudApi, {
        "command": "navUp",
        "fileName": fileName,
        "filePath": filePath,
        "isDir": isDir,
        "fileParent": fileParent,

    })
  }

  navDown(refFile){
    console.log(refFile)
    return this.http.post<Array<Files>>(this.cloudApi, {
        "command": "navDown",
        "fileName": refFile.fileName,
        "filePath": refFile.filePath,
        "isDir": refFile.isDir,
        "fileParent": refFile.fileParent,

    })
  }

  uploadFile(formData){
    return this.http.post<any>(this.uploadUrl, formData)
  }

  deleteFile(fileName, filePath, isDir, fileParent){
    return this.http.post<Array<Files>>(this.deleteUrl, {
        "command": "deleteFile",
        "fileName": fileName,
        "filePath": filePath,
        "isDir": isDir,
        "fileParent": fileParent,

    })
  }
  

  downloadFile(fileName, filePath, isDir, fileParent) {
    return this.http.post(this.downloadUrl, {
        "fileName": fileName,
        "filePath": filePath,
        "isDir": isDir,
        "fileParent": fileParent,

    }, {responseType: 'blob'})
  }



// 




}
