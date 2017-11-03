import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser : User
  constructor(private user:UserService) { 
  this.currentUser = JSON.parse(localStorage.getItem('currentUser')).userdetails;    
  }

  ngOnInit() {    
    
  }

}
