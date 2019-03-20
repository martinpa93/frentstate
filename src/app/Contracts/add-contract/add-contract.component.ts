import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contract } from 'src/app/core/models/contract';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent {
 
  arrayTypes:Array<string>=["Vivienda","Local comercial","Garage"];
  arrayNumber:Array<number>=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  title = "Añadir contrato";
  levelList = [];
  form: FormGroup;
  prov;
  

  //Selector dinámico
  private _selected: any;
  set selected (src : any) { 
    this._selected = src; 
    this.selected2 = this._selected.value[0];
  };
  get selected(): any { return this._selected; };
  private selected2: string = "";


  constructor(public dialogRef: MatDialogRef<AddContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contract,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      'cref': ['', [Validators.required, Validators.minLength(20), Validators.maxLength(20)]],
      'address': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      'population': ['', [Validators.required]],
      'province': ['', [Validators.required]],
      'cp': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      'type': ['', [Validators.required]],
      'm2': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      'ac': ['', [Validators.required]],
      'nroom': ['', [Validators.required]],
      'nbath': ['', [Validators.required]]
    });
  }
  
  get f() { return this.form.controls; }
  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }

}

