import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:3000/api';
//edafa
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class TablesService implements Injectable {

  data: any[];
  token: String;

  constructor
    (
    private http: HttpClient,
    private authService: NbAuthService,
  ) { }

  getData() {//service that returns all products in store
    return new Promise<any[]>((resolve, reject) => {
      this.authService.getToken()
        .subscribe(token => {
          this.token = token.getValue()
          this.http.get<Products>(API_URL + '/product/getProducts?token=' + this.token)
            .subscribe(products => {
              this.data = products.data;
              resolve(this.data);
            });
        });
    });
  }
  ////////////--my edit
  insertData(body) {//service to insert body passed to it to create a new record

    return new Promise<any[]>((resolve, reject) => {
       this.authService.getToken()
        .subscribe(token => {
           this.token = token.getValue()
           this.http.post<Products>(API_URL+'/product/createProduct?token='+this.token, body)
             .subscribe(products => {
               //this.data = products.data;
               resolve(this.data);
             });
         });
    });
   
  }
  //end of insertData(theproductBody) here and start of delete

  deleteData(id){//delete a product from record using id
    return new Promise<any[]>((resolve, reject) => {
      this.authService.getToken()
        .subscribe(token => {
          this.token = token.getValue()
          this.http.delete<Products>(API_URL+'/product/deleteProduct/'+id+'?token='+this.token)
            .subscribe(products => {
              //this.data = products.data;
              resolve(this.data);
            });
        });
    });
  }
//end of dlt start of update
//updateData()
updateData(body,id){//service to modify a pproduct in store

  return new Promise<any[]>((resolve, reject) => {
    this.authService.getToken()
      .subscribe(token => {
        this.token = token.getValue()
        this.http.patch<Products>(API_URL+'/product/updateProduct/'+id+'?token='+this.token, body)
          .subscribe(products => {
            //this.data = products.data;
            resolve(this.data);
          });
      });
  });
}

}

export interface Products {
  err: any,
  msg: any,
  data: any[]
};
