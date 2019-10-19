import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsamplePage } from './newsample.page';

describe('NewsamplePage', () => {
  let component: NewsamplePage;
  let fixture: ComponentFixture<NewsamplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsamplePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
