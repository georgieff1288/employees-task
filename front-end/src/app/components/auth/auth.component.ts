import {Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  errorMsg: string = '';
  subscription!: Subscription;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  get email() { return this.authForm.get('email'); }
  get password() { return this.authForm.get('password'); }

  submit(): void {
    let user = {
      email: this.authForm.value.email!,
      password: this.authForm.value.password!
    }
    this.subscription = this.auth.login(user).subscribe({
      next: res => this.router.navigate(['/']),
      error: err => this.errorMsg = err
    })
  }
}
