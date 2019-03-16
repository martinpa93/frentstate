import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { ListRenterComponent } from './list-renter.component';

describe('ListRenterComponent', () => {
  let component: ListRenterComponent;
  let fixture: ComponentFixture<ListRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRenterComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
