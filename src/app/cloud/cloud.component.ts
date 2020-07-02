import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CloudService } from '../services/cloud.service';
import { Files } from '../files';
import { catchError, map } from 'rxjs/operators'; 
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css'],
})
export class CloudComponent implements OnInit {
  constructor(private CloudService: CloudService) {}

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files = [];

  currentFiles = new BehaviorSubject<Array<Files>>(null);
  lastPath = new BehaviorSubject<Files>(null);

  ngOnInit(): void {
    this.CloudService.obtainBase().subscribe((data) => {
      this.currentFiles.next(data);
    });
  }

  navigateUp(fileName, filePath, isDir, fileParent) {
    this.lastPath.next({fileName, filePath, isDir, fileParent})
    this.CloudService.navUp(fileName, filePath, isDir, fileParent).subscribe((data) => {
      this.currentFiles.next(data);
    });
  }

  navigateDown() {
    this.CloudService.navDown(this.lastPath.value).subscribe((data) => {
      this.currentFiles.next(data);
      this.lastPath.next(data[0])
    });
  }

  uploadFile(file){
    const formData = new FormData();
    formData.append('file', file);
    file.inProgress = true;
    this.CloudService.upload(formData).subscribe((event:any)=>{
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }


  fileToUpload: File = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

uploadFileToActivity() {
  this.CloudService.postFile(this.fileToUpload).subscribe(data => {
    // do something, if upload success
    }, error => {
      console.log(error);
    });
}




}
// this.currentFiles.value[0]