import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Http} from '@angular/http'
const API_URL = 'http://localhost:3000/api';


@Injectable()

export class TablesService implements Injectable {

  data : any[];
  token: String;
  product :Product;

  constructor
  (
  private http: HttpClient,
  private httpt : Http,
  private authService: NbAuthService,
  
  ) {}

  getData() {
    return new Promise<any[]>((resolve, reject) => {
      this.authService.getToken()
      .subscribe(token => {
      this.token = token.getValue()
      this.http.get<Products>(API_URL+'/product/getProducts?token='+this.token)
      .subscribe(products =>
        {
          this.data = products.data;
          resolve(this.data);
        });
      });
    });
  }
  createProduct( product ){
    
    return this.httpt.post(API_URL+'/product/createProduct?token='+this.token,product).map(res=>res.json());
      
  };
deleteProduct(id:object){
  return this.httpt.delete(API_URL+ '/product/deleteProduct/'+id+'?token='+ this.token).map(res=>res.json());
}
 updateProduct(id:object,product:Product){
  return this.httpt.patch(API_URL+ '/product/updateProduct/'+id+'?token='+ this.token,product).map(res=>res.json());
 }
}

export interface Products {
  err : any,
  msg : any,
  data: any[]
};
