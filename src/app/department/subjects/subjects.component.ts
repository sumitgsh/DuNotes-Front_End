import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterService, FilterData } from 'src/app/service/filter.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit,OnDestroy {

  sort_by = '';
  subjects:any[];
  subscription:Subscription;
  constructor(private filterser:FilterService) { }

  ngOnInit(): void {  
    
   // get  request the filtered data from the service

    this.subscription=this.filterser.filteredData
    .subscribe((data)=>
    {
    
      this.subjects=[...data];
  
    },
    (error)=>
    {
      console.log(error);
    })
  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

  
}
