import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

// import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  // { path: 'store', component: ItemsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule {}
