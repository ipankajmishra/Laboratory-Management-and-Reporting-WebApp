import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecttestPage } from './selecttest.page';

describe('SelecttestPage', () => {
  let component: SelecttestPage;
  let fixture: ComponentFixture<SelecttestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecttestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecttestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
