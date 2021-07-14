import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { BehaviorSubject, Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


   currentUser=new Subject<any>();

  constructor(private http:HttpClient) { }



//   public get currentUserValue(): User {
//     return this.currentUserSubject.value;
// }

login(authLogin:NgForm) {

    return this.http.post<any>('http://localhost:8085/api/v1/users/login',
    authLogin.value)
        .pipe(map((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
              return {
               id:user.id, 
              userName:user.userName,
              email:user.email,
              role:user.role
              }  
        }),
        tap((user)=>
        {
          this.currentUser.next(user)
        }));
}

 isUserLoggedIn() {
      let user = localStorage.getItem('currentUser')
      console.log(!(user === null))
      return !(user === null)
    }

logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
}
  
}
