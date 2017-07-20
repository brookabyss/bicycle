import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingsComponent } from './listings/listings.component';
import { HttpModule } from '@angular/http';
import { HttpService} from './http.service';
import { LoginComponent } from './index/login/login.component';
import { RegistrationComponent } from './index/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BrowseComponent,
    ListingsComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
