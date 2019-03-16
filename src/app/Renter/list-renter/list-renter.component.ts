import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ListRenterDataSource } from './list-renter-datasource';
import { RenterService } from 'src/app/core/services/renter.service';

@Component({
  selector: 'app-list-Renter',
  templateUrl: './list-Renter.component.html',
  styleUrls: ['./list-Renter.component.css'],
})
export class ListRenterComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ListRenterDataSource; 
  constructor(private pservice:RenterService){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cref','address','population','province','cp','type','m2','ac','nroom','nbath'];

  ngOnInit() {
    this.pservice.getRenters().subscribe(data =>  this.dataSource.data = data);
    this.dataSource = new ListRenterDataSource(this.paginator, this.sort);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
 