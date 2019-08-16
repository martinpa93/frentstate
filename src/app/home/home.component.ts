import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../core/services/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numberHouses = 0;
  numberShops = 0;
  numberGarages = 0;
  total = 0;

    chartOptions = {
    responsive: true
  };

  chartData = [
    { data: []}
  ];

  chartLabels = [];


  constructor(private pservice: PropertyService) {
  }

  ngOnInit() {
    this.pservice.getPropertiesAvaliable().subscribe(data => {
      data.forEach(element => {
        switch (element.type) {
          case 'Vivienda': { ++this.numberHouses; break;}
          case 'Local comercial': {  ++this.numberShops; break; }
          case 'Garaje': { ++this.numberGarages; }
        }
      });
    });
    this.pservice.getProperties().subscribe(data => { this.total = data.length; });
    this.chartData[0].data = [this.numberHouses, this.numberShops, this.numberGarages, this.total];
    this.chartLabels = ['Viviendas ocupadas', 'Locales comerciales ocupados', 'Garajes ocupados', 'Disponibles'];
  }

}
