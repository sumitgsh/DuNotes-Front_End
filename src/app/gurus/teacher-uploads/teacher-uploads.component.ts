import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-teacher-uploads',
  templateUrl: './teacher-uploads.component.html',
  styleUrls: ['./teacher-uploads.component.css']
})
export class TeacherUploadsComponent implements OnInit {

isSubscribed:Boolean;
 //Snackbar
 horizontalPosition: MatSnackBarHorizontalPosition = 'start';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private uService:UserService,
    private  authService:AuthenticationService,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar) { }

    facultyId:number;
    facultyData:any;
    facultyUserId:any;
    isEmpty:boolean=false;
    activeFollowers:any;
    selectedfacUploadData:any;
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

  this.facultyId=parseInt(this.route.snapshot.paramMap.get('id'));

    //[X]check whether subscribed or not
      this.uService.subscribeCheck(this.uId,this.facultyId)
      .subscribe((res)=>
      {
        if(res.status===200)
        {
          this.isSubscribed=true;
        }
        else
        {
          this.isSubscribed=false;
        }
      })

      //get faculty based on id
      this.uService.getFacultyDetById(this.facultyId)
      .subscribe((data)=>
      {
        this.facultyData=data;
  
      })

      //Get the followers count based on id
      this.uService.getFacultyFollowersById(this.facultyId)
      .subscribe((data)=>
      {
        this.activeFollowers=data;
      })


      //get the faculty upload data on user id
      this.uService.getUploadDataOnFacultyId(this.facultyId)
      .subscribe((data)=>
      {
        this.selectedfacUploadData=data.media;
        if(this.selectedfacUploadData.length<1)
        {
        this.isEmpty=true;
        }
      })

    //followers count of the faculty
    //[X] followers count
    


  }

    //Get the user details from local storage
    uId:number=JSON.parse(localStorage.getItem('currentUser')).id;

//get faculty id using route params

  subscribeFac()
{
  //User need to login in order to subscribe
  if(this.authService.isUserLoggedIn()){
  //[x]On successfully subscribe alert box(showing successfully subscribe)

  this.uService.subscribeFaculty(this.uId,this.facultyId)
  .subscribe((response)=>
  {
        this.isSubscribed=true;
      this.openSnackBar(response) 
  },
  error=>
  {
    this.openSnackBar('Something went wrong')
    
  })
  }else
  {
    window.alert("Please login in to subscribe")
  }

}  

unSubscribe()
{
  this.uService.unSubscribeFac(this.uId,this.facultyId)
  .subscribe((response)=>
  {
    this.isSubscribed=false;
      this.openSnackBar(response) 
  },
  error=>
  {
    this.openSnackBar('Something went wrong')
    
  })
}

}
