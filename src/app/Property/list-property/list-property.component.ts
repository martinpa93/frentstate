import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyService } from 'src/app/core/services/property.service';

import { Property } from 'src/app/core/models/Property';

import { AddPropertyComponent } from '../add-property/add-property.component';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css'],
})
export class ListPropertyComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  MyDataSource:any;
  property:Property;
  constructor(private service:PropertyService,
              private dialog:MatDialog,
            private router: Router){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cref','address','population','province','cp','type','m2','ac','nroom','nbath','actions'];

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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPropertyComponent, {
      data:{property:this.property},
      width: '500px',height:'500px',autoFocus:true,
      minHeight:400,minWidth:400,maxHeight:700,maxWidth:700});

    dialogRef.afterClosed().subscribe(result => {
      this.property = result;
    });
  }

 /*  refresh() {
    this.authService.getAuthenticatedUser().subscribe((res) => {
      this.user = res;
      this.Myda = new MatTableDataSource();
      this.changeDetectorRefs.detectChanges();
    });
  } */
}
 