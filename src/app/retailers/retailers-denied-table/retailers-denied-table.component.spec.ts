import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersDeniedTableComponent } from './retailers-denied-table.component';

describe('RetailersDeniedTableComponent', () => {
  let component: RetailersDeniedTableComponent;
  let fixture: ComponentFixture<RetailersDeniedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersDeniedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersDeniedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
