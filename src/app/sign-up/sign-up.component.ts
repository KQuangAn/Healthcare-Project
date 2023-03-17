import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login/login.service';
import { getDatabase, ref, set,onValue } from "firebase/database";
import { Database } from '@angular/fire/database';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private ls: LoginService,private database: Database) { }

  ngOnInit(): void {
  }

  onSubmit(): void {


    const db = getDatabase();
    set(ref(db, 'users/' + this.form.username), {
      username: this.form.username,
      password: this.form.password,
      role:'ROLE_USER',
      token:'7777777'
    });
    this.isSuccessful = true;
    this.isSignUpFailed = false;

    // this.ls.register(this.form).subscribe(
    //   data => {
    //     console.log(data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isSignUpFailed = true;
    //   }
    // );
  }

}
