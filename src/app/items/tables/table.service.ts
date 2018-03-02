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

  createData(record) {
    return new Promise<any[]>((resolve, reject) => {
      this.authService.getToken()
      .subscribe(token => {
      this.token = token.getValue()
      this.http.post<Products>(API_URL+'/product/createProduct?token='+this.token,record).subscribe(products =>{
        console.log("Created");;});
      });
    });
  } // get data 


  deleteData(record) {
    return new Promise<any[]>((resolve, reject) => {
      this.authService.getToken()
      .subscribe(token => {
      this.token = token.getValue()
      this.http.delete<Products>(API_URL+'/product/deleteProduct/'+record+'?token='+this.token).subscribe(products =>{
        console.log("deleted");});
      });
    });
  } //delete Data 


  editData(record,dataAlter) {
    return new Promise<any[]>((resolve, reject) => {
      this.authService.getToken()
      .subscribe(token => {
      this.token = token.getValue()
      this.http.patch<Products>(API_URL+'/product/updateProduct/'+record+'?token='+this.token,dataAlter).subscribe(products =>{
        console.log("edit");});
      });
    });
  } //delete Data 



  getData() {
    return new Promise<any[]>((resolve, reject) => {
      this.authService.getToken()
      .subscribe(token => {
      this.token = token.getValue()
      this.http.get<Products>(API_URL+'/product/getProducts?token='+this.token).subscribe(products =>{
          this.data = products.data;
          console.log(this.data);
          console.log('hi');
          resolve(this.data);});
      });
    });
  } // get data 
} // class
export interface Products {
  err : any,
  msg : any,
  data: any[]
};
