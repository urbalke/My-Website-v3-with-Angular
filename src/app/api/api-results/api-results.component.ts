import { Component, OnInit } from '@angular/core';
import { WebScrapService } from 'src/app/services/web-scrap.service';
import { Observable } from 'rxjs';
import { AllegroResults } from 'src/app/allegro-results';

@Component({
  selector: 'app-api-results',
  templateUrl: './api-results.component.html',
  styleUrls: ['./api-results.component.css']
})
export class ApiResultsComponent implements OnInit {

  constructor(private allegroService: WebScrapService) { }

  results: Observable<AllegroResults>;


  ngOnInit(): void {
this.results = this.allegroService.apiResponse;
  }

}
