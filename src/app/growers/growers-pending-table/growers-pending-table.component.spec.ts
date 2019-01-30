import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowersPendingTableComponent } from './growers-pending-table.component';

describe('GrowersPendingTableComponent', () => {
  let component: GrowersPendingTableComponent;
  let fixture: ComponentFixture<GrowersPendingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowersPendingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowersPendingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
