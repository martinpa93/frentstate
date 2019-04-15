import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contract } from 'src/app/core/models/contract';

import { PropertyService } from 'src/app/core/services/property.service';
import { RenterService } from 'src/app/core/services/renter.service';
import { ContractService } from 'src/app/core/services/contract.service';

@Component({
  selector: 'add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent {
  title = "Añadir contrato";
  form: FormGroup;
  properties=[];
  renters=[];
  

  constructor(public dialogRef: MatDialogRef<AddContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cservice:ContractService,
    private pservice:PropertyService,
    private rservice:RenterService,
    private snackBar:MatSnackBar
  ) {

  }

  ngOnInit() {
    
    this.form = this.fb.group({
      'property_id': ['', [Validators.required]],
      'renter_id': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      'dstart': ['', [Validators.required]],
      'dend': ['', [Validators.required]],
      'iva': ['', []],
      'watertax': ['', []],
      'gastax': ['', []],
      'electricitytax': ['', []],
      'communitytax': ['', []]
    });

   
    this.getProperties();
    this.getRenters();
    
  }

  showInput(event){
  
   
    if(event.checked){
      /* this.authForm.addControl('name', new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(10)])); */
    }
    else{}
  }
  
  getProperties(){
    this.pservice
    .getProperties()
    .subscribe((data) => {
      let loop=[];
      data.forEach(function(element) {
        loop.push(element.address);
      });
      this.properties=loop;
    });
  }

  getRenters(){
    this.rservice
    .getRenters()
    .subscribe((data) => {
      let loop=[];
      data.forEach(function(element) {
        loop.push(element.dni);
      });
      this.renters=loop;
    });
  }

  get f() { return this.form.controls; }
  
  onSubmit() {
    if (this.data){
      this.cservice.updateContract(this.data.data.id,this.form.value).subscribe(
        data=>{
          this.snackBar.open('Guardado', 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: "snackBar"
        })
        this.dialogRef.close(this.form.value);
      });
    }
    else{ 
      this.cservice.addContract(this.form.value).subscribe(
      data=>{
        this.snackBar.open('Guardado', 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: "snackBar"
        })
      this.dialogRef.close(this.form.value);}
      );
    }
  }

}

