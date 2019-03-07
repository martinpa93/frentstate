import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { InmueblesTableDataSource } from './inmuebles-table-datasource';

@Component({
  selector: 'app-inmuebles-table',
  templateUrl: './inmuebles-table.component.html',
  styleUrls: ['./inmuebles-table.component.css'],
})
export class InmueblesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: InmueblesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new InmueblesTableDataSource(this.paginator, this.sort);
  }
}
