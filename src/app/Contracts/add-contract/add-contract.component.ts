import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contract } from 'src/app/core/models/contract';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PropertyService } from 'src/app/core/services/property.service';
import { RenterService } from 'src/app/core/services/renter.service';
import { Property } from 'src/app/core/models/Property';
import { Renter } from 'src/app/core/models/Renter';

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
  properties:Property[];
  renters:Renter[];
  

  constructor(public dialogRef: MatDialogRef<AddContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contract,
    private fb: FormBuilder,
    private pservice:PropertyService,
    private rservice:RenterService
  ) {

  }

  ngOnInit() {
    
    this.form = this.fb.group({
      'property_id': ['', [Validators.required, Validators.minLength(20), Validators.maxLength(20)]],
      'renter_id': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      'dstart': ['', [Validators.required]],
      'dend': ['', [Validators.required]],
      'iva': ['', [Validators.required]],
      'watertax': ['', []],
      'gastax': ['', []],
      'electricitytax': ['', []],
      'communitytax': ['', []]
    });

    this.getProperties();

  }
  
  getProperties(){
    this.pservice
    .getProperties()
    .subscribe((data) => {
        this.properties=data;
    });
  }

  getRenters(){
    this.rservice
    .getRenters()
    .subscribe((data) => {
        this.renters=data;
    });

  }

  get f() { return this.form.controls; }
  
  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }

}

