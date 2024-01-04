import { Component } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  // loginForm = new FormGroup({
  //   email:new FormControl(),
  //   password:new FormControl()
  // }) this is using formgroup and form control

  //alert from bootstrap
  responseText='';
  alertClass='';
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router){}

  loginForm=this.fb.group({
    email:[null, [Validators.required,Validators.email]],
    password:[null,[Validators.required, Validators.minLength(6)]]
  })

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  onSubmitHandler(){
    //console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe((response:any)=>{
      if(this.loginForm.value.email==response.email && this.loginForm.value.password==response.password){
        localStorage.setItem('token',response.token);
        this.responseText="Login Successfull! Thank You";
        this.alertClass="alert alert-success";
        this.router.navigateByUrl('/');
      }
      else{
        this.responseText="Login Failed! Try Again";
        this.alertClass="alert alert-danger";
      }
    })
  }
}
