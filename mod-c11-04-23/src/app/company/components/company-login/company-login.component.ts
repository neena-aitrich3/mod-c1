import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Companyregistration } from '../../models/companyregistration';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {
  personalDetails!: FormGroup;
  userLogin:any;
  constructor(private formBuilder: FormBuilder,private router:Router, private loginser:LoginService) { }

  ngOnInit(): void {
    this.personalDetails = this.formBuilder.group({
      userName: ['', Validators.required],
      
      // email: ['', Validators.required,Validators.email],
     password: ['', Validators.required],

  });
  }
// login(){
//   alert("hello")
//   console.log(this.personalDetails.value);
//   console.log(this.personalDetails.value.username);
//   this.router.navigate(["dashboard"]);
// }
async login(){
  const loginUser : Companyregistration = this.personalDetails.value;
  // const loginUser : any = this.personalDetails.value;
  console.log(this.personalDetails.value.userName);
  console.log(this.personalDetails.value.password);
  await this.loginser.login(this.personalDetails.value.userName,this.personalDetails.value.password).subscribe(( response : any) => {
    this.userLogin=response;
    // console.log(this.userLogin.id);
    
    // console.log(response.access_token);
    const user_name= this.personalDetails.value.userName;
    const token = response.access_token;
    // alert("username is :"+user_name);
   
     localStorage.setItem('token',token)
     localStorage.setItem('username',user_name)
    // alert("login Successfully.")
    // this.router.navigate(["public/login"]);
   this.router.navigate(['/dashboard'])
  })
  
  }
  
}
