import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  public returnUrl: string;
  public hasError: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        login: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
    this.activatedRoute.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl;
    });
  }


  login() {
    if (this.form.valid) {
      this.loginService.login(this.form.value.login, this.form.value.password)
        .subscribe(value => {
          if (value.token) {
            this.form.reset();
            localStorage.setItem('currentUser', JSON.stringify({ token: value.token }));
            if (this.returnUrl) {
              this.router.navigate([this.returnUrl]).catch(alert);
            } else {
              this.router.navigate(['work/dashboard']).catch(alert);
            }
          }
        }, error => alert(JSON.stringify(error)));
    } else {
      this.hasError = true;
    }
  }

  change() {
    this.hasError = false;
  }
}
