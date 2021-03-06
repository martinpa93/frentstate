import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyService } from 'src/app/core/services/property.service';

import { Property } from 'src/app/core/models/Property';

import { AddPropertyComponent } from '../add-property/add-property.component';
import { DeletePDialogComponent } from '../deletep-dialog/deletep-dialog.component';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss'],
})
export class ListPropertyComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  MyDataSource: any;
  property: Property;
  loading = true;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cref','address','population','province','cp','type','m2','nroom','nbath','actions'];

  constructor(private service: PropertyService,
              private dialog: MatDialog,
              ){}


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
      this.loading = false;
    });
  }

  doFilter = (value: string) => {
    this.MyDataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPropertyComponent, {
      width: '500px',autoFocus:true,
     });

    dialogRef.afterClosed().subscribe(
      data =>{
        if(data){
          this.MyDataSource.data.splice(0,0,data);
          this.MyDataSource.filter ='';
        }
      }
    );
  }

  onEdit(id:any): void {
    const dialogRef = this.dialog.open(AddPropertyComponent, {
      data:{id:id, mode:'edit'},
      width: '500px',autoFocus:true});

    dialogRef.afterClosed().subscribe(
      
      data =>{
        if(data){
          let objIndex =  this.MyDataSource.data.findIndex(obj => obj.cref == id.cref);

          //Update object's name property.
          this.MyDataSource.data[objIndex].address = data.address;
          this.MyDataSource.data[objIndex].population = data.population;
          this.MyDataSource.data[objIndex].province =data.province;
          this.MyDataSource.data[objIndex].cp = data.cp;
          this.MyDataSource.data[objIndex].type = data.type;
          this.MyDataSource.data[objIndex].m2 = data.m2;
          this.MyDataSource.data[objIndex].nroom =data.nroom ;
          this.MyDataSource.data[objIndex].nbath = data.nbath;

        }
      }
    );
  }

  onDelete(element:any): void {
    const dialogRef = this.dialog.open(DeletePDialogComponent, {
      data:{data:element},
      width: '400px'});
    
      dialogRef.afterClosed().subscribe(
        data =>{
          if(data){
            const objIndex =  this.MyDataSource.data.findIndex( obj => obj.cref === element.cref);
            this.MyDataSource.data.splice(objIndex, 1);
          }
        }
      );
  }

}
 