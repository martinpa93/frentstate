import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { ListPropertyComponent } from './Property/list-property/list-property.component';

const routes: Routes = [
  {path:'login',component:AuthComponent},
  {path:'register',component:AuthComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'admin',component: AdminComponent,
  children:[{path: 'properties',component:ListPropertyComponent}]}
  
  
  /* loadChildren:'./Property/property.module#PropertyModule'}
  ]} */
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
