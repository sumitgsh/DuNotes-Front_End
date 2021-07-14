import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user-service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  hide = true;
  labelPosition: 0 | 1 = 1;
  checked=false;
  matcher = new MyErrorStateMatcher();
  firstName='';
  lastName='';
  userName='';
  email='';
  phoneNo='';
  psd='';
  role='';
  college_Id_No='';
  isLoading=false;
  constructor(private http:HttpClient,
              private userService:UserService,
              private router:Router) { }

  ngOnInit(): void {
    

  }

  onRegister(registerForm :NgForm)
  {
    this.isLoading=true;
    console.log(registerForm.value);
    if(!registerForm.valid)
    {
      return 
       }
   this.userService.registerUser(registerForm.value)
    .subscribe(
      data => {
        this.isLoading=false;
        
        alert("Registration Successful")
        
        this.router.navigate(['/login']);
    },
    error => {
      alert("User name already exists Try Some different name")
      this.isLoading=false;
    });
}
  
    

  }
  


