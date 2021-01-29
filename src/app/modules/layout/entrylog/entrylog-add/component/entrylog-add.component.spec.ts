import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLogAddComponent } from './entrylog-add.component';

describe('EntryLogAddComponent', () => {
  let component: EntryLogAddComponent;
  let fixture: ComponentFixture<EntryLogAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryLogAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
