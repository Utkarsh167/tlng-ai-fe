import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLogDetailComponent } from './entrylog-detail.component';

describe('EntryLogDetailComponent', () => {
  let component: EntryLogDetailComponent;
  let fixture: ComponentFixture<EntryLogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryLogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
