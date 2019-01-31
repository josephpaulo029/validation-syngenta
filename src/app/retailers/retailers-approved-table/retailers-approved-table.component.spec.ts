import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersApprovedTableComponent } from './retailers-approved-table.component';

describe('RetailersApprovedTableComponent', () => {
  let component: RetailersApprovedTableComponent;
  let fixture: ComponentFixture<RetailersApprovedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersApprovedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersApprovedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
