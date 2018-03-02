import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../@theme/theme.module';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { TablesComponent } from './tables/tables.component';
import { TablesService } from './tables/table.service';


@NgModule({
  imports: [ThemeModule, ItemsRoutingModule, Ng2SmartTableModule,],
  declarations: [ItemsComponent,TablesComponent],
  providers: [TablesService]
})
export class ItemsModule {}
