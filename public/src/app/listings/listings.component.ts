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
    this._httpService.get_listings()
    .then(listings=> {
      console.log("listing retrieval",listings[0]._creator_id)
      this.listings=listings 
      console.log("the creator id is ",listings[0]['creator_id'])
      this.listing=new Listing
      this._httpService.updateListings(this.listings)      
  })
    .catch(err=> console.log("listing retrieval error",err))
    console.log("constructor listings at the beginning",this.listings)

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
      console.log("the creator id is ",listings[0]['creator_id'])
      this.listing=new Listing
      this._httpService.updateListings(this.listings)      
  })
    .catch(err=> console.log("listing creation error",err))
  }
  updateListing(list){
    console.log(list)
    this._httpService.updateList(list)
    .then(data=> {
      this.listings=data
      this._httpService.updateListings(this.listings)
    })
    .catch(err=> console.log(err))
  }
   deleteListing(listing_id){
     console.log(listing_id)
    this._httpService.deleteList(listing_id)
    .then(data=> {
      this.listings=data
      this._httpService.updateListings(this.listings)
    })
    .catch(err=> console.log(err))
  }
  }


