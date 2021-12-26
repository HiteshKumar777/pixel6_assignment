import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
const routes: Routes = [
  {path:'index', component:AppComponent},
  {path:'customerList', component:CustomerListComponent},
  {path:'addCustomer', component:CustomerRegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
