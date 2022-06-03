import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", redirectTo: "signin" },
      {
        path: "signin",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
    ]),
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
