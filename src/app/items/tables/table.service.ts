import { Injectable } from '@angular/core';


export class TablesService implements Injectable {

  data = [{

    name: 'banana',
    price: '10',
    CreatedAt: '1/3/2018',
    UpdatedAt: '',
    SellerName:'abdullah'
  }, {

    name: 'apple',
    price: '9',
    CreatedAt: '1/3/2018',
    UpdatedAt: '',
    SellerName:'abdullah'
  }, {

    name: 'orange',
    price: '1000',
    CreatedAt: '1/3/2018',
    UpdatedAt: '',
    SellerName:'abdullah'
  }];

  getData() {
    return this.data;
  }
}
