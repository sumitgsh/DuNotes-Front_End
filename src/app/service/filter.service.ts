
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Filter } from '../model/Filter';
import { map, tap, take, exhaustMap} from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface FilterData{
    id:number;
    subject:string;
    degreeName:string;
    paperType:string;
    user:string;
    downloadUri:string;
    topic:string;
    desc:string;
    paperYear:Date;
    dateOfUpload
}


@Injectable({
    providedIn:'root'
})
export class FilterService
{
    filteredData=new Subject<any>()
    public media:FilterData[]=[];

    subjectData:any[]=[];


    //for showing and filtering the subject based on reqirement
    filter_Subject=new Subject<any[]>();

    constructor(private http:HttpClient)
    {

    }
   
    
    getSubjectOnId(id:number)
    {
        return this.http.get(`http://localhost:8085/api/v1/media/${id}`)
    }

    saveFile(id:number)
    {
      return this.http.get(`http://localhost:8085/api/v1/media/downloadFile/${id}`,
                    {responseType:'blob'}); 
    }


    getSubjectData()
    {
     this.http.get<any[]>("http://localhost:8085/api/v1/medias/verified")
     .subscribe((data)=>
     {
        this.subjectData=data;
     })
    }

    async filterSubject(filter:any)
    {
        
        let filterData;

        //[X]First filter based on department
        if(filter.department!="all")
        {
            filterData=await this.subjectData.filter(data=>
                {
                    return data.department==filter.department
                })
        }else
        {
            filterData=this.subjectData;
        }
        //[X]Second filter based on degree name

        if(filter.degName!="all")
        {
            filterData=await filterData.filter(data=>
                {
                    return data.degreeName==filter.degName
                })
        }else
        {
            filterData=filterData;
        }

        //[X]Filter based onn paper type

        if(filter.paperType!="all")
        {
            filterData=filterData.filter(data=>
                {
                    return data.paperType==filter.paperType
                })
        }else
        {
            filterData=filterData;
        }

      
        //[X]Filter based on semeter
        if(filter.sem!="all")
        {
            filterData=filterData.filter((data)=>data.semester==filter.sem)
        }
        else
        {
            filterData=filterData
        }

          //[]Filter based on the subjects
          if(filter.sub!="all")
          {
              filterData=filterData.filter((data)=>data.subject==filter.sub)
          }
          else
          {
              filterData=filterData
          }
         
          //Emit the data to the subject details component
          this.filteredData.next(filterData);

    }

    
}