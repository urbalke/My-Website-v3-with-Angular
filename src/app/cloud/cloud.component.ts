import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CloudService } from '../services/cloud.service';
import { Files } from '../files';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  constructor(private CloudService: CloudService) { }

base: Observable<Array<Files>>;

  ngOnInit(): void {
    this.base = this.CloudService.obtainBase();
  }

  navigateUp(name, path, isDir){
    this.CloudService.navUp(name, path, isDir).subscribe();
  }

 navigateDown(){
    window.location.reload();
  }
}
