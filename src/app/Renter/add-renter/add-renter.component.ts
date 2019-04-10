import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Renter } from 'src/app/core/models/Renter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-renter',
  templateUrl: './add-renter.component.html',
  styleUrls: ['./add-renter.component.css']
})
export class AddRenterComponent {
  
  arrayTypes:Array<string>=["Vivienda","Local comercial","Garage"];
  arrayNumber:Array<number>=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  title = "Añadir inquilino";
  levelList = [];
  form: FormGroup;
  prov;
  geoList: any = [
    {
      "population": "Andalucia",
    },
    {
      "population": "Aragon",
    },
    {
      "population": "Asturias",
    },
    {
      "population": "Baleares",
    },
    {
      "population": "Canarias",
    },
    {
      "population": "Cantabria",
    },
    {
      "population": "Castilla-La Mancha",
    },
    {
      "population": "Castilla y León",
    },
    {
      "population": "Cataluña",
    },
    {
      "population": "Comunidad Valenciana",
    },
    {
      "population": "Extremadura",
    },
    {
      "population": "Galicia",
    },
    {
      "population": "Madrid",
    },
    {
      "population": "Murcia",
    },
    {
      "population": "Navarra",
    },
    {
      "population": "País Vasco",
    },
    {
      "population": "La Rioja",
    }
  ];
  

  //Selector dinámico



  constructor(public dialogRef: MatDialogRef<AddRenterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Renter,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      'dni': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      'name': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      'surname': ['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
      'dbirth': ['', [Validators.required]],
      'address': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      'population': ['', [Validators.required]],
      'phone': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      'iban': ['', [Validators.required,Validators.minLength(10), Validators.maxLength(20)]],
      'job': ['', [Validators.required,Validators.minLength(5), Validators.maxLength(20)]],
      'salary': ['', [Validators.required]]
    });
  }
  get f() { return this.form.controls; }

  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }

}

