import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ListRenterComponent } from './list-renter/list-renter.component';
import { AddRenterComponent } from './add-renter/add-renter.component';
import { DeleteRDialogComponent } from './deleter-dialog/deleter-dialog.component';
import { ListFilesComponent } from './add-renter/list-files/list-files.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path:'', component:ListRenterComponent}]),
  ],
  declarations: [
    ListRenterComponent,
    AddRenterComponent,
    DeleteRDialogComponent,
    ListFilesComponent
  ],
  entryComponents: [
    AddRenterComponent,
    DeleteRDialogComponent
  ]
})
export class RenterModule {}
