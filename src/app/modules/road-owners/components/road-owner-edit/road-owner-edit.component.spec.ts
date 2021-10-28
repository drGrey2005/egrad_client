import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadOwnerEditComponent } from './road-owner-edit.component';

describe('RoadOwnerEditComponent', () => {
  let component: RoadOwnerEditComponent;
  let fixture: ComponentFixture<RoadOwnerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadOwnerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadOwnerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
