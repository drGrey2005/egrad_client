import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArchiveReasonComponent} from './archive-reason.component';

describe('ArchiveReasonComponent', () => {
  let component: ArchiveReasonComponent;
  let fixture: ComponentFixture<ArchiveReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveReasonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
