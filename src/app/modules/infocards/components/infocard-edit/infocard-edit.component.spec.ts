import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfocardEditComponent} from './infocard-edit.component';

describe('InfocardEditComponent', () => {
  let component: InfocardEditComponent;
  let fixture: ComponentFixture<InfocardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfocardEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
