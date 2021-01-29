import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDateFilterComponent } from './schedule-date-filter.component';

describe('ScheduleDateFilterComponent', () => {
  let component: ScheduleDateFilterComponent;
  let fixture: ComponentFixture<ScheduleDateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleDateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
