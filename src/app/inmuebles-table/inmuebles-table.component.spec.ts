import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { InmueblesTableComponent } from './inmuebles-table.component';

describe('InmueblesTableComponent', () => {
  let component: InmueblesTableComponent;
  let fixture: ComponentFixture<InmueblesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmueblesTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmueblesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
