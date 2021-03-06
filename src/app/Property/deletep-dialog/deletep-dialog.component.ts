import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { PropertyService } from 'src/app/core/services/property.service';
import { Property } from 'src/app/core/models/Property';

@Component({
  selector: 'delete-dialog',
  templateUrl: './deletep-dialog.component.html',
  styleUrls: ['./deletep-dialog.component.scss']
})
export class DeletePDialogComponent {
  title:string;
  property:string;
  message: string;
  constructor(public dialogRef: MatDialogRef<DeletePDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pservice:PropertyService,
    private snackBar:MatSnackBar
  ) {

  }

  ngOnInit() {
    this.title=`Confirmar borrado Propiedad:`;
    this.property= this.data.data.address;
    this.message=`El borrado de este registro podría provocar la pérdida
    de información relacionada con este y su borrado permanente.`;

  }


  onConfirm(){
   this.pservice.deleteProperty(this.data.data.cref).subscribe(
      (data:Property) => {
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

