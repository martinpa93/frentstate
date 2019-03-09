import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module.';
import { AppComponent } from './app.component';

import { SharedModule } from  './shared/shared.module';
import { CoreModule } from  './core/core.module';

import { AuthModule } from './auth/auth.module';
import { AdminComponent } from './admin/admin.component';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { InmueblesTableComponent } from './inmuebles-table/inmuebles-table.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    InmueblesTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,  
    AuthModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
