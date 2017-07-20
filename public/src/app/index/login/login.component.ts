import { Component, OnInit } from '@angular/core';
import { User } from '../registration/user'
import { HttpService } from '../../http.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error_message: any=false;
  user= {
    email: "",
    password:""
  }
  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.user)
    this._httpService.getUser(this.user)
    .then(user=>{
      if (user){

        console.log("Here to login",user)
        this._httpService.updateUser(user)
        this._router.navigate(['/browse'])
      }
      else{
        console.log("hippo")
        this.error_message="Email or password incorrect please register if you don't have an account"
      }
    })
    .catch(err=> console.log(err))
  }

}
