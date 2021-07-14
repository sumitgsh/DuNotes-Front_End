import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {

  Sort_By = '';
  updataData:any[];
  filterData:any[];
  dataAvailable:boolean=false

  userId:number=JSON.parse(localStorage.getItem('currentUser')).id;

  constructor(private uService:UserService) { }

  ngOnInit(): void {
    this.uService.getUploadDataOnUserId(this.userId)
    .subscribe((data:any)=>
      {
        if(data.media.length>1)
        {
          this.dataAvailable=true
        this.updataData=data.media;
        this.filterData=data.media;
        }
      })
  }


  sortData(paperYear:any)
  {
    if(paperYear=="1")
    {
      this.updataData=this.filterData
    }else{
    this.updataData=this.filterData.filter((data)=>data.paperYear==paperYear)
  }
}

  //get the user upload data from the backedn end


}
