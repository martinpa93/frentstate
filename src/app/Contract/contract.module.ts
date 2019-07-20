import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ListContractComponent } from './list-contract/list-contract.component';
import { AddContractComponent } from './add-contract/add-contract.component';
import { DeleteCDialogComponent } from './deletec-dialog/deletec-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path:'', component:ListContractComponent}]),
  ],
  declarations: [
    ListContractComponent,
    AddContractComponent,
    DeleteCDialogComponent
  ],
  entryComponents: [
    AddContractComponent,
    DeleteCDialogComponent
  ]
})
export class ContractModule {}
