import { Component, OnInit, Renderer2, Inject, SecurityContext, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../validators/password.validator';

import { ErrorLabelComponent } from '../error-label/error-label.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class RegisterComponent implements OnInit {
  @ViewChild(ErrorLabelComponent, { static: false }) errorLabelComponent: ErrorLabelComponent;
  
  ngOnInit() {
  }

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: LoginService,
    private router: Router) {



    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        PasswordValidator.strong

      ])],
      email: ['', Validators.email],
      first_name: [''],
      last_name: [''],
      password_repeat: ['', Validators.compose([
        Validators.required,
        PasswordValidator.strong
      ])]

    });
  }

  register() {
    const val = this.form.value;

    if (this.form.controls.password.getError('weak') && val.password !== "") {
      this.errorLabelComponent.genereateError("Password is weak.", "danger", "Your password has to be at least 8 characters long and has to contain lowercase, uppercase characters and numbers.");
      return;
    }

    if (!(val.password === val.password_repeat)) {
      this.errorLabelComponent.genereateError("Passwords don't match!", "danger", "The entered password don't match!");
      return;
    }
    if (this.form.controls.email.getError("email") && val.email !== "") {
      this.errorLabelComponent.genereateError("Invalid e-mail adress!", "danger", "The entered e-mail adress is not valid!");
      return;
    }

    if (val.username && val.password && val.email && val.password_repeat) {
      this.authService.register(val.username, val.password, val.email, val.first_name, val.last_name);
    }
  }




}
