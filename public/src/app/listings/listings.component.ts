import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing'
import { HttpService } from '../http.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  listing=new Listing
  listings=[];
  user={}
  current_user_id: String;
  constructor(private _httpService: HttpService, private _router: Router) { 
     this._httpService.get_logged_in_user()
    .then(data=> {
      if (data){
        console.log(data)
        this.current_user_id=data;
        console.log("current user", this.current_user_id)
        this._httpService.observedUser.subscribe(
        user=> {
          console.log("Subscribed users from registration",user);
          this.user=user
          
        },
        (err)=> console.log(err),
        ()=>{}
      )
      }
      else{
        this._router.navigate(['/'])
      }
    })
    .catch(err=> console.log(err))

  }

  ngOnInit() {
  }
  onSubmit(){
    console.log("come on bike image",this.listing.avatar)
    this.listing.creator_id=this.current_user_id
    this._httpService.createListing(this.listing)
    .then(listings=> {
      console.log("listing creation",listings)
      this.listings=listings 
      this.listing=new Listing
      this._httpService.updateListings(listings)      
  })
    .catch(err=> console.log("listing creation error",err))
  }

}
