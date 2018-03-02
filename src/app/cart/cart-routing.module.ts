import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartTablesComponent } from './cartTables/cartTables.component';
import { CartComponent } from './cart.component';

const routes: Routes = [{
  path: '',
  component: CartComponent,
  children: [{
    path: '',
    component: CartTablesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {}
