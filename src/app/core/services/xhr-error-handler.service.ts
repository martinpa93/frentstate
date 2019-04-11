import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class XhrErrorHandlerService implements ErrorHandler{

  constructor(
    private injector: Injector,
    public snackBar: MatSnackBar,
    private readonly zone: NgZone
  ) {}

  handleError(error: Error | HttpErrorResponse){
    if (error instanceof HttpErrorResponse) {
    
      this.zone.run(() => {
        /* console.log(error); */
        const snackBar = this.snackBar.open(error.error.error || error.error , error.status+' ERR', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 4000,
        });
        snackBar.onAction().subscribe(() => {
          snackBar.dismiss();
        })
      });
    }
    else{
      console.error(error);
    }
  }
}