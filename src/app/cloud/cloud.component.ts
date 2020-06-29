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
  base: Observable<Array<Files>>;

  ngOnInit(): void {
    this.CloudService.obtainBase().subscribe((data) => {
      this.currentFiles.next(data);
    });
  }

  navigateUp(name, path, isDir) {
    this.CloudService.navUp(name, path, isDir).subscribe((data) => {
      this.currentFiles.next(data);
    });
  }

  navigateDown() {
    this.CloudService.navDown(this.currentFiles.value[0]).subscribe((data) => {
      this.currentFiles.next(data);
    });
  }
}
