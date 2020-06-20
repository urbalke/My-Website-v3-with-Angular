import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResultsComponent } from './api-results.component';

describe('ApiResultsComponent', () => {
  let component: ApiResultsComponent;
  let fixture: ComponentFixture<ApiResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
