import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Renter } from 'src/app/core/models/Renter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RenterService } from 'src/app/core/services/renter.service';

@Component({
  selector: 'add-renter',
  templateUrl: './add-renter.component.html',
  styleUrls: ['./add-renter.component.scss']
})
export class AddRenterComponent {
  
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
  arrayNumber:Array<number>=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  title = "Añadir inquilino";
  form: FormGroup;
  minDate = new Date(1930, 0, 1);
  maxDate = new Date(2001, 0, 1);
  dnipattern:string="\\d{8}[A-Z]{1}";
  namepattern:string="([a-zA-Z]{3,8}\\s?){1,3}";
  addresspattern:string=".{10,50}";
  phonepattern:string="(\\+34|0034|34)?[6789]\\d{8}";
  ibanpattern:string="ES\\d{22}";
  salarypattern:string="\\d?\\d\\d\\d((\.|\,)\\d\\d)?";

  constructor(public dialogRef: MatDialogRef<AddRenterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private rservice:RenterService,
    private snackBar:MatSnackBar
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      'dni': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9),Validators.pattern(this.dnipattern)]],
      'name': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern(this.namepattern)]],
      'surname': ['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
      'dbirth': ['', [Validators.required]],
      'address': ['', [Validators.required, /* Validators.pattern(this.addresspattern) */ /* Validators.minLength(5), Validators.maxLength(25) */]],
      'population': ['', [Validators.required]],
      'phone': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(this.phonepattern)]],
      'iban': ['', [Validators.required, Validators.pattern(this.ibanpattern)]],
      'job': ['', [Validators.required,Validators.minLength(5), Validators.maxLength(20)]],
      'salary': ['', [Validators.required, Validators.pattern(this.salarypattern)]]
    });

    if(this.data){
      this.title="Editar inquilino";
      this.form.patchValue({
        dni:this.data.data.dni,
        name:this.data.data.name,
        surname:this.data.data.surname,
        dbirth:this.data.data.dbirth,
        address:this.data.data.address,
        population:this.data.data.population,
        phone:this.data.data.phone,
        iban:this.data.data.iban,
        job:this.data.data.job,
        salary:this.data.data.salary
      });
      this.form.controls['dni'].disable();
    }
  }
  get f() { return this.form.controls; }

  onSubmit() {
    if (this.data){
      this.rservice.updateRenter(this.data.data.dni,this.form.value).subscribe(
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
      this.rservice.addRenter(this.form.value).subscribe(
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

