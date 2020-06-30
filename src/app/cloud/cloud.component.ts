import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CloudService } from '../services/cloud.service';
import { Files } from '../files';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css'],
})
export class CloudComponent implements OnInit {
  constructor(private CloudService: CloudService) {}

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
}
// this.currentFiles.value[0]