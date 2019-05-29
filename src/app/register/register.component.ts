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
          email: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  register() {
      const val = this.form.value;

      if (val.email && val.password) {
          this.authService.register(val.email, val.password)
              .subscribe(
                  (data) => {
                    console.log(data);
                      console.log("User is logged in");
                  }
              );
      }
  }

}
