import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadPlaceComponent } from './road-place.component';

describe('RoadPlaceComponent', () => {
  let component: RoadPlaceComponent;
  let fixture: ComponentFixture<RoadPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
