import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Property } from 'src/app/core/models/Property';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/core/services/property.service';

@Component({
  selector: 'add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent {
  geoList: any = [
    "Andalucia",
    "Aragon",
    "Asturias",
    "Baleares",
    "Canarias",
    "Cantabria",
    "Castilla-La Mancha",
    "Castilla y León",
    "Cataluña",
    "Comunidad Valenciana",
    "Extremadura",
    "Galicia",
    "Madrid",
    "Murcia",
    "Navarra",
    "País Vasco",
    "La Rioja"
  ];
  arrayTypes:Array<string>=["Vivienda","Local comercial","Garaje"];
  arrayNumber:Array<number>=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  title = "Añadir inmueble";
  form: FormGroup;
  property:any;
  




  constructor(public dialogRef: MatDialogRef<AddPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private pservice:PropertyService,
    private snackBar:MatSnackBar
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
      'ac': [false, /* [Validators.required] */],
      'nroom': ['', [Validators.required]],
      'nbath': ['', [Validators.required]]
    });
 
    if(this.data){
      this.form.patchValue({
        cref:this.data.id.cref,
        address:this.data.id.address,
        population:this.data.id.population,
        province:this.data.id.province,
        cp:this.data.id.cp,
        type:this.data.id.type,
        m2:this.data.id.m2,
        ac:this.data.id.ac,
        nroom:this.data.id.nroom,
        nbath:this.data.id.nbath
      });
      this.form.controls['cref'].disable();


    }
  }

 
  get f() { return this.form.controls; }
  
  onSubmit() {
    if (this.data){
      this.pservice.updateProperty(this.data.id.cref,this.form.value).subscribe(
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
      this.pservice.addProperty(this.form.value).subscribe(
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

