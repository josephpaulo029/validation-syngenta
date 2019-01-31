import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersPendingTableComponent } from './retailers-pending-table.component';

describe('RetailersPendingTableComponent', () => {
  let component: RetailersPendingTableComponent;
  let fixture: ComponentFixture<RetailersPendingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersPendingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersPendingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
