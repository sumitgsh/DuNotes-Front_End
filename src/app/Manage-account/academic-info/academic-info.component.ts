import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/app/model/students';
import { Faculty } from 'src/app/model/Faculty';


@Component({
  selector: 'app-academic-info',
  templateUrl: './academic-info.component.html',
  styleUrls: ['./academic-info.component.css']
})
export class AcademicInfoComponent implements OnInit {
  
//Storing the Student data
student:Student;
//Storing the Faculty data
faculty:Faculty;


  selectedValue: string;
  
  edit=true;
  save=false;
  collegeName='';
  departMent='';
  degreeType='';
  degreeName='';
  currentSem='';
  dateOfAdm='';
  description='';
  qualification='';
  teachingDept='';
  subjectsTeach:string[];
  subject='';

  

  //Set the role whether its a student or faculty
  role:string=JSON.parse(localStorage.getItem('currentUser')).role;
  //Department temporary
  Departments: string[] = [
    'English','Physics','Chemistry','Mathematics','Computer Science'
  ];
  DegreeTypes:string[]=[
    'UG','PG'
  ]
  DegreeNames:string[]=[
    'BCA','MCA','MBA','B-tech'
  ]
  PaperTypes:string[]=[
    'all','Notes','PYQ','QuestionPaper','QPS','practical',
  ]
  Semesters:string[]=[
    '1','2','3','4','5','6','7','8'
  ]
  Subjects:string[]=[
    'Java','C','Dbms','Accountancy'
  ]

  userId:number=JSON.parse(localStorage.getItem('currentUser')).id;
 
  constructor(private http:HttpClient,
    private authService:AuthenticationService,
    private userService:UserService,
    private _snackBar: MatSnackBar) { }

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
      if(this.role==='Student')
      {
        this.userService.getStudentDetById(this.userId)
        .subscribe(data=>
          {

           // console.log(data);
        
           this.collegeName=data.collegeName;
          this.departMent=data.departMent
          this.degreeName=data.degreeName
          this.degreeType=data.degreeType
          this.dateOfAdm=data.dateOfAdm
          this.currentSem=data.currentSem
          },
          (error)=>
          {
             console.log(error);
          })
    }

    if(this.role==='Faculty')
      {
        this.userService.getFacultyDetById(this.userId)
        .subscribe(data=>
          {
            this.faculty=data;
            this.description=data.description
            this.qualification=data.qualification
            this.teachingDept=data.teachingDept
            this.subjectsTeach=data.subjectsTeach.split(",")

          })
    }
  }

  }

  onEditInfo(editMode:NgForm)
  {

    if(this.role==='Student')
    {
     editMode.controls['collegeName'].enable();
     editMode.controls['departMent'].enable();
     editMode.controls['degreeType'].enable();
     editMode.controls['degreeName'].enable();
     editMode.controls['currentSem'].enable();
     editMode.controls['dateOfAdm'].enable();
    }

    //faculty
    if(this.role==='Faculty')
    {
     editMode.controls['description'].enable();
     editMode.controls['qualification'].enable();
    //  editMode.controls['departMent'].enable();
     editMode.controls['teachingDept'].enable();
     editMode.controls['subjectsTeach'].enable();
    }
      this.edit=false;
     this.save=true; 
  }
  onSubmitAcademicInfo(academicInfo:NgForm)
  {
    //User to update their details
    if(this.role==='Student'){
    academicInfo.controls['collegeName'].disable();
    academicInfo.controls['departMent'].disable();
     academicInfo.controls['degreeType'].disable();
     academicInfo.controls['degreeName'].disable();
     academicInfo.controls['currentSem'].disable();
     academicInfo.controls['dateOfAdm'].disable();
    }
    if(this.role==='Faculty')
    {  
      academicInfo.controls['description'].enable();
      academicInfo.controls['qualification'].enable();
      academicInfo.controls['teachingDept'].enable();
      academicInfo.controls['subjectsTeach'].enable();
     }

     //Get the Data from the server

     if(this.authService.isUserLoggedIn())
    {
      if(this.role==='Student')
      {
        this.userService.updateStuAcademicInfo(academicInfo,this.userId)
        .subscribe(response=>
          {
         
            this.openSnackBar(response) 
        
          }),
          (error)=>
          {
            
            this.openSnackBar('Details Could not update')
          }
        }

        if(this.role==='Faculty')
      {


        //Sanitizing the data
        let academicData=
        { 
        description: academicInfo.value.description,
        qualification:academicInfo.value.qualification,
        teachingDept: academicInfo.value.teachingDept,
        subjectsTeach: academicInfo.value.subjectsTeach.toString(),
        
        }
       
      
       
        this.userService.updateFacAcademicInfo(academicData,this.userId)
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
    
      this.edit=true;
     this.save=false; 
  
  }
}
