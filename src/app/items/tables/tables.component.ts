import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { TablesService } from './table.service';
import { HttpClient } from '@angular/common/http';


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
            confirmSave: true,
            confirmEdit:true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        }
    };


    source: LocalDataSource = new LocalDataSource();
    token: String;

    constructor(private service: TablesService,
                private http: HttpClient) {
        this.service.getData().then((res) => {
                this.source.load(res)

            }
        ).catch(err => window.alert('Sign in to View items'));;


    }


    onCreateConfirm(event): void {
        if (window.confirm('Are You Sure You Want To Create?')) {
            
            this.service.CreateNewProduct(event.newData)
                .then(res => {
                    this.service.getData().then( res => {
                        this.source.load(res);
                    });
                })
                .catch(err => {
                    if (err.status === 401)
                        window.alert('You dont have access rights to create items  !');
                    else
                        window.alert('enter correct product information');
                    event.confirm.reject();
                });
        } else {
            event.confirm.reject();
        }
    }

    onSaveConfirm(event: any): void {
        if (window.confirm('Are You Sure You Want To Update?')) {
            this.service.UpdateAProduct(event.data._id, event.newData)
                .then(res => {
                    this.service.getData().then( res => {
                        this.source.load(res);
                    });
                })
                .catch(err => {
                    if (err.status === 401)
                        window.alert('You dont have access rights to update items  !');
                    else
                        window.alert('enter correct product information');
                    event.confirm.reject();
                });
        } else {
            event.confirm.reject();
        }
    }

    onDeleteConfirm(event): void {
        if (window.confirm('Are You Sure You Want To Delete?')) {
            this.service.DeleteAProduct(event.data._id)
                .then(res => event.confirm.resolve())
                .catch(err => {
                    window.alert('You dont have access rights to delete items !');
                    event.confirm.reject();
                });
        } else {
            event.confirm.reject();
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
