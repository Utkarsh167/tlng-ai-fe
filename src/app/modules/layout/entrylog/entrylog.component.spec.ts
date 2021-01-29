import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLogComponent } from './entrylog.component';

describe('EntryLogComponent', () => {
  let component: EntryLogComponent;
  let fixture: ComponentFixture<EntryLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
