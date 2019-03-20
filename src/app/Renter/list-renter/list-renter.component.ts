import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { RenterService } from 'src/app/core/services/renter.service';

import { Renter } from 'src/app/core/models/renter';

import { AddRenterComponent } from '../add-renter/add-renter.component';

@Component({
  selector: 'app-list-Renter',
  templateUrl: './list-renter.component.html',
  styleUrls: ['./list-renter.component.css'],
})
export class ListRenterComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  MyDataSource:any;
  renterList:Renter[];
  constructor(private service:RenterService,
              private dialog:MatDialog,
            private router: Router){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['dni','name','surname','dbirth','address','population','phone','creditcard','job','salary','actions'];

  ngOnInit(){
    this.getProperties();
  }
  
  
  getProperties() {
    this.service
    .getRenters()
    .subscribe((data: Renter[]) => {
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
    const dialogRef = this.dialog.open(AddRenterComponent, {
      width: '500px',height:'500px',autoFocus:true,minHeight:400,minWidth:400,maxHeight:700,maxWidth:700});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
 