import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { ListPropertyComponent } from './Property/list-property/list-property.component';
import { ListContractComponent } from './Contracts/list-contract/list-contract.component';
import { ListRenterComponent } from './Renter/list-renter/list-renter.component';

const routes: Routes = [
  {path:'login',component:AuthComponent},
  {path:'register',component:AuthComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'admin',component: AdminComponent,
  children:[{path: 'properties',component:ListPropertyComponent},
            {path: 'renters',component:ListRenterComponent},
            {path: 'contracts',component:ListContractComponent},
            ]}
  
  /* loadChildren:'./Property/property.module#PropertyModule'}
  ]} */
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
