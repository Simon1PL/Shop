import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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

  register(){
    console.log(this.email, this.password);
    this.loginService.createUserWithEmailAndPassword(this.email, this.password);
  }

}
