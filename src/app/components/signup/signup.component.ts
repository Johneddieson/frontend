import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private auth: AuthService, private router: Router) {

    const token = this.auth.GetToken()  
    
    if (token) {
        this.router.navigateByUrl('/home')
      }

   }

  ngOnInit(): void {
    
    this.signupForm = this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }
  
  signup(): void {
    this.auth.signup(this.signupForm.value)
    .subscribe((msg: any) => {
        this.auth.SetToken(msg.token)
      // this.auth.setUserId(msg.user.id)
     
      this.auth.isUserLoggedIn$.next(true)
      this.router.navigate(['home'])
      
    }, err => console.log(err))
  }

}
