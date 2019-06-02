import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ErrorLabelComponent } from '../error-label/error-label.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(ErrorLabelComponent, { static: false }) errorLabelComponent: ErrorLabelComponent;

  form: FormGroup;


  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder, private authService: LoginService) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.authService.isAlive().catch(err => {
      this.openSnackBar("There is a communication problem.", "Close");
    });
  


  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 0,
    });
  }



  login() {
    const val = this.form.value;


    if (val.email && val.password) {
      this.authService.login(val.email, val.password).then(e => {
        if(e.status && e.status === 401){
          this.errorLabelComponent.genereateError("Invalid credentials!", "danger", "Invalid username/email and password combination!");

        }
      })
   
      
    }
  }

}
