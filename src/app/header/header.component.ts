import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../service/upload-service';

declare const myTest: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {


  subscription:Subscription;
  departments:string[]=[];


login=false;
userName:string;
  constructor(private authService:AuthenticationService,
              private router:Router,
              private route:ActivatedRoute,
              private uploadService:UploadService){
    if(this.authService.isUserLoggedIn())
    {  
      
      this.userName=JSON.parse(localStorage.getItem('currentUser')).userName;
      this.login=true;
    }
   
  }
  ngOnInit() {
    this.subscription=this.authService.currentUser
    .subscribe((data)=>
    {
      if(data)
      {
        this.userName=data.userName
        this.login=true;
      }
    })

    //set the department list coming from backend
    this.uploadService.getDepartment()
    .subscribe((data)=>
    {
      this.departments=data;
    
    })
  }
   

   onLogout()
   {
     this.authService.logout()
     this.router.navigate([''],{relativeTo:this.route})
     this.login=false;
   }

   question()
   {
    window.alert("The area is under prodution!!")
   }
   ngOnDestroy()
   {
     this.subscription.unsubscribe();
   }
  onclick()
  {

  }


  keyword = 'name';
  dept="Search-Departments"
  data = [
     {
       id: 1,
       name: 'Usa'
     },
     {
       id: 2,
       name: 'England'
     }
  ];


  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }
  
}
