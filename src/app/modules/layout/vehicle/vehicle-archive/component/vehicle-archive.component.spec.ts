import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabArchiveComponent } from './vehicle-archive.component';

describe('CabArchiveComponent', () => {
  let component: CabArchiveComponent;
  let fixture: ComponentFixture<CabArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
