import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables/tables.component'
import { ItemsComponent } from './items.component';

const routes: Routes = [{
  path: '',
  component: ItemsComponent,
  children: [{
    path: '',
    component: TablesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule {}
