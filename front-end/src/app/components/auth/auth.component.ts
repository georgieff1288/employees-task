import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor() { }

  ngOnInit(): void {
  }

  get email() { return this.authForm.get('email'); }
  get password() { return this.authForm.get('password'); }

  submit(): void {
    console.log(this.authForm.value)
  }
}
