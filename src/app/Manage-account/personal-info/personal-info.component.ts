import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user-service';
import { User } from 'src/app/model/user';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {


  
  //Snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  edit=true;
  save=false;
  firstName='';
  lastName='';
  email='';
  phoneNo='';
  role='';
    registerDate='';
  coordinator='';
  userId:number=JSON.parse(localStorage.getItem('currentUser')).id;
  //User data to show whenever component initialize
  user:User;
  constructor(private http:HttpClient,
              private authService:AuthenticationService,
              private userService:UserService,
              private _snackBar: MatSnackBar) {             
  }
 
             //Opening of snackbar function
             openSnackBar(message) {
              this._snackBar.open(message, 'Close', {
                duration: 2500,
                horizontalPosition:"center",
                verticalPosition: "top",
                panelClass:"position"
              });
            }
              
  ngOnInit(): void {

    if(this.authService.isUserLoggedIn())
    {

        this.userService.getUserById(this.userId)
        .subscribe(data=>
          {
            this.user=data;
            console.log(this.user)
          })
    }
   

  }

  onEditInfo(editMode:NgForm)
  {
     editMode.controls['firstName'].enable();
     editMode.controls['lastName'].enable();
     editMode.controls['phoneNo'].enable();
     editMode.controls['email'].enable();
     
    this.edit=false;
     this.save=true; 
  }
 
  onSubmitPersonalInfo(userInfo:NgForm)
  {
    console.log(userInfo)

    //User to update their details
    userInfo.controls['firstName'].disable();
    userInfo.controls['lastName'].disable();
    userInfo.controls['phoneNo'].disable();
    userInfo.controls['email'].disable();
    this.save=false;
    this.edit=true;

    if(this.authService.isUserLoggedIn())
    {

        this.userService.updateUserById(userInfo,this.userId)
        .subscribe(response=>
          {
            
            this.openSnackBar(response) 
        
          }),
          (error)=>
          {
            
            this.openSnackBar('Details Could not update')
          }
    }
    
  }
}
