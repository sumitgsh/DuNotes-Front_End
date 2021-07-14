import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../model/user'
import { NgForm } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Student } from '../model/students';
import { Faculty } from '../model/Faculty';
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    
    Allfaculty:any[];

    registerUser(user:NgForm)
     {
        return this.http.post(`http://localhost:8085/api/v1/users`,user);
    }

    getUserById(id:number)
    {
        return this.http.get<User>(`http://localhost:8085/api/v1/users/${id}`)
        .pipe(map((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
              return  new User(user.firstName,user.lastName,user.phoneNo,user.email,user.role,user.photoUrl,user.registerDate,user.coordinator,
                user.profileActive,user.universityId)      
        }));

    }
    updateUserById(userInfo:NgForm,id:number)
    {
   
        return this.http.put(`http://localhost:8085/api/v1/users/${id}`,userInfo.value,{responseType: 'text'})
        
    }
    //Student Academic Info
    updateStuAcademicInfo(acadInfo:NgForm,id:number)
    {
        return this.http.put(`http://localhost:8085/api/v1/students/${id}`,acadInfo.value,{responseType: 'text'})
    }
    //Faculty Academic Info
    updateFacAcademicInfo(acadInfo:any,id:number)
    {
        return this.http.put(`http://localhost:8085/api/v1/faculty/${id}`,acadInfo,{responseType: 'text'})
    }

    //Get Student details by id
    getStudentDetById(id:number)
    {
        return this.http.get<Student>(`http://localhost:8085/api/v1/students/${id}`)
        .pipe(map((student) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
              return  new Student(student.collegeName,student.departMent,student.degreeType,student.degreeName,student.dateOfAdm,student.currentSem) 
        }))
    }


    //Get Faculty details by id
    getFacultyDetById(id:number)
    {

        return this.http.get<any>(`http://localhost:8085/api/v1/faculty/${id}`);

    }



    //get the faculty from the backend
    getAllFaculty()
    {
        return this.http.get<any>(`http://localhost:8085/api/v1/faculty`)
        .pipe(map((res)=>
        {
          return this.Allfaculty=res;
        }))
    }

    //get the follwers count based on Id
    getFacultyFollowersById(facId:number)
    {
        return this.http.get<any>(`http://localhost:8085/api/v1/subscribeCount/${facId}`)

    }

    //get the upload media data based on userId
    getUploadDataOnUserId(id:number)
    {
      return this.http.get<any>(`http://localhost:8085/api/v1/users/${id}`)  
    }

     //get the upload media data based on userId
     getUploadDataOnFacultyId(id:number)
     {
       return this.http.get<any>(`http://localhost:8085/api/v1/faculty/uploadData/${id}`)  
     }

    //subscription Check

    subscribeCheck(userId:number,facId:number)
    {
        return this.http.get<any>(`http://localhost:8085/api/v1/subscribeCheck/${userId}/${facId}`,{observe:'response'})
    }

    //subscribe to the faculty
    subscribeFaculty(userId:number,facId:number)
    {
        let headers=new HttpHeaders().set('Content-Type','application/json')
        let data={
            facultyId:facId
        }  

        return this.http.put<any>(`http://localhost:8085/api/v1/subscribe/${userId}/${facId}`,data,{responseType: 'text' as 'json'})
    }

    //Un-subscribe to the faculty
    unSubscribeFac(userId:number,facId:number)
    {
        let headers=new HttpHeaders().set('Content-Type','application/json')
        let data={
            facultyId:facId
        } 
        return this.http.put<any>(`http://localhost:8085/api/v1/unsubscribe/${userId}/${facId}`,data,{responseType: 'text' as 'json'})
    }

}