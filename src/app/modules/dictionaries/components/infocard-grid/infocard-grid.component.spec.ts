import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocardGridComponent } from './infocard-grid.component';

describe('InfocardGridComponent', () => {
  let component: InfocardGridComponent;
  let fixture: ComponentFixture<InfocardGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfocardGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
