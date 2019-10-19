import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilldetailsPage } from './filldetails.page';

describe('FilldetailsPage', () => {
  let component: FilldetailsPage;
  let fixture: ComponentFixture<FilldetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilldetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilldetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
