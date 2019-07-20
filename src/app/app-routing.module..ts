import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'login',component:AuthComponent},
  {path:'register',component:AuthComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'admin',component: AdminComponent,
  children:[
            {path:'properties', loadChildren:'./Property/property.module#PropertyModule'},
            {path: 'renters', loadChildren:'./Renter/renter.module#RenterModule'},
            {path: 'contracts', loadChildren:'./Contract/contract.module#ContractModule'}
            ]}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
