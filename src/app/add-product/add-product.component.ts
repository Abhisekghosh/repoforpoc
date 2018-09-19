import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {Product} from './product';
import { DatePipe } from '@angular/common';
import {YourValidator} from "./your-validator";


var arr1:Product[] = [{ id: 11, itemname: 'Groceries',itemprice:500 },
{ id: 12, itemname: 'Books',itemprice:1000},
{ id: 13, itemname: 'Goods',itemprice:1200 },
{ id: 14, itemname: 'Paintings',itemprice:300}];
var arr2:Product[] = [];
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  productForm : FormGroup;
  yourComponent:string;
  //displayedColumns: string[] = ['Button', 'Item Name', 'Item Price'];

  dataSource = [];
  dataSource1 = []; 
  constructor(formBuilder: FormBuilder) { 
    this.productForm= formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z0-9]'))]],
      description: ['', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z0-9]'))]],
      fromDate: ['', Validators.compose([Validators.required, YourValidator.dateVaidator])],
      toDate: ['', Validators.compose([Validators.required, YourValidator.dateVaidator])],
      status: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.dataSource = arr1;
    this.dataSource1 = arr2; 
  }

  save() {
    var name = this.productForm.controls['name'].value;
    var description = this.productForm.controls['description'].value;
    var fromDate = this.productForm.controls['fromDate'].value;
    var toDate = this.productForm.controls['toDate'].value;
    var status = this.productForm.controls['status'].value;
    var category = this.productForm.controls['category'].value;
    var from = fromDate.toISOString().slice(0,10);
    var to = toDate.toISOString().slice(0,10); 
    console.log(name);
    console.log(description);
    console.log(from);
    console.log(to);
    console.log(status);
    console.log(category);
    console.log(this.getYourComponents);
  }
  getActiveComponents(yourComponent) {
    alert("Inside get active component");
    let index = arr1.findIndex(x => x.id == yourComponent.id);
    arr1.splice(index, 1);

    var length = arr1.length + 1;
    arr2.push(yourComponent);
    console.log(arr1);
    console.log(arr2);

    this.dataSource = arr1;
    this.dataSource1 = arr2; 
  }
  getYourComponents(yourComponent) {
    let index = arr2.findIndex(x => x.id == yourComponent.id);
    arr2.splice(index, 1);

    var length = arr2.length + 1;
    arr1.push(yourComponent);
    console.log(arr1);
    console.log(arr2);

    this.dataSource = arr1;
    this.dataSource1 = arr2;
  }

}
