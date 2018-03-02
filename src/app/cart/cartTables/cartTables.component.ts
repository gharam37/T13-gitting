import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { CartTablesService } from './cartTables.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './cartTables.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class CartTablesComponent {

  settings = {
    columns: {
              name: {
              title: 'Name',
              type: String,
              required: true,
              filter: true
            },
            price: {
              title: 'Price',
              type: Number,
              required: true,
              filter: true
            },
            createdAt: {
              title: 'CreatedAt',
              type: Date,
              editable: false,
              filter: true,
            },
            updatedAt:{
              title: 'UpdatedAt',
              type: Date,
              editable: false,
              filter: true
            },
            sellerName:{
              title: 'Seller Name',
              type: String,
              editable: false,
              filter: true
            }
        },
    actions: {
      position: 'right',
      edit:null,
      add:null
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    }
    };


  source: LocalDataSource = new LocalDataSource();
  price: number = 0;
  constructor(private service: CartTablesService) {
    this.service.getData()
    .then(res =>
      {
      this.source.load(res);
      this.price=0;
      for (const x of res) {
      this.price += x.price;
      }
    })
     .catch(err => window.alert('Please Sign In To See Your Cart'));

     // this.price = 50
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are You Sure You Want To Delete?')) {
      this.service.DeleteData(event.data._id)
      .then(res =>{
        event.confirm.resolve();
        this.price-=event.data.price;
        document.getElementById('priceTag').style.visibility='hidden';
      })
      .catch(err => {
        window.alert('Please Sign In To See Your Cart');
        event.confirm.reject();
      });
    } else {
      event.confirm.reject();
    }
  }




}
