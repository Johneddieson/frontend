import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import {AuthService} from 'src/app/services/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; 

  constructor(private auth: AuthService, private router: Router) {
     const token = this.auth.GetToken()  
    
    if (token) {
        router.navigateByUrl('/home')
      } else {
          this.auth.deleteId()
    
    }


   }

  ngOnInit(): void {

    this.loginForm = this.createformGroup()
  }

  createformGroup() {
    return new FormGroup({
      //name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
    })
  }

  login(): void {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
    
    .subscribe()
  
  }

}
