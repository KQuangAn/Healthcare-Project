import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { TokenStorageService } from '../service/token-storage.service';
import { getDatabase, ref, set,onValue } from "firebase/database";
import { Database } from '@angular/fire/database';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // username: string;
  // password: string;
  myImage:string ="assets/Image/image.jpg";
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private ls: LoginService, private router: Router, private tokenStorage: TokenStorageService,public database : Database) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.gotoIndex();
    }
  }

  loginUser(value:any) {
    

    const startCountRef = ref(this.database,'users/' +this.form.username);
    onValue(startCountRef,(snapshot)=>{
      const data = snapshot.val();
      console.log(data);
      if(data !=null){
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        alert('Logged In as ' + this.form.username);
        this.gotoIndex();
      }
      else{
        this.isLoginFailed = true;
        alert('Login Failed, cant find user');
      }
      
    }, (errorObject) => {
        this.isLoginFailed = true;
        alert('Login Failed :' + errorObject.name);
    }); 

    
  }

  doLogin(): void {
    this.ls.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        alert('Logged In as ' + this.roles);
        this.gotoIndex();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        alert('Login Failed + ' + this.errorMessage);
      }
    );
  }

  // doLogin(){
  //   console.log("username " + this.username);
  //   console.log("password " + this.password);
  //   this.ls.login(this.username, this.password)
  //     .subscribe((data) => {
  //       console.log(data);
  //       alert('login Success');
  //       this.gotoIndex();
  //     },
  //     error=>{
  //       alert('LOGIN FAILED');
  //     })
  // }

  gotoIndex(){
    this.router.navigate(['home']);
  }
  gotoSignup(){
    this.router.navigate(['signup']);
  }

}
