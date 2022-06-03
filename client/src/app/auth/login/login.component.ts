import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string | null;
  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }

  submit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((val) => {
        if (val) {
          this.router.navigate(['/list']);
        } else {
          this.error = "Wrong Credentials"
        }
      })
    } else {
      this.error = "Wrong Credentials"
    }
  }

}
