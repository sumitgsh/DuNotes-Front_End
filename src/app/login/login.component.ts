import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname='';
  password='';
  constructor(private authenticationService:AuthenticationService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  //On submission of the form
  onSubmit(data:NgForm)
  {
    this.authenticationService.login(data)
    .subscribe(
      data=>
      {
        localStorage.setItem('currentUser',JSON.stringify(data));
        this.router.navigate([''],{relativeTo:this.route})
      },
      error=>
      {
       window.alert(error.error.message)
      }
    )

  }

}
