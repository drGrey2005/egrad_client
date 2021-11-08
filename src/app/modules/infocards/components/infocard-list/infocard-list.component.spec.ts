import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfocardListComponent} from './infocard-list.component';

describe('InfocardListComponent', () => {
  let component: InfocardListComponent;
  let fixture: ComponentFixture<InfocardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfocardListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
