import { Http } from '@angular/http';
import { User } from './user';
import { Injectable } from '@angular/core';
import {Observable } from "rxjs";
import "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  //private isUserLoggedIn;
  private username;
  constructor(private _http: Http) { 
    //this.isUserLoggedIn = false;
  }


  create(user: User){
    return this._http.post("/users", user)
    .map(data => data.json()).toPromise()
  }

  destroy(user: User){
    return this._http.delete("/users/"+user._id)
    .map(data => data.json()).toPromise()
  }

  update(user: User){
    return this._http.put("/users/"+user._id, user)
    .map(data => data.json()).toPromise()
  }

  getUsers(){
    return this._http.get("/users")
    .map(data => data.json()).toPromise()
  }

  getUser(user: User){
    return this._http.get("/users/"+user._id)
    .map(data => data.json()).toPromise()
  }


/*setUserLoggedIn(){
    this.isUserLoggedIn = true;
  }

getUserLoggedIn(){
    return this.isUserLoggedIn;
  }
*/
}
