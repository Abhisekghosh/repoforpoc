import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestapiformComponent } from './restapiform.component';

describe('RestapiformComponent', () => {
  let component: RestapiformComponent;
  let fixture: ComponentFixture<RestapiformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestapiformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestapiformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
