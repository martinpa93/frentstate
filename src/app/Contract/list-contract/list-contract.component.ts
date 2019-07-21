import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from 'src/app/core/services/contract.service';

import { Contract } from 'src/app/core/models/contract';

import { AddContractComponent } from '../add-contract/add-contract.component';
import { DeleteCDialogComponent } from '../deletec-dialog/deletec-dialog.component';

@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.scss'],
})
export class ListContractComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  MyDataSource:any;
  showDiv:boolean=false;

  constructor(private service:ContractService,
              private dialog:MatDialog,
            private router: Router){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['property_id','renter_id','dstart','dend','actions'];

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
    const dialogRef = this.dialog.open(AddContractComponent, {autoFocus:true, width:"600px"});

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.MyDataSource.data.splice(0,0,data);
          this.MyDataSource.filter ='';
        }
    });
  }

  openEditor():void{

  }

  onEdit(id:any): void {
    const dialogRef = this.dialog.open(AddContractComponent, {
      data:{data:id, mode:'edit'},
      width: '480px',autoFocus:true
    });

    dialogRef.afterClosed().subscribe(
      
      data =>{
        if(data){
          let objIndex =  this.MyDataSource.data.findIndex(obj => obj.id == id.id);
          //Update object's name property.
          this.MyDataSource.data[objIndex].property_id = data.property_id;
          this.MyDataSource.data[objIndex].renter_id = data.renter_id;
          this.MyDataSource.data[objIndex].dstart =data.dstart;
          this.MyDataSource.data[objIndex].dend = data.dend;
        }
      }
    );
  }

  onDelete(element:any): void {
    const dialogRef = this.dialog.open(DeleteCDialogComponent, {
      data:{data:element},
      width: '480px',autoFocus:true,
    });
    
      dialogRef.afterClosed().subscribe(
        data =>{
          if(data){
            let objIndex =  this.MyDataSource.data.findIndex(obj => obj.id == element.id);
            this.MyDataSource.data.splice(objIndex, 1);
            this.MyDataSource.filter ='';
          }
        }
      );
  }
}
 