import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
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
              editable: false,
              filter: true
            },
        },
    actions: {
      selectMode: 'multi',
      position: 'right',

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
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    }
  //or something

    };


  source: LocalDataSource = new LocalDataSource();
  message: string = "";
  constructor(private service: TablesService) {
    this.message="";
    this.service.getData()
    .then(res => this.source.load(res))
    .catch(err => window.alert('Please Sign In To See Our Products'));
  }


  onCreateConfirm(event): void {
    if (window.confirm('Are You Sure You Want To Create?')) {
      this.service.insertData(event.newData)
      .then(res => {
        this.service.getData().then(res => {
          this.source.load(res);
          document.getElementById('message').innerHTML=event.newData.name+" has been created";
        })
      })
      .catch(err => {
        if (err.status === 401)
          window.alert('Sorry, You Are Not Authorized To Edit Products :(');
        else
          window.alert('Please Enter A Valid Product Information');
        event.confirm.reject();
      });
    } else {
      event.confirm.reject();
    }
}

onSaveConfirm(event): void {
  document.getElementById('message').innerHTML="";
  if (window.confirm('Are You Sure You Want To Update?')) {
    this.service.UpdateData(event.newData._id, event.newData)
    .then(res => {
      this.service.getData().then(res => {
          this.source.load(res);
      document.getElementById('message').innerHTML=event.newData.name+" has been updated";
      })
    })
    .catch(err => {
      if (err.status === 401)
        window.alert('Sorry, You Are Not Authorized To Update Products :(');
      else
        window.alert('Please Enter A Valid Product Information');
      event.confirm.reject();
    });
  } else {
    event.confirm.reject();
  }
}

onDeleteConfirm(event): void {
  document.getElementById('message').innerHTML="";
  if (window.confirm('Are You Sure You Want To Delete?')) {
    this.service.DeleteData(event.data._id)
    .then(res => {
      event.confirm.resolve();
    document.getElementById('message').innerHTML=event.data.name+" has been deleted";
  })
    .catch(err => {
      window.alert('Sorry, You Are Not Authorized To Delete Products :(');
      event.confirm.reject();
    });
  } else {
    event.confirm.reject();
  }
}
onUserRowSelect(event): void {
  document.getElementById('message').innerHTML="";
  if (window.confirm('Are You Sure You Want To purchase this Product?')) {
    this.service.InsertItem(event.data._id)
    .then(res =>{
        document.getElementById('message').innerHTML=event.data.name+" has been purchased, check your cart to see it";
    })
      .catch(err => window.alert('Sorry, You Are Not Authorized To purchase this Product :'));
    }
  }
}
