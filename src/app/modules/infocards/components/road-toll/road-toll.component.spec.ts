import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoadTollComponent} from './road-toll.component';

describe('RoadTollComponent', () => {
  let component: RoadTollComponent;
  let fixture: ComponentFixture<RoadTollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoadTollComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadTollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
