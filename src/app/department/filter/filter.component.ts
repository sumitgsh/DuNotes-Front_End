import { Component, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FilterService, FilterData } from 'src/app/service/filter.service';
import { Subject } from 'rxjs';
import { UploadService } from 'src/app/service/upload-service';
import { Programme } from 'src/app/service/upload';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})


export class FilterComponent implements OnInit {
  Departments: string[] = ['all'];

  DegreeNames:Programme[]=[];
  filter_prog:Programme[]=[];



  
  //check with 
  PaperTypes:string[]=[
    'all','QuestionPaper','Notes','QPS','PYQ','practical',
  ]
  Semesters:string[]=[
    'all','1','2','3','4','5','6','7','8'
  ]

  //add all to the default value
  Subjects:any[]=[];
  filter_subject:any[]=[];

  dept= '';
  degree_name = '';
  paper_type = '';
  semester = '';
  subjects = '';
 
  //selected values for the fields
  selectedDegree='';
  selectedDepartment='';
  selectedSubject='';
  constructor(private route:ActivatedRoute,
              private router:Router,
              private uploadService:UploadService,
              private filterService:FilterService) { 

    


  }

  ngOnInit(): void {

    this.route.params
    .subscribe(
      (params:Params)=>{
        this.dept=params['depart'];
        this.degree_name=params['degName'];
        this.paper_type=params['papType'];
        this.semester=params['sem'];
        this.subjects=params['sub'];
    
        })
   
   //whenever the upload component loads ,load all the values of the selected department
   
   
   //set the department list coming from backend
   this.uploadService.getDepartment()
   .subscribe((data)=>
   {
     this.Departments=data;

     this.Departments.unshift('all');
 
     this.selectedDepartment=this.Departments[0];
     
   })


   //set the programme/degree list ,based on the data from backend
   this.uploadService.getProgramme()
   .subscribe((data)=>
   {
     this.DegreeNames=data;
     this.DegreeNames.unshift({ department:"all",
      degreeName:"all",
      noOfSemester:-1
    })
    this.filter_prog=this.DegreeNames;
    this.selectedDegree=this.DegreeNames[0].degreeName;
     //in order to filter the content
    //  this.filter_prog=data;

   })

   //set the subject list,based on the data from backend
   this.uploadService.getSUbject()
   .subscribe((data)=>
   {
     this.Subjects=data;
     this.Subjects.unshift({
       subjectName:'all'
     }) 
     this.filter_subject=this.Subjects;

     this.selectedSubject=this.Subjects[0].subjectName;
     
    //  //in order to filter the subject
    //  this.filter_Subject=data;
   })




  }

ngOnViewInit()
{

 
}

    //Filter the programme based on the selected deprtment 
    filterProgramme(filterVal: any) {
    
  if (filterVal.value == "all"){
      this.DegreeNames=this.filter_prog;
  }
  else
  {
      this.DegreeNames = this.filter_prog
      .filter((item) => item.department == filterVal.value);

      this.DegreeNames.unshift({ department:"all",
      degreeName:"all",
      noOfSemester:-1
    })
  }

  }

  filterSubject(filterVal:any)
  {

    console.log(filterVal.value)
    if (filterVal.value == "all")
    {
     this.Subjects=this.filter_subject;

    }
    else
    {
    this.Subjects = this.filter_subject
    .filter((item) => item.department==this.dept && item.deptprogrammes==this.degree_name);
    }
  }




  clearAllFilter()
  {
        this.dept='all';
        this.selectedDepartment=this.Departments[0];
        this.paper_type='all';
        this.semester='all';
        this.selectedDegree=this.DegreeNames[0].degreeName;
        this.selectedSubject=this.Subjects[0].subjectName;
  }

  filter(val: NgForm) {
    
    let filterParam=val.value;
    //backend get request based on the value of form data with service
    //sanitize the data based on submitted value
    this.filterService.filterSubject(filterParam);
    //select userUploaded,department,degreeName,degreeType,paperType,Semeter,Subjects    

     this.router.navigate(['department',`${this.dept}`,`${this.degree_name}`,`${this.paper_type}`,`${this.semester}`,`${this.subjects}`])
 
  }



}
