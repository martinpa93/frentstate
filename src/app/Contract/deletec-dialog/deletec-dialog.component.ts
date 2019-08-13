import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ContractService } from 'src/app/core/services/contract.service';
import { Contract } from 'src/app/core/models/contract';

@Component({
  selector: 'delete-dialog',
  templateUrl: './deletec-dialog.component.html',
  styleUrls: ['./deletec-dialog.component.scss']
})
export class DeleteCDialogComponent {
  title:string;
  property: string;
  renter: string;
  message:string;
  constructor(public dialogRef: MatDialogRef<DeleteCDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cservice:ContractService,
    private snackBar:MatSnackBar
  ) {

  }

  ngOnInit() {
    this.title=`Confirmar borrado :`;
    this.property=`Inmueble ${this.data.data.address}`;
    this.renter=`Inquilino ${this.data.data.name}  ${this.data.data.surname}`;
    this.message=`El borrado de este registro podría provocar la pérdida
    de información relacionada con este y su borrado permanente.`;

  }


  onConfirm(){
   this.cservice.deleteContract(this.data.data.id).subscribe(
      (data:Contract) => {
        this.snackBar.open('Eliminado', 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: "snackBar"
        });
        this.dialogRef.close(true);
      });
  }
}

