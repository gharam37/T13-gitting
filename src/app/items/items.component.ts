import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../dashboard/dashboard-menu';
import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-items',
  //styleUrls: ['./dashboard.component.scss'],
  templateUrl: './items.component.html'

})
export class ItemsComponent implements OnInit {
  menu: NbMenuItem[];

  ngOnInit() {
    this.menu = MENU_ITEMS;
  
