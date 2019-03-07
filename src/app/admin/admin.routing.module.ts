import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services/auth-guard.service';

import { InmueblesTableComponent} from '../inmuebles-table/inmuebles-table.component';

const routes: Routes = [
  {
    path: 'login',
    component: InmueblesTableComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
