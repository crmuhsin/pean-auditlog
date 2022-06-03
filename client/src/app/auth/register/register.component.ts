import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string | null;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

  }

  submit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((val) => {
        if (val) {
          this.router.navigate(['/list']);
        } else {
          this.error = "Something went wrong"
        }
      })
    } else if (this.registerForm.value.password !== this.registerForm.value.confirm_password) {
      this.error = "Password is not same"
    } else {
      this.error = "Please fill all field validly"
    }
  }

}
