import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { map } from 'lodash';

const API_URL = 'http://localhost:3000/api';


@Injectable()

export class CartTablesService implements Injectable {

  data : any[];
  token: String;

  constructor
  (
  private http: HttpClient,
  private authService: NbAuthService,
  ) {}

  getData() {
    return new Promise<any[]>((resolve, reject) => {
      this.authService.getToken()
      .subscribe(token => {
      this.token = token.getValue()
      this.http.get<Products>(API_URL+'/cart/getItems?token='+this.token)
      .subscribe(products =>
        {
          this.data = map(products.data,'productId');
          resolve(this.data);
        }, err => reject(err));
      });
    });
  }

  insertData(body) {
    return new Promise<any>((resolve, reject) => {
      this.authService.getToken()
      .subscribe(token => {
      this.token = token.getValue()
      this.http.post<Products>(API_URL+'/cart/createItem?token='+this.token, body)
      .subscribe(product => resolve(product), err => reject(err));
      });
    });
  }

  DeleteData(id) {
    return new Promise<any>((resolve, reject) => {
      this.authService.getToken()
      .subscribe(token => {
      this.token = token.getValue()
      this.http.delete<Products>(API_URL+'/cart/deleteItem/'+id+'?token='+this.token)
      .subscribe(product => resolve(product), err => reject(err));
      });
    });
  }
}

export interface Products {
  err : any,
  msg : any,
  data: any[]
};
