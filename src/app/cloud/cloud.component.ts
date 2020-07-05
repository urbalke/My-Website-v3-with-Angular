import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { CloudService } from '../services/cloud.service';
import { Files } from '../files';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css'],
})
export class CloudComponent implements OnInit {
  constructor(
    private CloudService: CloudService,
    private formBuilder: FormBuilder,
    
  ) {}

  uploadForm: FormGroup;
  fileUrl;
  blob;

  currentFiles = new BehaviorSubject<Array<Files>>(null);
  workingDir = new BehaviorSubject<Files>(null);


  

  ngOnInit(): void {
    this.CloudService.obtainBase().subscribe((data) => {
      this.currentFiles.next(data);
    });
    this.workingDir.next({
      fileName: "userfiles",
      filePath: "/home/patryk/anaconda3/envs/Angular-Flask/MyWebsite/userfiles",
      fileParent: "/home/patryk/anaconda3/envs/Angular-Flask/MyWebsite/userfiles",
      isDir: true,
    })
    this.uploadForm = this.formBuilder.group({
      profile: [''],
    });
  }

  navigateUp(fileName, filePath, isDir, fileParent) {
    this.CloudService.navUp(fileName, filePath, isDir, fileParent).subscribe(
      (data) => {
        this.currentFiles.next(data);
        this.workingDir.next({fileName, filePath, isDir, fileParent});
      }
    );
  }

  navigateDown() {
    this.CloudService.navDown(this.workingDir.value).subscribe((data) => {
      this.currentFiles.next(data);
      this.workingDir.next(data[0]);
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  uploadSelectedFile() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('fileParent', this.workingDir.value.fileParent);
    formData.append('filePath', this.workingDir.value.filePath);
    formData.append('isDir', String(this.workingDir.value.isDir));


    this.CloudService.uploadFile(formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.refreshContents()
  }

  refreshContents(){
    this.CloudService.currentDirContents(this.workingDir.value).subscribe(data =>
      this.currentFiles.next(data))
  }

  deleteFile(fileName, filePath, isDir, fileParent) {
    this.CloudService.deleteFile(fileName, filePath, isDir, fileParent).subscribe();
      this.refreshContents();
  }

  downloadFile(fileName, filePath, isDir, fileParent) {
    this.CloudService.downloadFile(fileName, filePath, isDir, fileParent).subscribe((data:any) => { 
      var a = document.createElement("a");
          a.href = URL.createObjectURL(data);
          a.download = fileName;
          a.click();
    
    });
  
}
}