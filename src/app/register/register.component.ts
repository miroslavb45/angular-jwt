import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit() {
 
  }

  form:FormGroup;

  constructor(private fb:FormBuilder, 
               private authService: LoginService, 
               private router: Router) {

      this.form = this.fb.group({
          username: ['', Validators.required],
          password: ['',Validators.required],
          email: [''],
          first_name: [''],
          last_name: ['']

      });
  }

  register() {
      const val = this.form.value;

      if (val.username && val.password) {
          this.authService.register(val.username, val.password, val.email, val.first_name, val.last_name);
      }
  }

}
