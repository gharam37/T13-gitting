import { Component } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { LocalDataSource } from 'ng2-smart-table';

import { TablesService } from './table.service';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

const API_URL = 'http://localhost:3000/api';
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './tables.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class TablesComponent {
  token: String;
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
              filter: true
            }
        },
    actions: {
      position: 'right'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,

    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmEdit:true,
      confirmSave:true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    }
    };


  source: LocalDataSource = new LocalDataSource();

  constructor(private service: TablesService , private _http: Http, private authService: NbAuthService ) {
    this.service.getData().then((res) => {
      this.source.load(res);
    })

  }
  private headers = new Headers({ 'Content-Type': 'application/json' });
  onCreateConfirm(event): object {
    var data= event.newData;
    if (window.confirm('Are you sure you want to create?')) {
     // let body = JSON.stringify(event.data);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return new Promise((resolve, reject) => {
        this.authService.getToken()
        .subscribe(token => {
        this.token = token.getValue()
        this._http.post(API_URL + '/product/createProduct?token='+this.token, {
          name: event.newData['name'],
          price:event.newData['price'],
          sellerName:'Basma'},options )
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
        });
      });
    } else {
      event.confirm.reject();
    }
}

onSaveConfirm(event): object {
  let headers = new Headers({ 'Content-Type': 'application/json'});
  let options = new RequestOptions({ headers: headers });
  if (window.confirm('Are you sure you want to update?')) {
    event.confirm.resolve();
    return new Promise((resolve, reject) => {
      this.authService.getToken()
      .subscribe(token => {
      this.token = token.getValue()
      this._http.patch(API_URL+'/product/updateProduct/'+event.data._id+'?token='+this.token,
       {
        name:event.newData['name'],
        price:event.newData['price'],
        sellerName:'Basma'},options ).map(res => res.json())
    .subscribe(res => {
      resolve(res);
    }, (err) => {
      reject(err);
    });
  });
});
  } else {
    //console.log('else');
    event.confirm.reject();
  }
}

onDeleteConfirm(event): object {
  if (window.confirm('Are you sure you want to delete?')) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    event.confirm.resolve();    
    return new Promise((resolve, reject) => {
        this.authService.getToken()
        .subscribe(token => {
        this.token = token.getValue()
      
      this._http.delete(API_URL+'/product/deleteProduct/'+event.data._id+'?token='+this.token ,options).map(res => res.json())
    .subscribe(res => {
      resolve(res);
    }, (err) => {
      reject(err);
    });
  });
});
  }
}

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'name',
        type: String,
        search: query
      },
      {
        field: 'price',
        type: Number,
        search: query
      },
      {
        field: 'sellerName',
        type: String,
        search: query
      },
      {
        field: 'createdAt',
        type: Date,
        search: query
      },
      {
        field: 'updatedAt',
        type: Date,
        search: query
      }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }
}
