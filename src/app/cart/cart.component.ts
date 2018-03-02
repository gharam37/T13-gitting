import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../dashboard/dashboard-menu';
import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-items',
  //styleUrls: ['./dashboard.component.scss'],
  template: '<ngx-main-layout><nb-menu [items]="menu"></nb-menu><router-outlet></router-outlet></ngx-main-layout>'
})
export class CartComponent implements OnInit {
  menu: NbMenuItem[];

  ngOnInit() {
    this.menu = MENU_ITEMS;
  }
}
