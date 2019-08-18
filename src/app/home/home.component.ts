import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from '../core/services/property.service';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  numberHouses = 0;
  numberShops = 0;
  numberGarages = 0;
  total = 0;
  totalBusy = 0;
  loading = true;

  chartOptions = {
    responsive: true
  };

  chartData = [
    {
       data: [],
       backgroundColor: []
    }
  ];

  chartLabels = [];

  constructor(private pservice: PropertyService) {
  }

  ngOnInit() {
    this.pservice.getPropertiesAvaliable().subscribe(data => {
      data.forEach(element => {
        if (element.status === true) {
          switch (element.type) {
            case 'Vivienda': { ++this.numberHouses; break;}
            case 'Local comercial': {  ++this.numberShops; break; }
            case 'Garaje': { ++this.numberGarages; }
          }
        }
      });
      this.pservice.getProperties().subscribe(data => {
        this.total = data.length;
        this.totalBusy = this.numberGarages + this.numberHouses + this.numberShops;
        this.chartData[0].data = [this.numberHouses, this.numberShops, this.numberGarages];
        this.chartData[0].data.push(this.total - this.totalBusy);
        this.chartLabels = ['Viviendas ocupadas', 'Locales comerciales ocupados', 'Garajes ocupados', 'Disponibles'];
        this.chartData[0].backgroundColor = ['#8EB7FF', '#FA9A9A', '#DFDFDF', '#CFFFBD'];
        this.loading = false;
      });
    });
  }

}
