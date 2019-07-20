import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListPropertyComponent } from './list-property/list-property.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { DeletePDialogComponent } from './deletep-dialog/deletep-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path:'', component:ListPropertyComponent}]),
  ],
  declarations: [
    ListPropertyComponent,
    AddPropertyComponent,
    DeletePDialogComponent
  ],
  entryComponents: [
    AddPropertyComponent,
    DeletePDialogComponent
  ]
})
export class PropertyModule {}
