import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatCheckbox } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contract } from 'src/app/core/models/contract';
import * as moment from 'moment'; 


import { PropertyService } from 'src/app/core/services/property.service';
import { RenterService } from 'src/app/core/services/renter.service';
import { ContractService } from 'src/app/core/services/contract.service';

@Component({
  selector: 'add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent implements OnInit {
  title = 'Añadir contrato';
  form: FormGroup;
  properties = [];
  renters = [];


  constructor(public dialogRef: MatDialogRef<AddContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cservice: ContractService,
    private pservice: PropertyService,
    private rservice: RenterService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.getProperties();
    this.getRenters();
    this.form = this.fb.group({
      'property_id': ['', [Validators.required]],
      'renter_id': ['', [Validators.required]],
      'dstart': ['', [Validators.required]],
      'dend': ['', [Validators.required]]
    });

    if (this.data) {
      this.title = 'Editar contrato';
      this.form.patchValue({
        property_id: this.data.data.property_id,
        renter_id: this.data.data.renter_id,
        dstart: new Date(this.data.data.dstart),
        dend: new Date(this.data.data.dend),
      });

      this.form.controls['property_id'].disable();
      this.form.controls['renter_id'].disable();
    }

  }


  get f() { return this.form.controls; }

  getProperties(){
    this.pservice
    .getProperties()
    .subscribe((data) => {
      const loop = [];
      data.forEach(function(element) {
        loop.push(element);
      });
      this.properties = loop;
    });
  }

  getRenters(){
    this.rservice
    .getRenters()
    .subscribe((data) => {
      const loop = [];
      data.forEach(function(element) {
        loop.push(element);
      });
      this.renters = loop;
    });
  }

  changeStartDate(){ this.form.patchValue({dend:''}); }

  myFilter = (d: Date): boolean => {
    const day = d.getTime();
    if (this.form.value.dstart && this.form.value.dstart.getTime() < day) return true;
    return false;
  }

  onSubmit() {
    const auxDstart = moment.utc(this.form.value.dstart).toDate();
    const auxDend = moment.utc(this.form.value.dend).toDate();
    this.form.value.dstart = moment(auxDstart).local().format('YYYY-MM-DD HH:mm:ss');
    this.form.value.dend = moment(auxDend).local().format('YYYY-MM-DD HH:mm:ss');
    if (this.data){
      this.form.controls['property_id'].enable();
      this.form.controls['renter_id'].enable();
      this.cservice.updateContract(this.data.data.id, this.form.value).subscribe(
        () => {
          this.snackBar.open('Guardado', 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'snackBar'
        });
        this.dialogRef.close(this.form.value);
      });
    } else {
      this.cservice.addContract(this.form.value).subscribe(data => {
        data.address = this.properties.find((item) => item.cref === this.form.value.property_id).address;
        data.name = this.renters.find((item) => item.dni === this.form.value.renter_id).name;
        data.surname = this.renters.find((item) => item.dni === this.form.value.renter_id).surname;

        this.snackBar.open('Guardado', 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'snackBar'
        });
        this.dialogRef.close(data); 
      });
    }
  }

}

