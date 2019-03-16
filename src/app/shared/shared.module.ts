import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule, MatToolbarModule,
  MatIconModule, MatMenuModule, MatSidenavModule,MatExpansionModule, 
  MatListModule, MatFormFieldModule,MatCardModule,MatRadioModule, 
  MatDatepickerModule, MatInputModule, MatNativeDateModule,MatTableModule,
MatPaginatorModule,MatSortModule,} from '@angular/material';


import { FlexLayoutModule } from '@angular/flex-layout';

import { ListErrorsComponent } from './errors/list-errors.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
    
  ],
  declarations: [NavComponent,
    FooterComponent,
    ListErrorsComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    //table
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    
    
    ListErrorsComponent,
    NavComponent,
    FooterComponent    
  ]
  })
  export class SharedModule { }