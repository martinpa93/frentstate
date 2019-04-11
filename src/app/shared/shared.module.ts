import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule,MatToolbarModule,
  MatIconModule,MatMenuModule,MatSidenavModule,MatExpansionModule, 
  MatListModule,MatFormFieldModule,MatCardModule,MatRadioModule, 
  MatDatepickerModule,MatInputModule,MatNativeDateModule,MatTableModule,
MatPaginatorModule,MatSortModule,MatDialogModule,MatSelectModule, MatSnackBarModule,} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
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
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
    
    
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
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
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    
  ]
  })
  export class SharedModule { }