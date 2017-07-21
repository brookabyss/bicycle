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
  listings=[]
  constructor(private _router: Router, private _httpService: HttpService) { 
    this._httpService.get_logged_in_user()
    .then(data=> {
      if (data){
        console.log(data)
        this.susbcription=this._httpService.observedUser.subscribe(
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
   this._httpService.get_listings()
    .then(listings=> {
      console.log("listing retrieval",listings[0]._creator_id)
      this.listings=listings 
      console.log("the creator id is ",listings[0]['creator_id'])
      this._httpService.updateListings(this.listings)      
  })
    .catch(err=> console.log("listing retrieval error",err))
    console.log("the listing is ",this.listings)
  }
  ngOnDestroy(){
    this.susbcription.unsubscribe()
    // this.l_sub.unsubscribe()
    
  }

}
