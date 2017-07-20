import { Component, OnInit } from '@angular/core';
import { User } from './user'
import { HttpService } from '../../http.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user= new User
  password_confirm: string;
  constructor(private _httpService: HttpService,private _router: Router) { }

  match_password(){
    return this.user.password!=this.password_confirm
    }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.user.name.first)
    this._httpService.addUser(this.user)
     .then(user=>{
      if (user){
       this._httpService.updateUser(user)
        this._router.navigate(['/browse'])
      }
      else{
        console.log("Some error")
      }
    })
    .catch(err=> console.log(err))
  }

}
