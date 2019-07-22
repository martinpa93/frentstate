import { Component, Inject, ElementRef, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileService } from 'src/app/core/services/file.service';



@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss'],
})
export class ListFilesComponent {

  form: FormGroup;
  file={};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private fservice: FileService,
  private snackBar:MatSnackBar){}

  ngOnInit() {
    this.form = this.fb.group({
      'file': ['', [Validators.required]],
    });
  } 

  onFileChange(event) {
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('file', this.form.get('file').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.fservice.uploadFile(formModel).subscribe(
      data =>{console.log(data);}

    );
    this.snackBar.open('Guardado', 'OK', {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 4000,
      panelClass: "snackBar"
    });
  }
}
 