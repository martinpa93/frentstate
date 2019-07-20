import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePDialogComponent } from './deletep-dialog.component';

describe('DeleteDialog', () => {
  let component: DeletePDialogComponent;
  let fixture: ComponentFixture<DeletePDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
