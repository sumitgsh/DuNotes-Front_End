import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Department, Programme,ProgSubject } from './upload';




@Injectable({
    providedIn:'root'
})
export class UploadService
{
    constructor(private http:HttpClient)
 {

}

 //get the department data from backend
    getDepartment()
    {
    return this.http.get<Department[]>(`http://localhost:8085/api/v1/department`)
    .pipe(map((department) => {
        // map the data to id and name
          return   department.map((cur)=>
          {
               return   cur.department;
          })
    }));
    }

    


    //get the List of department from the databas
    getProgramme()
    {
   return this.http.get<Programme[]>(`http://localhost:8085/api/v1/department/programme`);
    }
 


    //get the subject data from backend 
    getSUbject()
    {
   
          return this.http.get<ProgSubject[]>(`http://localhost:8085/api/v1/department/programme/subject`)
         
    }

    //send rating based on selected media

    putRating(rateData:any)
    {
        return this.http.post<any>(`http://localhost:8085/api/v1/media/rate`,rateData);
    }

    //get the rating from the server
    
    getRating(id:number)
    {
    
        return this.http.get<any>(`http://localhost:8085/api/v1/rating/${id}`);
    }

   


}