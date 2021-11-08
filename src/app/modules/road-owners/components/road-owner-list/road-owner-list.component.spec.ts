import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoadOwnerListComponent} from './road-owner-list.component';

describe('RoadOwnerListComponent', () => {
  let component: RoadOwnerListComponent;
  let fixture: ComponentFixture<RoadOwnerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoadOwnerListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
