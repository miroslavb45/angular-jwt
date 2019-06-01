import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder, private authService: LoginService) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    let snackBarRef = this._snackBar.open('Message archived');

  }





  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password);
    }
  }

}
