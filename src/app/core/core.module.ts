import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/error.interceptor';
import { HttpTokenInterceptor } from './interceptors/token.interceptor';

import {AuthGuard } from './services/auth-guard.service' 
import {JwtService } from './services/jwt.service' 
import { UserService } from './services/user.service' 
import { PropertyService } from './services/property.service';
import { RenterService } from './services/renter.service';
import { ContractService } from './services/contract.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    AuthGuard,
    JwtService,
    UserService,
    PropertyService,
    RenterService,
    ContractService
  ],
  declarations: []
})
export class CoreModule { }
