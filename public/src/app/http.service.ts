import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class HttpService {
  observedUser= new BehaviorSubject(null)
  observedListings= new BehaviorSubject(null)
  constructor(private _http: Http ) { }
  
  updateListings(listings){
    this.observedListings.next(listings)
  }


  updateUser(user){
    this.observedUser.next(user)
  }
  addUser(user){
    console.log("AddUser", user)
    return this._http.post('/users/add', user).map(data=>data.json()).toPromise()
  }

  getUser(user){
    console.log("service",user)
    return this._http.post('/users/login',user).map(data=>data.json()).toPromise()
  }
  get_logged_in_user(){
    return this._http.get('/get_logged_in_user').map(data=>data.json()).toPromise()
  }
  logout_user(){
    return this._http.get('/users/logout').map(data=>data.json()).toPromise()
  }

  createListing(lisitng){
    console.log("service listing", lisitng)
    return this._http.post('/listings/new', lisitng).map(data=>data.json()).toPromise()

  }
  get_listings(){
    console.log("$%$%T^$%^$^$^$%^$")
    return this._http.get('/get_all_listings').map(data=>data.json()).toPromise()
  }

  updateList(list){
    console.log("Update Listing in the service",list)
    return this._http.post('/listings/edit',list).map(data=>data.json()).toPromise()

  }
  deleteList(_id){
    console.log("About to delete in service",{id:_id})
    return this._http.post('/listings/delete',{id:_id}).map(data=>data.json()).toPromise()

  }


}
