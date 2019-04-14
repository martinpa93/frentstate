import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Renter } from 'src/app/core/models/Renter';
import { RenterService } from 'src/app/core/services/renter.service';

@Component({
  selector: 'delete-dialog',
  templateUrl: './deleter-dialog.component.html',
  styleUrls: ['./deleter-dialog.component.scss']
})
export class DeleteRDialogComponent {
  title:string;
  message: string;
  constructor(public dialogRef: MatDialogRef<DeleteRDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rservice:RenterService,
    private snackBar:MatSnackBar
  ) {

  }

  ngOnInit() {
    this.title=`Confirmar borrado inquilino:${this.data.data.dni}`;
    this.message=`El borrado de este registro podría provocar la pérdida
    de información relacionada con este y su borrado permanente.`;

  }


  onConfirm(){
   this.rservice.deleteRenter(this.data.data.dni).subscribe(
      (data:Renter) => {
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

