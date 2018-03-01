import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { TablesService } from './table.service';

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
      confirmEdit:true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    }
    };


  source: LocalDataSource = new LocalDataSource();

  constructor(private service: TablesService) {
    this.service.getData().then((res) => {
      this.source.load(res);
    })

  }
  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create?')) {
      //
      //TODO : HERE GOES THE LOGIC FOR INSERTION
      //
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
}

onSaveConfirm(event): void {
  if (window.confirm('Are you sure you want to update?')) {
    //
    //TODO : HERE GOES THE LOGIC FOR UPDATE
    //
    event.confirm.resolve();
  } else {
    event.confirm.reject();
  }
}

onDeleteConfirm(event): void {
  if (window.confirm('Are you sure you want to delete?')) {
    //
    //TODO : HERE GOES LOGIC FOR DELETE
    //
    event.confirm.resolve();
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
