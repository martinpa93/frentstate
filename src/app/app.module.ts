import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module.';
import { AppComponent } from './app.component';

import { CoreModule } from  './core/core.module';
import { SharedModule } from  './shared/shared.module';

import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';

/* import { ListPropertyComponent } from './Property/list-property/list-property.component'; */


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    /* ListPropertyComponent */
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
