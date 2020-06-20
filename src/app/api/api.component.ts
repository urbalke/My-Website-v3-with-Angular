import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WebScrapService } from '../services/web-scrap.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  constructor(private allegroservice: WebScrapService,private router: Router) { }

requestForm = new FormGroup({
  base_url: new FormControl(''),
  pages: new FormControl('')
})

  ngOnInit(): void {
  }

webScrap(){
this.allegroservice.webScrap(this.requestForm.value).subscribe(data =>{
  this.allegroservice.apiResponse.next(data),
  console.log(data)
})
this.router.navigateByUrl("/api/results")


}

}
