import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyService } from 'src/app/core/services/property.service';
import { Property } from 'src/app/core/models/Property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css'],
})
export class ListPropertyComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  MyDataSource:any;
  propertyList:Property[];
  constructor(private service:PropertyService,private router: Router){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cref','address','population','province','cp','type','m2','ac','nroom','nbath','action1','action2','action3'];

  ngOnInit(){
    this.getProperties();
  }
  
  
  getProperties() {
    this.service
    .getProperties()
    .subscribe((data: Property[]) => {
    this.MyDataSource = new MatTableDataSource();
    this.MyDataSource.data = data;
    this.MyDataSource.paginator = this.paginator;
    this.MyDataSource.sort = this.sort;
    });
  }

  doFilter = (value: string) => {
    this.MyDataSource.filter = value.trim().toLocaleLowerCase();
  }
}
 