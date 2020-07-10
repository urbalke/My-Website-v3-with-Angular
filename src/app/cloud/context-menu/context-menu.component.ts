import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Files } from 'src/app/files';
import { CloudService } from 'src/app/services/cloud.service';
import { CloudComponent } from '../cloud.component';


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
  @Output() workingDirChange = new EventEmitter<Files>();
  @Output() currentFilesChange = new EventEmitter<Array<Files>>();
  @Output() refresh = new EventEmitter<any>();

  
  navigateUp() {
    this.CloudService.navUp(this.file.fileName, this.file.filePath, this.file.isDir, this.file.fileParent).subscribe(
      (data) => {
        this.currentFiles.next(data);
      }
    );
    this.workingDirChange.emit(this.file);
  }

  navigateDown() {
    this.CloudService.navDown(this.workingDir.value).subscribe((data) => {
      this.currentFiles.next(data);
      this.workingDir.next(data[0]);
    });
  }



  deleteFile() {
    this.workingDirChange.emit(this.file);
    this.CloudService.deleteFile(this.file.fileName, this.file.filePath, this.file.isDir, this.file.fileParent).subscribe();
    this.refresh.emit(null);
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