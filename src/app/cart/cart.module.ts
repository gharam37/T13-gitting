import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../@theme/theme.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartTablesComponent } from './cartTables/cartTables.component';
import { CartTablesService } from './cartTables/cartTables.service';


@NgModule({
  imports: [ThemeModule, CartRoutingModule, Ng2SmartTableModule,],
  declarations: [CartComponent,CartTablesComponent],
  providers: [CartTablesService]
})
export class CartModule {}
