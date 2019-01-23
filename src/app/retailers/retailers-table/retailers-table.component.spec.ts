import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersTableComponent } from './retailers-table.component';

describe('RetailersTableComponent', () => {
  let component: RetailersTableComponent;
  let fixture: ComponentFixture<RetailersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
