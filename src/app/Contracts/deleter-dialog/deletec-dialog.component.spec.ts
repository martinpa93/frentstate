import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCDialogComponent } from './deletec-dialog.component';

describe('DeleteDialog', () => {
  let component: DeleteCDialogComponent;
  let fixture: ComponentFixture<DeleteCDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
