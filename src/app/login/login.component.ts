import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.currentUser().subscribe(data => {
      if (data !== null) {
        this.router.navigate(['/products']);
      }
    });
  }

  login(){
    this.loginService.signInWithEmailAndPassword(this.email, this.password);
  }

}
