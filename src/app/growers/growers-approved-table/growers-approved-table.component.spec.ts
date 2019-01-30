import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowersApprovedTableComponent } from './growers-approved-table.component';

describe('GrowersApprovedTableComponent', () => {
  let component: GrowersApprovedTableComponent;
  let fixture: ComponentFixture<GrowersApprovedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowersApprovedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowersApprovedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
