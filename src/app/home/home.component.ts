import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PropertyService } from '../core/services/property.service';
import { BaseChartDirective } from 'ng2-charts';
import { NotificationService } from '../core/services/notification.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  objectKeys = Object.keys;
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
  notifications;

  constructor(
      private pservice: PropertyService,
      private nservice: NotificationService
    ) {
  }

  ngOnInit() {
    this.getChartData();
    this.nservice.getNotifications().subscribe(data => {
      this.notifications =  Object.keys(data).map(i => data[i]);
    });
  }

  private getChartData() {
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
      this.pservice.getProperties().subscribe( _ => {
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
