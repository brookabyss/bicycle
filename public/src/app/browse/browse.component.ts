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
  }
  ngOnDestroy(){
    this.susbcription.unsubscribe()
    
  }

}
