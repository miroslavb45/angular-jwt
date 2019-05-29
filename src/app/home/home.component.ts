import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user;

  constructor(private loginService: LoginService) { 

  }

  ngOnInit() {
    this.user = this.loginService.currentUserValue.username;
  }

}
