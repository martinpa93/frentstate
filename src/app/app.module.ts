import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module.';
import { AppComponent } from './app.component';

import { CoreModule } from  './core/core.module';
import { SharedModule } from  './shared/shared.module';

import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
/* import { PropertyModule } from './Property/property.module';
 */
import { ListPropertyComponent } from './Property/list-property/list-property.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    ListPropertyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    /* PropertyModule */

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
