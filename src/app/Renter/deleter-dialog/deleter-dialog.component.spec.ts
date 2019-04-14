import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRDialogComponent } from './deleter-dialog.component';

describe('DeleteDialog', () => {
  let component: DeleteRDialogComponent;
  let fixture: ComponentFixture<DeleteRDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
