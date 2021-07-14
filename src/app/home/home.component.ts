import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../service/upload-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  departments:any[];
  searchVal;

  constructor(private uploadService:UploadService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.uploadService.getDepartment()
    .subscribe((data)=>
    {
      this.departments=data;
     
    })
  }

  onSearch()
  {
    //[]Sanitize the data before search
    //Basic search used
    console.log(this.searchVal)

    let value=this.departments.find((data)=>data==this.searchVal)

    if(value.length<1)
    {
      this.router.navigateByUrl('/department/all/all/all/all/all')
    }
    else{
      this.router.navigateByUrl(`/department/${value}/all/all/all/all`)
    }


  }



  //[] Get the list of departments from backend
    


  //[] Count the no students, gurus and papers


  //[] working search panel


}
