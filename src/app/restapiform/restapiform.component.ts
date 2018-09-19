import { Component, OnInit, Inject, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService} from '../restapi.service';
import {User} from '../user';
import { Location } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
//import {NgbdDatepicker} from '../NgbdDatepicker';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
@Component({
  selector: 'app-restapiform',
  templateUrl: './restapiform.component.html',
  styleUrls: ['./restapiform.component.css'],
  providers: [NgbAlertConfig]

})
export class RestapiformComponent implements OnInit {

  user: User[];
  users= new User();
  userForm : FormGroup;
  message: string;
  @Input() public alerts: Array<string> = [];

  constructor(formBuilder: FormBuilder,private restapiService: RestapiService, alertConfig: NgbAlertConfig) {

    this.userForm= formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z0-9]'))]],
      salary: ['', [Validators.required, Validators.pattern(new RegExp('[0-9]'))]],
      dob: ['', [Validators.required]]
    });
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    


   }
   

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    return this.restapiService.getUsers()
    .subscribe(
      user => {
       this.user = user
      }
     );

  }
   add() {
     alert("Hii")
    var username = this.userForm.controls['username'].value;
    var salary = this.userForm.controls['salary'].value;

   var dob = this.userForm.controls['dob'].value;
   var currentDate = new Date().toISOString().slice(0,10); 
  alert(currentDate);
  var day = dob.day;
  var month = dob.month;
  var year = dob.year;
  if(day < 10) {
    day = "0"+day;
  }
  if(month < 10) {
    month = "0"+month;
  }
  
  var dateOfBirth = year+"-"+month+"-"+day;
  alert(dateOfBirth);
var birth = moment(dateOfBirth, "YYYY-MM-DD"); 
var today = moment(currentDate,"YYYY-MM-DD");
//Use diff
var age = today.diff(birth,'years');
    alert(age);
    console.log("User=="+username);
    console.log("Salary=="+salary);
    console.log(dateOfBirth);
    console.log(currentDate);
    console.log(age);
    


    

    


      return this.restapiService.addUser({ username,salary,age} as User)
          .subscribe((data:any) => {
            this.message= "Customer Added successfully";
            this.getUsers();
            }, error => {
            console.log(error);
            }); 
         
            
            
  }
  update(id) {
    var username=this.userForm.controls['username'].value;
    var salary=this.userForm.controls['salary'].value;
    var dob = this.userForm.controls['dob'].value;
   var currentDate = new Date().toISOString().slice(0,10); 
  alert(currentDate);
  var day = dob.day;
  var month = dob.month;
  var year = dob.year;
  if(day < 10) {
    day = "0"+day;
  }
  if(month < 10) {
    month = "0"+month;
  }
  
  var dateOfBirth = year+"-"+month+"-"+day;
  alert(dateOfBirth);
var birth = moment(dateOfBirth, "YYYY-MM-DD"); 
var today = moment(currentDate,"YYYY-MM-DD");
//Use diff
var age = today.diff(birth,'years');
    alert(age);
    console.log("User=="+username);
    console.log("Salary=="+salary);
      return this.restapiService.updateUser({id,username,salary,age} as User)
          .subscribe((data:any) => {
            this.message= "Customer Updated successfully";
            this.getUsers();
            }, error => {
            console.log(error);
            }); 
          
  }
  delete(id) {
    console.log("Users id is=="+id)
    this.restapiService.deleteUser(id)
        .subscribe((data:any) => {
          this.message= "Customer Deleted successfully";
          this.getUsers();
          }, error => {
          console.log(error);
          }); 
  }
  
}

