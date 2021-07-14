import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterService } from '../service/filter.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  dept= '';
  degree_name = '';
  paper_type = '';
  semester = '';
  subjects = '';

  constructor(private filterService:FilterService,
    private http:HttpClient,
    private route:ActivatedRoute) { 
      //get the subjectData from teh server

   this.filterService.getSubjectData();
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
        this.filterService.filterSubject({department:this.dept,degName:this.degree_name,paperType:this.paper_type,sem:this.semester,sub:this.subjects});
        }
    )
  }
  

}
