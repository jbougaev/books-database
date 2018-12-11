import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthFacade } from '../../store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private authFacade: AuthFacade) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm){
     this.authFacade.signin(form.value.email, form.value.password);
  }

}
