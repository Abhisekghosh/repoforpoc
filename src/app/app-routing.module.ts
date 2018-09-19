import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestapiformComponent } from './restapiform/restapiform.component';
import { AddProductComponent } from './add-product/add-product.component'
const routes: Routes = [
  { 
    path: 'user', 
    component: RestapiformComponent 
  },
  { 
    path: 'product', 
    component: AddProductComponent 
  },

  { 
    path: '', 
    redirectTo: 'user', 
    pathMatch: 'full'
  }, 
];

@NgModule({
 imports: [ RouterModule.forRoot(routes) ],
 exports: [ RouterModule ]
})

export class AppRoutingModule {}