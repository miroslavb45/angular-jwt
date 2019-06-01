import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule, FormBuilder }   from '@angular/forms';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { AdminComponent } from './admin/admin.component';
import { GlobalErrorHandler } from './error-handler.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    LogoutComponent,
    ErrorHandlerComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },    
    CookieService,
    {
      provide: ErrorHandler, 
      useClass: GlobalErrorHandler
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
