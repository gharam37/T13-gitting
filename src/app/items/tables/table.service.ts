import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000/api';


@Injectable()

export class TablesService implements Injectable {

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
      this.http.get<Products>(API_URL+'/product/getProducts?token='+this.token)
      .subscribe(products =>
        {
          this.data = products.data;
          resolve(this.data);
        });
      });
    });
  }
    AddP(item) {
        return new Promise<any[]>((resolve, reject) => {
            this.authService.getToken()
                .subscribe(token => {
                    this.token = token.getValue()
                    this.http.post<Products>(API_URL+'/product/createProduct?token='+this.token, item)
                        .subscribe(products =>
                        {
                           resolve(this.data);
                        });
                });
        });
    }
    UpdateP(item,id) {
        return new Promise<any[]>((resolve, reject) => {
            this.authService.getToken()
                .subscribe(token => {
                    this.token = token.getValue()
                    this.http.patch<Products>(API_URL+'/product/updateProduct/'+id+'?token='+this.token, item)
                        .subscribe(products =>
                        {
                            resolve(this.data);
                        });
                });
        });
    }
    EraseP(id) {
        return new Promise<any[]>((resolve, reject) => {
            this.authService.getToken()
                .subscribe(token => {
                    this.token = token.getValue()
                    this.http.delete<Products>(API_URL+'/product/deleteProduct/'+id+'?token='+this.token)
                        .subscribe(products =>
                        {
                            resolve(this.data);
                        });
                });
        });
    }
}

export interface Products {
  err : any,
  msg : any,
  data: any[]
};
