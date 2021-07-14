import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {



  //Get the user details from local storage
  uName:number=JSON.parse(localStorage.getItem('currentUser')).userName;


  constructor() { }

  ngOnInit(): void {
  }


  
}
