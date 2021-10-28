import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadSectionComponent } from './road-section.component';

describe('RoadCategorySectionComponent', () => {
  let component: RoadSectionComponent;
  let fixture: ComponentFixture<RoadSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoadSectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
