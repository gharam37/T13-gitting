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
      confirmSave:true
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
      this.service.createRow(event.newData).then((res)=> {
        this.service.getData().then((res)=>{
        event.confirm.resolve();
        this.source.load(res);

      })
      }).catch((err) => {
        event.confirm.reject();
      })

    } else {
      event.confirm.reject();
    }
}

onSaveConfirm(event): void {
  if (window.confirm('Are you sure you want to update?')) {

    this.service.updateRow(event.newData,event.data._id).then((res)=> {
      this.service.getData().then((res)=>{
      event.confirm.resolve();
      this.source.load(res);

    })
    }).catch((err) => {
      event.confirm.reject();
    })

  } else {
    event.confirm.reject();
  }
}

onDeleteConfirm(event): void {
  if (window.confirm('Are you sure you want to delete?')) {

    this.service.deleteRow(event.data._id).then((res)=> {
      event.confirm.resolve();
    }).catch((err) => {
      event.confirm.reject();
    })

  } else {
    event.confirm.reject();
  }
}


}
