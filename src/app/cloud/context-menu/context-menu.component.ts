import { Component, OnInit, Input } from '@angular/core';
import { Files } from 'src/app/files';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  constructor(private CloudService: CloudService) { }

  ngOnInit() {
    
  }
    @Input() x=0;
  @Input() y=0;
  @Input() file: Files;
  @Input() currentFiles;
  @Input() workingDir;


  
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


  refreshContents(){
    this.CloudService.currentDirContents(this.workingDir.value).subscribe(data =>
      this.currentFiles.next(data))
  }

  deleteFile(fileName, filePath, isDir, fileParent) {
    this.CloudService.deleteFile(fileName, filePath, isDir, fileParent).subscribe();
      this.refreshContents();
  }

  downloadFile() {
    this.CloudService.downloadFile(this.file.fileName, this.file.filePath, this.file.isDir, this.file.fileParent).subscribe((data:any) => { 
      var a = document.createElement("a");
          a.href = URL.createObjectURL(data);
          a.download = this.file.fileName;
          a.click();
    
    });
}
}