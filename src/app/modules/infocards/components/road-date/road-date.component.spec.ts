import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadDateComponent } from './road-date.component';

describe('RoadDateComponent', () => {
  let component: RoadDateComponent;
  let fixture: ComponentFixture<RoadDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
