import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { RenterService } from 'src/app/core/services/renter.service';

import { Renter } from 'src/app/core/models/renter';

import { AddRenterComponent } from '../add-renter/add-renter.component';
import { DeleteRDialogComponent } from '../deleter-dialog/deleter-dialog.component';

@Component({
  selector: 'app-list-Renter',
  templateUrl: './list-renter.component.html',
  styleUrls: ['./list-renter.component.scss'],
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
  displayedColumns = ['dni','name','surname','dbirth','address','population','phone','iban','job','actions'];


  ngOnInit(){
    this.getRenters();
  }
  
  
  getRenters() {
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
      width: '500px',autoFocus:true});

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.MyDataSource.data.splice(0,0,data);
          this.MyDataSource.filter ='';
        }
    });
  }

  onEdit(id:any): void {
    const dialogRef = this.dialog.open(AddRenterComponent, {
      data:{data:id, mode:'edit'},
      width: '500px',autoFocus:true});

    dialogRef.afterClosed().subscribe(
      
      data =>{
        if(data){
          let objIndex =  this.MyDataSource.data.findIndex(obj => obj.dni == id.dni);

          //Update object's name property.
          this.MyDataSource.data[objIndex].name = data.name;
          this.MyDataSource.data[objIndex].surname = data.surname;
          this.MyDataSource.data[objIndex].dbirth =data.dbirth;
          this.MyDataSource.data[objIndex].address = data.address;
          this.MyDataSource.data[objIndex].population = data.population;
          this.MyDataSource.data[objIndex].phone = data.phone;
          this.MyDataSource.data[objIndex].iban = data.iban;
          this.MyDataSource.data[objIndex].job =data.job ;
        }
      }
    );
  }

  onDelete(element:any): void {
    const dialogRef = this.dialog.open(DeleteRDialogComponent, {
      data:{data:element},
      width: '400px',height:'250px',autoFocus:true,
      minHeight:"250px",minWidth:"400px",maxHeight:"280px",maxWidth:"500px"});
    
      dialogRef.afterClosed().subscribe(
        data =>{
          if(data){
            let objIndex =  this.MyDataSource.data.findIndex(obj => obj.dni == element.dni);
            this.MyDataSource.data.splice(objIndex, 1);
            this.MyDataSource.filter ='';
          }
        }
      );
  }
}
 