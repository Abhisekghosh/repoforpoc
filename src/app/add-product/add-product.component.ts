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
var category = [];
var add=[];

var checked="";
var checkedvalue = [];

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  productForm : FormGroup;
  yourComponent:string;
  category: string[] = ['Data','Voice','SMS','Combo'];
  //displayedColumns: string[] = ['Button', 'Item Name', 'Item Price'];
  selectedCategory = [];
   total:number;
  i:number;
  dataSource = [];
  dataSource1 = []; 
  constructor(formBuilder: FormBuilder) { 
    this.productForm= formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z0-9]'))]],
      description: ['', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z0-9]'))]],
      fromDate: ['', Validators.compose([Validators.required, YourValidator.dateVaidator])],
      toDate: ['', Validators.compose([Validators.required, YourValidator.dateVaidator])],
      status: ['', [Validators.required]],
      cat: [ '',[Validators.required]],
      sum:['', [Validators.required, Validators.pattern(new RegExp('[0-9]'))]],
    });
  }

  ngOnInit() {
    this.dataSource = arr1;
    this.dataSource1 = arr2; 
    
  }
check(checked) {
  if(this.selectedCategory.includes(checked)) {
    let index = this.selectedCategory.findIndex(x => x.id == checked);
    this.selectedCategory.splice(index,1);
  }
  else {
    this.selectedCategory.push(checked);
  }
}
  save() {
    
    
    var name = this.productForm.controls['name'].value;
    var description = this.productForm.controls['description'].value;
    var fromDate = this.productForm.controls['fromDate'].value;
    var toDate = this.productForm.controls['toDate'].value;
    var status = this.productForm.controls['status'].value;
    var sum = this.productForm.controls['sum'].value;
    

    var from = fromDate.toISOString().slice(0,10);
    var to = toDate.toISOString().slice(0,10); 
    

    
    console.log({
      "name": name,
      "description": description,
      "priceSumOfComponents": this.total,
      "priceOverridden": sum,
      "status": status,
      "category": this.selectedCategory,
      "effectiveStartDate": from,
      "effectiveEndDate": to
      });
    


  }
  getActiveComponents(yourComponent) {
    let index = arr1.findIndex(x => x.id == yourComponent.id);
    arr1.splice(index, 1);
    this.total=0;
    this.i=0;
    var length = arr1.length + 1;
    arr2.push(yourComponent);
    add.push(yourComponent.itemprice);
    console.log(arr1);
    console.log(arr2);
  
 
    for(this.i=0;this.i<add.length;this.i++) {
      this.total+= add[this.i];
    }
    this.dataSource = arr1;
    this.dataSource1 = arr2; 
    console.log(this.total);
    this.productForm.patchValue({
      sum: this.total,
    });
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
