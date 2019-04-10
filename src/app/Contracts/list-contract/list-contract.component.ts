import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from 'src/app/core/services/contract.service';

import { Contract } from 'src/app/core/models/contract';

import { AddContractComponent } from '../add-contract/add-contract.component';

@Component({
  selector: 'app-list-Contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.css'],
})
export class ListContractComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  MyDataSource:any;

  constructor(private service:ContractService,
              private dialog:MatDialog,
            private router: Router){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['property_id','renter_id','dstart','dend','iva','watertax','gastax','electricitytax','communitytax','actions'];

  ngOnInit(){
    this.getContracts();
  }
  
  
  getContracts() {
    this.service
    .getContracts()
    .subscribe((data: Contract[]) => {
    this.MyDataSource = new MatTableDataSource();
    this.MyDataSource.data = data;
    this.MyDataSource.paginator = this.paginator;
    this.MyDataSource.sort = this.sort;
    });
  }

  doFilter = (value: string) => {
    this.MyDataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddContractComponent, {
      width: '480',height:'500px',autoFocus:true,minHeight:400,minWidth:400,maxHeight:700,maxWidth:480});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
 