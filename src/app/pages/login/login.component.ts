import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  returnUrl: string;
  appTitle = environment.appTitle;
  appDescription = environment.appDescription;
  loading = false;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.authenticateUser(this.f.username.value);
    this.router.navigate([this.returnUrl]);
  }
}
