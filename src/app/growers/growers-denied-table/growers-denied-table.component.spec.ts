import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowersDeniedTableComponent } from './growers-denied-table.component';

describe('GrowersDeniedTableComponent', () => {
  let component: GrowersDeniedTableComponent;
  let fixture: ComponentFixture<GrowersDeniedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowersDeniedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowersDeniedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
