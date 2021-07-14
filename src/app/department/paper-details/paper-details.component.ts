import { Component, OnInit, OnDestroy, Input,Pipe,PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/service/filter.service';
import { ActivatedRoute, Params } from '@angular/router';
// import * as FileSaver from 'FileSaver';
import { UploadService } from 'src/app/service/upload-service';

@Component({
  selector: 'app-paper-details',
  templateUrl: './paper-details.component.html',
  styleUrls: ['./paper-details.component.css']
})
export class PaperDetailsComponent implements OnInit {

  
  id:number;
  subscription:Subscription;
  subjects:any;

  rate=0.0;
  constructor(private route:ActivatedRoute,
    private filterser:FilterService,
    private uService:UploadService) {
 
    }

  ngOnInit() {
   
    this.route.params
    .subscribe((params:Params)=>
    {
      this.id=params['id'];
      console.log(this.id);
    })

    this.filterser.getSubjectOnId(this.id)
    .subscribe((data)=>
    {
      console.log(data);
      this.subjects=data
    },
    (error)=>
    {
      window.alert("NO such data found");
    })

    //get the rating based on the selected id
    this.uService.getRating(this.id)
    .subscribe((data)=>
    {
      console.log(data);
      this.rate=data;
    })
  }

viewFile()
{
  window.open(`http://localhost:8085/api/v1/media/viewFile/${this.id}`)
}

//download File
downloadFile()
{
    this.filterser.saveFile(this.id).subscribe((response:any)=>
    {
      console.log(response)
    // FileSaver.saveAs(response, this.subjects.fileName);
    });
}

  Rating(rating:number) {

    let ratings={
      mediaId:+this.id,
      ratings:rating,
      rated:true
    }
console.log(ratings)
    this.uService.putRating(ratings).
    subscribe((data:any)=>
    {
      console.log(data);
    })
  }
}
