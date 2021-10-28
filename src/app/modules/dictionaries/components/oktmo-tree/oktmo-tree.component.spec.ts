import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OktmoTreeComponent } from './oktmo-tree.component';

describe('OktmoTreeComponent', () => {
  let component: OktmoTreeComponent;
  let fixture: ComponentFixture<OktmoTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OktmoTreeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OktmoTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
