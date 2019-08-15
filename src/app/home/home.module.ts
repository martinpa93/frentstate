import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    SharedModule,
    ChartsModule,
    RouterModule.forChild([{path: '', component: HomeComponent}]),
  ],
  declarations: [
    HomeComponent
  ],
  entryComponents: [
  ]
})
export class HomeModule {}
