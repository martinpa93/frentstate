import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Property } from 'src/app/core/models/Property';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {
  geoList: any = [
    {
      "population": "Andalucia",
      "province": ["Almeria", "Cadiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"]
    },
    {
      "population": "Aragon",
      "province": ["Huesca", "Teruel", "Zaragoza"]
    },
    {
      "population": "Asturias",
      "province": ["Oviedo"]
    },
    {
      "population": "Baleares",
      "province": ["Palma de Mallorca"]
    },
    {
      "population": "Canarias",
      "province": ["Santa Cruz de Tenerife", "Las Palmas de Gran Canaria"]
    },
    {
      "population": "Cantabria",
      "province": ["Santander"]
    },
    {
      "population": "Castilla-La Mancha",
      "province": ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"]
    },
    {
      "population": "Castilla y León",
      "province": ["Ávila", "Burgos", "León", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"]
    },
    {
      "population": "Cataluña",
      "province": ["Barcelona", "Gerona", "Lérida", "Tarragona"]
    },
    {
      "population": "Comunidad Valenciana",
      "province": ["Alicante", "Castellón de la Plana", "Valencia"]
    },
    {
      "population": "Extremadura",
      "province": ["Badajoz", "Cáceres"]
    },
    {
      "population": "Galicia",
      "province": ["La Coruña", "Lugo", "Orense", "Pontevedra"]
    },
    {
      "population": "Madrid",
      "province": ["Madrid"]
    },
    {
      "population": "Murcia",
      "province": ["Murcia"]
    },
    {
      "population": "Navarra",
      "province": ["Pamplona"]
    },
    {
      "population": "País Vasco",
      "province": ["Bilbao", "San Sebastián", "Vitoria"]
    },
    {
      "population": "La Rioja",
      "province": ["Logroño"]
    }
  ];
  title = "Añadir inmueble";
  levelList = [];
  form: FormGroup;
  prov;
  constructor(public dialogRef: MatDialogRef<AddPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Property,
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

  geoLevelChange(population) {
    let dropDownData = this.geoList.find((data: any) => data.population === population);
    if (dropDownData) {
      this.levelList = dropDownData.population;
      if (this.levelList) {
        this.prov = this.levelList[0];
      }
    } else {
      this.levelList = [];
    }
  }

  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }

}

