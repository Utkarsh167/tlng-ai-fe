import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLogArchiveComponent } from './entrylog-archive.component';

describe('EntryLogArchiveComponent', () => {
  let component: EntryLogArchiveComponent;
  let fixture: ComponentFixture<EntryLogArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryLogArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLogArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
