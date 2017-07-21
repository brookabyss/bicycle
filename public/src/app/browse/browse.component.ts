import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { HttpService } from '../http.service'
import { Subscription } from "rxjs/Subscription";
@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnDestroy {
  user={}
  susbcription: Subscription
  // l_sub: Subscription
  current_user_id: String;
  listings=[]
  constructor(private _router: Router, private _httpService: HttpService) { 
    console.log("why not inside 1")
    this._httpService.get_logged_in_user()
    .then(data=> {
      if (data){
        console.log("why not inside 2")
        console.log(data)
        this.current_user_id=data;
        console.log("current user", this.current_user_id)
       this.susbcription= this._httpService.observedUser.subscribe(
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
      console.log("listing retrieval",listings)
      this.listings=listings 
      console.log("the creator id is ",listings[0]['creator_id'])
      this._httpService.updateListings(this.listings)      
  })
    .catch(err=> console.log("listing retrieval error",err))
    console.log("the listing is ",this.listings)

  }

  ngOnInit() {
   
  }
  ngOnDestroy(){
    this.susbcription.unsubscribe()
    // this.l_sub.unsubscribe()
    
  }
  contact(){
    alert("Hello it's Brook")
}
}
