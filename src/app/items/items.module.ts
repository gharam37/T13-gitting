import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [ThemeModule, ItemsRoutingModule, Ng2SmartTableModule],
  declarations: [ItemsComponent],
  entryComponents: [],
  providers: []
})
export class ItemsModule {}
