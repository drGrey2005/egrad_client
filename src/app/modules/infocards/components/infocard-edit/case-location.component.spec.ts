import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CaseLocationComponent} from './case-location.component';

describe('PaperPlaceComponent', () => {
  let component: CaseLocationComponent;
  let fixture: ComponentFixture<CaseLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseLocationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
