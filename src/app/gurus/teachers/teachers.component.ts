import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service';

import { AuthenticationService } from '../../service/authentication.service';
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  facultyData:[];

  

  constructor(private uService:UserService,
              private  authService:AuthenticationService) { }

  ngOnInit(): void {

    //GET THE faculty details from the backend
      this.uService.getAllFaculty()
      .subscribe((data)=>
      {
        console.log(data);
         this.facultyData=data;
      })

  }




//When he subscribes to the professors the recent videos uploaded willbe there for the users

}
