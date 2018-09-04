import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService} from '../restapi.service';
import {User} from '../user';
import { Location } from '@angular/common';
@Component({
  selector: 'app-restapiform',
  templateUrl: './restapiform.component.html',
  styleUrls: ['./restapiform.component.css']
})
export class RestapiformComponent implements OnInit {

  user: User[];
  users= new User();
  userForm : FormGroup;
  message: string;
  private location: Location;

  constructor(formBuilder: FormBuilder,private restapiService: RestapiService) {

    this.userForm= formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z0-9]'))]],
      salary: ['', [Validators.required, Validators.pattern(new RegExp('[0-9]'))]]
    });

    


   }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    return this.restapiService.getUsers()
    .subscribe(
      user => {
       console.log(user);
       this.user = user
      }
     );

  }
  
   add() {
    var username=this.userForm.controls['username'].value;
    var salary=this.userForm.controls['salary'].value;

    console.log("User=="+username);
    console.log("Salary=="+salary);
      return this.restapiService.addUser({ username,salary} as User)
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

    console.log("User=="+username);
    console.log("Salary=="+salary);
      return this.restapiService.updateUser({id,username,salary} as User)
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
          alert(1);
          this.message= "Customer Deleted successfully";
          this.getUsers();
          }, error => {
            alert(2);
          console.log(error);
          }); 
  }
  goBack(): void {
    this.location.back();
  }



  

}
