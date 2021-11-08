import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfocardPartComponent} from './infocard-part.component';

describe('InfocardPartComponent', () => {
  let component: InfocardPartComponent;
  let fixture: ComponentFixture<InfocardPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfocardPartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocardPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
