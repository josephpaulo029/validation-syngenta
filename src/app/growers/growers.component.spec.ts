import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowersComponent } from './growers.component';

describe('GrowersComponent', () => {
  let component: GrowersComponent;
  let fixture: ComponentFixture<GrowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
