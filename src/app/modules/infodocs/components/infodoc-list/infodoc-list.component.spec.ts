import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfodocListComponent } from './infodoc-list.component';

describe('InfodocListComponent', () => {
  let component: InfodocListComponent;
  let fixture: ComponentFixture<InfodocListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfodocListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfodocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
