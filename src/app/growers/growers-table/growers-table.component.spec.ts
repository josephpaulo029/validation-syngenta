import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowersTableComponent } from './growers-table.component';

describe('GrowersTableComponent', () => {
  let component: GrowersTableComponent;
  let fixture: ComponentFixture<GrowersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
