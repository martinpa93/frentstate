import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Property } from 'src/app/core/models/Property';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/core/services/property.service';

@Component({
  selector: 'add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
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
  title = "Añadir inmueble";
  arrayTypes:Array<string>=["Vivienda","Local comercial","Garaje"];
  arrayNumber:Array<number>=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  form: FormGroup;
  property:any;
  crefpattern:string="[a-zA-z0-9]{20}";
  addresspattern:string="(Via|Plaza|Plz|C\/|Calle|Avenida|){1}\\s{1}(\\w){1,30}\\s{1}(1?\\d?\\d?\\d{1}){1}\.{1}\\s{1}([0-5]?\\d?\\d{1}){1}\ª{1}\-{1}([0-1]?\\d?\\d{1}){1}\º{1}";
  cppattern:string="((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}";
  m2pattern:string="(\\d?\\d?\\d?\\d{1}){1}";




  constructor(public dialogRef: MatDialogRef<AddPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private pservice:PropertyService,
    private snackBar:MatSnackBar
  ) {

  }

  ngOnInit() {


    this.form = this.fb.group({
      'cref': ['', [Validators.required, Validators.minLength(20), Validators.maxLength(20),Validators.pattern(this.crefpattern)]],
      'address': ['', [Validators.required, Validators.pattern(this.addresspattern)]],
      'population': ['', [Validators.required]],
      'province': ['', [Validators.required]],
      'cp': ['', [Validators.required, Validators.pattern(this.cppattern)]],
      'type': ['', [Validators.required]],
      'm2': ['', [Validators.required, Validators.pattern(this.m2pattern)]],
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

