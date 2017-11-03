import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService} from '../_services/index';
import {UserService} from '../user/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;

  constructor(private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

  ngOnInit() {
  }

   register() {
        this.loading = true;

 this.userService.create(this.model)
     .then(status => {
                    this.alertService.success('Registration successful', true);
                    //this.router.navigate(['/login']);
                })
     .catch(err => {
                    this.alertService.error(err);
                    this.loading = false;
                });        
    }

}
