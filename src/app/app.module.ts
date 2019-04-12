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
import { AddPropertyComponent } from './Property/add-property/add-property.component';
import { ListRenterComponent } from './Renter/list-renter/list-renter.component';
import { ListContractComponent } from './Contracts/list-contract/list-contract.component';
import { AddRenterComponent } from './Renter/add-renter/add-renter.component';
import { AddContractComponent } from './Contracts/add-contract/add-contract.component';
import { DeleteDialogComponent } from './Property/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    ListPropertyComponent,
    ListRenterComponent,
    ListContractComponent,
    AddPropertyComponent,
    DeleteDialogComponent,
    AddRenterComponent,
    AddContractComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AddPropertyComponent, DeleteDialogComponent, AddRenterComponent, AddContractComponent]
})
export class AppModule { }
