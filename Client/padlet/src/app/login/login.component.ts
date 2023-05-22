import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service"

// interface, because you can't call propertys of something with the type of any
interface Response {
  access_token: string;
}

@Component({
  selector: "bs-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.fb.group({});
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }
  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe((res: any) => {
        console.log(res);
        this.authService.setSessionStorage((res as Response).access_token); // Response -> Duck Casting -> alles was das property access_token hat, kann als string gecastet werden -> alles was aussieht wie eine ente, ist eine ente
        this.router.navigateByUrl("/");
      });
    }
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
  }
}
