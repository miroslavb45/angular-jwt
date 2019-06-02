import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
import { AdminComponent } from './admin/admin.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatIconModule} from '@angular/material/icon';
import { ErrorLabelComponent } from './error-label/error-label.component';
import { PasswordValidator } from './validators/password.validator';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    LogoutComponent,
    AdminComponent,
    ErrorLabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule


   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: PasswordValidator, useClass: PasswordValidator, multi: true},
    CookieService,
    
],
  bootstrap: [AppComponent]
})
export class AppModule { }
