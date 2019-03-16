import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ListContractDataSource } from './list-contract-datasource';
import { ContractService } from 'src/app/core/services/Contract.service';

@Component({
  selector: 'app-list-Contract',
  templateUrl: './list-Contract.component.html',
  styleUrls: ['./list-Contract.component.css'],
})
export class ListContractComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ListContractDataSource; 
  constructor(private pservice:ContractService){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cref','address','population','province','cp','type','m2','ac','nroom','nbath'];

  ngOnInit() {
    this.pservice.getProperties().subscribe(data =>  this.dataSource.data = data);
    this.dataSource = new ListContractDataSource(this.paginator, this.sort);
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
 